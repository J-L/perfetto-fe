// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {globals} from './globals';

const COOKIE_ACK_KEY = 'cookieAck';

export class CookieConsent implements m.ClassComponent {
  private showCookieConsent = true;

  oninit() {
    this.showCookieConsent = true;
    if (!globals.logging.isEnabled() ||
        localStorage.getItem(COOKIE_ACK_KEY) === 'true') {
      this.showCookieConsent = false;
    }
  }

  view() {
    if (!this.showCookieConsent) return;
    return m(
        '.cookie-consent',
        m('.cookie-text',
          `This site uses cookies from Google to deliver its services and to
          analyze traffic.`),
        m('.buttons',
          m('button',
            m('a',
              {
                href: 'https://policies.google.com/technologies/cookies',
                target: '_blank',
              },
              'More details')),
          m('button',
            {
              onclick: () => {
                this.showCookieConsent = false;
                localStorage.setItem(COOKIE_ACK_KEY, 'true');
                globals.rafScheduler.scheduleFullRedraw();
              },
            },
            'OK')),
    );
  }
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

interface PromiseInfo {
  startTimeMs: number;
  message: string;
}

export class TaskTracker {
  private promisesSeen: number;
  private promisesRejected: number;
  private promisesFulfilled: number;
  private promiseInfo: Map<Promise<unknown>, PromiseInfo>;

  constructor() {
    this.promisesSeen = 0;
    this.promisesRejected = 0;
    this.promisesFulfilled = 0;
    this.promiseInfo = new Map();
  }

  trackPromise(promise: Promise<unknown>, message: string): void {
    this.promiseInfo.set(promise, {
      startTimeMs: (new Date()).getMilliseconds(),
      message,
    });
    this.promisesSeen += 1;
    promise.then(() => {
      this.promisesFulfilled += 1;
    }).catch(() => {
      this.promisesRejected += 1;
    }).finally(() => {
      this.promiseInfo.delete(promise);
    });
  }

  hasPendingTasks(): boolean {
    return this.promisesSeen > (this.promisesFulfilled + this.promisesRejected);
  }

  progressMessage(): string|undefined {
    const {value} = this.promiseInfo.values().next();
    if (value === undefined) {
      return value;
    } else {
      const nowMs = (new Date()).getMilliseconds();
      const runtimeSeconds = Math.round((nowMs - value.startTimeMs) / 1000);
      return `${value.message} (${runtimeSeconds}s)`;
    }
  }
}

export const taskTracker = new TaskTracker();
/*
 * Copyright (C) 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {defer} from '../base/deferred';

enum WebContentScriptMessageType {
  UNKNOWN,
  CONVERT_OBJECT_URL,
  CONVERT_OBJECT_URL_RESPONSE,
}

const ANDROID_BUG_TOOL_EXTENSION_ID = 'mbbaofdfoekifkfpgehgffcpagbbjkmj';

interface Attachment {
  name: string;
  objectUrl: string;
  restrictionSeverity: number;
}

interface ConvertObjectUrlResponse {
  action: WebContentScriptMessageType.CONVERT_OBJECT_URL_RESPONSE;
  attachments: Attachment[];
  issueAccessLevel: string;
  issueId: string;
  issueTitle: string;
}

export interface TraceFromBuganizer {
  issueId: string;
  issueTitle: string;
  file: File;
}

export function loadAndroidBugToolInfo(): Promise<TraceFromBuganizer> {
  const deferred = defer<TraceFromBuganizer>();

  // Request to convert the blob object url "blob:chrome-extension://xxx"
  // the chrome extension has to a web downloadable url "blob:http://xxx".
  chrome.runtime.sendMessage(
      ANDROID_BUG_TOOL_EXTENSION_ID,
      {action: WebContentScriptMessageType.CONVERT_OBJECT_URL},
      async (response: ConvertObjectUrlResponse) => {
        switch (response.action) {
          case WebContentScriptMessageType.CONVERT_OBJECT_URL_RESPONSE:
          if (response.attachments?.length > 0) {
            const filesBlobPromises =
                response.attachments.map(async (attachment) => {
                  const fileQueryResponse = await fetch(attachment.objectUrl);
                  const blob = await fileQueryResponse.blob();
                  // Note: The blob's media type is always set to "image/png".
                  // Clone blob to clear media type.
                  return new File([blob], attachment.name);
                });
            const files = await Promise.all(filesBlobPromises);
            deferred.resolve({
              issueId: response.issueId,
              issueTitle: response.issueTitle,
              file: files[0],
            });
          } else {
            throw new Error('Got no attachements from extension');
          }
          break;
          default:
            throw new Error(`Received unhandled response code (${
                response.action}) from extension.`);
        }
      });
  return deferred;
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Actions} from '../common/actions';
import {AggregateData, isEmptyData} from '../common/aggregation_data';
import {ConversionJobStatusUpdate} from '../common/conversion_jobs';
import {
  LogBoundsKey,
  LogEntriesKey,
  LogExists,
  LogExistsKey,
} from '../common/logs';
import {MetricResult} from '../common/metric_data';
import {CurrentSearchResults, SearchSummary} from '../common/search_data';

import {
  CounterDetails,
  CpuProfileDetails,
  FlamegraphDetails,
  Flow,
  FtracePanelData,
  FtraceStat,
  globals,
  QuantizedLoad,
  SliceDetails,
  ThreadDesc,
  ThreadStateDetails,
} from './globals';
import {findCurrentSelection} from './keyboard_event_handler';

export function publishOverviewData(
    data: {[key: string]: QuantizedLoad|QuantizedLoad[]}) {
  for (const [key, value] of Object.entries(data)) {
    if (!globals.overviewStore.has(key)) {
      globals.overviewStore.set(key, []);
    }
    if (value instanceof Array) {
      globals.overviewStore.get(key)!.push(...value);
    } else {
      globals.overviewStore.get(key)!.push(value);
    }
  }
  globals.rafScheduler.scheduleRedraw();
}

export function publishTrackData(args: {id: string, data: {}}) {
  globals.setTrackData(args.id, args.data);
  if ([LogExistsKey, LogBoundsKey, LogEntriesKey].includes(args.id)) {
    const data = globals.trackDataStore.get(LogExistsKey) as LogExists;
    if (data && data.exists) globals.rafScheduler.scheduleFullRedraw();
  } else {
    globals.rafScheduler.scheduleRedraw();
  }
}

export function publishMetricResult(metricResult: MetricResult) {
  globals.setMetricResult(metricResult);
  globals.publishRedraw();
}

export function publishSelectedFlows(selectedFlows: Flow[]) {
  globals.selectedFlows = selectedFlows;
  globals.publishRedraw();
}

export function publishCounterDetails(click: CounterDetails) {
  globals.counterDetails = click;
  globals.publishRedraw();
}

export function publishFlamegraphDetails(click: FlamegraphDetails) {
  globals.flamegraphDetails = click;
  globals.publishRedraw();
}

export function publishCpuProfileDetails(details: CpuProfileDetails) {
  globals.cpuProfileDetails = details;
  globals.publishRedraw();
}

export function publishFtraceCounters(counters: FtraceStat[]) {
  globals.ftraceCounters = counters;
  globals.publishRedraw();
}

export function publishConversionJobStatusUpdate(
    job: ConversionJobStatusUpdate) {
  globals.setConversionJobStatus(job.jobName, job.jobStatus);
  globals.publishRedraw();
}

export function publishLoading(numQueuedQueries: number) {
  globals.numQueuedQueries = numQueuedQueries;
  // TODO(hjd): Clean up loadingAnimation given that this now causes a full
  // redraw anyways. Also this should probably just go via the global state.
  globals.rafScheduler.scheduleFullRedraw();
}

export function publishBufferUsage(args: {percentage: number}) {
  globals.setBufferUsage(args.percentage);
  globals.publishRedraw();
}

export function publishSearch(args: SearchSummary) {
  globals.searchSummary = args;
  globals.publishRedraw();
}

export function publishSearchResult(args: CurrentSearchResults) {
  globals.currentSearchResults = args;
  globals.publishRedraw();
}

export function publishRecordingLog(args: {logs: string}) {
  globals.setRecordingLog(args.logs);
  globals.publishRedraw();
}

export function publishTraceErrors(numErrors: number) {
  globals.setTraceErrors(numErrors);
  globals.publishRedraw();
}

export function publishMetricError(error: string) {
  globals.setMetricError(error);
  globals.logging.logError(error, false);
  globals.publishRedraw();
}

export function publishAggregateData(
    args: {data: AggregateData, kind: string}) {
  globals.setAggregateData(args.kind, args.data);
  if (!isEmptyData(args.data)) {
    globals.dispatch(Actions.setCurrentTab({tab: args.data.tabName}));
  }
  globals.publishRedraw();
}

export function publishQueryResult(args: {id: string, data?: {}}) {
  globals.queryResults.set(args.id, args.data);
  globals.dispatch(Actions.setCurrentTab({tab: `query_result_${args.id}`}));
  globals.publishRedraw();
}

export function publishThreads(data: ThreadDesc[]) {
  globals.threads.clear();
  data.forEach((thread) => {
    globals.threads.set(thread.utid, thread);
  });
  globals.publishRedraw();
}

export function publishSliceDetails(click: SliceDetails) {
  globals.sliceDetails = click;
  const id = click.id;
  if (id !== undefined && id === globals.state.pendingScrollId) {
    findCurrentSelection();
    globals.dispatch(Actions.setCurrentTab({tab: 'slice'}));
    globals.dispatch(Actions.clearPendingScrollId({id: undefined}));
  }
  globals.publishRedraw();
}

export function publishThreadStateDetails(click: ThreadStateDetails) {
  globals.threadStateDetails = click;
  globals.publishRedraw();
}

export function publishConnectedFlows(connectedFlows: Flow[]) {
  globals.connectedFlows = connectedFlows;
  // If a chrome slice is selected and we have any flows in connectedFlows
  // we will find the flows on the right and left of that slice to set a default
  // focus. In all other cases the focusedFlowId(Left|Right) will be set to -1.
  globals.dispatch(Actions.setHighlightedFlowLeftId({flowId: -1}));
  globals.dispatch(Actions.setHighlightedFlowRightId({flowId: -1}));
  if (globals.state.currentSelection?.kind === 'CHROME_SLICE') {
    const sliceId = globals.state.currentSelection.id;
    for (const flow of globals.connectedFlows) {
      if (flow.begin.sliceId === sliceId) {
        globals.dispatch(Actions.setHighlightedFlowRightId({flowId: flow.id}));
      }
      if (flow.end.sliceId === sliceId) {
        globals.dispatch(Actions.setHighlightedFlowLeftId({flowId: flow.id}));
      }
    }
  }

  globals.publishRedraw();
}

export function publishFtracePanelData(data: FtracePanelData) {
  globals.ftracePanelData = data;
  globals.publishRedraw();
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {assertTrue} from '../base/logging';
import {roundDownNearest} from '../base/math_utils';
import {TRACK_BORDER_COLOR, TRACK_SHELL_WIDTH} from './css_constants';
import {globals} from './globals';
import {TimeScale} from './time_scale';

// Returns the optimal step size (in seconds) and tick pattern of ticks within
// the step. The returned step size has two properties: (1) It is 1, 2, or 5,
// multiplied by some integer power of 10. (2) It is maximised given the
// constraint: |range| / stepSize <= |maxNumberOfSteps|.
export function getStepSize(
    range: number, maxNumberOfSteps: number): [number, string] {
  // First, get the largest possible power of 10 that is smaller than the
  // desired step size, and use it as our initial step size.
  // For example, if the range is 2345ms and the desired steps is 10, then the
  // minimum step size is 234.5ms so the step size will initialise to 100.
  const minStepSize = range / maxNumberOfSteps;
  const zeros = Math.floor(Math.log10(minStepSize));
  const initialStepSize = Math.pow(10, zeros);

  // We know that |initialStepSize| is a power of 10, and
  // initialStepSize <= desiredStepSize <= 10 * initialStepSize. There are four
  // possible candidates for final step size: 1, 2, 5 or 10 * initialStepSize.
  // For our example above, this would result in a step size of 500ms, as both
  // 100ms and 200ms are smaller than the minimum step size of 234.5ms.
  // We pick the candidate that minimizes the step size without letting the
  // number of steps exceed |maxNumberOfSteps|. The factor we pick to also
  // determines the pattern of ticks. This pattern is represented using a string
  // where:
  //  | = Major tick
  //  : = Medium tick
  //  . = Minor tick
  const stepSizeMultipliers: [number, string][] =
      [[1, '|....:....'], [2, '|.:.'], [5, '|....'], [10, '|....:....']];

  for (const [multiplier, pattern] of stepSizeMultipliers) {
    const newStepSize = multiplier * initialStepSize;
    const numberOfNewSteps = range / newStepSize;
    if (numberOfNewSteps <= maxNumberOfSteps) {
      return [newStepSize, pattern];
    }
  }

  throw new Error('Something has gone horribly wrong with maths');
}

function tickPatternToArray(pattern: string): TickType[] {
  const array = Array.from(pattern);
  return array.map((char) => {
    switch (char) {
      case '|':
        return TickType.MAJOR;
      case ':':
        return TickType.MEDIUM;
      case '.':
        return TickType.MINOR;
      default:
        // This is almost certainly a developer/fat-finger error
        throw Error(`Invalid char "${char}" in pattern "${pattern}"`);
    }
  });
}

// Assuming a number only has one non-zero decimal digit, find the number of
// decimal places required to accurately print that number. I.e. the parameter
// we should pass to number.toFixed(x). To account for floating point
// innaccuracies when representing numbers in base-10, we only take the first
// nonzero fractional digit into account. E.g.
//  1.0 -> 0
//  0.5 -> 1
//  0.009 -> 3
//  0.00007 -> 5
//  30000 -> 0
//  0.30000000000000004 -> 1
export function guessDecimalPlaces(val: number): number {
  const neglog10 = -Math.floor(Math.log10(val));
  const clamped = Math.max(0, neglog10);
  return clamped;
}

export enum TickType {
  MAJOR,
  MEDIUM,
  MINOR
}

export interface Tick {
  type: TickType;
  time: number;
  position: number;
}

const MIN_PX_PER_STEP = 80;

// An iterable which generates a series of ticks for a given timescale.
export class TickGenerator implements Iterable<Tick> {
  private _tickPattern: TickType[];
  private _patternSize: number;

  constructor(private scale: TimeScale, {minLabelPx = MIN_PX_PER_STEP} = {}) {
    assertTrue(minLabelPx > 0, 'minLabelPx cannot be lte 0');
    assertTrue(scale.widthPx > 0, 'widthPx cannot be lte 0');
    assertTrue(
        scale.timeSpan.duration > 0, 'timeSpan.duration cannot be lte 0');

    const desiredSteps = scale.widthPx / minLabelPx;
    const [size, pattern] = getStepSize(scale.timeSpan.duration, desiredSteps);
    this._patternSize = size;
    this._tickPattern = tickPatternToArray(pattern);
  }

  // Returns an iterable, so this object can be iterated over directly using the
  // `for x of y` notation. The use of a generator here is just to make things
  // more elegant than creating an array of ticks and building an iterator for
  // it.
  * [Symbol.iterator](): Generator<Tick> {
    const span = this.scale.timeSpan;
    const stepSize = this._patternSize / this._tickPattern.length;
    const start = roundDownNearest(span.start, this._patternSize);
    const timeAtStep = (i: number) => start + (i * stepSize);

    // Iterating using steps instead of
    // for (let s = start; s < span.end; s += stepSize) because if start is much
    // larger than stepSize we can enter an infinite loop due to floating
    // point precision errors.
    for (let i = 0; timeAtStep(i) < span.end; i++) {
      const time = timeAtStep(i);
      if (time >= span.start) {
        const position = Math.floor(this.scale.timeToPx(time));
        const type = this._tickPattern[i % this._tickPattern.length];
        yield {type, time, position};
      }
    }
  }

  // The number of decimal places labels should be printed with, assuming labels
  // are only printed on major ticks.
  get digits(): number {
    return guessDecimalPlaces(this._patternSize);
  }
}

// Gets the timescale associated with the current visible window.
export function timeScaleForVisibleWindow(
    startPx: number, endPx: number): TimeScale {
  const span = globals.frontendLocalState.visibleWindowTime;
  const spanRelative = span.add(-globals.state.traceTime.startSec);
  return new TimeScale(spanRelative, [startPx, endPx]);
}

export function drawGridLines(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number): void {
  ctx.strokeStyle = TRACK_BORDER_COLOR;
  ctx.lineWidth = 1;

  const timeScale = timeScaleForVisibleWindow(TRACK_SHELL_WIDTH, width);
  if (timeScale.timeSpan.duration > 0 && timeScale.widthPx > 0) {
    for (const {type, position} of new TickGenerator(timeScale)) {
      if (type === TickType.MAJOR) {
        ctx.beginPath();
        ctx.moveTo(position + 0.5, 0);
        ctx.lineTo(position + 0.5, height);
        ctx.stroke();
      }
    }
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {
  ColumnDescriptor,
  numberColumn,
  stringColumn,
  Table,
  TableData,
} from './table';

// This file serves as an example of a table component present in the widgets
// showcase. Since table is somewhat complicated component that requires some
// setup spread across several declarations, all the necessary code resides in a
// separate file (this one) and provides a no-argument wrapper component that
// can be used in the widgets showcase directly.

interface ProgrammingLanguage {
  id: number;
  name: string;
  year: number;
}

const languagesList: ProgrammingLanguage[] = [
  {
    id: 1,
    name: 'TypeScript',
    year: 2012,
  },
  {
    id: 2,
    name: 'JavaScript',
    year: 1995,
  },
  {
    id: 3,
    name: 'Lean',
    year: 2013,
  },
];

const columns: ColumnDescriptor<ProgrammingLanguage>[] = [
  numberColumn('ID', (x) => x.id),
  stringColumn('Name', (x) => x.name),
  numberColumn('Year', (x) => x.year),
];

export class TableShowcase implements m.ClassComponent {
  data = new TableData(languagesList);

  view(): m.Child {
    return m(Table, {
      data: this.data,
      columns,
    });
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {allUnique, range} from '../../base/array_utils';
import {
  compareUniversal,
  comparingBy,
  ComparisonFn,
  SortableValue,
  SortDirection,
  withDirection,
} from '../../base/comparison_utils';
import {globals} from '../globals';
import {
  menuItem,
  PopupMenuButton,
  popupMenuIcon,
  PopupMenuItem,
} from '../popup_menu';

export interface ColumnDescriptorAttrs<T> {
  // Context menu items displayed on the column header.
  contextMenu?: PopupMenuItem[];

  // Unique column ID, used to identify which column is currently sorted.
  columnId?: string;

  // Sorting predicate: if provided, column would be sortable.
  ordering?: ComparisonFn<T>;

  // Simpler way to provide a sorting: instead of full predicate, the function
  // can map the row for "sorting key" associated with the column.
  sortKey?: (value: T) => SortableValue;
}

export class ColumnDescriptor<T> {
  name: string;
  render: (row: T) => m.Child;
  id: string;
  contextMenu?: PopupMenuItem[];
  ordering?: ComparisonFn<T>;

  constructor(
      name: string, render: (row: T) => m.Child,
      attrs?: ColumnDescriptorAttrs<T>) {
    this.name = name;
    this.render = render;
    this.id = attrs?.columnId === undefined ? name : attrs.columnId;

    if (attrs === undefined) {
      return;
    }

    if (attrs.sortKey !== undefined && attrs.ordering !== undefined) {
      throw new Error('only one way to order a column should be specified');
    }

    if (attrs.sortKey !== undefined) {
      this.ordering = comparingBy(attrs.sortKey, compareUniversal);
    }
    if (attrs.ordering !== undefined) {
      this.ordering = attrs.ordering;
    }
  }
}

export function numberColumn<T>(
    name: string, getter: (t: T) => number, contextMenu?: PopupMenuItem[]):
    ColumnDescriptor<T> {
  return new ColumnDescriptor<T>(name, getter, {contextMenu, sortKey: getter});
}

export function stringColumn<T>(
    name: string, getter: (t: T) => string, contextMenu?: PopupMenuItem[]):
    ColumnDescriptor<T> {
  return new ColumnDescriptor<T>(name, getter, {contextMenu, sortKey: getter});
}

interface SortingInfo<T> {
  columnId: string;
  direction: SortDirection;
  // TODO(ddrone): figure out if storing this can be avoided.
  ordering: ComparisonFn<T>;
}

// Encapsulated table data, that contains the input to be displayed, as well as
// some helper information to allow sorting.
export class TableData<T> {
  data: T[];
  private _sortingInfo?: SortingInfo<T>;
  private permutation: number[];

  constructor(data: T[]) {
    this.data = data;
    this.permutation = range(data.length);
  }

  * iterateItems(): Generator<T> {
    for (const index of this.permutation) {
      yield this.data[index];
    }
  }

  items(): T[] {
    return Array.from(this.iterateItems());
  }

  setItems(newItems: T[]) {
    this.data = newItems;
    this.permutation = range(newItems.length);
    if (this._sortingInfo !== undefined) {
      this.reorder(this._sortingInfo);
    }
    globals.rafScheduler.scheduleFullRedraw();
  }

  resetOrder() {
    this.permutation = range(this.data.length);
    this._sortingInfo = undefined;
    globals.rafScheduler.scheduleFullRedraw();
  }

  get sortingInfo(): SortingInfo<T>|undefined {
    return this._sortingInfo;
  }

  reorder(info: SortingInfo<T>) {
    this._sortingInfo = info;
    this.permutation.sort(withDirection(
        comparingBy((index: number) => this.data[index], info.ordering),
        info.direction));
    globals.rafScheduler.scheduleFullRedraw();
  }
}

export interface TableAttrs<T> {
  data: TableData<T>;
  columns: ColumnDescriptor<T>[];
}

function directionOnIndex(
    columnId: string, info?: SortingInfo<any>): SortDirection|undefined {
  if (info === undefined) {
    return undefined;
  }
  return info.columnId === columnId ? info.direction : undefined;
}

export class Table implements m.ClassComponent<TableAttrs<any>> {
  renderColumnHeader(
      vnode: m.Vnode<TableAttrs<any>>, column: ColumnDescriptor<any>): m.Child {
    let currDirection: SortDirection|undefined = undefined;

    let items = column.contextMenu;
    if (column.ordering !== undefined) {
      const ordering = column.ordering;
      currDirection = directionOnIndex(column.id, vnode.attrs.data.sortingInfo);
      const newItems: PopupMenuItem[] = [];
      if (currDirection !== 'ASC') {
        newItems.push(menuItem('Sort ascending', () => {
          vnode.attrs.data.reorder(
              {columnId: column.id, direction: 'ASC', ordering});
        }));
      }
      if (currDirection !== 'DESC') {
        newItems.push(menuItem('Sort descending', () => {
          vnode.attrs.data.reorder({
            columnId: column.id,
            direction: 'DESC',
            ordering,
          });
        }));
      }
      if (currDirection !== undefined) {
        newItems.push(menuItem('Restore original order', () => {
          vnode.attrs.data.resetOrder();
        }));
      }
      items = [
        ...newItems,
        ...(items ?? []),
      ];
    }

    return m(
        'td', column.name, items === undefined ? null : m(PopupMenuButton, {
          icon: popupMenuIcon(currDirection),
          items,
        }));
  }

  checkValid(attrs: TableAttrs<any>) {
    if (!allUnique(attrs.columns.map((c) => c.id))) {
      throw new Error('column IDs should be unique');
    }
  }

  oncreate(vnode: m.VnodeDOM<TableAttrs<any>, this>) {
    this.checkValid(vnode.attrs);
  }

  onupdate(vnode: m.VnodeDOM<TableAttrs<any>, this>) {
    this.checkValid(vnode.attrs);
  }

  view(vnode: m.Vnode<TableAttrs<any>>): m.Child {
    const attrs = vnode.attrs;

    return m(
        'table.generic-table',
        m('thead',
          m('tr.header',
            attrs.columns.map(
                (column) => this.renderColumnHeader(vnode, column)))),
        attrs.data.items().map(
            (row) =>
                m('tr',
                  attrs.columns.map((column) => m('td', column.render(row))))));
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {globals} from '../globals';
import {fullscreenModalContainer, ModalDefinition} from '../modal';
import {AnyAttrsVnode} from '../panel_container';
import {ArgumentPopup} from '../pivot_table_argument_popup';

export class AttributeModalHolder {
  showModal = false;
  typedArgument = '';

  callback: (arg: string) => void;

  constructor(callback: (arg: string) => void) {
    this.callback = callback;
  }

  start() {
    this.showModal = true;
    fullscreenModalContainer.createNew(this.renderModal());
    globals.rafScheduler.scheduleFullRedraw();
  }

  private renderModal(): ModalDefinition {
    return {
      title: 'Enter argument name',
      content:
          m(ArgumentPopup, {
            knownArguments:
                globals.state.nonSerializableState.pivotTable.argumentNames,
            onArgumentChange: (arg) => {
              this.typedArgument = arg;
            },
          }) as AnyAttrsVnode,
      buttons: [
        {
          text: 'Add',
          action: () => {
            this.callback(this.typedArgument);
            this.typedArgument = '';
          },
        },
      ],
      onClose: () => {
        this.showModal = false;
      },
    };
  }

  // A method that should be called in `view` method of whatever component is
  // using the attribute modal.
  update() {
    if (this.showModal) {
      fullscreenModalContainer.updateVdom(this.renderModal());
    }
  }
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {assertExists, assertTrue} from '../base/logging';
import {Actions} from '../common/actions';
import {
  ALLOC_SPACE_MEMORY_ALLOCATED_KEY,
  OBJECTS_ALLOCATED_KEY,
  OBJECTS_ALLOCATED_NOT_FREED_KEY,
  PERF_SAMPLES_KEY,
  SPACE_MEMORY_ALLOCATED_NOT_FREED_KEY,
} from '../common/flamegraph_util';
import {
  CallsiteInfo,
  FlamegraphStateViewingOption,
  ProfileType,
} from '../common/state';
import {timeToCode} from '../common/time';
import {profileType} from '../controller/flamegraph_controller';

import {PerfettoMouseEvent} from './events';
import {Flamegraph, NodeRendering} from './flamegraph';
import {globals} from './globals';
import {Modal, ModalDefinition} from './modal';
import {Panel, PanelSize} from './panel';
import {debounce} from './rate_limiters';
import {Router} from './router';
import {getCurrentTrace} from './sidebar';
import {convertTraceToPprofAndDownload} from './trace_converter';
import {Button} from './widgets/button';

interface FlamegraphDetailsPanelAttrs {}

const HEADER_HEIGHT = 30;

function toSelectedCallsite(c: CallsiteInfo|undefined): string {
  if (c !== undefined && c.name !== undefined) {
    return c.name;
  }
  return '(none)';
}

const RENDER_SELF_AND_TOTAL: NodeRendering = {
  selfSize: 'Self',
  totalSize: 'Total',
};
const RENDER_OBJ_COUNT: NodeRendering = {
  selfSize: 'Self objects',
  totalSize: 'Subtree objects',
};

export class FlamegraphDetailsPanel extends Panel<FlamegraphDetailsPanelAttrs> {
  private profileType?: ProfileType = undefined;
  private ts = 0;
  private pids: number[] = [];
  private flamegraph: Flamegraph = new Flamegraph([]);
  private focusRegex = '';
  private updateFocusRegexDebounced = debounce(() => {
    this.updateFocusRegex();
  }, 20);

  view() {
    const flamegraphDetails = globals.flamegraphDetails;
    if (flamegraphDetails && flamegraphDetails.type !== undefined &&
        flamegraphDetails.startNs !== undefined &&
        flamegraphDetails.durNs !== undefined &&
        flamegraphDetails.pids !== undefined &&
        flamegraphDetails.upids !== undefined) {
      this.profileType = profileType(flamegraphDetails.type);
      this.ts = flamegraphDetails.startNs + flamegraphDetails.durNs;
      this.pids = flamegraphDetails.pids;
      if (flamegraphDetails.flamegraph) {
        this.flamegraph.updateDataIfChanged(
            this.nodeRendering(), flamegraphDetails.flamegraph);
      }
      const height = flamegraphDetails.flamegraph ?
          this.flamegraph.getHeight() + HEADER_HEIGHT :
          0;
      return m(
          '.details-panel',
          {
            onclick: (e: PerfettoMouseEvent) => {
              if (this.flamegraph !== undefined) {
                this.onMouseClick({y: e.layerY, x: e.layerX});
              }
              return false;
            },
            onmousemove: (e: PerfettoMouseEvent) => {
              if (this.flamegraph !== undefined) {
                this.onMouseMove({y: e.layerY, x: e.layerX});
                globals.rafScheduler.scheduleRedraw();
              }
            },
            onmouseout: () => {
              if (this.flamegraph !== undefined) {
                this.onMouseOut();
              }
            },
          },
          this.maybeShowModal(flamegraphDetails.graphIncomplete),
          m('.details-panel-heading.flamegraph-profile',
            {onclick: (e: MouseEvent) => e.stopPropagation()},
            [
              m('div.options',
                [
                  m('div.title', this.getTitle()),
                  this.getViewingOptionButtons(),
                ]),
              m('div.details',
                [
                  m('div.selected',
                    `Selected function: ${
                        toSelectedCallsite(
                            flamegraphDetails.expandedCallsite)}`),
                  m('div.time',
                    `Snapshot time: ${timeToCode(flamegraphDetails.durNs)}`),
                  m('input[type=text][placeholder=Focus]', {
                    oninput: (e: Event) => {
                      const target = (e.target as HTMLInputElement);
                      this.focusRegex = target.value;
                      this.updateFocusRegexDebounced();
                    },
                    // Required to stop hot-key handling:
                    onkeydown: (e: Event) => e.stopPropagation(),
                  }),
                  (this.profileType === ProfileType.NATIVE_HEAP_PROFILE ||
                   this.profileType === ProfileType.JAVA_HEAP_SAMPLES) &&
                      m(Button, {
                        icon: 'file_download',
                        onclick: () => {
                          this.downloadPprof();
                        },
                      }),
                ]),
            ]),
          m(`div[style=height:${height}px]`),
      );
    } else {
      return m(
          '.details-panel',
          m('.details-panel-heading', m('h2', `Flamegraph Profile`)));
    }
  }


  private maybeShowModal(graphIncomplete?: boolean) {
    if (!graphIncomplete || globals.state.flamegraphModalDismissed) {
      return undefined;
    }
    return m(Modal, {
      title: 'The flamegraph is incomplete',
      vAlign: 'TOP',
      content: m('div',
          'The current trace does not have a fully formed flamegraph'),
      buttons: [
        {
          text: 'Show the errors',
          primary: true,
          action: () => Router.navigate('#!/info'),
        },
        {
          text: 'Skip',
          action: () => {
            globals.dispatch(Actions.dismissFlamegraphModal({}));
            globals.rafScheduler.scheduleFullRedraw();
          },
        },
      ],
    } as ModalDefinition);
  }

  private getTitle(): string {
    switch (this.profileType!) {
      case ProfileType.HEAP_PROFILE:
        return 'Heap profile:';
      case ProfileType.NATIVE_HEAP_PROFILE:
        return 'Native heap profile:';
      case ProfileType.JAVA_HEAP_SAMPLES:
        return 'Java heap samples:';
      case ProfileType.JAVA_HEAP_GRAPH:
        return 'Java heap graph:';
      case ProfileType.PERF_SAMPLE:
        return 'Profile:';
      default:
        throw new Error('unknown type');
    }
  }

  private nodeRendering(): NodeRendering {
    if (this.profileType === undefined) {
      return {};
    }
    const viewingOption = globals.state.currentFlamegraphState!.viewingOption;
    switch (this.profileType) {
      case ProfileType.JAVA_HEAP_GRAPH:
        if (viewingOption === OBJECTS_ALLOCATED_NOT_FREED_KEY) {
          return RENDER_OBJ_COUNT;
        } else {
          return RENDER_SELF_AND_TOTAL;
        }
      case ProfileType.HEAP_PROFILE:
      case ProfileType.NATIVE_HEAP_PROFILE:
      case ProfileType.JAVA_HEAP_SAMPLES:
      case ProfileType.PERF_SAMPLE:
        return RENDER_SELF_AND_TOTAL;
      default:
        throw new Error('unknown type');
    }
  }

  private updateFocusRegex() {
    globals.dispatch(Actions.changeFocusFlamegraphState({
      focusRegex: this.focusRegex,
    }));
  }

  getViewingOptionButtons(): m.Children {
    return m(
        'div',
        ...FlamegraphDetailsPanel.selectViewingOptions(
            assertExists(this.profileType)));
  }

  downloadPprof() {
    const engine = globals.getCurrentEngine();
    if (!engine) return;
    getCurrentTrace()
        .then((file) => {
          assertTrue(
              this.pids.length === 1,
              'Native profiles can only contain one pid.');
          convertTraceToPprofAndDownload(file, this.pids[0], this.ts);
        })
        .catch((error) => {
          throw new Error(`Failed to get current trace ${error}`);
        });
  }

  private changeFlamegraphData() {
    const data = globals.flamegraphDetails;
    const flamegraphData = data.flamegraph === undefined ? [] : data.flamegraph;
    this.flamegraph.updateDataIfChanged(
        this.nodeRendering(), flamegraphData, data.expandedCallsite);
  }

  renderCanvas(ctx: CanvasRenderingContext2D, size: PanelSize) {
    this.changeFlamegraphData();
    const current = globals.state.currentFlamegraphState;
    if (current === null) return;
    const unit =
        current.viewingOption === SPACE_MEMORY_ALLOCATED_NOT_FREED_KEY ||
            current.viewingOption === ALLOC_SPACE_MEMORY_ALLOCATED_KEY ?
        'B' :
        '';
    this.flamegraph.draw(ctx, size.width, size.height, 0, HEADER_HEIGHT, unit);
  }

  onMouseClick({x, y}: {x: number, y: number}): boolean {
    const expandedCallsite = this.flamegraph.onMouseClick({x, y});
    globals.dispatch(Actions.expandFlamegraphState({expandedCallsite}));
    return true;
  }

  onMouseMove({x, y}: {x: number, y: number}): boolean {
    this.flamegraph.onMouseMove({x, y});
    return true;
  }

  onMouseOut() {
    this.flamegraph.onMouseOut();
  }

  private static selectViewingOptions(profileType: ProfileType) {
    switch (profileType) {
      case ProfileType.PERF_SAMPLE:
        return [this.buildButtonComponent(PERF_SAMPLES_KEY, 'Samples')];
      case ProfileType.JAVA_HEAP_GRAPH:
        return [
          this.buildButtonComponent(
              SPACE_MEMORY_ALLOCATED_NOT_FREED_KEY, 'Size'),
          this.buildButtonComponent(OBJECTS_ALLOCATED_NOT_FREED_KEY, 'Objects'),
        ];
      case ProfileType.HEAP_PROFILE:
        return [
          this.buildButtonComponent(
              SPACE_MEMORY_ALLOCATED_NOT_FREED_KEY, 'Unreleased size'),
          this.buildButtonComponent(
              OBJECTS_ALLOCATED_NOT_FREED_KEY, 'Unreleased count'),
          this.buildButtonComponent(
              ALLOC_SPACE_MEMORY_ALLOCATED_KEY, 'Total size'),
          this.buildButtonComponent(OBJECTS_ALLOCATED_KEY, 'Total count'),
        ];
      case ProfileType.NATIVE_HEAP_PROFILE:
        return [
          this.buildButtonComponent(
              SPACE_MEMORY_ALLOCATED_NOT_FREED_KEY, 'Unreleased malloc size'),
          this.buildButtonComponent(
              OBJECTS_ALLOCATED_NOT_FREED_KEY, 'Unreleased malloc count'),
          this.buildButtonComponent(
              ALLOC_SPACE_MEMORY_ALLOCATED_KEY, 'Total malloc size'),
          this.buildButtonComponent(
              OBJECTS_ALLOCATED_KEY, 'Total malloc count'),
        ];
      case ProfileType.JAVA_HEAP_SAMPLES:
        return [
          this.buildButtonComponent(
              ALLOC_SPACE_MEMORY_ALLOCATED_KEY, 'Total allocation size'),
          this.buildButtonComponent(
              OBJECTS_ALLOCATED_KEY, 'Total allocation count'),
        ];
      default:
        throw new Error(`Unexpected profile type ${profileType}`);
    }
  }

  private static buildButtonComponent(
      viewingOption: FlamegraphStateViewingOption, text: string) {
    const active =
        (globals.state.currentFlamegraphState !== null &&
         globals.state.currentFlamegraphState.viewingOption === viewingOption);
    return m(Button, {
      label: text,
      active,
      minimal: true,
      onclick: () => {
        globals.dispatch(Actions.changeViewFlamegraphState({viewingOption}));
      },
    });
  }
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {assertExists} from '../base/logging';
import {Actions} from '../common/actions';
import {
  LogBounds,
  LogBoundsKey,
  LogEntries,
  LogEntriesKey,
} from '../common/logs';
import {formatTimestamp} from '../common/time';
import {TimeSpan} from '../common/time';

import {SELECTED_LOG_ROWS_COLOR} from './css_constants';
import {globals} from './globals';
import {LOG_PRIORITIES, LogsFilters} from './logs_filters';
import {Panel} from './panel';

const ROW_H = 20;

export class LogPanel extends Panel<{}> {
  private scrollContainer?: HTMLElement;
  private bounds?: LogBounds;
  private entries?: LogEntries;

  private visibleRowOffset = 0;
  private visibleRowCount = 0;

  recomputeVisibleRowsAndUpdate() {
    const scrollContainer = assertExists(this.scrollContainer);

    const prevOffset = this.visibleRowOffset;
    const prevCount = this.visibleRowCount;
    this.visibleRowOffset = Math.floor(scrollContainer.scrollTop / ROW_H);
    this.visibleRowCount = Math.ceil(scrollContainer.clientHeight / ROW_H);

    if (this.visibleRowOffset !== prevOffset ||
        this.visibleRowCount !== prevCount) {
      globals.dispatch(Actions.updateLogsPagination({
        offset: this.visibleRowOffset,
        count: this.visibleRowCount,
      }));
    }
  }

  oncreate({dom}: m.CVnodeDOM) {
    this.scrollContainer = assertExists(
        dom.parentElement!.parentElement!.parentElement as HTMLElement);
    this.scrollContainer.addEventListener(
        'scroll', this.onScroll.bind(this), {passive: true});
    this.bounds = globals.trackDataStore.get(LogBoundsKey) as LogBounds;
    this.entries = globals.trackDataStore.get(LogEntriesKey) as LogEntries;
    this.recomputeVisibleRowsAndUpdate();
  }

  onbeforeupdate(_: m.CVnodeDOM) {
    this.bounds = globals.trackDataStore.get(LogBoundsKey) as LogBounds;
    this.entries = globals.trackDataStore.get(LogEntriesKey) as LogEntries;
    this.recomputeVisibleRowsAndUpdate();
  }

  onScroll() {
    if (this.scrollContainer === undefined) return;
    this.recomputeVisibleRowsAndUpdate();
    globals.rafScheduler.scheduleFullRedraw();
  }

  onRowOver(ts: number) {
    globals.dispatch(Actions.setHoverCursorTimestamp({ts}));
  }

  onRowOut() {
    globals.dispatch(Actions.setHoverCursorTimestamp({ts: -1}));
  }

  private totalRows():
      {isStale: boolean, total: number, offset: number, count: number} {
    if (!this.bounds) {
      return {isStale: false, total: 0, offset: 0, count: 0};
    }
    const {total, startTs, endTs, firstRowTs, lastRowTs} = this.bounds;
    const vis = globals.frontendLocalState.visibleWindowTime;
    const leftSpan = new TimeSpan(startTs, firstRowTs);
    const rightSpan = new TimeSpan(lastRowTs, endTs);

    const isStaleLeft = !leftSpan.isInBounds(vis.start);
    const isStaleRight = !rightSpan.isInBounds(vis.end);
    const isStale = isStaleLeft || isStaleRight;
    const offset = Math.min(this.visibleRowOffset, total);
    const visCount = Math.min(total - offset, this.visibleRowCount);
    return {isStale, total, count: visCount, offset};
  }

  view(_: m.CVnode<{}>) {
    const {isStale, total, offset, count} = this.totalRows();

    const hasProcessNames = this.entries &&
        this.entries.processName.filter((name) => name).length > 0;

    const rows: m.Children = [];
    rows.push(
        m(`.row`,
          m('.cell.row-header', 'Timestamp'),
          m('.cell.row-header', 'Level'),
          m('.cell.row-header', 'Tag'),
          hasProcessNames ? m('.cell.with-process.row-header', 'Process name') :
                            undefined,
          hasProcessNames ? m('.cell.with-process.row-header', 'Message') :
                            m('.cell.no-process.row-header', 'Message'),
          m('br')));
    if (this.entries) {
      const offset = this.entries.offset;
      const timestamps = this.entries.timestamps;
      const priorities = this.entries.priorities;
      const tags = this.entries.tags;
      const messages = this.entries.messages;
      const processNames = this.entries.processName;
      for (let i = 0; i < this.entries.timestamps.length; i++) {
        const priorityLetter = LOG_PRIORITIES[priorities[i]][0];
        const ts = timestamps[i];
        const prioClass = priorityLetter || '';
        const style: {top: string, backgroundColor?: string} = {
          // 1.5 is for the width of the header
          top: `${(offset + i + 1.5) * ROW_H}px`,
        };
        if (this.entries.isHighlighted[i]) {
          style.backgroundColor = SELECTED_LOG_ROWS_COLOR;
        }

        rows.push(
            m(`.row.${prioClass}`,
              {
                'class': isStale ? 'stale' : '',
                style,
                'onmouseover': this.onRowOver.bind(this, ts / 1e9),
                'onmouseout': this.onRowOut.bind(this),
              },
              m('.cell',
                formatTimestamp(ts / 1e9 - globals.state.traceTime.startSec)),
              m('.cell', priorityLetter || '?'),
              m('.cell', tags[i]),
              hasProcessNames ? m('.cell.with-process', processNames[i]) :
                                undefined,
              hasProcessNames ? m('.cell.with-process', messages[i]) :
                                m('.cell.no-process', messages[i]),
              m('br')));
      }
    }

    return m(
        '.log-panel',
        m('header',
          {
            'class': isStale ? 'stale' : '',
          },
          [
            m('.log-rows-label',
              `Logs rows [${offset}, ${offset + count}] / ${total}`),
            m(LogsFilters),
          ]),
        m('.rows', {style: {height: `${total * ROW_H}px`}}, rows));
  }

  renderCanvas() {}
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {assertTrue} from '../base/logging';
import {Actions} from '../common/actions';
import {HttpRpcState} from '../common/http_rpc_engine';
import {
  Area,
  FrontendLocalState as FrontendState,
  Timestamped,
  VisibleState,
} from '../common/state';
import {TimeSpan} from '../common/time';

import {globals} from './globals';
import {ratelimit} from './rate_limiters';
import {TimeScale} from './time_scale';

interface Range {
  start?: number;
  end?: number;
}

function chooseLatest<T extends Timestamped>(current: T, next: T): T {
  if (next !== current && next.lastUpdate > current.lastUpdate) {
    // |next| is from state. Callers may mutate the return value of
    // this function so we need to clone |next| to prevent bad mutations
    // of state:
    return Object.assign({}, next);
  }
  return current;
}

function capBetween(t: number, start: number, end: number) {
  return Math.min(Math.max(t, start), end);
}

// Calculate the space a scrollbar takes up so that we can subtract it from
// the canvas width.
function calculateScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.overflowY = 'scroll';
  const inner = document.createElement('div');
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const width =
      outer.getBoundingClientRect().width - inner.getBoundingClientRect().width;
  document.body.removeChild(outer);
  return width;
}

/**
 * State that is shared between several frontend components, but not the
 * controller. This state is updated at 60fps.
 */
export class FrontendLocalState {
  visibleWindowTime = new TimeSpan(0, 10);
  timeScale = new TimeScale(this.visibleWindowTime, [0, 0]);
  showPanningHint = false;
  showCookieConsent = false;
  visibleTracks = new Set<string>();
  prevVisibleTracks = new Set<string>();
  scrollToTrackId?: string|number;
  httpRpcState: HttpRpcState = {connected: false};
  newVersionAvailable = false;

  // This is used to calculate the tracks within a Y range for area selection.
  areaY: Range = {};

  private scrollBarWidth?: number;

  private _visibleState: VisibleState = {
    lastUpdate: 0,
    startSec: 0,
    endSec: 10,
    resolution: 1,
  };

  private _selectedArea?: Area;

  // TODO: there is some redundancy in the fact that both |visibleWindowTime|
  // and a |timeScale| have a notion of time range. That should live in one
  // place only.

  getScrollbarWidth() {
    if (this.scrollBarWidth === undefined) {
      this.scrollBarWidth = calculateScrollbarWidth();
    }
    return this.scrollBarWidth;
  }

  setHttpRpcState(httpRpcState: HttpRpcState) {
    this.httpRpcState = httpRpcState;
    globals.rafScheduler.scheduleFullRedraw();
  }

  addVisibleTrack(trackId: string) {
    this.visibleTracks.add(trackId);
  }

  // Called when beginning a canvas redraw.
  clearVisibleTracks() {
    this.visibleTracks.clear();
  }

  // Called when the canvas redraw is complete.
  sendVisibleTracks() {
    if (this.prevVisibleTracks.size !== this.visibleTracks.size ||
        ![...this.prevVisibleTracks].every(
            (value) => this.visibleTracks.has(value))) {
      globals.dispatch(
          Actions.setVisibleTracks({tracks: Array.from(this.visibleTracks)}));
      this.prevVisibleTracks = new Set(this.visibleTracks);
    }
  }

  mergeState(state: FrontendState): void {
    // This is unfortunately subtle. This class mutates this._visibleState.
    // Since we may not mutate |state| (in order to make immer's immutable
    // updates work) this means that we have to make a copy of the visibleState.
    // when updating it. We don't want to have to do that unnecessarily so
    // chooseLatest returns a shallow clone of state.visibleState *only* when
    // that is the newer state. All of these complications should vanish when
    // we remove this class.
    const previousVisibleState = this._visibleState;
    this._visibleState = chooseLatest(this._visibleState, state.visibleState);
    const visibleStateWasUpdated = previousVisibleState !== this._visibleState;
    if (visibleStateWasUpdated) {
      this.updateLocalTime(
          new TimeSpan(this._visibleState.startSec, this._visibleState.endSec));
    }
  }

  selectArea(
      startSec: number, endSec: number,
      tracks = this._selectedArea ? this._selectedArea.tracks : []) {
    assertTrue(
        endSec >= startSec,
        `Impossible select area: startSec [${startSec}] >= endSec [${endSec}]`);
    this.showPanningHint = true;
    this._selectedArea = {startSec, endSec, tracks};
    globals.rafScheduler.scheduleFullRedraw();
  }

  deselectArea() {
    this._selectedArea = undefined;
    globals.rafScheduler.scheduleRedraw();
  }

  get selectedArea(): Area|undefined {
    return this._selectedArea;
  }

  private ratelimitedUpdateVisible = ratelimit(() => {
    globals.dispatch(Actions.setVisibleTraceTime(this._visibleState));
  }, 50);

  private updateLocalTime(ts: TimeSpan) {
    const traceTime = globals.state.traceTime;
    const startSec = capBetween(ts.start, traceTime.startSec, traceTime.endSec);
    const endSec = capBetween(ts.end, traceTime.startSec, traceTime.endSec);
    this.visibleWindowTime = new TimeSpan(startSec, endSec);
    this.timeScale.setTimeBounds(this.visibleWindowTime);
    this.updateResolution();
  }

  private updateResolution() {
    this._visibleState.lastUpdate = Date.now() / 1000;
    this._visibleState.resolution = globals.getCurResolution();
    this.ratelimitedUpdateVisible();
  }

  updateVisibleTime(ts: TimeSpan) {
    this.updateLocalTime(ts);
    this._visibleState.lastUpdate = Date.now() / 1000;
    this._visibleState.startSec = this.visibleWindowTime.start;
    this._visibleState.endSec = this.visibleWindowTime.end;
    this._visibleState.resolution = globals.getCurResolution();
    this.ratelimitedUpdateVisible();
  }

  getVisibleStateBounds(): [number, number] {
    return [this.visibleWindowTime.start, this.visibleWindowTime.end];
  }

  // Whenever start/end px of the timeScale is changed, update
  // the resolution.
  updateLocalLimits(pxStart: number, pxEnd: number) {
    // Numbers received here can be negative or equal, but we should fix that
    // before updating the timescale.
    pxStart = Math.max(0, pxStart);
    pxEnd = Math.max(0, pxEnd);
    if (pxStart === pxEnd) pxEnd = pxStart + 1;
    this.timeScale.setLimitsPx(pxStart, pxEnd);
    this.updateResolution();
  }
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {getDefaultRecordingTargets, RecordingTarget} from '../common/state';
import {
  createEmptyRecordConfig,
  NamedRecordConfig,
  namedRecordConfigValidator,
  RecordConfig,
  recordConfigValidator,
} from '../controller/record_config_types';
import {runValidator, ValidationResult} from '../controller/validators';

const LOCAL_STORAGE_RECORD_CONFIGS_KEY = 'recordConfigs';
const LOCAL_STORAGE_AUTOSAVE_CONFIG_KEY = 'autosaveConfig';
const LOCAL_STORAGE_RECORD_TARGET_OS_KEY = 'recordTargetOS';

export class RecordConfigStore {
  recordConfigs: Array<ValidationResult<NamedRecordConfig>>;
  recordConfigNames: Set<string>;

  constructor() {
    this.recordConfigs = [];
    this.recordConfigNames = new Set();
    this.reloadFromLocalStorage();
  }

  private _save() {
    window.localStorage.setItem(
        LOCAL_STORAGE_RECORD_CONFIGS_KEY,
        JSON.stringify(this.recordConfigs.map((x) => x.result)));
  }

  save(recordConfig: RecordConfig, title?: string): void {
    // We reload from local storage in case of concurrent
    // modifications of local storage from a different tab.
    this.reloadFromLocalStorage();

    const savedTitle = title ? title : new Date().toJSON();
    const config: NamedRecordConfig = {
      title: savedTitle,
      config: recordConfig,
      key: new Date().toJSON(),
    };

    this.recordConfigs.push({result: config, invalidKeys: [], extraKeys: []});
    this.recordConfigNames.add(savedTitle);

    this._save();
  }

  overwrite(recordConfig: RecordConfig, key: string) {
    // We reload from local storage in case of concurrent
    // modifications of local storage from a different tab.
    this.reloadFromLocalStorage();

    const found = this.recordConfigs.find((e) => e.result.key === key);
    if (found === undefined) {
      throw new Error('trying to overwrite non-existing config');
    }

    found.result.config = recordConfig;

    this._save();
  }

  delete(key: string): void {
    // We reload from local storage in case of concurrent
    // modifications of local storage from a different tab.
    this.reloadFromLocalStorage();

    let idx = -1;
    for (let i = 0; i < this.recordConfigs.length; ++i) {
      if (this.recordConfigs[i].result.key === key) {
        idx = i;
        break;
      }
    }

    if (idx !== -1) {
      this.recordConfigNames.delete(this.recordConfigs[idx].result.title);
      this.recordConfigs.splice(idx, 1);
      this._save();
    } else {
      // TODO(bsebastien): Show a warning message to the user in the UI.
      console.warn('The config selected doesn\'t exist any more');
    }
  }

  private clearRecordConfigs(): void {
    this.recordConfigs = [];
    this.recordConfigNames.clear();
    this._save();
  }

  reloadFromLocalStorage(): void {
    const configsLocalStorage =
        window.localStorage.getItem(LOCAL_STORAGE_RECORD_CONFIGS_KEY);

    if (configsLocalStorage) {
      this.recordConfigNames.clear();

      try {
        const validConfigLocalStorage:
            Array<ValidationResult<NamedRecordConfig>> = [];
        const parsedConfigsLocalStorage = JSON.parse(configsLocalStorage);

        // Check if it's an array.
        if (!Array.isArray(parsedConfigsLocalStorage)) {
          this.clearRecordConfigs();
          return;
        }

        for (let i = 0; i < parsedConfigsLocalStorage.length; ++i) {
          try {
            validConfigLocalStorage.push(runValidator(
                namedRecordConfigValidator, parsedConfigsLocalStorage[i]));
          } catch {
            // Parsing failed with unrecoverable error (e.g. title or key are
            // missing), ignore the result.
            console.log(
                'Validation of saved record config has failed: ' +
                JSON.stringify(parsedConfigsLocalStorage[i]));
          }
        }

        this.recordConfigs = validConfigLocalStorage;
        this._save();
      } catch (e) {
        this.clearRecordConfigs();
      }
    } else {
      this.clearRecordConfigs();
    }
  }

  canSave(title: string) {
    return !this.recordConfigNames.has(title);
  }
}

// This class is a singleton to avoid many instances
// conflicting as they attempt to edit localStorage.
export const recordConfigStore = new RecordConfigStore();

export class AutosaveConfigStore {
  config: RecordConfig;

  // Whether the current config is a default one or has been saved before.
  // Used to determine whether the button to load "last started config" should
  // be present in the recording profiles list.
  hasSavedConfig: boolean;

  constructor() {
    this.hasSavedConfig = false;
    this.config = createEmptyRecordConfig();
    const savedItem =
        window.localStorage.getItem(LOCAL_STORAGE_AUTOSAVE_CONFIG_KEY);
    if (savedItem === null) {
      return;
    }
    const parsed = JSON.parse(savedItem);
    if (parsed !== null && typeof parsed === 'object') {
      this.config = runValidator(recordConfigValidator, parsed).result;
      this.hasSavedConfig = true;
    }
  }

  get(): RecordConfig {
    return this.config;
  }

  save(newConfig: RecordConfig) {
    window.localStorage.setItem(
        LOCAL_STORAGE_AUTOSAVE_CONFIG_KEY, JSON.stringify(newConfig));
    this.config = newConfig;
    this.hasSavedConfig = true;
  }
}

export const autosaveConfigStore = new AutosaveConfigStore();

export class RecordTargetStore {
  recordTargetOS: string|null;

  constructor() {
    this.recordTargetOS =
        window.localStorage.getItem(LOCAL_STORAGE_RECORD_TARGET_OS_KEY);
  }

  get(): string|null {
    return this.recordTargetOS;
  }

  getValidTarget(): RecordingTarget {
    const validTargets = getDefaultRecordingTargets();
    const savedOS = this.get();

    const validSavedTarget = validTargets.find((el) => el.os === savedOS);
    return validSavedTarget || validTargets[0];
  }

  save(newTargetOS: string) {
    window.localStorage.setItem(
        LOCAL_STORAGE_RECORD_TARGET_OS_KEY, newTargetOS);
    this.recordTargetOS = newTargetOS;
  }
}

export const recordTargetStore = new RecordTargetStore();
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Anchor} from './anchor';
import {classNames} from './classnames';
import {globals} from './globals';
import {LIBRARY_ADD_CHECK} from './icons';
import {createPage} from './pages';
import {PopupMenuButton} from './popup_menu';
import {TableShowcase} from './tables/table_showcase';
import {Button} from './widgets/button';
import {Checkbox} from './widgets/checkbox';
import {EmptyState} from './widgets/empty_state';
import {Form, FormButtonBar, FormLabel} from './widgets/form';
import {Icon} from './widgets/icon';
import {Menu, MenuDivider, MenuItem, PopupMenu2} from './widgets/menu';
import {MultiSelect, MultiSelectDiff} from './widgets/multiselect';
import {Popup, PopupPosition} from './widgets/popup';
import {Portal} from './widgets/portal';
import {Select} from './widgets/select';
import {Spinner} from './widgets/spinner';
import {Switch} from './widgets/switch';
import {TextInput} from './widgets/text_input';
import {Tree, TreeLayout, TreeNode} from './widgets/tree';

const options: {[key: string]: boolean} = {
  foobar: false,
  foo: false,
  bar: false,
  baz: false,
  qux: false,
  quux: false,
  corge: false,
  grault: false,
  garply: false,
  waldo: false,
  fred: false,
  plugh: false,
  xyzzy: false,
  thud: false,
};

function PortalButton() {
  let portalOpen = false;

  return {
    view: function({attrs}: any) {
      const {
        zIndex = true,
        absolute = true,
        top = true,
      } = attrs;
      return [
        m(Button, {
          label: 'Toggle Portal',
          onclick: () => {
            portalOpen = !portalOpen;
            globals.rafScheduler.scheduleFullRedraw();
          },
        }),
        portalOpen &&
            m(Portal,
              {
                style: {
                  position: absolute && 'absolute',
                  top: top && '0',
                  zIndex: zIndex ? '10' : '0',
                  background: 'white',
                },
              },
              m('', `A very simple portal - a div rendered outside of the normal
              flow of the page`)),
      ];
    },
  };
}

function lorem() {
  const text =
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.`;
  return m('', {style: {width: '200px'}}, text);
}


function ControlledPopup() {
  let popupOpen = false;

  return {
    view: function() {
      return m(
          Popup,
          {
            trigger:
                m(Button, {label: `${popupOpen ? 'Close' : 'Open'} Popup`}),
            isOpen: popupOpen,
            onChange: (shouldOpen: boolean) => popupOpen = shouldOpen,
          },
          m(Button, {
            label: 'Close Popup',
            onclick: () => {
              popupOpen = !popupOpen;
              globals.rafScheduler.scheduleFullRedraw();
            },
          }),
      );
    },
  };
}

type Options = {
  [key: string]: EnumOption|boolean
};

interface WidgetShowcaseAttrs {
  initialOpts?: Options;
  renderWidget: (options: any) => any;
  wide?: boolean;
}

class EnumOption {
  constructor(public initial: string, public options: string[]) {}
}

// A little helper class to render any vnode with a dynamic set of options
class WidgetShowcase implements m.ClassComponent<WidgetShowcaseAttrs> {
  private optValues: any = {};
  private opts?: Options;

  renderOptions(listItems: m.Child[]): m.Child {
    if (listItems.length === 0) {
      return null;
    }
    return m(
        '.widget-controls',
        m('h3', 'Options'),
        m('ul', listItems),
    );
  }

  oninit({attrs: {initialOpts: opts}}: m.Vnode<WidgetShowcaseAttrs, this>) {
    this.opts = opts;
    if (opts) {
      // Make the initial options values
      for (const key in opts) {
        if (Object.prototype.hasOwnProperty.call(opts, key)) {
          const option = opts[key];
          if (option instanceof EnumOption) {
            this.optValues[key] = option.initial;
          } else if (typeof option === 'boolean') {
            this.optValues[key] = option;
          }
        }
      }
    }
  }

  view({attrs: {renderWidget, wide}}: m.CVnode<WidgetShowcaseAttrs>) {
    const listItems = [];

    if (this.opts) {
      for (const key in this.opts) {
        if (Object.prototype.hasOwnProperty.call(this.opts, key)) {
          listItems.push(m('li', this.renderControlForOption(key)));
        }
      }
    }

    return [
      m(
          '.widget-block',
          m(
              'div',
              {
                class: classNames(
                    'widget-container',
                    wide && 'widget-container-wide',
                    ),
              },
              renderWidget(this.optValues),
              ),
          this.renderOptions(listItems),
          ),
    ];
  }

  private renderControlForOption(key: string) {
    if (!this.opts) return null;
    const value = this.opts[key];
    if (value instanceof EnumOption) {
      return this.renderEnumOption(key, value);
    } else if (typeof value === 'boolean') {
      return this.renderBooleanOption(key);
    } else {
      return null;
    }
  }

  private renderBooleanOption(key: string) {
    return m(Checkbox, {
      checked: this.optValues[key],
      label: key,
      onchange: () => {
        this.optValues[key] = !this.optValues[key];
        globals.rafScheduler.scheduleFullRedraw();
      },
    });
  }

  private renderEnumOption(key: string, opt: EnumOption) {
    const optionElements = opt.options.map((option: string) => {
      return m('option', {value: option}, option);
    });
    return m(
        Select,
        {
          value: this.optValues[key],
          onchange: (e: Event) => {
            const el = e.target as HTMLSelectElement;
            this.optValues[key] = el.value;
            globals.rafScheduler.scheduleFullRedraw();
          },
        },
        optionElements);
  }
}


export const WidgetsPage = createPage({
  view() {
    return m(
        '.widgets-page',
        m('h1', 'Widgets'),
        m('h2', 'Button'),
        m(WidgetShowcase, {
          renderWidget: ({label, icon, rightIcon, ...rest}) => m(Button, {
            icon: icon ? 'send' : undefined,
            rightIcon: rightIcon ? 'arrow_forward' : undefined,
            label: label ? 'Button' : '',
            ...rest,
          }),
          initialOpts: {
            label: true,
            icon: true,
            rightIcon: false,
            disabled: false,
            minimal: false,
            active: false,
            compact: false,
          },
        }),
        m('h2', 'Checkbox'),
        m(WidgetShowcase, {
          renderWidget: (opts) => m(Checkbox, {label: 'Checkbox', ...opts}),
          initialOpts: {
            disabled: false,
          },
        }),
        m('h2', 'Switch'),
        m(WidgetShowcase, {
          renderWidget: ({label, ...rest}: any) =>
              m(Switch, {label: label ? 'Switch' : undefined, ...rest}),
          initialOpts: {
            label: true,
            disabled: false,
          },
        }),
        m('h2', 'Text Input'),
        m(WidgetShowcase, {
          renderWidget: ({placeholder, ...rest}) => m(TextInput, {
            placeholder: placeholder ? 'Placeholder...' : '',
            ...rest,
          }),
          initialOpts: {
            placeholder: true,
            disabled: false,
          },
        }),
        m('h2', 'Select'),
        m(WidgetShowcase, {
          renderWidget: (opts) =>
              m(Select,
                opts,
                [
                  m('option', {value: 'foo', label: 'Foo'}),
                  m('option', {value: 'bar', label: 'Bar'}),
                  m('option', {value: 'baz', label: 'Baz'}),
                ]),
          initialOpts: {
            disabled: false,
          },
        }),
        m('h2', 'Empty State'),
        m(WidgetShowcase, {
          renderWidget: ({header, content}) =>
              m(EmptyState,
                {
                  header: header && 'No search results found...',
                },
                content && m(Button, {label: 'Try again'})),
          initialOpts: {
            header: true,
            content: true,
          },
        }),
        m('h2', 'Anchor'),
        m(WidgetShowcase, {
          renderWidget: ({icon}) => m(
              Anchor,
              {
                icon: icon && 'open_in_new',
                href: 'https://perfetto.dev/docs/',
                target: '_blank',
              },
              'Docs',
              ),
          initialOpts: {
            icon: true,
          },
        }),
        m('h2', 'Table'),
        m(WidgetShowcase,
          {renderWidget: () => m(TableShowcase), initialOpts: {}, wide: true}),
        m('h2', 'Portal'),
        m('p', `A portal is a div rendered out of normal flow of the
        hierarchy.`),
        m(WidgetShowcase, {
          renderWidget: (opts) => m(PortalButton, opts),
          initialOpts: {
            absolute: true,
            zIndex: true,
            top: true,
          },
        }),
        m('h2', 'Popup'),
        m('p', `A popup is a nicely styled portal element whose position is
        dynamically updated to appear to float alongside a specific element on
        the page, even as the element is moved and scrolled around.`),
        m(WidgetShowcase, {
          renderWidget: (opts) => m(
              Popup,
              {
                trigger: m(Button, {label: 'Toggle Popup'}),
                ...opts,
              },
              lorem(),
              ),
          initialOpts: {
            position: new EnumOption(
                PopupPosition.Auto,
                Object.values(PopupPosition),
                ),
            closeOnEscape: true,
            closeOnOutsideClick: true,
          },
        }),
        m('h2', 'Controlled Popup'),
        m('p', `The open/close state of a controlled popup is passed in via
        the 'isOpen' attribute. This means we can get open or close the popup
        from wherever we like. E.g. from a button inside the popup.
        Keeping this state external also means we can modify other parts of the
        page depending on whether the popup is open or not, such as the text
        on this button.
        Note, this is the same component as the popup above, but used in
        controlled mode.`),
        m(WidgetShowcase, {
          renderWidget: (opts) => m(ControlledPopup, opts),
          initialOpts: {},
        }),
        m('h2', 'Icon'),
        m(WidgetShowcase, {
          renderWidget: (opts) => m(Icon, {icon: 'star', ...opts}),
          initialOpts: {filled: false},
        }),
        m('h2', 'MultiSelect'),
        m(WidgetShowcase, {
          renderWidget: ({icon, ...rest}) => m(MultiSelect, {
            options: Object.entries(options).map(([key, value]) => {
              return {
                id: key,
                name: key,
                checked: value,
              };
            }),
            popupPosition: PopupPosition.Top,
            label: 'Multi Select',
            icon: icon ? LIBRARY_ADD_CHECK : undefined,
            onChange: (diffs: MultiSelectDiff[]) => {
              diffs.forEach(({id, checked}) => {
                options[id] = checked;
              });
              globals.rafScheduler.scheduleFullRedraw();
            },
            ...rest,
          }),
          initialOpts: {
            icon: true,
            showNumSelected: true,
            repeatCheckedItemsAtTop: false,
          },
        }),
        m('h2', 'PopupMenu'),
        m(WidgetShowcase, {
          renderWidget: () => {
            return m(PopupMenuButton, {
              icon: 'description',
              items: [
                {itemType: 'regular', text: 'New', callback: () => {}},
                {itemType: 'regular', text: 'Open', callback: () => {}},
                {itemType: 'regular', text: 'Save', callback: () => {}},
                {itemType: 'regular', text: 'Delete', callback: () => {}},
                {
                  itemType: 'group',
                  text: 'Share',
                  itemId: 'foo',
                  children: [
                    {itemType: 'regular', text: 'Friends', callback: () => {}},
                    {itemType: 'regular', text: 'Family', callback: () => {}},
                    {itemType: 'regular', text: 'Everyone', callback: () => {}},
                  ],
                },
              ],
            });
          },
        }),
        m('h2', 'Menu'),
        m(WidgetShowcase, {
          renderWidget: () => m(
              Menu,
              m(MenuItem, {label: 'New', icon: 'add'}),
              m(MenuItem, {label: 'Open', icon: 'folder_open'}),
              m(MenuItem, {label: 'Save', icon: 'save', disabled: true}),
              m(MenuDivider),
              m(MenuItem, {label: 'Delete', icon: 'delete'}),
              m(MenuDivider),
              m(
                  MenuItem,
                  {label: 'Share', icon: 'share'},
                  m(MenuItem, {label: 'Everyone', icon: 'public'}),
                  m(MenuItem, {label: 'Friends', icon: 'group'}),
                  m(
                      MenuItem,
                      {label: 'Specific people', icon: 'person_add'},
                      m(MenuItem, {label: 'Alice', icon: 'person'}),
                      m(MenuItem, {label: 'Bob', icon: 'person'}),
                      ),
                  ),
              m(
                  MenuItem,
                  {label: 'More', icon: 'more_horiz'},
                  m(MenuItem, {label: 'Query', icon: 'database'}),
                  m(MenuItem, {label: 'Download', icon: 'download'}),
                  m(MenuItem, {label: 'Clone', icon: 'copy_all'}),
                  ),
              ),

        }),
        m('h2', 'PopupMenu2'),
        m(WidgetShowcase, {
          renderWidget: (opts) => m(
              PopupMenu2,
              {
                trigger: m(Button, {label: 'Menu', icon: 'arrow_drop_down'}),
                ...opts,
              },
              m(MenuItem, {label: 'New', icon: 'add'}),
              m(MenuItem, {label: 'Open', icon: 'folder_open'}),
              m(MenuItem, {label: 'Save', icon: 'save', disabled: true}),
              m(MenuDivider),
              m(MenuItem, {label: 'Delete', icon: 'delete'}),
              m(MenuDivider),
              m(
                  MenuItem,
                  {label: 'Share', icon: 'share'},
                  m(MenuItem, {label: 'Everyone', icon: 'public'}),
                  m(MenuItem, {label: 'Friends', icon: 'group'}),
                  m(
                      MenuItem,
                      {label: 'Specific people', icon: 'person_add'},
                      m(MenuItem, {label: 'Alice', icon: 'person'}),
                      m(MenuItem, {label: 'Bob', icon: 'person'}),
                      ),
                  ),
              m(
                  MenuItem,
                  {label: 'More', icon: 'more_horiz'},
                  m(MenuItem, {label: 'Query', icon: 'database'}),
                  m(MenuItem, {label: 'Download', icon: 'download'}),
                  m(MenuItem, {label: 'Clone', icon: 'copy_all'}),
                  ),
              ),
          initialOpts: {
            popupPosition: new EnumOption(
                PopupPosition.Bottom,
                Object.values(PopupPosition),
                ),
          },
        }),
        m('h2', 'Spinner'),
        m('p', `Simple spinner, rotates forever. Width and height match the font
         size.`),
        m(WidgetShowcase, {
          renderWidget: ({fontSize, easing}) =>
              m('', {style: {fontSize}}, m(Spinner, {easing})),
          initialOpts: {
            fontSize: new EnumOption(
                '16px',
                ['12px', '16px', '24px', '32px', '64px', '128px'],
                ),
            easing: false,
          },
        }),
        m('h2', 'Tree'),
        m(WidgetShowcase, {
          renderWidget: (opts) => m(
              Tree,
              opts,
              m(TreeNode, {left: 'Name', right: 'my_event'}),
              m(TreeNode, {left: 'CPU', right: '2'}),
              m(TreeNode, {
                left: 'SQL',
                right: m(
                    PopupMenu2,
                    {
                      trigger: m(Anchor, {
                        text: 'SELECT * FROM ftrace_event WHERE id = 123',
                        icon: 'unfold_more',
                      }),
                    },
                    m(MenuItem, {
                      label: 'Copy SQL Query',
                      icon: 'content_copy',
                    }),
                    m(MenuItem, {
                      label: 'Execute Query in new tab',
                      icon: 'open_in_new',
                    }),
                    ),
              }),
              m(TreeNode, {
                left: 'Thread',
                right: m(Anchor, {text: 'my_thread[456]', icon: 'open_in_new'}),
              }),
              m(TreeNode, {
                left: 'Process',
                right: m(Anchor, {text: '/bin/foo[789]', icon: 'open_in_new'}),
              }),
              m(
                  TreeNode,
                  {left: 'Args', right: 'foo: bar, baz: qux'},
                  m(TreeNode, {left: 'foo', right: 'bar'}),
                  m(TreeNode, {left: 'baz', right: 'qux'}),
                  m(
                      TreeNode,
                      {left: 'quux'},
                      m(TreeNode, {left: '[0]', right: 'corge'}),
                      m(TreeNode, {left: '[1]', right: 'grault'}),
                      m(TreeNode, {left: '[2]', right: 'garply'}),
                      m(TreeNode, {left: '[3]', right: 'waldo'}),
                      ),
                  ),
              ),
          initialOpts: {
            layout: new EnumOption(
                TreeLayout.Grid,
                Object.values(TreeLayout),
                ),
          },
          wide: true,
        }),
        m('h2', 'Form'),
        m(
          WidgetShowcase, {
            renderWidget: () => m(
              Form,
              m(FormLabel, {for: 'foo'}, 'Foo'),
              m(TextInput, {id: 'foo'}),
              m(FormLabel, {for: 'bar'}, 'Bar'),
              m(Select, {id: 'bar'}, [
                m('option', {value: 'foo', label: 'Foo'}),
                m('option', {value: 'bar', label: 'Bar'}),
                m('option', {value: 'baz', label: 'Baz'}),
              ]),
              m(FormButtonBar,
                m(Button, {label: 'Submit', rightIcon: 'chevron_right'}),
                m(Button, {label: 'Cancel', minimal: true}),
              )),
          }),
    );
  },
});
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {assertExists} from '../base/logging';
import {hueForCpu} from '../common/colorizer';
import {TimeSpan} from '../common/time';

import {
  OVERVIEW_TIMELINE_NON_VISIBLE_COLOR,
  SIDEBAR_WIDTH,
  TRACK_SHELL_WIDTH,
} from './css_constants';
import {BorderDragStrategy} from './drag/border_drag_strategy';
import {DragStrategy} from './drag/drag_strategy';
import {InnerDragStrategy} from './drag/inner_drag_strategy';
import {OuterDragStrategy} from './drag/outer_drag_strategy';
import {DragGestureHandler} from './drag_gesture_handler';
import {globals} from './globals';
import {TickGenerator, TickType} from './gridline_helper';
import {Panel, PanelSize} from './panel';
import {TimeScale} from './time_scale';

export class OverviewTimelinePanel extends Panel {
  private static HANDLE_SIZE_PX = 5;

  private width = 0;
  private gesture?: DragGestureHandler;
  private timeScale?: TimeScale;
  private totTime = new TimeSpan(0, 0);
  private dragStrategy?: DragStrategy;
  private readonly boundOnMouseMove = this.onMouseMove.bind(this);

  // Must explicitly type now; arguments types are no longer auto-inferred.
  // https://github.com/Microsoft/TypeScript/issues/1373
  onupdate({dom}: m.CVnodeDOM) {
    this.width = dom.getBoundingClientRect().width;
    this.totTime = new TimeSpan(
        globals.state.traceTime.startSec, globals.state.traceTime.endSec);
    this.timeScale = new TimeScale(
        this.totTime, [TRACK_SHELL_WIDTH, assertExists(this.width)]);

    if (this.gesture === undefined) {
      this.gesture = new DragGestureHandler(
          dom as HTMLElement,
          this.onDrag.bind(this),
          this.onDragStart.bind(this),
          this.onDragEnd.bind(this));
    }
  }

  oncreate(vnode: m.CVnodeDOM) {
    this.onupdate(vnode);
    (vnode.dom as HTMLElement)
        .addEventListener('mousemove', this.boundOnMouseMove);
  }

  onremove({dom}: m.CVnodeDOM) {
    (dom as HTMLElement)
        .removeEventListener('mousemove', this.boundOnMouseMove);
  }

  view() {
    return m('.overview-timeline');
  }

  renderCanvas(ctx: CanvasRenderingContext2D, size: PanelSize) {
    if (this.width === undefined) return;
    if (this.timeScale === undefined) return;
    const headerHeight = 20;
    const tracksHeight = size.height - headerHeight;
    const timeSpan = new TimeSpan(0, this.totTime.duration);

    const timeScale = new TimeScale(timeSpan, [TRACK_SHELL_WIDTH, this.width]);

    if (timeScale.timeSpan.duration > 0 && timeScale.widthPx > 0) {
      const tickGen = new TickGenerator(timeScale);

      // Draw time labels on the top header.
      ctx.font = '10px Roboto Condensed';
      ctx.fillStyle = '#999';
      for (const {type, time, position} of tickGen) {
        const xPos = Math.round(position);
        if (xPos <= 0) continue;
        if (xPos > this.width) break;
        if (type === TickType.MAJOR) {
          ctx.fillRect(xPos - 1, 0, 1, headerHeight - 5);
          ctx.fillText(time.toFixed(tickGen.digits) + ' s', xPos + 5, 18);
        } else if (type == TickType.MEDIUM) {
          ctx.fillRect(xPos - 1, 0, 1, 8);
        } else if (type == TickType.MINOR) {
          ctx.fillRect(xPos - 1, 0, 1, 5);
        }
      }
    }

    // Draw mini-tracks with quanitzed density for each process.
    if (globals.overviewStore.size > 0) {
      const numTracks = globals.overviewStore.size;
      let y = 0;
      const trackHeight = (tracksHeight - 1) / numTracks;
      for (const key of globals.overviewStore.keys()) {
        const loads = globals.overviewStore.get(key)!;
        for (let i = 0; i < loads.length; i++) {
          const xStart = Math.floor(this.timeScale.timeToPx(loads[i].startSec));
          const xEnd = Math.ceil(this.timeScale.timeToPx(loads[i].endSec));
          const yOff = Math.floor(headerHeight + y * trackHeight);
          const lightness = Math.ceil((1 - loads[i].load * 0.7) * 100);
          ctx.fillStyle = `hsl(${hueForCpu(y)}, 50%, ${lightness}%)`;
          ctx.fillRect(xStart, yOff, xEnd - xStart, Math.ceil(trackHeight));
        }
        y++;
      }
    }

    // Draw bottom border.
    ctx.fillStyle = '#dadada';
    ctx.fillRect(0, size.height - 1, this.width, 1);

    // Draw semi-opaque rects that occlude the non-visible time range.
    const [vizStartPx, vizEndPx] =
        OverviewTimelinePanel.extractBounds(this.timeScale);

    ctx.fillStyle = OVERVIEW_TIMELINE_NON_VISIBLE_COLOR;
    ctx.fillRect(
        TRACK_SHELL_WIDTH - 1,
        headerHeight,
        vizStartPx - TRACK_SHELL_WIDTH,
        tracksHeight);
    ctx.fillRect(vizEndPx, headerHeight, this.width - vizEndPx, tracksHeight);

    // Draw brushes.
    ctx.fillStyle = '#999';
    ctx.fillRect(vizStartPx - 1, headerHeight, 1, tracksHeight);
    ctx.fillRect(vizEndPx, headerHeight, 1, tracksHeight);

    const hbarWidth = OverviewTimelinePanel.HANDLE_SIZE_PX;
    const hbarHeight = tracksHeight * 0.4;
    // Draw handlebar
    ctx.fillRect(
        vizStartPx - Math.floor(hbarWidth / 2) - 1,
        headerHeight,
        hbarWidth,
        hbarHeight);
    ctx.fillRect(
        vizEndPx - Math.floor(hbarWidth / 2),
        headerHeight,
        hbarWidth,
        hbarHeight);
  }

  private onMouseMove(e: MouseEvent) {
    if (this.gesture === undefined || this.gesture.isDragging) {
      return;
    }
    (e.target as HTMLElement).style.cursor = this.chooseCursor(e.x);
  }

  private chooseCursor(x: number) {
    if (this.timeScale === undefined) return 'default';
    const [vizStartPx, vizEndPx] =
        OverviewTimelinePanel.extractBounds(this.timeScale);
    const startBound = vizStartPx - 1 + SIDEBAR_WIDTH;
    const endBound = vizEndPx + SIDEBAR_WIDTH;
    if (OverviewTimelinePanel.inBorderRange(x, startBound) ||
        OverviewTimelinePanel.inBorderRange(x, endBound)) {
      return 'ew-resize';
    } else if (x < SIDEBAR_WIDTH + TRACK_SHELL_WIDTH) {
      return 'default';
    } else if (x < startBound || endBound < x) {
      return 'crosshair';
    } else {
      return 'all-scroll';
    }
  }

  onDrag(x: number) {
    if (this.dragStrategy === undefined) return;
    this.dragStrategy.onDrag(x);
  }

  onDragStart(x: number) {
    if (this.timeScale === undefined) return;
    const pixelBounds = OverviewTimelinePanel.extractBounds(this.timeScale);
    if (OverviewTimelinePanel.inBorderRange(x, pixelBounds[0]) ||
        OverviewTimelinePanel.inBorderRange(x, pixelBounds[1])) {
      this.dragStrategy = new BorderDragStrategy(this.timeScale, pixelBounds);
    } else if (x < pixelBounds[0] || pixelBounds[1] < x) {
      this.dragStrategy = new OuterDragStrategy(this.timeScale);
    } else {
      this.dragStrategy = new InnerDragStrategy(this.timeScale, pixelBounds);
    }
    this.dragStrategy.onDragStart(x);
  }

  onDragEnd() {
    this.dragStrategy = undefined;
  }

  private static extractBounds(timeScale: TimeScale): [number, number] {
    const vizTime = globals.frontendLocalState.getVisibleStateBounds();
    return [
      Math.floor(timeScale.timeToPx(vizTime[0])),
      Math.ceil(timeScale.timeToPx(vizTime[1])),
    ];
  }

  private static inBorderRange(a: number, b: number): boolean {
    return Math.abs(a - b) < this.HANDLE_SIZE_PX / 2;
  }
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export interface SliceLayoutBase {
  padding: number;     // top/bottom pixel padding between slices and track.
  rowSpacing: number;  // Spacing between rows.
  minDepth: number;    // Minimum depth a slice can be (normally zero)
  // Maximum depth a slice can be plus 1 (a half open range with minDepth).
  // We have a optimization for when maxDepth - minDepth == 1 so it is useful
  // to set this correctly:
  maxDepth: number;
}

export const SLICE_LAYOUT_BASE_DEFAULTS: SliceLayoutBase = Object.freeze({
  padding: 3,
  rowSpacing: 0,
  minDepth: 0,
  // A realistic bound to avoid tracks with unlimited height. If somebody wants
  // extremely deep tracks they need to change this explicitly.
  maxDepth: 128,
});

export interface SliceLayoutFixed extends SliceLayoutBase {
  heightMode: 'FIXED';
  fixedHeight: number;  // Outer height of the track.
}

export const SLICE_LAYOUT_FIXED_DEFAULTS: SliceLayoutFixed = Object.freeze({
  ...SLICE_LAYOUT_BASE_DEFAULTS,
  heightMode: 'FIXED',
  fixedHeight: 30,
});

export interface SliceLayoutFitContent extends SliceLayoutBase {
  heightMode: 'FIT_CONTENT';
  sliceHeight: number;  // Only when heightMode = 'FIT_CONTENT'.
}

export const SLICE_LAYOUT_FIT_CONTENT_DEFAULTS: SliceLayoutFitContent =
    Object.freeze({
      ...SLICE_LAYOUT_BASE_DEFAULTS,
      heightMode: 'FIT_CONTENT',
      sliceHeight: 18,
    });

export interface SliceLayoutFlat extends SliceLayoutBase {
  heightMode: 'FIXED';
  fixedHeight: number;  // Outer height of the track.
  minDepth: 0;
  maxDepth: 1;
}

export const SLICE_LAYOUT_FLAT_DEFAULTS: SliceLayoutFlat = Object.freeze({
  ...SLICE_LAYOUT_BASE_DEFAULTS,
  minDepth: 0,
  maxDepth: 1,
  heightMode: 'FIXED',
  fixedHeight: 30,
});

export type SliceLayout =
    SliceLayoutFixed|SliceLayoutFitContent|SliceLayoutFlat;

export const DEFAULT_SLICE_LAYOUT: SliceLayout =
    SLICE_LAYOUT_FIT_CONTENT_DEFAULTS;

// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {globals} from './globals';
import {
  KeyboardLayoutMap,
  nativeKeyboardLayoutMap,
  NotSupportedError,
} from './keyboard_layout_map';
import {showModal} from './modal';
import {KeyMapping} from './pan_and_zoom_handler';
import {Spinner} from './widgets/spinner';

export function toggleHelp() {
  globals.logging.logEvent('User Actions', 'Show help');
  showHelp();
}

function keycap(glyph: m.Children): m.Children {
  return m('.keycap', glyph);
}

// A fallback keyboard map based on the QWERTY keymap. Converts keyboard event
// codes to their associated glyphs on an English QWERTY keyboard.
class EnglishQwertyKeyboardLayoutMap implements KeyboardLayoutMap {
  get(code: string): string {
    // Converts 'KeyX' -> 'x'
    return code.replace(/^Key([A-Z])$/, '$1').toLowerCase();
  }
}

class KeyMappingsHelp implements m.ClassComponent {
  private keyMap?: KeyboardLayoutMap;

  oninit() {
    nativeKeyboardLayoutMap()
        .then((keyMap: KeyboardLayoutMap) => {
          this.keyMap = keyMap;
          globals.rafScheduler.scheduleFullRedraw();
        })
        .catch((e) => {
          if (e instanceof NotSupportedError ||
              e.toString().includes('SecurityError')) {
            // Keyboard layout is unavailable. Since showing the keyboard
            // mappings correct for the user's keyboard layout is a nice-to-
            // have, and users with non-QWERTY layouts are usually aware of the
            // fact that the are using non-QWERTY layouts, we resort to showing
            // English QWERTY mappings as a best-effort approach.
            // The alternative would be to show key mappings for all keyboard
            // layouts which is not feasible.
            this.keyMap = new EnglishQwertyKeyboardLayoutMap();
            globals.rafScheduler.scheduleFullRedraw();
          } else {
            // Something unexpected happened. Either the browser doesn't conform
            // to the keyboard API spec, or the keyboard API spec has changed!
            throw e;
          }
        });
  }

  view(_: m.Vnode): m.Children {
    const ctrlOrCmd =
        window.navigator.platform.indexOf('Mac') !== -1 ? 'Cmd' : 'Ctrl';

    const queryPageInstructions = globals.hideSidebar ? [] : [
      m('h2', 'Making SQL queries from the query page'),
      m('table',
        m('tr',
          m('td', keycap('Ctrl'), ' + ', keycap('Enter')),
          m('td', 'Execute query')),
        m('tr',
          m('td', keycap('Ctrl'), ' + ', keycap('Enter'), ' (with selection)'),
          m('td', 'Execute selection'))),
    ];

    const sidebarInstructions = globals.hideSidebar ?
        [] :
        [m('tr',
           m('td', keycap(ctrlOrCmd), ' + ', keycap('b')),
           m('td', 'Toggle display of sidebar'))];

    return m(
        '.help',
        m('h2', 'Navigation'),
        m(
            'table',
            m(
                'tr',
                m('td',
                  this.codeToKeycap(KeyMapping.KEY_ZOOM_IN),
                  '/',
                  this.codeToKeycap(KeyMapping.KEY_ZOOM_OUT)),
                m('td', 'Zoom in/out'),
                ),
            m(
                'tr',
                m('td',
                  this.codeToKeycap(KeyMapping.KEY_PAN_LEFT),
                  '/',
                  this.codeToKeycap(KeyMapping.KEY_PAN_RIGHT)),
                m('td', 'Pan left/right'),
                ),
            ),
        m('h2', 'Mouse Controls'),
        m('table',
          m('tr', m('td', 'Click'), m('td', 'Select event')),
          m('tr', m('td', 'Ctrl + Scroll wheel'), m('td', 'Zoom in/out')),
          m('tr', m('td', 'Click + Drag'), m('td', 'Select area')),
          m('tr', m('td', 'Shift + Click + Drag'), m('td', 'Pan left/right'))),
        m('h2', 'Making SQL queries from the viewer page'),
        m('table',
          m('tr',
            m('td', keycap(':'), ' in the (empty) search box'),
            m('td', 'Switch to query input')),
          m('tr', m('td', keycap('Enter')), m('td', 'Execute query')),
          m('tr',
            m('td', keycap('Ctrl'), ' + ', keycap('Enter')),
            m('td',
              'Execute query and pin output ' +
                  '(output will not be replaced by regular query input)'))),
        ...queryPageInstructions,
        m('h2', 'Other'),
        m(
            'table',
            m('tr',
              m('td', keycap('f'), ' (with event selected)'),
              m('td', 'Scroll + zoom to current selection')),
            m('tr',
              m('td', keycap('['), '/', keycap(']'), ' (with event selected)'),
              m('td',
                'Select next/previous slice that is connected by a flow.',
                m('br'),
                'If there are multiple flows,' +
                    'the one that is in focus (bold) is selected')),
            m('tr',
              m('td',
                keycap(ctrlOrCmd),
                ' + ',
                keycap('['),
                '/',
                keycap(']'),
                ' (with event selected)'),
              m('td', 'Switch focus to another flow')),
            m('tr',
              m('td', keycap('m'), ' (with event or area selected)'),
              m('td', 'Mark the area (temporarily)')),
            m('tr',
              m('td',
                keycap('Shift'),
                ' + ',
                keycap('m'),
                ' (with event or area selected)'),
              m('td', 'Mark the area (persistently)')),
            m('tr',
              m('td', keycap(ctrlOrCmd), ' + ', keycap('a')),
              m('td', 'Select all')),
            ...sidebarInstructions,
            m('tr', m('td', keycap('?')), m('td', 'Show help')),
            ));
  }

  private codeToKeycap(code: string): m.Children {
    if (this.keyMap) {
      return keycap(this.keyMap.get(code));
    } else {
      return keycap(m(Spinner));
    }
  }
}

function showHelp() {
  showModal({
    title: 'Perfetto Help',
    content: () => m(KeyMappingsHelp),
    buttons: [],
  });
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Handles registration, unregistration and lifecycle of the service worker.
// This class contains only the controlling logic, all the code in here runs in
// the main thread, not in the service worker thread.
// The actual service worker code is in src/service_worker.
// Design doc: http://go/perfetto-offline.

import {reportError} from '../base/logging';
import {ignoreCacheUnactionableErrors} from '../common/errors';

import {globals} from './globals';

// We use a dedicated |caches| object to share a global boolean beween the main
// thread and the SW. SW cannot use local-storage or anything else other than
// IndexedDB (which would be overkill).
const BYPASS_ID = 'BYPASS_SERVICE_WORKER';

class BypassCache {
  static async isBypassed(): Promise<boolean> {
    try {
      return await caches.has(BYPASS_ID);
    } catch (e) {
      return ignoreCacheUnactionableErrors(e, false);
    }
  }

  static async setBypass(bypass: boolean): Promise<void> {
    try {
      if (bypass) {
        await caches.open(BYPASS_ID);
      } else {
        await caches.delete(BYPASS_ID);
      }
    } catch (e) {
      ignoreCacheUnactionableErrors(e, undefined);
    }
  }
}

export class ServiceWorkerController {
  private _initialWorker: ServiceWorker|null = null;
  private _bypassed = false;
  private _installing = false;

  // Caller should reload().
  async setBypass(bypass: boolean) {
    if (!('serviceWorker' in navigator)) return;  // Not supported.
    this._bypassed = bypass;
    if (bypass) {
      await BypassCache.setBypass(true);  // Create the entry.
      for (const reg of await navigator.serviceWorker.getRegistrations()) {
        await reg.unregister();
      }
    } else {
      await BypassCache.setBypass(false);
      if (window.localStorage) {
        window.localStorage.setItem('bypassDisabled', '1');
      }
      this.install();
    }
    globals.rafScheduler.scheduleFullRedraw();
  }

  onStateChange(sw: ServiceWorker) {
    globals.rafScheduler.scheduleFullRedraw();
    if (sw.state === 'installing') {
      this._installing = true;
    } else if (sw.state === 'activated') {
      this._installing = false;
      // Don't show the notification if the site was served straight
      // from the network (e.g., on the very first visit or after
      // Ctrl+Shift+R). In these cases, we are already at the last
      // version.
      if (sw !== this._initialWorker && this._initialWorker) {
        globals.frontendLocalState.newVersionAvailable = true;
      }
    }
  }

  monitorWorker(sw: ServiceWorker|null) {
    if (!sw) return;
    sw.addEventListener('error', (e) => reportError(e));
    sw.addEventListener('statechange', () => this.onStateChange(sw));
    this.onStateChange(sw);  // Trigger updates for the current state.
  }

  async install() {
    if (!('serviceWorker' in navigator)) return;  // Not supported.

    if (location.pathname !== '/') {
      // Disable the service worker when the UI is loaded from a non-root URL
      // (e.g. from the CI artifacts GCS bucket). Supporting the case of a
      // nested index.html is too cumbersome and has no benefits.
      return;
    }

    // If this is localhost disable the service worker by default, unless the
    // user manually re-enabled it (in which case bypassDisabled = '1').
    const hostname = location.hostname;
    const isLocalhost = ['127.0.0.1', '::1', 'localhost'].includes(hostname);
    const bypassDisabled = window.localStorage &&
        window.localStorage.getItem('bypassDisabled') === '1';
    if (isLocalhost && !bypassDisabled) {
      await this.setBypass(true);  // Will cause the check below to bail out.
    }

    if (await BypassCache.isBypassed()) {
      this._bypassed = true;
      console.log('Skipping service worker registration, disabled by the user');
      return;
    }
    // In production cases versionDir == VERSION. We use this here for ease of
    // testing (so we can have /v1.0.0a/ /v1.0.0b/ even if they have the same
    // version code).
    const versionDir = globals.root.split('/').slice(-2)[0];
    const swUri = `/service_worker.js?v=${versionDir}`;
    navigator.serviceWorker.register(swUri).then((registration) => {
      this._initialWorker = registration.active;

      // At this point there are two options:
      // 1. This is the first time we visit the site (or cache was cleared) and
      //    no SW is installed yet. In this case |installing| will be set.
      // 2. A SW is already installed (though it might be obsolete). In this
      //    case |active| will be set.
      this.monitorWorker(registration.installing);
      this.monitorWorker(registration.active);

      // Setup the event that shows the "Updated to v1.2.3" notification.
      registration.addEventListener('updatefound', () => {
        this.monitorWorker(registration.installing);
      });
    });
  }

  get bypassed() {
    return this._bypassed;
  }
  get installing() {
    return this._installing;
  }
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions, PostedScrollToRange, PostedTrace} from '../common/actions';

import {initCssConstants} from './css_constants';
import {globals} from './globals';
import {toggleHelp} from './help_modal';
import {showModal} from './modal';
import {focusHorizontalRange} from './scroll_helper';

interface PostedTraceWrapped {
  perfetto: PostedTrace;
}

interface PostedScrollToRangeWrapped {
  perfetto: PostedScrollToRange;
}

// Returns whether incoming traces should be opened automatically or should
// instead require a user interaction.
function isTrustedOrigin(origin: string): boolean {
  const TRUSTED_ORIGINS = [
    'https://chrometto.googleplex.com',
    'https://uma.googleplex.com',
    'https://android-build.googleplex.com',
  ];
  if (origin === window.origin) return true;
  if (TRUSTED_ORIGINS.includes(origin)) return true;

  const hostname = new URL(origin).hostname;
  if (hostname.endsWith('corp.google.com')) return true;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
  return false;
}

// Returns whether we should ignore a given message based on the value of
// the 'perfettoIgnore' field in the event data.
function shouldGracefullyIgnoreMessage(messageEvent: MessageEvent) {
  return messageEvent.data.perfettoIgnore === true;
}

// The message handler supports loading traces from an ArrayBuffer.
// There is no other requirement than sending the ArrayBuffer as the |data|
// property. However, since this will happen across different origins, it is not
// possible for the source website to inspect whether the message handler is
// ready, so the message handler always replies to a 'PING' message with 'PONG',
// which indicates it is ready to receive a trace.
export function postMessageHandler(messageEvent: MessageEvent) {
  if (shouldGracefullyIgnoreMessage(messageEvent)) {
    // This message should not be handled in this handler,
    // because it will be handled elsewhere.
    return;
  }

  if (messageEvent.origin === 'https://tagassistant.google.com') {
    // The GA debugger, does a window.open() and sends messages to the GA
    // script. Ignore them.
    return;
  }

  if (document.readyState !== 'complete') {
    console.error('Ignoring message - document not ready yet.');
    return;
  }

  const fromOpener = messageEvent.source === window.opener;
  const fromIframeHost = messageEvent.source === window.parent;
  // This adds support for the folowing flow:
  // * A (page that whats to open a trace in perfetto) opens B
  // * B (does something to get the traceBuffer)
  // * A is navigated to Perfetto UI
  // * B sends the traceBuffer to A
  // * closes itself
  const fromOpenee = (messageEvent.source as WindowProxy).opener === window;

  if (messageEvent.source === null ||
      !(fromOpener || fromIframeHost || fromOpenee)) {
    // This can happen if an extension tries to postMessage.
    return;
  }

  if (!('data' in messageEvent)) {
    throw new Error('Incoming message has no data property');
  }

  if (messageEvent.data === 'PING') {
    // Cross-origin messaging means we can't read |messageEvent.source|, but
    // it still needs to be of the correct type to be able to invoke the
    // correct version of postMessage(...).
    const windowSource = messageEvent.source as Window;
    windowSource.postMessage('PONG', messageEvent.origin);
    return;
  }

  if (messageEvent.data === 'SHOW-HELP') {
    toggleHelp();
    return;
  }

  if (messageEvent.data === 'RELOAD-CSS-CONSTANTS') {
    initCssConstants();
    return;
  }

  let postedScrollToRange: PostedScrollToRange;
  if (isPostedScrollToRange(messageEvent.data)) {
    postedScrollToRange = messageEvent.data.perfetto;
    scrollToTimeRange(postedScrollToRange);
    return;
  }

  let postedTrace: PostedTrace;
  let keepApiOpen = false;
  if (isPostedTraceWrapped(messageEvent.data)) {
    postedTrace = sanitizePostedTrace(messageEvent.data.perfetto);
    if (postedTrace.keepApiOpen) {
      keepApiOpen = true;
    }
  } else if (messageEvent.data instanceof ArrayBuffer) {
    postedTrace = {title: 'External trace', buffer: messageEvent.data};
  } else {
    console.warn(
        'Unknown postMessage() event received. If you are trying to open a ' +
        'trace via postMessage(), this is a bug in your code. If not, this ' +
        'could be due to some Chrome extension.');
    console.log('origin:', messageEvent.origin, 'data:', messageEvent.data);
    return;
  }

  if (postedTrace.buffer.byteLength === 0) {
    throw new Error('Incoming message trace buffer is empty');
  }

  if (!keepApiOpen) {
    /* Removing this event listener to avoid callers posting the trace multiple
     * times. If the callers add an event listener which upon receiving 'PONG'
     * posts the trace to ui.perfetto.dev, the callers can receive multiple
     * 'PONG' messages and accidentally post the trace multiple times. This was
     * part of the cause of b/182502595.
     */
    window.removeEventListener('message', postMessageHandler);
  }

  const openTrace = () => {
    // For external traces, we need to disable other features such as
    // downloading and sharing a trace.
    postedTrace.localOnly = true;
    globals.dispatch(Actions.openTraceFromBuffer(postedTrace));
  };

  // If the origin is trusted open the trace directly.
  if (isTrustedOrigin(messageEvent.origin)) {
    openTrace();
    return;
  }

  // If not ask the user if they expect this and trust the origin.
  showModal({
    title: 'Open trace?',
    content:
        m('div',
          m('div', `${messageEvent.origin} is trying to open a trace file.`),
          m('div', 'Do you trust the origin and want to proceed?')),
    buttons: [
      {text: 'NO', primary: true},
      {text: 'YES', primary: false, action: openTrace},
    ],
  });
}

function sanitizePostedTrace(postedTrace: PostedTrace): PostedTrace {
  const result: PostedTrace = {
    title: sanitizeString(postedTrace.title),
    buffer: postedTrace.buffer,
    keepApiOpen: postedTrace.keepApiOpen,
  };
  if (postedTrace.url !== undefined) {
    result.url = sanitizeString(postedTrace.url);
  }
  return result;
}

function sanitizeString(str: string): string {
  return str.replace(/[^A-Za-z0-9.\-_#:/?=&;%+$ ]/g, ' ');
}

function isTraceViewerReady(): boolean {
  return !!(globals.getCurrentEngine()?.ready);
}

const _maxScrollToRangeAttempts = 20;
async function scrollToTimeRange(
    postedScrollToRange: PostedScrollToRange, maxAttempts?: number) {
  const ready = isTraceViewerReady();
  if (!ready) {
    if (maxAttempts === undefined) {
      maxAttempts = 0;
    }
    if (maxAttempts > _maxScrollToRangeAttempts) {
      console.warn('Could not scroll to time range. Trace viewer not ready.');
      return;
    }
    setTimeout(scrollToTimeRange, 200, postedScrollToRange, maxAttempts + 1);
  } else {
    focusHorizontalRange(
        postedScrollToRange.timeStart,
        postedScrollToRange.timeEnd,
        postedScrollToRange.viewPercentage);
  }
}

function isPostedScrollToRange(obj: unknown):
    obj is PostedScrollToRangeWrapped {
  const wrapped = obj as PostedScrollToRangeWrapped;
  if (wrapped.perfetto === undefined) {
    return false;
  }
  return wrapped.perfetto.timeStart !== undefined ||
      wrapped.perfetto.timeEnd !== undefined;
}

function isPostedTraceWrapped(obj: any): obj is PostedTraceWrapped {
  const wrapped = obj as PostedTraceWrapped;
  if (wrapped.perfetto === undefined) {
    return false;
  }
  return wrapped.perfetto.buffer !== undefined &&
      wrapped.perfetto.title !== undefined;
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {inflate} from 'pako';
import {assertTrue} from '../base/logging';
import {globals} from './globals';
import {showModal} from './modal';

const CTRACE_HEADER = 'TRACE:\n';

async function isCtrace(file: File): Promise<boolean> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.ctrace')) {
    return true;
  }

  // .ctrace files sometimes end with .txt. We can detect these via
  // the presence of TRACE: near the top of the file.
  if (fileName.endsWith('.txt')) {
    const header = await readText(file.slice(0, 128));
    if (header.includes(CTRACE_HEADER)) {
      return true;
    }
  }

  return false;
}

function readText(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        return resolve(reader.result);
      }
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsText(blob);
  });
}

export async function isLegacyTrace(file: File): Promise<boolean> {
  const fileName = file.name.toLowerCase();
  if (fileName.endsWith('.json') || fileName.endsWith('.json.gz') ||
      fileName.endsWith('.zip') || fileName.endsWith('.html')) {
    return true;
  }

  if (await isCtrace(file)) {
    return true;
  }

  // Sometimes systrace formatted traces end with '.trace'. This is a
  // little generic to assume all such traces are systrace format though
  // so we read the beginning of the file and check to see if is has the
  // systrace header (several comment lines):
  if (fileName.endsWith('.trace')) {
    const header = await readText(file.slice(0, 512));
    const lines = header.split('\n');
    let commentCount = 0;
    for (const line of lines) {
      if (line.startsWith('#')) {
        commentCount++;
      }
    }
    if (commentCount > 5) {
      return true;
    }
  }

  return false;
}

export async function openFileWithLegacyTraceViewer(file: File) {
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.result instanceof ArrayBuffer) {
      return openBufferWithLegacyTraceViewer(
          file.name, reader.result, reader.result.byteLength);
    } else {
      const str = reader.result as string;
      return openBufferWithLegacyTraceViewer(file.name, str, str.length);
    }
  };
  reader.onerror = (err) => {
    console.error(err);
  };
  if (file.name.endsWith('.gz') || file.name.endsWith('.zip') ||
      await isCtrace(file)) {
    reader.readAsArrayBuffer(file);
  } else {
    reader.readAsText(file);
  }
}

export function openBufferWithLegacyTraceViewer(
    name: string, data: ArrayBuffer|string, size: number) {
  if (data instanceof ArrayBuffer) {
    assertTrue(size <= data.byteLength);
    if (size !== data.byteLength) {
      data = data.slice(0, size);
    }

    // Handle .ctrace files.
    const enc = new TextDecoder('utf-8');
    const header = enc.decode(data.slice(0, 128));
    if (header.includes(CTRACE_HEADER)) {
      const offset = header.indexOf(CTRACE_HEADER) + CTRACE_HEADER.length;
      data = inflate(new Uint8Array(data.slice(offset)), {to: 'string'});
    }
  }

  // The location.pathname mangling is to make this code work also when hosted
  // in a non-root sub-directory, for the case of CI artifacts.
  const catapultUrl = globals.root + 'assets/catapult_trace_viewer.html';
  const newWin = window.open(catapultUrl) as Window;
  if (newWin) {
    // Popup succeedeed.
    newWin.addEventListener('load', (e: Event) => {
      const doc = (e.target as Document);
      const ctl = doc.querySelector('x-profiling-view') as TraceViewerAPI;
      ctl.setActiveTrace(name, data);
    });
    return;
  }

  // Popup blocker detected.
  showModal({
    title: 'Open trace in the legacy Catapult Trace Viewer',
    content: m(
        'div',
        m('div', 'You are seeing this interstitial because popups are blocked'),
        m('div', 'Enable popups to skip this dialog next time.')),
    buttons: [{
      text: 'Open legacy UI',
      primary: true,
      action: () => openBufferWithLegacyTraceViewer(name, data, size),
    }],
  });
}

// TraceViewer method that we wire up to trigger the file load.
interface TraceViewerAPI extends Element {
  setActiveTrace(name: string, data: ArrayBuffer|string): void;
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

export interface PanelSize {
  width: number;
  height: number;
}

export abstract class Panel<Attrs = {}> implements m.ClassComponent<Attrs> {
  abstract renderCanvas(
      ctx: CanvasRenderingContext2D, size: PanelSize,
      vnode: PanelVNode<Attrs>): void;
  abstract view(vnode: m.CVnode<Attrs>): m.Children|null|void;
}


export type PanelVNode<Attrs = {}> = m.Vnode<Attrs, Panel<Attrs>>;

export function isPanelVNode(vnode: m.Vnode): vnode is PanelVNode<{}> {
  const tag = vnode.tag as {};
  return (
      typeof tag === 'function' && 'prototype' in tag &&
      tag.prototype instanceof Panel);
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Actions} from '../common/actions';
import {getContainingTrackId} from '../common/state';
import {fromNs, TimeSpan, toNs} from '../common/time';

import {globals} from './globals';

const INCOMPLETE_SLICE_TIME_S = 0.00003;

// Given a timestamp, if |ts| is not currently in view move the view to
// center |ts|, keeping the same zoom level.
export function horizontalScrollToTs(ts: number) {
  const startNs = toNs(globals.frontendLocalState.visibleWindowTime.start);
  const endNs = toNs(globals.frontendLocalState.visibleWindowTime.end);
  const currentViewNs = endNs - startNs;
  if (ts < startNs || ts > endNs) {
    // TODO(hjd): This is an ugly jump, we should do a smooth pan instead.
    globals.frontendLocalState.updateVisibleTime(new TimeSpan(
        fromNs(ts - currentViewNs / 2), fromNs(ts + currentViewNs / 2)));
  }
}

// Given a start and end timestamp (in ns), move the viewport to center this
// range and zoom if necessary:
// - If [viewPercentage] is specified, the viewport will be zoomed so that
//   the given time range takes up this percentage of the viewport.
// The following scenarios assume [viewPercentage] is undefined.
// - If the new range is more than 50% of the viewport, zoom out to a level
// where
//   the range is 1/5 of the viewport.
// - If the new range is already centered, update the zoom level for the
// viewport
//   to cover 1/5 of the viewport.
// - Otherwise, preserve the zoom range.
export function focusHorizontalRange(
    startTs: number, endTs: number, viewPercentage?: number) {
  const visibleDur = globals.frontendLocalState.visibleWindowTime.end -
      globals.frontendLocalState.visibleWindowTime.start;
  let selectDur = endTs - startTs;
  // TODO(altimin): We go from `ts` and `dur` to `startTs` and `endTs` and back
  // to `dur`. We should fix that.
  if (toNs(selectDur) === -1) {  // Unfinished slice
    selectDur = INCOMPLETE_SLICE_TIME_S;
    endTs = startTs;
  }

  if (viewPercentage !== undefined) {
    if (viewPercentage <= 0.0 || viewPercentage > 1.0) {
      console.warn(
          'Invalid value for [viewPercentage]. ' +
              'Value must be between 0.0 (exclusive) and 1.0 (inclusive).',
      );
      // Default to 50%.
      viewPercentage = 0.5;
    }
    const paddingPercentage = 1.0 - viewPercentage;
    const paddingTime = selectDur * paddingPercentage;
    const halfPaddingTime = paddingTime / 2;
    globals.frontendLocalState.updateVisibleTime(
        new TimeSpan(startTs - halfPaddingTime, endTs + halfPaddingTime));
    return;
  }

  // If the range is too large to fit on the current zoom level, resize.
  if (selectDur > 0.5 * visibleDur) {
    globals.frontendLocalState.updateVisibleTime(
        new TimeSpan(startTs - (selectDur * 2), endTs + (selectDur * 2)));
    return;
  }
  const midpointTs = (endTs + startTs) / 2;
  // Calculate the new visible window preserving the zoom level.
  let newStartTs = midpointTs - visibleDur / 2;
  let newEndTs = midpointTs + visibleDur / 2;

  // Adjust the new visible window if it intersects with the trace boundaries.
  // It's needed to make the "update the zoom level if visible window doesn't
  // change" logic reliable.
  if (newEndTs > globals.state.traceTime.endSec) {
    newStartTs = globals.state.traceTime.endSec - visibleDur;
    newEndTs = globals.state.traceTime.endSec;
  }
  if (newStartTs < globals.state.traceTime.startSec) {
    newStartTs = globals.state.traceTime.startSec;
    newEndTs = globals.state.traceTime.startSec + visibleDur;
  }

  const newStartNs = toNs(newStartTs);
  const newEndNs = toNs(newEndTs);

  const viewStartNs = toNs(globals.frontendLocalState.visibleWindowTime.start);
  const viewEndNs = toNs(globals.frontendLocalState.visibleWindowTime.end);

  // If preserving the zoom doesn't change the visible window, update the zoom
  // level.
  if (newStartNs === viewStartNs && newEndNs === viewEndNs) {
    globals.frontendLocalState.updateVisibleTime(
        new TimeSpan(startTs - (selectDur * 2), endTs + (selectDur * 2)));
    return;
  }
  globals.frontendLocalState.updateVisibleTime(
      new TimeSpan(newStartTs, newEndTs));
}

// Given a track id, find a track with that id and scroll it into view. If the
// track is nested inside a track group, scroll to that track group instead.
// If |openGroup| then open the track group and scroll to the track.
export function verticalScrollToTrack(
    trackId: string|number, openGroup = false) {
  const trackIdString = `${trackId}`;
  const track = document.querySelector('#track_' + trackIdString);

  if (track) {
    // block: 'nearest' means that it will only scroll if the track is not
    // currently in view.
    track.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    return;
  }

  let trackGroup = null;
  const trackGroupId = getContainingTrackId(globals.state, trackIdString);
  if (trackGroupId) {
    trackGroup = document.querySelector('#track_' + trackGroupId);
  }

  if (!trackGroupId || !trackGroup) {
    console.error(`Can't scroll, track (${trackIdString}) not found.`);
    return;
  }

  // The requested track is inside a closed track group, either open the track
  // group and scroll to the track or just scroll to the track group.
  if (openGroup) {
    // After the track exists in the dom, it will be scrolled to.
    globals.frontendLocalState.scrollToTrackId = trackId;
    globals.dispatch(Actions.toggleTrackGroupCollapsed({trackGroupId}));
    return;
  } else {
    trackGroup.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }
}


// Scroll vertically and horizontally to reach track (|trackId|) at |ts|.
export function scrollToTrackAndTs(
    trackId: string|number|undefined, ts: number, openGroup = false) {
  if (trackId !== undefined) {
    verticalScrollToTrack(trackId, openGroup);
  }
  horizontalScrollToTs(ts);
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {translateState} from '../common/thread_state';
import {timeToCode, toNs} from '../common/time';
import {globals, SliceDetails, ThreadDesc} from './globals';
import {scrollToTrackAndTs} from './scroll_helper';
import {SlicePanel} from './slice_panel';

export class SliceDetailsPanel extends SlicePanel {
  view() {
    const sliceInfo = globals.sliceDetails;
    if (sliceInfo.utid === undefined) return;
    const threadInfo = globals.threads.get(sliceInfo.utid);

    return m(
        '.details-panel',
        m(
            '.details-panel-heading',
            m('h2.split', `Slice Details`),
            this.hasSchedLatencyInfo(sliceInfo) &&
                m('h2.split', 'Scheduling Latency'),
            ),
        this.renderDetails(sliceInfo, threadInfo));
  }

  private renderSchedLatencyInfo(sliceInfo: SliceDetails): m.Children {
    if (!this.hasSchedLatencyInfo(sliceInfo)) {
      return null;
    }
    return m(
        '.half-width-panel.slice-details-latency-panel',
        m('img.slice-details-image', {
          src: `${globals.root}assets/scheduling_latency.png`,
        }),
        this.renderWakeupText(sliceInfo),
        this.renderDisplayLatencyText(sliceInfo),
    );
  }

  private renderWakeupText(sliceInfo: SliceDetails): m.Children {
    if (sliceInfo.wakerUtid === undefined) {
      return null;
    }
    const threadInfo = globals.threads.get(sliceInfo.wakerUtid!);
    if (!threadInfo) {
      return null;
    }
    const timestamp = timeToCode(
        sliceInfo.wakeupTs! - globals.state.traceTime.startSec,
    );
    return m(
        '.slice-details-wakeup-text',
        m('', `Wakeup @ ${timestamp} on CPU ${sliceInfo.wakerCpu} by`),
        m('', `P: ${threadInfo.procName} [${threadInfo.pid}]`),
        m('', `T: ${threadInfo.threadName} [${threadInfo.tid}]`),
    );
  }

  private renderDisplayLatencyText(sliceInfo: SliceDetails): m.Children {
    if (sliceInfo.ts === undefined || sliceInfo.wakeupTs === undefined) {
      return null;
    }

    const latency = timeToCode(
        sliceInfo.ts - (sliceInfo.wakeupTs - globals.state.traceTime.startSec),
    );
    return m(
        '.slice-details-latency-text',
        m('', `Scheduling latency: ${latency}`),
        m('.text-detail',
          `This is the interval from when the task became eligible to run
        (e.g. because of notifying a wait queue it was suspended on) to
        when it started running.`),
    );
  }

  private hasSchedLatencyInfo({wakeupTs, wakerUtid}: SliceDetails): boolean {
    return wakeupTs !== undefined && wakerUtid !== undefined;
  }

  private renderDetails(sliceInfo: SliceDetails, threadInfo?: ThreadDesc):
      m.Children {
    if (!threadInfo || sliceInfo.ts === undefined ||
        sliceInfo.dur === undefined) {
      return null;
    } else {
      const tableRows = [
        m('tr',
          m('th', `Process`),
          m('td', `${threadInfo.procName} [${threadInfo.pid}]`)),
        m('tr',
          m('th', `Thread`),
          m('td',
            `${threadInfo.threadName} [${threadInfo.tid}]`,
            m('i.material-icons.grey',
              {onclick: () => this.goToThread(), title: 'Go to thread'},
              'call_made'))),
        m('tr', m('th', `Cmdline`), m('td', threadInfo.cmdline)),
        m('tr', m('th', `Start time`), m('td', `${timeToCode(sliceInfo.ts)}`)),
        m('tr',
          m('th', `Duration`),
          m('td', this.computeDuration(sliceInfo.ts, sliceInfo.dur))),
        (sliceInfo.threadDur === undefined ||
         sliceInfo.threadTs === undefined) ?
            '' :
            m('tr',
              m('th', 'Thread duration'),
              m('td',
                this.computeDuration(sliceInfo.threadTs, sliceInfo.threadDur))),
        m('tr', m('th', `Prio`), m('td', `${sliceInfo.priority}`)),
        m('tr',
          m('th', `End State`),
          m('td', translateState(sliceInfo.endState))),
        m('tr',
          m('th', `Slice ID`),
          m('td',
            (sliceInfo.id !== undefined) ? sliceInfo.id.toString() :
                                           'Unknown')),
      ];

      for (const [key, value] of this.getProcessThreadDetails(sliceInfo)) {
        if (value !== undefined) {
          tableRows.push(m('tr', m('th', key), m('td', value)));
        }
      }

      return m(
          '.details-table-multicolumn',
          m('table.half-width-panel', tableRows),
          this.renderSchedLatencyInfo(sliceInfo),
      );
    }
  }

  goToThread() {
    const sliceInfo = globals.sliceDetails;
    if (sliceInfo.utid === undefined) return;
    const threadInfo = globals.threads.get(sliceInfo.utid);

    if (sliceInfo.id === undefined || sliceInfo.ts === undefined ||
        sliceInfo.dur === undefined || sliceInfo.cpu === undefined ||
        threadInfo === undefined) {
      return;
    }

    let trackId: string|number|undefined;
    for (const track of Object.values(globals.state.tracks)) {
      if (track.kind === 'ThreadStateTrack' &&
          (track.config as {utid: number}).utid === threadInfo.utid) {
        trackId = track.id;
      }
    }

    if (trackId && sliceInfo.threadStateId) {
      globals.makeSelection(Actions.selectThreadState({
        id: sliceInfo.threadStateId,
        trackId: trackId.toString(),
      }));

      scrollToTrackAndTs(
          trackId, toNs(sliceInfo.ts + globals.state.traceTime.startSec), true);
    }
  }

  renderCanvas() {}
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {timeToString} from '../common/time';

import {TRACK_SHELL_WIDTH} from './css_constants';
import {globals} from './globals';
import {
  TickGenerator,
  TickType,
  timeScaleForVisibleWindow,
} from './gridline_helper';
import {Panel, PanelSize} from './panel';

export class TimeAxisPanel extends Panel {
  view() {
    return m('.time-axis-panel');
  }

  renderCanvas(ctx: CanvasRenderingContext2D, size: PanelSize) {
    ctx.fillStyle = '#999';
    ctx.font = '10px Roboto Condensed';
    ctx.textAlign = 'left';

    const startTime = timeToString(globals.state.traceTime.startSec);
    ctx.fillText(startTime + ' +', 6, 11);

    // Draw time axis.
    const timeScale = timeScaleForVisibleWindow(TRACK_SHELL_WIDTH, size.width);
    if (timeScale.timeSpan.duration > 0 && timeScale.widthPx > 0) {
      const tickGen = new TickGenerator(timeScale);
      for (const {type, time, position} of tickGen) {
        if (type === TickType.MAJOR) {
          ctx.fillRect(position, 0, 1, size.height);
          ctx.fillText(time.toFixed(tickGen.digits) + ' s', position + 5, 10);
        }
      }
    }

    ctx.fillRect(TRACK_SHELL_WIDTH - 2, 0, 2, size.height);
  }
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Actions} from '../common/actions';
import {QueryResponse} from '../common/queries';

import {globals} from './globals';

export function onClickCopy(url: string) {
  return (e: Event) => {
    e.preventDefault();
    copyToClipboard(url);
    globals.dispatch(Actions.updateStatus(
        {msg: 'Link copied into the clipboard', timestamp: Date.now() / 1000}));
  };
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    // TODO(hjd): Fix typescript type for navigator.
    await(navigator as any).clipboard.writeText(text);
  } catch (err) {
    console.error(`Failed to copy "${text}" to clipboard: ${err}`);
  }
}

export async function queryResponseToClipboard(resp: QueryResponse):
    Promise<void> {
  const lines: string[][] = [];
  lines.push(resp.columns);
  for (const row of resp.rows) {
    const line = [];
    for (const col of resp.columns) {
      const value = row[col];
      line.push(value === null ? 'NULL' : value.toString());
    }
    lines.push(line);
  }
  copyToClipboard(lines.map((line) => line.join('\t')).join('\n'));
}

export function download(file: File, name?: string): void {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = name === undefined ? file.name : name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This code can be used in unittests where we can't read CSS variables.
// Also we cannot have global constructors beacause when the javascript is
// loaded, the CSS might not be ready yet.
export let TRACK_SHELL_WIDTH = 100;
export let SIDEBAR_WIDTH = 100;
export let TRACK_BORDER_COLOR = '#ffc0cb';
export let TOPBAR_HEIGHT = 48;
export let SELECTION_STROKE_COLOR = '#00344596';
export let SELECTION_FILL_COLOR = '#8398e64d';
export let OVERVIEW_TIMELINE_NON_VISIBLE_COLOR = '#c8c8c8cc';
export let DEFAULT_DETAILS_CONTENT_HEIGHT = 280;
export const SELECTED_LOG_ROWS_COLOR = '#D2EFE0';
export let BACKGROUND_COLOR = '#ffffff';
export let FOREGROUND_COLOR = '#222';

export function initCssConstants() {
  TRACK_SHELL_WIDTH = getCssNum('--track-shell-width') || TRACK_SHELL_WIDTH;
  SIDEBAR_WIDTH = getCssNum('--sidebar-width') || SIDEBAR_WIDTH;
  TRACK_BORDER_COLOR = getCssStr('--track-border-color') || TRACK_BORDER_COLOR;
  TOPBAR_HEIGHT = getCssNum('--topbar-height') || TOPBAR_HEIGHT;
  SELECTION_STROKE_COLOR =
      getCssStr('--selection-stroke-color') || SELECTION_STROKE_COLOR;
  SELECTION_FILL_COLOR =
      getCssStr('--selection-fill-color') || SELECTION_FILL_COLOR;
  OVERVIEW_TIMELINE_NON_VISIBLE_COLOR =
      getCssStr('--overview-timeline-non-visible-color') ||
      OVERVIEW_TIMELINE_NON_VISIBLE_COLOR;
  DEFAULT_DETAILS_CONTENT_HEIGHT =
      getCssNum('--details-content-height') || DEFAULT_DETAILS_CONTENT_HEIGHT;
  BACKGROUND_COLOR = getCssStr('--main-background-color') || BACKGROUND_COLOR;
  FOREGROUND_COLOR = getCssStr('--main-foreground-color') || FOREGROUND_COLOR;
}

function getCssStr(prop: string): string|undefined {
  if (typeof window === 'undefined') return undefined;
  const body = window.document.body;
  return window.getComputedStyle(body).getPropertyValue(prop);
}

function getCssNum(prop: string): number|undefined {
  const str = getCssStr(prop);
  if (str === undefined) return undefined;
  const match = str.match(/^\W*(\d+)px(|\!important')$/);
  if (!match) throw Error(`Could not parse CSS property "${str}" as a number`);
  return Number(match[1]);
}
/*
 * Copyright (C) 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import m from 'mithril';
import {globals} from './globals';

interface ArgumentPopupArgs {
  onArgumentChange: (arg: string) => void;
  knownArguments: string[];
}

function longestString(array: string[]): string {
  if (array.length === 0) {
    return '';
  }

  let answer = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i].length > answer.length) {
      answer = array[i];
    }
  }
  return answer;
}

// Component rendering popup for entering an argument name to use as a pivot.
export class ArgumentPopup implements m.ClassComponent<ArgumentPopupArgs> {
  argument = '';

  setArgument(attrs: ArgumentPopupArgs, arg: string) {
    this.argument = arg;
    attrs.onArgumentChange(arg);
    globals.rafScheduler.scheduleFullRedraw();
  }

  renderMatches(attrs: ArgumentPopupArgs): m.Child[] {
    const result: m.Child[] = [];

    for (const option of attrs.knownArguments) {
      // Would be great to have smarter fuzzy matching, but in the meantime
      // simple substring check should work fine.
      const index = option.indexOf(this.argument);

      if (index === -1) {
        continue;
      }

      if (result.length === 10) {
        break;
      }

      result.push(
          m('div',
            {
              onclick: () => {
                this.setArgument(attrs, option);
              },
            },
            option.substring(0, index),
            // Highlight the matching part with bold font
            m('strong', this.argument),
            option.substring(index + this.argument.length)));
    }

    return result;
  }

  view({attrs}: m.Vnode<ArgumentPopupArgs>): m.Child {
    return m(
        '.name-completion',
        m('input', {
          oncreate: (vnode: m.VnodeDOM) =>
              (vnode.dom as HTMLInputElement).focus(),
          oninput: (e: Event) => {
            const input = e.target as HTMLInputElement;
            this.setArgument(attrs, input.value);
          },
          value: this.argument,
        }),
        m('.arguments-popup-sizer', longestString(attrs.knownArguments)),
        this.renderMatches(attrs));
  }
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {TRACK_SHELL_WIDTH} from './css_constants';
import {TimeScale} from './time_scale';

export function drawVerticalLineAtTime(ctx: CanvasRenderingContext2D,
                                       timeScale: TimeScale,
                                       time: number,
                                       height: number,
                                       color: string,
                                       lineWidth = 2) {
    const xPos = TRACK_SHELL_WIDTH + Math.floor(timeScale.timeToPx(time));
    drawVerticalLine(ctx, xPos, height, color, lineWidth);
  }

function drawVerticalLine(ctx: CanvasRenderingContext2D,
                          xPos: number,
                          height: number,
                          color: string,
                          lineWidth = 2) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    const prevLineWidth = ctx.lineWidth;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(xPos, 0);
    ctx.lineTo(xPos, height);
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = prevLineWidth;
}

// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {sqliteString} from '../base/string_utils';
import {Actions} from '../common/actions';
import {Arg, ArgsTree, isArgTreeArray, isArgTreeMap} from '../common/arg_types';
import {timeToCode} from '../common/time';

import {FlowPoint, globals, SliceDetails} from './globals';
import {PanelSize} from './panel';
import {PopupMenuButton, PopupMenuItem} from './popup_menu';
import {runQueryInNewTab} from './query_result_tab';
import {verticalScrollToTrack} from './scroll_helper';
import {SlicePanel} from './slice_panel';

interface ContextMenuItem {
  name: string;
  shouldDisplay(slice: SliceDetails): boolean;
  getAction(slice: SliceDetails): void;
}

const ITEMS: ContextMenuItem[] = [
  {
    name: 'Average duration',
    shouldDisplay: (slice: SliceDetails) => slice.name !== undefined,
    getAction: (slice: SliceDetails) => runQueryInNewTab(
        `SELECT AVG(dur) / 1e9 FROM slice WHERE name = '${slice.name!}'`,
        `${slice.name} average dur`,
        ),
  },
  {
    name: 'Binder by TXN',
    shouldDisplay: () => true,
    getAction: () => runQueryInNewTab(
        `SELECT IMPORT('android.binder');

         SELECT *
         FROM android_sync_binder_metrics_by_txn
         ORDER BY client_dur DESC`,
        'Binder by TXN',
        ),
  },
  {
    name: 'Lock graph',
    shouldDisplay: (slice: SliceDetails) => slice.id !== undefined,
    getAction: (slice: SliceDetails) => runQueryInNewTab(
        `SELECT IMPORT('android.monitor_contention');
         DROP TABLE IF EXISTS FAST;
         CREATE TABLE FAST
         AS
         WITH slice_process AS (
         SELECT process.name, process.upid FROM slice
         JOIN thread_track ON thread_track.id = slice.track_id
         JOIN thread USING(utid)
         JOIN process USING(upid)
         WHERE slice.id = ${slice.id!}
         )
         SELECT *,
         IIF(blocked_thread_name LIKE 'binder:%', 'binder', blocked_thread_name)
          AS blocked_thread_name_norm,
         IIF(blocking_thread_name LIKE 'binder:%', 'binder', blocking_thread_name)
          AS blocking_thread_name_norm
         FROM android_monitor_contention_chain, slice_process
         WHERE android_monitor_contention_chain.upid = slice_process.upid;

         WITH
         R AS (
         SELECT
           id,
           dur,
           CAT_STACKS(blocked_thread_name_norm || ':' || short_blocked_method,
             blocking_thread_name_norm || ':' || short_blocking_method) AS stack
         FROM FAST
         WHERE parent_id IS NULL
         UNION ALL
         SELECT
         c.id,
         c.dur AS dur,
         CAT_STACKS(stack, blocking_thread_name_norm || ':' || short_blocking_method) AS stack
         FROM FAST c, R AS p
         WHERE p.id = c.parent_id
         )
         SELECT TITLE.process_name, EXPERIMENTAL_PROFILE(stack, 'duration', 'ns', dur) AS pprof
         FROM R, (SELECT process_name FROM FAST LIMIT 1) TITLE;`,
        'Lock graph',
        ),
  },
];

function getSliceContextMenuItems(slice: SliceDetails): PopupMenuItem[] {
  return ITEMS.filter((item) => item.shouldDisplay(slice)).map((item) => {
    return {
      itemType: 'regular',
      text: item.name,
      callback: () => item.getAction(slice),
    };
  });
}

// Table row contents is one of two things:
// 1. Key-value pair
interface TableRow {
  kind: 'TableRow';
  key: string;
  value: Arg;

  // Whether it's an argument (from the `args` table) or whether it's a property
  // of the slice (i.e. `dur`, coming from `slice` table). Args have additional
  // actions associated with them.
  isArg: boolean;

  // A full key for the arguments displayed in a tree.
  full_key?: string;
}

// 2. Common prefix for values in an array
interface TableHeader {
  kind: 'TableHeader';
  header: string;
}

type RowContents = TableRow|TableHeader;

function isTableHeader(contents: RowContents): contents is TableHeader {
  return contents.kind === 'TableHeader';
}

function appendPrefix(p1: string, p2: string): string {
  if (p1.length === 0) {
    return p2;
  }
  return `${p1}.${p2}`;
}

interface Row {
  // How many columns (empty or with an index) precede a key
  indentLevel: number;
  // Optional tooltip to be displayed on the key. Used to display the full key,
  // which has to be reconstructed from the information that might not even be
  // visible on the screen otherwise.
  tooltip?: string;
  contents: RowContents;
}

class TableBuilder {
  // Row data generated by builder
  rows: Row[] = [];
  indentLevel = 0;

  // Maximum indent level of a key, used to determine total number of columns
  maxIndent = 0;

  // Add a key-value pair into the table
  add(key: string, value: Arg) {
    this.rows.push({
      indentLevel: 0,
      contents: {kind: 'TableRow', key, value, isArg: false},
    });
  }

  // Add arguments tree into the table
  addTree(tree: ArgsTree) {
    this.addTreeInternal(tree, '', '');
  }

  private addTreeInternal(
      record: ArgsTree, prefix: string, completePrefix: string) {
    if (isArgTreeArray(record)) {
      if (record.length === 1) {
        this.addTreeInternal(record[0], `${prefix}[0]`, `${completePrefix}[0]`);
        return;
      }

      // Add the current prefix as a separate row
      if (prefix.length > 0) {
        this.rows.push({
          indentLevel: this.indentLevel,
          contents: {kind: 'TableHeader', header: prefix},
          tooltip: completePrefix,
        });
      }

      this.indentLevel++;
      for (let i = 0; i < record.length; i++) {
        // Prefix is empty for array elements because we don't want to repeat
        // the common prefix
        this.addTreeInternal(record[i], `[${i}]`, `${completePrefix}[${i}]`);
      }
      this.indentLevel--;
    } else if (isArgTreeMap(record)) {
      const entries = Object.entries(record);
      if (entries.length === 1) {
        // Don't want to create a level of indirection in case object contains
        // only one value; think of it like file browser in IDEs not showing
        // intermediate nodes for common hierarchy corresponding to Java package
        // prefix (e.g. "com/google/perfetto").
        //
        // In this case, add key as a prefix part.
        const [key, value] = entries[0];
        this.addTreeInternal(
            value,
            appendPrefix(prefix, key),
            appendPrefix(completePrefix, key));
      } else {
        if (prefix.length > 0) {
          const row = this.indentLevel;
          this.rows.push({
            indentLevel: row,
            contents: {kind: 'TableHeader', header: prefix},
            tooltip: completePrefix,
          });
          this.indentLevel++;
        }
        for (const [key, value] of entries) {
          this.addTreeInternal(value, key, appendPrefix(completePrefix, key));
        }
        if (prefix.length > 0) {
          this.indentLevel--;
        }
      }
    } else {
      // Leaf value in the tree: add to the table
      const row = this.indentLevel;
      this.rows.push({
        indentLevel: row,
        contents: {
          kind: 'TableRow',
          key: prefix,
          value: record,
          full_key: completePrefix,
          isArg: true,
        },
        tooltip: completePrefix,
      });
    }
  }
}

export class ChromeSliceDetailsPanel extends SlicePanel {
  view() {
    const sliceInfo = globals.sliceDetails;
    if (sliceInfo.ts !== undefined && sliceInfo.dur !== undefined &&
        sliceInfo.name !== undefined) {
      const defaultBuilder = new TableBuilder();
      defaultBuilder.add('Name', sliceInfo.name);
      defaultBuilder.add(
          'Category',
          !sliceInfo.category || sliceInfo.category === '[NULL]' ?
              'N/A' :
              sliceInfo.category);
      defaultBuilder.add('Start time', timeToCode(sliceInfo.ts));
      if (sliceInfo.absTime !== undefined) {
        defaultBuilder.add('Absolute Time', sliceInfo.absTime);
      }
      defaultBuilder.add(
          'Duration', this.computeDuration(sliceInfo.ts, sliceInfo.dur));
      if (sliceInfo.threadTs !== undefined &&
          sliceInfo.threadDur !== undefined) {
        // If we have valid thread duration, also display a percentage of
        // |threadDur| compared to |dur|.
        const threadDurFractionSuffix = sliceInfo.threadDur === -1 ?
            '' :
            ` (${(sliceInfo.threadDur / sliceInfo.dur * 100).toFixed(2)}%)`;
        defaultBuilder.add(
            'Thread duration',
            this.computeDuration(sliceInfo.threadTs, sliceInfo.threadDur) +
                threadDurFractionSuffix);
      }

      for (const [key, value] of this.getProcessThreadDetails(sliceInfo)) {
        if (value !== undefined) {
          defaultBuilder.add(key, value);
        }
      }

      defaultBuilder.add(
          'Slice ID',
          (sliceInfo.id !== undefined) ? sliceInfo.id.toString() : 'Unknown');
      if (sliceInfo.description) {
        for (const [key, value] of sliceInfo.description) {
          defaultBuilder.add(key, value);
        }
      }
      return m(
          '.details-panel',
          m('.details-panel-heading', m('h2', `Slice Details`)),
          m('.details-table-multicolumn', [
            this.renderTable(defaultBuilder, '.half-width-panel'),
            this.renderRhs(sliceInfo),
          ]));
    } else {
      return m(
          '.details-panel',
          m('.details-panel-heading',
            m(
                'h2',
                `Slice Details`,
                )));
    }
  }

  private fillFlowPanel(
      name: string, flows: {flow: FlowPoint, dur: number}[],
      includeProcessName: boolean, result: Map<string, TableBuilder>) {
    if (flows.length === 0) return;

    const builder = new TableBuilder();
    for (const {flow, dur} of flows) {
      builder.add('Slice', {
        kind: 'SLICE',
        sliceId: flow.sliceId,
        trackId: globals.state.uiTrackIdByTraceTrackId[flow.trackId],
        description: flow.sliceChromeCustomName === undefined ?
            flow.sliceName :
            flow.sliceChromeCustomName,
      });
      builder.add('Delay', timeToCode(dur));
      builder.add(
          'Thread',
          includeProcessName ? `${flow.threadName} (${flow.processName})` :
                               flow.threadName);
    }
    result.set(name, builder);
  }

  renderCanvas(_ctx: CanvasRenderingContext2D, _size: PanelSize) {}

  fillArgs(slice: SliceDetails, builder: TableBuilder) {
    if (slice.argsTree && slice.args) {
      // Parsed arguments are available, need only to iterate over them to get
      // slice references
      for (const [key, value] of slice.args) {
        if (typeof value !== 'string') {
          builder.add(key, value);
        }
      }
      builder.addTree(slice.argsTree);
    } else if (slice.args) {
      // Parsing has failed, but arguments are available: display them in a flat
      // 2-column table
      for (const [key, value] of slice.args) {
        builder.add(key, value);
      }
    }
  }

  private getArgumentContextMenuItems(argument: TableRow): PopupMenuItem[] {
    if (argument.full_key === undefined) return [];
    if (typeof argument.value !== 'string') return [];
    const argValue: string = argument.value;

    const fullKey = argument.full_key;
    return [
      {
        itemType: 'regular',
        text: 'Copy full key',
        callback: () => {
          navigator.clipboard.writeText(fullKey);
        },
      },
      {
        itemType: 'regular',
        text: 'Find slices with the same arg value',
        callback: () => {
          runQueryInNewTab(
              `
              select slice.*
              from slice
              join args using (arg_set_id)
              where key=${sqliteString(fullKey)} and display_value=${
                  sqliteString(argValue)}
          `,
              `Arg: ${sqliteString(fullKey)}=${sqliteString(argValue)}`);
        },
      },
      {
        itemType: 'regular',
        text: 'Visualise argument values',
        callback: () => {
          globals.dispatch(Actions.addVisualisedArg({argName: fullKey}));
        },
      },
    ];
  }

  renderRhs(sliceInfo: SliceDetails): m.Vnode {
    const builders = new Map<string, TableBuilder>();

    const immediatelyPrecedingByFlowSlices = [];
    const immediatelyFollowingByFlowSlices = [];
    for (const flow of globals.connectedFlows) {
      if (flow.begin.sliceId === sliceInfo.id) {
        immediatelyFollowingByFlowSlices.push({flow: flow.end, dur: flow.dur});
      }
      if (flow.end.sliceId === sliceInfo.id) {
        immediatelyPrecedingByFlowSlices.push(
            {flow: flow.begin, dur: flow.dur});
      }
    }

    // This is Chrome-specific bits:
    const isRunTask = sliceInfo.name === 'ThreadControllerImpl::RunTask' ||
        sliceInfo.name === 'ThreadPool_RunTask';
    const isPostTask = sliceInfo.name === 'ThreadPool_PostTask' ||
        sliceInfo.name === 'SequenceManager PostTask';

    // RunTask and PostTask are always same-process, so we can skip
    // emitting process name for them.
    this.fillFlowPanel(
        'Preceding flows',
        immediatelyPrecedingByFlowSlices,
        !isRunTask,
        builders);
    this.fillFlowPanel(
        'Following flows',
        immediatelyFollowingByFlowSlices,
        !isPostTask,
        builders);

    const argsBuilder = new TableBuilder();
    this.fillArgs(sliceInfo, argsBuilder);
    builders.set('Arguments', argsBuilder);

    const rows: m.Vnode<any, any>[] = [];
    for (const [name, builder] of builders) {
      rows.push(m('h3', name));
      rows.push(this.renderTable(builder));
    }

    const contextMenuItems = getSliceContextMenuItems(sliceInfo);
    if (contextMenuItems.length > 0) {
      rows.push(
          m(PopupMenuButton,
            {
              icon: 'arrow_drop_down',
              items: contextMenuItems,
            },
            'Contextual Options'));
    }

    return m('.half-width-panel', rows);
  }

  renderTable(builder: TableBuilder, additionalClasses: string = ''): m.Vnode {
    const rows: m.Vnode[] = [];
    for (const row of builder.rows) {
      const renderedRow: m.Vnode[] = [];
      const paddingLeft = `${row.indentLevel * 20}px`;
      if (isTableHeader(row.contents)) {
        renderedRow.push(
            m('th',
              {
                colspan: 2,
                title: row.tooltip,
                style: {'padding-left': paddingLeft},
              },
              row.contents.header));
      } else {
        const contents: any[] = [row.contents.key];
        if (row.contents.isArg) {
          contents.push(
              m('span.context-wrapper', m.trust('&nbsp;'), m(PopupMenuButton, {
                  icon: 'arrow_drop_down',
                  items: this.getArgumentContextMenuItems(row.contents),
                })));
        }

        renderedRow.push(
            m('th',
              {title: row.tooltip, style: {'padding-left': paddingLeft}},
              contents));
        const value = row.contents.value;
        if (typeof value === 'string') {
          renderedRow.push(m('td.value', this.mayLinkify(value)));
        } else {
          // Type of value being a record is not propagated into the callback
          // for some reason, extracting necessary parts as constants instead.
          const sliceId = value.sliceId;
          const trackId = value.trackId;
          renderedRow.push(
              m('td',
                m('i.material-icons.grey',
                  {
                    onclick: () => {
                      globals.makeSelection(Actions.selectChromeSlice(
                          {id: sliceId, trackId, table: 'slice'}));
                      // Ideally we want to have a callback to
                      // findCurrentSelection after this selection has been
                      // made. Here we do not have the info for horizontally
                      // scrolling to ts.
                      verticalScrollToTrack(trackId, true);
                    },
                    title: 'Go to destination slice',
                  },
                  'call_made'),
                value.description));
        }
      }

      rows.push(m('tr', renderedRow));
    }

    return m(`table.auto-layout${additionalClasses}`, rows);
  }

  private mayLinkify(what: string): string|m.Vnode {
    if (what.startsWith('http://') || what.startsWith('https://')) {
      return m('a', {href: what, target: '_blank'}, what);
    }
    return what;
  }
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {hex} from 'color-convert';
import m from 'mithril';

import {Actions} from '../common/actions';
import {TrackState} from '../common/state';

import {SELECTION_FILL_COLOR, TRACK_SHELL_WIDTH} from './css_constants';
import {PerfettoMouseEvent} from './events';
import {globals} from './globals';
import {drawGridLines} from './gridline_helper';
import {BLANK_CHECKBOX, CHECKBOX, PIN} from './icons';
import {Panel, PanelSize} from './panel';
import {verticalScrollToTrack} from './scroll_helper';
import {SliceRect, Track} from './track';
import {trackRegistry} from './track_registry';
import {
  drawVerticalLineAtTime,
} from './vertical_line_helper';

function getTitleSize(title: string): string|undefined {
  const length = title.length;
  if (length > 55) {
    return '9px';
  }
  if (length > 50) {
    return '10px';
  }
  if (length > 45) {
    return '11px';
  }
  if (length > 40) {
    return '12px';
  }
  if (length > 35) {
    return '13px';
  }
  return undefined;
}

function isPinned(id: string) {
  return globals.state.pinnedTracks.indexOf(id) !== -1;
}

function isSelected(id: string) {
  const selection = globals.state.currentSelection;
  if (selection === null || selection.kind !== 'AREA') return false;
  const selectedArea = globals.state.areas[selection.areaId];
  return selectedArea.tracks.includes(id);
}

interface TrackShellAttrs {
  track: Track;
  trackState: TrackState;
}

class TrackShell implements m.ClassComponent<TrackShellAttrs> {
  // Set to true when we click down and drag the
  private dragging = false;
  private dropping: 'before'|'after'|undefined = undefined;
  private attrs?: TrackShellAttrs;

  oninit(vnode: m.Vnode<TrackShellAttrs>) {
    this.attrs = vnode.attrs;
  }

  view({attrs}: m.CVnode<TrackShellAttrs>) {
    // The shell should be highlighted if the current search result is inside
    // this track.
    let highlightClass = '';
    const searchIndex = globals.state.searchIndex;
    if (searchIndex !== -1) {
      const trackId = globals.currentSearchResults.trackIds[searchIndex];
      if (trackId === attrs.trackState.id) {
        highlightClass = 'flash';
      }
    }

    const dragClass = this.dragging ? `drag` : '';
    const dropClass = this.dropping ? `drop-${this.dropping}` : '';
    return m(
        `.track-shell[draggable=true]`,
        {
          class: `${highlightClass} ${dragClass} ${dropClass}`,
          onmousedown: this.onmousedown.bind(this),
          ondragstart: this.ondragstart.bind(this),
          ondragend: this.ondragend.bind(this),
          ondragover: this.ondragover.bind(this),
          ondragleave: this.ondragleave.bind(this),
          ondrop: this.ondrop.bind(this),
        },
        m(
            'h1',
            {
              title: attrs.trackState.name,
              style: {
                'font-size': getTitleSize(attrs.trackState.name),
              },
            },
            attrs.trackState.name,
            ('namespace' in attrs.trackState.config) &&
                m('span.chip', 'metric'),
            ),
        m('.track-buttons',
          attrs.track.getTrackShellButtons(),
          attrs.track.getContextMenu(),
          m(TrackButton, {
            action: () => {
              globals.dispatch(
                  Actions.toggleTrackPinned({trackId: attrs.trackState.id}));
            },
            i: PIN,
            filledIcon: isPinned(attrs.trackState.id),
            tooltip: isPinned(attrs.trackState.id) ? 'Unpin' : 'Pin to top',
            showButton: isPinned(attrs.trackState.id),
            fullHeight: true,
          }),
          globals.state.currentSelection !== null &&
                  globals.state.currentSelection.kind === 'AREA' ?
              m(TrackButton, {
                action: (e: PerfettoMouseEvent) => {
                  globals.dispatch(Actions.toggleTrackSelection(
                      {id: attrs.trackState.id, isTrackGroup: false}));
                  e.stopPropagation();
                },
                i: isSelected(attrs.trackState.id) ? CHECKBOX : BLANK_CHECKBOX,
                tooltip: isSelected(attrs.trackState.id) ?
                    'Remove track' :
                    'Add track to selection',
                showButton: true,
              }) :
              ''));
  }

  onmousedown(e: MouseEvent) {
    // Prevent that the click is intercepted by the PanAndZoomHandler and that
    // we start panning while dragging.
    e.stopPropagation();
  }

  ondragstart(e: DragEvent) {
    const dataTransfer = e.dataTransfer;
    if (dataTransfer === null) return;
    this.dragging = true;
    globals.rafScheduler.scheduleFullRedraw();
    dataTransfer.setData('perfetto/track', `${this.attrs!.trackState.id}`);
    dataTransfer.setDragImage(new Image(), 0, 0);
    e.stopImmediatePropagation();
  }

  ondragend() {
    this.dragging = false;
    globals.rafScheduler.scheduleFullRedraw();
  }

  ondragover(e: DragEvent) {
    if (this.dragging) return;
    if (!(e.target instanceof HTMLElement)) return;
    const dataTransfer = e.dataTransfer;
    if (dataTransfer === null) return;
    if (!dataTransfer.types.includes('perfetto/track')) return;
    dataTransfer.dropEffect = 'move';
    e.preventDefault();

    // Apply some hysteresis to the drop logic so that the lightened border
    // changes only when we get close enough to the border.
    if (e.offsetY < e.target.scrollHeight / 3) {
      this.dropping = 'before';
    } else if (e.offsetY > e.target.scrollHeight / 3 * 2) {
      this.dropping = 'after';
    }
    globals.rafScheduler.scheduleFullRedraw();
  }

  ondragleave() {
    this.dropping = undefined;
    globals.rafScheduler.scheduleFullRedraw();
  }

  ondrop(e: DragEvent) {
    if (this.dropping === undefined) return;
    const dataTransfer = e.dataTransfer;
    if (dataTransfer === null) return;
    globals.rafScheduler.scheduleFullRedraw();
    const srcId = dataTransfer.getData('perfetto/track');
    const dstId = this.attrs!.trackState.id;
    globals.dispatch(Actions.moveTrack({srcId, op: this.dropping, dstId}));
    this.dropping = undefined;
  }
}

export interface TrackContentAttrs { track: Track; }
export class TrackContent implements m.ClassComponent<TrackContentAttrs> {
  private mouseDownX?: number;
  private mouseDownY?: number;
  private selectionOccurred = false;

  view(node: m.CVnode<TrackContentAttrs>) {
    const attrs = node.attrs;
    return m(
        '.track-content',
        {
          onmousemove: (e: PerfettoMouseEvent) => {
            attrs.track.onMouseMove(
                {x: e.layerX - TRACK_SHELL_WIDTH, y: e.layerY});
            globals.rafScheduler.scheduleRedraw();
          },
          onmouseout: () => {
            attrs.track.onMouseOut();
            globals.rafScheduler.scheduleRedraw();
          },
          onmousedown: (e: PerfettoMouseEvent) => {
            this.mouseDownX = e.layerX;
            this.mouseDownY = e.layerY;
          },
          onmouseup: (e: PerfettoMouseEvent) => {
            if (this.mouseDownX === undefined ||
                this.mouseDownY === undefined) {
              return;
            }
            if (Math.abs(e.layerX - this.mouseDownX) > 1 ||
                Math.abs(e.layerY - this.mouseDownY) > 1) {
              this.selectionOccurred = true;
            }
            this.mouseDownX = undefined;
            this.mouseDownY = undefined;
          },
          onclick: (e: PerfettoMouseEvent) => {
            // This click event occurs after any selection mouse up/drag events
            // so we have to look if the mouse moved during this click to know
            // if a selection occurred.
            if (this.selectionOccurred) {
              this.selectionOccurred = false;
              return;
            }
            // Returns true if something was selected, so stop propagation.
            if (attrs.track.onMouseClick(
                    {x: e.layerX - TRACK_SHELL_WIDTH, y: e.layerY})) {
              e.stopPropagation();
            }
            globals.rafScheduler.scheduleRedraw();
          },
        },
        node.children);
  }
}

interface TrackComponentAttrs {
  trackState: TrackState;
  track: Track;
}
class TrackComponent implements m.ClassComponent<TrackComponentAttrs> {
  view({attrs}: m.CVnode<TrackComponentAttrs>) {
    // TODO(hjd): The min height below must match the track_shell_title
    // max height in common.scss so we should read it from CSS to avoid
    // them going out of sync.
    return m(
        '.track',
        {
          style: {
            height: `${Math.max(18, attrs.track.getHeight())}px`,
          },
          id: 'track_' + attrs.trackState.id,
        },
        [
          m(TrackShell, {track: attrs.track, trackState: attrs.trackState}),
          m(TrackContent, {track: attrs.track}),
        ]);
  }

  oncreate({attrs}: m.CVnode<TrackComponentAttrs>) {
    if (globals.frontendLocalState.scrollToTrackId === attrs.trackState.id) {
      verticalScrollToTrack(attrs.trackState.id);
      globals.frontendLocalState.scrollToTrackId = undefined;
    }
  }
}

export interface TrackButtonAttrs {
  action: (e: PerfettoMouseEvent) => void;
  i: string;
  tooltip: string;
  showButton: boolean;
  fullHeight?: boolean;
  filledIcon?: boolean;
}
export class TrackButton implements m.ClassComponent<TrackButtonAttrs> {
  view({attrs}: m.CVnode<TrackButtonAttrs>) {
    return m(
        'i.track-button',
        {
          class: [
            (attrs.showButton ? 'show' : ''),
            (attrs.fullHeight ? 'full-height' : ''),
            (attrs.filledIcon ? 'material-icons-filled' : 'material-icons'),
          ].filter(Boolean)
                     .join(' '),
          onclick: attrs.action,
          title: attrs.tooltip,
        },
        attrs.i);
  }
}

interface TrackPanelAttrs {
  id: string;
  selectable: boolean;
}

export class TrackPanel extends Panel<TrackPanelAttrs> {
  // TODO(hjd): It would be nicer if these could not be undefined here.
  // We should implement a NullTrack which can be used if the trackState
  // has disappeared.
  private track: Track|undefined;
  private trackState: TrackState|undefined;

  constructor(vnode: m.CVnode<TrackPanelAttrs>) {
    super();
    const trackId = vnode.attrs.id;
    const trackState = globals.state.tracks[trackId];
    if (trackState === undefined) {
      return;
    }
    const engine = globals.engines.get(trackState.engineId);
    if (engine === undefined) {
      return;
    }
    const trackCreator = trackRegistry.get(trackState.kind);
    this.track = trackCreator.create({trackId, engine});
    this.trackState = trackState;
  }

  view() {
    if (this.track === undefined || this.trackState === undefined) {
      return m('div', 'No such track');
    }
    return m(TrackComponent, {trackState: this.trackState, track: this.track});
  }

  oncreate() {
    if (this.track !== undefined) {
      this.track.onFullRedraw();
    }
  }

  onupdate() {
    if (this.track !== undefined) {
      this.track.onFullRedraw();
    }
  }

  onremove() {
    if (this.track !== undefined) {
      this.track.onDestroy();
      this.track = undefined;
    }
  }

  highlightIfTrackSelected(ctx: CanvasRenderingContext2D, size: PanelSize) {
    const localState = globals.frontendLocalState;
    const selection = globals.state.currentSelection;
    const trackState = this.trackState;
    if (!selection || selection.kind !== 'AREA' || trackState === undefined) {
      return;
    }
    const selectedArea = globals.state.areas[selection.areaId];
    if (selectedArea.tracks.includes(trackState.id)) {
      const timeScale = localState.timeScale;
      ctx.fillStyle = SELECTION_FILL_COLOR;
      ctx.fillRect(
          timeScale.timeToPx(selectedArea.startSec) + TRACK_SHELL_WIDTH,
          0,
          timeScale.deltaTimeToPx(selectedArea.endSec - selectedArea.startSec),
          size.height);
    }
  }

  renderCanvas(ctx: CanvasRenderingContext2D, size: PanelSize) {
    ctx.save();

    drawGridLines(
        ctx,
        size.width,
        size.height);

    ctx.translate(TRACK_SHELL_WIDTH, 0);
    if (this.track !== undefined) {
      this.track.render(ctx);
    }
    ctx.restore();

    this.highlightIfTrackSelected(ctx, size);

    const localState = globals.frontendLocalState;
    // Draw vertical line when hovering on the notes panel.
    if (globals.state.hoveredNoteTimestamp !== -1) {
      drawVerticalLineAtTime(
          ctx,
          localState.timeScale,
          globals.state.hoveredNoteTimestamp,
          size.height,
          `#aaa`);
    }
    if (globals.state.hoverCursorTimestamp !== -1) {
      drawVerticalLineAtTime(
          ctx,
          localState.timeScale,
          globals.state.hoverCursorTimestamp,
          size.height,
          `#344596`);
    }

    if (globals.state.currentSelection !== null) {
      if (globals.state.currentSelection.kind === 'SLICE' &&
          globals.sliceDetails.wakeupTs !== undefined) {
        drawVerticalLineAtTime(
            ctx,
            localState.timeScale,
            globals.sliceDetails.wakeupTs,
            size.height,
            `black`);
      }
    }
    // All marked areas should have semi-transparent vertical lines
    // marking the start and end.
    for (const note of Object.values(globals.state.notes)) {
      if (note.noteType === 'AREA') {
        const transparentNoteColor =
            'rgba(' + hex.rgb(note.color.substr(1)).toString() + ', 0.65)';
        drawVerticalLineAtTime(
            ctx,
            localState.timeScale,
            globals.state.areas[note.areaId].startSec,
            size.height,
            transparentNoteColor,
            1);
        drawVerticalLineAtTime(
            ctx,
            localState.timeScale,
            globals.state.areas[note.areaId].endSec,
            size.height,
            transparentNoteColor,
            1);
      } else if (note.noteType === 'DEFAULT') {
        drawVerticalLineAtTime(
            ctx, localState.timeScale, note.timestamp, size.height, note.color);
      }
    }
  }

  getSliceRect(tStart: number, tDur: number, depth: number): SliceRect
      |undefined {
    if (this.track === undefined) {
      return undefined;
    }
    return this.track.getSliceRect(tStart, tDur, depth);
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {SortDirection} from '../common/state';

interface OrderClause {
  fieldName: string;
  direction?: SortDirection;
}

// Interface for defining constraints which can be passed to a SQL query.
export interface SQLConstraints {
  filters?: string[];
  orderBy?: OrderClause[];
  limit?: number;
}

// Formatting given constraints into a string which can be injected into
// SQL query.
export function constraintsToQueryFragment(c: SQLConstraints): string {
  const result: string[] = [];
  if (c.filters && c.filters.length > 0) {
    result.push(`WHERE ${c.filters.join(' and ')}`);
  }
  if (c.orderBy && c.orderBy.length > 0) {
    const orderBys = c.orderBy.map((clause) => {
      const direction = clause.direction ? ` ${clause.direction}` : '';
      return `${clause.fieldName}${direction}`;
    });
    result.push(`ORDER BY ${orderBys.join(', ')}`);
  }
  if (c.limit) {
    result.push(`LIMIT ${c.limit}`);
  }
  return result.join('\n');
}

// Trace Processor returns number | null for NUM_NULL, while most of the UI
// code uses number | undefined. This functions provides a short-hand
// conversion.
// TODO(altimin): Support NUM_UNDEFINED as a first-class citizen.
export function fromNumNull(n: number|null): number|undefined {
  if (n === null) {
    return undefined;
  }
  return n;
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {BottomTab, bottomTabRegistry, NewBottomTabArgs} from './bottom_tab';
import {globals} from './globals';
import {ThreadStateSqlId} from './sql_types';
import {getThreadState, ThreadState, threadStateToDict} from './thread_state';
import {renderDict} from './value';

interface ThreadStateTabConfig {
  // Id into |thread_state| sql table.
  readonly id: ThreadStateSqlId;
}

export class ThreadStateTab extends BottomTab<ThreadStateTabConfig> {
  static readonly kind = 'org.perfetto.ThreadStateTab';

  state?: ThreadState;
  loaded: boolean = false;

  static create(args: NewBottomTabArgs): ThreadStateTab {
    return new ThreadStateTab(args);
  }

  constructor(args: NewBottomTabArgs) {
    super(args);

    getThreadState(this.engine, this.config.id).then((state?: ThreadState) => {
      this.loaded = true;
      this.state = state;
      globals.rafScheduler.scheduleFullRedraw();
    });
  }

  getTitle() {
    // TODO(altimin): Support dynamic titles here.
    return 'Current Selection';
  }

  renderTabContents(): m.Child {
    if (!this.loaded) {
      return m('h2', 'Loading');
    }
    if (!this.state) {
      return m('h2', `Thread state ${this.config.id} does not exist`);
    }
    return renderDict(threadStateToDict(this.state));
  }

  viewTab() {
    // TODO(altimin): Create a reusable component for showing the header and
    // differentiate between "Current Selection" and "Pinned" views.
    return m(
        'div.details-panel',
        m('header.overview', m('span', 'Thread State')),
        this.renderTabContents());
  }

  isLoading() {
    return this.state === undefined;
  }

  renderTabCanvas(): void {}
}

bottomTabRegistry.register(ThreadStateTab);
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {assertExists, assertTrue} from '../base/logging';
import {PageAttrs} from './pages';

export const ROUTE_PREFIX = '#!';
const DEFAULT_ROUTE = '/';

// A broken down representation of a route.
// For instance: #!/record/gpu?local_cache_key=a0b1
// becomes: {page: '/record', subpage: '/gpu', args: {local_cache_key: 'a0b1'}}
export interface Route {
  page: string;
  subpage: string;
  args: RouteArgs;
}

// The set of args that can be set on the route via #!/page?a=1&b2.
// Route args are orthogonal to pages (i.e. should NOT make sense only in a
// only within a specific page, use /page/subpages for that).
// Args are !== the querystring (location.search) which is sent to the
// server. The route args are NOT sent to the HTTP server.
// Given this URL:
// http://host/?foo=1&bar=2#!/page/subpage?local_cache_key=a0b1&baz=3.
//
// location.search = 'foo=1&bar=2'.
//   This is seen by the HTTP server. We really don't use querystrings as the
//   perfetto UI is client only.
//
// location.hash = '#!/page/subpage?local_cache_key=a0b1'.
//   This is client-only. All the routing logic in the Perfetto UI uses only
//   this.

// This must be a type literial to avoid having to duplicate the
// index type logic of Params.
export type RouteArgs = {
  // The local_cache_key is special and is persisted across navigations.
  local_cache_key?: string;

  // These are transient and are really set only on startup.
  openFromAndroidBugTool?: string;
  s?: string;    // For permalinks.
  p?: string;    // DEPRECATED: for #!/record?p=cpu subpages (b/191255021).
  url?: string;  // For fetching traces from Cloud Storage.
};

export interface RoutesMap {
  [key: string]: m.Component<PageAttrs>;
}

// This router does two things:
// 1) Maps fragment paths (#!/page/subpage) to Mithril components.
// The route map is passed to the ctor and is later used when calling the
// resolve() method.
//
// 2) Handles the (optional) args, e.g. #!/page?arg=1&arg2=2.
// Route args are carry information that is orthogonal to the page (e.g. the
// trace id).
// local_cache_key has some special treatment: once a URL has a local_cache_key,
// it gets automatically appended to further navigations that don't have one.
// For instance if the current url is #!/viewer?local_cache_key=1234 and a later
// action (either user-initiated or code-initited) navigates to #!/info, the
// rotuer will automatically replace the history entry with
// #!/info?local_cache_key=1234.
// This is to keep propagating the trace id across page changes, for handling
// tab discards (b/175041881).
//
// This class does NOT deal with the "load a trace when the url contains ?url=
// or ?local_cache_key=". That logic lives in trace_url_handler.ts, which is
// triggered by Router.onRouteChanged().
export class Router {
  private readonly recentChanges: number[] = [];
  private routes: RoutesMap;

  // frontend/index.ts calls maybeOpenTraceFromRoute() + redraw here.
  // This event is decoupled for testing and to avoid circular deps.
  onRouteChanged: (route: Route) => (void) = () => {};

  constructor(routes: RoutesMap) {
    assertExists(routes[DEFAULT_ROUTE]);
    this.routes = routes;
    window.onhashchange = (e: HashChangeEvent) => this.onHashChange(e);
  }

  private onHashChange(e: HashChangeEvent) {
    this.crashIfLivelock();

    const oldRoute = Router.parseUrl(e.oldURL);
    const newRoute = Router.parseUrl(e.newURL);

    if (newRoute.args.local_cache_key === undefined &&
        oldRoute.args.local_cache_key) {
      // Propagate `local_cache_key across` navigations. When a trace is loaded,
      // the URL becomes #!/viewer?local_cache_key=123. `local_cache_key` allows
      // reopening the trace from cache in the case of a reload or discard.
      // When using the UI we can hit "bare" links (e.g. just '#!/info') which
      // don't have the trace_uuid:
      // - When clicking on an <a> element from the sidebar.
      // - When the code calls Router.navigate().
      // - When the user pastes a URL from docs page.
      // In all these cases we want to keep propagating the `local_cache_key`.
      // We do so by re-setting the `local_cache_key` and doing a
      // location.replace which overwrites the history entry (note
      // location.replace is NOT just a String.replace operation).
      newRoute.args.local_cache_key = oldRoute.args.local_cache_key;
    }

    const args = m.buildQueryString(newRoute.args);
    let normalizedFragment = `#!${newRoute.page}${newRoute.subpage}`;
    normalizedFragment += args.length > 0 ? '?' + args : '';
    if (!e.newURL.endsWith(normalizedFragment)) {
      location.replace(normalizedFragment);
      return;
    }

    this.onRouteChanged(newRoute);
  }

  // Returns the component for the current route in the URL.
  // If no route matches the URL, returns a component corresponding to
  // |this.defaultRoute|.
  resolve(): m.Vnode<PageAttrs> {
    const route = Router.parseFragment(location.hash);
    let component = this.routes[route.page];
    if (component === undefined) {
      component = assertExists(this.routes[DEFAULT_ROUTE]);
    }
    return m(component, {subpage: route.subpage} as PageAttrs);
  }

  static navigate(newHash: string) {
    assertTrue(newHash.startsWith(ROUTE_PREFIX));
    window.location.hash = newHash;
  }

  // Breaks down a fragment into a Route object.
  // Sample input:
  // '#!/record/gpu?local_cache_key=abcd-1234'
  // Sample output:
  // {page: '/record', subpage: '/gpu', args: {local_cache_key: 'abcd-1234'}}
  static parseFragment(hash: string): Route {
    const prefixLength = ROUTE_PREFIX.length;
    let route = '';
    if (hash.startsWith(ROUTE_PREFIX)) {
      route = hash.substring(prefixLength).split('?')[0];
    }

    let page = route;
    let subpage = '';
    const splittingPoint = route.indexOf('/', 1);
    if (splittingPoint > 0) {
      page = route.substring(0, splittingPoint);
      subpage = route.substring(splittingPoint);
    }

    const argsStart = hash.indexOf('?');
    const argsStr = argsStart < 0 ? '' : hash.substring(argsStart + 1);
    const args = argsStr ? m.parseQueryString(hash.substring(argsStart)) : {};

    return {page, subpage, args};
  }

  // Like parseFragment() but takes a full URL.
  static parseUrl(url: string): Route {
    const hashPos = url.indexOf('#');
    const fragment = hashPos < 0 ? '' : url.substring(hashPos);
    return Router.parseFragment(fragment);
  }

  // Throws if EVENT_LIMIT onhashchange events occur within WINDOW_MS.
  private crashIfLivelock() {
    const WINDOW_MS = 1000;
    const EVENT_LIMIT = 20;
    const now = Date.now();
    while (this.recentChanges.length > 0 &&
           now - this.recentChanges[0] > WINDOW_MS) {
      this.recentChanges.shift();
    }
    this.recentChanges.push(now);
    if (this.recentChanges.length > EVENT_LIMIT) {
      throw new Error('History rewriting livelock');
    }
  }
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {VERSION} from '../gen/perfetto_version';

import {globals} from './globals';
import {runQueryInNewTab} from './query_result_tab';
import {executeSearch} from './search_handler';
import {taskTracker} from './task_tracker';

const SEARCH = Symbol('search');
const COMMAND = Symbol('command');
type Mode = typeof SEARCH|typeof COMMAND;

const PLACEHOLDER = {
  [SEARCH]: 'Search',
  [COMMAND]: 'e.g. select * from sched left join thread using(utid) limit 10',
};

export const DISMISSED_PANNING_HINT_KEY = 'dismissedPanningHint';

let mode: Mode = SEARCH;
let displayStepThrough = false;

function onKeyDown(e: Event) {
  const event = (e as KeyboardEvent);
  const key = event.key;
  if (key !== 'Enter') {
    e.stopPropagation();
  }
  const txt = (e.target as HTMLInputElement);

  if (mode === SEARCH && txt.value === '' && key === ':') {
    e.preventDefault();
    mode = COMMAND;
    globals.rafScheduler.scheduleFullRedraw();
    return;
  }

  if (mode === COMMAND && txt.value === '' && key === 'Backspace') {
    mode = SEARCH;
    globals.rafScheduler.scheduleFullRedraw();
    return;
  }

  if (mode === SEARCH && key === 'Enter') {
    txt.blur();
  }

  if (mode === COMMAND && key === 'Enter') {
    const openInPinnedTab = event.metaKey || event.ctrlKey;
    runQueryInNewTab(
        txt.value,
        openInPinnedTab ? 'Pinned query' : 'Omnibox query',
        openInPinnedTab ? undefined : 'omnibox_query',
    );
  }
}

function onKeyUp(e: Event) {
  e.stopPropagation();
  const event = (e as KeyboardEvent);
  const key = event.key;
  const txt = e.target as HTMLInputElement;

  if (key === 'Escape') {
    mode = SEARCH;
    txt.value = '';
    txt.blur();
    globals.rafScheduler.scheduleFullRedraw();
    return;
  }
}

class Omnibox implements m.ClassComponent {
  oncreate(vnode: m.VnodeDOM) {
    const txt = vnode.dom.querySelector('input') as HTMLInputElement;
    txt.addEventListener('keydown', onKeyDown);
    txt.addEventListener('keyup', onKeyUp);
  }

  view() {
    const msgTTL = globals.state.status.timestamp + 1 - Date.now() / 1e3;
    const engineIsBusy =
        globals.state.engine !== undefined && !globals.state.engine.ready;

    if (msgTTL > 0 || engineIsBusy) {
      setTimeout(
          () => globals.rafScheduler.scheduleFullRedraw(), msgTTL * 1000);
      return m(
          `.omnibox.message-mode`,
          m(`input[placeholder=${globals.state.status.msg}][readonly]`, {
            value: '',
          }));
    }

    const commandMode = mode === COMMAND;
    return m(
        `.omnibox${commandMode ? '.command-mode' : ''}`,
        m('input', {
          placeholder: PLACEHOLDER[mode],
          oninput: (e: InputEvent) => {
            const value = (e.target as HTMLInputElement).value;
            globals.dispatch(Actions.setOmnibox({
              omnibox: value,
              mode: commandMode ? 'COMMAND' : 'SEARCH',
            }));
            if (mode === SEARCH) {
              displayStepThrough = value.length >= 4;
              globals.dispatch(Actions.setSearchIndex({index: -1}));
            }
          },
          value: globals.state.omniboxState.omnibox,
        }),
        displayStepThrough ?
            m(
                '.stepthrough',
                m('.current',
                  `${
                      globals.currentSearchResults.totalResults === 0 ?
                          '0 / 0' :
                          `${globals.state.searchIndex + 1} / ${
                              globals.currentSearchResults.totalResults}`}`),
                m('button',
                  {
                    onclick: () => {
                      executeSearch(true /* reverse direction */);
                    },
                  },
                  m('i.material-icons.left', 'keyboard_arrow_left')),
                m('button',
                  {
                    onclick: () => {
                      executeSearch();
                    },
                  },
                  m('i.material-icons.right', 'keyboard_arrow_right')),
                ) :
            '');
  }
}

class Progress implements m.ClassComponent {
  private loading: () => void;
  private progressBar?: HTMLElement;

  constructor() {
    this.loading = () => this.loadingAnimation();
  }

  oncreate(vnodeDom: m.CVnodeDOM) {
    this.progressBar = vnodeDom.dom as HTMLElement;
    globals.rafScheduler.addRedrawCallback(this.loading);
  }

  onremove() {
    globals.rafScheduler.removeRedrawCallback(this.loading);
  }

  view() {
    return m('.progress');
  }

  loadingAnimation() {
    if (this.progressBar === undefined) return;
    const engine = globals.getCurrentEngine();
    if ((engine && !engine.ready) || globals.numQueuedQueries > 0 ||
        taskTracker.hasPendingTasks()) {
      this.progressBar.classList.add('progress-anim');
    } else {
      this.progressBar.classList.remove('progress-anim');
    }
  }
}


class NewVersionNotification implements m.ClassComponent {
  view() {
    return m(
        '.new-version-toast',
        `Updated to ${VERSION} and ready for offline use!`,
        m('button.notification-btn.preferred',
          {
            onclick: () => {
              globals.frontendLocalState.newVersionAvailable = false;
              globals.rafScheduler.scheduleFullRedraw();
            },
          },
          'Dismiss'),
    );
  }
}


class HelpPanningNotification implements m.ClassComponent {
  view() {
    const dismissed = localStorage.getItem(DISMISSED_PANNING_HINT_KEY);
    // Do not show the help notification in embedded mode because local storage
    // does not persist for iFrames. The host is responsible for communicating
    // to users that they can press '?' for help.
    if (globals.embeddedMode || dismissed === 'true' ||
        !globals.frontendLocalState.showPanningHint) {
      return;
    }
    return m(
        '.helpful-hint',
        m('.hint-text',
          'Are you trying to pan? Use the WASD keys or hold shift to click ' +
              'and drag. Press \'?\' for more help.'),
        m('button.hint-dismiss-button',
          {
            onclick: () => {
              globals.frontendLocalState.showPanningHint = false;
              localStorage.setItem(DISMISSED_PANNING_HINT_KEY, 'true');
              globals.rafScheduler.scheduleFullRedraw();
            },
          },
          'Dismiss'),
    );
  }
}

class TraceErrorIcon implements m.ClassComponent {
  view() {
    if (globals.embeddedMode) return;

    const errors = globals.traceErrors;
    if (!errors && !globals.metricError || mode === COMMAND) return;
    const message = errors ? `${errors} import or data loss errors detected.` :
                             `Metric error detected.`;
    return m(
        'a.error',
        {href: '#!/info'},
        m('i.material-icons',
          {
            title: message + ` Click for more info.`,
          },
          'announcement'));
  }
}

export class Topbar implements m.ClassComponent {
  view() {
    return m(
        '.topbar',
        {class: globals.state.sidebarVisible ? '' : 'hide-sidebar'},
        globals.frontendLocalState.newVersionAvailable ?
            m(NewVersionNotification) :
            m(Omnibox),
        m(Progress),
        m(HelpPanningNotification),
        m(TraceErrorIcon));
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {PopupMenuButton, PopupMenuItem} from './popup_menu';

// This file implements a component for rendering JSON-like values (with
// customisation options like context menu and action buttons).
//
// It defines the common Value, StringValue, DictValue, ArrayValue types,
// to be used as an interchangeable format between different components
// and `renderValue` function to convert DictValue into vdom nodes.

// Leaf (non-dict and non-array) value which can be displayed to the user
// together with the rendering customisation parameters.
type StringValue = {
  kind: 'STRING',
  value: string,
}&StringValueParams;

// Helper function to create a StringValue from string together with optional
// parameters.
export function value(value: string, params?: StringValueParams): StringValue {
  return {
    kind: 'STRING',
    value,
    ...params,
  };
}

// Helper function to convert a potentially undefined value to StringValue or
// null.
export function maybeValue(v?: string, params?: StringValueParams): StringValue|
    null {
  if (!v) {
    return null;
  }
  return value(v, params);
}

// A basic type for the JSON-like value, comprising a primitive type (string)
// and composite types (arrays and dicts).
export type Value = StringValue|Array|Dict;

// Dictionary type.
export type Dict = {
  kind: 'DICT',
  items: {[name: string]: Value},
}&ValueParams;

// Helper function to simplify creation of a dictionary.
// This function accepts and filters out nulls as values in the passed
// dictionary (useful for simplifying the code to render optional values).
export function dict(
    items: {[name: string]: Value|null}, params?: ValueParams): Dict {
  const result: {[name: string]: Value} = {};
  for (const [name, value] of Object.entries(items)) {
    if (value !== null) {
      result[name] = value;
    }
  }
  return {
    kind: 'DICT',
    items: result,
    ...params,
  };
}

// Array type.
export type Array = {
  kind: 'ARRAY', items: Value[];
}&ValueParams;

// Helper function to simplify creation of an array.
// This function accepts and filters out nulls in the passed array (useful for
// simplifying the code to render optional values).
export function array(items: (Value|null)[], params?: ValueParams): Array {
  return {
    kind: 'ARRAY',
    items: items.filter((item: Value|null) => item !== null) as Value[],
    ...params,
  };
}

// Parameters for displaying a button next to a value to perform
// the context-dependent action (i.e. go to the corresponding slice).
type ButtonParams = {
  action: () => void;
  hoverText?: string;
  icon?: string;
}

// Customisation parameters which apply to any Value (e.g. context menu).
interface ValueParams {
  contextMenu?: PopupMenuItem[];
}

// Customisation parameters which apply for a primitive value (e.g. showing
// button next to a string, or making it clickable, or adding onhover effect).
interface StringValueParams extends ValueParams {
  leftButton?: ButtonParams;
  rightButton?: ButtonParams;
}

export function isArray(value: Value): value is Array {
  return value.kind === 'ARRAY';
};

export function isDict(value: Value): value is Dict {
  return value.kind === 'DICT';
};

export function isStringValue(value: Value): value is StringValue {
  return !isArray(value) && !isDict(value);
};

// Recursively render the given value and its children, returning a list of
// vnodes corresponding to the nodes of the table.
function*
    renderValue(name: string, value: Value, depth: number): Generator<m.Child> {
  const row = [
    m('th',
      {
        style: `padding-left: ${15 * depth}px`,
      },
      name,
      value.contextMenu ? m(PopupMenuButton, {
        icon: 'arrow_drop_down',
        items: value.contextMenu,
      }) :
                          null),
  ];
  if (isArray(value)) {
    yield m('tr', row);
    for (let i = 0; i < value.items.length; ++i) {
      yield* renderValue(`[${i}]`, value.items[i], depth + 1);
    }
    return;
  } else if (isDict(value)) {
    yield m('tr', row);
    for (const key of Object.keys(value.items)) {
      yield* renderValue(key, value.items[key], depth + 1);
    }
    return;
  }
  const renderButton = (button?: ButtonParams) => {
    if (!button) {
      return null;
    }
    return m(
        'i.material-icons.grey',
        {
          onclick: button.action,
          title: button.hoverText,
        },
        button.icon ? button.icon : 'call_made');
  };
  if (value.kind === 'STRING') {
    row.push(
        m('td',
          renderButton(value.leftButton),
          m('span', value.value),
          renderButton(value.rightButton)));
  }
  yield m('tr', row);
}

// Render a given dictionary into a vnode.
export function renderDict(dict: Dict): m.Child {
  const rows: m.Child[] = [];
  for (const key of Object.keys(dict.items)) {
    for (const vnode of renderValue(key, dict.items[key], 0)) {
      rows.push(vnode);
    }
  }
  return m('table.auto-layout', rows);
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {featureFlags} from '../common/feature_flags';
import {TimeSpan} from '../common/time';

import {TRACK_SHELL_WIDTH} from './css_constants';
import {DetailsPanel} from './details_panel';
import {globals} from './globals';
import {NotesPanel} from './notes_panel';
import {OverviewTimelinePanel} from './overview_timeline_panel';
import {createPage} from './pages';
import {PanAndZoomHandler} from './pan_and_zoom_handler';
import {AnyAttrsVnode, PanelContainer} from './panel_container';
import {TickmarkPanel} from './tickmark_panel';
import {TimeAxisPanel} from './time_axis_panel';
import {computeZoom} from './time_scale';
import {TimeSelectionPanel} from './time_selection_panel';
import {DISMISSED_PANNING_HINT_KEY} from './topbar';
import {TrackGroupPanel} from './track_group_panel';
import {TrackPanel} from './track_panel';

const SIDEBAR_WIDTH = 256;

const OVERVIEW_PANEL_FLAG = featureFlags.register({
  id: 'overviewVisible',
  name: 'Overview Panel',
  description: 'Show the panel providing an overview of the trace',
  defaultValue: true,
});

// Checks if the mousePos is within 3px of the start or end of the
// current selected time range.
function onTimeRangeBoundary(mousePos: number): 'START'|'END'|null {
  const selection = globals.state.currentSelection;
  if (selection !== null && selection.kind === 'AREA') {
    // If frontend selectedArea exists then we are in the process of editing the
    // time range and need to use that value instead.
    const area = globals.frontendLocalState.selectedArea ?
        globals.frontendLocalState.selectedArea :
        globals.state.areas[selection.areaId];
    const start = globals.frontendLocalState.timeScale.timeToPx(area.startSec);
    const end = globals.frontendLocalState.timeScale.timeToPx(area.endSec);
    const startDrag = mousePos - TRACK_SHELL_WIDTH;
    const startDistance = Math.abs(start - startDrag);
    const endDistance = Math.abs(end - startDrag);
    const range = 3 * window.devicePixelRatio;
    // We might be within 3px of both boundaries but we should choose
    // the closest one.
    if (startDistance < range && startDistance <= endDistance) return 'START';
    if (endDistance < range && endDistance <= startDistance) return 'END';
  }
  return null;
}

export interface TrackGroupAttrs {
  header: AnyAttrsVnode;
  collapsed: boolean;
  childTracks: AnyAttrsVnode[];
}

export class TrackGroup implements m.ClassComponent<TrackGroupAttrs> {
  view() {
    // TrackGroup component acts as a holder for a bunch of tracks rendered
    // together: the actual rendering happens in PanelContainer. In order to
    // avoid confusion, this method remains empty.
  }
}

/**
 * Top-most level component for the viewer page. Holds tracks, brush timeline,
 * panels, and everything else that's part of the main trace viewer page.
 */
class TraceViewer implements m.ClassComponent {
  private onResize: () => void = () => {};
  private zoomContent?: PanAndZoomHandler;
  // Used to prevent global deselection if a pan/drag select occurred.
  private keepCurrentSelection = false;

  oncreate(vnode: m.CVnodeDOM) {
    const frontendLocalState = globals.frontendLocalState;
    const updateDimensions = () => {
      const rect = vnode.dom.getBoundingClientRect();
      frontendLocalState.updateLocalLimits(
          0,
          rect.width - TRACK_SHELL_WIDTH -
              frontendLocalState.getScrollbarWidth());
    };

    updateDimensions();

    // TODO: Do resize handling better.
    this.onResize = () => {
      updateDimensions();
      globals.rafScheduler.scheduleFullRedraw();
    };

    // Once ResizeObservers are out, we can stop accessing the window here.
    window.addEventListener('resize', this.onResize);

    const panZoomEl =
        vnode.dom.querySelector('.pan-and-zoom-content') as HTMLElement;

    this.zoomContent = new PanAndZoomHandler({
      element: panZoomEl,
      contentOffsetX: SIDEBAR_WIDTH,
      onPanned: (pannedPx: number) => {
        this.keepCurrentSelection = true;
        const traceTime = globals.state.traceTime;
        const vizTime = globals.frontendLocalState.visibleWindowTime;
        const origDelta = vizTime.duration;
        const tDelta = frontendLocalState.timeScale.deltaPxToDuration(pannedPx);
        let tStart = vizTime.start + tDelta;
        let tEnd = vizTime.end + tDelta;
        if (tStart < traceTime.startSec) {
          tStart = traceTime.startSec;
          tEnd = tStart + origDelta;
        } else if (tEnd > traceTime.endSec) {
          tEnd = traceTime.endSec;
          tStart = tEnd - origDelta;
        }
        frontendLocalState.updateVisibleTime(new TimeSpan(tStart, tEnd));
        // If the user has panned they no longer need the hint.
        localStorage.setItem(DISMISSED_PANNING_HINT_KEY, 'true');
        globals.rafScheduler.scheduleRedraw();
      },
      onZoomed: (zoomedPositionPx: number, zoomRatio: number) => {
        // TODO(hjd): Avoid hardcoding TRACK_SHELL_WIDTH.
        // TODO(hjd): Improve support for zooming in overview timeline.
        const span = frontendLocalState.visibleWindowTime;
        const scale = frontendLocalState.timeScale;
        const zoomPx = zoomedPositionPx - TRACK_SHELL_WIDTH;
        const newSpan = computeZoom(scale, span, 1 - zoomRatio, zoomPx);
        frontendLocalState.updateVisibleTime(newSpan);
        globals.rafScheduler.scheduleRedraw();
      },
      editSelection: (currentPx: number) => {
        return onTimeRangeBoundary(currentPx) !== null;
      },
      onSelection: (
          dragStartX: number,
          dragStartY: number,
          prevX: number,
          currentX: number,
          currentY: number,
          editing: boolean) => {
        const traceTime = globals.state.traceTime;
        const scale = frontendLocalState.timeScale;
        this.keepCurrentSelection = true;
        if (editing) {
          const selection = globals.state.currentSelection;
          if (selection !== null && selection.kind === 'AREA') {
            const area = globals.frontendLocalState.selectedArea ?
                globals.frontendLocalState.selectedArea :
                globals.state.areas[selection.areaId];
            let newTime = scale.pxToTime(currentX - TRACK_SHELL_WIDTH);
            // Have to check again for when one boundary crosses over the other.
            const curBoundary = onTimeRangeBoundary(prevX);
            if (curBoundary == null) return;
            const keepTime =
                curBoundary === 'START' ? area.endSec : area.startSec;
            // Don't drag selection outside of current screen.
            if (newTime < keepTime) {
              newTime = Math.max(newTime, scale.pxToTime(scale.startPx));
            } else {
              newTime = Math.min(newTime, scale.pxToTime(scale.endPx));
            }
            // When editing the time range we always use the saved tracks,
            // since these will not change.
            frontendLocalState.selectArea(
                Math.max(Math.min(keepTime, newTime), traceTime.startSec),
                Math.min(Math.max(keepTime, newTime), traceTime.endSec),
                globals.state.areas[selection.areaId].tracks);
          }
        } else {
          let startPx = Math.min(dragStartX, currentX) - TRACK_SHELL_WIDTH;
          let endPx = Math.max(dragStartX, currentX) - TRACK_SHELL_WIDTH;
          if (startPx < 0 && endPx < 0) return;
          startPx = Math.max(startPx, scale.startPx);
          endPx = Math.min(endPx, scale.endPx);
          frontendLocalState.selectArea(
              scale.pxToTime(startPx), scale.pxToTime(endPx));
          frontendLocalState.areaY.start = dragStartY;
          frontendLocalState.areaY.end = currentY;
        }
        globals.rafScheduler.scheduleRedraw();
      },
      endSelection: (edit: boolean) => {
        globals.frontendLocalState.areaY.start = undefined;
        globals.frontendLocalState.areaY.end = undefined;
        const area = globals.frontendLocalState.selectedArea;
        // If we are editing we need to pass the current id through to ensure
        // the marked area with that id is also updated.
        if (edit) {
          const selection = globals.state.currentSelection;
          if (selection !== null && selection.kind === 'AREA' && area) {
            globals.dispatch(
                Actions.editArea({area, areaId: selection.areaId}));
          }
        } else if (area) {
          globals.makeSelection(Actions.selectArea({area}));
        }
        // Now the selection has ended we stored the final selected area in the
        // global state and can remove the in progress selection from the
        // frontendLocalState.
        globals.frontendLocalState.deselectArea();
        // Full redraw to color track shell.
        globals.rafScheduler.scheduleFullRedraw();
      },
    });
  }

  onremove() {
    window.removeEventListener('resize', this.onResize);
    if (this.zoomContent) this.zoomContent.shutdown();
  }

  view() {
    const scrollingPanels: AnyAttrsVnode[] = globals.state.scrollingTracks.map(
        (id) => m(TrackPanel, {key: id, id, selectable: true}));

    for (const group of Object.values(globals.state.trackGroups)) {
      const headerPanel = m(TrackGroupPanel, {
        trackGroupId: group.id,
        key: `trackgroup-${group.id}`,
        selectable: true,
      });

      const childTracks: AnyAttrsVnode[] = [];
      // The first track is the summary track, and is displayed as part of the
      // group panel, we don't want to display it twice so we start from 1.
      if (!group.collapsed) {
        for (let i = 1; i < group.tracks.length; ++i) {
          const id = group.tracks[i];
          childTracks.push(m(TrackPanel, {
            key: `track-${group.id}-${id}`,
            id,
            selectable: true,
          }));
        }
      }
      scrollingPanels.push(m(TrackGroup, {
        header: headerPanel,
        collapsed: group.collapsed,
        childTracks,
      } as TrackGroupAttrs));
    }

    const overviewPanel = [];
    if (OVERVIEW_PANEL_FLAG.get()) {
      overviewPanel.push(m(OverviewTimelinePanel, {key: 'overview'}));
    }

    return m(
        '.page',
        m('.split-panel',
          m('.pan-and-zoom-content',
            {
              onclick: () => {
                // We don't want to deselect when panning/drag selecting.
                if (this.keepCurrentSelection) {
                  this.keepCurrentSelection = false;
                  return;
                }
                globals.makeSelection(Actions.deselect({}));
              },
            },
            m('.pinned-panel-container', m(PanelContainer, {
                doesScroll: false,
                panels: [
                  ...overviewPanel,
                  m(TimeAxisPanel, {key: 'timeaxis'}),
                  m(TimeSelectionPanel, {key: 'timeselection'}),
                  m(NotesPanel, {key: 'notes'}),
                  m(TickmarkPanel, {key: 'searchTickmarks'}),
                  ...globals.state.pinnedTracks.map(
                      (id) => m(TrackPanel, {key: id, id, selectable: true})),
                ],
                kind: 'OVERVIEW',
              })),
            m('.scrolling-panel-container', m(PanelContainer, {
                doesScroll: true,
                panels: scrollingPanels,
                kind: 'TRACKS',
              })))),
        m(DetailsPanel));
  }
}

export const ViewerPage = createPage({
  view() {
    return m(TraceViewer);
  },
});
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {getCurrentChannel} from '../common/channels';
import {VERSION} from '../gen/perfetto_version';

import {globals} from './globals';
import {Router} from './router';

type TraceCategories = 'Trace Actions'|'Record Trace'|'User Actions';
const ANALYTICS_ID = 'UA-137828855-1';
const PAGE_TITLE = 'no-page-title';

export function initAnalytics() {
  // Only initialize logging on the official site and on localhost (to catch
  // analytics bugs when testing locally).
  // Skip analytics is the fragment has "testing=1", this is used by UI tests.
  // Skip analytics in embeddedMode since iFrames do not have the same access to
  // local storage.
  if ((window.location.origin.startsWith('http://localhost:') ||
       window.location.origin.endsWith('.perfetto.dev')) &&
      !globals.testing && !globals.embeddedMode) {
    return new AnalyticsImpl();
  }
  return new NullAnalytics();
}

const gtagGlobals = window as {} as {
  dataLayer: any[];
  gtag: (command: string, event: string|Date, args?: {}) => void;
};

export interface Analytics {
  initialize(): void;
  updatePath(_: string): void;
  logEvent(_x: TraceCategories|null, _y: string): void;
  logError(_x: string, _y?: boolean): void;
  isEnabled(): boolean;
}

export class NullAnalytics implements Analytics {
  initialize() {}
  updatePath(_: string) {}
  logEvent(_x: TraceCategories|null, _y: string) {}
  logError(_x: string) {}
  isEnabled(): boolean {
    return false;
  }
}

class AnalyticsImpl implements Analytics {
  private initialized_ = false;

  constructor() {
    // The code below is taken from the official Google Analytics docs [1] and
    // adapted to TypeScript. We have it here rather than as an inline script
    // in index.html (as suggested by GA's docs) because inline scripts don't
    // play nicely with the CSP policy, at least in Firefox (Firefox doesn't
    // support all CSP 3 features we use).
    // [1] https://developers.google.com/analytics/devguides/collection/gtagjs .
    gtagGlobals.dataLayer = gtagGlobals.dataLayer || [];

    function gtagFunction(..._: any[]) {
      // This needs to be a function and not a lambda. |arguments| behaves
      // slightly differently in a lambda and breaks GA.
      gtagGlobals.dataLayer.push(arguments);
    }
    gtagGlobals.gtag = gtagFunction;
    gtagGlobals.gtag('js', new Date());
  }

  // This is callled only after the script that sets isInternalUser loads.
  // It is fine to call updatePath() and log*() functions before initialize().
  // The gtag() function internally enqueues all requests into |dataLayer|.
  initialize() {
    if (this.initialized_) return;
    this.initialized_ = true;
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS_ID;
    script.defer = true;
    document.head.appendChild(script);
    const route = Router.parseUrl(window.location.href).page || '/';
    console.log(
        `GA initialized. route=${route}`,
        `isInternalUser=${globals.isInternalUser}`);
    // GA's reccomendation for SPAs is to disable automatic page views and
    // manually send page_view events. See:
    // https://developers.google.com/analytics/devguides/collection/gtagjs/pages#manual_pageviews
    gtagGlobals.gtag('config', ANALYTICS_ID, {
      allow_google_signals: false,
      anonymize_ip: true,
      page_path: route,
      referrer: document.referrer.split('?')[0],
      send_page_view: false,
      page_title: PAGE_TITLE,
      dimension1: globals.isInternalUser ? '1' : '0',
      dimension2: VERSION,
      dimension3: getCurrentChannel(),
    });
    this.updatePath(route);
  }

  updatePath(path: string) {
    gtagGlobals.gtag(
        'event', 'page_view', {page_path: path, page_title: PAGE_TITLE});
  }

  logEvent(category: TraceCategories|null, event: string) {
    gtagGlobals.gtag('event', event, {event_category: category});
  }

  logError(description: string, fatal = true) {
    gtagGlobals.gtag('event', 'exception', {description, fatal});
  }

  isEnabled(): boolean {
    return true;
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {GRAY_COLOR} from '../common/colorizer';

import {
  filterVisibleSlicesForTesting as filterVisibleSlices,
} from './base_slice_track';
import {Slice} from './slice';

function slice(startS: number, durationS: number): Slice {
  return {
    id: 42,
    startS,
    durationS,
    depth: 0,
    flags: 0,
    title: '',
    subTitle: '',
    baseColor: GRAY_COLOR,
    color: GRAY_COLOR,
  };
}

const s = slice;

test('filterVisibleSlices', () => {
  expect(filterVisibleSlices([], 0, 100)).toEqual([]);
  expect(filterVisibleSlices([s(10, 80)], 0, 100)).toEqual([s(10, 80)]);
  expect(filterVisibleSlices([s(0, 20)], 10, 100)).toEqual([s(0, 20)]);
  expect(filterVisibleSlices([s(0, 10)], 10, 100)).toEqual([s(0, 10)]);
  expect(filterVisibleSlices([s(100, 10)], 10, 100)).toEqual([s(100, 10)]);
  expect(filterVisibleSlices([s(10, 0)], 10, 100)).toEqual([s(10, 0)]);
  expect(filterVisibleSlices([s(100, 0)], 10, 100)).toEqual([s(100, 0)]);
  expect(filterVisibleSlices([s(0, 5)], 10, 90)).toEqual([]);
  expect(filterVisibleSlices([s(95, 5)], 10, 90)).toEqual([]);
  expect(filterVisibleSlices([s(0, 5), s(95, 5)], 10, 90)).toEqual([]);
  expect(filterVisibleSlices(
             [
               s(0, 5),
               s(50, 0),
               s(95, 5),
             ],
             10,
             90))
      .toEqual([
        s(50, 0),
      ]);
  expect(filterVisibleSlices(
             [
               s(0, 5),
               s(1, 9),
               s(6, 3),
             ],
             10,
             90))
      .toContainEqual(s(1, 9));
  expect(filterVisibleSlices(
             [
               s(0, 5),
               s(1, 9),
               s(6, 3),
               s(50, 0),
             ],
             10,
             90))
      .toContainEqual(s(1, 9));
  expect(filterVisibleSlices(
             [
               s(85, 10),
               s(100, 10),
             ],
             10,
             90))
      .toEqual([
        s(85, 10),
      ]);
  expect(filterVisibleSlices(
             [
               s(0, 100),

             ],
             10,
             90))
      .toEqual([
        s(0, 100),
      ]);
  expect(filterVisibleSlices(
             [
               s(0, 1),
               s(1, 1),
               s(2, 1),
               s(3, 1),
               s(4, 1),
               s(5, 10),
               s(6, 1),
               s(7, 1),
               s(8, 1),
               s(9, 1),
             ],
             10,
             90))
      .toContainEqual(s(5, 10));
});
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {RunningStatistics} from './perf';

test('buffer size is accurate before reaching max capacity', () => {
  const buf = new RunningStatistics(10);

  for (let i = 0; i < 10; i++) {
    buf.addValue(i);
    expect(buf.bufferSize).toEqual(i + 1);
  }
});

test('buffer size is accurate after reaching max capacity', () => {
  const buf = new RunningStatistics(10);

  for (let i = 0; i < 10; i++) {
    buf.addValue(i);
  }

  for (let i = 0; i < 10; i++) {
    buf.addValue(i);
    expect(buf.bufferSize).toEqual(10);
  }
});

test('buffer mean is accurate before reaching max capacity', () => {
  const buf = new RunningStatistics(10);

  buf.addValue(1);
  buf.addValue(2);
  buf.addValue(3);

  expect(buf.bufferMean).toBeCloseTo(2);
});

test('buffer mean is accurate after reaching max capacity', () => {
  const buf = new RunningStatistics(10);

  for (let i = 0; i < 20; i++) {
    buf.addValue(2);
  }

  expect(buf.bufferMean).toBeCloseTo(2);
});
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// This module deals with modal dialogs. Unlike most components, here we want to
// render the DOM elements outside of the corresponding vdom tree. For instance
// we might want to instantiate a modal dialog all the way down from a nested
// Mithril sub-component, but we want the result dom element to be nested under
// the root <body>.
//
// This is achieved by splitting:
// 1. ModalContainer: it's the placeholder (e.g., the thing that should be added
//    under <body>) where the DOM elements will be rendered into. This is NOT
//    a mithril component itself.
// 2. Modal: is the Mithril component with the actual VDOM->DOM handling.
//    This can be used directly in the cases where the modal DOM should be
//    placed presicely where the corresponding Mithril VDOM is.
//    In turn this is split into Modal and ModalImpl, to deal with fade-out, see
//    comments around onbeforeremove.

// Usage (in the case of DOM not matching VDOM):
// - Create a ModalContainer instance somewhere (e.g. a singleton for the case
//   of the full-screen modal dialog).
// - In the view() method of the component that should host the DOM elements
//   (e.g. in the root pages.ts) do the following:
//   view() {
//     return m('main',
//        m('h2', ...)
//        m(modalContainerInstance.mithrilComponent);
//   }
//
// - In the view() method of the nested component that wants to show the modal
//   dialog do the following:
//   view() {
//     if (shouldShowModalDialog) {
//       modalContainerInstance.update({title: 'Foo', content, buttons: ...});
//     }
//     return m('.nested-widget',
//       m('div', ...));
//   }
//
// For one-show use-cases it's still possible to just use:
// showModal({title: 'Foo', content, buttons: ...});

import m from 'mithril';
import {defer} from '../base/deferred';
import {assertExists, assertTrue} from '../base/logging';
import {globals} from './globals';

export interface ModalDefinition {
  title: string;
  content: m.Children|(() => m.Children);
  vAlign?: 'MIDDLE' /* default */ | 'TOP';
  buttons?: Button[];
  close?: boolean;
  onClose?: () => void;
}

export interface Button {
  text: string;
  primary?: boolean;
  id?: string;
  action?: () => void;
}

// The component that handles the actual modal dialog. Note that this uses
// position: absolute, so the modal dialog will be relative to the surrounding
// DOM.
// We need to split this into two components (Modal and ModalImpl) so that we
// can handle the fade-out animation via onbeforeremove. The problem here is
// that onbeforeremove is emitted only when the *parent* component removes the
// children from the vdom hierarchy. So we need a parent/child in our control to
// trigger this.
export class Modal implements m.ClassComponent<ModalDefinition> {
  private requestClose = false;

  close() {
    // The next view pass will kick-off the modalFadeOut CSS animation by
    // appending the .modal-hidden CSS class.
    this.requestClose = true;
    globals.rafScheduler.scheduleFullRedraw();
  }

  view(vnode: m.Vnode<ModalDefinition>) {
    if (this.requestClose || vnode.attrs.close) {
      return null;
    }

    return m(ModalImpl, {...vnode.attrs, parent: this} as ModalImplAttrs);
  }
}

interface ModalImplAttrs extends ModalDefinition {
  parent: Modal;
}

// The component that handles the actual modal dialog. Note that this uses
// position: absolute, so the modal dialog will be relative to the surrounding
// DOM.
class ModalImpl implements m.ClassComponent<ModalImplAttrs> {
  private parent ?: Modal;
  private onClose?: () => void;

  view({attrs}: m.Vnode<ModalImplAttrs>) {
    this.onClose = attrs.onClose;
    this.parent = attrs.parent;

    const buttons: Array<m.Vnode<Button>> = [];
    for (const button of attrs.buttons || []) {
      buttons.push(m('button.modal-btn', {
        class: button.primary ? 'modal-btn-primary' : '',
        id: button.id,
        onclick: () => {
          attrs.parent.close();
          if (button.action !== undefined) button.action();
        },
      },
      button.text));
    }

    const aria = '[aria-labelledby=mm-title][aria-model][role=dialog]';
    const align = attrs.vAlign === 'TOP' ? '.modal-dialog-valign-top' : '';
    return m(
        '.modal-backdrop',
        {
          onclick: this.onclick.bind(this),
          onkeyup: this.onkeyupdown.bind(this),
          onkeydown: this.onkeyupdown.bind(this),
          // onanimationend: this.onanimationend.bind(this),
          tabIndex: 0,
        },
        m(
            `.modal-dialog${align}${aria}`,
            m(
                'header',
                m('h2', {id: 'mm-title'}, attrs.title),
                m(
                    'button[aria-label=Close Modal]',
                    {onclick: () => attrs.parent.close()},
                    m.trust('&#x2715'),
                    ),
                ),
            m('main', this.renderContent(attrs.content)),
            m('footer', buttons),
            ));
  }

  private renderContent(content: m.Children|(() => m.Children)): m.Children {
    if (typeof content === 'function') {
      return content();
    } else {
      return content;
    }
  }

  oncreate(vnode: m.VnodeDOM<ModalImplAttrs>) {
    if (vnode.dom instanceof HTMLElement) {
      // Focus the newly created dialog, so that we react to Escape keydown
      // even if the user has not clicked yet on any element.
      // If there is a primary button, focus that, so Enter does the default
      // action. If not just focus the whole dialog.
      const primaryBtn = vnode.dom.querySelector('.modal-btn-primary');
      if (primaryBtn) {
        (primaryBtn as HTMLElement).focus();
      } else {
        vnode.dom.focus();
      }
      // If the modal dialog is instantiated in a tall scrollable container,
      // make sure to scroll it into the view.
      vnode.dom.scrollIntoView({'block': 'center'});
    }
  }


  onbeforeremove(vnode: m.VnodeDOM<ModalImplAttrs>) {
    const removePromise = defer<void>();
    vnode.dom.addEventListener('animationend', () => removePromise.resolve());
    vnode.dom.classList.add('modal-fadeout');

    // Retuning `removePromise` will cause Mithril to defer the actual component
    // removal until the fade-out animation is done.
    return removePromise;
  }

  onremove() {
    if (this.onClose !== undefined) {
      this.onClose();
      globals.rafScheduler.scheduleFullRedraw();
    }
  }

  onclick(e: MouseEvent) {
    e.stopPropagation();
    // Only react when clicking on the backdrop. Don't close if the user clicks
    // on the dialog itself.
    const t = e.target;
    if (t instanceof Element && t.classList.contains('modal-backdrop')) {
      assertExists(this.parent).close();
    }
  }

  onkeyupdown(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.key === 'Escape' && e.type !== 'keyup') {
      assertExists(this.parent).close();
    }
  }
}


// This is deliberately NOT a Mithril component. We want to manage the lifetime
// independently (outside of Mithril), so we can render from outside the current
// vdom sub-tree. ModalContainer instances should be singletons / globals.
export class ModalContainer {
  private attrs?: ModalDefinition;
  private generation = 1; // Start with a generation > `closeGeneration`.
  private closeGeneration = 0;

  // This is the mithril component that is exposed to the embedder (e.g. see
  // pages.ts). The caller is supposed to hyperscript this while building the
  // vdom tree that should host the modal dialog.
  readonly mithrilComponent = {
    container: this,
    view:
        function() {
          const thiz = this.container;
          const attrs = thiz.attrs;
          if (attrs === undefined) {
            return null;
          }
          return [m(Modal, {
            ...attrs,
            onClose: () => {
              // Remember the fact that the dialog was dismissed, in case the
              // whole ModalContainer gets instantiated from a different page
              // (which would cause the Modal to be destroyed and recreated).
              thiz.closeGeneration = thiz.generation;
              if (thiz.attrs?.onClose !== undefined) {
                thiz.attrs.onClose();
                globals.rafScheduler.scheduleFullRedraw();
              }
            },
            close: thiz.closeGeneration === thiz.generation ? true :
                                                              attrs.close,
            key: thiz.generation,
          })];
        },
  };

  // This should be called to show a new modal dialog. The modal dialog will
  // be shown the next time something calls render() in a Mithril draw pass.
  // This enforces the creation of a new dialog.
  createNew(attrs: ModalDefinition) {
    this.generation++;
    this.updateVdom(attrs);
  }

  // Updates the current dialog or creates a new one if not existing. If a
  // dialog exists already, this will update the DOM of the existing dialog.
  // This should be called in at view() time by a nested Mithril component which
  // wants to display a modal dialog (but wants it to render outside).
  updateVdom(attrs: ModalDefinition) {
    this.attrs = attrs;
  }

  close() {
    this.closeGeneration = this.generation;
    globals.rafScheduler.scheduleFullRedraw();
  }
}

// This is the default instance used for full-screen modal dialogs.
// page.ts calls `m(fullscreenModalContainer.mithrilComponent)` in its view().
export const fullscreenModalContainer = new ModalContainer();


export async function showModal(attrs: ModalDefinition): Promise<void> {
  // When using showModal, the caller cannot pass an onClose promise. It should
  // use the returned promised instead. onClose is only for clients using the
  // Mithril component directly.
  assertTrue(attrs.onClose === undefined);
  const promise = defer<void>();
  fullscreenModalContainer.createNew({
    ...attrs,
    onClose: () => promise.resolve(),
  });
  globals.rafScheduler.scheduleFullRedraw();
  return promise;
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// A keyboard layout map that converts key codes to their equivalent glyphs for
// a given keyboard layout (e.g. 'KeyX' -> 'x').
export interface KeyboardLayoutMap {
  get(code: string): string|undefined;
}

export class NotSupportedError extends Error {}

// Fetch the user's keyboard layout map.
// This function is merely a wrapper around the keyboard API, which throws a
// specific error when used in browsers that don't support it.
export async function nativeKeyboardLayoutMap(): Promise<KeyboardLayoutMap> {
  // Browser's that don't support the Keyboard API won't have a keyboard
  // property in their window.navigator object.
  // Note: it seems this is also what Chrome does when the website is accessed
  // through an insecure connection.
  if ('keyboard' in window.navigator) {
    // Typescript's dom library doesn't know about this feature, so we must
    // take some liberties when it comes to relaxing types
    const keyboard = (window.navigator as any).keyboard;
    return await keyboard.getLayoutMap();
  } else {
    throw new NotSupportedError('Keyboard API is not supported');
  }
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import m from 'mithril';

import {Actions} from '../common/actions';
import {QueryResponse} from '../common/queries';
import {ColumnType, Row} from '../common/query_result';
import {fromNs} from '../common/time';
import {Anchor} from './anchor';

import {copyToClipboard, queryResponseToClipboard} from './clipboard';
import {downloadData} from './download_utils';
import {globals} from './globals';
import {Panel} from './panel';
import {Router} from './router';
import {
  focusHorizontalRange,
  verticalScrollToTrack,
} from './scroll_helper';
import {Button} from './widgets/button';

interface QueryTableRowAttrs {
  row: Row;
  columns: string[];
}

// Convert column value to number if it's a bigint or a number, otherwise throw
function colToNumber(colValue: ColumnType): number {
  if (typeof colValue === 'bigint') {
    return Number(colValue);
  } else if (typeof colValue === 'number') {
    return colValue;
  } else {
    throw Error('Value is not a number or a bigint');
  }
}

class QueryTableRow implements m.ClassComponent<QueryTableRowAttrs> {
  static columnsContainsSliceLocation(columns: string[]) {
    const requiredColumns = ['ts', 'dur', 'track_id'];
    for (const col of requiredColumns) {
      if (!columns.includes(col)) return false;
    }
    return true;
  }

  static rowOnClickHandler(
      event: Event, row: Row, nextTab: 'CurrentSelection'|'QueryResults') {
    // TODO(dproy): Make click handler work from analyze page.
    if (Router.parseUrl(window.location.href).page !== '/viewer') return;
    // If the click bubbles up to the pan and zoom handler that will deselect
    // the slice.
    event.stopPropagation();

    const sliceStart = fromNs(colToNumber(row.ts));
    // row.dur can be negative. Clamp to 1ns.
    const sliceDur = fromNs(Math.max(colToNumber(row.dur), 1));
    const sliceEnd = sliceStart + sliceDur;
    const trackId: number = colToNumber(row.track_id);
    const uiTrackId = globals.state.uiTrackIdByTraceTrackId[trackId];
    if (uiTrackId === undefined) return;
    verticalScrollToTrack(uiTrackId, true);
    // TODO(stevegolton) Soon this function will only accept Bigints
    focusHorizontalRange(sliceStart, sliceEnd);

    let sliceId: number|undefined;
    if (row.type?.toString().includes('slice')) {
      sliceId = colToNumber(row.id);
    } else {
      sliceId = colToNumber(row.slice_id);
    }
    if (sliceId !== undefined) {
      globals.makeSelection(
          Actions.selectChromeSlice(
              {id: sliceId, trackId: uiTrackId, table: 'slice'}),
          nextTab === 'QueryResults' ? globals.state.currentTab :
                                       'current_selection');
    }
  }

  view(vnode: m.Vnode<QueryTableRowAttrs>) {
    const cells = [];
    const {row, columns} = vnode.attrs;
    for (const col of columns) {
      const value = row[col];
      if (value instanceof Uint8Array) {
        cells.push(
            m('td',
              m(Anchor,
                {
                  onclick: () => downloadData(`${col}.blob`, value),
                },
                `Blob (${value.length} bytes)`)));
      } else if (typeof value === 'bigint') {
        cells.push(m('td', value.toString()));
      } else {
        cells.push(m('td', value));
      }
    }
    const containsSliceLocation =
        QueryTableRow.columnsContainsSliceLocation(columns);
    const maybeOnClick = containsSliceLocation ?
        (e: Event) => QueryTableRow.rowOnClickHandler(e, row, 'QueryResults') :
        null;
    const maybeOnDblClick = containsSliceLocation ?
        (e: Event) =>
            QueryTableRow.rowOnClickHandler(e, row, 'CurrentSelection') :
        null;
    return m(
        'tr',
        {
          'onclick': maybeOnClick,
          // TODO(altimin): Consider improving the logic here (e.g. delay?) to
          // account for cases when dblclick fires late.
          'ondblclick': maybeOnDblClick,
          'clickable': containsSliceLocation,
        },
        cells);
  }
}

interface QueryTableContentAttrs {
  resp: QueryResponse;
}

class QueryTableContent implements m.ClassComponent<QueryTableContentAttrs> {
  private previousResponse?: QueryResponse;

  onbeforeupdate(vnode: m.CVnode<QueryTableContentAttrs>) {
    return vnode.attrs.resp !== this.previousResponse;
  }

  view(vnode: m.CVnode<QueryTableContentAttrs>) {
    const resp = vnode.attrs.resp;
    this.previousResponse = resp;
    const cols = [];
    for (const col of resp.columns) {
      cols.push(m('td', col));
    }
    const tableHeader = m('tr', cols);

    const rows =
        resp.rows.map((row) => m(QueryTableRow, {row, columns: resp.columns}));

    if (resp.error) {
      return m('.query-error', `SQL error: ${resp.error}`);
    } else {
      return m(
          '.query-table-container.x-scrollable',
          m('table.query-table', m('thead', tableHeader), m('tbody', rows)));
    }
  }
}

interface QueryTableAttrs {
  query: string;
  onClose: () => void;
  resp?: QueryResponse;
  contextButtons?: m.Child[];
}

export class QueryTable extends Panel<QueryTableAttrs> {
  view(vnode: m.CVnode<QueryTableAttrs>) {
    const resp = vnode.attrs.resp;

    const header: m.Child[] = [
      m('span',
        resp ? `Query result - ${Math.round(resp.durationMs)} ms` :
               `Query - running`),
      m('span.code.text-select', vnode.attrs.query),
      m('span.spacer'),
      ...(vnode.attrs.contextButtons ?? []),
      m(Button, {
        label: 'Copy query',
        minimal: true,
        onclick: () => {
          copyToClipboard(vnode.attrs.query);
        },
      }),
    ];
    if (resp) {
      if (resp.error === undefined) {
        header.push(m(Button, {
          label: 'Copy result (.tsv)',
          minimal: true,
          onclick: () => {
            queryResponseToClipboard(resp);
          },
        }));
      }
    }
    header.push(m(Button, {
      label: 'Close',
      minimal: true,
      onclick: () => vnode.attrs.onClose(),
    }));

    const headers = [m('header.overview', ...header)];

    if (resp === undefined) {
      return m('div', ...headers);
    }

    if (resp.statementWithOutputCount > 1) {
      headers.push(
          m('header.overview',
            `${resp.statementWithOutputCount} out of ${resp.statementCount} ` +
                `statements returned a result. Only the results for the last ` +
                `statement are displayed in the table below.`));
    }

    return m('div', ...headers, m(QueryTableContent, {resp}));
  }

  renderCanvas() {}
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {searchSegment} from '../base/binary_search';
import {cropText} from '../common/canvas_utils';

import {CallsiteInfo} from '../common/state';

interface Node {
  width: number;
  x: number;
  nextXForChildren: number;
  size: number;
}

interface CallsiteInfoWidth {
  callsite: CallsiteInfo;
  width: number;
}

// Height of one 'row' on the flame chart including 1px of whitespace
// below the box.
const NODE_HEIGHT = 18;

export const FLAMEGRAPH_HOVERED_COLOR = 'hsl(224, 45%, 55%)';

export function findRootSize(data: CallsiteInfo[]) {
  let totalSize = 0;
  let i = 0;
  while (i < data.length && data[i].depth === 0) {
    totalSize += data[i].totalSize;
    i++;
  }
  return totalSize;
}

export interface NodeRendering {
  totalSize?: string;
  selfSize?: string;
}

export class Flamegraph {
  private nodeRendering: NodeRendering = {};
  private flamegraphData: CallsiteInfo[];
  private highlightSomeNodes = false;
  private maxDepth = -1;
  private totalSize = -1;
  // Initialised on first draw() call
  private labelCharWidth = 0;
  private labelFontStyle = '12px Roboto Mono';
  private rolloverFontStyle = '12px Roboto Condensed';
  // Key for the map is depth followed by x coordinate - `depth;x`
  private graphData: Map<string, CallsiteInfoWidth> = new Map();
  private xStartsPerDepth: Map<number, number[]> = new Map();

  private hoveredX = -1;
  private hoveredY = -1;
  private hoveredCallsite?: CallsiteInfo;
  private clickedCallsite?: CallsiteInfo;

  private startingY = 0;

  constructor(flamegraphData: CallsiteInfo[]) {
    this.flamegraphData = flamegraphData;
    this.findMaxDepth();
  }

  private findMaxDepth() {
    this.maxDepth =
        Math.max(...this.flamegraphData.map((value) => value.depth));
  }

  // Instead of highlighting the interesting nodes, we actually want to
  // de-emphasize the non-highlighted nodes. Returns true if there
  // are any highlighted nodes in the flamegraph.
  private highlightingExists() {
    this.highlightSomeNodes = this.flamegraphData.some((e) => e.highlighted);
  }

  generateColor(name: string, isGreyedOut = false, highlighted: boolean):
      string {
    if (isGreyedOut) {
      return '#d9d9d9';
    }
    if (name === 'unknown' || name === 'root') {
      return '#c0c0c0';
    }
    let x = 0;
    for (let i = 0; i < name.length; i += 1) {
      x += name.charCodeAt(i) % 64;
    }
    x = x % 360;
    let l = '76';
    // Make non-highlighted node lighter.
    if (this.highlightSomeNodes && !highlighted) {
      l = '90';
    }
    return `hsl(${x}deg, 45%, ${l}%)`;
  }

  // Caller will have to call draw method after updating data to have updated
  // graph.
  updateDataIfChanged(
      nodeRendering: NodeRendering, flamegraphData: CallsiteInfo[],
      clickedCallsite?: CallsiteInfo) {
    this.nodeRendering = nodeRendering;
    this.clickedCallsite = clickedCallsite;
    if (this.flamegraphData === flamegraphData) {
      return;
    }
    this.flamegraphData = flamegraphData;
    this.clickedCallsite = clickedCallsite;
    this.findMaxDepth();
    this.highlightingExists();
    // Finding total size of roots.
    this.totalSize = findRootSize(flamegraphData);
  }

  draw(
      ctx: CanvasRenderingContext2D, width: number, height: number, x = 0,
      y = 0, unit = 'B') {
    if (this.flamegraphData === undefined) {
      return;
    }

    ctx.font = this.labelFontStyle;
    ctx.textBaseline = 'middle';
    if (this.labelCharWidth === 0) {
      this.labelCharWidth = ctx.measureText('_').width;
    }

    this.startingY = y;

    // For each node, we use this map to get information about it's parent
    // (total size of it, width and where it starts in graph) so we can
    // calculate it's own position in graph.
    const nodesMap = new Map<number, Node>();
    let currentY = y;
    nodesMap.set(-1, {width, nextXForChildren: x, size: this.totalSize, x});

    // Initialize data needed for click/hover behavior.
    this.graphData = new Map();
    this.xStartsPerDepth = new Map();

    // Draw root node.
    ctx.fillStyle = this.generateColor('root', false, false);
    ctx.fillRect(x, currentY, width, NODE_HEIGHT - 1);
    const text = cropText(
        `root: ${
            this.displaySize(
                this.totalSize, unit, unit === 'B' ? 1024 : 1000)}`,
        this.labelCharWidth,
        width - 2);
    ctx.fillStyle = 'black';
    ctx.fillText(text, x + 5, currentY + (NODE_HEIGHT - 1) / 2);
    currentY += NODE_HEIGHT;

    // Set style for borders.
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < this.flamegraphData.length; i++) {
      if (currentY > height) {
        break;
      }
      const value = this.flamegraphData[i];
      const parentNode = nodesMap.get(value.parentId);
      if (parentNode === undefined) {
        continue;
      }

      const isClicked = this.clickedCallsite !== undefined;
      const isFullWidth =
          isClicked && value.depth <= this.clickedCallsite!.depth;
      const isGreyedOut =
          isClicked && value.depth < this.clickedCallsite!.depth;

      const parent = value.parentId;
      const parentSize = parent === -1 ? this.totalSize : parentNode.size;
      // Calculate node's width based on its proportion in parent.
      const width =
          (isFullWidth ? 1 : value.totalSize / parentSize) * parentNode.width;

      const currentX = parentNode.nextXForChildren;
      currentY = y + NODE_HEIGHT * (value.depth + 1);

      // Draw node.
      const name = this.getCallsiteName(value);
      ctx.fillStyle = this.generateColor(name, isGreyedOut, value.highlighted);
      ctx.fillRect(currentX, currentY, width, NODE_HEIGHT - 1);

      // Set current node's data in map for children to use.
      nodesMap.set(value.id, {
        width,
        nextXForChildren: currentX,
        size: value.totalSize,
        x: currentX,
      });
      // Update next x coordinate in parent.
      nodesMap.set(value.parentId, {
        width: parentNode.width,
        nextXForChildren: currentX + width,
        size: parentNode.size,
        x: parentNode.x,
      });

      // Draw name.
      const labelPaddingPx = 5;
      const maxLabelWidth = width - labelPaddingPx * 2;
      let text = cropText(name, this.labelCharWidth, maxLabelWidth);
      // If cropped text and the original text are within 20% we keep the
      // original text and just squish it a bit.
      if (text.length * 1.2 > name.length) {
        text = name;
      }
      ctx.fillStyle = 'black';
      ctx.fillText(
          text,
          currentX + labelPaddingPx,
          currentY + (NODE_HEIGHT - 1) / 2,
          maxLabelWidth);

      // Draw border on the right of node.
      ctx.beginPath();
      ctx.moveTo(currentX + width, currentY);
      ctx.lineTo(currentX + width, currentY + NODE_HEIGHT);
      ctx.stroke();

      // Add this node for recognizing in click/hover.
      // Map graphData contains one callsite which is on that depth and X
      // start. Map xStartsPerDepth for each depth contains all X start
      // coordinates that callsites on that level have.
      this.graphData.set(
          `${value.depth};${currentX}`, {callsite: value, width});
      const xStarts = this.xStartsPerDepth.get(value.depth);
      if (xStarts === undefined) {
        this.xStartsPerDepth.set(value.depth, [currentX]);
      } else {
        xStarts.push(currentX);
      }
    }

    // Draw the tooltip.
    if (this.hoveredX > -1 && this.hoveredY > -1 && this.hoveredCallsite) {
      // Must set these before measureText below.
      ctx.font = this.rolloverFontStyle;
      ctx.textBaseline = 'top';

      // Size in px of the border around the text and the edge of the rollover
      // background.
      const paddingPx = 8;
      // Size in px of the x and y offset between the mouse and the top left
      // corner of the rollover box.
      const offsetPx = 4;

      const lines: string[] = [];

      let textWidth = this.addToTooltip(
          this.getCallsiteName(this.hoveredCallsite),
          width - paddingPx,
          ctx,
          lines);
      if (this.hoveredCallsite.location != null) {
        textWidth = Math.max(
            textWidth,
            this.addToTooltip(
                this.hoveredCallsite.location, width, ctx, lines));
      }
      textWidth = Math.max(
          textWidth,
          this.addToTooltip(this.hoveredCallsite.mapping, width, ctx, lines));

      if (this.nodeRendering.totalSize !== undefined) {
        const percentage =
            this.hoveredCallsite.totalSize / this.totalSize * 100;
        const totalSizeText = `${this.nodeRendering.totalSize}: ${
            this.displaySize(
                this.hoveredCallsite.totalSize,
                unit,
                unit === 'B' ? 1024 : 1000)} (${percentage.toFixed(2)}%)`;
        textWidth = Math.max(
            textWidth, this.addToTooltip(totalSizeText, width, ctx, lines));
      }

      if (this.nodeRendering.selfSize !== undefined &&
          this.hoveredCallsite.selfSize > 0) {
        const selfPercentage =
            this.hoveredCallsite.selfSize / this.totalSize * 100;
        const selfSizeText = `${this.nodeRendering.selfSize}: ${
            this.displaySize(
                this.hoveredCallsite.selfSize,
                unit,
                unit === 'B' ? 1024 : 1000)} (${selfPercentage.toFixed(2)}%)`;
        textWidth = Math.max(
            textWidth, this.addToTooltip(selfSizeText, width, ctx, lines));
      }

      // Compute a line height as the bounding box height + 50%:
      const heightSample = ctx.measureText(
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      const lineHeight =
          Math.round(heightSample.actualBoundingBoxDescent * 1.5);

      const rectWidth = textWidth + 2 * paddingPx;
      const rectHeight = lineHeight * lines.length + 2 * paddingPx;

      let rectXStart = this.hoveredX + offsetPx;
      let rectYStart = this.hoveredY + offsetPx;

      if (rectXStart + rectWidth > width) {
        rectXStart = width - rectWidth;
      }

      if (rectYStart + rectHeight > height) {
        rectYStart = height - rectHeight;
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(rectXStart, rectYStart, rectWidth, rectHeight);
      ctx.fillStyle = 'hsl(200, 50%, 40%)';
      ctx.textAlign = 'left';
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        ctx.fillText(
            line,
            rectXStart + paddingPx,
            rectYStart + paddingPx + i * lineHeight);
      }
    }
  }

  private addToTooltip(
      text: string, width: number, ctx: CanvasRenderingContext2D,
      lines: string[]): number {
    const lineSplitter: LineSplitter =
        splitIfTooBig(text, width, ctx.measureText(text).width);
    lines.push(...lineSplitter.lines);
    return lineSplitter.lineWidth;
  }

  private getCallsiteName(value: CallsiteInfo): string {
    return value.name === undefined || value.name === '' ? 'unknown' :
                                                           value.name;
  }

  private displaySize(totalSize: number, unit: string, step = 1024): string {
    if (unit === '') return totalSize.toLocaleString();
    if (totalSize === 0) return `0 ${unit}`;
    const units = [
      ['', 1],
      ['K', step],
      ['M', Math.pow(step, 2)],
      ['G', Math.pow(step, 3)],
    ];
    let unitsIndex = Math.trunc(Math.log(totalSize) / Math.log(step));
    unitsIndex = unitsIndex > units.length - 1 ? units.length - 1 : unitsIndex;
    const result = totalSize / +units[unitsIndex][1];
    const resultString = totalSize % +units[unitsIndex][1] === 0 ?
        result.toString() :
        result.toFixed(2);
    return `${resultString} ${units[unitsIndex][0]}${unit}`;
  }

  onMouseMove({x, y}: {x: number, y: number}) {
    this.hoveredX = x;
    this.hoveredY = y;
    this.hoveredCallsite = this.findSelectedCallsite(x, y);
    const isCallsiteSelected = this.hoveredCallsite !== undefined;
    if (!isCallsiteSelected) {
      this.onMouseOut();
    }
    return isCallsiteSelected;
  }

  onMouseOut() {
    this.hoveredX = -1;
    this.hoveredY = -1;
    this.hoveredCallsite = undefined;
  }

  onMouseClick({x, y}: {x: number, y: number}): CallsiteInfo|undefined {
    const clickedCallsite = this.findSelectedCallsite(x, y);
    // TODO(b/148596659): Allow to expand [merged] callsites. Currently,
    // this expands to the biggest of the nodes that were merged, which
    // is confusing, so we disallow clicking on them.
    if (clickedCallsite === undefined || clickedCallsite.merged) {
      return undefined;
    }
    return clickedCallsite;
  }

  private findSelectedCallsite(x: number, y: number): CallsiteInfo|undefined {
    const depth =
        Math.trunc((y - this.startingY) / NODE_HEIGHT) - 1;  // at 0 is root
    if (depth >= 0 && this.xStartsPerDepth.has(depth)) {
      const startX = this.searchSmallest(this.xStartsPerDepth.get(depth)!, x);
      const result = this.graphData.get(`${depth};${startX}`);
      if (result !== undefined) {
        const width = result.width;
        return startX + width >= x ? result.callsite : undefined;
      }
    }
    return undefined;
  }

  searchSmallest(haystack: number[], needle: number): number {
    haystack = haystack.sort((n1, n2) => n1 - n2);
    const [left] = searchSegment(haystack, needle);
    return left === -1 ? -1 : haystack[left];
  }

  getHeight(): number {
    return this.flamegraphData.length === 0 ? 0 :
                                              (this.maxDepth + 2) * NODE_HEIGHT;
  }
}

export interface LineSplitter {
  lineWidth: number;
  lines: string[];
}

export function splitIfTooBig(
    line: string, width: number, lineWidth: number): LineSplitter {
  if (line === '') return {lineWidth, lines: []};
  const lines: string[] = [];
  const charWidth = lineWidth / line.length;
  const maxWidth = width - 32;
  const maxLineLen = Math.trunc(maxWidth / charWidth);
  while (line.length > 0) {
    lines.push(line.slice(0, maxLineLen));
    line = line.slice(maxLineLen);
  }
  lineWidth = Math.min(maxLineLen * charWidth, lineWidth);
  return {lineWidth, lines};
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Probe, ProbeAttrs} from '../record_widgets';
import {RecordingSectionAttrs} from './recording_sections';

export class GpuSettings implements m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    return m(
        `.record-section${attrs.cssClass}`,
        m(Probe, {
          title: 'GPU frequency',
          img: 'rec_cpu_freq.png',
          descr: 'Records gpu frequency via ftrace',
          setEnabled: (cfg, val) => cfg.gpuFreq = val,
          isEnabled: (cfg) => cfg.gpuFreq,
        } as ProbeAttrs),
        m(Probe, {
          title: 'GPU memory',
          img: 'rec_gpu_mem_total.png',
          descr:
              `Allows to track per process and global total GPU memory usages.
                (Available on recent Android 12+ kernels)`,
          setEnabled: (cfg, val) => cfg.gpuMemTotal = val,
          isEnabled: (cfg) => cfg.gpuMemTotal,
        } as ProbeAttrs));
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Probe, ProbeAttrs, Slider, SliderAttrs} from '../record_widgets';
import {POLL_INTERVAL_MS, RecordingSectionAttrs} from './recording_sections';

export class CpuSettings implements m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    return m(
        `.record-section${attrs.cssClass}`,
        m(Probe,
          {
            title: 'Coarse CPU usage counter',
            img: 'rec_cpu_coarse.png',
            descr: `Lightweight polling of CPU usage counters via /proc/stat.
                    Allows to periodically monitor CPU usage.`,
            setEnabled: (cfg, val) => cfg.cpuCoarse = val,
            isEnabled: (cfg) => cfg.cpuCoarse,
          } as ProbeAttrs,
          m(Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: POLL_INTERVAL_MS,
            unit: 'ms',
            set: (cfg, val) => cfg.cpuCoarsePollMs = val,
            get: (cfg) => cfg.cpuCoarsePollMs,
          } as SliderAttrs)),
        m(Probe, {
          title: 'Scheduling details',
          img: 'rec_cpu_fine.png',
          descr: 'Enables high-detailed tracking of scheduling events',
          setEnabled: (cfg, val) => cfg.cpuSched = val,
          isEnabled: (cfg) => cfg.cpuSched,
        } as ProbeAttrs),
        m(Probe,
          {
            title: 'CPU frequency and idle states',
            img: 'rec_cpu_freq.png',
            descr:
                'Records cpu frequency and idle state changes via ftrace and sysfs',
            setEnabled: (cfg, val) => cfg.cpuFreq = val,
            isEnabled: (cfg) => cfg.cpuFreq,
          } as ProbeAttrs,
          m(Slider, {
            title: 'Sysfs poll interval',
            cssClass: '.thin',
            values: POLL_INTERVAL_MS,
            unit: 'ms',
            set: (cfg, val) => cfg.cpuFreqPollMs = val,
            get: (cfg) => cfg.cpuFreqPollMs,
          } as SliderAttrs)),
        m(Probe, {
          title: 'Syscalls',
          img: 'rec_syscalls.png',
          descr: `Tracks the enter and exit of all syscalls. On Android
                requires a userdebug or eng build.`,
          setEnabled: (cfg, val) => cfg.cpuSyscall = val,
          isEnabled: (cfg) => cfg.cpuSyscall,
        } as ProbeAttrs));
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {
  Dropdown,
  DropdownAttrs,
  Probe,
  ProbeAttrs,
  Slider,
  SliderAttrs,
  Textarea,
  TextareaAttrs,
  Toggle,
  ToggleAttrs,
} from '../record_widgets';
import {RecordingSectionAttrs} from './recording_sections';

const FTRACE_CATEGORIES = new Map<string, string>();
FTRACE_CATEGORIES.set('binder/*', 'binder');
FTRACE_CATEGORIES.set('block/*', 'block');
FTRACE_CATEGORIES.set('clk/*', 'clk');
FTRACE_CATEGORIES.set('ext4/*', 'ext4');
FTRACE_CATEGORIES.set('f2fs/*', 'f2fs');
FTRACE_CATEGORIES.set('i2c/*', 'i2c');
FTRACE_CATEGORIES.set('irq/*', 'irq');
FTRACE_CATEGORIES.set('kmem/*', 'kmem');
FTRACE_CATEGORIES.set('memory_bus/*', 'memory_bus');
FTRACE_CATEGORIES.set('mmc/*', 'mmc');
FTRACE_CATEGORIES.set('oom/*', 'oom');
FTRACE_CATEGORIES.set('power/*', 'power');
FTRACE_CATEGORIES.set('regulator/*', 'regulator');
FTRACE_CATEGORIES.set('sched/*', 'sched');
FTRACE_CATEGORIES.set('sync/*', 'sync');
FTRACE_CATEGORIES.set('task/*', 'task');
FTRACE_CATEGORIES.set('task/*', 'task');
FTRACE_CATEGORIES.set('vmscan/*', 'vmscan');
FTRACE_CATEGORIES.set('fastrpc/*', 'fastrpc');

export class AdvancedSettings implements
    m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    return m(
        `.record-section${attrs.cssClass}`,
        m(Probe,
          {
            title: 'Advanced ftrace config',
            img: 'rec_ftrace.png',
            descr:
                `Enable individual events and tune the kernel-tracing (ftrace)
                  module. The events enabled here are in addition to those from
                  enabled by other probes.`,
            setEnabled: (cfg, val) => cfg.ftrace = val,
            isEnabled: (cfg) => cfg.ftrace,
          } as ProbeAttrs,
          m(Toggle, {
            title: 'Resolve kernel symbols',
            cssClass: '.thin',
            descr: `Enables lookup via /proc/kallsyms for workqueue,
              sched_blocked_reason and other events
              (userdebug/eng builds only).`,
            setEnabled: (cfg, val) => cfg.symbolizeKsyms = val,
            isEnabled: (cfg) => cfg.symbolizeKsyms,
          } as ToggleAttrs),
          m(Slider, {
            title: 'Buf size',
            cssClass: '.thin',
            values: [0, 512, 1024, 2 * 1024, 4 * 1024, 16 * 1024, 32 * 1024],
            unit: 'KB',
            zeroIsDefault: true,
            set: (cfg, val) => cfg.ftraceBufferSizeKb = val,
            get: (cfg) => cfg.ftraceBufferSizeKb,
          } as SliderAttrs),
          m(Slider, {
            title: 'Drain rate',
            cssClass: '.thin',
            values: [0, 100, 250, 500, 1000, 2500, 5000],
            unit: 'ms',
            zeroIsDefault: true,
            set: (cfg, val) => cfg.ftraceDrainPeriodMs = val,
            get: (cfg) => cfg.ftraceDrainPeriodMs,
          } as SliderAttrs),
          m(Dropdown, {
            title: 'Event groups',
            cssClass: '.multicolumn.ftrace-events',
            options: FTRACE_CATEGORIES,
            set: (cfg, val) => cfg.ftraceEvents = val,
            get: (cfg) => cfg.ftraceEvents,
          } as DropdownAttrs),
          m(Textarea, {
            placeholder: 'Add extra events, one per line, e.g.:\n' +
                'sched/sched_switch\n' +
                'kmem/*',
            set: (cfg, val) => cfg.ftraceExtraEvents = val,
            get: (cfg) => cfg.ftraceExtraEvents,
          } as TextareaAttrs)));
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export const FORCE_RESET_MESSAGE = 'Force reset the USB interface';
export const DEFAULT_WEBSOCKET_URL = 'ws://127.0.0.1:8037';
export const ADB_ENDPOINT = '/adb';
export const TRACED_ENDPOINT = '/traced';
export const DEFAULT_ADB_WEBSOCKET_URL = DEFAULT_WEBSOCKET_URL + ADB_ENDPOINT;
export const DEFAULT_TRACED_WEBSOCKET_URL =
    DEFAULT_WEBSOCKET_URL + TRACED_ENDPOINT;
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {DataSource} from '../../common/recordingV2/recording_interfaces_v2';

export interface RecordingSectionAttrs {
  dataSources: DataSource[];
  cssClass: string;
}

export const POLL_INTERVAL_MS = [250, 500, 1000, 2500, 5000, 30000, 60000];
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {DataSourceDescriptor} from '../../common/protos';
import {globals} from '../globals';
import {
  Dropdown,
  DropdownAttrs,
  Probe,
  ProbeAttrs,
  Slider,
  SliderAttrs,
  Textarea,
  TextareaAttrs,
  Toggle,
  ToggleAttrs,
} from '../record_widgets';

import {RecordingSectionAttrs} from './recording_sections';

const LOG_BUFFERS = new Map<string, string>();
LOG_BUFFERS.set('LID_CRASH', 'Crash');
LOG_BUFFERS.set('LID_DEFAULT', 'Main');
LOG_BUFFERS.set('LID_EVENTS', 'Binary events');
LOG_BUFFERS.set('LID_KERNEL', 'Kernel');
LOG_BUFFERS.set('LID_RADIO', 'Radio');
LOG_BUFFERS.set('LID_SECURITY', 'Security');
LOG_BUFFERS.set('LID_STATS', 'Stats');
LOG_BUFFERS.set('LID_SYSTEM', 'System');

const DEFAULT_ATRACE_CATEGORIES = new Map<string, string>();
DEFAULT_ATRACE_CATEGORIES.set('adb', 'ADB');
DEFAULT_ATRACE_CATEGORIES.set('aidl', 'AIDL calls');
DEFAULT_ATRACE_CATEGORIES.set('am', 'Activity Manager');
DEFAULT_ATRACE_CATEGORIES.set('audio', 'Audio');
DEFAULT_ATRACE_CATEGORIES.set('binder_driver', 'Binder Kernel driver');
DEFAULT_ATRACE_CATEGORIES.set('binder_lock', 'Binder global lock trace');
DEFAULT_ATRACE_CATEGORIES.set('bionic', 'Bionic C library');
DEFAULT_ATRACE_CATEGORIES.set('camera', 'Camera');
DEFAULT_ATRACE_CATEGORIES.set('dalvik', 'ART & Dalvik');
DEFAULT_ATRACE_CATEGORIES.set('database', 'Database');
DEFAULT_ATRACE_CATEGORIES.set('gfx', 'Graphics');
DEFAULT_ATRACE_CATEGORIES.set('hal', 'Hardware Modules');
DEFAULT_ATRACE_CATEGORIES.set('input', 'Input');
DEFAULT_ATRACE_CATEGORIES.set('network', 'Network');
DEFAULT_ATRACE_CATEGORIES.set('nnapi', 'Neural Network API');
DEFAULT_ATRACE_CATEGORIES.set('pm', 'Package Manager');
DEFAULT_ATRACE_CATEGORIES.set('power', 'Power Management');
DEFAULT_ATRACE_CATEGORIES.set('res', 'Resource Loading');
DEFAULT_ATRACE_CATEGORIES.set('rro', 'Resource Overlay');
DEFAULT_ATRACE_CATEGORIES.set('rs', 'RenderScript');
DEFAULT_ATRACE_CATEGORIES.set('sm', 'Sync Manager');
DEFAULT_ATRACE_CATEGORIES.set('ss', 'System Server');
DEFAULT_ATRACE_CATEGORIES.set('vibrator', 'Vibrator');
DEFAULT_ATRACE_CATEGORIES.set('video', 'Video');
DEFAULT_ATRACE_CATEGORIES.set('view', 'View System');
DEFAULT_ATRACE_CATEGORIES.set('webview', 'WebView');
DEFAULT_ATRACE_CATEGORIES.set('wm', 'Window Manager');

function isDataSourceDescriptor(descriptor: unknown):
    descriptor is DataSourceDescriptor {
  if (descriptor instanceof Object) {
    return (descriptor as DataSourceDescriptor).name !== undefined;
  }
  return false;
}

class AtraceAppsList implements m.ClassComponent {
  view() {
    if (globals.state.recordConfig.allAtraceApps) {
      return m('div');
    }

    return m(Textarea, {
      placeholder: 'Apps to profile, one per line, e.g.:\n' +
          'com.android.phone\n' +
          'lmkd\n' +
          'com.android.nfc',
      cssClass: '.atrace-apps-list',
      set: (cfg, val) => cfg.atraceApps = val,
      get: (cfg) => cfg.atraceApps,
    } as TextareaAttrs);
  }
}

export class AndroidSettings implements
    m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    let atraceCategories = DEFAULT_ATRACE_CATEGORIES;
    for (const dataSource of attrs.dataSources) {
      if (dataSource.name !== 'linux.ftrace' ||
          !isDataSourceDescriptor(dataSource.descriptor)) {
        continue;
      }
      const atraces = dataSource.descriptor.ftraceDescriptor?.atraceCategories;
      if (!atraces || atraces.length === 0) {
        break;
      }

      atraceCategories = new Map<string, string>();
      for (const atrace of atraces) {
        if (atrace.name) {
          atraceCategories.set(atrace.name, atrace.description || '');
        }
      }
    }

    return m(
        `.record-section${attrs.cssClass}`,
        m(Probe,
          {
            title: 'Atrace userspace annotations',
            img: 'rec_atrace.png',
            descr: `Enables C++ / Java codebase annotations (ATRACE_BEGIN() /
                      os.Trace())`,
            setEnabled: (cfg, val) => cfg.atrace = val,
            isEnabled: (cfg) => cfg.atrace,
          } as ProbeAttrs,
          m(Dropdown, {
            title: 'Categories',
            cssClass: '.multicolumn.atrace-categories',
            options: atraceCategories,
            set: (cfg, val) => cfg.atraceCats = val,
            get: (cfg) => cfg.atraceCats,
          } as DropdownAttrs),
          m(Toggle, {
            title: 'Record events from all Android apps and services',
            descr: '',
            setEnabled: (cfg, val) => cfg.allAtraceApps = val,
            isEnabled: (cfg) => cfg.allAtraceApps,
          } as ToggleAttrs),
          m(AtraceAppsList)),
        m(Probe,
          {
            title: 'Event log (logcat)',
            img: 'rec_logcat.png',
            descr: `Streams the event log into the trace. If no buffer filter is
                      specified, all buffers are selected.`,
            setEnabled: (cfg, val) => cfg.androidLogs = val,
            isEnabled: (cfg) => cfg.androidLogs,
          } as ProbeAttrs,
          m(Dropdown, {
            title: 'Buffers',
            cssClass: '.multicolumn',
            options: LOG_BUFFERS,
            set: (cfg, val) => cfg.androidLogBuffers = val,
            get: (cfg) => cfg.androidLogBuffers,
          } as DropdownAttrs)),
        m(Probe, {
          title: 'Frame timeline',
          img: 'rec_frame_timeline.png',
          descr: `Records expected/actual frame timings from surface_flinger.
                      Requires Android 12 (S) or above.`,
          setEnabled: (cfg, val) => cfg.androidFrameTimeline = val,
          isEnabled: (cfg) => cfg.androidFrameTimeline,
        } as ProbeAttrs),
        m(Probe, {
          title: 'Game intervention list',
          img: '',
          descr: `List game modes and interventions.
                    Requires Android 13 (T) or above.`,
          setEnabled: (cfg, val) => cfg.androidGameInterventionList = val,
          isEnabled: (cfg) => cfg.androidGameInterventionList,
        } as ProbeAttrs),
        m(Probe,
          {
            title: 'Network Tracing',
            img: '',
            descr: `Records detailed information on network packets.
                      Requires Android 14 (U) or above.`,
            setEnabled: (cfg, val) => cfg.androidNetworkTracing = val,
            isEnabled: (cfg) => cfg.androidNetworkTracing,
          } as ProbeAttrs,
          m(Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: [100, 250, 500, 1000, 2500],
            unit: 'ms',
            set: (cfg, val) => cfg.androidNetworkTracingPollMs = val,
            get: (cfg) => cfg.androidNetworkTracingPollMs,
          } as SliderAttrs)));
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {
  RecordingTargetV2,
  TargetFactory,
} from '../../common/recordingV2/recording_interfaces_v2';
import {
  RecordingPageController,
} from '../../common/recordingV2/recording_page_controller';
import {fullscreenModalContainer} from '../modal';

interface RecordingMultipleChoiceAttrs {
  targetFactories: TargetFactory[];
  // Reference to the controller which maintains the state of the recording
  // page.
  controller: RecordingPageController;
}

export class RecordingMultipleChoice implements
    m.ClassComponent<RecordingMultipleChoiceAttrs> {
  private selectedIndex: number = -1;

  targetSelection(
      targets: RecordingTargetV2[],
      controller: RecordingPageController): m.Vnode|undefined {
    const targetInfo = controller.getTargetInfo();
    const targetNames = [];
    this.selectedIndex = -1;
    for (let i = 0; i < targets.length; i++) {
      const targetName = targets[i].getInfo().name;
      targetNames.push(m('option', targetName));
      if (targetInfo && targetName === targetInfo.name) {
        this.selectedIndex = i;
      }
    }

    const selectedIndex = this.selectedIndex;
    return m(
        'label',
        m('select',
          {
            selectedIndex,
            onchange: (e: Event) => {
              controller.onTargetSelection(
                  (e.target as HTMLSelectElement).value);
            },
            onupdate: (select) => {
              // Work around mithril bug
              // (https://github.com/MithrilJS/mithril.js/issues/2107): We
              // may update the select's options while also changing the
              // selectedIndex at the same time. The update of selectedIndex
              // may be applied before the new options are added to the
              // select element. Because the new selectedIndex may be
              // outside of the select's options at that time, we have to
              // reselect the correct index here after any new children were
              // added.
              (select.dom as HTMLSelectElement).selectedIndex =
                  this.selectedIndex;
            },
            ...{size: targets.length, multiple: 'multiple'},
          },
          ...targetNames),
    );
  }

  view({attrs}: m.CVnode<RecordingMultipleChoiceAttrs>): m.Vnode[]|undefined {
    const controller = attrs.controller;
    if (!controller.shouldShowTargetSelection()) {
      return undefined;
    }
    const targets: RecordingTargetV2[] = [];
    for (const targetFactory of attrs.targetFactories) {
      for (const target of targetFactory.listTargets()) {
        targets.push(target);
      }
    }
    if (targets.length === 0) {
      return undefined;
    }

    return [
      m('text', 'Select target:'),
      m('.record-modal-command',
        this.targetSelection(targets, controller),
        m('button.record-modal-button-high',
          {
            disabled: this.selectedIndex === -1,
            onclick: () => {
              fullscreenModalContainer.close();
              controller.onStartRecordingPressed();
            },
          },
          'Connect')),
    ];
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {showModal} from '../modal';
import {FORCE_RESET_MESSAGE} from './recording_ui_utils';

export function couldNotClaimInterface(
    onReset: () => Promise<void>, onCancel: () => void) {
  let hasPressedAButton = false;
  showModal({
    title: 'Could not claim the USB interface',
    content: m(
        'div',
        m('text',
          'This can happen if you have the Android Debug Bridge ' +
              '(adb) running on your workstation or any other tool which is ' +
              'taking exclusive access of the USB interface.'),
        m('br'),
        m('br'),
        m('text.small-font',
          'Resetting will cause the ADB server to disconnect and ' +
              'will try to reassign the interface to the current browser.'),
        ),
    buttons: [
      {
        text: FORCE_RESET_MESSAGE,
        primary: true,
        id: 'force_USB_interface',
        action: () => {
          hasPressedAButton = true;
          onReset();
        },
      },
      {
        text: 'Cancel',
        primary: false,
        id: 'cancel_USB_interface',
        action: () => {
          hasPressedAButton = true;
          onCancel();
        },
      },
    ],
  }).then(() => {
    // If the user has clicked away from the modal, we interpret that as a
    // 'Cancel'.
    if (!hasPressedAButton) {
      onCancel();
    }
  });
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {
  RecordingPageController,
} from '../../common/recordingV2/recording_page_controller';
import {EXTENSION_URL} from '../../common/recordingV2/recording_utils';
import {
  CHROME_TARGET_FACTORY,
  ChromeTargetFactory,
} from '../../common/recordingV2/target_factories/chrome_target_factory';
import {
  targetFactoryRegistry,
} from '../../common/recordingV2/target_factory_registry';
import {
  WebsocketMenuController,
} from '../../common/recordingV2/websocket_menu_controller';
import {fullscreenModalContainer, ModalDefinition} from '../modal';
import {CodeSnippet} from '../record_widgets';

import {RecordingMultipleChoice} from './recording_multiple_choice';

const RUN_WEBSOCKET_CMD = '# Get tracebox\n' +
    'curl -LO https://get.perfetto.dev/tracebox\n' +
    'chmod +x ./tracebox\n' +
    '# Option A - trace android devices\n' +
    'adb start-server\n' +
    '# Option B - trace the host OS\n' +
    './tracebox traced --background\n' +
    './tracebox traced_probes --background\n' +
    '# Start the websocket server\n' +
    './tracebox websocket_bridge\n';

export function addNewTarget(recordingPageController: RecordingPageController):
    ModalDefinition {
  const components = [];
  components.push(m('text', 'Select platform:'));

  components.push(assembleWebusbSection(recordingPageController));

  components.push(m('.line'));
  components.push(assembleWebsocketSection(recordingPageController));

  components.push(m('.line'));
  components.push(assembleChromeSection(recordingPageController));

  return {
    title: 'Add new recording target',
    content: m('.record-modal', components),
  };
}

function assembleWebusbSection(
    recordingPageController: RecordingPageController): m.Vnode {
  return m(
      '.record-modal-section',
      m('.logo-wrapping', m('i.material-icons', 'usb')),
      m('.record-modal-description',
        m('h3', 'Android device over WebUSB'),
        m('text',
          'Android developers: this option cannot co-operate ' +
              'with the adb host on your machine. Only one entity between ' +
              'the browser and adb can control the USB endpoint. If adb is ' +
              'running, you will be prompted to re-assign the device to the ' +
              'browser. Use the websocket option below to use both ' +
              'simultaneously.'),
        m('.record-modal-button',
          {
            onclick: () => {
              fullscreenModalContainer.close();
              recordingPageController.addAndroidDevice();
            },
          },
          'Connect new WebUSB driver')));
}

function assembleWebsocketSection(
    recordingPageController: RecordingPageController): m.Vnode {
  const websocketComponents = [];
  websocketComponents.push(
      m('h3', 'Android / Linux / MacOS device via Websocket'));
  websocketComponents.push(
      m('text',
        'This option assumes that the adb server is already ' +
            'running on your machine.'),
      m('.record-modal-command', m(CodeSnippet, {
          text: RUN_WEBSOCKET_CMD,
        })));

  websocketComponents.push(m(
      '.record-modal-command',
      m('text', 'Websocket bridge address: '),
      m('input[type=text]', {
        value: websocketMenuController.getPath(),
        oninput() {
          websocketMenuController.setPath(this.value);
        },
      }),
      m('.record-modal-logo-button',
        {
          onclick: () => websocketMenuController.onPathChange(),
        },
        m('i.material-icons', 'refresh')),
      ));

  websocketComponents.push(m(RecordingMultipleChoice, {
    controller: recordingPageController,
    targetFactories: websocketMenuController.getTargetFactories(),
  }));

  return m(
      '.record-modal-section',
      m('.logo-wrapping', m('i.material-icons', 'settings_ethernet')),
      m('.record-modal-description', ...websocketComponents));
}

function assembleChromeSection(
    recordingPageController: RecordingPageController): m.Vnode|undefined {
  if (!targetFactoryRegistry.has(CHROME_TARGET_FACTORY)) {
    return undefined;
  }

  const chromeComponents = [];
  chromeComponents.push(m('h3', 'Chrome Browser instance or ChromeOS device'));

  const chromeFactory: ChromeTargetFactory =
      targetFactoryRegistry.get(CHROME_TARGET_FACTORY) as ChromeTargetFactory;

  if (!chromeFactory.isExtensionInstalled) {
    chromeComponents.push(
        m('text',
          'Install the extension ',
          m('a', {href: EXTENSION_URL, target: '_blank'}, 'from this link '),
          'and refresh the page.'));
  } else {
    chromeComponents.push(m(RecordingMultipleChoice, {
      controller: recordingPageController,
      targetFactories: [chromeFactory],
    }));
  }

  return m(
      '.record-modal-section',
      m('.logo-wrapping', m('i.material-icons', 'web')),
      m('.record-modal-description', ...chromeComponents));
}

const websocketMenuController = new WebsocketMenuController();
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {MeminfoCounters, VmstatCounters} from '../../common/protos';
import {globals} from '../globals';
import {
  Dropdown,
  DropdownAttrs,
  Probe,
  ProbeAttrs,
  Slider,
  SliderAttrs,
  Textarea,
  TextareaAttrs,
  Toggle,
  ToggleAttrs,
} from '../record_widgets';

import {POLL_INTERVAL_MS, RecordingSectionAttrs} from './recording_sections';

class HeapSettings implements m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    const valuesForMS = [
      0,
      1000,
      10 * 1000,
      30 * 1000,
      60 * 1000,
      5 * 60 * 1000,
      10 * 60 * 1000,
      30 * 60 * 1000,
      60 * 60 * 1000,
    ];
    const valuesForShMemBuff = [
      0,
      512,
      1024,
      2 * 1024,
      4 * 1024,
      8 * 1024,
      16 * 1024,
      32 * 1024,
      64 * 1024,
      128 * 1024,
      256 * 1024,
      512 * 1024,
      1024 * 1024,
      64 * 1024 * 1024,
      128 * 1024 * 1024,
      256 * 1024 * 1024,
      512 * 1024 * 1024,
    ];

    return m(
        `.${attrs.cssClass}`,
        m(Textarea, {
          title: 'Names or pids of the processes to track (required)',
          docsLink:
              'https://perfetto.dev/docs/data-sources/native-heap-profiler#heapprofd-targets',
          placeholder: 'One per line, e.g.:\n' +
              'system_server\n' +
              'com.google.android.apps.photos\n' +
              '1503',
          set: (cfg, val) => cfg.hpProcesses = val,
          get: (cfg) => cfg.hpProcesses,
        } as TextareaAttrs),
        m(Slider, {
          title: 'Sampling interval',
          cssClass: '.thin',
          values: [
            /* eslint-disable no-multi-spaces */
            0,     1,     2,      4,      8,      16,      32,   64,
            128,   256,   512,    1024,   2048,   4096,    8192, 16384,
            32768, 65536, 131072, 262144, 524288, 1048576,
            /* eslint-enable no-multi-spaces */
          ],
          unit: 'B',
          min: 0,
          set: (cfg, val) => cfg.hpSamplingIntervalBytes = val,
          get: (cfg) => cfg.hpSamplingIntervalBytes,
        } as SliderAttrs),
        m(Slider, {
          title: 'Continuous dumps interval ',
          description: 'Time between following dumps (0 = disabled)',
          cssClass: '.thin',
          values: valuesForMS,
          unit: 'ms',
          min: 0,
          set: (cfg, val) => {
            cfg.hpContinuousDumpsInterval = val;
          },
          get: (cfg) => cfg.hpContinuousDumpsInterval,
        } as SliderAttrs),
        m(Slider, {
          title: 'Continuous dumps phase',
          description: 'Time before first dump',
          cssClass: `.thin${
              globals.state.recordConfig.hpContinuousDumpsInterval === 0 ?
                  '.greyed-out' :
                  ''}`,
          values: valuesForMS,
          unit: 'ms',
          min: 0,
          disabled: globals.state.recordConfig.hpContinuousDumpsInterval === 0,
          set: (cfg, val) => cfg.hpContinuousDumpsPhase = val,
          get: (cfg) => cfg.hpContinuousDumpsPhase,
        } as SliderAttrs),
        m(Slider, {
          title: `Shared memory buffer`,
          cssClass: '.thin',
          values: valuesForShMemBuff.filter(
              (value) => value === 0 || value >= 8192 && value % 4096 === 0),
          unit: 'B',
          min: 0,
          set: (cfg, val) => cfg.hpSharedMemoryBuffer = val,
          get: (cfg) => cfg.hpSharedMemoryBuffer,
        } as SliderAttrs),
        m(Toggle, {
          title: 'Block client',
          cssClass: '.thin',
          descr: `Slow down target application if profiler cannot keep up.`,
          setEnabled: (cfg, val) => cfg.hpBlockClient = val,
          isEnabled: (cfg) => cfg.hpBlockClient,
        } as ToggleAttrs),
        m(Toggle, {
          title: 'All custom allocators (Q+)',
          cssClass: '.thin',
          descr: `If the target application exposes custom allocators, also
sample from those.`,
          setEnabled: (cfg, val) => cfg.hpAllHeaps = val,
          isEnabled: (cfg) => cfg.hpAllHeaps,
        } as ToggleAttrs),
        // TODO(hjd): Add advanced options.
    );
  }
}

class JavaHeapDumpSettings implements m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    const valuesForMS = [
      0,
      1000,
      10 * 1000,
      30 * 1000,
      60 * 1000,
      5 * 60 * 1000,
      10 * 60 * 1000,
      30 * 60 * 1000,
      60 * 60 * 1000,
    ];

    return m(
        `.${attrs.cssClass}`,
        m(Textarea, {
          title: 'Names or pids of the processes to track (required)',
          placeholder: 'One per line, e.g.:\n' +
              'com.android.vending\n' +
              '1503',
          set: (cfg, val) => cfg.jpProcesses = val,
          get: (cfg) => cfg.jpProcesses,
        } as TextareaAttrs),
        m(Slider, {
          title: 'Continuous dumps interval ',
          description: 'Time between following dumps (0 = disabled)',
          cssClass: '.thin',
          values: valuesForMS,
          unit: 'ms',
          min: 0,
          set: (cfg, val) => {
            cfg.jpContinuousDumpsInterval = val;
          },
          get: (cfg) => cfg.jpContinuousDumpsInterval,
        } as SliderAttrs),
        m(Slider, {
          title: 'Continuous dumps phase',
          description: 'Time before first dump',
          cssClass: `.thin${
              globals.state.recordConfig.jpContinuousDumpsInterval === 0 ?
                  '.greyed-out' :
                  ''}`,
          values: valuesForMS,
          unit: 'ms',
          min: 0,
          disabled: globals.state.recordConfig.jpContinuousDumpsInterval === 0,
          set: (cfg, val) => cfg.jpContinuousDumpsPhase = val,
          get: (cfg) => cfg.jpContinuousDumpsPhase,
        } as SliderAttrs),
    );
  }
}

export class MemorySettings implements m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    const meminfoOpts = new Map<string, string>();
    for (const x in MeminfoCounters) {
      if (typeof MeminfoCounters[x] === 'number' &&
          !`${x}`.endsWith('_UNSPECIFIED')) {
        meminfoOpts.set(x, x.replace('MEMINFO_', '').toLowerCase());
      }
    }
    const vmstatOpts = new Map<string, string>();
    for (const x in VmstatCounters) {
      if (typeof VmstatCounters[x] === 'number' &&
          !`${x}`.endsWith('_UNSPECIFIED')) {
        vmstatOpts.set(x, x.replace('VMSTAT_', '').toLowerCase());
      }
    }
    return m(
        `.record-section${attrs.cssClass}`,
        m(Probe,
          {
            title: 'Native heap profiling',
            img: 'rec_native_heap_profiler.png',
            descr: `Track native heap allocations & deallocations of an Android
               process. (Available on Android 10+)`,
            setEnabled: (cfg, val) => cfg.heapProfiling = val,
            isEnabled: (cfg) => cfg.heapProfiling,
          } as ProbeAttrs,
          m(HeapSettings, attrs)),
        m(Probe,
          {
            title: 'Java heap dumps',
            img: 'rec_java_heap_dump.png',
            descr: `Dump information about the Java object graph of an
          Android app. (Available on Android 11+)`,
            setEnabled: (cfg, val) => cfg.javaHeapDump = val,
            isEnabled: (cfg) => cfg.javaHeapDump,
          } as ProbeAttrs,
          m(JavaHeapDumpSettings, attrs)),
        m(Probe,
          {
            title: 'Kernel meminfo',
            img: 'rec_meminfo.png',
            descr: 'Polling of /proc/meminfo',
            setEnabled: (cfg, val) => cfg.meminfo = val,
            isEnabled: (cfg) => cfg.meminfo,
          } as ProbeAttrs,
          m(Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: POLL_INTERVAL_MS,
            unit: 'ms',
            set: (cfg, val) => cfg.meminfoPeriodMs = val,
            get: (cfg) => cfg.meminfoPeriodMs,
          } as SliderAttrs),
          m(Dropdown, {
            title: 'Select counters',
            cssClass: '.multicolumn',
            options: meminfoOpts,
            set: (cfg, val) => cfg.meminfoCounters = val,
            get: (cfg) => cfg.meminfoCounters,
          } as DropdownAttrs)),
        m(Probe, {
          title: 'High-frequency memory events',
          img: 'rec_mem_hifreq.png',
          descr: `Allows to track short memory spikes and transitories through
                ftrace's mm_event, rss_stat and ion events. Available only
                on recent Android Q+ kernels`,
          setEnabled: (cfg, val) => cfg.memHiFreq = val,
          isEnabled: (cfg) => cfg.memHiFreq,
        } as ProbeAttrs),
        m(Probe, {
          title: 'Low memory killer',
          img: 'rec_lmk.png',
          descr: `Record LMK events. Works both with the old in-kernel LMK
                and the newer userspace lmkd. It also tracks OOM score
                adjustments.`,
          setEnabled: (cfg, val) => cfg.memLmk = val,
          isEnabled: (cfg) => cfg.memLmk,
        } as ProbeAttrs),
        m(Probe,
          {
            title: 'Per process stats',
            img: 'rec_ps_stats.png',
            descr: `Periodically samples all processes in the system tracking:
                    their thread list, memory counters (RSS, swap and other
                    /proc/status counters) and oom_score_adj.`,
            setEnabled: (cfg, val) => cfg.procStats = val,
            isEnabled: (cfg) => cfg.procStats,
          } as ProbeAttrs,
          m(Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: POLL_INTERVAL_MS,
            unit: 'ms',
            set: (cfg, val) => cfg.procStatsPeriodMs = val,
            get: (cfg) => cfg.procStatsPeriodMs,
          } as SliderAttrs)),
        m(Probe,
          {
            title: 'Virtual memory stats',
            img: 'rec_vmstat.png',
            descr: `Periodically polls virtual memory stats from /proc/vmstat.
                    Allows to gather statistics about swap, eviction,
                    compression and pagecache efficiency`,
            setEnabled: (cfg, val) => cfg.vmstat = val,
            isEnabled: (cfg) => cfg.vmstat,
          } as ProbeAttrs,
          m(Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: POLL_INTERVAL_MS,
            unit: 'ms',
            set: (cfg, val) => cfg.vmstatPeriodMs = val,
            get: (cfg) => cfg.vmstatPeriodMs,
          } as SliderAttrs),
          m(Dropdown, {
            title: 'Select counters',
            cssClass: '.multicolumn',
            options: vmstatOpts,
            set: (cfg, val) => cfg.vmstatCounters = val,
            get: (cfg) => cfg.vmstatCounters,
          } as DropdownAttrs)));
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {globals} from '../globals';
import {Probe, ProbeAttrs, Slider, SliderAttrs} from '../record_widgets';
import {POLL_INTERVAL_MS, RecordingSectionAttrs} from './recording_sections';

export class PowerSettings implements m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    const DOC_URL = 'https://perfetto.dev/docs/data-sources/battery-counters';
    const descr =
        [m('div',
           m('span', `Polls charge counters and instantaneous power draw from
                    the battery power management IC and the power rails from
                    the PowerStats HAL (`),
           m('a', {href: DOC_URL, target: '_blank'}, 'see docs for more'),
           m('span', ')'))];
    if (globals.isInternalUser) {
      descr.push(m(
          'div',
          m('span', 'Googlers: See '),
          m('a',
            {href: 'http://go/power-rails-internal-doc', target: '_blank'},
            'this doc'),
          m('span',
            ` for instructions on how to change the refault rail selection
                  on internal devices.`),
          ));
    }
    return m(
        `.record-section${attrs.cssClass}`,
        m(Probe,
          {
            title: 'Battery drain & power rails',
            img: 'rec_battery_counters.png',
            descr,
            setEnabled: (cfg, val) => cfg.batteryDrain = val,
            isEnabled: (cfg) => cfg.batteryDrain,
          } as ProbeAttrs,
          m(Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: POLL_INTERVAL_MS,
            unit: 'ms',
            set: (cfg, val) => cfg.batteryDrainPollMs = val,
            get: (cfg) => cfg.batteryDrainPollMs,
          } as SliderAttrs)),
        m(Probe, {
          title: 'Board voltages & frequencies',
          img: 'rec_board_voltage.png',
          descr: 'Tracks voltage and frequency changes from board sensors',
          setEnabled: (cfg, val) => cfg.boardSensors = val,
          isEnabled: (cfg) => cfg.boardSensors,
        } as ProbeAttrs));
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {produce} from 'immer';
import m from 'mithril';

import {Actions} from '../../common/actions';
import {RecordMode} from '../../common/state';
import {globals} from '../globals';
import {Slider, SliderAttrs} from '../record_widgets';

import {RecordingSectionAttrs} from './recording_sections';

export class RecordingSettings implements
    m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    const S = (x: number) => x * 1000;
    const M = (x: number) => x * 1000 * 60;
    const H = (x: number) => x * 1000 * 60 * 60;

    const cfg = globals.state.recordConfig;

    const recButton = (mode: RecordMode, title: string, img: string) => {
      const checkboxArgs = {
        checked: cfg.mode === mode,
        onchange: (e: InputEvent) => {
          const checked = (e.target as HTMLInputElement).checked;
          if (!checked) return;
          const traceCfg = produce(globals.state.recordConfig, (draft) => {
            draft.mode = mode;
          });
          globals.dispatch(Actions.setRecordConfig({config: traceCfg}));
        },
      };
      return m(
          `label${cfg.mode === mode ? '.selected' : ''}`,
          m(`input[type=radio][name=rec_mode]`, checkboxArgs),
          m(`img[src=${globals.root}assets/${img}]`),
          m('span', title));
    };

    return m(
        `.record-section${attrs.cssClass}`,
        m('header', 'Recording mode'),
        m('.record-mode',
          recButton('STOP_WHEN_FULL', 'Stop when full', 'rec_one_shot.png'),
          recButton('RING_BUFFER', 'Ring buffer', 'rec_ring_buf.png'),
          recButton('LONG_TRACE', 'Long trace', 'rec_long_trace.png')),

        m(Slider, {
          title: 'In-memory buffer size',
          icon: '360',
          values: [4, 8, 16, 32, 64, 128, 256, 512],
          unit: 'MB',
          set: (cfg, val) => cfg.bufferSizeMb = val,
          get: (cfg) => cfg.bufferSizeMb,
        } as SliderAttrs),

        m(Slider, {
          title: 'Max duration',
          icon: 'timer',
          values: [S(10), S(15), S(30), S(60), M(5), M(30), H(1), H(6), H(12)],
          isTime: true,
          unit: 'h:m:s',
          set: (cfg, val) => cfg.durationMs = val,
          get: (cfg) => cfg.durationMs,
        } as SliderAttrs),
        m(Slider, {
          title: 'Max file size',
          icon: 'save',
          cssClass: cfg.mode !== 'LONG_TRACE' ? '.hide' : '',
          values: [5, 25, 50, 100, 500, 1000, 1000 * 5, 1000 * 10],
          unit: 'MB',
          set: (cfg, val) => cfg.maxFileSizeMb = val,
          get: (cfg) => cfg.maxFileSizeMb,
        } as SliderAttrs),
        m(Slider, {
          title: 'Flush on disk every',
          cssClass: cfg.mode !== 'LONG_TRACE' ? '.hide' : '',
          icon: 'av_timer',
          values: [100, 250, 500, 1000, 2500, 5000],
          unit: 'ms',
          set: (cfg, val) => cfg.fileWritePeriodMs = val,
          get: (cfg) => cfg.fileWritePeriodMs || 0,
        } as SliderAttrs));
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {DataSource} from '../../common/recordingV2/recording_interfaces_v2';
import {getBuiltinChromeCategoryList, isChromeTarget} from '../../common/state';
import {globals} from '../globals';
import {
  CategoriesCheckboxList,
  CompactProbe,
  Toggle,
  ToggleAttrs,
} from '../record_widgets';

import {RecordingSectionAttrs} from './recording_sections';

function extractChromeCategories(dataSources: DataSource[]): string[]|
    undefined {
  for (const dataSource of dataSources) {
    if (dataSource.name === 'chromeCategories') {
      return dataSource.descriptor as string[];
    }
  }
  return undefined;
}

class ChromeCategoriesSelection implements
    m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    // If we are attempting to record via the Chrome extension, we receive the
    // list of actually supported categories via DevTools. Otherwise, we fall
    // back to an integrated list of categories from a recent version of Chrome.
    let categories = globals.state.chromeCategories ||
        extractChromeCategories(attrs.dataSources);
    if (!categories || !isChromeTarget(globals.state.recordingTarget)) {
      categories = getBuiltinChromeCategoryList();
    }

    const defaultCategories = new Map<string, string>();
    const disabledByDefaultCategories = new Map<string, string>();
    const disabledPrefix = 'disabled-by-default-';
    categories.forEach((cat) => {
      if (cat.startsWith(disabledPrefix)) {
        disabledByDefaultCategories.set(cat, cat.replace(disabledPrefix, ''));
      } else {
        defaultCategories.set(cat, cat);
      }
    });

    return m(
        '.chrome-categories',
        m(CategoriesCheckboxList, {
          categories: defaultCategories,
          title: 'Additional categories',
          get: (cfg) => cfg.chromeCategoriesSelected,
          set: (cfg, val) => cfg.chromeCategoriesSelected = val,
        }),
        m(CategoriesCheckboxList, {
          categories: disabledByDefaultCategories,
          title: 'High overhead categories',
          get: (cfg) => cfg.chromeHighOverheadCategoriesSelected,
          set: (cfg, val) => cfg.chromeHighOverheadCategoriesSelected = val,
        }));
  }
}

export class ChromeSettings implements m.ClassComponent<RecordingSectionAttrs> {
  view({attrs}: m.CVnode<RecordingSectionAttrs>) {
    return m(
        `.record-section${attrs.cssClass}`,
        CompactProbe({
          title: 'Task scheduling',
          setEnabled: (cfg, val) => cfg.taskScheduling = val,
          isEnabled: (cfg) => cfg.taskScheduling,
        }),
        CompactProbe({
          title: 'IPC flows',
          setEnabled: (cfg, val) => cfg.ipcFlows = val,
          isEnabled: (cfg) => cfg.ipcFlows,
        }),
        CompactProbe({
          title: 'Javascript execution',
          setEnabled: (cfg, val) => cfg.jsExecution = val,
          isEnabled: (cfg) => cfg.jsExecution,
        }),
        CompactProbe({
          title: 'Web content rendering, layout and compositing',
          setEnabled: (cfg, val) => cfg.webContentRendering = val,
          isEnabled: (cfg) => cfg.webContentRendering,
        }),
        CompactProbe({
          title: 'UI rendering & surface compositing',
          setEnabled: (cfg, val) => cfg.uiRendering = val,
          isEnabled: (cfg) => cfg.uiRendering,
        }),
        CompactProbe({
          title: 'Input events',
          setEnabled: (cfg, val) => cfg.inputEvents = val,
          isEnabled: (cfg) => cfg.inputEvents,
        }),
        CompactProbe({
          title: 'Navigation & Loading',
          setEnabled: (cfg, val) => cfg.navigationAndLoading = val,
          isEnabled: (cfg) => cfg.navigationAndLoading,
        }),
        CompactProbe({
          title: 'Chrome Logs',
          setEnabled: (cfg, val) => cfg.chromeLogs = val,
          isEnabled: (cfg) => cfg.chromeLogs,
        }),
        m(Toggle, {
          title: 'Remove untyped and sensitive data like URLs from the trace',
          descr: 'Not recommended unless you intend to share the trace' +
              ' with third-parties.',
          setEnabled: (cfg, val) => cfg.chromePrivacyFiltering = val,
          isEnabled: (cfg) => cfg.chromePrivacyFiltering,
        } as ToggleAttrs),
        m(ChromeCategoriesSelection, attrs));
  }
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {TimeSpan} from '../common/time';

import {computeZoom, TimeScale} from './time_scale';

test('time scale to work', () => {
  const scale = new TimeScale(new TimeSpan(0, 100), [200, 1000]);

  expect(scale.timeToPx(0)).toEqual(200);
  expect(scale.timeToPx(100)).toEqual(1000);
  expect(scale.timeToPx(50)).toEqual(600);

  expect(scale.pxToTime(200)).toEqual(0);
  expect(scale.pxToTime(1000)).toEqual(100);
  expect(scale.pxToTime(600)).toEqual(50);

  expect(scale.deltaPxToDuration(400)).toEqual(50);

  expect(scale.timeInBounds(50)).toEqual(true);
  expect(scale.timeInBounds(0)).toEqual(true);
  expect(scale.timeInBounds(100)).toEqual(true);
  expect(scale.timeInBounds(-1)).toEqual(false);
  expect(scale.timeInBounds(101)).toEqual(false);
});


test('time scale to be updatable', () => {
  const scale = new TimeScale(new TimeSpan(0, 100), [100, 1000]);

  expect(scale.timeToPx(0)).toEqual(100);

  scale.setLimitsPx(200, 1000);
  expect(scale.timeToPx(0)).toEqual(200);
  expect(scale.timeToPx(100)).toEqual(1000);

  scale.setTimeBounds(new TimeSpan(0, 200));
  expect(scale.timeToPx(0)).toEqual(200);
  expect(scale.timeToPx(100)).toEqual(600);
  expect(scale.timeToPx(200)).toEqual(1000);
});

test('it zooms', () => {
  const span = new TimeSpan(0, 20);
  const scale = new TimeScale(span, [0, 100]);
  const newSpan = computeZoom(scale, span, 0.5, 50);
  expect(newSpan.start).toEqual(5);
  expect(newSpan.end).toEqual(15);
});

test('it zooms an offset scale and span', () => {
  const span = new TimeSpan(1000, 1020);
  const scale = new TimeScale(span, [200, 300]);
  const newSpan = computeZoom(scale, span, 0.5, 250);
  expect(newSpan.start).toEqual(1005);
  expect(newSpan.end).toEqual(1015);
});

test('it clamps zoom in', () => {
  const span = new TimeSpan(1000, 1040);
  const scale = new TimeScale(span, [200, 300]);
  const newSpan = computeZoom(scale, span, 0.0000000001, 225);
  expect((newSpan.end - newSpan.start) / 2 + newSpan.start).toBeCloseTo(1010);
  expect(newSpan.end - newSpan.start).toBeCloseTo(1e-8);
});
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Router} from './router';

const mockComponent = {
  view() {},
};

beforeEach(() => {
  window.location.hash = '';
});

test('Default route must be defined', () => {
  expect(() => new Router({'/a': mockComponent})).toThrow();
});

test('Resolves empty route to default component', () => {
  const router = new Router({'/': mockComponent});
  window.location.hash = '';
  expect(router.resolve().tag).toBe(mockComponent);
});

test('Resolves subpage route to component of main page', () => {
  const nonDefaultComponent = {view() {}};
  const router = new Router({
    '/': mockComponent,
    '/a': nonDefaultComponent,
  });
  window.location.hash = '#!/a/subpage';
  expect(router.resolve().tag).toBe(nonDefaultComponent);
  expect(router.resolve().attrs.subpage).toBe('/subpage');
});

test('Pass empty subpage if not found in URL', () => {
  const nonDefaultComponent = {view() {}};
  const router = new Router({
    '/': mockComponent,
    '/a': nonDefaultComponent,
  });
  window.location.hash = '#!/a';
  expect(router.resolve().tag).toBe(nonDefaultComponent);
  expect(router.resolve().attrs.subpage).toBe('');
});

test('Args parsing', () => {
  const url = 'http://localhost/#!/foo?p=123&s=42&url=a?b?c';
  const args = Router.parseUrl(url).args;
  expect(args.p).toBe('123');
  expect(args.s).toBe('42');
  expect(args.url).toBe('a?b?c');
});

test('empty route broken into empty components', () => {
  const {page, subpage, args} = Router.parseFragment('');
  expect(page).toBe('');
  expect(subpage).toBe('');
  expect(args).toEqual({});
});

test('invalid route broken into empty components', () => {
  const {page, subpage, args} = Router.parseFragment('/bla');
  expect(page).toBe('');
  expect(subpage).toBe('');
  expect(args).toEqual({});
});

test('simple route has page defined', () => {
  const {page, subpage, args} = Router.parseFragment('#!/record');
  expect(page).toBe('/record');
  expect(subpage).toBe('');
  expect(args).toEqual({});
});

test('simple route has both components defined', () => {
  const {page, subpage, args} = Router.parseFragment('#!/record/memory');
  expect(page).toBe('/record');
  expect(subpage).toBe('/memory');
  expect(args).toEqual({});
});

test('route broken at first slash', () => {
  const {page, subpage, args} = Router.parseFragment('#!/record/memory/stuff');
  expect(page).toBe('/record');
  expect(subpage).toBe('/memory/stuff');
  expect(args).toEqual({});
});

test('parameters separated from route', () => {
  const {page, subpage, args} =
      Router.parseFragment('#!/record/memory?url=http://localhost:1234/aaaa');
  expect(page).toBe('/record');
  expect(subpage).toBe('/memory');
  expect(args).toEqual({url: 'http://localhost:1234/aaaa'});
});
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Registry} from '../common/registry';
import {TrackCreator} from './track';

/**
 * Global registry that maps types to TrackCreator.
 */
export const trackRegistry = Registry.kindRegistry<TrackCreator>();
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {getSchema} from '../common/schema';

import {globals} from './globals';

declare global {
  interface Window {
    m: typeof m;
    getSchema: typeof getSchema;
    globals: typeof globals;
    Actions: typeof Actions;
  }
}

export function registerDebugGlobals() {
  window.getSchema = getSchema;
  window.m = m;
  window.globals = globals;
  window.Actions = Actions;
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {hex} from 'color-convert';
import m from 'mithril';

import {assertExists} from '../base/logging';
import {Actions} from '../common/actions';
import {
  getContainingTrackId,
  TrackGroupState,
  TrackState,
} from '../common/state';

import {globals} from './globals';
import {drawGridLines} from './gridline_helper';
import {
  BLANK_CHECKBOX,
  CHECKBOX,
  EXPAND_DOWN,
  EXPAND_UP,
  INDETERMINATE_CHECKBOX,
} from './icons';
import {Panel, PanelSize} from './panel';
import {Track} from './track';
import {TrackContent} from './track_panel';
import {trackRegistry} from './track_registry';
import {
  drawVerticalLineAtTime,
} from './vertical_line_helper';

interface Attrs {
  trackGroupId: string;
  selectable: boolean;
}

export class TrackGroupPanel extends Panel<Attrs> {
  private readonly trackGroupId: string;
  private shellWidth = 0;
  private backgroundColor = '#ffffff';  // Updated from CSS later.
  private summaryTrack: Track|undefined;

  constructor({attrs}: m.CVnode<Attrs>) {
    super();
    this.trackGroupId = attrs.trackGroupId;
    const trackCreator = trackRegistry.get(this.summaryTrackState.kind);
    const engineId = this.summaryTrackState.engineId;
    const engine = globals.engines.get(engineId);
    if (engine !== undefined) {
      this.summaryTrack =
          trackCreator.create({trackId: this.summaryTrackState.id, engine});
    }
  }

  get trackGroupState(): TrackGroupState {
    return assertExists(globals.state.trackGroups[this.trackGroupId]);
  }

  get summaryTrackState(): TrackState {
    return assertExists(globals.state.tracks[this.trackGroupState.tracks[0]]);
  }

  view({attrs}: m.CVnode<Attrs>) {
    const collapsed = this.trackGroupState.collapsed;
    let name = this.trackGroupState.name;
    if (name[0] === '/') {
      name = StripPathFromExecutable(name);
    }

    // The shell should be highlighted if the current search result is inside
    // this track group.
    let highlightClass = '';
    const searchIndex = globals.state.searchIndex;
    if (searchIndex !== -1) {
      const trackId = globals.currentSearchResults.trackIds[searchIndex];
      const parentTrackId = getContainingTrackId(globals.state, trackId);
      if (parentTrackId === attrs.trackGroupId) {
        highlightClass = 'flash';
      }
    }

    const selection = globals.state.currentSelection;

    const trackGroup = globals.state.trackGroups[attrs.trackGroupId];
    let checkBox = BLANK_CHECKBOX;
    if (selection !== null && selection.kind === 'AREA') {
      const selectedArea = globals.state.areas[selection.areaId];
      if (selectedArea.tracks.includes(attrs.trackGroupId) &&
          trackGroup.tracks.every((id) => selectedArea.tracks.includes(id))) {
        checkBox = CHECKBOX;
      } else if (
          selectedArea.tracks.includes(attrs.trackGroupId) ||
          trackGroup.tracks.some((id) => selectedArea.tracks.includes(id))) {
        checkBox = INDETERMINATE_CHECKBOX;
      }
    }

    let child = null;
    if (this.summaryTrackState.labels &&
        this.summaryTrackState.labels.length > 0) {
      child = this.summaryTrackState.labels.join(', ');
    }

    return m(
        `.track-group-panel[collapsed=${collapsed}]`,
        {id: 'track_' + this.trackGroupId},
        m(`.shell`,
          {
            onclick: (e: MouseEvent) => {
              globals.dispatch(Actions.toggleTrackGroupCollapsed({
                trackGroupId: attrs.trackGroupId,
              })),
                  e.stopPropagation();
            },
            class: `${highlightClass}`,
          },

          m('.fold-button',
            m('i.material-icons',
              this.trackGroupState.collapsed ? EXPAND_DOWN : EXPAND_UP)),
          m('.title-wrapper',
            m('h1.track-title',
              {title: name},
              name,
              ('namespace' in this.summaryTrackState.config) &&
                  m('span.chip', 'metric')),
            (this.trackGroupState.collapsed && child !== null) ?
                m('h2.track-subtitle', child) :
                null),
          selection && selection.kind === 'AREA' ?
              m('i.material-icons.track-button',
                {
                  onclick: (e: MouseEvent) => {
                    globals.dispatch(Actions.toggleTrackSelection(
                        {id: attrs.trackGroupId, isTrackGroup: true}));
                    e.stopPropagation();
                  },
                },
                checkBox) :
              ''),

        this.summaryTrack ?
            m(TrackContent,
              {track: this.summaryTrack},
              (!this.trackGroupState.collapsed && child !== null) ?
                  m('span', child) :
                  null) :
            null);
  }

  oncreate(vnode: m.CVnodeDOM<Attrs>) {
    this.onupdate(vnode);
  }

  onupdate({dom}: m.CVnodeDOM<Attrs>) {
    const shell = assertExists(dom.querySelector('.shell'));
    this.shellWidth = shell.getBoundingClientRect().width;
    // TODO(andrewbb): move this to css_constants
    if (this.trackGroupState.collapsed) {
      this.backgroundColor =
          getComputedStyle(dom).getPropertyValue('--collapsed-background');
    } else {
      this.backgroundColor =
          getComputedStyle(dom).getPropertyValue('--expanded-background');
    }
    if (this.summaryTrack !== undefined) {
      this.summaryTrack.onFullRedraw();
    }
  }

  onremove() {
    if (this.summaryTrack !== undefined) {
      this.summaryTrack.onDestroy();
      this.summaryTrack = undefined;
    }
  }

  highlightIfTrackSelected(ctx: CanvasRenderingContext2D, size: PanelSize) {
    const localState = globals.frontendLocalState;
    const selection = globals.state.currentSelection;
    if (!selection || selection.kind !== 'AREA') return;
    const selectedArea = globals.state.areas[selection.areaId];
    if (selectedArea.tracks.includes(this.trackGroupId)) {
      ctx.fillStyle = 'rgba(131, 152, 230, 0.3)';
      ctx.fillRect(
          localState.timeScale.timeToPx(selectedArea.startSec) +
              this.shellWidth,
          0,
          localState.timeScale.deltaTimeToPx(
              selectedArea.endSec - selectedArea.startSec),
          size.height);
    }
  }

  renderCanvas(ctx: CanvasRenderingContext2D, size: PanelSize) {
    const collapsed = this.trackGroupState.collapsed;

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, size.width, size.height);

    if (!collapsed) return;

    this.highlightIfTrackSelected(ctx, size);

    drawGridLines(
        ctx,
        size.width,
        size.height);

    ctx.save();
    ctx.translate(this.shellWidth, 0);
    if (this.summaryTrack) {
      this.summaryTrack.render(ctx);
    }
    ctx.restore();

    this.highlightIfTrackSelected(ctx, size);

    const localState = globals.frontendLocalState;
    // Draw vertical line when hovering on the notes panel.
    if (globals.state.hoveredNoteTimestamp !== -1) {
      drawVerticalLineAtTime(
          ctx,
          localState.timeScale,
          globals.state.hoveredNoteTimestamp,
          size.height,
          `#aaa`);
    }
    if (globals.state.hoverCursorTimestamp !== -1) {
      drawVerticalLineAtTime(
          ctx,
          localState.timeScale,
          globals.state.hoverCursorTimestamp,
          size.height,
          `#344596`);
    }

    if (globals.state.currentSelection !== null) {
      if (globals.state.currentSelection.kind === 'SLICE' &&
          globals.sliceDetails.wakeupTs !== undefined) {
        drawVerticalLineAtTime(
            ctx,
            localState.timeScale,
            globals.sliceDetails.wakeupTs,
            size.height,
            `black`);
      }
    }
    // All marked areas should have semi-transparent vertical lines
    // marking the start and end.
    for (const note of Object.values(globals.state.notes)) {
      if (note.noteType === 'AREA') {
        const transparentNoteColor =
            'rgba(' + hex.rgb(note.color.substr(1)).toString() + ', 0.65)';
        drawVerticalLineAtTime(
            ctx,
            localState.timeScale,
            globals.state.areas[note.areaId].startSec,
            size.height,
            transparentNoteColor,
            1);
        drawVerticalLineAtTime(
            ctx,
            localState.timeScale,
            globals.state.areas[note.areaId].endSec,
            size.height,
            transparentNoteColor,
            1);
      } else if (note.noteType === 'DEFAULT') {
        drawVerticalLineAtTime(
            ctx, localState.timeScale, note.timestamp, size.height, note.color);
      }
    }
  }
}

function StripPathFromExecutable(path: string) {
  return path.split('/').slice(-1)[0];
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {fromNs} from '../common/time';

import {TRACK_SHELL_WIDTH} from './css_constants';
import {globals} from './globals';
import {
  TickGenerator,
  TickType,
  timeScaleForVisibleWindow,
} from './gridline_helper';
import {Panel, PanelSize} from './panel';

// This is used to display the summary of search results.
export class TickmarkPanel extends Panel {
  view() {
    return m('.tickbar');
  }

  renderCanvas(ctx: CanvasRenderingContext2D, size: PanelSize) {
    const {timeScale, visibleWindowTime} = globals.frontendLocalState;

    ctx.fillStyle = '#999';
    ctx.fillRect(TRACK_SHELL_WIDTH - 2, 0, 2, size.height);
    const relScale = timeScaleForVisibleWindow(TRACK_SHELL_WIDTH, size.width);
    if (relScale.timeSpan.duration > 0 && relScale.widthPx > 0) {
      for (const {type, position} of new TickGenerator(relScale)) {
        if (type === TickType.MAJOR) ctx.fillRect(position, 0, 1, size.height);
      }
    }

    const data = globals.searchSummary;
    for (let i = 0; i < data.tsStarts.length; i++) {
      const tStart = data.tsStarts[i];
      const tEnd = data.tsEnds[i];
      if (tEnd <= visibleWindowTime.start || tStart >= visibleWindowTime.end) {
        continue;
      }
      const rectStart =
          Math.max(timeScale.timeToPx(tStart), 0) + TRACK_SHELL_WIDTH;
      const rectEnd = timeScale.timeToPx(tEnd) + TRACK_SHELL_WIDTH;
      ctx.fillStyle = '#ffe263';
      ctx.fillRect(
          Math.floor(rectStart),
          0,
          Math.ceil(rectEnd - rectStart),
          size.height);
    }
    const index = globals.state.searchIndex;
    const startSec = fromNs(globals.currentSearchResults.tsStarts[index]);
    const triangleStart =
        Math.max(timeScale.timeToPx(startSec), 0) + TRACK_SHELL_WIDTH;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(triangleStart, size.height);
    ctx.lineTo(triangleStart - 3, 0);
    ctx.lineTo(triangleStart + 3, 0);
    ctx.lineTo(triangleStart, size.height);
    ctx.fill();
    ctx.closePath();
  }
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {timeToCode, toNs} from '../common/time';

import {globals, SliceDetails} from './globals';
import {Panel} from './panel';

// To display process or thread, we want to concatenate their name with ID, but
// either can be undefined and all the cases need to be considered carefully to
// avoid `undefined undefined` showing up in the UI. This function does such
// concatenation.
//
// Result can be undefined if both name and process are, in this case result is
// not going to be displayed in the UI.
function getDisplayName(name: string|undefined, id: number|undefined): string|
    undefined {
  if (name === undefined) {
    return id === undefined ? undefined : `${id}`;
  } else {
    return id === undefined ? name : `${name} ${id}`;
  }
}

export abstract class SlicePanel extends Panel {
  protected computeDuration(ts: number, dur: number): string {
    return toNs(dur) === -1 ?
        `${globals.state.traceTime.endSec - ts} (Did not end)` :
        timeToCode(dur);
  }

  protected getProcessThreadDetails(sliceInfo: SliceDetails) {
    return new Map<string, string|undefined>([
      ['Thread', getDisplayName(sliceInfo.threadName, sliceInfo.tid)],
      ['Process', getDisplayName(sliceInfo.processName, sliceInfo.pid)],
      ['User ID', sliceInfo.uid ? String(sliceInfo.uid) : undefined],
      ['Package name', sliceInfo.packageName],
      [
        'Version code',
        sliceInfo.versionCode ? String(sliceInfo.versionCode) : undefined,
      ],
    ]);
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {EngineProxy} from '../common/engine';
import {NUM, NUM_NULL, STR, STR_NULL} from '../common/query_result';
import {Upid, Utid} from './sql_types';
import {fromNumNull} from './sql_utils';

// Interface definitions for process and thread-related information
// and functions to extract them from SQL.

// TODO(altimin): Current implementation ends up querying process and thread
// information separately for each thread. Given that there is a limited
// numer of threads and processes, it might be easier to fetch this information
// once when loading the trace and then just look it up synchronously.

export interface ProcessInfo {
  upid: Upid;
  pid?: number;
  name?: string;
  uid?: number;
  packageName?: string;
  versionCode?: number;
}

async function getProcessInfo(
    engine: EngineProxy, upid: Upid): Promise<ProcessInfo> {
  const it = (await engine.query(`
              SELECT pid, name, uid FROM process WHERE upid = ${upid};
            `)).iter({pid: NUM, name: STR_NULL, uid: NUM_NULL});
  if (!it.valid()) {
    return {upid};
  }
  const result: ProcessInfo = {
    upid,
    pid: it.pid,
    name: it.name || undefined,
  };

  if (it.pid === null) {
    return result;
  }
  result.pid = it.pid || undefined;

  if (it.uid === undefined) {
    return result;
  }

  const packageResult = await engine.query(`
                SELECT
                  package_name as packageName,
                  version_code as versionCode
                FROM package_list WHERE uid = ${it.uid};
              `);
  // The package_list table is not populated in some traces so we need to
  // check if the result has returned any rows.
  if (packageResult.numRows() > 0) {
    const packageDetails = packageResult.firstRow({
      packageName: STR,
      versionCode: NUM,
    });
    result.packageName = packageDetails.packageName;
    result.versionCode = packageDetails.versionCode || undefined;
  }
  return result;
}

function getDisplayName(name: string|undefined, id: number|undefined): string|
    undefined {
  if (name === undefined) {
    return id === undefined ? undefined : `${id}`;
  }
  return id === undefined ? name : `${name} [${id}]`;
}

export function getProcessName(info?: ProcessInfo): string|undefined {
  return getDisplayName(info?.name, info?.pid);
}

export interface ThreadInfo {
  utid: Utid;
  tid?: number;
  name?: string;
  process?: ProcessInfo;
}

export async function getThreadInfo(
    engine: EngineProxy, utid: Utid): Promise<ThreadInfo> {
  const it = (await engine.query(`
        SELECT tid, name, upid
        FROM thread
        WHERE utid = ${utid};
    `)).iter({tid: NUM, name: STR_NULL, upid: NUM_NULL});
  if (!it.valid()) {
    return {
      utid,
    };
  }
  const upid = fromNumNull(it.upid) as (Upid | undefined);
  return {
    utid,
    tid: it.tid,
    name: it.name || undefined,
    process: upid ? await getProcessInfo(engine, upid) : undefined,
  };
}

export function getThreadName(info?: ThreadInfo): string|undefined {
  return getDisplayName(info?.name, info?.tid);
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Actions} from '../common/actions';
import {EngineProxy} from '../common/engine';
import {LONG, NUM, NUM_NULL, STR_NULL} from '../common/query_result';
import {translateState} from '../common/thread_state';
import {fromNs, timeToCode} from '../common/time';

import {copyToClipboard} from './clipboard';
import {globals} from './globals';
import {menuItem} from './popup_menu';
import {scrollToTrackAndTs} from './scroll_helper';
import {
  asUtid,
  SchedSqlId,
  ThreadStateSqlId,
  timestampFromNanos,
  toTraceTime,
  TPTimestamp,
} from './sql_types';
import {
  constraintsToQueryFragment,
  fromNumNull,
  SQLConstraints,
} from './sql_utils';
import {
  getProcessName,
  getThreadInfo,
  getThreadName,
  ThreadInfo,
} from './thread_and_process_info';
import {dict, Dict, maybeValue, Value, value} from './value';

// Representation of a single thread state object, corresponding to
// a row for the |thread_slice| table.
export interface ThreadState {
  // Id into |thread_state| table.
  threadStateSqlId: ThreadStateSqlId;
  // Id of the corresponding entry in the |sched| table.
  schedSqlId?: SchedSqlId;
  // Timestamp of the beginning of this thread state in nanoseconds.
  ts: TPTimestamp;
  // Duration of this thread state in nanoseconds.
  dur: number;
  // CPU id if this thread state corresponds to a thread running on the CPU.
  cpu?: number;
  // Human-readable name of this thread state.
  state: string;
  blockedFunction?: string;

  thread?: ThreadInfo;
  wakerThread?: ThreadInfo;
}

// Gets a list of thread state objects from Trace Processor with given
// constraints.
export async function getThreadStateFromConstraints(
    engine: EngineProxy, constraints: SQLConstraints): Promise<ThreadState[]> {
  const query = await engine.query(`
    SELECT
      thread_state.id as threadStateSqlId,
      (select sched.id
        from sched
        where sched.ts=thread_state.ts and sched.utid=thread_state.utid
        limit 1
       ) as schedSqlId,
      ts,
      thread_state.dur as dur,
      thread_state.cpu as cpu,
      state,
      thread_state.blocked_function as blockedFunction,
      io_wait as ioWait,
      thread_state.utid as utid,
      waker_utid as wakerUtid
    FROM thread_state
    ${constraintsToQueryFragment(constraints)}`);
  const it = query.iter({
    threadStateSqlId: NUM,
    schedSqlId: NUM_NULL,
    ts: LONG,
    dur: NUM,
    cpu: NUM_NULL,
    state: STR_NULL,
    blockedFunction: STR_NULL,
    ioWait: NUM_NULL,
    utid: NUM,
    wakerUtid: NUM_NULL,
  });

  const result: ThreadState[] = [];

  for (; it.valid(); it.next()) {
    const ioWait = it.ioWait === null ? undefined : it.ioWait > 0;
    const wakerUtid = asUtid(it.wakerUtid || undefined);

    // TODO(altimin): Consider fetcing thread / process info using a single
    // query instead of one per row.
    result.push({
      threadStateSqlId: it.threadStateSqlId as ThreadStateSqlId,
      schedSqlId: fromNumNull(it.schedSqlId) as (SchedSqlId | undefined),
      ts: timestampFromNanos(it.ts),
      dur: it.dur,
      cpu: fromNumNull(it.cpu),
      state: translateState(it.state || undefined, ioWait),
      blockedFunction: it.blockedFunction || undefined,
      thread: await getThreadInfo(engine, asUtid(it.utid)),
      wakerThread: wakerUtid ? await getThreadInfo(engine, wakerUtid) :
                               undefined,
    });
  }
  return result;
}

export async function getThreadState(
    engine: EngineProxy, id: number): Promise<ThreadState|undefined> {
  const result = await getThreadStateFromConstraints(engine, {
    filters: [`id=${id}`],
  });
  if (result.length > 1) {
    throw new Error(`thread_state table has more than one row with id ${id}`);
  }
  if (result.length === 0) {
    return undefined;
  }
  return result[0];
}

export function goToSchedSlice(cpu: number, id: SchedSqlId, ts: TPTimestamp) {
  let trackId: string|undefined;
  for (const track of Object.values(globals.state.tracks)) {
    if (track.kind === 'CpuSliceTrack' &&
        (track.config as {cpu: number}).cpu === cpu) {
      trackId = track.id;
    }
  }
  if (trackId === undefined) {
    return;
  }
  globals.makeSelection(Actions.selectSlice({id, trackId}));
  // TODO(stevegolton): scrollToTrackAndTs() should take a TPTimestamp
  scrollToTrackAndTs(trackId, Number(ts));
}

function stateToValue(
    state: string,
    cpu: number|undefined,
    id: SchedSqlId|undefined,
    ts: TPTimestamp): Value|null {
  if (!state) {
    return null;
  }
  if (id === undefined || cpu === undefined) {
    return value(state);
  }
  return value(`${state} on CPU ${cpu}`, {
    rightButton: {
      action: () => {
        goToSchedSlice(cpu, id, ts);
      },
      hoverText: 'Go to CPU slice',
    },
  });
}

export function threadStateToDict(state: ThreadState): Dict {
  const result: {[name: string]: Value|null} = {};

  result['Start time'] = value(timeToCode(toTraceTime(state.ts)));
  result['Duration'] = value(timeToCode(fromNs(state.dur)));
  result['State'] =
      stateToValue(state.state, state.cpu, state.schedSqlId, state.ts);
  result['Blocked function'] = maybeValue(state.blockedFunction);
  const process = state?.thread?.process;
  result['Process'] = maybeValue(process ? getProcessName(process) : undefined);
  const thread = state?.thread;
  result['Thread'] = maybeValue(thread ? getThreadName(thread) : undefined);
  if (state.wakerThread) {
    const process = state.wakerThread.process;
    result['Waker'] = dict({
      'Process': maybeValue(process ? getProcessName(process) : undefined),
      'Thread': maybeValue(getThreadName(state.wakerThread)),
    });
  }
  result['SQL id'] = value(`thread_state[${state.threadStateSqlId}]`, {
    contextMenu: [
      menuItem(
          'Copy SQL query',
          () => {
            copyToClipboard(`select * from thread_state where id=${
                state.threadStateSqlId}`);
          }),
    ],
  });

  return dict(result);
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {assertExists, assertFalse, assertTrue} from '../base/logging';

import {
  SELECTION_STROKE_COLOR,
  TOPBAR_HEIGHT,
  TRACK_SHELL_WIDTH,
} from './css_constants';
import {
  FlowEventsRenderer,
  FlowEventsRendererArgs,
} from './flow_events_renderer';
import {globals} from './globals';
import {isPanelVNode, Panel, PanelSize} from './panel';
import {
  debugNow,
  perfDebug,
  perfDisplay,
  RunningStatistics,
  runningStatStr,
} from './perf';
import {TrackGroupAttrs} from './viewer_page';

// If the panel container scrolls, the backing canvas height is
// SCROLLING_CANVAS_OVERDRAW_FACTOR * parent container height.
const SCROLLING_CANVAS_OVERDRAW_FACTOR = 1.2;

// We need any here so we can accept vnodes with arbitrary attrs.
export type AnyAttrsVnode = m.Vnode<any, any>;

export interface Attrs {
  panels: AnyAttrsVnode[];
  doesScroll: boolean;
  kind: 'TRACKS'|'OVERVIEW'|'DETAILS';
}

interface PanelInfo {
  id: string;  // Can be == '' for singleton panels.
  vnode: AnyAttrsVnode;
  height: number;
  width: number;
  x: number;
  y: number;
}

export class PanelContainer implements m.ClassComponent<Attrs> {
  // These values are updated with proper values in oncreate.
  private parentWidth = 0;
  private parentHeight = 0;
  private scrollTop = 0;
  private panelInfos: PanelInfo[] = [];
  private panelContainerTop = 0;
  private panelContainerHeight = 0;
  private panelByKey = new Map<string, AnyAttrsVnode>();
  private totalPanelHeight = 0;
  private canvasHeight = 0;

  private flowEventsRenderer: FlowEventsRenderer;

  private panelPerfStats = new WeakMap<Panel, RunningStatistics>();
  private perfStats = {
    totalPanels: 0,
    panelsOnCanvas: 0,
    renderStats: new RunningStatistics(10),
  };

  // Attrs received in the most recent mithril redraw. We receive a new vnode
  // with new attrs on every redraw, and we cache it here so that resize
  // listeners and canvas redraw callbacks can access it.
  private attrs: Attrs;

  private ctx?: CanvasRenderingContext2D;

  private onResize: () => void = () => {};
  private parentOnScroll: () => void = () => {};
  private canvasRedrawer: () => void;

  get canvasOverdrawFactor() {
    return this.attrs.doesScroll ? SCROLLING_CANVAS_OVERDRAW_FACTOR : 1;
  }

  getPanelsInRegion(startX: number, endX: number, startY: number, endY: number):
      AnyAttrsVnode[] {
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);
    const panels: AnyAttrsVnode[] = [];
    for (let i = 0; i < this.panelInfos.length; i++) {
      const pos = this.panelInfos[i];
      const realPosX = pos.x - TRACK_SHELL_WIDTH;
      if (realPosX + pos.width >= minX && realPosX <= maxX &&
          pos.y + pos.height >= minY && pos.y <= maxY &&
          pos.vnode.attrs.selectable) {
        panels.push(pos.vnode);
      }
    }
    return panels;
  }

  // This finds the tracks covered by the in-progress area selection. When
  // editing areaY is not set, so this will not be used.
  handleAreaSelection() {
    const area = globals.frontendLocalState.selectedArea;
    if (area === undefined ||
        globals.frontendLocalState.areaY.start === undefined ||
        globals.frontendLocalState.areaY.end === undefined ||
        this.panelInfos.length === 0) {
      return;
    }
    // Only get panels from the current panel container if the selection began
    // in this container.
    const panelContainerTop = this.panelInfos[0].y;
    const panelContainerBottom = this.panelInfos[this.panelInfos.length - 1].y +
        this.panelInfos[this.panelInfos.length - 1].height;
    if (globals.frontendLocalState.areaY.start + TOPBAR_HEIGHT <
            panelContainerTop ||
        globals.frontendLocalState.areaY.start + TOPBAR_HEIGHT >
            panelContainerBottom) {
      return;
    }

    // The Y value is given from the top of the pan and zoom region, we want it
    // from the top of the panel container. The parent offset corrects that.
    const panels = this.getPanelsInRegion(
        globals.frontendLocalState.timeScale.timeToPx(area.startSec),
        globals.frontendLocalState.timeScale.timeToPx(area.endSec),
        globals.frontendLocalState.areaY.start + TOPBAR_HEIGHT,
        globals.frontendLocalState.areaY.end + TOPBAR_HEIGHT);
    // Get the track ids from the panels.
    const tracks = [];
    for (const panel of panels) {
      if (panel.attrs.id !== undefined) {
        tracks.push(panel.attrs.id);
        continue;
      }
      if (panel.attrs.trackGroupId !== undefined) {
        const trackGroup = globals.state.trackGroups[panel.attrs.trackGroupId];
        // Only select a track group and all child tracks if it is closed.
        if (trackGroup.collapsed) {
          tracks.push(panel.attrs.trackGroupId);
          for (const track of trackGroup.tracks) {
            tracks.push(track);
          }
        }
      }
    }
    globals.frontendLocalState.selectArea(area.startSec, area.endSec, tracks);
  }

  constructor(vnode: m.CVnode<Attrs>) {
    this.attrs = vnode.attrs;
    this.canvasRedrawer = () => this.redrawCanvas();
    globals.rafScheduler.addRedrawCallback(this.canvasRedrawer);
    perfDisplay.addContainer(this);
    this.flowEventsRenderer = new FlowEventsRenderer();
  }

  oncreate(vnodeDom: m.CVnodeDOM<Attrs>) {
    // Save the canvas context in the state.
    const canvas =
        vnodeDom.dom.querySelector('.main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw Error('Cannot create canvas context');
    }
    this.ctx = ctx;

    this.readParentSizeFromDom(vnodeDom.dom);
    this.readPanelHeightsFromDom(vnodeDom.dom);

    this.updateCanvasDimensions();
    this.repositionCanvas();

    // Save the resize handler in the state so we can remove it later.
    // TODO: Encapsulate resize handling better.
    this.onResize = () => {
      this.readParentSizeFromDom(vnodeDom.dom);
      this.updateCanvasDimensions();
      this.repositionCanvas();
      globals.rafScheduler.scheduleFullRedraw();
    };

    // Once ResizeObservers are out, we can stop accessing the window here.
    window.addEventListener('resize', this.onResize);

    // TODO(dproy): Handle change in doesScroll attribute.
    if (this.attrs.doesScroll) {
      this.parentOnScroll = () => {
        this.scrollTop = assertExists(vnodeDom.dom.parentElement).scrollTop;
        this.repositionCanvas();
        globals.rafScheduler.scheduleRedraw();
      };
      vnodeDom.dom.parentElement!.addEventListener(
          'scroll', this.parentOnScroll, {passive: true});
    }
  }

  onremove({attrs, dom}: m.CVnodeDOM<Attrs>) {
    window.removeEventListener('resize', this.onResize);
    globals.rafScheduler.removeRedrawCallback(this.canvasRedrawer);
    if (attrs.doesScroll) {
      dom.parentElement!.removeEventListener('scroll', this.parentOnScroll);
    }
    perfDisplay.removeContainer(this);
  }

  isTrackGroupAttrs(attrs: unknown): attrs is TrackGroupAttrs {
    return (attrs as {collapsed?: boolean}).collapsed !== undefined;
  }

  renderPanel(node: AnyAttrsVnode, key: string, extraClass = ''): m.Vnode {
    assertFalse(this.panelByKey.has(key));
    this.panelByKey.set(key, node);

    return m(
        `.panel${extraClass}`,
        {key, 'data-key': key},
        perfDebug() ?
            [node, m('.debug-panel-border', {key: 'debug-panel-border'})] :
            node);
  }

  // Render a tree of panels into one vnode. Argument `path` is used to build
  // `key` attribute for intermediate tree vnodes: otherwise Mithril internals
  // will complain about keyed and non-keyed vnodes mixed together.
  renderTree(node: AnyAttrsVnode, path: string): m.Vnode {
    if (this.isTrackGroupAttrs(node.attrs)) {
      return m(
          'div',
          {key: path},
          this.renderPanel(
              node.attrs.header,
              `${path}-header`,
              node.attrs.collapsed ? '' : '.sticky'),
          ...node.attrs.childTracks.map(
              (child, index) => this.renderTree(child, `${path}-${index}`)));
    }
    return this.renderPanel(node, assertExists(node.key) as string);
  }

  view({attrs}: m.CVnode<Attrs>) {
    this.attrs = attrs;
    this.panelByKey.clear();
    const children = attrs.panels.map(
        (panel, index) => this.renderTree(panel, `track-tree-${index}`));

    return [
      m(
          '.scroll-limiter',
          m('canvas.main-canvas'),
          ),
      m('.panels', children),
    ];
  }

  onupdate(vnodeDom: m.CVnodeDOM<Attrs>) {
    const totalPanelHeightChanged = this.readPanelHeightsFromDom(vnodeDom.dom);
    const parentSizeChanged = this.readParentSizeFromDom(vnodeDom.dom);
    const canvasSizeShouldChange =
        parentSizeChanged || !this.attrs.doesScroll && totalPanelHeightChanged;
    if (canvasSizeShouldChange) {
      this.updateCanvasDimensions();
      this.repositionCanvas();
      if (this.attrs.kind === 'TRACKS') {
        globals.frontendLocalState.updateLocalLimits(
            0, this.parentWidth - TRACK_SHELL_WIDTH);
      }
      this.redrawCanvas();
    }
  }

  private updateCanvasDimensions() {
    this.canvasHeight = Math.floor(
        this.attrs.doesScroll ? this.parentHeight * this.canvasOverdrawFactor :
                                this.totalPanelHeight);
    const ctx = assertExists(this.ctx);
    const canvas = assertExists(ctx.canvas);
    canvas.style.height = `${this.canvasHeight}px`;

    // If're we're non-scrolling canvas and the scroll-limiter should always
    // have the same height. Enforce this by explicitly setting the height.
    if (!this.attrs.doesScroll) {
      const scrollLimiter = canvas.parentElement;
      if (scrollLimiter) {
        scrollLimiter.style.height = `${this.canvasHeight}px`;
      }
    }

    const dpr = window.devicePixelRatio;
    ctx.canvas.width = this.parentWidth * dpr;
    ctx.canvas.height = this.canvasHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  private repositionCanvas() {
    const canvas = assertExists(assertExists(this.ctx).canvas);
    const canvasYStart =
        Math.floor(this.scrollTop - this.getCanvasOverdrawHeightPerSide());
    canvas.style.transform = `translateY(${canvasYStart}px)`;
  }

  // Reads dimensions of parent node. Returns true if read dimensions are
  // different from what was cached in the state.
  private readParentSizeFromDom(dom: Element): boolean {
    const oldWidth = this.parentWidth;
    const oldHeight = this.parentHeight;
    const clientRect = assertExists(dom.parentElement).getBoundingClientRect();
    // On non-MacOS if there is a solid scroll bar it can cover important
    // pixels, reduce the size of the canvas so it doesn't overlap with
    // the scroll bar.
    this.parentWidth =
        clientRect.width - globals.frontendLocalState.getScrollbarWidth();
    this.parentHeight = clientRect.height;
    return this.parentHeight !== oldHeight || this.parentWidth !== oldWidth;
  }

  // Reads dimensions of panels. Returns true if total panel height is different
  // from what was cached in state.
  private readPanelHeightsFromDom(dom: Element): boolean {
    const prevHeight = this.totalPanelHeight;
    this.panelInfos = [];
    this.totalPanelHeight = 0;
    const domRect = dom.getBoundingClientRect();
    this.panelContainerTop = domRect.y;
    this.panelContainerHeight = domRect.height;

    dom.parentElement!.querySelectorAll('.panel').forEach((panel) => {
      const key = assertExists(panel.getAttribute('data-key'));
      const vnode = assertExists(this.panelByKey.get(key));

      // NOTE: the id can be undefined for singletons like overview timeline.
      const id = vnode.attrs.id || vnode.attrs.trackGroupId || '';
      const rect = panel.getBoundingClientRect();
      this.panelInfos.push({
        id,
        height: rect.height,
        width: rect.width,
        x: rect.x,
        y: rect.y,
        vnode,
      });
      this.totalPanelHeight += rect.height;
    });

    return this.totalPanelHeight !== prevHeight;
  }

  private overlapsCanvas(yStart: number, yEnd: number) {
    return yEnd > 0 && yStart < this.canvasHeight;
  }

  private redrawCanvas() {
    const redrawStart = debugNow();
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.parentWidth, this.canvasHeight);
    const canvasYStart =
        Math.floor(this.scrollTop - this.getCanvasOverdrawHeightPerSide());

    this.handleAreaSelection();

    let panelYStart = 0;
    let totalOnCanvas = 0;
    const flowEventsRendererArgs =
        new FlowEventsRendererArgs(this.parentWidth, this.canvasHeight);
    for (let i = 0; i < this.panelInfos.length; i++) {
      const panel = this.panelInfos[i].vnode;
      const panelHeight = this.panelInfos[i].height;
      const yStartOnCanvas = panelYStart - canvasYStart;

      if (!isPanelVNode(panel)) {
        throw new Error('Vnode passed to panel container is not a panel');
      }

      flowEventsRendererArgs.registerPanel(panel, yStartOnCanvas, panelHeight);

      if (!this.overlapsCanvas(yStartOnCanvas, yStartOnCanvas + panelHeight)) {
        panelYStart += panelHeight;
        continue;
      }

      totalOnCanvas++;

      this.ctx.save();
      this.ctx.translate(0, yStartOnCanvas);
      const clipRect = new Path2D();
      const size = {width: this.parentWidth, height: panelHeight};
      clipRect.rect(0, 0, size.width, size.height);
      this.ctx.clip(clipRect);
      const beforeRender = debugNow();
      panel.state.renderCanvas(this.ctx, size, panel);
      this.updatePanelStats(
          i, panel.state, debugNow() - beforeRender, this.ctx, size);
      this.ctx.restore();
      panelYStart += panelHeight;
    }

    this.drawTopLayerOnCanvas();
    this.flowEventsRenderer.render(this.ctx, flowEventsRendererArgs);
    // Collect performance as the last thing we do.
    const redrawDur = debugNow() - redrawStart;
    this.updatePerfStats(redrawDur, this.panelInfos.length, totalOnCanvas);
  }

  // The panels each draw on the canvas but some details need to be drawn across
  // the whole canvas rather than per panel.
  private drawTopLayerOnCanvas() {
    if (!this.ctx) return;
    const area = globals.frontendLocalState.selectedArea;
    if (area === undefined ||
        globals.frontendLocalState.areaY.start === undefined ||
        globals.frontendLocalState.areaY.end === undefined) {
      return;
    }
    if (this.panelInfos.length === 0 || area.tracks.length === 0) return;

    // Find the minY and maxY of the selected tracks in this panel container.
    let selectedTracksMinY = this.panelContainerHeight + this.panelContainerTop;
    let selectedTracksMaxY = this.panelContainerTop;
    let trackFromCurrentContainerSelected = false;
    for (let i = 0; i < this.panelInfos.length; i++) {
      if (area.tracks.includes(this.panelInfos[i].id)) {
        trackFromCurrentContainerSelected = true;
        selectedTracksMinY = Math.min(selectedTracksMinY, this.panelInfos[i].y);
        selectedTracksMaxY = Math.max(
            selectedTracksMaxY,
            this.panelInfos[i].y + this.panelInfos[i].height);
      }
    }

    // No box should be drawn if there are no selected tracks in the current
    // container.
    if (!trackFromCurrentContainerSelected) {
      return;
    }

    const startX = globals.frontendLocalState.timeScale.timeToPx(area.startSec);
    const endX = globals.frontendLocalState.timeScale.timeToPx(area.endSec);
    // To align with where to draw on the canvas subtract the first panel Y.
    selectedTracksMinY -= this.panelContainerTop;
    selectedTracksMaxY -= this.panelContainerTop;
    this.ctx.save();
    this.ctx.strokeStyle = SELECTION_STROKE_COLOR;
    this.ctx.lineWidth = 1;
    const canvasYStart =
        Math.floor(this.scrollTop - this.getCanvasOverdrawHeightPerSide());
    this.ctx.translate(TRACK_SHELL_WIDTH, -canvasYStart);
    this.ctx.strokeRect(
        startX,
        selectedTracksMaxY,
        endX - startX,
        selectedTracksMinY - selectedTracksMaxY);
    this.ctx.restore();
  }

  private updatePanelStats(
      panelIndex: number, panel: Panel, renderTime: number,
      ctx: CanvasRenderingContext2D, size: PanelSize) {
    if (!perfDebug()) return;
    let renderStats = this.panelPerfStats.get(panel);
    if (renderStats === undefined) {
      renderStats = new RunningStatistics();
      this.panelPerfStats.set(panel, renderStats);
    }
    renderStats.addValue(renderTime);

    const statW = 300;
    ctx.fillStyle = 'hsl(97, 100%, 96%)';
    ctx.fillRect(size.width - statW, size.height - 20, statW, 20);
    ctx.fillStyle = 'hsla(122, 77%, 22%)';
    const statStr = `Panel ${panelIndex + 1} | ` + runningStatStr(renderStats);
    ctx.fillText(statStr, size.width - statW, size.height - 10);
  }

  private updatePerfStats(
      renderTime: number, totalPanels: number, panelsOnCanvas: number) {
    if (!perfDebug()) return;
    this.perfStats.renderStats.addValue(renderTime);
    this.perfStats.totalPanels = totalPanels;
    this.perfStats.panelsOnCanvas = panelsOnCanvas;
  }

  renderPerfStats(index: number) {
    assertTrue(perfDebug());
    return [m(
        'section',
        m('div', `Panel Container ${index + 1}`),
        m('div',
          `${this.perfStats.totalPanels} panels, ` +
              `${this.perfStats.panelsOnCanvas} on canvas.`),
        m('div', runningStatStr(this.perfStats.renderStats)))];
  }

  private getCanvasOverdrawHeightPerSide() {
    const overdrawHeight = (this.canvasOverdrawFactor - 1) * this.parentHeight;
    return overdrawHeight / 2;
  }
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {channelChanged, getNextChannel, setChannel} from '../common/channels';

import {globals} from './globals';
import {createPage} from './pages';


export const HomePage = createPage({
  view() {
    return m(
        '.page.home-page',
        m(
            '.home-page-center',
            m('.home-page-title', 'Perfetto'),
            m(`img.logo[src=${globals.root}assets/logo-3d.png]`),
            m(
                'div.channel-select',
                m('div',
                  'Feeling adventurous? Try our bleeding edge Canary version'),
                m(
                    'fieldset',
                    mkChan('stable'),
                    mkChan('canary'),
                    m('.highlight'),
                    ),
                m(`.home-page-reload${channelChanged() ? '.show' : ''}`,
                  'You need to reload the page for the changes to have effect'),
                ),
            ),
        m('a.privacy',
          {href: 'https://policies.google.com/privacy', target: '_blank'},
          'Privacy policy'));
  },
});

function mkChan(chan: string) {
  const checked = getNextChannel() === chan ? '[checked=true]' : '';
  return [
    m(`input[type=radio][name=chan][id=chan_${chan}]${checked}`, {
      onchange: () => {
        setChannel(chan);
      },
    }),
    m(`label[for=chan_${chan}]`, chan),
  ];
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';

import {onClickCopy} from './clipboard';
import {CookieConsent} from './cookie_consent';
import {globals} from './globals';
import {fullscreenModalContainer} from './modal';
import {Sidebar} from './sidebar';
import {Topbar} from './topbar';

function renderPermalink(): m.Children {
  const permalink = globals.state.permalink;
  if (!permalink.requestId || !permalink.hash) return null;
  const url = `${self.location.origin}/#!/?s=${permalink.hash}`;
  const linkProps = {title: 'Click to copy the URL', onclick: onClickCopy(url)};

  return m('.alert-permalink', [
    m('div', 'Permalink: ', m(`a[href=${url}]`, linkProps, url)),
    m('button',
      {
        onclick: () => globals.dispatch(Actions.clearPermalink({})),
      },
      m('i.material-icons.disallow-selection', 'close')),
  ]);
}

class Alerts implements m.ClassComponent {
  view() {
    return m('.alerts', renderPermalink());
  }
}

// Wrap component with common UI elements (nav bar etc).
export function createPage(component: m.Component<PageAttrs>):
    m.Component<PageAttrs> {
  const pageComponent = {
    view({attrs}: m.Vnode<PageAttrs>) {
      const children = [
        m(Sidebar),
        m(Topbar),
        m(Alerts),
        m(component, attrs),
        m(CookieConsent),
        m(fullscreenModalContainer.mithrilComponent),
      ];
      if (globals.state.perfDebug) {
        children.push(m('.perf-stats'));
      }
      return children;
    },
  };

  return pageComponent;
}

export interface PageAttrs {
  subpage?: string;
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {CacheKey, TrackCache} from './track_cache';

test('cacheKeys', () => {
  const k = CacheKey.create(201, 302, 123);
  const n = k.normalize();
  const n2 = n.normalize();
  expect(k.isNormalized()).toEqual(false);
  expect(n.isNormalized()).toEqual(true);
  expect(n2.isNormalized()).toEqual(true);
  expect(n).toEqual(n2);
  expect(n.startNs).toBeLessThanOrEqual(k.startNs);
  expect(n.endNs).toBeGreaterThanOrEqual(k.startNs);
  expect(n.bucketNs).toBeGreaterThanOrEqual(k.bucketNs);
  expect(Math.abs(n.windowSizePx - k.windowSizePx)).toBeLessThanOrEqual(200);
});

test('cache', () => {
  const k1 = (CacheKey.create(1000, 1100, 100)).normalize();
  const k2 = (CacheKey.create(2000, 2100, 100)).normalize();
  const k3 = (CacheKey.create(3000, 3100, 100)).normalize();
  const k4 = (CacheKey.create(4000, 4100, 100)).normalize();
  const k5 = (CacheKey.create(5000, 5100, 100)).normalize();
  const k6 = (CacheKey.create(6000, 6100, 100)).normalize();
  const k7 = (CacheKey.create(7000, 7100, 100)).normalize();
  const cache = new TrackCache<string>(5);

  cache.insert(k1, 'v1');
  expect(cache.lookup(k1)).toEqual('v1');

  cache.insert(k2, 'v2');
  cache.insert(k3, 'v3');
  cache.insert(k4, 'v4');
  cache.insert(k5, 'v5');

  // Should push k1/v1 out of the cache:
  cache.insert(k6, 'v6');
  expect(cache.lookup(k1)).toEqual(undefined);

  // Access k2 then add one more entry:
  expect(cache.lookup(k2)).toEqual('v2');
  cache.insert(k7, 'v7');

  // k2/v2 should still be present but k3/v3 should be discarded:
  expect(cache.lookup(k2)).toEqual('v2');
  expect(cache.lookup(k3)).toEqual(undefined);
});
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {defer} from '../base/deferred';
import {TaskTracker} from './task_tracker';

test('it starts with no pending tasks', () => {
  const tracker = new TaskTracker();
  expect(tracker.hasPendingTasks()).toEqual(false);
  expect(tracker.progressMessage()).toEqual(undefined);
});

test('it knows if a task is pending', () => {
  const tracker = new TaskTracker();
  const deferred = defer();

  tracker.trackPromise(deferred, 'Some task');

  expect(tracker.hasPendingTasks()).toEqual(true);
  expect(tracker.progressMessage()).toEqual('Some task (0s)');
  deferred.resolve();
});

// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const LOADING_TEXT = 'Loading...';
let LOADING_TEXT_WIDTH = 0;

// Checker board the range [leftPx, rightPx].
export function checkerboard(
    ctx: CanvasRenderingContext2D,
    heightPx: number,
    leftPx: number,
    rightPx: number): void {
  const widthPx = rightPx - leftPx;
  ctx.font = '12px Roboto Condensed';
  ctx.fillStyle = '#eee';
  ctx.fillRect(leftPx, 0, widthPx, heightPx);
  ctx.fillStyle = '#666';
  const oldBaseline = ctx.textBaseline;
  ctx.textBaseline = 'middle';
  if (LOADING_TEXT_WIDTH === 0) {
    LOADING_TEXT_WIDTH = ctx.measureText(LOADING_TEXT).width;
  }
  if (LOADING_TEXT_WIDTH <= widthPx) {
    ctx.fillText(
        LOADING_TEXT,
        leftPx + widthPx / 2 - LOADING_TEXT_WIDTH / 2,
        heightPx / 2);
  }
  ctx.textBaseline = oldBaseline;
}

// Checker board everything between [startPx, endPx] except [leftPx, rightPx].
export function checkerboardExcept(
    ctx: CanvasRenderingContext2D,
    heightPx: number,
    startPx: number,
    endPx: number,
    leftPx: number,
    rightPx: number): void {
  // [leftPx, rightPx] doesn't overlap [startPx, endPx] at all:
  if (rightPx <= startPx || leftPx >= endPx) {
    checkerboard(ctx, heightPx, startPx, endPx);
    return;
  }

  // Checkerboard [startPx, leftPx]:
  if (leftPx > startPx) {
    checkerboard(ctx, heightPx, startPx, leftPx);
  }

  // Checkerboard [rightPx, endPx]:
  if (rightPx < endPx) {
    checkerboard(ctx, heightPx, rightPx, endPx);
  }
}
/*
 * Copyright (C) 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import m from 'mithril';

import {DropDirection} from '../common/dragndrop_logic';

import {globals} from './globals';

export interface ReorderableCell {
  content: m.Children;
  extraClass?: string;
}

export interface ReorderableCellGroupAttrs {
  cells: ReorderableCell[];
  onReorder: (from: number, to: number, side: DropDirection) => void;
}

const placeholderElement = document.createElement('span');

// A component that renders a group of cells on the same row that can be
// reordered between each other by using drag'n'drop.
//
// On completed reorder, a callback is fired.
export class ReorderableCellGroup implements
    m.ClassComponent<ReorderableCellGroupAttrs> {
  // Index of a cell being dragged.
  draggingFrom: number = -1;

  // Index of a cell cursor is hovering over.
  draggingTo: number = -1;

  // Whether the cursor hovering on the left or right side of the element: used
  // to add the dragged element either before or after the drop target.
  dropDirection: DropDirection = 'left';

  // Auxillary array used to count entrances into `dragenter` event: these are
  // incremented not only when hovering over a cell, but also for any child of
  // the tree.
  enterCounters: number[] = [];

  getClassForIndex(index: number): string {
    if (this.draggingFrom === index) {
      return 'dragged';
    }
    if (this.draggingTo === index) {
      return this.dropDirection === 'left' ? 'highlight-left' :
                                             'highlight-right';
    }
    return '';
  }

  view(vnode: m.Vnode<ReorderableCellGroupAttrs>): m.Children {
    return vnode.attrs.cells.map(
        (cell, index) => m(
            `td.reorderable-cell${cell.extraClass ?? ''}`,
            {
              draggable: 'draggable',
              class: this.getClassForIndex(index),
              ondragstart: (e: DragEvent) => {
                this.draggingFrom = index;
                if (e.dataTransfer !== null) {
                  e.dataTransfer.setDragImage(placeholderElement, 0, 0);
                }

                globals.rafScheduler.scheduleFullRedraw();
              },
              ondragover: (e: DragEvent) => {
                let target = e.target as HTMLElement;
                if (this.draggingFrom === index || this.draggingFrom === -1) {
                  // Don't do anything when hovering on the same cell that's
                  // been dragged, or when dragging something other than the
                  // cell from the same group
                  return;
                }

                while (target.tagName.toLowerCase() !== 'td' &&
                       target.parentElement !== null) {
                  target = target.parentElement;
                }

                // When hovering over cell on the right half, the cell will be
                // moved to the right of it, vice versa for the left side. This
                // is done such that it's possible to put dragged cell to every
                // possible position.
                const offset = e.clientX - target.getBoundingClientRect().x;
                const newDropDirection =
                    (offset > target.clientWidth / 2) ? 'right' : 'left';
                const redraw = (newDropDirection !== this.dropDirection) ||
                    (index !== this.draggingTo);
                this.dropDirection = newDropDirection;
                this.draggingTo = index;


                if (redraw) {
                  globals.rafScheduler.scheduleFullRedraw();
                }
              },
              ondragenter: (e: DragEvent) => {
                this.enterCounters[index]++;

                if (this.enterCounters[index] === 1 &&
                    e.dataTransfer !== null) {
                  e.dataTransfer.dropEffect = 'move';
                }
              },
              ondragleave: (e: DragEvent) => {
                this.enterCounters[index]--;
                if (this.draggingFrom === -1 || this.enterCounters[index] > 0) {
                  return;
                }

                if (e.dataTransfer !== null) {
                  e.dataTransfer.dropEffect = 'none';
                }

                this.draggingTo = -1;
                globals.rafScheduler.scheduleFullRedraw();
              },
              ondragend: () => {
                if (this.draggingTo !== this.draggingFrom &&
                    this.draggingTo !== -1) {
                  vnode.attrs.onReorder(
                      this.draggingFrom, this.draggingTo, this.dropDirection);
                }

                this.draggingFrom = -1;
                this.draggingTo = -1;
                globals.rafScheduler.scheduleFullRedraw();
              },
            },
            cell.content));
  }

  oncreate(vnode: m.VnodeDOM<ReorderableCellGroupAttrs, this>) {
    this.enterCounters = Array(vnode.attrs.cells.length).fill(0);
  }

  onupdate(vnode: m.VnodeDOM<ReorderableCellGroupAttrs, this>) {
    if (this.enterCounters.length !== vnode.attrs.cells.length) {
      this.enterCounters = Array(vnode.attrs.cells.length).fill(0);
    }
  }
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Actions} from '../common/actions';
import {
  Color,
  hslForSlice,
} from '../common/colorizer';
import {STR_NULL} from '../common/query_result';

import {
  BASE_SLICE_ROW,
  BaseSliceTrack,
  BaseSliceTrackTypes,
  OnSliceClickArgs,
  OnSliceOverArgs,
} from './base_slice_track';
import {globals} from './globals';
import {NewTrackArgs} from './track';

export const NAMED_SLICE_ROW = {
  // Base columns (tsq, ts, dur, id, depth).
  ...BASE_SLICE_ROW,

  // Impl-specific columns.
  name: STR_NULL,
};
export type NamedSliceRow = typeof NAMED_SLICE_ROW;

export interface NamedSliceTrackTypes extends BaseSliceTrackTypes {
  row: NamedSliceRow;
}

export abstract class NamedSliceTrack<
    T extends NamedSliceTrackTypes = NamedSliceTrackTypes> extends
    BaseSliceTrack<T> {
  constructor(args: NewTrackArgs) {
    super(args);
  }

  // This is used by the base class to call iter().
  getRowSpec(): T['row'] {
    return NAMED_SLICE_ROW;
  }

  // Converts a SQL result row to an "Impl" Slice.
  rowToSlice(row: T['row']): T['slice'] {
    const baseSlice = super.rowToSlice(row);
    // Ignore PIDs or numeric arguments when hashing.
    const name = row.name || '';
    const nameForHashing = name.replace(/\s?\d+/g, '');
    const hsl = hslForSlice(nameForHashing, /* isSelected=*/ false);
    // We cache the color so we hash only once per query.
    const baseColor: Color = {c: '', h: hsl[0], s: hsl[1], l: hsl[2]};
    return {...baseSlice, title: name, baseColor};
  }

  onSliceOver(args: OnSliceOverArgs<T['slice']>) {
    const name = args.slice.title;
    args.tooltip = [name];
  }

  onSliceClick(args: OnSliceClickArgs<T['slice']>) {
    globals.makeSelection(Actions.selectChromeSlice({
      id: args.slice.id,
      trackId: this.trackId,

      // |table| here can be either 'slice' or 'annotation'. The
      // AnnotationSliceTrack overrides the onSliceClick and sets this to
      // 'annotation'
      table: 'slice',
    }));
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {SortDirection} from '../common/state';

import {globals} from './globals';

export interface RegularPopupMenuItem {
  itemType: 'regular';
  // Display text
  text: string;
  // Action on menu item click
  callback: () => void;
}

// Helper function for simplifying defining menus.
export function menuItem(
    text: string, action: () => void): RegularPopupMenuItem {
  return {
    itemType: 'regular',
    text,
    callback: action,
  };
}

export interface GroupPopupMenuItem {
  itemType: 'group';
  text: string;
  itemId: string;
  children: PopupMenuItem[];
}

export type PopupMenuItem = RegularPopupMenuItem|GroupPopupMenuItem;

export interface PopupMenuButtonAttrs {
  // Icon for button opening a menu
  icon: string;
  // List of popup menu items
  items: PopupMenuItem[];
}

// To ensure having at most one popup menu on the screen at a time, we need to
// listen to click events on the whole page and close currently opened popup, if
// there's any. This class, used as a singleton, does exactly that.
class PopupHolder {
  // Invariant: global listener should be register if and only if this.popup is
  // not undefined.
  popup: PopupMenuButton|undefined = undefined;
  initialized = false;
  listener: (e: MouseEvent) => void;

  constructor() {
    this.listener = (e: MouseEvent) => {
      // Only handle those events that are not part of dropdown menu themselves.
      const hasDropdown =
          e.composedPath().find(PopupHolder.isDropdownElement) !== undefined;
      if (!hasDropdown) {
        this.ensureHidden();
      }
    };
  }

  static isDropdownElement(target: EventTarget) {
    if (target instanceof HTMLElement) {
      return target.tagName === 'DIV' && target.classList.contains('dropdown');
    }
    return false;
  }

  ensureHidden() {
    if (this.popup !== undefined) {
      this.popup.setVisible(false);
    }
  }

  clear() {
    if (this.popup !== undefined) {
      this.popup = undefined;
      window.removeEventListener('click', this.listener);
    }
  }

  showPopup(popup: PopupMenuButton) {
    this.ensureHidden();
    this.popup = popup;
    window.addEventListener('click', this.listener);
  }
}

// Singleton instance of PopupHolder
const popupHolder = new PopupHolder();

// For a table column that can be sorted; the standard popup icon should
// reflect the current sorting direction. This function returns an icon
// corresponding to optional SortDirection according to which the column is
// sorted. (Optional because column might be unsorted)
export function popupMenuIcon(sortDirection?: SortDirection) {
  switch (sortDirection) {
    case undefined:
      return 'more_horiz';
    case 'DESC':
      return 'arrow_drop_down';
    case 'ASC':
      return 'arrow_drop_up';
  }
}

// Component that displays a button that shows a popup menu on click.
export class PopupMenuButton implements m.ClassComponent<PopupMenuButtonAttrs> {
  popupShown = false;
  expandedGroups: Set<string> = new Set();

  setVisible(visible: boolean) {
    this.popupShown = visible;
    if (this.popupShown) {
      popupHolder.showPopup(this);
    } else {
      popupHolder.clear();
    }
    globals.rafScheduler.scheduleFullRedraw();
  }

  renderItem(item: PopupMenuItem): m.Child {
    switch (item.itemType) {
      case 'regular':
        return m(
            'button.open-menu',
            {
              onclick: () => {
                item.callback();
                // Hide the menu item after the action has been invoked
                this.setVisible(false);
              },
            },
            item.text);
      case 'group':
        const isExpanded = this.expandedGroups.has(item.itemId);
        return m(
            'div',
            m('button.open-menu.disallow-selection',
              {
                onclick: () => {
                  if (this.expandedGroups.has(item.itemId)) {
                    this.expandedGroups.delete(item.itemId);
                  } else {
                    this.expandedGroups.add(item.itemId);
                  }
                  globals.rafScheduler.scheduleFullRedraw();
                },
              },
              // Show text with up/down arrow, depending on expanded state.
              item.text + (isExpanded ? ' \u25B2' : ' \u25BC')),
            isExpanded ? m('div.nested-menu',
                           item.children.map((item) => this.renderItem(item))) :
                         null);
    }
  }

  view(vnode: m.Vnode<PopupMenuButtonAttrs, this>) {
    return m(
        '.dropdown',
        m(
            '.dropdown-button',
            {
              onclick: () => {
                this.setVisible(!this.popupShown);
              },
            },
            vnode.children,
            m('i.material-icons', vnode.attrs.icon),
            ),
        m(this.popupShown ? '.popup-menu.opened' : '.popup-menu.closed',
          vnode.attrs.items.map((item) => this.renderItem(item))));
  }
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {assertTrue} from '../base/logging';

import {globals} from './globals';

import {
  debugNow,
  measure,
  perfDebug,
  perfDisplay,
  RunningStatistics,
  runningStatStr,
} from './perf';

function statTableHeader() {
  return m(
      'tr',
      m('th', ''),
      m('th', 'Last (ms)'),
      m('th', 'Avg (ms)'),
      m('th', 'Avg-10 (ms)'));
}

function statTableRow(title: string, stat: RunningStatistics) {
  return m(
      'tr',
      m('td', title),
      m('td', stat.last.toFixed(2)),
      m('td', stat.mean.toFixed(2)),
      m('td', stat.bufferMean.toFixed(2)));
}

export type ActionCallback = (nowMs: number) => void;
export type RedrawCallback = (nowMs: number) => void;

// This class orchestrates all RAFs in the UI. It ensures that there is only
// one animation frame handler overall and that callbacks are called in
// predictable order. There are two types of callbacks here:
// - actions (e.g. pan/zoon animations), which will alter the "fast"
//  (main-thread-only) state (e.g. update visible time bounds @ 60 fps).
// - redraw callbacks that will repaint canvases.
// This class guarantees that, on each frame, redraw callbacks are called after
// all action callbacks.
export class RafScheduler {
  private actionCallbacks = new Set<ActionCallback>();
  private canvasRedrawCallbacks = new Set<RedrawCallback>();
  private _syncDomRedraw: RedrawCallback = (_) => {};
  private hasScheduledNextFrame = false;
  private requestedFullRedraw = false;
  private isRedrawing = false;
  private _shutdown = false;

  private perfStats = {
    rafActions: new RunningStatistics(),
    rafCanvas: new RunningStatistics(),
    rafDom: new RunningStatistics(),
    rafTotal: new RunningStatistics(),
    domRedraw: new RunningStatistics(),
  };

  start(cb: ActionCallback) {
    this.actionCallbacks.add(cb);
    this.maybeScheduleAnimationFrame();
  }

  stop(cb: ActionCallback) {
    this.actionCallbacks.delete(cb);
  }

  addRedrawCallback(cb: RedrawCallback) {
    this.canvasRedrawCallbacks.add(cb);
  }

  removeRedrawCallback(cb: RedrawCallback) {
    this.canvasRedrawCallbacks.delete(cb);
  }

  // Schedule re-rendering of canvas only.
  scheduleRedraw() {
    this.maybeScheduleAnimationFrame(true);
  }

  shutdown() {
    this._shutdown = true;
  }

  set domRedraw(cb: RedrawCallback) {
    this._syncDomRedraw = cb;
  }

  // Schedule re-rendering of virtual DOM and canvas.
  scheduleFullRedraw() {
    this.requestedFullRedraw = true;
    this.maybeScheduleAnimationFrame(true);
  }

  syncDomRedraw(nowMs: number) {
    const redrawStart = debugNow();
    this._syncDomRedraw(nowMs);
    if (perfDebug()) {
      this.perfStats.domRedraw.addValue(debugNow() - redrawStart);
    }
  }

  get hasPendingRedraws(): boolean {
    return this.isRedrawing || this.hasScheduledNextFrame;
  }

  private syncCanvasRedraw(nowMs: number) {
    const redrawStart = debugNow();
    if (this.isRedrawing) return;
    globals.frontendLocalState.clearVisibleTracks();
    this.isRedrawing = true;
    for (const redraw of this.canvasRedrawCallbacks) redraw(nowMs);
    this.isRedrawing = false;
    globals.frontendLocalState.sendVisibleTracks();
    if (perfDebug()) {
      this.perfStats.rafCanvas.addValue(debugNow() - redrawStart);
    }
  }

  private maybeScheduleAnimationFrame(force = false) {
    if (this.hasScheduledNextFrame) return;
    if (this.actionCallbacks.size !== 0 || force) {
      this.hasScheduledNextFrame = true;
      window.requestAnimationFrame(this.onAnimationFrame.bind(this));
    }
  }

  private onAnimationFrame(nowMs: number) {
    if (this._shutdown) return;
    const rafStart = debugNow();
    this.hasScheduledNextFrame = false;

    const doFullRedraw = this.requestedFullRedraw;
    this.requestedFullRedraw = false;

    const actionTime = measure(() => {
      for (const action of this.actionCallbacks) action(nowMs);
    });

    const domTime = measure(() => {
      if (doFullRedraw) this.syncDomRedraw(nowMs);
    });
    const canvasTime = measure(() => this.syncCanvasRedraw(nowMs));

    const totalRafTime = debugNow() - rafStart;
    this.updatePerfStats(actionTime, domTime, canvasTime, totalRafTime);
    perfDisplay.renderPerfStats();

    this.maybeScheduleAnimationFrame();
  }

  private updatePerfStats(
      actionsTime: number, domTime: number, canvasTime: number,
      totalRafTime: number) {
    if (!perfDebug()) return;
    this.perfStats.rafActions.addValue(actionsTime);
    this.perfStats.rafDom.addValue(domTime);
    this.perfStats.rafCanvas.addValue(canvasTime);
    this.perfStats.rafTotal.addValue(totalRafTime);
  }

  renderPerfStats() {
    assertTrue(perfDebug());
    return m(
        'div',
        m('div',
          [
            m('button',
              {onclick: () => this.scheduleRedraw()},
              'Do Canvas Redraw'),
            '   |   ',
            m('button',
              {onclick: () => this.scheduleFullRedraw()},
              'Do Full Redraw'),
          ]),
        m('div',
          'Raf Timing ' +
              '(Total may not add up due to imprecision)'),
        m('table',
          statTableHeader(),
          statTableRow('Actions', this.perfStats.rafActions),
          statTableRow('Dom', this.perfStats.rafDom),
          statTableRow('Canvas', this.perfStats.rafCanvas),
          statTableRow('Total', this.perfStats.rafTotal)),
        m('div',
          'Dom redraw: ' +
              `Count: ${this.perfStats.domRedraw.count} | ` +
              runningStatStr(this.perfStats.domRedraw)));
  }
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {globals} from './globals';

export class Animation {
  private startMs = 0;
  private endMs = 0;
  private boundOnAnimationFrame = this.onAnimationFrame.bind(this);

  constructor(private onAnimationStep: (timeSinceStartMs: number) => void) {}

  start(durationMs: number) {
    const nowMs = performance.now();

    // If the animation is already happening, just update its end time.
    if (nowMs <= this.endMs) {
      this.endMs = nowMs + durationMs;
      return;
    }
    this.startMs = nowMs;
    this.endMs = nowMs + durationMs;
    globals.rafScheduler.start(this.boundOnAnimationFrame);
  }

  stop() {
    this.endMs = 0;
    globals.rafScheduler.stop(this.boundOnAnimationFrame);
  }

  get startTimeMs(): number {
    return this.startMs;
  }

  private onAnimationFrame(nowMs: number) {
    if (nowMs >= this.endMs) {
      globals.rafScheduler.stop(this.boundOnAnimationFrame);
      return;
    }
    this.onAnimationStep(Math.max(Math.round(nowMs - this.startMs), 0));
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Initiate download of a resource identified by |url| into |filename|.
export function downloadUrl(fileName: string, url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Initiate download of |data| a file with a given name.
export function downloadData(fileName: string, ...data: Uint8Array[]) {
  const blob = new Blob(data, {type: 'application/octet-stream'});
  const url = URL.createObjectURL(blob);
  downloadUrl(fileName, url);
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {assertExists} from '../base/logging';
import {Actions} from '../common/actions';
import {HttpRpcEngine, RPC_URL} from '../common/http_rpc_engine';
import {StatusResult} from '../common/protos';
import {VERSION} from '../gen/perfetto_version';
import {perfetto} from '../gen/protos';

import {globals} from './globals';
import {showModal} from './modal';

const CURRENT_API_VERSION = perfetto.protos.TraceProcessorApiVersion
                                .TRACE_PROCESSOR_CURRENT_API_VERSION;

const PROMPT = `Trace Processor Native Accelerator detected on ${RPC_URL} with:
$loadedTraceName

YES, use loaded trace:
Will load from the current state of Trace Processor. If you did run
trace_processor_shell --httpd file.pftrace this is likely what you want.

YES, but reset state:
Use this if you want to open another trace but still use the
accelerator. This is the equivalent of killing and restarting
trace_processor_shell --httpd.

NO, Use builtin WASM:
Will not use the accelerator in this tab.

Using the native accelerator has some minor caveats:
- Only one tab can be using the accelerator.
- Sharing, downloading and conversion-to-legacy aren't supported.
- You may encounter UI errors if the Trace Processor version you are using is
too old. Get the latest version from get.perfetto.dev/trace_processor.
`;


const MSG_TOO_OLD = `The Trace Processor instance on ${RPC_URL} is too old.

This UI requires TraceProcessor features that are not present in the
Trace Processor native accelerator you are currently running.
If you continue, this is almost surely going to cause UI failures.

Please update your local Trace Processor binary:

curl -LO https://get.perfetto.dev/trace_processor
chmod +x ./trace_processor
./trace_processor --httpd

UI version: ${VERSION}
TraceProcessor RPC API required: ${CURRENT_API_VERSION} or higher

TraceProcessor version: $tpVersion
RPC API: $tpApi
`;

let forceUseOldVersion = false;

// Try to connect to the external Trace Processor HTTP RPC accelerator (if
// available, often it isn't). If connected it will populate the
// |httpRpcState| in the frontend local state. In turn that will show the UI
// chip in the sidebar. trace_controller.ts will repeat this check before
// trying to load a new trace. We do this ahead of time just to have a
// consistent UX (i.e. so that the user can tell if the RPC is working without
// having to open a trace).
export async function CheckHttpRpcConnection(): Promise<void> {
  const state = await HttpRpcEngine.checkConnection();
  globals.frontendLocalState.setHttpRpcState(state);
  if (!state.connected) return;
  const tpStatus = assertExists(state.status);

  if (tpStatus.apiVersion < CURRENT_API_VERSION) {
    await showDialogTraceProcessorTooOld(tpStatus);
    if (!forceUseOldVersion) return;
  }

  if (tpStatus.loadedTraceName) {
    // If a trace is already loaded in the trace processor (e.g., the user
    // launched trace_processor_shell -D trace_file.pftrace), prompt the user to
    // initialize the UI with the already-loaded trace.
    return showDialogToUsePreloadedTrace(tpStatus);
  }
}

async function showDialogTraceProcessorTooOld(tpStatus: StatusResult) {
  return showModal({
    title: 'Your Trace Processor binary is outdated',
    content:
        m('.modal-pre',
          MSG_TOO_OLD.replace('$tpVersion', tpStatus.humanReadableVersion)
              .replace('$tpApi', `${tpStatus.apiVersion}`)),
    buttons: [
      {
        text: 'Use builtin Wasm',
        primary: true,
        action: () => {
          globals.dispatch(
              Actions.setNewEngineMode({mode: 'FORCE_BUILTIN_WASM'}));
        },
      },
      {
        text: 'Use old version regardless (might crash)',
        primary: false,
        action: () => {
          forceUseOldVersion = true;
        },
      },
    ],
  });
}

async function showDialogToUsePreloadedTrace(tpStatus: StatusResult) {
  return showModal({
    title: 'Use Trace Processor Native Acceleration?',
    content:
        m('.modal-pre',
          PROMPT.replace('$loadedTraceName', tpStatus.loadedTraceName)),
    buttons: [
      {
        text: 'YES, use loaded trace',
        primary: true,
        action: () => {
          globals.dispatch(Actions.openTraceFromHttpRpc({}));
        },
      },
      {
        text: 'YES, but reset state',
      },
      {
        text: 'NO, Use builtin Wasm',
        action: () => {
          globals.dispatch(
              Actions.setNewEngineMode({mode: 'FORCE_BUILTIN_WASM'}));
        },
      },
    ],
  });
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import {TimeScale} from '../time_scale';
import {DragStrategy} from './drag_strategy';

export class InnerDragStrategy extends DragStrategy {
  private dragStartPx = 0;

  constructor(timeScale: TimeScale, private pixelBounds: [number, number]) {
    super(timeScale);
  }

  onDrag(x: number) {
    const move = x - this.dragStartPx;
    const tStart = this.timeScale.pxToTime(this.pixelBounds[0] + move);
    const tEnd = this.timeScale.pxToTime(this.pixelBounds[1] + move);
    super.updateGlobals(tStart, tEnd);
  }

  onDragStart(x: number) {
    this.dragStartPx = x;
  }
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import {TimeScale} from '../time_scale';

import {DragStrategy} from './drag_strategy';

export class BorderDragStrategy extends DragStrategy {
  private moveStart = false;

  constructor(timeScale: TimeScale, private pixelBounds: [number, number]) {
    super(timeScale);
  }

  onDrag(x: number) {
    let tStart =
        this.timeScale.pxToTime(this.moveStart ? x : this.pixelBounds[0]);
    let tEnd =
        this.timeScale.pxToTime(!this.moveStart ? x : this.pixelBounds[1]);
    if (tStart > tEnd) {
      this.moveStart = !this.moveStart;
      [tEnd, tStart] = [tStart, tEnd];
    }
    super.updateGlobals(tStart, tEnd);
    this.pixelBounds =
        [this.timeScale.timeToPx(tStart), this.timeScale.timeToPx(tEnd)];
  }

  onDragStart(x: number) {
    this.moveStart =
        Math.abs(x - this.pixelBounds[0]) < Math.abs(x - this.pixelBounds[1]);
  }
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import {DragStrategy} from './drag_strategy';

export class OuterDragStrategy extends DragStrategy {
  private dragStartPx = 0;

  onDrag(x: number) {
    const dragBeginTime = this.timeScale.pxToTime(this.dragStartPx);
    const dragEndTime = this.timeScale.pxToTime(x);
    const tStart = Math.min(dragBeginTime, dragEndTime);
    const tEnd = Math.max(dragBeginTime, dragEndTime);
    super.updateGlobals(tStart, tEnd);
  }

  onDragStart(x: number) {
    this.dragStartPx = x;
  }
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import {TimeSpan} from '../../common/time';
import {globals} from '../globals';
import {TimeScale} from '../time_scale';

export abstract class DragStrategy {
  constructor(protected timeScale: TimeScale) {}

  abstract onDrag(x: number): void;

  abstract onDragStart(x: number): void;

  protected updateGlobals(tStart: number, tEnd: number) {
    const vizTime = new TimeSpan(tStart, tEnd);
    globals.frontendLocalState.updateVisibleTime(vizTime);
    globals.rafScheduler.scheduleRedraw();
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import m from 'mithril';
import {Attributes} from 'mithril';

import {assertExists} from '../base/logging';
import {Actions} from '../common/actions';
import {
  RecordingConfigUtils,
} from '../common/recordingV2/recording_config_utils';
import {
  ChromeTargetInfo,
  RecordingTargetV2,
  TargetInfo,
} from '../common/recordingV2/recording_interfaces_v2';
import {
  RecordingPageController,
  RecordingState,
} from '../common/recordingV2/recording_page_controller';
import {
  EXTENSION_NAME,
  EXTENSION_URL,
} from '../common/recordingV2/recording_utils';
import {
  targetFactoryRegistry,
} from '../common/recordingV2/target_factory_registry';

import {globals} from './globals';
import {fullscreenModalContainer} from './modal';
import {createPage, PageAttrs} from './pages';
import {recordConfigStore} from './record_config';
import {
  Configurations,
  maybeGetActiveCss,
  PERSIST_CONFIG_FLAG,
  RECORDING_SECTIONS,
} from './record_page';
import {CodeSnippet} from './record_widgets';
import {AdvancedSettings} from './recording/advanced_settings';
import {AndroidSettings} from './recording/android_settings';
import {ChromeSettings} from './recording/chrome_settings';
import {CpuSettings} from './recording/cpu_settings';
import {GpuSettings} from './recording/gpu_settings';
import {MemorySettings} from './recording/memory_settings';
import {PowerSettings} from './recording/power_settings';
import {RecordingSectionAttrs} from './recording/recording_sections';
import {RecordingSettings} from './recording/recording_settings';
import {
  FORCE_RESET_MESSAGE,
} from './recording/recording_ui_utils';
import {addNewTarget} from './recording/reset_target_modal';

const START_RECORDING_MESSAGE = 'Start Recording';

const controller = new RecordingPageController();
const recordConfigUtils = new RecordingConfigUtils();
// Whether the target selection modal is displayed.
let shouldDisplayTargetModal: boolean = false;

// Options for displaying a target selection menu.
export interface TargetSelectionOptions {
  // css attributes passed to the mithril components which displays the target
  // selection menu.
  attributes: Attributes;
  // Whether the selection should be preceded by a text label.
  shouldDisplayLabel: boolean;
}

function isChromeTargetInfo(targetInfo: TargetInfo):
    targetInfo is ChromeTargetInfo {
  return ['CHROME', 'CHROME_OS'].includes(targetInfo.targetType);
}

function RecordHeader() {
  const platformSelection = RecordingPlatformSelection();
  const statusLabel = RecordingStatusLabel();
  const buttons = RecordingButton();
  const notes = RecordingNotes();
  if (!platformSelection && !statusLabel && !buttons && !notes) {
    // The header should not be displayed when it has no content.
    return undefined;
  }
  return m(
      '.record-header',
      m('.top-part',
        m('.target-and-status', platformSelection, statusLabel),
        buttons),
      notes);
}

function RecordingPlatformSelection() {
  // Don't show the platform selector while we are recording a trace.
  if (controller.getState() >= RecordingState.RECORDING) return undefined;

  return m(
      '.target',
      m('.chip',
        {
          onclick: () => {
            shouldDisplayTargetModal = true;
            fullscreenModalContainer.createNew(addNewTargetModal());
            globals.rafScheduler.scheduleFullRedraw();
          },
        },
        m('button', 'Add new recording target'),
        m('i.material-icons', 'add')),
      targetSelection());
}

function addNewTargetModal() {
  return {
    ...addNewTarget(controller),
    onClose: () => shouldDisplayTargetModal = false,
  };
}

export function targetSelection(): m.Vnode|undefined {
  if (!controller.shouldShowTargetSelection()) {
    return undefined;
  }

  const targets: RecordingTargetV2[] = targetFactoryRegistry.listTargets();
  const targetNames = [];
  const targetInfo = controller.getTargetInfo();
  if (!targetInfo) {
    targetNames.push(m('option', 'PLEASE_SELECT_TARGET'));
  }

  let selectedIndex = 0;
  for (let i = 0; i < targets.length; i++) {
    const targetName = targets[i].getInfo().name;
    targetNames.push(m('option', targetName));
    if (targetInfo && targetName === targetInfo.name) {
      selectedIndex = i;
    }
  }

  return m(
      'label',
      'Target platform:',
      m('select',
        {
          selectedIndex,
          onchange: (e: Event) => {
            controller.onTargetSelection((e.target as HTMLSelectElement).value);
          },
          onupdate: (select) => {
            // Work around mithril bug
            // (https://github.com/MithrilJS/mithril.js/issues/2107): We may
            // update the select's options while also changing the
            // selectedIndex at the same time. The update of selectedIndex
            // may be applied before the new options are added to the select
            // element. Because the new selectedIndex may be outside of the
            // select's options at that time, we have to reselect the
            // correct index here after any new children were added.
            (select.dom as HTMLSelectElement).selectedIndex = selectedIndex;
          },
        },
        ...targetNames),
  );
}

// This will display status messages which are informative, but do not require
// user action, such as: "Recording in progress for X seconds" in the recording
// page header.
function RecordingStatusLabel() {
  const recordingStatus = globals.state.recordingStatus;
  if (!recordingStatus) return undefined;
  return m('label', recordingStatus);
}

function Instructions(cssClass: string) {
  if (controller.getState() < RecordingState.TARGET_SELECTED) {
    return undefined;
  }
  // We will have a valid target at this step because we checked the state.
  const targetInfo = assertExists(controller.getTargetInfo());

  return m(
      `.record-section.instructions${cssClass}`,
      m('header', 'Recording command'),
      (PERSIST_CONFIG_FLAG.get()) ?
          m('button.permalinkconfig',
            {
              onclick: () => {
                globals.dispatch(
                    Actions.createPermalink({isRecordingConfig: true}));
              },
            },
            'Share recording settings') :
          null,
      RecordingSnippet(targetInfo),
      BufferUsageProgressBar(),
      m('.buttons', StopCancelButtons()));
}

function BufferUsageProgressBar() {
  // Show the Buffer Usage bar only after we start recording a trace.
  if (controller.getState() !== RecordingState.RECORDING) {
    return undefined;
  }

  controller.fetchBufferUsage();

  const bufferUsage = controller.getBufferUsagePercentage();
  // Buffer usage is not available yet on Android.
  if (bufferUsage === 0) return undefined;

  return m(
      'label',
      'Buffer usage: ',
      m('progress', {max: 100, value: bufferUsage * 100}));
}

function RecordingNotes() {
  if (controller.getState() !== RecordingState.TARGET_INFO_DISPLAYED) {
    return undefined;
  }
  // We will have a valid target at this step because we checked the state.
  const targetInfo = assertExists(controller.getTargetInfo());

  const linuxUrl = 'https://perfetto.dev/docs/quickstart/linux-tracing';
  const cmdlineUrl =
      'https://perfetto.dev/docs/quickstart/android-tracing#perfetto-cmdline';

  const notes: m.Children = [];

  const msgFeatNotSupported =
      m('span', `Some probes are only supported in Perfetto versions running
      on Android Q+. Therefore, Perfetto will sideload the latest version onto 
      the device.`);

  const msgPerfettoNotSupported = m(
      'span',
      `Perfetto is not supported natively before Android P. Therefore, Perfetto 
       will sideload the latest version onto the device.`);

  const msgLinux =
      m('.note',
        `Use this `,
        m('a', {href: linuxUrl, target: '_blank'}, `quickstart guide`),
        ` to get started with tracing on Linux.`);

  const msgLongTraces = m(
      '.note',
      `Recording in long trace mode through the UI is not supported. Please copy
    the command and `,
      m('a',
        {href: cmdlineUrl, target: '_blank'},
        `collect the trace using ADB.`));

  if (!recordConfigUtils
           .fetchLatestRecordCommand(globals.state.recordConfig, targetInfo)
           .hasDataSources) {
    notes.push(
        m('.note',
          'It looks like you didn\'t add any probes. ' +
              'Please add at least one to get a non-empty trace.'));
  }

  targetFactoryRegistry.listRecordingProblems().map((recordingProblem) => {
    if (recordingProblem.includes(EXTENSION_URL)) {
      // Special case for rendering the link to the Chrome extension.
      const parts = recordingProblem.split(EXTENSION_URL);
      notes.push(
          m('.note',
            parts[0],
            m('a', {href: EXTENSION_URL, target: '_blank'}, EXTENSION_NAME),
            parts[1]));
    }
  });

  switch (targetInfo.targetType) {
    case 'LINUX':
      notes.push(msgLinux);
      break;
    case 'ANDROID': {
      const androidApiLevel = targetInfo.androidApiLevel;
      if (androidApiLevel === 28) {
        notes.push(m('.note', msgFeatNotSupported));
      } else if (androidApiLevel && androidApiLevel <= 27) {
        notes.push(m('.note', msgPerfettoNotSupported));
      }
      break;
    }
    default:
  }

  if (globals.state.recordConfig.mode === 'LONG_TRACE') {
    notes.unshift(msgLongTraces);
  }

  return notes.length > 0 ? m('div', notes) : undefined;
}

function RecordingSnippet(targetInfo: TargetInfo) {
  // We don't need commands to start tracing on chrome
  if (isChromeTargetInfo(targetInfo)) {
    if (controller.getState() > RecordingState.AUTH_P2) {
      // If the UI has started tracing, don't display a message guiding the user
      // to start recording.
      return undefined;
    }
    return m(
        'div',
        m('label', `To trace Chrome from the Perfetto UI you just have to press
         '${START_RECORDING_MESSAGE}'.`));
  }
  return m(CodeSnippet, {text: getRecordCommand(targetInfo)});
}

function getRecordCommand(targetInfo: TargetInfo): string {
  const recordCommand = recordConfigUtils.fetchLatestRecordCommand(
      globals.state.recordConfig, targetInfo);

  const pbBase64 = recordCommand ? recordCommand.configProtoBase64 : '';
  const pbtx = recordCommand ? recordCommand.configProtoText : '';
  let cmd = '';
  if (targetInfo.targetType === 'ANDROID' &&
      targetInfo.androidApiLevel === 28) {
    cmd += `echo '${pbBase64}' | \n`;
    cmd += 'base64 --decode | \n';
    cmd += 'adb shell "perfetto -c - -o /data/misc/perfetto-traces/trace"\n';
  } else {
    cmd += targetInfo.targetType === 'ANDROID' ? 'adb shell perfetto \\\n' :
                                                 'perfetto \\\n';
    cmd += '  -c - --txt \\\n';
    cmd += '  -o /data/misc/perfetto-traces/trace \\\n';
    cmd += '<<EOF\n\n';
    cmd += pbtx;
    cmd += '\nEOF\n';
  }
  return cmd;
}

function RecordingButton() {
  if (controller.getState() !== RecordingState.TARGET_INFO_DISPLAYED ||
      !controller.canCreateTracingSession()) {
    return undefined;
  }

  // We know we have a target because we checked the state.
  const targetInfo = assertExists(controller.getTargetInfo());
  const hasDataSources =
      recordConfigUtils
          .fetchLatestRecordCommand(globals.state.recordConfig, targetInfo)
          .hasDataSources;
  if (!hasDataSources) {
    return undefined;
  }

  return m(
      '.button',
      m('button',
        {
          class: 'selected',
          onclick: () => controller.onStartRecordingPressed(),
        },
        START_RECORDING_MESSAGE));
}

function StopCancelButtons() {
  // Show the Stop/Cancel buttons only while we are recording a trace.
  if (!controller.shouldShowStopCancelButtons()) {
    return undefined;
  }

  const stop =
      m(`button.selected`, {onclick: () => controller.onStop()}, 'Stop');

  const cancel = m(`button`, {onclick: () => controller.onCancel()}, 'Cancel');

  return [stop, cancel];
}

function recordMenu(routePage: string) {
  const chromeProbe =
      m('a[href="#!/record/chrome"]',
        m(`li${routePage === 'chrome' ? '.active' : ''}`,
          m('i.material-icons', 'laptop_chromebook'),
          m('.title', 'Chrome'),
          m('.sub', 'Chrome traces')));
  const cpuProbe =
      m('a[href="#!/record/cpu"]',
        m(`li${routePage === 'cpu' ? '.active' : ''}`,
          m('i.material-icons', 'subtitles'),
          m('.title', 'CPU'),
          m('.sub', 'CPU usage, scheduling, wakeups')));
  const gpuProbe =
      m('a[href="#!/record/gpu"]',
        m(`li${routePage === 'gpu' ? '.active' : ''}`,
          m('i.material-icons', 'aspect_ratio'),
          m('.title', 'GPU'),
          m('.sub', 'GPU frequency, memory')));
  const powerProbe =
      m('a[href="#!/record/power"]',
        m(`li${routePage === 'power' ? '.active' : ''}`,
          m('i.material-icons', 'battery_charging_full'),
          m('.title', 'Power'),
          m('.sub', 'Battery and other energy counters')));
  const memoryProbe =
      m('a[href="#!/record/memory"]',
        m(`li${routePage === 'memory' ? '.active' : ''}`,
          m('i.material-icons', 'memory'),
          m('.title', 'Memory'),
          m('.sub', 'Physical mem, VM, LMK')));
  const androidProbe =
      m('a[href="#!/record/android"]',
        m(`li${routePage === 'android' ? '.active' : ''}`,
          m('i.material-icons', 'android'),
          m('.title', 'Android apps & svcs'),
          m('.sub', 'atrace and logcat')));
  const advancedProbe =
      m('a[href="#!/record/advanced"]',
        m(`li${routePage === 'advanced' ? '.active' : ''}`,
          m('i.material-icons', 'settings'),
          m('.title', 'Advanced settings'),
          m('.sub', 'Complicated stuff for wizards')));

  // We only display the probes when we have a valid target, so it's not
  // possible for the target to be undefined here.
  const targetType = assertExists(controller.getTargetInfo()).targetType;
  const probes = [];
  if (targetType === 'CHROME_OS' || targetType === 'LINUX') {
    probes.push(cpuProbe, powerProbe, memoryProbe, chromeProbe, advancedProbe);
  } else if (targetType === 'CHROME') {
    probes.push(chromeProbe);
  } else {
    probes.push(
        cpuProbe,
        gpuProbe,
        powerProbe,
        memoryProbe,
        androidProbe,
        chromeProbe,
        advancedProbe);
  }

  return m(
      '.record-menu',
      {
        class: controller.getState() > RecordingState.TARGET_INFO_DISPLAYED ?
            'disabled' :
            '',
        onclick: () => globals.rafScheduler.scheduleFullRedraw(),
      },
      m('header', 'Trace config'),
      m('ul',
        m('a[href="#!/record/buffers"]',
          m(`li${routePage === 'buffers' ? '.active' : ''}`,
            m('i.material-icons', 'tune'),
            m('.title', 'Recording settings'),
            m('.sub', 'Buffer mode, size and duration'))),
        m('a[href="#!/record/instructions"]',
          m(`li${routePage === 'instructions' ? '.active' : ''}`,
            m('i.material-icons-filled.rec', 'fiber_manual_record'),
            m('.title', 'Recording command'),
            m('.sub', 'Manually record trace'))),
        PERSIST_CONFIG_FLAG.get() ?
            m('a[href="#!/record/config"]',
              {
                onclick: () => {
                  recordConfigStore.reloadFromLocalStorage();
                },
              },
              m(`li${routePage === 'config' ? '.active' : ''}`,
                m('i.material-icons', 'save'),
                m('.title', 'Saved configs'),
                m('.sub', 'Manage local configs'))) :
            null),
      m('header', 'Probes'),
      m('ul', probes));
}

function getRecordContainer(subpage?: string): m.Vnode<any, any> {
  const components: m.Children[] = [RecordHeader()];
  if (controller.getState() === RecordingState.NO_TARGET) {
    components.push(m('.full-centered', 'Please connect a valid target.'));
    return m('.record-container', components);
  } else if (controller.getState() <= RecordingState.ASK_TO_FORCE_P1) {
    components.push(
        m('.full-centered',
          'Can not access the device without resetting the ' +
              `connection. Please refresh the page, then click ` +
              `'${FORCE_RESET_MESSAGE}.'`));
    return m('.record-container', components);
  } else if (controller.getState() === RecordingState.AUTH_P1) {
    components.push(
        m('.full-centered', 'Please allow USB debugging on the device.'));
    return m('.record-container', components);
  } else if (
      controller.getState() === RecordingState.WAITING_FOR_TRACE_DISPLAY) {
    components.push(
        m('.full-centered', 'Waiting for the trace to be collected.'));
    return m('.record-container', components);
  }

  const pages: m.Children = [];
  // we need to remove the `/` character from the route
  let routePage = subpage ? subpage.substr(1) : '';
  if (!RECORDING_SECTIONS.includes(routePage)) {
    routePage = 'buffers';
  }
  pages.push(recordMenu(routePage));

  pages.push(m(RecordingSettings, {
    dataSources: [],
    cssClass: maybeGetActiveCss(routePage, 'buffers'),
  } as RecordingSectionAttrs));
  pages.push(Instructions(maybeGetActiveCss(routePage, 'instructions')));
  pages.push(Configurations(maybeGetActiveCss(routePage, 'config')));

  const settingsSections = new Map([
    ['cpu', CpuSettings],
    ['gpu', GpuSettings],
    ['power', PowerSettings],
    ['memory', MemorySettings],
    ['android', AndroidSettings],
    ['chrome', ChromeSettings],
    ['advanced', AdvancedSettings],
  ]);
  for (const [section, component] of settingsSections.entries()) {
    pages.push(m(component, {
      dataSources: controller.getTargetInfo()?.dataSources || [],
      cssClass: maybeGetActiveCss(routePage, section),
    } as RecordingSectionAttrs));
  }

  components.push(m('.record-container-content', pages));
  return m('.record-container', components);
}

export const RecordPageV2 = createPage({

  oninit(): void {
    controller.initFactories();
  },

  view({attrs}: m.Vnode<PageAttrs>): void |
      m.Children {
        if (shouldDisplayTargetModal) {
          fullscreenModalContainer.updateVdom(addNewTargetModal());
        }

        return m(
            '.record-page',
            controller.getState() > RecordingState.TARGET_INFO_DISPLAYED ?
                m('.hider') :
                [],
            getRecordContainer(attrs.subpage));
      },
});
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {searchSegment} from '../base/binary_search';
import {Actions} from '../common/actions';
import {toNs} from '../common/time';

import {globals} from './globals';

function setToPrevious(current: number) {
  let index = current - 1;
  if (index < 0) {
    index = globals.currentSearchResults.totalResults - 1;
  }
  globals.dispatch(Actions.setSearchIndex({index}));
}

function setToNext(current: number) {
  const index =
      (current + 1) % globals.currentSearchResults.totalResults;
  globals.dispatch(Actions.setSearchIndex({index}));
}

export function executeSearch(reverse = false) {
  const index = globals.state.searchIndex;
  const startNs = toNs(globals.frontendLocalState.visibleWindowTime.start);
  const endNs = toNs(globals.frontendLocalState.visibleWindowTime.end);
  const currentTs = globals.currentSearchResults.tsStarts[index];

  // If the value of |globals.currentSearchResults.totalResults| is 0,
  // it means that the query is in progress or no results are found.
  if (globals.currentSearchResults.totalResults === 0) {
    return;
  }

  // If this is a new search or the currentTs is not in the viewport,
  // select the first/last item in the viewport.
  if (index === -1 || currentTs < startNs || currentTs > endNs) {
    if (reverse) {
      const [smaller] =
          searchSegment(globals.currentSearchResults.tsStarts, endNs);
      // If there is no item in the viewport just go to the previous.
      if (smaller === -1) {
        setToPrevious(index);
      } else {
        globals.dispatch(Actions.setSearchIndex({index: smaller}));
      }
    } else {
      const [, larger] =
          searchSegment(globals.currentSearchResults.tsStarts, startNs);
      // If there is no item in the viewport just go to the next.
      if (larger === -1) {
        setToNext(index);
      } else {
        globals.dispatch(Actions.setSearchIndex({index: larger}));
      }
    }
  } else {
    // If the currentTs is in the viewport, increment the index.
    if (reverse) {
      setToPrevious(index);
    } else {
      setToNext(index);
    }
  }
  selectCurrentSearchResult();
}

function selectCurrentSearchResult() {
  const searchIndex = globals.state.searchIndex;
  const source = globals.currentSearchResults.sources[searchIndex];
  const currentId = globals.currentSearchResults.sliceIds[searchIndex];
  const trackId = globals.currentSearchResults.trackIds[searchIndex];

  if (currentId === undefined) return;

  if (source === 'cpu') {
    globals.dispatch(
        Actions.selectSlice({id: currentId, trackId, scroll: true}));
  } else if (source === 'log') {
    globals.dispatch(Actions.selectLog({id: currentId, trackId, scroll: true}));
  } else {
    // Search results only include slices from the slice table for now.
    // When we include annotations we need to pass the correct table.
    globals.dispatch(Actions.selectChromeSlice(
        {id: currentId, trackId, table: 'slice', scroll: true}));
  }
}
/*
 * Copyright (C) 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import m from 'mithril';

import {sqliteString} from '../base/string_utils';
import {Actions} from '../common/actions';
import {DropDirection} from '../common/dragndrop_logic';
import {COUNT_AGGREGATION} from '../common/empty_state';
import {ColumnType} from '../common/query_result';
import {
  Area,
  PivotTableAreaState,
  PivotTableResult,
  SortDirection,
} from '../common/state';
import {fromNs, timeToCode} from '../common/time';

import {globals} from './globals';
import {Panel} from './panel';
import {
  aggregationIndex,
  areaFilter,
  extractArgumentExpression,
  sliceAggregationColumns,
  tables,
} from './pivot_table_query_generator';
import {
  Aggregation,
  AggregationFunction,
  columnKey,
  PivotTree,
  TableColumn,
} from './pivot_table_types';
import {PopupMenuButton, popupMenuIcon, PopupMenuItem} from './popup_menu';
import {runQueryInNewTab} from './query_result_tab';
import {ReorderableCell, ReorderableCellGroup} from './reorderable_cells';
import {AttributeModalHolder} from './tables/attribute_modal_holder';


interface PathItem {
  tree: PivotTree;
  nextKey: ColumnType;
}

interface PivotTableAttrs {
  selectionArea: PivotTableAreaState;
}

interface DrillFilter {
  column: TableColumn;
  value: ColumnType;
}

function drillFilterColumnName(column: TableColumn): string {
  switch (column.kind) {
    case 'argument':
      return extractArgumentExpression(column.argument, 'slice');
    case 'regular':
      return `${column.table}.${column.column}`;
  }
}

// Convert DrillFilter to SQL condition to be used in WHERE clause.
function renderDrillFilter(filter: DrillFilter): string {
  const column = drillFilterColumnName(filter.column);
  if (filter.value === null) {
    return `${column} IS NULL`;
  } else if (typeof filter.value === 'number') {
    return `${column} = ${filter.value}`;
  } else if (filter.value instanceof Uint8Array) {
    throw new Error(`BLOB as DrillFilter not implemented`);
  } else if (typeof filter.value === 'bigint') {
    return `${column} = ${filter.value}`;
  }
  return `${column} = ${sqliteString(filter.value)}`;
}

function readableColumnName(column: TableColumn) {
  switch (column.kind) {
    case 'argument':
      return `Argument ${column.argument}`;
    case 'regular':
      return `${column.table}.${column.column}`;
  }
}

export function markFirst(index: number) {
  if (index === 0) {
    return '.first';
  }
  return '';
}

export class PivotTable extends Panel<PivotTableAttrs> {
  constructor() {
    super();
    this.attributeModalHolder = new AttributeModalHolder((arg) => {
      globals.dispatch(Actions.setPivotTablePivotSelected({
        column: {kind: 'argument', argument: arg},
        selected: true,
      }));
      globals.dispatch(
          Actions.setPivotTableQueryRequested({queryRequested: true}));
    });
  }

  get pivotState() {
    return globals.state.nonSerializableState.pivotTable;
  }
  get constrainToArea() {
    return globals.state.nonSerializableState.pivotTable.constrainToArea;
  }

  renderCanvas(): void {}

  renderDrillDownCell(area: Area, filters: DrillFilter[]) {
    return m(
        'td',
        m('button',
          {
            title: 'All corresponding slices',
            onclick: () => {
              const queryFilters = filters.map(renderDrillFilter);
              if (this.constrainToArea) {
                queryFilters.push(areaFilter(area));
              }
              const query = `
                select slice.* from slice
                left join thread_track on slice.track_id = thread_track.id
                left join thread using (utid)
                left join process using (upid)
                where ${queryFilters.join(' and \n')}
              `;
              // TODO(ddrone): the UI of running query as if it was a canned or
              // custom query is a temporary one, replace with a proper UI.
              runQueryInNewTab(query, 'Pivot table details');
            },
          },
          m('i.material-icons', 'arrow_right')));
  }

  renderSectionRow(
      area: Area, path: PathItem[], tree: PivotTree,
      result: PivotTableResult): m.Vnode {
    const renderedCells = [];
    for (let j = 0; j + 1 < path.length; j++) {
      renderedCells.push(m('td', m('span.indent', ' '), `${path[j].nextKey}`));
    }

    const treeDepth = result.metadata.pivotColumns.length;
    const colspan = treeDepth - path.length + 1;
    const button =
        m('button',
          {
            onclick: () => {
              tree.isCollapsed = !tree.isCollapsed;
              globals.rafScheduler.scheduleFullRedraw();
            },
          },
          m('i.material-icons',
            tree.isCollapsed ? 'expand_more' : 'expand_less'));

    renderedCells.push(
        m('td', {colspan}, button, `${path[path.length - 1].nextKey}`));

    for (let i = 0; i < result.metadata.aggregationColumns.length; i++) {
      const renderedValue = this.renderCell(
          result.metadata.aggregationColumns[i].column, tree.aggregates[i]);
      renderedCells.push(m('td' + markFirst(i), renderedValue));
    }

    const drillFilters: DrillFilter[] = [];
    for (let i = 0; i < path.length; i++) {
      drillFilters.push({
        value: `${path[i].nextKey}`,
        column: result.metadata.pivotColumns[i],
      });
    }

    renderedCells.push(this.renderDrillDownCell(area, drillFilters));
    return m('tr', renderedCells);
  }

  renderCell(column: TableColumn, value: ColumnType): string {
    if (column.kind === 'regular' &&
        (column.column === 'dur' || column.column === 'thread_dur')) {
      if (typeof value === 'number') {
        return timeToCode(fromNs(value));
      }
    }
    return `${value}`;
  }

  renderTree(
      area: Area, path: PathItem[], tree: PivotTree, result: PivotTableResult,
      sink: m.Vnode[]) {
    if (tree.isCollapsed) {
      sink.push(this.renderSectionRow(area, path, tree, result));
      return;
    }
    if (tree.children.size > 0) {
      // Avoid rendering the intermediate results row for the root of tree
      // and in case there's only one child subtree.
      if (!tree.isCollapsed && path.length > 0 && tree.children.size !== 1) {
        sink.push(this.renderSectionRow(area, path, tree, result));
      }
      for (const [key, childTree] of tree.children.entries()) {
        path.push({tree: childTree, nextKey: key});
        this.renderTree(area, path, childTree, result, sink);
        path.pop();
      }
      return;
    }

    // Avoid rendering the intermediate results row if it has only one leaf
    // row.
    if (!tree.isCollapsed && path.length > 0 && tree.rows.length > 1) {
      sink.push(this.renderSectionRow(area, path, tree, result));
    }
    for (const row of tree.rows) {
      const renderedCells = [];
      const drillFilters: DrillFilter[] = [];
      const treeDepth = result.metadata.pivotColumns.length;
      for (let j = 0; j < treeDepth; j++) {
        const value = this.renderCell(result.metadata.pivotColumns[j], row[j]);
        if (j < path.length) {
          renderedCells.push(m('td', m('span.indent', ' '), value));
        } else {
          renderedCells.push(m(`td`, value));
        }
        drillFilters.push(
            {column: result.metadata.pivotColumns[j], value: row[j]});
      }
      for (let j = 0; j < result.metadata.aggregationColumns.length; j++) {
        const value = row[aggregationIndex(treeDepth, j)];
        const renderedValue = this.renderCell(
            result.metadata.aggregationColumns[j].column, value);
        renderedCells.push(m('td.aggregation' + markFirst(j), renderedValue));
      }

      renderedCells.push(this.renderDrillDownCell(area, drillFilters));
      sink.push(m('tr', renderedCells));
    }
  }

  renderTotalsRow(queryResult: PivotTableResult) {
    const overallValuesRow =
        [m('td.total-values',
           {'colspan': queryResult.metadata.pivotColumns.length},
           m('strong', 'Total values:'))];
    for (let i = 0; i < queryResult.metadata.aggregationColumns.length; i++) {
      overallValuesRow.push(
          m('td' + markFirst(i),
            this.renderCell(
                queryResult.metadata.aggregationColumns[i].column,
                queryResult.tree.aggregates[i])));
    }
    overallValuesRow.push(m('td'));
    return m('tr', overallValuesRow);
  }

  sortingItem(aggregationIndex: number, order: SortDirection): PopupMenuItem {
    return {
      itemType: 'regular',
      text: order === 'DESC' ? 'Highest first' : 'Lowest first',
      callback() {
        globals.dispatch(
            Actions.setPivotTableSortColumn({aggregationIndex, order}));
        globals.dispatch(
            Actions.setPivotTableQueryRequested({queryRequested: true}));
      },
    };
  }

  readableAggregationName(aggregation: Aggregation) {
    if (aggregation.aggregationFunction === 'COUNT') {
      return 'Count';
    }
    return `${aggregation.aggregationFunction}(${
        readableColumnName(aggregation.column)})`;
  }

  aggregationPopupItem(
      aggregation: Aggregation, index: number,
      nameOverride?: string): PopupMenuItem {
    return {
      itemType: 'regular',
      text: nameOverride ?? readableColumnName(aggregation.column),
      callback: () => {
        globals.dispatch(
            Actions.addPivotTableAggregation({aggregation, after: index}));
        globals.dispatch(
            Actions.setPivotTableQueryRequested({queryRequested: true}));
      },
    };
  }

  aggregationPopupTableGroup(table: string, columns: string[], index: number):
      PopupMenuItem|undefined {
    const items = [];
    for (const column of columns) {
      const tableColumn: TableColumn = {kind: 'regular', table, column};
      items.push(this.aggregationPopupItem(
          {aggregationFunction: 'SUM', column: tableColumn}, index));
    }

    if (items.length === 0) {
      return undefined;
    }

    return {
      itemType: 'group',
      itemId: `aggregations-${table}`,
      text: `Add ${table} aggregation`,
      children: items,
    };
  }

  renderAggregationHeaderCell(
      aggregation: Aggregation, index: number,
      removeItem: boolean): ReorderableCell {
    const popupItems: PopupMenuItem[] = [];
    const state = globals.state.nonSerializableState.pivotTable;
    if (aggregation.sortDirection === undefined) {
      popupItems.push(
          this.sortingItem(index, 'DESC'), this.sortingItem(index, 'ASC'));
    } else {
      // Table is already sorted by the same column, return one item with
      // opposite direction.
      popupItems.push(this.sortingItem(
          index, aggregation.sortDirection === 'DESC' ? 'ASC' : 'DESC'));
    }
    const otherAggs: AggregationFunction[] = ['SUM', 'MAX', 'MIN', 'AVG'];
    if (aggregation.aggregationFunction !== 'COUNT') {
      for (const otherAgg of otherAggs) {
        if (aggregation.aggregationFunction === otherAgg) {
          continue;
        }

        popupItems.push({
          itemType: 'regular',
          text: otherAgg,
          callback() {
            globals.dispatch(Actions.setPivotTableAggregationFunction(
                {index, function: otherAgg}));
            globals.dispatch(
                Actions.setPivotTableQueryRequested({queryRequested: true}));
          },
        });
      }
    }

    if (removeItem) {
      popupItems.push({
        itemType: 'regular',
        text: 'Remove',
        callback: () => {
          globals.dispatch(Actions.removePivotTableAggregation({index}));
          globals.dispatch(
              Actions.setPivotTableQueryRequested({queryRequested: true}));
        },
      });
    }

    let hasCount = false;
    for (const agg of state.selectedAggregations.values()) {
      if (agg.aggregationFunction === 'COUNT') {
        hasCount = true;
      }
    }

    if (!hasCount) {
      popupItems.push(this.aggregationPopupItem(
          COUNT_AGGREGATION, index, 'Add count aggregation'));
    }

    const sliceAggregationsItem = this.aggregationPopupTableGroup(
        'slice', sliceAggregationColumns, index);
    if (sliceAggregationsItem !== undefined) {
      popupItems.push(sliceAggregationsItem);
    }

    return {
      extraClass: '.aggregation' + markFirst(index),
      content: [
        this.readableAggregationName(aggregation),
        m(PopupMenuButton, {
          icon: popupMenuIcon(aggregation.sortDirection),
          items: popupItems,
        }),
      ],
    };
  }

  attributeModalHolder: AttributeModalHolder;

  renderPivotColumnHeader(
      queryResult: PivotTableResult, pivot: TableColumn,
      selectedPivots: Set<string>): ReorderableCell {
    const items: PopupMenuItem[] = [{
      itemType: 'regular',
      text: 'Add argument pivot',
      callback: () => {
        this.attributeModalHolder.start();
      },
    }];
    if (queryResult.metadata.pivotColumns.length > 1) {
      items.push({
        itemType: 'regular',
        text: 'Remove',
        callback() {
          globals.dispatch(Actions.setPivotTablePivotSelected(
              {column: pivot, selected: false}));
          globals.dispatch(
              Actions.setPivotTableQueryRequested({queryRequested: true}));
        },
      });
    }

    for (const table of tables) {
      const group: PopupMenuItem[] = [];
      for (const columnName of table.columns) {
        const column: TableColumn = {
          kind: 'regular',
          table: table.name,
          column: columnName,
        };
        if (selectedPivots.has(columnKey(column))) {
          continue;
        }

        group.push({
          itemType: 'regular',
          text: columnName,
          callback() {
            globals.dispatch(
                Actions.setPivotTablePivotSelected({column, selected: true}));
            globals.dispatch(
                Actions.setPivotTableQueryRequested({queryRequested: true}));
          },
        });
      }
      items.push({
        itemType: 'group',
        itemId: `pivot-${table.name}`,
        text: `Add ${table.name} pivot`,
        children: group,
      });
    }

    return {
      content: [
        readableColumnName(pivot),
        m(PopupMenuButton, {icon: 'more_horiz', items}),
      ],
    };
  }

  renderResultsTable(attrs: PivotTableAttrs) {
    const state = globals.state.nonSerializableState.pivotTable;
    if (state.queryResult === null) {
      return m('div', 'Loading...');
    }
    const queryResult: PivotTableResult = state.queryResult;

    const renderedRows: m.Vnode[] = [];
    const tree = state.queryResult.tree;

    if (tree.children.size === 0 && tree.rows.length === 0) {
      // Empty result, render a special message
      return m('.empty-result', 'No slices in the current selection.');
    }

    this.renderTree(
        globals.state.areas[attrs.selectionArea.areaId],
        [],
        tree,
        state.queryResult,
        renderedRows);

    const selectedPivots =
        new Set(this.pivotState.selectedPivots.map(columnKey));
    const pivotTableHeaders = state.selectedPivots.map(
        (pivot) =>
            this.renderPivotColumnHeader(queryResult, pivot, selectedPivots));

    const removeItem = state.queryResult.metadata.aggregationColumns.length > 1;
    const aggregationTableHeaders =
        state.queryResult.metadata.aggregationColumns.map(
            (aggregation, index) => this.renderAggregationHeaderCell(
                aggregation, index, removeItem));

    return m(
        'table.pivot-table',
        m('thead',
          // First row of the table, containing names of pivot and aggregation
          // columns, as well as popup menus to modify the columns. Last cell
          // is empty because of an extra column with "drill down" button for
          // each pivot table row.
          m('tr.header',
            m(ReorderableCellGroup, {
              cells: pivotTableHeaders,
              onReorder: (
                  from: number, to: number, direction: DropDirection) => {
                globals.dispatch(
                    Actions.changePivotTablePivotOrder({from, to, direction}));
                globals.dispatch(Actions.setPivotTableQueryRequested(
                    {queryRequested: true}));
              },
            }),
            m(ReorderableCellGroup, {
              cells: aggregationTableHeaders,
              onReorder:
                  (from: number, to: number, direction: DropDirection) => {
                    globals.dispatch(Actions.changePivotTableAggregationOrder(
                        {from, to, direction}));
                    globals.dispatch(Actions.setPivotTableQueryRequested(
                        {queryRequested: true}));
                  },
            }),
            m('td.menu', m(PopupMenuButton, {
                icon: 'menu',
                items: [{
                  itemType: 'regular',
                  text: state.constrainToArea ?
                      'Query data for the whole timeline' :
                      'Constrain to selected area',
                  callback: () => {
                    globals.dispatch(Actions.setPivotTableConstrainToArea(
                        {constrain: !state.constrainToArea}));
                    globals.dispatch(Actions.setPivotTableQueryRequested(
                        {queryRequested: true}));
                  },
                }],
              })))),
        m('tbody', this.renderTotalsRow(state.queryResult), renderedRows));
  }

  view({attrs}: m.Vnode<PivotTableAttrs>): m.Children {
    this.attributeModalHolder.update();

    return m('.pivot-table', this.renderResultsTable(attrs));
  }
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {splitIfTooBig} from './flamegraph';

test('textGoingToMultipleLines', () => {
  const text = 'Dummy text to go to multiple lines.';

  const lineSplitter = splitIfTooBig(text, 7 + 32, text.length);

  expect(lineSplitter).toEqual({
    lines: ['Dummy t', 'ext to ', 'go to m', 'ultiple', ' lines.'],
    lineWidth: 7,
  });
});

test('emptyText', () => {
  const text = '';

  const lineSplitter = splitIfTooBig(text, 10, 5);

  expect(lineSplitter).toEqual({lines: [], lineWidth: 5});
});

test('textEnoughForOneLine', () => {
  const text = 'Dummy text to go to one lines.';

  const lineSplitter = splitIfTooBig(text, text.length + 32, text.length);

  expect(lineSplitter).toEqual({lines: [text], lineWidth: text.length});
});

test('textGoingToTwoLines', () => {
  const text = 'Dummy text to go to two lines.';

  const lineSplitter = splitIfTooBig(text, text.length / 2 + 32, text.length);

  expect(lineSplitter).toEqual({
    lines: ['Dummy text to g', 'o to two lines.'],
    lineWidth: text.length / 2,
  });
});
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {v4 as uuidv4} from 'uuid';

import {assertExists} from '../base/logging';
import {QueryResponse, runQuery} from '../common/queries';
import {QueryError} from '../common/query_result';
import {
  AddDebugTrackMenu,
  uuidToViewName,
} from '../tracks/debug/add_debug_track_menu';

import {
  addTab,
  BottomTab,
  bottomTabRegistry,
  closeTab,
  NewBottomTabArgs,
} from './bottom_tab';
import {globals} from './globals';
import {QueryTable} from './query_table';
import {Button} from './widgets/button';
import {Popup, PopupPosition} from './widgets/popup';


export function runQueryInNewTab(query: string, title: string, tag?: string) {
  return addTab({
    kind: QueryResultTab.kind,
    tag,
    config: {
      query,
      title,
    },
  });
}

interface QueryResultTabConfig {
  readonly query: string;
  readonly title: string;
  // Optional data to display in this tab instead of fetching it again
  // (e.g. when duplicating an existing tab which already has the data).
  readonly prefetchedResponse?: QueryResponse;
}

export class QueryResultTab extends BottomTab<QueryResultTabConfig> {
  static readonly kind = 'org.perfetto.QueryResultTab';

  queryResponse?: QueryResponse;
  sqlViewName?: string;

  static create(args: NewBottomTabArgs): QueryResultTab {
    return new QueryResultTab(args);
  }

  constructor(args: NewBottomTabArgs) {
    super(args);

    this.initTrack(args);
  }

  async initTrack(args: NewBottomTabArgs) {
    let uuid = '';
    if (this.config.prefetchedResponse !== undefined) {
      this.queryResponse = this.config.prefetchedResponse;
      uuid = args.uuid;
    } else {
      const result = await runQuery(this.config.query, this.engine);
      this.queryResponse = result;
      globals.rafScheduler.scheduleFullRedraw();
      if (result.error !== undefined) {
        return;
      }

      uuid = uuidv4();
    }

    if (uuid !== '') {
      this.sqlViewName = await this.createViewForDebugTrack(uuid);
      if (this.sqlViewName) {
        globals.rafScheduler.scheduleFullRedraw();
      }
    }
  }

  getTitle(): string {
    const suffix =
        this.queryResponse ? ` (${this.queryResponse.rows.length})` : '';
    return `${this.config.title}${suffix}`;
  }

  viewTab(): m.Child {
    return m(QueryTable, {
      query: this.config.query,
      resp: this.queryResponse,
      onClose: () => closeTab(this.uuid),
      contextButtons: [
        this.sqlViewName === undefined ?
            null :
            m(Popup,
              {
                trigger: m(Button, {label: 'Show debug track', minimal: true}),
                position: PopupPosition.Top,
              },
              m(AddDebugTrackMenu, {
                sqlViewName: this.sqlViewName,
                columns: assertExists(this.queryResponse).columns,
                engine: this.engine,
              })),
      ],
    });
  }

  isLoading() {
    return this.queryResponse === undefined;
  }

  renderTabCanvas() {}

  async createViewForDebugTrack(uuid: string): Promise<string> {
    const viewId = uuidToViewName(uuid);
    // Assuming that the query results come from a SELECT query, try creating a
    // view to allow us to reuse it for further queries.
    // TODO(altimin): This should get the actual query that was used to
    // generate the results from the SQL query iterator.
    try {
      const createViewResult = await this.engine.query(
          `create view ${viewId} as ${this.config.query}`);
      if (createViewResult.error()) {
        // If it failed, do nothing.
        return '';
      }
    } catch (e) {
      if (e instanceof QueryError) {
        // If it failed, do nothing.
        return '';
      }
      throw e;
    }
    return viewId;
  }
}

bottomTabRegistry.register(QueryResultTab);
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {constraintsToQueryFragment} from './sql_utils';

// Clean up repeated whitespaces to allow for easier testing.
function normalize(s: string): string {
  return s.replace(/\s+/g, ' ');
}

test('constraintsToQueryFragment: where', () => {
  expect(normalize(constraintsToQueryFragment({
    filters: ['ts > 1000', 'dur != 0'],
  }))).toEqual('WHERE ts > 1000 and dur != 0');
});

test('constraintsToQueryFragment: order by', () => {
  expect(normalize(constraintsToQueryFragment({
    orderBy: [{fieldName: 'name'}, {fieldName: 'count', direction: 'DESC'}],
  }))).toEqual('ORDER BY name, count DESC');
});

test('constraintsToQueryFragment: limit', () => {
  expect(normalize(constraintsToQueryFragment({limit: 3}))).toEqual('LIMIT 3');
});

test('constraintsToQueryFragment: all', () => {
  expect(normalize(constraintsToQueryFragment({
    filters: ['id != 1'],
    orderBy: [{fieldName: 'ts'}],
    limit: 1,
  }))).toEqual('WHERE id != 1 ORDER BY ts LIMIT 1');
});
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {assertTrue} from '../base/logging';

export const BUCKETS_PER_PIXEL = 2;

// CacheKey is a specific region of the timeline defined by the
// following four properties:
// - startNs
// - endNs
// - bucketNs
// - windowSizePx
// startNs is the beginning of the region in ns
// endNs is the end of the region in ns
// bucketNs is the size of a single bucket within the region which is
//          used for quantizing the timeline.
// windowSizePx is the size of the whole window in pixels.
//
// In the nominal case bucketNs is
// set so that 1px of the screen corresponds to N bucketNs worth of
// time where 1 < N < 10. This ensures that we show the maximum
// amount of data given the available screen real estate.
// We shouldn't rely on this property when rendering however since in
// some situations (i.e. after zooming before new data has loaded) it
// may not be the case.
//
// CacheKey's can be 'normalized' - rounding the interval up and the
// bucket size down. For a given CacheKey key ('foo') the normalized
// version ('normal') has the properties:
//   normal.startNs <= foo.startNs
//   normal.endNs => foo.endNs
//   normal.bucketNs <= foo.bucketNs
//   normal.windowSizePx ~= windowSizePx (we round to the nearest 100px)
//   foo.isCoveredBy(foo) == true
//   foo.isCoveredBy(normal) == true
//   normal.isCoveredBy(normal) == true
//   normal.isCoveredBy(foo) == false unless normal == foo
//   normalize(normal) == normal
//
// In other words the normal window is a superset of the data of the
// non-normal window at a higher resolution. Normalization is used to
// avoid re-fetching data on tiny zooms/moves/resizes.
export class CacheKey {
  readonly startNs: number;
  readonly endNs: number;
  readonly bucketNs: number;
  readonly windowSizePx: number;

  static create(startNs: number, endNs: number, windowSizePx: number):
      CacheKey {
    const bucketNs = (endNs - startNs) / (windowSizePx * BUCKETS_PER_PIXEL);
    return new CacheKey(startNs, endNs, bucketNs, windowSizePx);
  }

  private constructor(
      startNs: number, endNs: number, bucketNs: number, windowSizePx: number) {
    this.startNs = startNs;
    this.endNs = endNs;
    this.bucketNs = bucketNs;
    this.windowSizePx = windowSizePx;
  }

  static zero(): CacheKey {
    return new CacheKey(0, 0, 0, 100);
  }

  get normalizedBucketNs(): number {
    // Round bucketNs down to the nearest smaller power of 2 (minimum 1):
    return Math.max(1, Math.pow(2, Math.floor(Math.log2(this.bucketNs))));
  }

  get normalizedWindowSizePx(): number {
    return Math.max(100, Math.round(this.windowSizePx / 100) * 100);
  }

  normalize(): CacheKey {
    const windowSizePx = this.normalizedWindowSizePx;
    const bucketNs = this.normalizedBucketNs;
    const windowNs = windowSizePx * BUCKETS_PER_PIXEL * bucketNs;
    const startNs = Math.floor(this.startNs / windowNs) * windowNs;
    const endNs = Math.ceil(this.endNs / windowNs) * windowNs;
    return new CacheKey(startNs, endNs, bucketNs, windowSizePx);
  }

  isNormalized(): boolean {
    return this.toString() === this.normalize().toString();
  }

  isCoveredBy(other: CacheKey): boolean {
    let r = true;
    r = r && other.startNs <= this.startNs;
    r = r && other.endNs >= this.endNs;
    r = r && other.normalizedBucketNs === this.normalizedBucketNs;
    r = r && other.normalizedWindowSizePx === this.normalizedWindowSizePx;
    return r;
  }

  // toString is 'load bearing' in that it's used to key e.g. caches
  // with CacheKey's.
  toString() {
    const start = this.startNs;
    const end = this.endNs;
    const bucket = this.bucketNs;
    const size = this.windowSizePx;
    return `CacheKey<${start}, ${end}, ${bucket}, ${size}>`;
  }
}


interface CacheItem<T> {
  t: T;
  lastAccessId: number;
}


// LRU cache for the tracks.
// T is all the data needed for a displaying the track in a given
// CacheKey area - generally an array of slices.
export class TrackCache<T> {
  private cacheSize: number;
  private cache: Map<string, CacheItem<T>>;
  private lastAccessId: number;

  constructor(cacheSize: number) {
    assertTrue(cacheSize >= 2);
    this.cacheSize = cacheSize;
    this.cache = new Map();
    this.lastAccessId = 0;
  }

  insert(cacheKey: CacheKey, t: T): void {
    assertTrue(cacheKey.isNormalized());
    const key = cacheKey.toString();
    this.cache.set(key, {
      t,
      lastAccessId: this.lastAccessId++,
    });
    this.updateLru();
  }

  lookup(cacheKey: CacheKey): undefined|T {
    assertTrue(cacheKey.isNormalized());
    const key = cacheKey.toString();
    const item = this.cache.get(key);
    if (item) {
      item.lastAccessId = this.lastAccessId++;
      this.updateLru();
    }
    return item === undefined ? undefined : item.t;
  }

  private updateLru(): void {
    while (this.cache.size > this.cacheSize) {
      let oldestKey = '';
      let oldestAccessId = Number.MAX_SAFE_INTEGER;
      for (const [k, v] of this.cache.entries()) {
        if (v.lastAccessId < oldestAccessId) {
          oldestAccessId = v.lastAccessId;
          oldestKey = k;
        }
      }
      this.cache.delete(oldestKey);
    }
  }
}
/*
 * Copyright (C) 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {sqliteString} from '../base/string_utils';
import {
  Area,
  PivotTableQuery,
  PivotTableState,
} from '../common/state';
import {toNs} from '../common/time';
import {
  getSelectedTrackIds,
} from '../controller/aggregation/slice_aggregation_controller';

import {globals} from './globals';
import {
  Aggregation,
  TableColumn,
} from './pivot_table_types';

export interface Table {
  name: string;
  columns: string[];
}

export const sliceTable = {
  name: 'slice',
  columns: ['type', 'ts', 'dur', 'category', 'name', 'depth'],
};

// Columns of `slice` table available for aggregation.
export const sliceAggregationColumns = [
  'ts',
  'dur',
  'depth',
  'thread_ts',
  'thread_dur',
  'thread_instruction_count',
  'thread_instruction_delta',
];

// List of available tables to query, used to populate selectors of pivot
// columns in the UI.
export const tables: Table[] = [
  sliceTable,
  {
    name: 'process',
    columns: [
      'type',
      'pid',
      'name',
      'parent_upid',
      'uid',
      'android_appid',
      'cmdline',
    ],
  },
  {name: 'thread', columns: ['type', 'name', 'tid', 'upid', 'is_main_thread']},
  {name: 'thread_track', columns: ['type', 'name', 'utid']},
];

// Queried "table column" is either:
// 1. A real one, represented as object with table and column name.
// 2. Pseudo-column 'count' that's rendered as '1' in SQL to use in queries like
// `select sum(1), name from slice group by name`.

export interface RegularColumn {
  kind: 'regular';
  table: string;
  column: string;
}

export interface ArgumentColumn {
  kind: 'argument';
  argument: string;
}

// Exception thrown by query generator in case incoming parameters are not
// suitable in order to build a correct query; these are caught by the UI and
// displayed to the user.
export class QueryGeneratorError extends Error {}

// Internal column name for different rollover levels of aggregate columns.
function aggregationAlias(aggregationIndex: number): string {
  return `agg_${aggregationIndex}`;
}

export function areaFilter(area: Area): string {
  return `
    ts + dur > ${toNs(area.startSec)}
    and ts < ${toNs(area.endSec)}
    and track_id in (${getSelectedTrackIds(area).join(', ')})
  `;
}

export function expression(column: TableColumn): string {
  switch (column.kind) {
    case 'regular':
      return `${column.table}.${column.column}`;
    case 'argument':
      return extractArgumentExpression(column.argument, 'slice');
  }
}

function aggregationExpression(aggregation: Aggregation): string {
  if (aggregation.aggregationFunction === 'COUNT') {
    return 'COUNT()';
  }
  return `${aggregation.aggregationFunction}(${
      expression(aggregation.column)})`;
}

export function extractArgumentExpression(argument: string, table?: string) {
  const prefix = table === undefined ? '' : `${table}.`;
  return `extract_arg(${prefix}arg_set_id, ${sqliteString(argument)})`;
}

export function aggregationIndex(pivotColumns: number, aggregationNo: number) {
  return pivotColumns + aggregationNo;
}

export function generateQueryFromState(state: PivotTableState):
    PivotTableQuery {
  if (state.selectionArea === undefined) {
    throw new QueryGeneratorError('Should not be called without area');
  }

  const sliceTableAggregations = [...state.selectedAggregations.values()];
  if (sliceTableAggregations.length === 0) {
    throw new QueryGeneratorError('No aggregations selected');
  }

  const pivots = state.selectedPivots;

  const aggregations = sliceTableAggregations.map(
      (agg, index) =>
          `${aggregationExpression(agg)} as ${aggregationAlias(index)}`);
  const countIndex = aggregations.length;
  // Extra count aggregation, needed in order to compute combined averages.
  aggregations.push('COUNT() as hidden_count');

  const renderedPivots = pivots.map(expression);
  const sortClauses: string[] = [];
  for (let i = 0; i < sliceTableAggregations.length; i++) {
    const sortDirection = sliceTableAggregations[i].sortDirection;
    if (sortDirection !== undefined) {
      sortClauses.push(`${aggregationAlias(i)} ${sortDirection}`);
    }
  }

  const joins = `
    left join thread_track on thread_track.id = slice.track_id
    left join thread using (utid)
    left join process using (upid)
  `;

  const whereClause = state.constrainToArea ?
      `where ${areaFilter(globals.state.areas[state.selectionArea.areaId])}` :
      '';
  const text = `
    select
      ${renderedPivots.concat(aggregations).join(',\n')}
    from slice
    ${pivots.length > 0 ? joins : ''}
    ${whereClause}
    group by ${renderedPivots.join(', ')}
    ${sortClauses.length > 0 ? ('order by ' + sortClauses.join(', ')) : ''}
  `;

  return {
    text,
    metadata: {
      pivotColumns: pivots,
      aggregationColumns: sliceTableAggregations,
      countIndex,
    },
  };
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {isEmptyData} from '../common/aggregation_data';
import {LogExists, LogExistsKey} from '../common/logs';
import {addSelectionChangeObserver} from '../common/selection_observer';
import {Selection} from '../common/state';
import {DebugSliceDetailsTab} from '../tracks/debug/details_tab';

import {AggregationPanel} from './aggregation_panel';
import {ChromeSliceDetailsPanel} from './chrome_slice_panel';
import {CounterDetailsPanel} from './counter_panel';
import {CpuProfileDetailsPanel} from './cpu_profile_panel';
import {DEFAULT_DETAILS_CONTENT_HEIGHT} from './css_constants';
import {DragGestureHandler} from './drag_gesture_handler';
import {FlamegraphDetailsPanel} from './flamegraph_panel';
import {
  FlowEventsAreaSelectedPanel,
  FlowEventsPanel,
} from './flow_events_panel';
import {FtracePanel} from './ftrace_panel';
import {globals} from './globals';
import {LogPanel} from './logs_panel';
import {NotesEditorTab} from './notes_panel';
import {AnyAttrsVnode, PanelContainer} from './panel_container';
import {PivotTable} from './pivot_table';
import {SliceDetailsPanel} from './slice_details_panel';
import {ThreadStateTab} from './thread_state_tab';

const UP_ICON = 'keyboard_arrow_up';
const DOWN_ICON = 'keyboard_arrow_down';
const DRAG_HANDLE_HEIGHT_PX = 28;

function getDetailsHeight() {
  // This needs to be a function instead of a const to ensure the CSS constants
  // have been initialized by the time we perform this calculation;
  return DEFAULT_DETAILS_CONTENT_HEIGHT + DRAG_HANDLE_HEIGHT_PX;
}

function getFullScreenHeight() {
  const panelContainer =
      document.querySelector('.pan-and-zoom-content') as HTMLElement;
  if (panelContainer !== null) {
    return panelContainer.clientHeight;
  } else {
    return getDetailsHeight();
  }
}

function hasLogs(): boolean {
  const data = globals.trackDataStore.get(LogExistsKey) as LogExists;
  return data && data.exists;
}

interface Tab {
  key: string;
  name: string;
}

interface DragHandleAttrs {
  height: number;
  resize: (height: number) => void;
  tabs: Tab[];
  currentTabKey?: string;
}

class DragHandle implements m.ClassComponent<DragHandleAttrs> {
  private dragStartHeight = 0;
  private height = 0;
  private previousHeight = this.height;
  private resize: (height: number) => void = () => {};
  private isClosed = this.height <= DRAG_HANDLE_HEIGHT_PX;
  private isFullscreen = false;
  // We can't get real fullscreen height until the pan_and_zoom_handler exists.
  private fullscreenHeight = getDetailsHeight();

  oncreate({dom, attrs}: m.CVnodeDOM<DragHandleAttrs>) {
    this.resize = attrs.resize;
    this.height = attrs.height;
    this.isClosed = this.height <= DRAG_HANDLE_HEIGHT_PX;
    this.fullscreenHeight = getFullScreenHeight();
    const elem = dom as HTMLElement;
    new DragGestureHandler(
        elem,
        this.onDrag.bind(this),
        this.onDragStart.bind(this),
        this.onDragEnd.bind(this));
  }

  onupdate({attrs}: m.CVnodeDOM<DragHandleAttrs>) {
    this.resize = attrs.resize;
    this.height = attrs.height;
    this.isClosed = this.height <= DRAG_HANDLE_HEIGHT_PX;
  }

  onDrag(_x: number, y: number) {
    const newHeight =
        Math.floor(this.dragStartHeight + (DRAG_HANDLE_HEIGHT_PX / 2) - y);
    this.isClosed = newHeight <= DRAG_HANDLE_HEIGHT_PX;
    this.isFullscreen = newHeight >= this.fullscreenHeight;
    this.resize(newHeight);
    globals.rafScheduler.scheduleFullRedraw();
  }

  onDragStart(_x: number, _y: number) {
    this.dragStartHeight = this.height;
  }

  onDragEnd() {}

  view({attrs}: m.CVnode<DragHandleAttrs>) {
    const icon = this.isClosed ? UP_ICON : DOWN_ICON;
    const title = this.isClosed ? 'Show panel' : 'Hide panel';
    const renderTab = (tab: Tab) => {
      if (attrs.currentTabKey === tab.key) {
        return m('.tab[active]', tab.name);
      }
      return m(
          '.tab',
          {
            onclick: () => {
              globals.dispatch(Actions.setCurrentTab({tab: tab.key}));
            },
          },
          tab.name);
    };
    return m(
        '.handle',
        m('.tabs', attrs.tabs.map(renderTab)),
        m('.buttons',
          m('i.material-icons',
            {
              onclick: () => {
                this.isClosed = false;
                this.isFullscreen = true;
                this.resize(this.fullscreenHeight);
                globals.rafScheduler.scheduleFullRedraw();
              },
              title: 'Open fullscreen',
              disabled: this.isFullscreen,
            },
            'vertical_align_top'),
          m('i.material-icons',
            {
              onclick: () => {
                if (this.height === DRAG_HANDLE_HEIGHT_PX) {
                  this.isClosed = false;
                  if (this.previousHeight === 0) {
                    this.previousHeight = getDetailsHeight();
                  }
                  this.resize(this.previousHeight);
                } else {
                  this.isFullscreen = false;
                  this.isClosed = true;
                  this.previousHeight = this.height;
                  this.resize(DRAG_HANDLE_HEIGHT_PX);
                }
                globals.rafScheduler.scheduleFullRedraw();
              },
              title,
            },
            icon)));
  }
}

function handleSelectionChange(newSelection?: Selection, _?: Selection): void {
  const currentSelectionTag = 'current_selection';
  const bottomTabList = globals.bottomTabList;
  if (!bottomTabList) return;
  if (newSelection === undefined) {
    bottomTabList.closeTabByTag(currentSelectionTag);
    return;
  }
  switch (newSelection.kind) {
    case 'NOTE':
      bottomTabList.addTab({
        kind: NotesEditorTab.kind,
        tag: currentSelectionTag,
        config: {
          id: newSelection.id,
        },
      });
      break;
    case 'AREA':
      if (newSelection.noteId !== undefined) {
        bottomTabList.addTab({
          kind: NotesEditorTab.kind,
          tag: currentSelectionTag,
          config: {
            id: newSelection.noteId,
          },
        });
      }
      break;
    case 'THREAD_STATE':
      bottomTabList.addTab({
        kind: ThreadStateTab.kind,
        tag: currentSelectionTag,
        config: {
          id: newSelection.id,
        },
      });
      break;
    case 'DEBUG_SLICE':
      bottomTabList.addTab({
        kind: DebugSliceDetailsTab.kind,
        tag: currentSelectionTag,
        config: {
          sqlTableName: newSelection.sqlTableName,
          id: newSelection.id,
        },
      });
      break;
    default:
      bottomTabList.closeTabByTag(currentSelectionTag);
  }
}
addSelectionChangeObserver(handleSelectionChange);

export class DetailsPanel implements m.ClassComponent {
  private detailsHeight = getDetailsHeight();

  view() {
    interface DetailsPanel {
      key: string;
      name: string;
      vnode: AnyAttrsVnode;
    }

    const detailsPanels: DetailsPanel[] = [];

    if (globals.bottomTabList) {
      for (const tab of globals.bottomTabList.getTabs()) {
        detailsPanels.push({
          key: tab.tag ?? tab.uuid,
          name: tab.getTitle(),
          vnode: tab.createPanelVnode(),
        });
      }
    }

    const curSelection = globals.state.currentSelection;
    if (curSelection) {
      switch (curSelection.kind) {
        case 'NOTE':
          // Handled in handleSelectionChange.
          break;
        case 'AREA':
          if (globals.flamegraphDetails.isInAreaSelection) {
            detailsPanels.push({
              key: 'flamegraph_selection',
              name: 'Flamegraph Selection',
              vnode: m(FlamegraphDetailsPanel, {key: 'flamegraph'}),
            });
          }
          break;
        case 'SLICE':
          detailsPanels.push({
            key: 'current_selection',
            name: 'Current Selection',
            vnode: m(SliceDetailsPanel, {
              key: 'slice',
            }),
          });
          break;
        case 'COUNTER':
          detailsPanels.push({
            key: 'current_selection',
            name: 'Current Selection',
            vnode: m(CounterDetailsPanel, {
              key: 'counter',
            }),
          });
          break;
        case 'PERF_SAMPLES':
        case 'HEAP_PROFILE':
          detailsPanels.push({
            key: 'current_selection',
            name: 'Current Selection',
            vnode: m(FlamegraphDetailsPanel, {key: 'flamegraph'}),
          });
          break;
        case 'CPU_PROFILE_SAMPLE':
          detailsPanels.push({
            key: 'current_selection',
            name: 'Current Selection',
            vnode: m(CpuProfileDetailsPanel, {
              key: 'cpu_profile_sample',
            }),
          });
          break;
        case 'CHROME_SLICE':
          detailsPanels.push({
            key: 'current_selection',
            name: 'Current Selection',
            vnode: m(ChromeSliceDetailsPanel, {key: 'chrome_slice'}),
          });
          break;
        default:
          break;
      }
    }
    if (hasLogs()) {
      detailsPanels.push({
        key: 'android_logs',
        name: 'Android Logs',
        vnode: m(LogPanel, {key: 'logs_panel'}),
      });
    }

    const trackGroup = globals.state.trackGroups['ftrace-track-group'];
    if (trackGroup) {
      const {collapsed} = trackGroup;
      if (!collapsed) {
        detailsPanels.push({
          key: 'ftrace_events',
          name: 'Ftrace Events',
          vnode: m(FtracePanel, {key: 'ftrace_panel'}),
        });
      }
    }

    if (globals.state.nonSerializableState.pivotTable.selectionArea !==
        undefined) {
      detailsPanels.push({
        key: 'pivot_table',
        name: 'Pivot Table',
        vnode: m(PivotTable, {
          key: 'pivot_table',
          selectionArea:
              globals.state.nonSerializableState.pivotTable.selectionArea,
        }),
      });
    }

    if (globals.connectedFlows.length > 0) {
      detailsPanels.push({
        key: 'bound_flows',
        name: 'Flow Events',
        vnode: m(FlowEventsPanel, {key: 'flow_events'}),
      });
    }

    for (const [key, value] of globals.aggregateDataStore.entries()) {
      if (!isEmptyData(value)) {
        detailsPanels.push({
          key: value.tabName,
          name: value.tabName,
          vnode: m(AggregationPanel, {kind: key, key, data: value}),
        });
      }
    }

    // Add this after all aggregation panels, to make it appear after 'Slices'
    if (globals.selectedFlows.length > 0) {
      detailsPanels.push({
        key: 'selected_flows',
        name: 'Flow Events',
        vnode: m(FlowEventsAreaSelectedPanel, {key: 'flow_events_area'}),
      });
    }

    let currentTabDetails =
        detailsPanels.find((tab) => tab.key === globals.state.currentTab);
    if (currentTabDetails === undefined && detailsPanels.length > 0) {
      currentTabDetails = detailsPanels[0];
    }

    const panel = currentTabDetails?.vnode;
    const panels = panel ? [panel] : [];

    return m(
        '.details-content',
        {
          style: {
            height: `${this.detailsHeight}px`,
            display: detailsPanels.length > 0 ? null : 'none',
          },
        },
        m(DragHandle, {
          resize: (height: number) => {
            this.detailsHeight = Math.max(height, DRAG_HANDLE_HEIGHT_PX);
          },
          height: this.detailsHeight,
          tabs: detailsPanels.map((tab) => {
            return {key: tab.key, name: tab.name};
          }),
          currentTabKey: currentTabDetails?.key,
        }),
        m('.details-panel-container.x-scrollable',
          m(PanelContainer, {doesScroll: true, panels, kind: 'DETAILS'})));
  }
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {timeToCode} from '../common/time';

import {Flow, globals} from './globals';
import {BLANK_CHECKBOX, CHECKBOX} from './icons';
import {Panel, PanelSize} from './panel';

export const ALL_CATEGORIES = '_all_';

export function getFlowCategories(flow: Flow): string[] {
  const categories: string[] = [];
  // v1 flows have their own categories
  if (flow.category) {
    categories.push(...flow.category.split(','));
    return categories;
  }
  const beginCats = flow.begin.sliceCategory.split(',');
  const endCats = flow.end.sliceCategory.split(',');
  categories.push(...new Set([...beginCats, ...endCats]));
  return categories;
}

export class FlowEventsPanel extends Panel {
  view() {
    const selection = globals.state.currentSelection;
    if (!selection || selection.kind !== 'CHROME_SLICE') {
      return;
    }

    const flowClickHandler = (sliceId: number, trackId: number) => {
      const uiTrackId = globals.state.uiTrackIdByTraceTrackId[trackId];
      if (uiTrackId) {
        globals.makeSelection(
            Actions.selectChromeSlice(
                {id: sliceId, trackId: uiTrackId, table: 'slice'}),
            'bound_flows');
      }
    };

    // Can happen only for flow events version 1
    const haveCategories =
        globals.connectedFlows.filter((flow) => flow.category).length > 0;

    const columns = [
      m('th', 'Direction'),
      m('th', 'Duration'),
      m('th', 'Connected Slice ID'),
      m('th', 'Connected Slice Name'),
      m('th', 'Thread Out'),
      m('th', 'Thread In'),
      m('th', 'Process Out'),
      m('th', 'Process In'),
    ];

    if (haveCategories) {
      columns.push(m('th', 'Flow Category'));
      columns.push(m('th', 'Flow Name'));
    }

    const rows = [m('tr', columns)];

    // Fill the table with all the directly connected flow events
    globals.connectedFlows.forEach((flow) => {
      if (selection.id !== flow.begin.sliceId &&
          selection.id !== flow.end.sliceId) {
        return;
      }

      const outgoing = selection.id === flow.begin.sliceId;
      const otherEnd = (outgoing ? flow.end : flow.begin);

      const args = {
        onclick: () => flowClickHandler(otherEnd.sliceId, otherEnd.trackId),
        onmousemove: () => globals.dispatch(
            Actions.setHighlightedSliceId({sliceId: otherEnd.sliceId})),
        onmouseleave: () =>
            globals.dispatch(Actions.setHighlightedSliceId({sliceId: -1})),
      };

      const data = [
        m('td.flow-link', args, outgoing ? 'Outgoing' : 'Incoming'),
        m('td.flow-link', args, timeToCode(flow.dur)),
        m('td.flow-link', args, otherEnd.sliceId.toString()),
        m('td.flow-link', args, otherEnd.sliceName),
        m('td.flow-link', args, flow.begin.threadName),
        m('td.flow-link', args, flow.end.threadName),
        m('td.flow-link', args, flow.begin.processName),
        m('td.flow-link', args, flow.end.processName),
      ];

      if (haveCategories) {
        data.push(m('td.flow-info', flow.category || '-'));
        data.push(m('td.flow-info', flow.name || '-'));
      }

      rows.push(m('tr', data));
    });

    return m('.details-panel', [
      m('.details-panel-heading', m('h2', `Flow events`)),
      m('.flow-events-table', m('table', rows)),
    ]);
  }

  renderCanvas(_ctx: CanvasRenderingContext2D, _size: PanelSize) {}
}

export class FlowEventsAreaSelectedPanel extends Panel {
  view() {
    const selection = globals.state.currentSelection;
    if (!selection || selection.kind !== 'AREA') {
      return;
    }

    const columns = [
      m('th', 'Flow Category'),
      m('th', 'Number of flows'),
      m('th',
        'Show',
        m('a.warning',
          m('i.material-icons', 'warning'),
          m('.tooltip',
            'Showing a large number of flows may impact performance.'))),
    ];

    const rows = [m('tr', columns)];

    const categoryToFlowsNum = new Map<string, number>();

    globals.selectedFlows.forEach((flow) => {
      const categories = getFlowCategories(flow);
      categories.forEach((cat) => {
        if (!categoryToFlowsNum.has(cat)) {
          categoryToFlowsNum.set(cat, 0);
        }
        categoryToFlowsNum.set(cat, categoryToFlowsNum.get(cat)! + 1);
      });
    });

    const allWasChecked = globals.visibleFlowCategories.get(ALL_CATEGORIES);
    rows.push(m('tr.sum', [
      m('td.sum-data', 'All'),
      m('td.sum-data', globals.selectedFlows.length),
      m('td.sum-data',
        m('i.material-icons',
          {
            onclick: () => {
              if (allWasChecked) {
                globals.visibleFlowCategories.clear();
              } else {
                categoryToFlowsNum.forEach((_, cat) => {
                  globals.visibleFlowCategories.set(cat, true);
                });
              }
              globals.visibleFlowCategories.set(ALL_CATEGORIES, !allWasChecked);
              globals.rafScheduler.scheduleFullRedraw();
            },
          },
          allWasChecked ? CHECKBOX : BLANK_CHECKBOX)),
    ]));

    categoryToFlowsNum.forEach((num, cat) => {
      const wasChecked = globals.visibleFlowCategories.get(cat) ||
          globals.visibleFlowCategories.get(ALL_CATEGORIES);
      const data = [
        m('td.flow-info', cat),
        m('td.flow-info', num),
        m('td.flow-info',
          m('i.material-icons',
            {
              onclick: () => {
                if (wasChecked) {
                  globals.visibleFlowCategories.set(ALL_CATEGORIES, false);
                }
                globals.visibleFlowCategories.set(cat, !wasChecked);
                globals.rafScheduler.scheduleFullRedraw();
              },
            },
            wasChecked ? CHECKBOX : BLANK_CHECKBOX)),
      ];
      rows.push(m('tr', data));
    });

    return m('.details-panel', [
      m('.details-panel-heading', m('h2', `Selected flow events`)),
      m('.flow-events-table', m('table', rows)),
    ]);
  }

  renderCanvas(_ctx: CanvasRenderingContext2D, _size: PanelSize) {}
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {globals} from './globals';
import {createPage} from './pages';
import {Button} from './widgets/button';

function getCurrSelectedMetric() {
  const {availableMetrics, selectedIndex} = globals.state.metrics;
  if (!availableMetrics) return undefined;
  if (selectedIndex === undefined) return undefined;
  return availableMetrics[selectedIndex];
}

class MetricResult implements m.ClassComponent {
  view() {
    const metricResult = globals.metricResult;
    if (metricResult === undefined) return undefined;
    const currSelection = getCurrSelectedMetric();
    if (!(metricResult && metricResult.name === currSelection)) {
      return undefined;
    }
    if (metricResult.error !== undefined) {
      return m('pre.metric-error', metricResult.error);
    }
    if (metricResult.resultString !== undefined) {
      return m('pre', metricResult.resultString);
    }
    return undefined;
  }
}

class MetricPicker implements m.ClassComponent {
  view() {
    const {availableMetrics, selectedIndex} = globals.state.metrics;
    if (availableMetrics === undefined) return 'Loading metrics...';
    if (availableMetrics.length === 0) return 'No metrics available';
    if (selectedIndex === undefined) {
      throw Error('Should not happen when avaibleMetrics is non-empty');
    }

    return m('div', [
      'Select a metric:',
      m('select',
        {
          selectedIndex: globals.state.metrics.selectedIndex,
          onchange: (e: InputEvent) => {
            globals.dispatch(Actions.setMetricSelectedIndex(
                {index: (e.target as HTMLSelectElement).selectedIndex}));
          },
        },
        availableMetrics.map(
            (metric) => m('option', {value: metric, key: metric}, metric))),
      m(Button, {
        onclick: () => globals.dispatch(Actions.requestSelectedMetric({})),
        label: 'Run',
      }),
    ]);
  }
}

export const MetricsPage = createPage({
  view() {
    return m(
        '.metrics-page',
        m(MetricPicker),
        m(MetricResult),
    );
  },
});
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {EqualsBuilder} from '../common/comparator_builder';
import {ColumnType} from '../common/query_result';
import {SortDirection} from '../common/state';

// Node in the hierarchical pivot tree. Only leaf nodes contain data from the
// query result.
export interface PivotTree {
  // Whether the node should be collapsed in the UI, false by default and can
  // be toggled with the button.
  isCollapsed: boolean;

  // Non-empty only in internal nodes.
  children: Map<ColumnType, PivotTree>;
  aggregates: ColumnType[];

  // Non-empty only in leaf nodes.
  rows: ColumnType[][];
}

export type AggregationFunction = 'COUNT'|'SUM'|'MIN'|'MAX'|'AVG';

// Queried "table column" is either:
// 1. A real one, represented as object with table and column name.
// 2. Pseudo-column 'count' that's rendered as '1' in SQL to use in queries like
// `select sum(1), name from slice group by name`.

export interface RegularColumn {
  kind: 'regular';
  table: string;
  column: string;
}

export interface ArgumentColumn {
  kind: 'argument';
  argument: string;
}

export type TableColumn = RegularColumn|ArgumentColumn;

export function tableColumnEquals(t1: TableColumn, t2: TableColumn): boolean {
  switch (t1.kind) {
    case 'argument': {
      return t2.kind === 'argument' && t1.argument === t2.argument;
    }
    case 'regular': {
      return t2.kind === 'regular' && t1.table === t2.table &&
          t1.column === t2.column;
    }
  }
}

export function toggleEnabled<T>(
    compare: (fst: T, snd: T) => boolean,
    arr: T[],
    column: T,
    enabled: boolean): void {
  if (enabled && arr.find((value) => compare(column, value)) === undefined) {
    arr.push(column);
  }
  if (!enabled) {
    const index = arr.findIndex((value) => compare(column, value));
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }
}

export interface Aggregation {
  aggregationFunction: AggregationFunction;
  column: TableColumn;

  // If the aggregation is sorted, the field contains a sorting direction.
  sortDirection?: SortDirection;
}

export function aggregationEquals(agg1: Aggregation, agg2: Aggregation) {
  return new EqualsBuilder(agg1, agg2)
      .comparePrimitive((agg) => agg.aggregationFunction)
      .compare(tableColumnEquals, (agg) => agg.column)
      .equals();
}

// Used to convert TableColumn to a string in order to store it in a Map, as
// ES6 does not support compound Set/Map keys. This function should only be used
// for interning keys, and does not have any requirements beyond different
// TableColumn objects mapping to different strings.
export function columnKey(tableColumn: TableColumn): string {
  switch (tableColumn.kind) {
    case 'argument': {
      return `argument:${tableColumn.argument}`;
    }
    case 'regular': {
      return `${tableColumn.table}.${tableColumn.column}`;
    }
  }
}

export function aggregationKey(aggregation: Aggregation): string {
  return `${aggregation.aggregationFunction}:${columnKey(aggregation.column)}`;
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {
  AggregateData,
  Column,
  ThreadStateExtra,
} from '../common/aggregation_data';
import {colorForState, textColorForState} from '../common/colorizer';
import {translateState} from '../common/thread_state';

import {globals} from './globals';
import {Panel} from './panel';

export interface AggregationPanelAttrs {
  data: AggregateData;
  kind: string;
}

export class AggregationPanel extends Panel<AggregationPanelAttrs> {
  view({attrs}: m.CVnode<AggregationPanelAttrs>) {
    return m(
        '.details-panel',
        m('.details-panel-heading.aggregation',
          attrs.data.extra !== undefined &&
                  attrs.data.extra.kind === 'THREAD_STATE' ?
              this.showStateSummary(attrs.data.extra) :
              null,
          this.showTimeRange(),
          m('table',
            m('tr',
              attrs.data.columns.map(
                  (col) => this.formatColumnHeading(col, attrs.kind))),
            m('tr.sum', attrs.data.columnSums.map((sum) => {
              const sumClass = sum === '' ? 'td' : 'td.sum-data';
              return m(sumClass, sum);
            })))),
        m(
            '.details-table.aggregation',
            m('table', this.getRows(attrs.data)),
            ));
  }

  formatColumnHeading(col: Column, id: string) {
    const pref = globals.state.aggregatePreferences[id];
    let sortIcon = '';
    if (pref && pref.sorting && pref.sorting.column === col.columnId) {
      sortIcon = pref.sorting.direction === 'DESC' ? 'arrow_drop_down' :
                                                     'arrow_drop_up';
    }
    return m(
        'th',
        {
          onclick: () => {
            globals.dispatch(
                Actions.updateAggregateSorting({id, column: col.columnId}));
          },
        },
        col.title,
        m('i.material-icons', sortIcon));
  }

  getRows(data: AggregateData) {
    if (data.columns.length === 0) return;
    const rows = [];
    for (let i = 0; i < data.columns[0].data.length; i++) {
      const row = [];
      for (let j = 0; j < data.columns.length; j++) {
        row.push(m('td', this.getFormattedData(data, i, j)));
      }
      rows.push(m('tr', row));
    }
    return rows;
  }

  getFormattedData(data: AggregateData, rowIndex: number, columnIndex: number) {
    switch (data.columns[columnIndex].kind) {
      case 'STRING':
        return data.strings[data.columns[columnIndex].data[rowIndex]];
      case 'TIMESTAMP_NS':
        return `${data.columns[columnIndex].data[rowIndex] / 1000000}`;
      case 'STATE': {
        const concatState =
            data.strings[data.columns[columnIndex].data[rowIndex]];
        const split = concatState.split(',');
        const ioWait =
            split[1] === 'NULL' ? undefined : !!Number.parseInt(split[1], 10);
        return translateState(split[0], ioWait);
      }
      case 'NUMBER':
      default:
        return data.columns[columnIndex].data[rowIndex];
    }
  }

  showTimeRange() {
    const selection = globals.state.currentSelection;
    if (selection === null || selection.kind !== 'AREA') return undefined;
    const selectedArea = globals.state.areas[selection.areaId];
    const rangeDurationMs = (selectedArea.endSec - selectedArea.startSec) * 1e3;
    return m('.time-range', `Selected range: ${rangeDurationMs.toFixed(6)} ms`);
  }

  // Thread state aggregation panel only
  showStateSummary(data: ThreadStateExtra) {
    if (data === undefined) return undefined;
    const states = [];
    for (let i = 0; i < data.states.length; i++) {
      const color = colorForState(data.states[i]);
      const textColor = textColorForState(data.states[i]);
      const width = data.values[i] / data.totalMs * 100;
      states.push(
          m('.state',
            {
              style: {
                background: `hsl(${color.h},${color.s}%,${color.l}%)`,
                color: `${textColor}`,
                width: `${width}%`,
              },
            },
            `${data.states[i]}: ${data.values[i]} ms`));
    }
    return m('.states', states);
  }

  renderCanvas() {}
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Actions} from '../common/actions';
import {globals} from './globals';

let lastDragTarget: EventTarget|null = null;

export function installFileDropHandler() {
  window.ondragenter = (evt: DragEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    lastDragTarget = evt.target;
    if (dragEventHasFiles(evt)) {
      document.body.classList.add('filedrag');
    }
  };

  window.ondragleave = (evt: DragEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.target === lastDragTarget) {
      document.body.classList.remove('filedrag');
    }
  };

  window.ondrop = (evt: DragEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    document.body.classList.remove('filedrag');
    if (evt.dataTransfer && dragEventHasFiles(evt)) {
      const file = evt.dataTransfer.files[0];
      if (file) {
        globals.dispatch(Actions.openTraceFromFile({file}));
      }
    }
    evt.preventDefault();
  };

  window.ondragover = (evt: DragEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
  };
}

function dragEventHasFiles(event: DragEvent): boolean {
  if (event.dataTransfer && event.dataTransfer.types) {
    for (const type of event.dataTransfer.types) {
      if (type === 'Files') return true;
    }
  }
  return false;
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Returns a wrapper around |f| which calls f at most once every |ms|ms.
export function ratelimit(f: Function, ms: number): Function {
  let inProgess = false;
  return () => {
    if (inProgess) {
      return;
    }
    inProgess = true;
    setTimeout(() => {
      f();
      inProgess = false;
    }, ms);
  };
}

// Returns a wrapper around |f| which waits for a |ms|ms pause in calls
// before calling |f|.
export function debounce(f: Function, ms: number): Function {
  let timerId: undefined|ReturnType<typeof setTimeout>;
  return () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      f();
      timerId = undefined;
    }, ms);
  };
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Actions} from '../common/actions';
import {
  ConversionJobName,
  ConversionJobStatus,
} from '../common/conversion_jobs';

import {download} from './clipboard';
import {maybeShowErrorDialog} from './error_dialog';
import {globals} from './globals';
import {openBufferWithLegacyTraceViewer} from './legacy_trace_viewer';

type Args = UpdateStatusArgs|UpdateJobStatusArgs|DownloadFileArgs|
    OpenTraceInLegacyArgs|ErrorArgs;

interface UpdateStatusArgs {
  kind: 'updateStatus';
  status: string;
}

interface UpdateJobStatusArgs {
  kind: 'updateJobStatus';
  name: ConversionJobName;
  status: ConversionJobStatus;
}

interface DownloadFileArgs {
  kind: 'downloadFile';
  buffer: Uint8Array;
  name: string;
}

interface OpenTraceInLegacyArgs {
  kind: 'openTraceInLegacy';
  buffer: Uint8Array;
}

interface ErrorArgs {
  kind: 'error';
  error: string;
}


function handleOnMessage(msg: MessageEvent): void {
  const args: Args = msg.data;
  if (args.kind === 'updateStatus') {
    globals.dispatch(Actions.updateStatus({
      msg: args.status,
      timestamp: Date.now() / 1000,
    }));
  } else if (args.kind === 'updateJobStatus') {
    globals.setConversionJobStatus(args.name, args.status);
  } else if (args.kind === 'downloadFile') {
    download(new File([new Blob([args.buffer])], args.name));
  } else if (args.kind === 'openTraceInLegacy') {
    const str = (new TextDecoder('utf-8')).decode(args.buffer);
    openBufferWithLegacyTraceViewer('trace.json', str, 0);
  } else if (args.kind === 'error') {
    maybeShowErrorDialog(args.error);
  } else {
    throw new Error(`Unhandled message ${JSON.stringify(args)}`);
  }
}

function makeWorkerAndPost(msg: unknown) {
  const worker = new Worker(globals.root + 'traceconv_bundle.js');
  worker.onmessage = handleOnMessage;
  worker.postMessage(msg);
}

export function convertTraceToJsonAndDownload(trace: Blob) {
  makeWorkerAndPost({
    kind: 'ConvertTraceAndDownload',
    trace,
    format: 'json',
  });
}

export function convertTraceToSystraceAndDownload(trace: Blob) {
  makeWorkerAndPost({
    kind: 'ConvertTraceAndDownload',
    trace,
    format: 'systrace',
  });
}

export function convertToJson(trace: Blob, truncate?: 'start'|'end') {
  makeWorkerAndPost({
    kind: 'ConvertTraceAndOpenInLegacy',
    trace,
    truncate,
  });
}

export function convertTraceToPprofAndDownload(
    trace: Blob, pid: number, ts: number) {
  makeWorkerAndPost({
    kind: 'ConvertTraceToPprof',
    trace,
    pid,
    ts,
  });
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {assertExists} from '../base/logging';
import {Actions, DeferredAction} from '../common/actions';
import {AggregateData} from '../common/aggregation_data';
import {Args, ArgsTree} from '../common/arg_types';
import {
  ConversionJobName,
  ConversionJobStatus,
} from '../common/conversion_jobs';
import {createEmptyState} from '../common/empty_state';
import {Engine} from '../common/engine';
import {MetricResult} from '../common/metric_data';
import {CurrentSearchResults, SearchSummary} from '../common/search_data';
import {CallsiteInfo, EngineConfig, ProfileType, State} from '../common/state';
import {fromNs, toNs} from '../common/time';

import {Analytics, initAnalytics} from './analytics';
import {BottomTabList} from './bottom_tab';
import {FrontendLocalState} from './frontend_local_state';
import {RafScheduler} from './raf_scheduler';
import {Router} from './router';
import {ServiceWorkerController} from './service_worker_controller';

type Dispatch = (action: DeferredAction) => void;
type TrackDataStore = Map<string, {}>;
type QueryResultsStore = Map<string, {}|undefined>;
type AggregateDataStore = Map<string, AggregateData>;
type Description = Map<string, string>;

export interface SliceDetails {
  ts?: number;
  absTime?: string;
  dur?: number;
  threadTs?: number;
  threadDur?: number;
  priority?: number;
  endState?: string|null;
  cpu?: number;
  id?: number;
  threadStateId?: number;
  utid?: number;
  wakeupTs?: number;
  wakerUtid?: number;
  wakerCpu?: number;
  category?: string;
  name?: string;
  tid?: number;
  threadName?: string;
  pid?: number;
  processName?: string;
  uid?: number;
  packageName?: string;
  versionCode?: number;
  args?: Args;
  argsTree?: ArgsTree;
  description?: Description;
}

export interface FlowPoint {
  trackId: number;

  sliceName: string;
  sliceCategory: string;
  sliceId: number;
  sliceStartTs: number;
  sliceEndTs: number;
  // Thread and process info. Only set in sliceSelected not in areaSelected as
  // the latter doesn't display per-flow info and it'd be a waste to join
  // additional tables for undisplayed info in that case. Nothing precludes
  // adding this in a future iteration however.
  threadName: string;
  processName: string;

  depth: number;

  // TODO(altimin): Ideally we should have a generic mechanism for allowing to
  // customise the name here, but for now we are hardcording a few
  // Chrome-specific bits in the query here.
  sliceChromeCustomName?: string;
}

export interface Flow {
  id: number;

  begin: FlowPoint;
  end: FlowPoint;
  dur: number;

  category?: string;
  name?: string;
}

export interface CounterDetails {
  startTime?: number;
  value?: number;
  delta?: number;
  duration?: number;
  name?: string;
}

export interface ThreadStateDetails {
  ts?: number;
  dur?: number;
}

export interface FlamegraphDetails {
  type?: ProfileType;
  id?: number;
  startNs?: number;
  durNs?: number;
  pids?: number[];
  upids?: number[];
  flamegraph?: CallsiteInfo[];
  expandedCallsite?: CallsiteInfo;
  viewingOption?: string;
  expandedId?: number;
  // isInAreaSelection is true if a flamegraph is part of the current area
  // selection.
  isInAreaSelection?: boolean;
  // When heap_graph_non_finalized_graph has a count >0, we mark the graph
  // as incomplete.
  graphIncomplete?: boolean;
}

export interface CpuProfileDetails {
  id?: number;
  ts?: number;
  utid?: number;
  stack?: CallsiteInfo[];
}

export interface QuantizedLoad {
  startSec: number;
  endSec: number;
  load: number;
}
type OverviewStore = Map<string, QuantizedLoad[]>;

export interface ThreadDesc {
  utid: number;
  tid: number;
  threadName: string;
  pid?: number;
  procName?: string;
  cmdline?: string;
}
type ThreadMap = Map<number, ThreadDesc>;

export interface FtraceEvent {
  id: number;
  ts: number;
  name: string;
  cpu: number;
  thread: string|null;
  process: string|null;
  args: string;
}

export interface FtracePanelData {
  events: FtraceEvent[];
  offset: number;
  numEvents: number;  // Number of events in the visible window
}

export interface FtraceStat {
  name: string;
  count: number;
}

function getRoot() {
  // Works out the root directory where the content should be served from
  // e.g. `http://origin/v1.2.3/`.
  const script = document.currentScript as HTMLScriptElement;

  // Needed for DOM tests, that do not have script element.
  if (script === null) {
    return '';
  }

  let root = script.src;
  root = root.substr(0, root.lastIndexOf('/') + 1);
  return root;
}

/**
 * Global accessors for state/dispatch in the frontend.
 */
class Globals {
  readonly root = getRoot();

  bottomTabList?: BottomTabList = undefined;

  private _testing = false;
  private _dispatch?: Dispatch = undefined;
  private _state?: State = undefined;
  private _frontendLocalState?: FrontendLocalState = undefined;
  private _rafScheduler?: RafScheduler = undefined;
  private _serviceWorkerController?: ServiceWorkerController = undefined;
  private _logging?: Analytics = undefined;
  private _isInternalUser: boolean|undefined = undefined;

  // TODO(hjd): Unify trackDataStore, queryResults, overviewStore, threads.
  private _trackDataStore?: TrackDataStore = undefined;
  private _queryResults?: QueryResultsStore = undefined;
  private _overviewStore?: OverviewStore = undefined;
  private _aggregateDataStore?: AggregateDataStore = undefined;
  private _threadMap?: ThreadMap = undefined;
  private _sliceDetails?: SliceDetails = undefined;
  private _threadStateDetails?: ThreadStateDetails = undefined;
  private _connectedFlows?: Flow[] = undefined;
  private _selectedFlows?: Flow[] = undefined;
  private _visibleFlowCategories?: Map<string, boolean> = undefined;
  private _counterDetails?: CounterDetails = undefined;
  private _flamegraphDetails?: FlamegraphDetails = undefined;
  private _cpuProfileDetails?: CpuProfileDetails = undefined;
  private _numQueriesQueued = 0;
  private _bufferUsage?: number = undefined;
  private _recordingLog?: string = undefined;
  private _traceErrors?: number = undefined;
  private _metricError?: string = undefined;
  private _metricResult?: MetricResult = undefined;
  private _jobStatus?: Map<ConversionJobName, ConversionJobStatus> = undefined;
  private _router?: Router = undefined;
  private _embeddedMode?: boolean = undefined;
  private _hideSidebar?: boolean = undefined;
  private _ftraceCounters?: FtraceStat[] = undefined;
  private _ftracePanelData?: FtracePanelData = undefined;

  // TODO(hjd): Remove once we no longer need to update UUID on redraw.
  private _publishRedraw?: () => void = undefined;

  private _currentSearchResults: CurrentSearchResults = {
    sliceIds: new Float64Array(0),
    tsStarts: new Float64Array(0),
    utids: new Float64Array(0),
    trackIds: [],
    sources: [],
    totalResults: 0,
  };
  searchSummary: SearchSummary = {
    tsStarts: new Float64Array(0),
    tsEnds: new Float64Array(0),
    count: new Uint8Array(0),
  };

  engines = new Map<string, Engine>();

  initialize(dispatch: Dispatch, router: Router) {
    this._dispatch = dispatch;
    this._router = router;
    this._state = createEmptyState();
    this._frontendLocalState = new FrontendLocalState();
    this._rafScheduler = new RafScheduler();
    this._serviceWorkerController = new ServiceWorkerController();
    this._testing =
        self.location && self.location.search.indexOf('testing=1') >= 0;
    this._logging = initAnalytics();

    // TODO(hjd): Unify trackDataStore, queryResults, overviewStore, threads.
    this._trackDataStore = new Map<string, {}>();
    this._queryResults = new Map<string, {}>();
    this._overviewStore = new Map<string, QuantizedLoad[]>();
    this._aggregateDataStore = new Map<string, AggregateData>();
    this._threadMap = new Map<number, ThreadDesc>();
    this._sliceDetails = {};
    this._connectedFlows = [];
    this._selectedFlows = [];
    this._visibleFlowCategories = new Map<string, boolean>();
    this._counterDetails = {};
    this._threadStateDetails = {};
    this._flamegraphDetails = {};
    this._cpuProfileDetails = {};
    this.engines.clear();
  }

  get router(): Router {
    return assertExists(this._router);
  }

  get publishRedraw(): () => void {
    return this._publishRedraw || (() => {});
  }

  set publishRedraw(f: () => void) {
    this._publishRedraw = f;
  }

  get state(): State {
    return assertExists(this._state);
  }

  set state(state: State) {
    this._state = assertExists(state);
  }

  get dispatch(): Dispatch {
    return assertExists(this._dispatch);
  }

  dispatchMultiple(actions: DeferredAction[]): void {
    const dispatch = this.dispatch;
    for (const action of actions) {
      dispatch(action);
    }
  }

  get frontendLocalState() {
    return assertExists(this._frontendLocalState);
  }

  get rafScheduler() {
    return assertExists(this._rafScheduler);
  }

  get logging() {
    return assertExists(this._logging);
  }

  get serviceWorkerController() {
    return assertExists(this._serviceWorkerController);
  }

  // TODO(hjd): Unify trackDataStore, queryResults, overviewStore, threads.
  get overviewStore(): OverviewStore {
    return assertExists(this._overviewStore);
  }

  get trackDataStore(): TrackDataStore {
    return assertExists(this._trackDataStore);
  }

  get queryResults(): QueryResultsStore {
    return assertExists(this._queryResults);
  }

  get threads() {
    return assertExists(this._threadMap);
  }

  get sliceDetails() {
    return assertExists(this._sliceDetails);
  }

  set sliceDetails(click: SliceDetails) {
    this._sliceDetails = assertExists(click);
  }

  get threadStateDetails() {
    return assertExists(this._threadStateDetails);
  }

  set threadStateDetails(click: ThreadStateDetails) {
    this._threadStateDetails = assertExists(click);
  }

  get connectedFlows() {
    return assertExists(this._connectedFlows);
  }

  set connectedFlows(connectedFlows: Flow[]) {
    this._connectedFlows = assertExists(connectedFlows);
  }

  get selectedFlows() {
    return assertExists(this._selectedFlows);
  }

  set selectedFlows(selectedFlows: Flow[]) {
    this._selectedFlows = assertExists(selectedFlows);
  }

  get visibleFlowCategories() {
    return assertExists(this._visibleFlowCategories);
  }

  set visibleFlowCategories(visibleFlowCategories: Map<string, boolean>) {
    this._visibleFlowCategories = assertExists(visibleFlowCategories);
  }

  get counterDetails() {
    return assertExists(this._counterDetails);
  }

  set counterDetails(click: CounterDetails) {
    this._counterDetails = assertExists(click);
  }

  get aggregateDataStore(): AggregateDataStore {
    return assertExists(this._aggregateDataStore);
  }

  get flamegraphDetails() {
    return assertExists(this._flamegraphDetails);
  }

  set flamegraphDetails(click: FlamegraphDetails) {
    this._flamegraphDetails = assertExists(click);
  }

  get traceErrors() {
    return this._traceErrors;
  }

  setTraceErrors(arg: number) {
    this._traceErrors = arg;
  }

  get metricError() {
    return this._metricError;
  }

  setMetricError(arg: string) {
    this._metricError = arg;
  }

  get metricResult() {
    return this._metricResult;
  }

  setMetricResult(result: MetricResult) {
    this._metricResult = result;
  }

  get cpuProfileDetails() {
    return assertExists(this._cpuProfileDetails);
  }

  set cpuProfileDetails(click: CpuProfileDetails) {
    this._cpuProfileDetails = assertExists(click);
  }

  set numQueuedQueries(value: number) {
    this._numQueriesQueued = value;
  }

  get numQueuedQueries() {
    return this._numQueriesQueued;
  }

  get bufferUsage() {
    return this._bufferUsage;
  }

  get recordingLog() {
    return this._recordingLog;
  }

  get currentSearchResults() {
    return this._currentSearchResults;
  }

  set currentSearchResults(results: CurrentSearchResults) {
    this._currentSearchResults = results;
  }

  get hasFtrace(): boolean {
    return Boolean(this._ftraceCounters && this._ftraceCounters.length > 0);
  }

  get ftraceCounters(): FtraceStat[]|undefined {
    return this._ftraceCounters;
  }

  set ftraceCounters(value: FtraceStat[]|undefined) {
    this._ftraceCounters = value;
  }

  getConversionJobStatus(name: ConversionJobName): ConversionJobStatus {
    return this.getJobStatusMap().get(name) || ConversionJobStatus.NotRunning;
  }

  setConversionJobStatus(name: ConversionJobName, status: ConversionJobStatus) {
    const map = this.getJobStatusMap();
    if (status === ConversionJobStatus.NotRunning) {
      map.delete(name);
    } else {
      map.set(name, status);
    }
  }

  private getJobStatusMap(): Map<ConversionJobName, ConversionJobStatus> {
    if (!this._jobStatus) {
      this._jobStatus = new Map();
    }
    return this._jobStatus;
  }

  get embeddedMode(): boolean {
    return !!this._embeddedMode;
  }

  set embeddedMode(value: boolean) {
    this._embeddedMode = value;
  }

  get hideSidebar(): boolean {
    return !!this._hideSidebar;
  }

  set hideSidebar(value: boolean) {
    this._hideSidebar = value;
  }

  setBufferUsage(bufferUsage: number) {
    this._bufferUsage = bufferUsage;
  }

  setTrackData(id: string, data: {}) {
    this.trackDataStore.set(id, data);
  }

  setRecordingLog(recordingLog: string) {
    this._recordingLog = recordingLog;
  }

  setAggregateData(kind: string, data: AggregateData) {
    this.aggregateDataStore.set(kind, data);
  }

  getCurResolution() {
    // Truncate the resolution to the closest power of 2 (in nanosecond space).
    // We choose to work in ns space because resolution is consumed be track
    // controllers for quantization and they rely on resolution to be a power
    // of 2 in nanosecond form. This is property does not hold if we work in
    // second space.
    //
    // This effectively means the resolution changes approximately every 6 zoom
    // levels. Logic: each zoom level represents a delta of 0.1 * (visible
    // window span). Therefore, zooming out by six levels is 1.1^6 ~= 2.
    // Similarily, zooming in six levels is 0.9^6 ~= 0.5.
    const pxToSec = this.frontendLocalState.timeScale.deltaPxToDuration(1);
    // TODO(b/186265930): Remove once fixed:
    if (!isFinite(pxToSec)) {
      // Resolution is in pixels per second so 1000 means 1px = 1ms.
      console.error(`b/186265930: Bad pxToSec suppressed ${pxToSec}`);
      return fromNs(Math.pow(2, Math.floor(Math.log2(toNs(1000)))));
    }
    const pxToNs = Math.max(toNs(pxToSec), 1);
    const resolution = fromNs(Math.pow(2, Math.floor(Math.log2(pxToNs))));
    const log2 = Math.log2(toNs(resolution));
    if (log2 % 1 !== 0) {
      throw new Error(`Resolution should be a power of two.
        pxToSec: ${pxToSec},
        pxToNs: ${pxToNs},
        resolution: ${resolution},
        log2: ${Math.log2(toNs(resolution))}`);
    }
    return resolution;
  }

  getCurrentEngine(): EngineConfig|undefined {
    return this.state.engine;
  }

  get ftracePanelData(): FtracePanelData|undefined {
    return this._ftracePanelData;
  }

  set ftracePanelData(data: FtracePanelData|undefined) {
    this._ftracePanelData = data;
  }

  makeSelection(action: DeferredAction<{}>, tabToOpen = 'current_selection') {
    // A new selection should cancel the current search selection.
    globals.dispatch(Actions.setSearchIndex({index: -1}));
    const tab = action.type === 'deselect' ? undefined : tabToOpen;
    globals.dispatch(Actions.setCurrentTab({tab}));
    globals.dispatch(action);
  }

  resetForTesting() {
    this._dispatch = undefined;
    this._state = undefined;
    this._frontendLocalState = undefined;
    this._rafScheduler = undefined;
    this._serviceWorkerController = undefined;

    // TODO(hjd): Unify trackDataStore, queryResults, overviewStore, threads.
    this._trackDataStore = undefined;
    this._queryResults = undefined;
    this._overviewStore = undefined;
    this._threadMap = undefined;
    this._sliceDetails = undefined;
    this._threadStateDetails = undefined;
    this._aggregateDataStore = undefined;
    this._numQueriesQueued = 0;
    this._metricResult = undefined;
    this._currentSearchResults = {
      sliceIds: new Float64Array(0),
      tsStarts: new Float64Array(0),
      utids: new Float64Array(0),
      trackIds: [],
      sources: [],
      totalResults: 0,
    };
  }

  // This variable is set by the is_internal_user.js script if the user is a
  // googler. This is used to avoid exposing features that are not ready yet
  // for public consumption. The gated features themselves are not secret.
  // If a user has been detected as a Googler once, make that sticky in
  // localStorage, so that we keep treating them as such when they connect over
  // public networks.
  get isInternalUser() {
    if (this._isInternalUser === undefined) {
      this._isInternalUser = localStorage.getItem('isInternalUser') === '1';
    }
    return this._isInternalUser;
  }

  set isInternalUser(value: boolean) {
    localStorage.setItem('isInternalUser', value ? '1' : '0');
    this._isInternalUser = value;
  }

  get testing() {
    return this._testing;
  }

  // Used when switching to the legacy TraceViewer UI.
  // Most resources are cleaned up by replacing the current |window| object,
  // however pending RAFs and workers seem to outlive the |window| and need to
  // be cleaned up explicitly.
  shutdown() {
    this._rafScheduler!.shutdown();
  }
}

export const globals = new Globals();
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {CallsiteInfo} from '../common/state';
import {globals} from './globals';
import {Panel} from './panel';

interface CpuProfileDetailsPanelAttrs {}

export class CpuProfileDetailsPanel extends Panel<CpuProfileDetailsPanelAttrs> {
  view() {
    const sampleDetails = globals.cpuProfileDetails;
    const header =
        m('.details-panel-heading', m('h2', `CPU Profile Sample Details`));
    if (!sampleDetails || sampleDetails.id === undefined) {
      return m('.details-panel', header);
    }

    return m(
        '.details-panel',
        header,
        m('table', this.getStackText(sampleDetails.stack)));
  }

  getStackText(stack?: CallsiteInfo[]): m.Vnode[] {
    if (!stack) return [];

    const result = [];
    for (let i = stack.length - 1; i >= 0; --i) {
      result.push(m('tr', m('td', stack[i].name), m('td', stack[i].mapping)));
    }

    return result;
  }

  renderCanvas() {}
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Actions} from '../common/actions';
import {Area} from '../common/state';

import {Flow, globals} from './globals';
import {toggleHelp} from './help_modal';
import {
  focusHorizontalRange,
  verticalScrollToTrack,
} from './scroll_helper';
import {executeSearch} from './search_handler';

const INSTANT_FOCUS_DURATION_S = 1 / 1e9;  // 1 ns.
type Direction = 'Forward'|'Backward';

// Handles all key events than are not handled by the
// pan and zoom handler. Returns true if the event was handled.
export function handleKey(e: KeyboardEvent, down: boolean): boolean {
  const key = e.key.toLowerCase();
  const selection = globals.state.currentSelection;
  const noModifiers = !(e.ctrlKey || e.metaKey || e.altKey || e.shiftKey);
  const ctrlOrMeta = (e.ctrlKey || e.metaKey) && !(e.altKey || e.shiftKey);
  // No other modifiers other than possibly Shift.
  const maybeShift = !(e.ctrlKey || e.metaKey || e.altKey);

  if (down && 'm' === key && maybeShift) {
    if (selection && selection.kind === 'AREA') {
      globals.dispatch(Actions.toggleMarkCurrentArea({persistent: e.shiftKey}));
    } else if (selection) {
      lockSliceSpan(e.shiftKey);
    }
    return true;
  }
  if (down && 'f' === key && noModifiers) {
    findCurrentSelection();
    return true;
  }
  if (down && 'a' === key && ctrlOrMeta) {
    let tracksToSelect: string[] = [];

    const selection = globals.state.currentSelection;
    if (selection !== null && selection.kind === 'AREA') {
      const area = globals.state.areas[selection.areaId];
      const coversEntireTimeRange =
          globals.state.traceTime.startSec === area.startSec &&
          globals.state.traceTime.endSec === area.endSec;
      if (!coversEntireTimeRange) {
        // If the current selection is an area which does not cover the entire
        // time range, preserve the list of selected tracks and expand the time
        // range.
        tracksToSelect = area.tracks;
      } else {
        // If the entire time range is already covered, update the selection to
        // cover all tracks.
        tracksToSelect = Object.keys(globals.state.tracks);
      }
    } else {
      // If the current selection is not an area, select all.
      tracksToSelect = Object.keys(globals.state.tracks);
    }
    globals.dispatch(Actions.selectArea({
      area: {
        startSec: globals.state.traceTime.startSec,
        endSec: globals.state.traceTime.endSec,
        tracks: tracksToSelect,
      },
    }));
    e.preventDefault();
    return true;
  }
  if (down && 'b' === key && ctrlOrMeta) {
    globals.dispatch(Actions.toggleSidebar({}));
    return true;
  }
  if (down && '?' === key && maybeShift) {
    toggleHelp();
    return true;
  }
  if (down && 'enter' === key && maybeShift) {
    e.preventDefault();
    executeSearch(e.shiftKey);
    return true;
  }
  if (down && 'escape' === key) {
    globals.frontendLocalState.deselectArea();
    globals.makeSelection(Actions.deselect({}));
    globals.dispatch(Actions.removeNote({id: '0'}));
    return true;
  }
  if (down && ']' === key && ctrlOrMeta) {
    focusOtherFlow('Forward');
    return true;
  }
  if (down && ']' === key && noModifiers) {
    moveByFocusedFlow('Forward');
    return true;
  }
  if (down && '[' === key && ctrlOrMeta) {
    focusOtherFlow('Backward');
    return true;
  }
  if (down && '[' === key && noModifiers) {
    moveByFocusedFlow('Backward');
    return true;
  }
  return false;
}

// Search |boundFlows| for |flowId| and return the id following it.
// Returns the first flow id if nothing was found or |flowId| was the last flow
// in |boundFlows|, and -1 if |boundFlows| is empty
function findAnotherFlowExcept(boundFlows: Flow[], flowId: number): number {
  let selectedFlowFound = false;

  if (boundFlows.length === 0) {
    return -1;
  }

  for (const flow of boundFlows) {
    if (selectedFlowFound) {
      return flow.id;
    }

    if (flow.id === flowId) {
      selectedFlowFound = true;
    }
  }
  return boundFlows[0].id;
}

// Change focus to the next flow event (matching the direction)
function focusOtherFlow(direction: Direction) {
  if (!globals.state.currentSelection ||
      globals.state.currentSelection.kind !== 'CHROME_SLICE') {
    return;
  }
  const sliceId = globals.state.currentSelection.id;
  if (sliceId === -1) {
    return;
  }

  const boundFlows = globals.connectedFlows.filter(
      (flow) => flow.begin.sliceId === sliceId && direction === 'Forward' ||
          flow.end.sliceId === sliceId && direction === 'Backward');

  if (direction === 'Backward') {
    const nextFlowId =
        findAnotherFlowExcept(boundFlows, globals.state.focusedFlowIdLeft);
    globals.dispatch(Actions.setHighlightedFlowLeftId({flowId: nextFlowId}));
  } else {
    const nextFlowId =
        findAnotherFlowExcept(boundFlows, globals.state.focusedFlowIdRight);
    globals.dispatch(Actions.setHighlightedFlowRightId({flowId: nextFlowId}));
  }
}

// Select the slice connected to the flow in focus
function moveByFocusedFlow(direction: Direction): void {
  if (!globals.state.currentSelection ||
      globals.state.currentSelection.kind !== 'CHROME_SLICE') {
    return;
  }

  const sliceId = globals.state.currentSelection.id;
  const flowId =
      (direction === 'Backward' ? globals.state.focusedFlowIdLeft :
                                  globals.state.focusedFlowIdRight);

  if (sliceId === -1 || flowId === -1) {
    return;
  }

  // Find flow that is in focus and select corresponding slice
  for (const flow of globals.connectedFlows) {
    if (flow.id === flowId) {
      const flowPoint = (direction === 'Backward' ? flow.begin : flow.end);
      const uiTrackId =
          globals.state.uiTrackIdByTraceTrackId[flowPoint.trackId];
      if (uiTrackId) {
        globals.makeSelection(Actions.selectChromeSlice({
          id: flowPoint.sliceId,
          trackId: uiTrackId,
          table: 'slice',
          scroll: true,
        }));
      }
    }
  }
}

function findTimeRangeOfSelection(): {startTs: number, endTs: number} {
  const selection = globals.state.currentSelection;
  let startTs = -1;
  let endTs = -1;
  if (selection === null) {
    return {startTs, endTs};
  } else if (selection.kind === 'SLICE' || selection.kind === 'CHROME_SLICE') {
    const slice = globals.sliceDetails;
    if (slice.ts && slice.dur !== undefined && slice.dur > 0) {
      startTs = slice.ts + globals.state.traceTime.startSec;
      endTs = startTs + slice.dur;
    } else if (slice.ts) {
      startTs = slice.ts + globals.state.traceTime.startSec;
      // This will handle either:
      // a)slice.dur === -1 -> unfinished slice
      // b)slice.dur === 0  -> instant event
      endTs = slice.dur === -1 ? globals.state.traceTime.endSec :
                                 startTs + INSTANT_FOCUS_DURATION_S;
    }
  } else if (selection.kind === 'THREAD_STATE') {
    const threadState = globals.threadStateDetails;
    if (threadState.ts && threadState.dur) {
      startTs = threadState.ts + globals.state.traceTime.startSec;
      endTs = startTs + threadState.dur;
    }
  } else if (selection.kind === 'COUNTER') {
    startTs = selection.leftTs;
    endTs = selection.rightTs;
  } else if (selection.kind === 'AREA') {
    const selectedArea = globals.state.areas[selection.areaId];
    if (selectedArea) {
      startTs = selectedArea.startSec;
      endTs = selectedArea.endSec;
    }
  } else if (selection.kind === 'NOTE') {
    const selectedNote = globals.state.notes[selection.id];
    // Notes can either be default or area notes. Area notes are handled
    // above in the AREA case.
    if (selectedNote && selectedNote.noteType === 'DEFAULT') {
      startTs = selectedNote.timestamp;
      endTs = selectedNote.timestamp + INSTANT_FOCUS_DURATION_S;
    }
  } else if (selection.kind === 'LOG') {
    // TODO(hjd): Make focus selection work for logs.
  } else if (selection.kind === 'DEBUG_SLICE') {
    startTs = selection.startS;
    if (selection.durationS > 0) {
      endTs = startTs + selection.durationS;
    } else {
      endTs = startTs + INSTANT_FOCUS_DURATION_S;
    }
  }

  return {startTs, endTs};
}


function lockSliceSpan(persistent = false) {
  const range = findTimeRangeOfSelection();
  if (range.startTs !== -1 && range.endTs !== -1 &&
      globals.state.currentSelection !== null) {
    const tracks = globals.state.currentSelection.trackId ?
        [globals.state.currentSelection.trackId] :
        [];
    const area: Area = {startSec: range.startTs, endSec: range.endTs, tracks};
    globals.dispatch(Actions.markArea({area, persistent}));
  }
}

export function findCurrentSelection() {
  const selection = globals.state.currentSelection;
  if (selection === null) return;

  const range = findTimeRangeOfSelection();
  if (range.startTs !== -1 && range.endTs !== -1) {
    focusHorizontalRange(range.startTs, range.endTs);
  }

  if (selection.trackId) {
    verticalScrollToTrack(selection.trackId, true);
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {StringListPatch} from 'src/common/state';

import {assertExists} from '../base/logging';
import {Actions} from '../common/actions';
import {colorForString} from '../common/colorizer';
import {formatTimestamp} from '../common/time';

import {globals} from './globals';
import {Panel} from './panel';
import {
  MultiSelect,
  MultiSelectDiff,
  Option as MultiSelectOption,
} from './widgets/multiselect';
import {PopupPosition} from './widgets/popup';

const ROW_H = 20;
const PAGE_SIZE = 250;

// This class is quite a weird one. The state looks something like this:
//
// view() -> renders the panel from the data, for now we have no idea what size
// the scroll window is going to be so we don't know how many rows to ask for,
// and the number of rendered rows in our state is likely going to be 0 or wrong
//
// oncreate() -> we now know how many rows we need to display and our scroll
// offset. This is where we as our controller to update the rows, which could
// take some time. Record the first and last row we can see. Attach scroll
// handler to the scrolly window here.
//
// onScroll() -> we know the window has been scrolled, we need to see if things
// have changed enough to constitute a redraw.

// Another call to view() can come at any time, as a reusult of the controller
// giving us some data.
//
export class FtracePanel extends Panel<{}> {
  private page: number = 0;
  private pageCount: number = 0;

  view(_: m.CVnode<{}>) {
    return m(
        '.ftrace-panel',
        m(
            '.sticky',
            [
              this.renderRowsLabel(),
              this.renderFilterPanel(),
            ],
            ),
        this.renderRows(),
    );
  }

  private scrollContainer(dom: Element): HTMLElement {
    const el = dom.parentElement!.parentElement!.parentElement;
    return assertExists(el);
  }

  oncreate({dom}: m.CVnodeDOM) {
    const sc = this.scrollContainer(dom);
    sc.addEventListener('scroll', this.onScroll);
    this.recomputeVisibleRowsAndUpdate(sc);
  }

  onupdate({dom}: m.CVnodeDOM) {
    const sc = this.scrollContainer(dom);
    this.recomputeVisibleRowsAndUpdate(sc);
  }

  recomputeVisibleRowsAndUpdate(scrollContainer: HTMLElement) {
    const prevPage = this.page;
    const prevPageCount = this.pageCount;

    const visibleRowOffset = Math.floor(scrollContainer.scrollTop / ROW_H);
    const visibleRowCount = Math.ceil(scrollContainer.clientHeight / ROW_H);

    // Work out which "page" we're on
    this.page = Math.floor(visibleRowOffset / PAGE_SIZE) - 1;
    this.pageCount = Math.ceil(visibleRowCount / PAGE_SIZE) + 2;

    if (this.page !== prevPage || this.pageCount !== prevPageCount) {
      globals.dispatch(Actions.updateFtracePagination({
        offset: Math.max(0, this.page) * PAGE_SIZE,
        count: this.pageCount * PAGE_SIZE,
      }));
    }
  }

  onremove({dom}: m.CVnodeDOM) {
    const sc = this.scrollContainer(dom);
    sc.removeEventListener('scroll', this.onScroll);

    globals.dispatch(Actions.updateFtracePagination({
      offset: 0,
      count: 0,
    }));
  }

  onScroll = (e: Event) => {
    const scrollContainer = e.target as HTMLElement;
    this.recomputeVisibleRowsAndUpdate(scrollContainer);
  };

  onRowOver(ts: number) {
    globals.dispatch(Actions.setHoverCursorTimestamp({ts}));
  }

  onRowOut() {
    globals.dispatch(Actions.setHoverCursorTimestamp({ts: -1}));
  }

  private renderRowsLabel() {
    if (globals.ftracePanelData) {
      const {numEvents} = globals.ftracePanelData;
      return m('.ftrace-rows-label', `Ftrace Events (${numEvents})`);
    } else {
      return m('.ftrace-rows-label', 'Ftrace Rows');
    }
  }

  private renderFilterPanel() {
    if (!globals.ftraceCounters) {
      return null;
    }

    const options: MultiSelectOption[] =
        globals.ftraceCounters.map(({name, count}) => {
          return {
            id: name,
            name: `${name} (${count})`,
            checked: !globals.state.ftraceFilter.excludedNames.some(
                (excluded: string) => excluded === name),
          };
        });

    return m(
        MultiSelect,
        {
          label: 'Filter by name',
          icon: 'filter_list_alt',
          popupPosition: PopupPosition.Top,
          options,
          onChange: (diffs: MultiSelectDiff[]) => {
            const excludedNames: StringListPatch[] = diffs.map(
                ({id, checked}) => [checked ? 'remove' : 'add', id],
            );
            globals.dispatchMultiple([
              Actions.updateFtraceFilter({excludedNames}),
              Actions.requestTrackReload({}),
            ]);
          },
        },
    );
  }

  // Render all the rows including the first title row
  private renderRows() {
    const data = globals.ftracePanelData;
    const rows: m.Children = [];

    rows.push(m(
        `.row`,
        m('.cell.row-header', 'Timestamp'),
        m('.cell.row-header', 'Name'),
        m('.cell.row-header', 'CPU'),
        m('.cell.row-header', 'Process'),
        m('.cell.row-header', 'Args'),
        ));

    if (data) {
      const {events, offset, numEvents} = data;
      for (let i = 0; i < events.length; i++) {
        const {ts, name, cpu, process, args} = events[i];

        const timestamp =
            formatTimestamp(ts / 1e9 - globals.state.traceTime.startSec);

        const rank = i + offset;

        const color = colorForString(name);
        const hsl = `hsl(
          ${color.h},
          ${color.s - 20}%,
          ${Math.min(color.l + 10, 60)}%
        )`;

        rows.push(m(
            `.row`,
            {
              style: {top: `${(rank + 1.0) * ROW_H}px`},
              onmouseover: this.onRowOver.bind(this, ts / 1e9),
              onmouseout: this.onRowOut.bind(this),
            },
            m('.cell', timestamp),
            m('.cell', m('span.colour', {style: {background: hsl}}), name),
            m('.cell', cpu),
            m('.cell', process),
            m('.cell', args),
            ));
      }
      return m('.rows', {style: {height: `${numEvents * ROW_H}px`}}, rows);
    } else {
      return m('.rows', rows);
    }
  }

  renderCanvas() {}
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {globals} from './globals';

export const LOG_PRIORITIES =
    ['-', '-', 'Verbose', 'Debug', 'Info', 'Warn', 'Error', 'Fatal'];
const IGNORED_STATES = 2;

interface LogPriorityWidgetAttrs {
  options: string[];
  selectedIndex: number;
  onSelect: (id: number) => void;
}

interface LogTagChipAttrs {
  name: string;
  removeTag: (name: string) => void;
}

interface LogTagsWidgetAttrs {
  tags: string[];
}

interface FilterByTextWidgetAttrs {
  hideNonMatching: boolean;
}

class LogPriorityWidget implements m.ClassComponent<LogPriorityWidgetAttrs> {
  view(vnode: m.Vnode<LogPriorityWidgetAttrs>) {
    const attrs = vnode.attrs;
    const optionComponents = [];
    for (let i = IGNORED_STATES; i < attrs.options.length; i++) {
      const selected = i === attrs.selectedIndex;
      optionComponents.push(
          m('option', {value: i, selected}, attrs.options[i]));
    }
    return m(
        'select',
        {
          onchange: (e: InputEvent) => {
            const selectionValue = (e.target as HTMLSelectElement).value;
            attrs.onSelect(Number(selectionValue));
          },
        },
        optionComponents,
    );
  }
}

class LogTagChip implements m.ClassComponent<LogTagChipAttrs> {
  view({attrs}: m.CVnode<LogTagChipAttrs>) {
    return m(
        '.chip',
        m('.chip-text', attrs.name),
        m('button.chip-button',
          {
            onclick: () => {
              attrs.removeTag(attrs.name);
            },
          },
          '×'));
  }
}

class LogTagsWidget implements m.ClassComponent<LogTagsWidgetAttrs> {
  removeTag(tag: string) {
    globals.dispatch(Actions.removeLogTag({tag}));
  }

  view(vnode: m.Vnode<LogTagsWidgetAttrs>) {
    const tags = vnode.attrs.tags;
    return m(
        '.tag-container',
        m('.chips', tags.map((tag) => m(LogTagChip, {
                               name: tag,
                               removeTag: this.removeTag.bind(this),
                             }))),
        m(`input.chip-input[placeholder='Add new tag']`, {
          onkeydown: (e: KeyboardEvent) => {
            // This is to avoid zooming on 'w'(and other unexpected effects
            // of key presses in this input field).
            e.stopPropagation();
            const htmlElement = e.target as HTMLInputElement;

            // When the user clicks 'Backspace' we delete the previous tag.
            if (e.key === 'Backspace' && tags.length > 0 &&
                htmlElement.value === '') {
              globals.dispatch(
                  Actions.removeLogTag({tag: tags[tags.length - 1]}));
              return;
            }

            if (e.key !== 'Enter') {
              return;
            }
            if (htmlElement.value === '') {
              return;
            }
            globals.dispatch(
                Actions.addLogTag({tag: htmlElement.value.trim()}));
            htmlElement.value = '';
          },
        }));
  }
}

class LogTextWidget implements m.ClassComponent {
  view() {
    return m(
        '.tag-container', m(`input.chip-input[placeholder='Search log text']`, {
          onkeydown: (e: KeyboardEvent) => {
            // This is to avoid zooming on 'w'(and other unexpected effects
            // of key presses in this input field).
            e.stopPropagation();
          },

          onkeyup: (e: KeyboardEvent) => {
            // We want to use the value of the input field after it has been
            // updated with the latest key (onkeyup).
            const htmlElement = e.target as HTMLInputElement;
            globals.dispatch(
                Actions.updateLogFilterText({textEntry: htmlElement.value}));
          },
        }));
  }
}

class FilterByTextWidget implements m.ClassComponent<FilterByTextWidgetAttrs> {
  view({attrs}: m.Vnode<FilterByTextWidgetAttrs>) {
    const icon = attrs.hideNonMatching ? 'unfold_less' : 'unfold_more';
    const tooltip = attrs.hideNonMatching ? 'Expand all and view highlighted' :
                                            'Collapse all';
    return m(
        '.filter-widget',
        m('.tooltip', tooltip),
        m('i.material-icons',
          {
            onclick: () => {
              globals.dispatch(Actions.toggleCollapseByTextEntry({}));
            },
          },
          icon));
  }
}

export class LogsFilters implements m.ClassComponent {
  view(_: m.CVnode<{}>) {
    return m(
        '.log-filters',
        m('.log-label', 'Log Level'),
        m(LogPriorityWidget, {
          options: LOG_PRIORITIES,
          selectedIndex: globals.state.logFilteringCriteria.minimumLevel,
          onSelect: (minimumLevel) => {
            globals.dispatch(Actions.setMinimumLogLevel({minimumLevel}));
          },
        }),
        m(LogTagsWidget, {tags: globals.state.logFilteringCriteria.tags}),
        m(LogTextWidget),
        m(FilterByTextWidget, {
          hideNonMatching: globals.state.logFilteringCriteria.hideNonMatching,
        }));
  }
}
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {globals} from './globals';
import {STAR} from './icons';

import {
  arrayOf,
  bool,
  record,
  runValidator,
  str,
  ValidatedType,
} from '../controller/validators';
import {assertTrue} from '../base/logging';
import {Icon} from './widgets/icon';
import {runAnalyzeQuery} from './analyze_page';

const QUERY_HISTORY_KEY = 'queryHistory';

export class QueryHistoryComponent implements m.ClassComponent {
  view(): m.Child {
    const unstarred: HistoryItemComponentAttrs[] = [];
    const starred: HistoryItemComponentAttrs[] = [];
    for (let i = queryHistoryStorage.data.length - 1; i >= 0; i--) {
      const entry = queryHistoryStorage.data[i];
      const arr = entry.starred ? starred : unstarred;
      arr.push({index: i, entry});
    }
    return m(
        '.query-history',
        m('header.overview',
          `Query history (${queryHistoryStorage.data.length} queries)`),
        starred.map((attrs) => m(HistoryItemComponent, attrs)),
        unstarred.map((attrs) => m(HistoryItemComponent, attrs)));
  }
}

export interface HistoryItemComponentAttrs {
  index: number;
  entry: QueryHistoryEntry;
}

export class HistoryItemComponent implements
    m.ClassComponent<HistoryItemComponentAttrs> {
  view(vnode: m.Vnode<HistoryItemComponentAttrs>): m.Child {
    const query = vnode.attrs.entry.query;
    return m(
        '.history-item',
        m('.history-item-buttons',
          m(
              'button',
              {
                onclick: () => {
                  queryHistoryStorage.setStarred(
                      vnode.attrs.index, !vnode.attrs.entry.starred);
                  globals.rafScheduler.scheduleFullRedraw();
                },
              },
              m(Icon, {icon: STAR, filled: vnode.attrs.entry.starred}),
              ),
          m('button',
            {
              onclick: () => runAnalyzeQuery(query),
            },
            m(Icon, {icon: 'play_arrow'})),
          m('button',
            {
              onclick: () => {
                queryHistoryStorage.remove(vnode.attrs.index);
                globals.rafScheduler.scheduleFullRedraw();
              },
            },
            m(Icon, {icon: 'delete'}))),
        m('pre', query));
  }
}

class HistoryStorage {
  data: QueryHistory;
  maxItems = 50;

  constructor() {
    this.data = this.load();
  }

  saveQuery(query: string) {
    const items = this.data;
    let firstUnstarred = -1;
    let countUnstarred = 0;
    for (let i = 0; i < items.length; i++) {
      if (!items[i].starred) {
        countUnstarred++;
        if (firstUnstarred === -1) {
          firstUnstarred = i;
        }
      }

      if (items[i].query === query) {
        // Query is already in the history, no need to save
        return;
      }
    }

    if (countUnstarred >= this.maxItems) {
      assertTrue(firstUnstarred !== -1);
      items.splice(firstUnstarred, 1);
    }

    items.push({query, starred: false});
    this.save();
  }

  setStarred(index: number, starred: boolean) {
    assertTrue(index >= 0 && index < this.data.length);
    this.data[index].starred = starred;
    this.save();
  }

  remove(index: number) {
    assertTrue(index >= 0 && index < this.data.length);
    this.data.splice(index, 1);
    this.save();
  }

  private load(): QueryHistory {
    const value = window.localStorage.getItem(QUERY_HISTORY_KEY);
    if (value === null) {
      return [];
    }

    return runValidator(queryHistoryValidator, JSON.parse(value)).result;
  }

  private save() {
    window.localStorage.setItem(QUERY_HISTORY_KEY, JSON.stringify(this.data));
  }
}

const queryHistoryEntryValidator = record({query: str(), starred: bool()});

type QueryHistoryEntry = ValidatedType<typeof queryHistoryEntryValidator>;

const queryHistoryValidator = arrayOf(queryHistoryEntryValidator);

type QueryHistory = ValidatedType<typeof queryHistoryValidator>;

export const queryHistoryStorage = new HistoryStorage();
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {hsluvToHex} from 'hsluv';

class HsluvCache {
  storage = new Map<number, string>();

  get(hue: number, saturation: number, lightness: number): string {
    const key = hue * 1e6 + saturation * 1e3 + lightness;
    const value = this.storage.get(key);

    if (value === undefined) {
      const computed = hsluvToHex([hue, saturation, lightness]);
      this.storage.set(key, computed);
      return computed;
    }

    return value;
  }
}

const cache = new HsluvCache();

export function cachedHsluvToHex(
    hue: number, saturation: number, lightness: number): string {
  return cache.get(hue, saturation, lightness);
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// layerX and layerY aren't standardized but there is no drop-in replacement
// (offsetX/offsetY have slightly different semantics) and they are still
// present in the browsers we care about, so for now we create an extended
// version of MouseEvent we can use instead.
// See also:
// https://github.com/microsoft/TypeScript/issues/35634#issuecomment-564765179
export interface PerfettoMouseEvent extends MouseEvent {
  layerX: number;
  layerY: number;
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export const BLANK_CHECKBOX = 'check_box_outline_blank';
export const CHECKBOX = 'check_box';
export const INDETERMINATE_CHECKBOX = 'indeterminate_check_box';

export const EXPAND_DOWN = 'expand_more';
export const EXPAND_UP = 'expand_less';

export const PIN = 'push_pin';

export const LIBRARY_ADD_CHECK = 'library_add_check';

export const SELECT_ALL = 'select_all';
export const DESELECT = 'deselect';

export const STAR = 'star';
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {tryGetTrace} from '../common/cache_manager';

import {loadAndroidBugToolInfo} from './android_bug_tool';
import {globals} from './globals';
import {showModal} from './modal';
import {Route, Router} from './router';
import {taskTracker} from './task_tracker';


export function maybeOpenTraceFromRoute(route: Route) {
  if (route.args.s) {
    // /?s=xxxx for permalinks.
    globals.dispatch(Actions.loadPermalink({hash: route.args.s}));
    return;
  }

  if (route.args.url) {
    // /?url=https://commondatastorage.googleapis.com/bucket/trace
    // This really works only for GCS because the Content Security Policy
    // forbids any other url.
    loadTraceFromUrl(route.args.url);
    return;
  }

  if (route.args.openFromAndroidBugTool) {
    // Handles interaction with the Android Bug Tool extension. See b/163421158.
    openTraceFromAndroidBugTool();
    return;
  }

  if (route.args.p && route.page === '/record') {
    // Handles backwards compatibility for old URLs (linked from various docs),
    // generated before we switched URL scheme. e.g., 'record?p=power' vs
    // 'record/power'. See b/191255021#comment2.
    Router.navigate(`#!/record/${route.args.p}`);
    return;
  }

  if (route.args.local_cache_key) {
    // Handles the case of loading traces from the cache storage.
    maybeOpenCachedTrace(route.args.local_cache_key);
    return;
  }
}


/*
 * openCachedTrace(uuid) is called: (1) on startup, from frontend/index.ts; (2)
 * every time the fragment changes (from Router.onRouteChange).
 * This function must be idempotent (imagine this is called on every frame).
 * It must take decision based on the app state, not on URL change events.
 * Fragment changes are handled by the union of Router.onHashChange() and this
 * function, as follows:
 * 1. '' -> URL without a ?local_cache_key=xxx arg:
 *  - no effect (except redrawing)
 * 2. URL without local_cache_key -> URL with local_cache_key:
 *  - Load cached trace (without prompting any dialog).
 *  - Show a (graceful) error dialog in the case of cache misses.
 * 3. '' -> URL with a ?local_cache_key=xxx arg:
 *  - Same as case 2.
 * 4. URL with local_cache_key=1 -> URL with local_cache_key=2:
 *  a) If 2 != uuid of the trace currently loaded (globals.state.traceUuid):
 *  - Ask the user if they intend to switch trace and load 2.
 *  b) If 2 == uuid of current trace (e.g., after a new trace has loaded):
 *  - no effect (except redrawing).
 * 5. URL with local_cache_key -> URL without local_cache_key:
 *  - Redirect to ?local_cache_key=1234 where 1234 is the UUID of the previous
 *    URL (this might or might not match globals.state.traceUuid).
 *
 * Backward navigation cases:
 * 6. URL without local_cache_key <- URL with local_cache_key:
 *  - Same as case 5.
 * 7. URL with local_cache_key=1 <- URL with local_cache_key=2:
 *  - Same as case 4a: go back to local_cache_key=1 but ask the user to confirm.
 * 8. landing page <- URL with local_cache_key:
 *  - Same as case 5: re-append the local_cache_key.
 */
async function maybeOpenCachedTrace(traceUuid: string) {
  if (traceUuid === globals.state.traceUuid) {
    // Do nothing, matches the currently loaded trace.
    return;
  }

  if (traceUuid === '') {
    // This can happen if we switch from an empty UI state to an invalid UUID
    // (e.g. due to a cache miss, below). This can also happen if the user just
    // types /#!/viewer?local_cache_key=.
    return;
  }

  // This handles the case when a trace T1 is loaded and then the url is set to
  // ?local_cache_key=T2. In that case globals.state.traceUuid remains set to T1
  // until T2 has been loaded by the trace processor (can take several seconds).
  // This early out prevents to re-trigger the openTraceFromXXX() action if the
  // URL changes (e.g. if the user navigates back/fwd) while the new trace is
  // being loaded.
  if (globals.state.engine !== undefined) {
    const eng = globals.state.engine;
    if (eng.source.type === 'ARRAY_BUFFER' && eng.source.uuid === traceUuid) {
      return;
    }
  }

  // Fetch the trace from the cache storage. If available load it. If not, show
  // a dialog informing the user about the cache miss.
  const maybeTrace = await tryGetTrace(traceUuid);

  const navigateToOldTraceUuid = () => {
    Router.navigate(
        `#!/viewer?local_cache_key=${globals.state.traceUuid || ''}`);
  };

  if (!maybeTrace) {
    showModal({
      title: 'Could not find the trace in the cache storage',
      content: m(
          'div',
          m('p',
            'You are trying to load a cached trace by setting the ' +
                '?local_cache_key argument in the URL.'),
          m('p', 'Unfortunately the trace wasn\'t in the cache storage.'),
          m('p',
            'This can happen if a tab was discarded and wasn\'t opened ' +
                'for too long, or if you just mis-pasted the URL.'),
          m('pre', `Trace UUID: ${traceUuid}`),
          ),
    });
    navigateToOldTraceUuid();
    return;
  }

  // If the UI is in a blank state (no trace has been ever opened), just load
  // the trace without showing any further dialog. This is the case of tab
  // discarding, reloading or pasting a url with a local_cache_key in an empty
  // instance.
  if (globals.state.traceUuid === undefined) {
    globals.dispatch(Actions.openTraceFromBuffer(maybeTrace));
    return;
  }

  // If, instead, another trace is loaded, ask confirmation to the user.
  // Switching to another trace clears the UI state. It can be quite annoying to
  // lose the UI state by accidentally navigating back too much.
  let hasOpenedNewTrace = false;

  await showModal({
    title: 'You are about to load a different trace and reset the UI state',
    content: m(
        'div',
        m('p',
          'You are seeing this because you either pasted a URL with ' +
              'a different ?local_cache_key=xxx argument or because you hit ' +
              'the history back/fwd button and reached a different trace.'),
        m('p',
          'If you continue another trace will be loaded and the UI ' +
              'state will be cleared.'),
        m('pre',
          `Old trace: ${globals.state.traceUuid || '<no trace>'}\n` +
              `New trace: ${traceUuid}`),
        ),
    buttons: [
      {
        text: 'Continue',
        id: 'trace_id_open',  // Used by tests.
        primary: true,
        action: () => {
          hasOpenedNewTrace = true;
          globals.dispatch(Actions.openTraceFromBuffer(maybeTrace));
        },
      },
      {text: 'Cancel'},
    ],
  });

  if (!hasOpenedNewTrace) {
    // We handle this after the modal await rather than in the cancel button
    // action so this has effect even if the user clicks Esc or clicks outside
    // of the modal dialog and dismisses it.
    navigateToOldTraceUuid();
  }
}

function loadTraceFromUrl(url: string) {
  const isLocalhostTraceUrl =
      ['127.0.0.1', 'localhost'].includes((new URL(url)).hostname);

  if (isLocalhostTraceUrl) {
    // This handles the special case of tools/record_android_trace serving the
    // traces from a local webserver and killing it immediately after having
    // seen the HTTP GET request. In those cases store the trace as a file, so
    // when users click on share we don't fail the re-fetch().
    const fileName = url.split('/').pop() || 'local_trace.pftrace';
    const request = fetch(url)
                        .then((response) => response.blob())
                        .then((blob) => {
                          globals.dispatch(Actions.openTraceFromFile({
                            file: new File([blob], fileName),
                          }));
                        })
                        .catch((e) => alert(`Could not load local trace ${e}`));
    taskTracker.trackPromise(request, 'Downloading local trace');
  } else {
    globals.dispatch(Actions.openTraceFromUrl({url}));
  }
}

function openTraceFromAndroidBugTool() {
  // TODO(hjd): Unify updateStatus and TaskTracker
  globals.dispatch(Actions.updateStatus(
      {msg: 'Loading trace from ABT extension', timestamp: Date.now() / 1000}));
  const loadInfo = loadAndroidBugToolInfo();
  taskTracker.trackPromise(loadInfo, 'Loading trace from ABT extension');
  loadInfo
      .then((info) => {
        globals.dispatch(Actions.openTraceFromFile({
          file: info.file,
        }));
      })
      .catch((e) => {
        console.error(e);
      });
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {assertExists} from '../base/logging';
import {Engine} from '../common/engine';
import {TrackState} from '../common/state';
import {TrackData} from '../common/track_data';

import {checkerboard} from './checkerboard';
import {globals} from './globals';
import {TrackButtonAttrs} from './track_panel';

// Args passed to the track constructors when creating a new track.
export interface NewTrackArgs {
  trackId: string;
  engine: Engine;
}

// This interface forces track implementations to have some static properties.
// Typescript does not have abstract static members, which is why this needs to
// be in a separate interface.
export interface TrackCreator {
  // Store the kind explicitly as a string as opposed to using class.kind in
  // case we ever minify our code.
  readonly kind: string;

  // We need the |create| method because the stored value in the registry can be
  // an abstract class, and we cannot call 'new' on an abstract class.
  create(args: NewTrackArgs): Track;
}

export interface SliceRect {
  left: number;
  width: number;
  top: number;
  height: number;
  visible: boolean;
}

// The abstract class that needs to be implemented by all tracks.
export abstract class Track<Config = {}, Data extends TrackData = TrackData> {
  // The UI-generated track ID (not to be confused with the SQL track.id).
  protected readonly trackId: string;
  protected readonly engine: Engine;

  // When true this is a new controller-less track type.
  // TODO(hjd): eventually all tracks will be controller-less and this
  // should be removed then.
  protected frontendOnly = false;

  // Caches the last state.track[this.trackId]. This is to deal with track
  // deletion, see comments in trackState() below.
  private lastTrackState: TrackState;

  constructor(args: NewTrackArgs) {
    this.trackId = args.trackId;
    this.engine = args.engine;
    this.lastTrackState = assertExists(globals.state.tracks[this.trackId]);
  }

  // Last call the track will receive. Called just before the last reference to
  // this object is removed.
  onDestroy() {}

  protected abstract renderCanvas(ctx: CanvasRenderingContext2D): void;

  protected get trackState(): TrackState {
    // We can end up in a state where a Track is still in the mithril renderer
    // tree but its corresponding state has been deleted. This can happen in the
    // interval of time between a track being removed from the state and the
    // next animation frame that would remove the Track object. If a mouse event
    // is dispatched in the meanwhile (or a promise is resolved), we need to be
    // able to access the state. Hence the caching logic here.
    const trackState = globals.state.tracks[this.trackId];
    if (trackState === undefined) {
      return this.lastTrackState;
    }
    this.lastTrackState = trackState;
    return trackState;
  }

  get config(): Config {
    return this.trackState.config as Config;
  }

  data(): Data|undefined {
    if (this.frontendOnly) {
      return undefined;
    }
    return globals.trackDataStore.get(this.trackId) as Data;
  }

  getHeight(): number {
    return 40;
  }

  getTrackShellButtons(): Array<m.Vnode<TrackButtonAttrs>> {
    return [];
  }

  getContextMenu(): m.Vnode<any>|null {
    return null;
  }

  onMouseMove(_position: {x: number, y: number}) {}

  // Returns whether the mouse click has selected something.
  // Used to prevent further propagation if necessary.
  onMouseClick(_position: {x: number, y: number}): boolean {
    return false;
  }

  onMouseOut(): void {}

  onFullRedraw(): void {}

  render(ctx: CanvasRenderingContext2D) {
    globals.frontendLocalState.addVisibleTrack(this.trackState.id);
    if (this.data() === undefined && !this.frontendOnly) {
      const {visibleWindowTime, timeScale} = globals.frontendLocalState;
      const startPx = Math.floor(timeScale.timeToPx(visibleWindowTime.start));
      const endPx = Math.ceil(timeScale.timeToPx(visibleWindowTime.end));
      checkerboard(ctx, this.getHeight(), startPx, endPx);
    } else {
      this.renderCanvas(ctx);
    }
  }

  drawTrackHoverTooltip(
      ctx: CanvasRenderingContext2D, pos: {x: number, y: number}, text: string,
      text2?: string) {
    ctx.font = '10px Roboto Condensed';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';

    // TODO(hjd): Avoid measuring text all the time (just use monospace?)
    const textMetrics = ctx.measureText(text);
    const text2Metrics = ctx.measureText(text2 || '');

    // Padding on each side of the box containing the tooltip:
    const paddingPx = 4;

    // Figure out the width of the tool tip box:
    let width = Math.max(textMetrics.width, text2Metrics.width);
    width += paddingPx * 2;

    // and the height:
    let height = 0;
    height += textMetrics.fontBoundingBoxAscent;
    height += textMetrics.fontBoundingBoxDescent;
    if (text2 !== undefined) {
      height += text2Metrics.fontBoundingBoxAscent;
      height += text2Metrics.fontBoundingBoxDescent;
    }
    height += paddingPx * 2;

    let x = pos.x;
    let y = pos.y;

    // Move box to the top right of the mouse:
    x += 10;
    y -= 10;

    // Ensure the box is on screen:
    const endPx = globals.frontendLocalState.timeScale.endPx;
    if (x + width > endPx) {
      x -= x + width - endPx;
    }
    if (y < 0) {
      y = 0;
    }
    if (y + height > this.getHeight()) {
      y -= y + height - this.getHeight();
    }

    // Draw everything:
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = 'hsl(200, 50%, 40%)';
    ctx.fillText(
        text, x + paddingPx, y + paddingPx + textMetrics.fontBoundingBoxAscent);
    if (text2 !== undefined) {
      const yOffsetPx = textMetrics.fontBoundingBoxAscent +
          textMetrics.fontBoundingBoxDescent +
          text2Metrics.fontBoundingBoxAscent;
      ctx.fillText(text2, x + paddingPx, y + paddingPx + yOffsetPx);
    }
  }

  // Returns a place where a given slice should be drawn. Should be implemented
  // only for track types that support slices e.g. chrome_slice, async_slices
  // tStart - slice start time in seconds, tEnd - slice end time in seconds,
  // depth - slice depth
  getSliceRect(_tStart: number, _tEnd: number, _depth: number): SliceRect
      |undefined {
    return undefined;
  }
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {randomColor} from '../common/colorizer';
import {AreaNote, Note} from '../common/state';
import {timeToString} from '../common/time';

import {
  BottomTab,
  bottomTabRegistry,
  NewBottomTabArgs,
} from './bottom_tab';
import {TRACK_SHELL_WIDTH} from './css_constants';
import {PerfettoMouseEvent} from './events';
import {globals} from './globals';
import {
  TickGenerator,
  TickType,
  timeScaleForVisibleWindow,
} from './gridline_helper';
import {Panel, PanelSize} from './panel';
import {isTraceLoaded} from './sidebar';

const FLAG_WIDTH = 16;
const AREA_TRIANGLE_WIDTH = 10;
const FLAG = `\uE153`;

function toSummary(s: string) {
  const newlineIndex = s.indexOf('\n') > 0 ? s.indexOf('\n') : s.length;
  return s.slice(0, Math.min(newlineIndex, s.length, 16));
}

function getStartTimestamp(note: Note|AreaNote) {
  if (note.noteType === 'AREA') {
    return globals.state.areas[note.areaId].startSec;
  } else {
    return note.timestamp;
  }
}

export class NotesPanel extends Panel {
  hoveredX: null|number = null;

  oncreate({dom}: m.CVnodeDOM) {
    dom.addEventListener('mousemove', (e: Event) => {
      this.hoveredX = (e as PerfettoMouseEvent).layerX - TRACK_SHELL_WIDTH;
      globals.rafScheduler.scheduleRedraw();
    }, {passive: true});
    dom.addEventListener('mouseenter', (e: Event) => {
      this.hoveredX = (e as PerfettoMouseEvent).layerX - TRACK_SHELL_WIDTH;
      globals.rafScheduler.scheduleRedraw();
    });
    dom.addEventListener('mouseout', () => {
      this.hoveredX = null;
      globals.dispatch(Actions.setHoveredNoteTimestamp({ts: -1}));
    }, {passive: true});
  }

  view() {
    const allCollapsed = Object.values(globals.state.trackGroups)
                             .every((group) => group.collapsed);

    return m(
        '.notes-panel',
        {
          onclick: (e: PerfettoMouseEvent) => {
            this.onClick(e.layerX - TRACK_SHELL_WIDTH, e.layerY);
            e.stopPropagation();
          },
        },
        isTraceLoaded() ?
            [
              m('button',
                {
                  onclick: (e: Event) => {
                    e.preventDefault();
                    globals.dispatch(Actions.toggleAllTrackGroups(
                        {collapsed: !allCollapsed}));
                  },
                },
                m('i.material-icons',
                  {title: allCollapsed ? 'Expand all' : 'Collapse all'},
                  allCollapsed ? 'unfold_more' : 'unfold_less')),
              m('button',
                {
                  onclick: (e: Event) => {
                    e.preventDefault();
                    globals.dispatch(Actions.clearAllPinnedTracks({}));
                  },
                },
                m('i.material-icons',
                  {title: 'Clear all pinned tracks'},
                  'clear_all')),
            ] :
            '');
  }

  renderCanvas(ctx: CanvasRenderingContext2D, size: PanelSize) {
    const timeScale = globals.frontendLocalState.timeScale;
    let aNoteIsHovered = false;

    ctx.fillStyle = '#999';
    ctx.fillRect(TRACK_SHELL_WIDTH - 2, 0, 2, size.height);
    const relScale = timeScaleForVisibleWindow(TRACK_SHELL_WIDTH, size.width);
    if (relScale.timeSpan.duration > 0 && relScale.widthPx > 0) {
      for (const {type, position} of new TickGenerator(relScale)) {
        if (type === TickType.MAJOR) ctx.fillRect(position, 0, 1, size.height);
      }
    }

    ctx.textBaseline = 'bottom';
    ctx.font = '10px Helvetica';

    for (const note of Object.values(globals.state.notes)) {
      const timestamp = getStartTimestamp(note);
      // TODO(hjd): We should still render area selection marks in viewport is
      // *within* the area (e.g. both lhs and rhs are out of bounds).
      if ((note.noteType !== 'AREA' && !timeScale.timeInBounds(timestamp)) ||
          (note.noteType === 'AREA' &&
           !timeScale.timeInBounds(globals.state.areas[note.areaId].endSec) &&
           !timeScale.timeInBounds(
               globals.state.areas[note.areaId].startSec))) {
        continue;
      }
      const currentIsHovered =
          this.hoveredX && this.mouseOverNote(this.hoveredX, note);
      if (currentIsHovered) aNoteIsHovered = true;

      const selection = globals.state.currentSelection;
      const isSelected = selection !== null &&
          ((selection.kind === 'NOTE' && selection.id === note.id) ||
           (selection.kind === 'AREA' && selection.noteId === note.id));
      const x = timeScale.timeToPx(timestamp);
      const left = Math.floor(x + TRACK_SHELL_WIDTH);

      // Draw flag or marker.
      if (note.noteType === 'AREA') {
        const area = globals.state.areas[note.areaId];
        this.drawAreaMarker(
            ctx,
            left,
            Math.floor(timeScale.timeToPx(area.endSec) + TRACK_SHELL_WIDTH),
            note.color,
            isSelected);
      } else {
        this.drawFlag(ctx, left, size.height, note.color, isSelected);
      }

      if (note.text) {
        const summary = toSummary(note.text);
        const measured = ctx.measureText(summary);
        // Add a white semi-transparent background for the text.
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(
            left + FLAG_WIDTH + 2, size.height + 2, measured.width + 2, -12);
        ctx.fillStyle = '#3c4b5d';
        ctx.fillText(summary, left + FLAG_WIDTH + 3, size.height + 1);
      }
    }

    // A real note is hovered so we don't need to see the preview line.
    // TODO(hjd): Change cursor to pointer here.
    if (aNoteIsHovered) {
      globals.dispatch(Actions.setHoveredNoteTimestamp({ts: -1}));
    }

    // View preview note flag when hovering on notes panel.
    if (!aNoteIsHovered && this.hoveredX !== null) {
      const timestamp = timeScale.pxToTime(this.hoveredX);
      if (timeScale.timeInBounds(timestamp)) {
        globals.dispatch(Actions.setHoveredNoteTimestamp({ts: timestamp}));
        const x = timeScale.timeToPx(timestamp);
        const left = Math.floor(x + TRACK_SHELL_WIDTH);
        this.drawFlag(ctx, left, size.height, '#aaa', /* fill */ true);
      }
    }
  }

  private drawAreaMarker(
      ctx: CanvasRenderingContext2D, x: number, xEnd: number, color: string,
      fill: boolean) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    const topOffset = 10;
    // Don't draw in the track shell section.
    if (x >= globals.frontendLocalState.timeScale.startPx + TRACK_SHELL_WIDTH) {
      // Draw left triangle.
      ctx.beginPath();
      ctx.moveTo(x, topOffset);
      ctx.lineTo(x, topOffset + AREA_TRIANGLE_WIDTH);
      ctx.lineTo(x + AREA_TRIANGLE_WIDTH, topOffset);
      ctx.lineTo(x, topOffset);
      if (fill) ctx.fill();
      ctx.stroke();
    }
    // Draw right triangle.
    ctx.beginPath();
    ctx.moveTo(xEnd, topOffset);
    ctx.lineTo(xEnd, topOffset + AREA_TRIANGLE_WIDTH);
    ctx.lineTo(xEnd - AREA_TRIANGLE_WIDTH, topOffset);
    ctx.lineTo(xEnd, topOffset);
    if (fill) ctx.fill();
    ctx.stroke();

    // Start line after track shell section, join triangles.
    const startDraw = Math.max(
        x, globals.frontendLocalState.timeScale.startPx + TRACK_SHELL_WIDTH);
    ctx.beginPath();
    ctx.moveTo(startDraw, topOffset);
    ctx.lineTo(xEnd, topOffset);
    ctx.stroke();
  }

  private drawFlag(
      ctx: CanvasRenderingContext2D, x: number, height: number, color: string,
      fill?: boolean) {
    const prevFont = ctx.font;
    const prevBaseline = ctx.textBaseline;
    ctx.textBaseline = 'alphabetic';
    // Adjust height for icon font.
    ctx.font = '24px Material Symbols Sharp';
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    // The ligatures have padding included that means the icon is not drawn
    // exactly at the x value. This adjusts for that.
    const iconPadding = 6;
    if (fill) {
      ctx.fillText(FLAG, x - iconPadding, height + 2);
    } else {
      ctx.strokeText(FLAG, x - iconPadding, height + 2.5);
    }
    ctx.font = prevFont;
    ctx.textBaseline = prevBaseline;
  }


  private onClick(x: number, _: number) {
    if (x < 0) return;
    const timeScale = globals.frontendLocalState.timeScale;
    const timestamp = timeScale.pxToTime(x);
    for (const note of Object.values(globals.state.notes)) {
      if (this.hoveredX && this.mouseOverNote(this.hoveredX, note)) {
        if (note.noteType === 'AREA') {
          globals.makeSelection(
              Actions.reSelectArea({areaId: note.areaId, noteId: note.id}));
        } else {
          globals.makeSelection(Actions.selectNote({id: note.id}));
        }
        return;
      }
    }
    const color = randomColor();
    globals.makeSelection(Actions.addNote({timestamp, color}));
  }

  private mouseOverNote(x: number, note: AreaNote|Note): boolean {
    const timeScale = globals.frontendLocalState.timeScale;
    const noteX = timeScale.timeToPx(getStartTimestamp(note));
    if (note.noteType === 'AREA') {
      const noteArea = globals.state.areas[note.areaId];
      return (noteX <= x && x < noteX + AREA_TRIANGLE_WIDTH) ||
          (timeScale.timeToPx(noteArea.endSec) > x &&
           x > timeScale.timeToPx(noteArea.endSec) - AREA_TRIANGLE_WIDTH);
    } else {
      const width = FLAG_WIDTH;
      return noteX <= x && x < noteX + width;
    }
  }
}

interface NotesEditorTabConfig {
  id: string;
}

export class NotesEditorTab extends BottomTab<NotesEditorTabConfig> {
  static readonly kind = 'org.perfetto.NotesEditorTab';

  static create(args: NewBottomTabArgs): NotesEditorTab {
    return new NotesEditorTab(args);
  }

  constructor(args: NewBottomTabArgs) {
    super(args);
  }

  renderTabCanvas() {}

  getTitle() {
    return 'Current Selection';
  }

  viewTab() {
    const note = globals.state.notes[this.config.id];
    if (note === undefined) {
      return m('.', `No Note with id ${this.config.id}`);
    }
    const startTime =
        getStartTimestamp(note) - globals.state.traceTime.startSec;
    return m(
        '.notes-editor-panel',
        m('.notes-editor-panel-heading-bar',
          m('.notes-editor-panel-heading',
            `Annotation at ${timeToString(startTime)}`),
          m('input[type=text]', {
            onkeydown: (e: Event) => {
              e.stopImmediatePropagation();
            },
            value: note.text,
            onchange: (e: InputEvent) => {
              const newText = (e.target as HTMLInputElement).value;
              globals.dispatch(Actions.changeNoteText({
                id: this.config.id,
                newText,
              }));
            },
          }),
          m('span.color-change', `Change color: `, m('input[type=color]', {
              value: note.color,
              onchange: (e: Event) => {
                const newColor = (e.target as HTMLInputElement).value;
                globals.dispatch(Actions.changeNoteColor({
                  id: this.config.id,
                  newColor,
                }));
              },
            })),
          m('button',
            {
              onclick: () => {
                globals.dispatch(Actions.removeNote({id: this.config.id}));
                globals.dispatch(Actions.setCurrentTab({tab: undefined}));
                globals.rafScheduler.scheduleFullRedraw();
              },
            },
            'Remove')),
    );
  }
}

bottomTabRegistry.register(NotesEditorTab);
// Copyright (C) 2022 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {v4 as uuidv4} from 'uuid';

import {Actions} from '../common/actions';
import {EngineProxy} from '../common/engine';
import {Registry} from '../common/registry';
import {globals} from './globals';

import {Panel, PanelSize, PanelVNode} from './panel';

export interface NewBottomTabArgs {
  engine: EngineProxy;
  tag?: string;
  uuid: string;
  config: {};
}

// Interface for allowing registration and creation of bottom tabs.
// See comments on |TrackCreator| for more details.
export interface BottomTabCreator {
  readonly kind: string;

  create(args: NewBottomTabArgs): BottomTab;
}

export const bottomTabRegistry = Registry.kindRegistry<BottomTabCreator>();

// Period to wait for the newly-added tabs which are loading before showing
// them to the user. This period is short enough to not be user-visible,
// while being long enough for most of the simple queries to complete, reducing
// flickering in the UI.
const NEW_LOADING_TAB_DELAY_MS = 50;

// An interface representing a bottom tab displayed on the panel in the bottom
// of the ui (e.g. "Current Selection").
//
// The implementations of this class are provided by different plugins, which
// register the implementations with bottomTabRegistry, keyed by a unique name
// for each type of BottomTab.
//
// Lifetime: the instances of this class are owned by BottomTabPanel and exist
// for as long as a tab header is shown to the user in the bottom tab list (with
// minor exceptions, like a small grace period between when the tab is related).
//
// BottomTab implementations should pass the unique identifier(s) for the
// content displayed via the |Config| and fetch additional details via Engine
// instead of relying on getting the data from the global storage. For example,
// for tabs corresponding to details of the selected objects on a track, a new
// BottomTab should be created for each new selection.
export abstract class BottomTabBase<Config = {}> {
  // Config for this details panel. Should be serializable.
  protected readonly config: Config;
  // Engine for running queries and fetching additional data.
  protected readonly engine: EngineProxy;
  // Optional tag, which is used to ensure that only one tab
  // with the same tag can exist - adding a new tab with the same tag
  // (e.g. 'current_selection') would close the previous one. This
  // also can be used to close existing tab.
  readonly tag?: string;
  // Unique id for this details panel. Can be used to close previously opened
  // panel.
  readonly uuid: string;

  constructor(args: NewBottomTabArgs) {
    this.config = args.config as Config;
    this.engine = args.engine;
    this.tag = args.tag;
    this.uuid = args.uuid;
  }

  // Entry point for customisation of the displayed title for this panel.
  abstract getTitle(): string;

  // Generate a mithril node for this component.
  abstract createPanelVnode(): PanelVNode;

  // API for the tab to notify the TabList that it's still preparing the data.
  // If true, adding a new tab will be delayed for a short while (~50ms) to
  // reduce the flickering.
  //
  // Note: it's a "poll" rather than "push" API: there is no explicit API
  // for the tabs to notify the tab list, as the tabs are expected to schedule
  // global redraw anyway and the tab list will poll the tabs as necessary
  // during the redraw.
  isLoading(): boolean {
    return false;
  }
}


// BottomTabBase provides a more generic API allowing users to provide their
// custom mithril component, which would allow them to listen to mithril
// lifecycle events. Most cases, however, don't need them and BottomTab
// provides a simplified API for the common case.
export abstract class BottomTab<Config = {}> extends BottomTabBase<Config> {
  constructor(args: NewBottomTabArgs) {
    super(args);
  }

  // These methods are direct counterparts to renderCanvas and view with
  // slightly changes names to prevent cases when `BottomTab` will
  // be accidentally used a mithril component.
  abstract renderTabCanvas(ctx: CanvasRenderingContext2D, size: PanelSize):
      void;
  abstract viewTab(): void|m.Children;

  createPanelVnode(): m.Vnode<any, any> {
    return m(
        BottomTabAdapter,
        {key: this.uuid, panel: this} as BottomTabAdapterAttrs);
  }
}

interface BottomTabAdapterAttrs {
  panel: BottomTab;
}

class BottomTabAdapter extends Panel<BottomTabAdapterAttrs> {
  renderCanvas(
      ctx: CanvasRenderingContext2D, size: PanelSize,
      vnode: PanelVNode<BottomTabAdapterAttrs>): void {
    vnode.attrs.panel.renderTabCanvas(ctx, size);
  }

  view(vnode: m.CVnode<BottomTabAdapterAttrs>): void|m.Children {
    return vnode.attrs.panel.viewTab();
  }
}

export type AddTabArgs = {
  kind: string,
  config: {},
  tag?: string,
  // Whether to make the new tab current. True by default.
  select?: boolean;
};

export type AddTabResult =
    {
      uuid: string;
    }

// Shorthand for globals.bottomTabList.addTab(...) & redraw.
// Ignored when bottomTabList does not exist (e.g. no trace is open in the UI).
export function
addTab(args: AddTabArgs) {
  const tabList = globals.bottomTabList;
  if (!tabList) {
    return;
  }
  tabList.addTab(args);
  globals.rafScheduler.scheduleFullRedraw();
}


// Shorthand for globals.bottomTabList.closeTabById(...) & redraw.
// Ignored when bottomTabList does not exist (e.g. no trace is open in the UI).
export function
closeTab(uuid: string) {
  const tabList = globals.bottomTabList;
  if (!tabList) {
    return;
  }
  tabList.closeTabById(uuid);
  globals.rafScheduler.scheduleFullRedraw();
}

interface PendingTab {
  tab: BottomTabBase, args: AddTabArgs, startTime: number,
}

function tabSelectionKey(tab: BottomTabBase) {
  return tab.tag ?? tab.uuid;
}

export class BottomTabList {
  private tabs: BottomTabBase[] = [];
  private pendingTabs: PendingTab[] = [];
  private engine: EngineProxy;
  private scheduledFlushSetTimeoutId?: number;

  constructor(engine: EngineProxy) {
    this.engine = engine;
  }

  getTabs(): BottomTabBase[] {
    this.flushPendingTabs();
    return this.tabs;
  }

  // Add and create a new panel with given kind and config, replacing an
  // existing panel with the same tag if needed. Returns the uuid of a newly
  // created panel (which can be used in the future to close it).
  addTab(args: AddTabArgs): AddTabResult {
    const uuid = uuidv4();
    const newPanel = bottomTabRegistry.get(args.kind).create({
      engine: this.engine,
      uuid,
      config: args.config,
      tag: args.tag,
    });

    this.pendingTabs.push({
      tab: newPanel,
      args,
      startTime: window.performance.now(),
    });
    this.flushPendingTabs();

    return {
      uuid,
    };
  }

  closeTabByTag(tag: string) {
    const index = this.tabs.findIndex((tab) => tab.tag === tag);
    if (index !== -1) {
      this.removeTabAtIndex(index);
    }
    // User closing a tab by tag should affect pending tabs as well, as these
    // tabs were requested to be added to the tab list before this call.
    this.pendingTabs = this.pendingTabs.filter(({tab}) => tab.tag !== tag);
  }

  closeTabById(uuid: string) {
    const index = this.tabs.findIndex((tab) => tab.uuid === uuid);
    if (index !== -1) {
      this.removeTabAtIndex(index);
    }
    // User closing a tab by id should affect pending tabs as well, as these
    // tabs were requested to be added to the tab list before this call.
    this.pendingTabs = this.pendingTabs.filter(({tab}) => tab.uuid !== uuid);
  }

  private removeTabAtIndex(index: number) {
    const tab = this.tabs[index];
    this.tabs.splice(index, 1);
    // If the current tab was closed, select the tab to the right of it.
    // If the closed tab was current and last in the tab list, select the tab
    // that became last.
    if (tab.uuid === globals.state.currentTab && this.tabs.length > 0) {
      const newActiveIndex = index === this.tabs.length ? index - 1 : index;
      globals.dispatch(Actions.setCurrentTab(
          {tab: tabSelectionKey(this.tabs[newActiveIndex])}));
    }
    globals.rafScheduler.scheduleFullRedraw();
  }

  // Check the list of the pending tabs and add the ones that are ready
  // (either tab.isLoading returns false or NEW_LOADING_TAB_DELAY_MS ms elapsed
  // since this tab was added).
  // Note: the pending tabs are stored in a queue to preserve the action order,
  // which matters for cases like adding tabs with the same tag.
  private flushPendingTabs() {
    const currentTime = window.performance.now();
    while (this.pendingTabs.length > 0) {
      const {tab, args, startTime} = this.pendingTabs[0];

      // This is a dirty hack^W^W low-lift solution for the world where some
      // "current selection" panels are implemented by BottomTabs and some by
      // details_panel.ts computing vnodes dynamically. Naive implementation
      // will: a) stop showing the old panel (because
      // globals.state.currentSelection changes). b) not showing the new
      // 'current_selection' tab yet. This will result in temporary shifting
      // focus to another tab (as no tab with 'current_selection' tag will
      // exist).
      //
      // To counteract this, short-circuit this logic and when:
      // a) no tag with 'current_selection' tag exists in the list of currently
      // displayed tabs and b) we are adding a tab with 'current_selection' tag.
      // add it immediately without waiting.
      // TODO(altimin): Remove this once all places have switched to be using
      // BottomTab to display panels.
      const currentSelectionTabAlreadyExists =
          this.tabs.filter((tab) => tab.tag === 'current_selection').length > 0;
      const dirtyHackForCurrentSelectionApplies =
          tab.tag === 'current_selection' && !currentSelectionTabAlreadyExists;

      const elapsedTimeMs = currentTime - startTime;
      if (tab.isLoading() && elapsedTimeMs < NEW_LOADING_TAB_DELAY_MS &&
          !dirtyHackForCurrentSelectionApplies) {
        this.schedulePendingTabsFlush(NEW_LOADING_TAB_DELAY_MS - elapsedTimeMs);
        // The first tab is not ready yet, wait.
        return;
      }
      this.pendingTabs.shift();

      const index =
          args.tag ? this.tabs.findIndex((tab) => tab.tag === args.tag) : -1;
      if (index === -1) {
        this.tabs.push(tab);
      } else {
        this.tabs[index] = tab;
      }

      if (args.select === undefined || args.select === true) {
        globals.dispatch(Actions.setCurrentTab({tab: tabSelectionKey(tab)}));
      }
    }
  }

  private schedulePendingTabsFlush(waitTimeMs: number) {
    if (this.scheduledFlushSetTimeoutId) {
      // The flush is already pending, no action is required.
      return;
    }
    setTimeout(() => {
      this.scheduledFlushSetTimeoutId = undefined;
      this.flushPendingTabs();
    }, waitTimeMs);
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

interface AnchorAttrs {
  // Optional icon to show at the end of the content.
  icon?: string;
  // Remaining items.
  [htmlAttrs: string]: any;
}

export class Anchor implements m.ClassComponent<AnchorAttrs> {
  view({attrs, children}: m.CVnode<AnchorAttrs>) {
    const {icon, ...htmlAttrs} = attrs;

    return m(
        'a.pf-anchor',
        htmlAttrs,
        icon && m('i.material-icons', icon),
        children,
    );
  }
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Draft, produce} from 'immer';
import m from 'mithril';

import {assertExists} from '../base/logging';
import {Actions} from '../common/actions';
import {RecordConfig} from '../controller/record_config_types';

import {copyToClipboard} from './clipboard';
import {globals} from './globals';

declare type Setter<T> = (draft: Draft<RecordConfig>, val: T) => void;
declare type Getter<T> = (cfg: RecordConfig) => T;

function defaultSort(a: string, b: string) {
  return a.localeCompare(b);
}

// +---------------------------------------------------------------------------+
// | Docs link with 'i' in circle icon.                                        |
// +---------------------------------------------------------------------------+

interface DocsChipAttrs {
  href: string;
}

class DocsChip implements m.ClassComponent<DocsChipAttrs> {
  view({attrs}: m.CVnode<DocsChipAttrs>) {
    return m(
        'a.inline-chip',
        {href: attrs.href, title: 'Open docs in new tab', target: '_blank'},
        m('i.material-icons', 'info'),
        ' Docs');
  }
}

// +---------------------------------------------------------------------------+
// | Probe: the rectangular box on the right-hand-side with a toggle box.      |
// +---------------------------------------------------------------------------+

export interface ProbeAttrs {
  title: string;
  img: string|null;
  compact?: boolean;
  descr: m.Children;
  isEnabled: Getter<boolean>;
  setEnabled: Setter<boolean>;
}

export class Probe implements m.ClassComponent<ProbeAttrs> {
  view({attrs, children}: m.CVnode<ProbeAttrs>) {
    const onToggle = (enabled: boolean) => {
      const traceCfg = produce(globals.state.recordConfig, (draft) => {
        attrs.setEnabled(draft, enabled);
      });
      globals.dispatch(Actions.setRecordConfig({config: traceCfg}));
    };

    const enabled = attrs.isEnabled(globals.state.recordConfig);

    return m(
        `.probe${attrs.compact ? '.compact' : ''}${enabled ? '.enabled' : ''}`,
        attrs.img && m('img', {
          src: `${globals.root}assets/${attrs.img}`,
          onclick: () => onToggle(!enabled),
        }),
        m('label',
          m(`input[type=checkbox]`, {
            checked: enabled,
            oninput: (e: InputEvent) => {
              onToggle((e.target as HTMLInputElement).checked);
            },
          }),
          m('span', attrs.title)),
        attrs.compact ?
            '' :
            m('div', m('div', attrs.descr), m('.probe-config', children)));
  }
}

export function CompactProbe(args: {
  title: string,
  isEnabled: Getter<boolean>,
  setEnabled: Setter<boolean>
}) {
  return m(Probe, {
    title: args.title,
    img: null,
    compact: true,
    descr: '',
    isEnabled: args.isEnabled,
    setEnabled: args.setEnabled,
  } as ProbeAttrs);
}

// +-------------------------------------------------------------+
// | Toggle: an on/off switch.
// +-------------------------------------------------------------+

export interface ToggleAttrs {
  title: string;
  descr: string;
  cssClass?: string;
  isEnabled: Getter<boolean>;
  setEnabled: Setter<boolean>;
}

export class Toggle implements m.ClassComponent<ToggleAttrs> {
  view({attrs}: m.CVnode<ToggleAttrs>) {
    const onToggle = (enabled: boolean) => {
      const traceCfg = produce(globals.state.recordConfig, (draft) => {
        attrs.setEnabled(draft, enabled);
      });
      globals.dispatch(Actions.setRecordConfig({config: traceCfg}));
    };

    const enabled = attrs.isEnabled(globals.state.recordConfig);

    return m(
        `.toggle${enabled ? '.enabled' : ''}${attrs.cssClass || ''}`,
        m('label',
          m(`input[type=checkbox]`, {
            checked: enabled,
            oninput: (e: InputEvent) => {
              onToggle((e.target as HTMLInputElement).checked);
            },
          }),
          m('span', attrs.title)),
        m('.descr', attrs.descr));
  }
}

// +---------------------------------------------------------------------------+
// | Slider: draggable horizontal slider with numeric spinner.                 |
// +---------------------------------------------------------------------------+

export interface SliderAttrs {
  title: string;
  icon?: string;
  cssClass?: string;
  isTime?: boolean;
  unit: string;
  values: number[];
  get: Getter<number>;
  set: Setter<number>;
  min?: number;
  description?: string;
  disabled?: boolean;
  zeroIsDefault?: boolean;
}

export class Slider implements m.ClassComponent<SliderAttrs> {
  onValueChange(attrs: SliderAttrs, newVal: number) {
    const traceCfg = produce(globals.state.recordConfig, (draft) => {
      attrs.set(draft, newVal);
    });
    globals.dispatch(Actions.setRecordConfig({config: traceCfg}));
  }

  onTimeValueChange(attrs: SliderAttrs, hms: string) {
    try {
      const date = new Date(`1970-01-01T${hms}.000Z`);
      if (isNaN(date.getTime())) return;
      this.onValueChange(attrs, date.getTime());
    } catch {
    }
  }

  onSliderChange(attrs: SliderAttrs, newIdx: number) {
    this.onValueChange(attrs, attrs.values[newIdx]);
  }

  view({attrs}: m.CVnode<SliderAttrs>) {
    const id = attrs.title.replace(/[^a-z0-9]/gmi, '_').toLowerCase();
    const maxIdx = attrs.values.length - 1;
    const val = attrs.get(globals.state.recordConfig);
    let min = attrs.min || 1;
    if (attrs.zeroIsDefault) {
      min = Math.min(0, min);
    }
    const description = attrs.description;
    const disabled = attrs.disabled;

    // Find the index of the closest value in the slider.
    let idx = 0;
    for (; idx < attrs.values.length && attrs.values[idx] < val; idx++) {
    }

    let spinnerCfg = {};
    if (attrs.isTime) {
      spinnerCfg = {
        type: 'text',
        pattern: '(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}',  // hh:mm:ss
        value: new Date(val).toISOString().substr(11, 8),
        oninput: (e: InputEvent) => {
          this.onTimeValueChange(attrs, (e.target as HTMLInputElement).value);
        },
      };
    } else {
      const isDefault = attrs.zeroIsDefault && val === 0;
      spinnerCfg = {
        type: 'number',
        value: isDefault ? '' : val,
        placeholder: isDefault ? '(default)' : '',
        oninput: (e: InputEvent) => {
          this.onValueChange(attrs, +(e.target as HTMLInputElement).value);
        },
      };
    }
    return m(
        '.slider' + (attrs.cssClass || ''),
        m('header', attrs.title),
        description ? m('header.descr', attrs.description) : '',
        attrs.icon !== undefined ? m('i.material-icons', attrs.icon) : [],
        m(`input[id="${id}"][type=range][min=0][max=${maxIdx}][value=${idx}]`, {
          disabled,
          oninput: (e: InputEvent) => {
            this.onSliderChange(attrs, +(e.target as HTMLInputElement).value);
          },
        }),
        m(`input.spinner[min=${min}][for=${id}]`, spinnerCfg),
        m('.unit', attrs.unit));
  }
}

// +---------------------------------------------------------------------------+
// | Dropdown: wrapper around <select>. Supports single an multiple selection. |
// +---------------------------------------------------------------------------+

export interface DropdownAttrs {
  title: string;
  cssClass?: string;
  options: Map<string, string>;
  sort?: (a: string, b: string) => number;
  get: Getter<string[]>;
  set: Setter<string[]>;
}

export class Dropdown implements m.ClassComponent<DropdownAttrs> {
  resetScroll(dom: HTMLSelectElement) {
    // Chrome seems to override the scroll offset on creationa, b without this,
    // even though we call it after having marked the options as selected.
    setTimeout(() => {
      // Don't reset the scroll position if the element is still focused.
      if (dom !== document.activeElement) dom.scrollTop = 0;
    }, 0);
  }

  onChange(attrs: DropdownAttrs, e: Event) {
    const dom = e.target as HTMLSelectElement;
    const selKeys: string[] = [];
    for (let i = 0; i < dom.selectedOptions.length; i++) {
      const item = assertExists(dom.selectedOptions.item(i));
      selKeys.push(item.value);
    }
    const traceCfg = produce(globals.state.recordConfig, (draft) => {
      attrs.set(draft, selKeys);
    });
    globals.dispatch(Actions.setRecordConfig({config: traceCfg}));
  }

  view({attrs}: m.CVnode<DropdownAttrs>) {
    const options: m.Children = [];
    const selItems = attrs.get(globals.state.recordConfig);
    let numSelected = 0;
    const entries = [...attrs.options.entries()];
    const f = attrs.sort === undefined ? defaultSort : attrs.sort;
    entries.sort((a, b) => f(a[1], b[1]));
    for (const [key, label] of entries) {
      const opts = {value: key, selected: false};
      if (selItems.includes(key)) {
        opts.selected = true;
        numSelected++;
      }
      options.push(m('option', opts, label));
    }
    const label = `${attrs.title} ${numSelected ? `(${numSelected})` : ''}`;
    return m(
        `select.dropdown${attrs.cssClass || ''}[multiple=multiple]`,
        {
          onblur: (e: Event) => this.resetScroll(e.target as HTMLSelectElement),
          onmouseleave: (e: Event) =>
              this.resetScroll(e.target as HTMLSelectElement),
          oninput: (e: Event) => this.onChange(attrs, e),
          oncreate: (vnode) => this.resetScroll(vnode.dom as HTMLSelectElement),
        },
        m('optgroup', {label}, options));
  }
}


// +---------------------------------------------------------------------------+
// | Textarea: wrapper around <textarea>.                                      |
// +---------------------------------------------------------------------------+

export interface TextareaAttrs {
  placeholder: string;
  docsLink?: string;
  cssClass?: string;
  get: Getter<string>;
  set: Setter<string>;
  title?: string;
}

export class Textarea implements m.ClassComponent<TextareaAttrs> {
  onChange(attrs: TextareaAttrs, dom: HTMLTextAreaElement) {
    const traceCfg = produce(globals.state.recordConfig, (draft) => {
      attrs.set(draft, dom.value);
    });
    globals.dispatch(Actions.setRecordConfig({config: traceCfg}));
  }

  view({attrs}: m.CVnode<TextareaAttrs>) {
    return m(
        '.textarea-holder',
        m('header',
          attrs.title,
          attrs.docsLink && [' ', m(DocsChip, {href: attrs.docsLink})]),
        m(`textarea.extra-input${attrs.cssClass || ''}`, {
          onchange: (e: Event) =>
              this.onChange(attrs, e.target as HTMLTextAreaElement),
          placeholder: attrs.placeholder,
          value: attrs.get(globals.state.recordConfig),
        }));
  }
}

// +---------------------------------------------------------------------------+
// | CodeSnippet: command-prompt-like box with code snippets to copy/paste.    |
// +---------------------------------------------------------------------------+

export interface CodeSnippetAttrs {
  text: string;
  hardWhitespace?: boolean;
}

export class CodeSnippet implements m.ClassComponent<CodeSnippetAttrs> {
  view({attrs}: m.CVnode<CodeSnippetAttrs>) {
    return m(
        '.code-snippet',
        m('button',
          {
            title: 'Copy to clipboard',
            onclick: () => copyToClipboard(attrs.text),
          },
          m('i.material-icons', 'assignment')),
        m('code', attrs.text),
    );
  }
}


interface CategoriesCheckboxListParams {
  categories: Map<string, string>;
  title: string;
  get: Getter<string[]>;
  set: Setter<string[]>;
}

export class CategoriesCheckboxList implements
    m.ClassComponent<CategoriesCheckboxListParams> {
  updateValue(
      attrs: CategoriesCheckboxListParams, value: string, enabled: boolean) {
    const traceCfg = produce(globals.state.recordConfig, (draft) => {
      const values = attrs.get(draft);
      const index = values.indexOf(value);
      if (enabled && index === -1) {
        values.push(value);
      }
      if (!enabled && index !== -1) {
        values.splice(index, 1);
      }
    });
    globals.dispatch(Actions.setRecordConfig({config: traceCfg}));
  }

  view({attrs}: m.CVnode<CategoriesCheckboxListParams>) {
    const enabled = new Set(attrs.get(globals.state.recordConfig));
    return m(
        '.categories-list',
        m('h3',
          attrs.title,
          m('button.config-button',
            {
              onclick: () => {
                const config = produce(globals.state.recordConfig, (draft) => {
                  attrs.set(draft, Array.from(attrs.categories.keys()));
                });
                globals.dispatch(Actions.setRecordConfig({config}));
              },
            },
            'All'),
          m('button.config-button',
            {
              onclick: () => {
                const config = produce(globals.state.recordConfig, (draft) => {
                  attrs.set(draft, []);
                });
                globals.dispatch(Actions.setRecordConfig({config}));
              },
            },
            'None')),
        m('ul.checkboxes',
          Array.from(attrs.categories.entries()).map(([key, value]) => {
            const id = `category-checkbox-${key}`;
            return m(
                'label',
                {'for': id},
                m('li',
                  m('input[type=checkbox]', {
                    id,
                    checked: enabled.has(key),
                    onclick: (e: InputEvent) => {
                      const target = e.target as HTMLInputElement;
                      this.updateValue(attrs, key, target.checked);
                    },
                  }),
                  value));
          })));
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// It's common to want to have a class depending on a boolean flag, in which
// case we use `flag && className` which evaluates to either false or a string,
// which is why false is included in definition of ArgType.
type ArgType = string|false|undefined|ArgType[];

// Join class names together into valid HTML class attributes
// Falsey elements are ignored
// Nested arrays are flattened
export function classNames(...args: ArgType[]): string {
  return args.flat().filter((x) => x).join(' ');
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Need to turn off Long
import '../common/query_result';

import {Patch, produce} from 'immer';
import m from 'mithril';

import {defer} from '../base/deferred';
import {assertExists, reportError, setErrorHandler} from '../base/logging';
import {Actions, DeferredAction, StateActions} from '../common/actions';
import {createEmptyState} from '../common/empty_state';
import {RECORDING_V2_FLAG} from '../common/feature_flags';
import {initializeImmerJs} from '../common/immer_init';
import {pluginManager, pluginRegistry} from '../common/plugins';
import {onSelectionChanged} from '../common/selection_observer';
import {State} from '../common/state';
import {initWasm} from '../common/wasm_engine_proxy';
import {initController, runControllers} from '../controller';
import {
  isGetCategoriesResponse,
} from '../controller/chrome_proxy_record_controller';

import {AnalyzePage} from './analyze_page';
import {initCssConstants} from './css_constants';
import {registerDebugGlobals} from './debug';
import {maybeShowErrorDialog} from './error_dialog';
import {installFileDropHandler} from './file_drop_handler';
import {FlagsPage} from './flags_page';
import {globals} from './globals';
import {HomePage} from './home_page';
import {initLiveReloadIfLocalhost} from './live_reload';
import {MetricsPage} from './metrics_page';
import {postMessageHandler} from './post_message_handler';
import {RecordPage, updateAvailableAdbDevices} from './record_page';
import {RecordPageV2} from './record_page_v2';
import {Router} from './router';
import {CheckHttpRpcConnection} from './rpc_http_dialog';
import {TraceInfoPage} from './trace_info_page';
import {maybeOpenTraceFromRoute} from './trace_url_handler';
import {ViewerPage} from './viewer_page';
import {WidgetsPage} from './widgets_page';

const EXTENSION_ID = 'lfmkphfpdbjijhpomgecfikhfohaoine';

class FrontendApi {
  private state: State;

  constructor() {
    this.state = createEmptyState();
  }

  dispatchMultiple(actions: DeferredAction[]) {
    const oldState = this.state;
    const patches: Patch[] = [];
    for (const action of actions) {
      const originalLength = patches.length;
      const morePatches = this.applyAction(action);
      patches.length += morePatches.length;
      for (let i = 0; i < morePatches.length; ++i) {
        patches[i + originalLength] = morePatches[i];
      }
    }

    if (this.state === oldState) {
      return;
    }

    // Update overall state.
    globals.state = this.state;

    // If the visible time in the global state has been updated more recently
    // than the visible time handled by the frontend @ 60fps, update it. This
    // typically happens when restoring the state from a permalink.
    globals.frontendLocalState.mergeState(this.state.frontendLocalState);

    // Only redraw if something other than the frontendLocalState changed.
    let key: keyof State;
    for (key in this.state) {
      if (key !== 'frontendLocalState' && key !== 'visibleTracks' &&
          oldState[key] !== this.state[key]) {
        globals.rafScheduler.scheduleFullRedraw();
        break;
      }
    }

    if (this.state.currentSelection !== oldState.currentSelection) {
      // TODO(altimin): Currently we are not triggering this when changing
      // the set of selected tracks via toggling per-track checkboxes.
      // Fix that.
      onSelectionChanged(
          this.state.currentSelection || undefined,
          oldState.currentSelection || undefined);
    }

    if (patches.length > 0) {
      // Need to avoid reentering the controller so move this to a
      // separate task.
      setTimeout(() => {
        runControllers();
      }, 0);
    }
  }

  private applyAction(action: DeferredAction): Patch[] {
    const patches: Patch[] = [];

    // 'produce' creates a immer proxy which wraps the current state turning
    // all imperative mutations of the state done in the callback into
    // immutable changes to the returned state.
    this.state = produce(
        this.state,
        (draft) => {
          (StateActions as any)[action.type](draft, action.args);
        },
        (morePatches, _) => {
          const originalLength = patches.length;
          patches.length += morePatches.length;
          for (let i = 0; i < morePatches.length; ++i) {
            patches[i + originalLength] = morePatches[i];
          }
        });
    return patches;
  }
}

function setExtensionAvailability(available: boolean) {
  globals.dispatch(Actions.setExtensionAvailable({
    available,
  }));
}

function initGlobalsFromQueryString() {
  const queryString = window.location.search;
  globals.embeddedMode = queryString.includes('mode=embedded');
  globals.hideSidebar = queryString.includes('hideSidebar=true');
}

function setupContentSecurityPolicy() {
  // Note: self and sha-xxx must be quoted, urls data: and blob: must not.
  const policy = {
    'default-src': [
      `'self'`,
      // Google Tag Manager bootstrap.
      `'sha256-LirUKeorCU4uRNtNzr8tlB11uy8rzrdmqHCX38JSwHY='`,
    ],
    'script-src': [
      `'self'`,
      // TODO(b/201596551): this is required for Wasm after crrev.com/c/3179051
      // and should be replaced with 'wasm-unsafe-eval'.
      `'unsafe-eval'`,
      'https://*.google.com',
      'https://*.googleusercontent.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
    ],
    'object-src': ['none'],
    'connect-src': [
      `'self'`,
      'http://127.0.0.1:9001',  // For trace_processor_shell --httpd.
      'ws://127.0.0.1:9001',    // Ditto, for the websocket RPC.
      'ws://127.0.0.1:8037',    // For the adb websocket server.
      'https://www.google-analytics.com',
      'https://*.googleapis.com',  // For Google Cloud Storage fetches.
      'blob:',
      'data:',
    ],
    'img-src': [
      `'self'`,
      'data:',
      'blob:',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
    ],
    'navigate-to': ['https://*.perfetto.dev', 'self'],
  };
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  let policyStr = '';
  for (const [key, list] of Object.entries(policy)) {
    policyStr += `${key} ${list.join(' ')}; `;
  }
  meta.content = policyStr;
  document.head.appendChild(meta);
}

function main() {
  setupContentSecurityPolicy();

  // Load the css. The load is asynchronous and the CSS is not ready by the time
  // appenChild returns.
  const cssLoadPromise = defer<void>();
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = globals.root + 'perfetto.css';
  css.onload = () => cssLoadPromise.resolve();
  css.onerror = (err) => cssLoadPromise.reject(err);
  const favicon = document.head.querySelector('#favicon') as HTMLLinkElement;
  if (favicon) favicon.href = globals.root + 'assets/favicon.png';

  // Load the script to detect if this is a Googler (see comments on globals.ts)
  // and initialize GA after that (or after a timeout if something goes wrong).
  const script = document.createElement('script');
  script.src =
      'https://storage.cloud.google.com/perfetto-ui-internal/is_internal_user.js';
  script.async = true;
  script.onerror = () => globals.logging.initialize();
  script.onload = () => globals.logging.initialize();
  setTimeout(() => globals.logging.initialize(), 5000);

  document.head.append(script, css);

  // Add Error handlers for JS error and for uncaught exceptions in promises.
  setErrorHandler((err: string) => maybeShowErrorDialog(err));
  window.addEventListener('error', (e) => reportError(e));
  window.addEventListener('unhandledrejection', (e) => reportError(e));

  const extensionLocalChannel = new MessageChannel();

  initWasm(globals.root);
  initializeImmerJs();
  initController(extensionLocalChannel.port1);

  const dispatch = (action: DeferredAction) => {
    frontendApi.dispatchMultiple([action]);
  };

  const router = new Router({
    '/': HomePage,
    '/viewer': ViewerPage,
    '/record': RECORDING_V2_FLAG.get() ? RecordPageV2 : RecordPage,
    '/query': AnalyzePage,
    '/flags': FlagsPage,
    '/metrics': MetricsPage,
    '/info': TraceInfoPage,
    '/widgets': WidgetsPage,
  });
  router.onRouteChanged = (route) => {
    globals.rafScheduler.scheduleFullRedraw();
    maybeOpenTraceFromRoute(route);
  };

  // This must be called before calling `globals.initialize` so that the
  // `embeddedMode` global is set.
  initGlobalsFromQueryString();

  globals.initialize(dispatch, router);
  globals.serviceWorkerController.install();

  const frontendApi = new FrontendApi();
  globals.publishRedraw = () => globals.rafScheduler.scheduleFullRedraw();

  // We proxy messages between the extension and the controller because the
  // controller's worker can't access chrome.runtime.
  const extensionPort = window.chrome && chrome.runtime ?
      chrome.runtime.connect(EXTENSION_ID) :
      undefined;

  setExtensionAvailability(extensionPort !== undefined);

  if (extensionPort) {
    extensionPort.onDisconnect.addListener((_) => {
      setExtensionAvailability(false);
      void chrome.runtime.lastError;  // Needed to not receive an error log.
    });
    // This forwards the messages from the extension to the controller.
    extensionPort.onMessage.addListener(
        (message: object, _port: chrome.runtime.Port) => {
          if (isGetCategoriesResponse(message)) {
            globals.dispatch(Actions.setChromeCategories(message));
            return;
          }
          extensionLocalChannel.port2.postMessage(message);
        });
  }

  // This forwards the messages from the controller to the extension
  extensionLocalChannel.port2.onmessage = ({data}) => {
    if (extensionPort) extensionPort.postMessage(data);
  };

  // Put debug variables in the global scope for better debugging.
  registerDebugGlobals();

  // Prevent pinch zoom.
  document.body.addEventListener('wheel', (e: MouseEvent) => {
    if (e.ctrlKey) e.preventDefault();
  }, {passive: false});

  cssLoadPromise.then(() => onCssLoaded());

  if (globals.testing) {
    document.body.classList.add('testing');
  }

  // Initialize all plugins:
  for (const plugin of pluginRegistry.values()) {
    pluginManager.activatePlugin(plugin.pluginId);
  }
}


function onCssLoaded() {
  initCssConstants();
  // Clear all the contents of the initial page (e.g. the <pre> error message)
  // And replace it with the root <main> element which will be used by mithril.
  document.body.innerHTML = '<main></main>';
  const main = assertExists(document.body.querySelector('main'));
  globals.rafScheduler.domRedraw = () => {
    m.render(main, globals.router.resolve());
  };

  initLiveReloadIfLocalhost();

  if (!RECORDING_V2_FLAG.get()) {
    updateAvailableAdbDevices();
    try {
      navigator.usb.addEventListener(
          'connect', () => updateAvailableAdbDevices());
      navigator.usb.addEventListener(
          'disconnect', () => updateAvailableAdbDevices());
    } catch (e) {
      console.error('WebUSB API not supported');
    }
  }

  // Will update the chip on the sidebar footer that notifies that the RPC is
  // connected. Has no effect on the controller (which will repeat this check
  // before creating a new engine).
  // Don't auto-open any trace URLs until we get a response here because we may
  // accidentially clober the state of an open trace processor instance
  // otherwise.
  CheckHttpRpcConnection().then(() => {
    if (!globals.embeddedMode) {
      installFileDropHandler();
    }

    // Don't allow postMessage or opening trace from route when the user says
    // that they want to reuse the already loaded trace in trace processor.
    const engine = globals.getCurrentEngine();
    if (engine && engine.source.type === 'HTTP_RPC') {
      return;
    }

    // Add support for opening traces from postMessage().
    window.addEventListener('message', postMessageHandler, {passive: true});

    // Handles the initial ?local_cache_key=123 or ?s=permalink or ?url=...
    // cases.
    maybeOpenTraceFromRoute(Router.parseUrl(window.location.href));
  });
}

main();
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {assertExists} from '../base/logging';
import {Actions} from '../common/actions';
import {cropText, drawIncompleteSlice} from '../common/canvas_utils';
import {
  colorCompare,
  colorToStr,
  UNEXPECTED_PINK_COLOR,
} from '../common/colorizer';
import {NUM} from '../common/query_result';
import {Selection, SelectionKind} from '../common/state';
import {fromNs, toNs} from '../common/time';

import {checkerboardExcept} from './checkerboard';
import {globals} from './globals';
import {Slice} from './slice';
import {DEFAULT_SLICE_LAYOUT, SliceLayout} from './slice_layout';
import {NewTrackArgs, SliceRect, Track} from './track';
import {BUCKETS_PER_PIXEL, CacheKey, TrackCache} from './track_cache';

// The common class that underpins all tracks drawing slices.

export const SLICE_FLAGS_INCOMPLETE = 1;
export const SLICE_FLAGS_INSTANT = 2;

// Slices smaller than this don't get any text:
const SLICE_MIN_WIDTH_FOR_TEXT_PX = 5;
const SLICE_MIN_WIDTH_PX = 1 / BUCKETS_PER_PIXEL;
const CHEVRON_WIDTH_PX = 10;
const DEFAULT_SLICE_COLOR = UNEXPECTED_PINK_COLOR;

// Exposed and standalone to allow for testing without making this
// visible to subclasses.
function filterVisibleSlices<S extends Slice>(
    slices: S[], startS: number, endS: number): S[] {
  // Here we aim to reduce the number of slices we have to draw
  // by ignoring those that are not visible. A slice is visible iff:
  //   slice.start + slice.duration >= start && slice.start <= end
  // It's allowable to include slices which aren't visible but we
  // must not exclude visible slices.
  // We could filter this.slices using this condition but since most
  // often we should have the case where there are:
  // - First a bunch of non-visible slices to the left of the viewport
  // - Then a bunch of visible slices within the viewport
  // - Finally a second bunch of non-visible slices to the right of the
  //   viewport.
  // It seems more sensible to identify the left-most and right-most
  // visible slices then 'slice' to select these slices and everything
  // between.

  // We do not need to handle non-ending slices (where dur = -1
  // but the slice is drawn as 'infinite' length) as this is handled
  // by a special code path.
  // TODO(hjd): Implement special code path.

  // While the slices are guaranteed to be ordered by timestamp we must
  // consider async slices (which are not perfectly nested). This is to
  // say if we see slice A then B it is guaranteed the A.start <= B.start
  // but there is no guarantee that (A.end < B.start XOR A.end >= B.end).
  // Due to this is not possible to use binary search to find the first
  // visible slice. Consider the following situation:
  //         start V            V end
  //     AAA  CCC       DDD   EEEEEEE
  //      BBBBBBBBBBBB            GGG
  //                           FFFFFFF
  // B is visible but A and C are not. In general there could be
  // arbitrarily many slices between B and D which are not visible.

  // You could binary search to find D (i.e. the first slice which
  // starts after |start|) then work backwards to find B.
  // The last visible slice is simpler, since the slices are sorted
  // by timestamp you can binary search for the last slice such
  // that slice.start <= end.

  // One specific edge case that will come up often is when:
  // For all slice in slices: slice.startS > endS (e.g. all slices are to the
  // right). Since the slices are sorted by startS we can check this easily:
  const maybeFirstSlice: S|undefined = slices[0];
  if (maybeFirstSlice && maybeFirstSlice.startS > endS) {
    return [];
  }
  // It's not possible to easily check the analogous edge case where all slices
  // are to the left:
  // For all slice in slices: slice.startS + slice.durationS < startS
  // as the slices are not ordered by 'endS'.

  // As described above you could do some clever binary search combined with
  // iteration however that seems quite complicated and error prone so instead
  // the idea of the code below is that we iterate forward though the
  // array incrementing startIdx until we find the first visible slice
  // then backwards through the array decrementing endIdx until we find the
  // last visible slice. In the worst case we end up doing one full pass on
  // the array. This code is robust to slices not being sorted.
  let startIdx = 0;
  let endIdx = slices.length;
  for (; startIdx < endIdx; ++startIdx) {
    const slice = slices[startIdx];
    const sliceEndS = slice.startS + slice.durationS;
    if (sliceEndS >= startS && slice.startS <= endS) {
      break;
    }
  }
  for (; startIdx < endIdx; --endIdx) {
    const slice = slices[endIdx - 1];
    const sliceEndS = slice.startS + slice.durationS;
    if (sliceEndS >= startS && slice.startS <= endS) {
      break;
    }
  }
  return slices.slice(startIdx, endIdx);
}

export const filterVisibleSlicesForTesting = filterVisibleSlices;

// The minimal set of columns that any table/view must expose to render tracks.
// Note: this class assumes that, at the SQL level, slices are:
// - Not temporally overlapping (unless they are nested at inner depth).
// - Strictly stacked (i.e. a slice at depth N+1 cannot be larger than any
//   slices at depth 0..N.
// If you need temporally overlapping slices, look at AsyncSliceTrack, which
// merges several tracks into one visual track.
export const BASE_SLICE_ROW = {
  id: NUM,      // The slice ID, for selection / lookups.
  tsq: NUM,     // Quantized |ts|. This class owns the quantization logic.
  tsqEnd: NUM,  // Quantized |ts+dur|. The end bucket.
  ts: NUM,      // Start time in nanoseconds.
  dur: NUM,     // Duration in nanoseconds. -1 = incomplete, 0 = instant.
  depth: NUM,   // Vertical depth.
};

export type BaseSliceRow = typeof BASE_SLICE_ROW;

// These properties change @ 60FPS and shouldn't be touched by the subclass.
// since the Impl doesn't see every frame attempting to reason on them in a
// subclass will run in to issues.
interface SliceInternal {
  x: number;
  w: number;
}

// We use this to avoid exposing subclasses to the properties that live on
// SliceInternal. Within BaseSliceTrack the underlying storage and private
// methods use CastInternal<T['slice']> (i.e. whatever the subclass requests
// plus our implementation fields) but when we call 'virtual' methods that
// the subclass should implement we use just T['slice'] hiding x & w.
type CastInternal<S extends Slice> = S&SliceInternal;

// The meta-type which describes the types used to extend the BaseSliceTrack.
// Derived classes can extend this interface to override these types if needed.
export interface BaseSliceTrackTypes {
  slice: Slice;
  row: BaseSliceRow;
  config: {};
}

export abstract class BaseSliceTrack<T extends BaseSliceTrackTypes =
                                                   BaseSliceTrackTypes> extends
    Track<T['config']> {
  protected sliceLayout: SliceLayout = {...DEFAULT_SLICE_LAYOUT};

  // This is the over-skirted cached bounds:
  private slicesKey: CacheKey = CacheKey.zero();

  // This is the currently 'cached' slices:
  private slices = new Array<CastInternal<T['slice']>>();

  // This is the slices cache:
  private cache: TrackCache<Array<CastInternal<T['slice']>>> =
      new TrackCache(5);

  private readonly tableName: string;
  private maxDurNs = 0;
  private sqlState: 'UNINITIALIZED'|'INITIALIZING'|'QUERY_PENDING'|
      'QUERY_DONE' = 'UNINITIALIZED';
  private extraSqlColumns: string[];

  private charWidth = -1;
  private hoverPos?: {x: number, y: number};
  protected hoveredSlice?: T['slice'];
  private hoverTooltip: string[] = [];
  private maxDataDepth = 0;

  // Computed layout.
  private computedTrackHeight = 0;
  private computedSliceHeight = 0;
  private computedRowSpacing = 0;

  // True if this track (and any views tables it might have created) has been
  // destroyed. This is unfortunately error prone (since we must manually check
  // this between each query).
  // TODO(hjd): Replace once we have cancellable query sequences.
  private isDestroyed = false;

  // Extension points.
  // Each extension point should take a dedicated argument type (e.g.,
  // OnSliceOverArgs {slice?: T['slice']}) so it makes future extensions
  // non-API-breaking (e.g. if we want to add the X position).
  abstract initSqlTable(_tableName: string): Promise<void>;
  getRowSpec(): T['row'] {
    return BASE_SLICE_ROW;
  }
  onSliceOver(_args: OnSliceOverArgs<T['slice']>): void {}
  onSliceOut(_args: OnSliceOutArgs<T['slice']>): void {}
  onSliceClick(_args: OnSliceClickArgs<T['slice']>): void {}

  // The API contract of onUpdatedSlices() is:
  //  - I am going to draw these slices in the near future.
  //  - I am not going to draw any slice that I haven't passed here first.
  //  - This is guaranteed to be called at least once on every global
  //    state update.
  //  - This is NOT guaranteed to be called on every frame. For instance you
  //    cannot use this to do some colour-based animation.
  onUpdatedSlices(slices: Array<T['slice']>): void {
    this.highlightHovererdAndSameTitle(slices);
  }

  // TODO(hjd): Remove.
  drawSchedLatencyArrow(
      _: CanvasRenderingContext2D, _selectedSlice?: T['slice']): void {}

  constructor(args: NewTrackArgs) {
    super(args);
    this.frontendOnly = true;  // Disable auto checkerboarding.
    // TODO(hjd): Handle pinned tracks, which current cause a crash
    // since the tableName we generate is the same for both.
    this.tableName = `track_${this.trackId}`.replace(/[^a-zA-Z0-9_]+/g, '_');

    // Work out the extra columns.
    // This is the union of the embedder-defined columns and the base columns
    // we know about (ts, dur, ...).
    const allCols = Object.keys(this.getRowSpec());
    const baseCols = Object.keys(BASE_SLICE_ROW);
    this.extraSqlColumns = allCols.filter((key) => !baseCols.includes(key));
  }

  setSliceLayout(sliceLayout: SliceLayout) {
    if (sliceLayout.minDepth > sliceLayout.maxDepth) {
      const {maxDepth, minDepth} = sliceLayout;
      throw new Error(`minDepth ${minDepth} must be <= maxDepth ${maxDepth}`);
    }
    this.sliceLayout = sliceLayout;
  }

  onFullRedraw(): void {
    // Give a chance to the embedder to change colors and other stuff.
    this.onUpdatedSlices(this.slices);
  }

  protected isSelectionHandled(selection: Selection): boolean {
    // TODO(hjd): Remove when updating selection.
    // We shouldn't know here about CHROME_SLICE. Maybe should be set by
    // whatever deals with that. Dunno the namespace of selection is weird. For
    // most cases in non-ambiguous (because most things are a 'slice'). But some
    // others (e.g. THREAD_SLICE) have their own ID namespace so we need this.
    const supportedSelectionKinds: SelectionKind[] = ['SLICE', 'CHROME_SLICE'];
    return supportedSelectionKinds.includes(selection.kind);
  }

  renderCanvas(ctx: CanvasRenderingContext2D): void {
    // TODO(hjd): fonts and colors should come from the CSS and not hardcoded
    // here.
    const timeScale = globals.frontendLocalState.timeScale;
    const vizTime = globals.frontendLocalState.visibleWindowTime;

    {
      const windowSizePx = Math.max(1, timeScale.endPx - timeScale.startPx);
      const rawStartNs = toNs(vizTime.start);
      const rawEndNs = toNs(vizTime.end);
      const rawSlicesKey = CacheKey.create(rawStartNs, rawEndNs, windowSizePx);

      // If the visible time range is outside the cached area, requests
      // asynchronously new data from the SQL engine.
      this.maybeRequestData(rawSlicesKey);
    }

    // In any case, draw whatever we have (which might be stale/incomplete).

    let charWidth = this.charWidth;
    if (charWidth < 0) {
      // TODO(hjd): Centralize font measurement/invalidation.
      ctx.font = '12px Roboto Condensed';
      charWidth = this.charWidth = ctx.measureText('dbpqaouk').width / 8;
    }

    // Filter only the visible slices. |this.slices| will have more slices than
    // needed because maybeRequestData() over-fetches to handle small pan/zooms.
    // We don't want to waste time drawing slices that are off screen.
    const vizSlices = this.getVisibleSlicesInternal(vizTime.start, vizTime.end);

    let selection = globals.state.currentSelection;

    if (!selection || !this.isSelectionHandled(selection)) {
      selection = null;
    }

    // Believe it or not, doing 4xO(N) passes is ~2x faster than trying to draw
    // everything in one go. The key is that state changes operations on the
    // canvas (e.g., color, fonts) dominate any number crunching we do in JS.

    this.updateSliceAndTrackHeight();
    const sliceHeight = this.computedSliceHeight;
    const padding = this.sliceLayout.padding;
    const rowSpacing = this.computedRowSpacing;

    // First pass: compute geometry of slices.
    let selSlice: CastInternal<T['slice']>|undefined;

    // pxEnd is the last visible pixel in the visible viewport. Drawing
    // anything < 0 or > pxEnd doesn't produce any visible effect as it goes
    // beyond the visible portion of the canvas.
    const pxEnd = Math.floor(timeScale.timeToPx(vizTime.end));

    for (const slice of vizSlices) {
      // Compute the basic geometry for any visible slice, even if only
      // partially visible. This might end up with a negative x if the
      // slice starts before the visible time or with a width that overflows
      // pxEnd.
      slice.x = timeScale.timeToPx(slice.startS);
      slice.w = timeScale.deltaTimeToPx(slice.durationS);
      if (slice.flags & SLICE_FLAGS_INSTANT) {
        // In the case of an instant slice, set the slice geometry on the
        // bounding box that will contain the chevron.
        slice.x -= CHEVRON_WIDTH_PX / 2;
        slice.w = CHEVRON_WIDTH_PX;
      } else {
        // If the slice is an actual slice, intersect the slice geometry with
        // the visible viewport (this affects only the first and last slice).
        // This is so that text is always centered even if we are zoomed in.
        // Visually if we have
        //                   [    visible viewport   ]
        //  [         slice         ]
        // The resulting geometry will be:
        //                   [slice]
        // So that the slice title stays within the visible region.
        const sliceVizLimit = Math.min(slice.x + slice.w, pxEnd);
        slice.x = Math.max(slice.x, 0);
        slice.w = sliceVizLimit - slice.x;
      }

      if (selection && (selection as {id: number}).id === slice.id) {
        selSlice = slice;
      }
    }

    // Second pass: fill slices by color.
    // The .slice() turned out to be an unintended pun.
    const vizSlicesByColor = vizSlices.slice();
    vizSlicesByColor.sort((a, b) => colorCompare(a.color, b.color));
    let lastColor = undefined;
    for (const slice of vizSlicesByColor) {
      if (slice.color !== lastColor) {
        lastColor = slice.color;
        ctx.fillStyle = colorToStr(slice.color);
      }
      const y = padding + slice.depth * (sliceHeight + rowSpacing);
      if (slice.flags & SLICE_FLAGS_INSTANT) {
        this.drawChevron(ctx, slice.x, y, sliceHeight);
      } else if (slice.flags & SLICE_FLAGS_INCOMPLETE) {
        const w = Math.max(slice.w - 2, 2);
        drawIncompleteSlice(ctx, slice.x, y, w, sliceHeight);
      } else {
        const w = Math.max(slice.w, SLICE_MIN_WIDTH_PX);
        ctx.fillRect(slice.x, y, w, sliceHeight);
      }
    }

    // Third pass, draw the titles (e.g., process name for sched slices).
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '12px Roboto Condensed';
    ctx.textBaseline = 'middle';
    for (const slice of vizSlices) {
      if ((slice.flags & SLICE_FLAGS_INSTANT) || !slice.title ||
          slice.w < SLICE_MIN_WIDTH_FOR_TEXT_PX) {
        continue;
      }

      const title = cropText(slice.title, charWidth, slice.w);
      const rectXCenter = slice.x + slice.w / 2;
      const y = padding + slice.depth * (sliceHeight + rowSpacing);
      const yDiv = slice.subTitle ? 3 : 2;
      const yMidPoint = Math.floor(y + sliceHeight / yDiv) - 0.5;
      ctx.fillText(title, rectXCenter, yMidPoint);
    }

    // Fourth pass, draw the subtitles (e.g., thread name for sched slices).
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '10px Roboto Condensed';
    for (const slice of vizSlices) {
      if (slice.w < SLICE_MIN_WIDTH_FOR_TEXT_PX || !slice.subTitle ||
          (slice.flags & SLICE_FLAGS_INSTANT)) {
        continue;
      }
      const rectXCenter = slice.x + slice.w / 2;
      const subTitle = cropText(slice.subTitle, charWidth, slice.w);
      const y = padding + slice.depth * (sliceHeight + rowSpacing);
      const yMidPoint = Math.ceil(y + sliceHeight * 2 / 3) + 1.5;
      ctx.fillText(subTitle, rectXCenter, yMidPoint);
    }

    // Draw a thicker border around the selected slice (or chevron).
    if (selSlice !== undefined) {
      const color = selSlice.color;
      const y = padding + selSlice.depth * (sliceHeight + rowSpacing);
      ctx.strokeStyle = `hsl(${color.h}, ${color.s}%, 30%)`;
      ctx.beginPath();
      const THICKNESS = 3;
      ctx.lineWidth = THICKNESS;
      ctx.strokeRect(
          selSlice.x, y - THICKNESS / 2, selSlice.w, sliceHeight + THICKNESS);
      ctx.closePath();
    }

    // If the cached trace slices don't fully cover the visible time range,
    // show a gray rectangle with a "Loading..." label.
    checkerboardExcept(
        ctx,
        this.getHeight(),
        timeScale.timeToPx(vizTime.start),
        timeScale.timeToPx(vizTime.end),
        timeScale.timeToPx(fromNs(this.slicesKey.startNs)),
        timeScale.timeToPx(fromNs(this.slicesKey.endNs)));

    // TODO(hjd): Remove this.
    // The only thing this does is drawing the sched latency arrow. We should
    // have some abstraction for that arrow (ideally the same we'd use for
    // flows).
    this.drawSchedLatencyArrow(ctx, selSlice);

    // If a slice is hovered, draw the tooltip.
    const tooltip = this.hoverTooltip;
    if (this.hoveredSlice !== undefined && tooltip.length > 0 &&
        this.hoverPos !== undefined) {
      if (tooltip.length === 1) {
        this.drawTrackHoverTooltip(ctx, this.hoverPos, tooltip[0]);
      } else {
        this.drawTrackHoverTooltip(ctx, this.hoverPos, tooltip[0], tooltip[1]);
      }
    }  // if (hoveredSlice)
  }

  onDestroy() {
    super.onDestroy();
    this.isDestroyed = true;
    this.engine.query(`DROP VIEW IF EXISTS ${this.tableName}`);
  }

  // This method figures out if the visible window is outside the bounds of
  // the cached data and if so issues new queries (i.e. sorta subsumes the
  // onBoundsChange).
  private async maybeRequestData(rawSlicesKey: CacheKey) {
    // Important: this method is async and is invoked on every frame. Care
    // must be taken to avoid piling up queries on every frame, hence the FSM.
    if (this.sqlState === 'UNINITIALIZED') {
      this.sqlState = 'INITIALIZING';

      if (this.isDestroyed) {
        return;
      }
      await this.initSqlTable(this.tableName);

      if (this.isDestroyed) {
        return;
      }
      const queryRes = await this.engine.query(`select
          ifnull(max(dur), 0) as maxDur, count(1) as rowCount
          from ${this.tableName}`);
      const row = queryRes.firstRow({maxDur: NUM, rowCount: NUM});
      this.maxDurNs = row.maxDur;
      this.sqlState = 'QUERY_DONE';
    } else if (
        this.sqlState === 'INITIALIZING' || this.sqlState === 'QUERY_PENDING') {
      return;
    }

    if (rawSlicesKey.isCoveredBy(this.slicesKey)) {
      return;  // We have the data already, no need to re-query
    }

    // Determine the cache key:
    const slicesKey = rawSlicesKey.normalize();
    if (!rawSlicesKey.isCoveredBy(slicesKey)) {
      throw new Error(`Normalization error ${slicesKey.toString()} ${
          rawSlicesKey.toString()}`);
    }

    const maybeCachedSlices = this.cache.lookup(slicesKey);
    if (maybeCachedSlices) {
      this.slicesKey = slicesKey;
      this.onUpdatedSlices(maybeCachedSlices);
      this.slices = maybeCachedSlices;
      return;
    }

    this.sqlState = 'QUERY_PENDING';
    const bucketNs = slicesKey.bucketNs;
    let queryTsq;
    let queryTsqEnd;
    // When we're zoomed into the level of single ns there is no point
    // doing quantization (indeed it causes bad artifacts) so instead
    // we use ts / ts+dur directly.
    if (bucketNs === 1) {
      queryTsq = 'ts';
      queryTsqEnd = 'ts + dur';
    } else {
      queryTsq = `(ts + ${bucketNs / 2}) / ${bucketNs} * ${bucketNs}`;
      queryTsqEnd = `(ts + dur + ${bucketNs / 2}) / ${bucketNs} * ${bucketNs}`;
    }

    const extraCols = this.extraSqlColumns.join(',');
    let depthCol = 'depth';
    let maybeGroupByDepth = 'depth, ';
    const layout = this.sliceLayout;
    const isFlat = (layout.maxDepth - layout.minDepth) <= 1;
    // maxDepth === minDepth only makes sense if track is empty which on the
    // one hand isn't very useful (and so maybe should be an error) on the
    // other hand I can see it happening if someone does:
    // minDepth = min(slices.depth); maxDepth = max(slices.depth);
    // and slices is empty, so we treat that as flat.
    if (isFlat) {
      depthCol = `${this.sliceLayout.minDepth} as depth`;
      maybeGroupByDepth = '';
    }

    // TODO(hjd): Re-reason and improve this query:
    // - Materialize the unfinished slices one off.
    // - Avoid the union if we know we don't have any -1 slices.
    // - Maybe we don't need the union at all and can deal in TS?
    if (this.isDestroyed) {
      this.sqlState = 'QUERY_DONE';
      return;
    }
    // TODO(hjd): Count and expose the number of slices summarized in
    // each bucket?
    const queryRes = await this.engine.query(`
    with q1 as (
      select
        ${queryTsq} as tsq,
        ${queryTsqEnd} as tsqEnd,
        ts,
        max(dur) as dur,
        id,
        ${depthCol}
        ${extraCols ? ',' + extraCols : ''}
      from ${this.tableName}
      where
        ts >= ${slicesKey.startNs - this.maxDurNs /* - durNs */} and
        ts <= ${slicesKey.endNs /* + durNs */}
      group by ${maybeGroupByDepth} tsq
      order by tsq),
    q2 as (
      select
        ${queryTsq} as tsq,
        ${queryTsqEnd} as tsqEnd,
        ts,
        -1 as dur,
        id,
        ${depthCol}
        ${extraCols ? ',' + extraCols : ''}
      from ${this.tableName}
      where dur = -1
      group by ${maybeGroupByDepth} tsq
      )
      select min(dur) as _unused, * from
      (select * from q1 union all select * from q2)
      group by ${maybeGroupByDepth} tsq
      order by tsq
    `);

    // Here convert each row to a Slice. We do what we can do
    // generically in the base class, and delegate the rest to the impl
    // via that rowToSlice() abstract call.
    const slices = new Array<CastInternal<T['slice']>>(queryRes.numRows());
    const it = queryRes.iter(this.getRowSpec());

    let maxDataDepth = this.maxDataDepth;
    this.slicesKey = slicesKey;
    for (let i = 0; it.valid(); it.next(), ++i) {
      maxDataDepth = Math.max(maxDataDepth, it.depth);
      // Construct the base slice. The Impl will construct and return
      // the full derived T["slice"] (e.g. CpuSlice) in the
      // rowToSlice() method.
      slices[i] = this.rowToSliceInternal(it);
    }
    this.maxDataDepth = maxDataDepth;
    this.onUpdatedSlices(slices);
    this.cache.insert(slicesKey, slices);
    this.slices = slices;

    this.sqlState = 'QUERY_DONE';
    globals.rafScheduler.scheduleRedraw();
  }

  private rowToSliceInternal(row: T['row']): CastInternal<T['slice']> {
    const slice = this.rowToSlice(row) as CastInternal<T['slice']>;
    slice.x = -1;
    slice.w = -1;
    return slice;
  }

  rowToSlice(row: T['row']): T['slice'] {
    const startNsQ = row.tsq;
    const endNsQ = row.tsqEnd;
    let flags = 0;
    if (row.dur === -1) {
      flags |= SLICE_FLAGS_INCOMPLETE;
    } else if (row.dur === 0) {
      flags |= SLICE_FLAGS_INSTANT;
    }

    return {
      id: row.id,
      startS: fromNs(startNsQ),
      durationS: fromNs(endNsQ - startNsQ),
      flags,
      depth: row.depth,
      title: '',
      subTitle: '',

      // The derived class doesn't need to initialize these. They are
      // rewritten on every renderCanvas() call. We just need to initialize
      // them to something.
      baseColor: DEFAULT_SLICE_COLOR,
      color: DEFAULT_SLICE_COLOR,
    };
  }

  private findSlice({x, y}: {x: number, y: number}): undefined|Slice {
    const trackHeight = this.computedTrackHeight;
    const sliceHeight = this.computedSliceHeight;
    const padding = this.sliceLayout.padding;
    const rowSpacing = this.computedRowSpacing;

    // Need at least a draw pass to resolve the slice layout.
    if (sliceHeight === 0) {
      return undefined;
    }

    if (y >= padding && y <= trackHeight - padding) {
      const depth = Math.floor((y - padding) / (sliceHeight + rowSpacing));
      for (const slice of this.slices) {
        if (slice.depth === depth && slice.x <= x && x <= slice.x + slice.w) {
          return slice;
        }
      }
    }

    return undefined;
  }

  onMouseMove(position: {x: number, y: number}): void {
    this.hoverPos = position;
    this.updateHoveredSlice(this.findSlice(position));
  }

  onMouseOut(): void {
    this.updateHoveredSlice(undefined);
  }

  private updateHoveredSlice(slice?: T['slice']): void {
    const lastHoveredSlice = this.hoveredSlice;
    this.hoveredSlice = slice;

    // Only notify the Impl if the hovered slice changes:
    if (slice === lastHoveredSlice) return;

    if (this.hoveredSlice === undefined) {
      globals.dispatch(Actions.setHighlightedSliceId({sliceId: -1}));
      this.onSliceOut({slice: assertExists(lastHoveredSlice)});
      this.hoverTooltip = [];
      this.hoverPos = undefined;
    } else {
      const args: OnSliceOverArgs<T['slice']> = {slice: this.hoveredSlice};
      globals.dispatch(
          Actions.setHighlightedSliceId({sliceId: this.hoveredSlice.id}));
      this.onSliceOver(args);
      this.hoverTooltip = args.tooltip || [];
    }
  }

  onMouseClick(position: {x: number, y: number}): boolean {
    const slice = this.findSlice(position);
    if (slice === undefined) {
      return false;
    }
    const args: OnSliceClickArgs<T['slice']> = {slice};
    this.onSliceClick(args);
    return true;
  }

  private getVisibleSlicesInternal(startS: number, endS: number):
      Array<CastInternal<T['slice']>> {
    return filterVisibleSlices<CastInternal<T['slice']>>(
        this.slices, startS, endS);
  }

  private updateSliceAndTrackHeight() {
    const lay = this.sliceLayout;

    const rows =
        Math.min(Math.max(this.maxDataDepth + 1, lay.minDepth), lay.maxDepth);

    // Compute the track height.
    let trackHeight;
    if (lay.heightMode === 'FIXED') {
      trackHeight = lay.fixedHeight;
    } else {
      trackHeight = 2 * lay.padding + rows * (lay.sliceHeight + lay.rowSpacing);
    }

    // Compute the slice height.
    let sliceHeight: number;
    let rowSpacing: number = lay.rowSpacing;
    if (lay.heightMode === 'FIXED') {
      const rowHeight = (trackHeight - 2 * lay.padding) / rows;
      sliceHeight = Math.floor(Math.max(rowHeight - lay.rowSpacing, 0.5));
      rowSpacing = Math.max(lay.rowSpacing, rowHeight - sliceHeight);
      rowSpacing = Math.floor(rowSpacing * 2) / 2;
    } else {
      sliceHeight = lay.sliceHeight;
    }
    this.computedSliceHeight = sliceHeight;
    this.computedTrackHeight = trackHeight;
    this.computedRowSpacing = rowSpacing;
  }

  private drawChevron(
      ctx: CanvasRenderingContext2D, x: number, y: number, h: number) {
    // Draw an upward facing chevrons, in order: A, B, C, D, and back to A.
    // . (x, y)
    //      A
    //     ###
    //    ##C##
    //   ##   ##
    //  D       B
    //            . (x + CHEVRON_WIDTH_PX, y + h)
    const HALF_CHEVRON_WIDTH_PX = CHEVRON_WIDTH_PX / 2;
    const midX = x + HALF_CHEVRON_WIDTH_PX;
    ctx.beginPath();
    ctx.moveTo(midX, y);                              // A.
    ctx.lineTo(x + CHEVRON_WIDTH_PX, y + h);          // B.
    ctx.lineTo(midX, y + h - HALF_CHEVRON_WIDTH_PX);  // C.
    ctx.lineTo(x, y + h);                             // D.
    ctx.lineTo(midX, y);                              // Back to A.
    ctx.closePath();
    ctx.fill();
  }

  // This is a good default implementation for highlighting slices. By default
  // onUpdatedSlices() calls this. However, if the XxxSliceTrack impl overrides
  // onUpdatedSlices() this gives them a chance to call the highlighting without
  // having to reimplement it.
  protected highlightHovererdAndSameTitle(slices: Slice[]) {
    for (const slice of slices) {
      const isHovering = globals.state.highlightedSliceId === slice.id ||
          (this.hoveredSlice && this.hoveredSlice.title === slice.title);
      if (isHovering) {
        slice.color = {
          c: slice.baseColor.c,
          h: slice.baseColor.h,
          s: slice.baseColor.s,
          l: 30,
        };
      } else {
        slice.color = slice.baseColor;
      }
    }
  }

  getHeight(): number {
    this.updateSliceAndTrackHeight();
    return this.computedTrackHeight;
  }

  getSliceRect(_tStart: number, _tEnd: number, _depth: number): SliceRect
      |undefined {
    // TODO(hjd): Implement this as part of updating flow events.
    return undefined;
  }
}

// This is the argument passed to onSliceOver(args).
// This is really a workaround for the fact that TypeScript doesn't allow
// inner types within a class (whether the class is templated or not).
export interface OnSliceOverArgs<S extends Slice> {
  // Input args (BaseSliceTrack -> Impl):
  slice: S;  // The slice being hovered.

  // Output args (Impl -> BaseSliceTrack):
  tooltip?: string[];  // One entry per row, up to a max of 2.
}

export interface OnSliceOutArgs<S extends Slice> {
  // Input args (BaseSliceTrack -> Impl):
  slice: S;  // The slice which is not hovered anymore.
}

export interface OnSliceClickArgs<S extends Slice> {
  // Input args (BaseSliceTrack -> Impl):
  slice: S;  // The slice which is clicked.
}
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {assertExists} from '../base/logging';
import {RECORDING_V2_FLAG} from '../common/feature_flags';
import {EXTENSION_URL} from '../common/recordingV2/recording_utils';
import {TraceUrlSource} from '../common/state';
import {saveTrace} from '../common/upload_utils';

import {globals} from './globals';
import {showModal} from './modal';
import {isShareable} from './trace_attrs';

// Never show more than one dialog per minute.
const MIN_REPORT_PERIOD_MS = 60000;
let timeLastReport = 0;

// Keeps the last ERR_QUEUE_MAX_LEN errors while the dialog is throttled.
const queuedErrors = new Array<string>();
const ERR_QUEUE_MAX_LEN = 10;

export function maybeShowErrorDialog(errLog: string) {
  globals.logging.logError(errLog);
  const now = performance.now();

  // Here we rely on the exception message from onCannotGrowMemory function
  if (errLog.includes('Cannot enlarge memory')) {
    showOutOfMemoryDialog();
    // Refresh timeLastReport to prevent a different error showing a dialog
    timeLastReport = now;
    return;
  }

  if (!RECORDING_V2_FLAG.get()) {
    if (errLog.includes('Unable to claim interface')) {
      showWebUSBError();
      timeLastReport = now;
      return;
    }

    if (errLog.includes('A transfer error has occurred') ||
        errLog.includes('The device was disconnected') ||
        errLog.includes('The transfer was cancelled')) {
      showConnectionLostError();
      timeLastReport = now;
      return;
    }
  }

  if (errLog.includes('(ERR:fmt)')) {
    showUnknownFileError();
    return;
  }

  if (errLog.includes('(ERR:rpc_seq)')) {
    showRpcSequencingError();
    return;
  }

  if (timeLastReport > 0 && now - timeLastReport <= MIN_REPORT_PERIOD_MS) {
    queuedErrors.unshift(errLog);
    if (queuedErrors.length > ERR_QUEUE_MAX_LEN) queuedErrors.pop();
    console.log('Suppressing crash dialog, last error notified too soon.');
    return;
  }
  timeLastReport = now;

  // Append queued errors.
  while (queuedErrors.length > 0) {
    const queuedErr = queuedErrors.shift();
    errLog += `\n\n---------------------------------------\n${queuedErr}`;
  }

  const errTitle = errLog.split('\n', 1)[0].substr(0, 80);
  const userDescription = '';
  let checked = false;
  const engine = globals.getCurrentEngine();

  const shareTraceSection: m.Vnode[] = [];
  if (isShareable() && !urlExists()) {
    shareTraceSection.push(
        m(`input[type=checkbox]`, {
          checked,
          oninput: (ev: InputEvent) => {
            checked = (ev.target as HTMLInputElement).checked;
            if (checked && engine && engine.source.type === 'FILE') {
              saveTrace(engine.source.file).then((url) => {
                const errMessage = createErrorMessage(errLog, checked, url);
                renderModal(
                    errTitle, errMessage, userDescription, shareTraceSection);
                return;
              });
            }
            const errMessage = createErrorMessage(errLog, checked);
            renderModal(
                errTitle, errMessage, userDescription, shareTraceSection);
          },
        }),
        m('span', `Check this box to share the current trace for debugging
     purposes.`),
        m('div.modal-small',
          `This will create a permalink to this trace, you may
     leave it unchecked and attach the trace manually
     to the bug if preferred.`));
  }
  renderModal(
      errTitle,
      createErrorMessage(errLog, checked),
      userDescription,
      shareTraceSection);
}

function renderModal(
    errTitle: string,
    errMessage: string,
    userDescription: string,
    shareTraceSection: m.Vnode[]) {
  showModal({
    title: 'Oops, something went wrong. Please file a bug.',
    content:
        m('div',
          m('.modal-logs', errMessage),
          m('span', `Please provide any additional details describing
           how the crash occurred:`),
          m('textarea.modal-textarea', {
            rows: 3,
            maxlength: 1000,
            oninput: (ev: InputEvent) => {
              userDescription = (ev.target as HTMLTextAreaElement).value;
            },
            onkeydown: (e: Event) => {
              e.stopPropagation();
            },
            onkeyup: (e: Event) => {
              e.stopPropagation();
            },
          }),
          shareTraceSection),
    buttons: [
      {
        text: 'File a bug (Googlers only)',
        primary: true,
        id: 'file_bug',
        action: () => {
          window.open(
              createLink(errTitle, errMessage, userDescription), '_blank');
        },
      },
    ],
  });
}

// If there is a trace URL to share, we don't have to show the upload checkbox.
function urlExists() {
  const engine = globals.getCurrentEngine();
  return engine !== undefined &&
      (engine.source.type === 'ARRAY_BUFFER' || engine.source.type === 'URL') &&
      engine.source.url !== undefined;
}

function createErrorMessage(errLog: string, checked: boolean, url?: string) {
  let errMessage = '';
  const engine = globals.getCurrentEngine();
  if (checked && url !== undefined) {
    errMessage += `Trace: ${url}`;
  } else if (urlExists()) {
    errMessage +=
        `Trace: ${(assertExists(engine).source as TraceUrlSource).url}`;
  } else {
    errMessage += 'To assist with debugging please attach or link to the ' +
        'trace you were viewing.';
  }
  return errMessage + '\n\n' +
      'Viewed on: ' + self.location.origin + '\n\n' + errLog;
}

function createLink(
    errTitle: string, errMessage: string, userDescription: string): string {
  let link = 'https://goto.google.com/perfetto-ui-bug';
  link += '?title=' + encodeURIComponent(`UI Error: ${errTitle}`);
  link += '&description=';
  if (userDescription !== '') {
    link +=
        encodeURIComponent('User description:\n' + userDescription + '\n\n');
  }
  link += encodeURIComponent(errMessage);
  // 8kb is common limit on request size so restrict links to that long:
  return link.substr(0, 8000);
}

function showOutOfMemoryDialog() {
  const url =
      'https://perfetto.dev/docs/quickstart/trace-analysis#get-trace-processor';

  const tpCmd = 'curl -LO https://get.perfetto.dev/trace_processor\n' +
      'chmod +x ./trace_processor\n' +
      'trace_processor --httpd /path/to/trace.pftrace\n' +
      '# Reload the UI, it will prompt to use the HTTP+RPC interface';
  showModal({
    title: 'Oops! Your WASM trace processor ran out of memory',
    content: m(
        'div',
        m('span',
          'The in-memory representation of the trace is too big ' +
              'for the browser memory limits (typically 2GB per tab).'),
        m('br'),
        m('span',
          'You can work around this problem by using the trace_processor ' +
              'native binary as an accelerator for the UI as follows:'),
        m('br'),
        m('br'),
        m('.modal-bash', tpCmd),
        m('br'),
        m('span', 'For details see '),
        m('a', {href: url, target: '_blank'}, url),
        ),
    buttons: [],
  });
}

function showUnknownFileError() {
  showModal({
    title: 'Cannot open this file',
    content: m(
        'div',
        m('p',
          'The file opened doesn\'t look like a Perfetto trace or any ' +
              'other format recognized by the Perfetto TraceProcessor.'),
        m('p', 'Formats supported:'),
        m(
            'ul',
            m('li', 'Perfetto protobuf trace'),
            m('li', 'chrome://tracing JSON'),
            m('li', 'Android systrace'),
            m('li', 'Fuchsia trace'),
            m('li', 'Ninja build log'),
            ),
        ),
    buttons: [],
  });
}

function showWebUSBError() {
  showModal({
    title: 'A WebUSB error occurred',
    content: m(
        'div',
        m('span', `Is adb already running on the host? Run this command and
      try again.`),
        m('br'),
        m('.modal-bash', '> adb kill-server'),
        m('br'),
        m('span', 'For details see '),
        m('a', {href: 'http://b/159048331', target: '_blank'}, 'b/159048331'),
        ),
    buttons: [],
  });
}

export function showWebUSBErrorV2() {
  showModal({
    title: 'A WebUSB error occurred',
    content: m(
        'div',
        m('span', `Is adb already running on the host? Run this command and
      try again.`),
        m('br'),
        m('.modal-bash', '> adb kill-server'),
        m('br'),
        // The statement below covers the following edge case:
        // 1. 'adb server' is running on the device.
        // 2. The user selects the new Android target, so we try to fetch the
        // OS version and do QSS.
        // 3. The error modal is shown.
        // 4. The user runs 'adb kill-server'.
        // At this point we don't have a trigger to try fetching the OS version
        // + QSS again. Therefore, the user will need to refresh the page.
        m('span',
          'If after running \'adb kill-server\', you don\'t see ' +
              'a \'Start Recording\' button on the page and you don\'t see ' +
              '\'Allow USB debugging\' on the device, ' +
              'you will need to reload this page.'),
        m('br'),
        m('br'),
        m('span', 'For details see '),
        m('a', {href: 'http://b/159048331', target: '_blank'}, 'b/159048331'),
        ),
    buttons: [],
  });
}

export function showConnectionLostError(): void {
  showModal({
    title: 'Connection with the ADB device lost',
    content: m(
        'div',
        m('span', `Please connect the device again to restart the recording.`),
        m('br')),
    buttons: [],
  });
}

export function showAllowUSBDebugging(): void {
  showModal({
    title: 'Could not connect to the device',
    content: m(
        'div', m('span', 'Please allow USB debugging on the device.'), m('br')),
    buttons: [],
  });
}

export function showNoDeviceSelected(): void {
  showModal({
    title: 'No device was selected for recording',
    content:
        m('div',
          m('span', `If you want to connect to an ADB device,
           please select it from the list.`),
          m('br')),
    buttons: [],
  });
}

export function showExtensionNotInstalled(): void {
  showModal({
    title: 'Perfetto Chrome extension not installed',
    content:
        m('div',
          m('.note',
            `To trace Chrome from the Perfetto UI, you need to install our `,
            m('a', {href: EXTENSION_URL, target: '_blank'}, 'Chrome extension'),
            ' and then reload this page.'),
          m('br')),
    buttons: [],
  });
}

export function showWebsocketConnectionIssue(message: string): void {
  showModal({
    title: 'Unable to connect to the device via websocket',
    content: m('div', m('span', message), m('br')),
    buttons: [],
  });
}

export function showIssueParsingTheTracedResponse(message: string): void {
  showModal({
    title: 'A problem was encountered while connecting to' +
        ' the Perfetto tracing service',
    content: m('div', m('span', message), m('br')),
    buttons: [],
  });
}

export function showFailedToPushBinary(message: string): void {
  showModal({
    title: 'Failed to push a binary to the device',
    content:
        m('div',
          m('span',
            'This can happen if your Android device has an OS version lower ' +
                'than Q. Perfetto tried to push the latest version of its ' +
                'embedded binary but failed.'),
          m('br'),
          m('br'),
          m('span', 'Error message:'),
          m('br'),
          m('span', message)),
    buttons: [],
  });
}

function showRpcSequencingError() {
  showModal({
    title: 'A TraceProcessor RPC error occurred',
    content: m(
        'div',
        m('p', 'The trace processor RPC sequence ID was broken'),
        m('p', `This can happen when using a HTTP trace processor instance and
either accidentally sharing this between multiple tabs or
restarting the trace processor while still in use by UI.`),
        m('p', `Please refresh this tab and ensure that trace processor is used
at most one tab at a time.`),
        ),
    buttons: [],
  });
}
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Color} from '../common/colorizer';

export interface Slice {
  // These properties are updated only once per query result when the Slice
  // object is created and don't change afterwards.
  readonly id: number;
  readonly startS: number;
  readonly durationS: number;
  readonly depth: number;
  readonly flags: number;

  // These can be changed by the Impl.
  title: string;
  subTitle: string;
  baseColor: Color;
  color: Color;
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {channelChanged, getNextChannel, setChannel} from '../common/channels';
import {featureFlags, Flag, OverrideState} from '../common/feature_flags';

import {globals} from './globals';
import {createPage} from './pages';

const RELEASE_PROCESS_URL =
    'https://perfetto.dev/docs/visualization/perfetto-ui-release-process';

interface FlagOption {
  id: string;
  name: string;
}

interface SelectWidgetAttrs {
  label: string;
  description: m.Children;
  options: FlagOption[];
  selected: string;
  onSelect: (id: string) => void;
}

class SelectWidget implements m.ClassComponent<SelectWidgetAttrs> {
  view(vnode: m.Vnode<SelectWidgetAttrs>) {
    const attrs = vnode.attrs;
    return m(
        '.flag-widget',
        m('label', attrs.label),
        m(
            'select',
            {
              onchange: (e: InputEvent) => {
                const value = (e.target as HTMLSelectElement).value;
                attrs.onSelect(value);
                globals.rafScheduler.scheduleFullRedraw();
              },
            },
            attrs.options.map((o) => {
              const selected = o.id === attrs.selected;
              return m('option', {value: o.id, selected}, o.name);
            }),
            ),
        m('.description', attrs.description),
    );
  }
}

interface FlagWidgetAttrs {
  flag: Flag;
}

class FlagWidget implements m.ClassComponent<FlagWidgetAttrs> {
  view(vnode: m.Vnode<FlagWidgetAttrs>) {
    const flag = vnode.attrs.flag;
    const defaultState = flag.defaultValue ? 'Enabled' : 'Disabled';
    return m(SelectWidget, {
      label: flag.name,
      description: flag.description,
      options: [
        {id: OverrideState.DEFAULT, name: `Default (${defaultState})`},
        {id: OverrideState.TRUE, name: 'Enabled'},
        {id: OverrideState.FALSE, name: 'Disabled'},
      ],
      selected: flag.overriddenState(),
      onSelect: (value: string) => {
        switch (value) {
          case OverrideState.TRUE:
            flag.set(true);
            break;
          case OverrideState.FALSE:
            flag.set(false);
            break;
          default:
          case OverrideState.DEFAULT:
            flag.reset();
            break;
        }
      },
    });
  }
}

export const FlagsPage = createPage({
  view() {
    const needsReload = channelChanged();
    return m(
        '.flags-page',
        m(
            '.flags-content',
            m('h1', 'Feature flags'),
            needsReload &&
                [
                  m('h2', 'Please reload for your changes to take effect'),
                ],
            m(SelectWidget, {
              label: 'Release channel',
              description: [
                'Which release channel of the UI to use. See ',
                m('a',
                  {
                    href: RELEASE_PROCESS_URL,
                  },
                  'Release Process'),
                ' for more information.',
              ],
              options: [
                {id: 'stable', name: 'Stable (default)'},
                {id: 'canary', name: 'Canary'},
                {id: 'autopush', name: 'Autopush'},
              ],
              selected: getNextChannel(),
              onSelect: (id) => setChannel(id),
            }),
            m('button',
              {
                onclick: () => {
                  featureFlags.resetAll();
                  globals.rafScheduler.scheduleFullRedraw();
                },
              },
              'Reset all below'),

            featureFlags.allFlags().map((flag) => m(FlagWidget, {flag})),
            ));
  },
});
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {fromNs, timeToCode} from '../common/time';

import {globals} from './globals';
import {Panel} from './panel';

interface CounterDetailsPanelAttrs {}

export class CounterDetailsPanel extends Panel<CounterDetailsPanelAttrs> {
  view() {
    const counterInfo = globals.counterDetails;
    if (counterInfo && counterInfo.startTime &&
        counterInfo.name !== undefined && counterInfo.value !== undefined &&
        counterInfo.delta !== undefined && counterInfo.duration !== undefined) {
      return m(
          '.details-panel',
          m('.details-panel-heading', m('h2', `Counter Details`)),
          m(
              '.details-table',
              [m('table',
                 [
                   m('tr', m('th', `Name`), m('td', `${counterInfo.name}`)),
                   m('tr',
                     m('th', `Start time`),
                     m('td', `${timeToCode(counterInfo.startTime)}`)),
                   m('tr',
                     m('th', `Value`),
                     m('td', `${counterInfo.value.toLocaleString()}`)),
                   m('tr',
                     m('th', `Delta`),
                     m('td', `${counterInfo.delta.toLocaleString()}`)),
                   m('tr',
                     m('th', `Duration`),
                     m('td', `${timeToCode(fromNs(counterInfo.duration))}`)),
                 ])],
              ));
    } else {
      return m(
          '.details-panel',
          m('.details-panel-heading', m('h2', `Counter Details`)));
    }
  }

  renderCanvas() {}
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {ColumnType} from 'src/common/query_result';
import {fromNs, toNs} from '../common/time';
import {globals} from './globals';

// Type-safe aliases for various flavours of ints Trace Processor exposes
// (e.g. timestamp or ids into a given SQL table) and functions to work with
// them.
//
// These rely on TypeScript's type branding: extending a number with additional
// compile-time-only type information, which prevents "implicit" conversions
// between different ids.

// Timestamp (in nanoseconds) in the same time domain as Trace Processor is
// exposing.
export type TPTimestamp = bigint&{
  __type: 'TPTimestamp'
}

// Create a timestamp from a bigint in nanos.
// Use this when we know the type is a bigint.
export function timestampFromNanos(nanos: bigint) {
  return nanos as TPTimestamp;
}

// Create a timestamp from an arbitrary SQL value.
// Throws if the value cannot be reasonably converted to a timestamp.
// Assumes the input will be in units of nanoseconds.
export function timestampFromSqlNanos(nanos: ColumnType): TPTimestamp {
  if (typeof nanos === 'bigint') {
    return nanos as TPTimestamp;
  } else if (typeof nanos === 'number') {
    // Note - this will throw if the number is something which cannot be
    // represented by an integer - i.e. decimals, infinity, or NaN.
    return BigInt(nanos) as TPTimestamp;
  } else {
    throw Error('Refusing to create TPTimestamp from unrelated type');
  }
}

// TODO: unify this with common/time.ts.
// TODO(stevegolton): Return a bigint, or a new TPDuration object rather than
// convert to number which could lose precision.
export function toTraceTime(ts: TPTimestamp): number {
  const traceStartNs = toNs(globals.state.traceTime.startSec);
  return fromNs(Number(ts - BigInt(traceStartNs)));
}

// Unique id for a process, id into |process| table.
export type Upid = number&{
  __type: 'Upid'
}

export function asUpid(v: number): Upid;
export function asUpid(v?: number): Upid|undefined;
export function asUpid(v?: number): Upid|undefined {
  return v as (Upid | undefined);
}

// Unique id for a thread, id into |thread| table.
export type Utid = number&{
  __type: 'Utid'
}

export function asUtid(v: number): Utid;
export function asUtid(v?: number): Utid|undefined;
export function asUtid(v?: number): Utid|undefined {
  return v as (Utid | undefined);
}

// Id into |sched| SQL table.
export type SchedSqlId = number&{
  __type: 'SchedSqlId'
}

// Id into |thread_state| SQL table.
export type ThreadStateSqlId = number&{
  __type: 'ThreadStateSqlId'
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import m from 'mithril';

import {Actions} from '../common/actions';
import {featureFlags} from '../common/feature_flags';
import {
  AdbRecordingTarget,
  getDefaultRecordingTargets,
  hasActiveProbes,
  isAdbTarget,
  isAndroidP,
  isAndroidTarget,
  isChromeTarget,
  isCrOSTarget,
  isLinuxTarget,
  LoadedConfig,
  MAX_TIME,
  RecordingTarget,
} from '../common/state';
import {AdbOverWebUsb} from '../controller/adb';
import {
  createEmptyRecordConfig,
  RecordConfig,
} from '../controller/record_config_types';

import {globals} from './globals';
import {createPage, PageAttrs} from './pages';
import {
  autosaveConfigStore,
  recordConfigStore,
  recordTargetStore,
} from './record_config';
import {
  CodeSnippet,
} from './record_widgets';
import {AdvancedSettings} from './recording/advanced_settings';
import {AndroidSettings} from './recording/android_settings';
import {ChromeSettings} from './recording/chrome_settings';
import {CpuSettings} from './recording/cpu_settings';
import {GpuSettings} from './recording/gpu_settings';
import {MemorySettings} from './recording/memory_settings';
import {PowerSettings} from './recording/power_settings';
import {RecordingSectionAttrs} from './recording/recording_sections';
import {RecordingSettings} from './recording/recording_settings';

export const PERSIST_CONFIG_FLAG = featureFlags.register({
  id: 'persistConfigsUI',
  name: 'Config persistence UI',
  description: 'Show experimental config persistence UI on the record page.',
  defaultValue: true,
});

export const RECORDING_SECTIONS = [
  'buffers',
  'instructions',
  'config',
  'cpu',
  'gpu',
  'power',
  'memory',
  'android',
  'chrome',
  'advanced',
];

function RecordHeader() {
  return m(
      '.record-header',
      m('.top-part',
        m('.target-and-status',
          RecordingPlatformSelection(),
          RecordingStatusLabel(),
          ErrorLabel()),
        recordingButtons()),
      RecordingNotes());
}

function RecordingPlatformSelection() {
  if (globals.state.recordingInProgress) return [];

  const availableAndroidDevices = globals.state.availableAdbDevices;
  const recordingTarget = globals.state.recordingTarget;

  const targets = [];
  for (const {os, name} of getDefaultRecordingTargets()) {
    targets.push(m('option', {value: os}, name));
  }
  for (const d of availableAndroidDevices) {
    targets.push(m('option', {value: d.serial}, d.name));
  }

  const selectedIndex = isAdbTarget(recordingTarget) ?
      targets.findIndex((node) => node.attrs.value === recordingTarget.serial) :
      targets.findIndex((node) => node.attrs.value === recordingTarget.os);

  return m(
      '.target',
      m(
          'label',
          'Target platform:',
          m('select',
            {
              selectedIndex,
              onchange: (e: Event) => {
                onTargetChange((e.target as HTMLSelectElement).value);
              },
              onupdate: (select) => {
                // Work around mithril bug
                // (https://github.com/MithrilJS/mithril.js/issues/2107): We may
                // update the select's options while also changing the
                // selectedIndex at the same time. The update of selectedIndex
                // may be applied before the new options are added to the select
                // element. Because the new selectedIndex may be outside of the
                // select's options at that time, we have to reselect the
                // correct index here after any new children were added.
                (select.dom as HTMLSelectElement).selectedIndex = selectedIndex;
              },
            },
            ...targets),
          ),
      m('.chip',
        {onclick: addAndroidDevice},
        m('button', 'Add ADB Device'),
        m('i.material-icons', 'add')));
}

// |target| can be the TargetOs or the android serial.
function onTargetChange(target: string) {
  const recordingTarget: RecordingTarget =
      globals.state.availableAdbDevices.find((d) => d.serial === target) ||
      getDefaultRecordingTargets().find((t) => t.os === target) ||
      getDefaultRecordingTargets()[0];

  if (isChromeTarget(recordingTarget)) {
    globals.dispatch(Actions.setFetchChromeCategories({fetch: true}));
  }

  globals.dispatch(Actions.setRecordingTarget({target: recordingTarget}));
  recordTargetStore.save(target);
  globals.rafScheduler.scheduleFullRedraw();
}

function Instructions(cssClass: string) {
  return m(
      `.record-section.instructions${cssClass}`,
      m('header', 'Recording command'),
      PERSIST_CONFIG_FLAG.get() ?
          m('button.permalinkconfig',
            {
              onclick: () => {
                globals.dispatch(
                    Actions.createPermalink({isRecordingConfig: true}));
              },
            },
            'Share recording settings') :
          null,
      RecordingSnippet(),
      BufferUsageProgressBar(),
      m('.buttons', StopCancelButtons()),
      recordingLog());
}

export function loadedConfigEqual(
    cfg1: LoadedConfig, cfg2: LoadedConfig): boolean {
  return cfg1.type === 'NAMED' && cfg2.type === 'NAMED' ?
      cfg1.name === cfg2.name :
      cfg1.type === cfg2.type;
}

export function loadConfigButton(
    config: RecordConfig, configType: LoadedConfig): m.Vnode {
  return m(
      'button',
      {
        class: 'config-button',
        title: 'Apply configuration settings',
        disabled: loadedConfigEqual(configType, globals.state.lastLoadedConfig),
        onclick: () => {
          globals.dispatch(Actions.setRecordConfig({config, configType}));
          globals.rafScheduler.scheduleFullRedraw();
        },
      },
      m('i.material-icons', 'file_upload'));
}

export function displayRecordConfigs() {
  const configs = [];
  if (autosaveConfigStore.hasSavedConfig) {
    configs.push(m('.config', [
      m('span.title-config', m('strong', 'Latest started recording')),
      loadConfigButton(autosaveConfigStore.get(), {type: 'AUTOMATIC'}),
    ]));
  }
  for (const validated of recordConfigStore.recordConfigs) {
    const item = validated.result;
    configs.push(m('.config', [
      m('span.title-config', item.title),
      loadConfigButton(item.config, {type: 'NAMED', name: item.title}),
      m('button',
        {
          class: 'config-button',
          title: 'Overwrite configuration with current settings',
          onclick: () => {
            if (confirm(`Overwrite config "${
                    item.title}" with current settings?`)) {
              recordConfigStore.overwrite(globals.state.recordConfig, item.key);
              globals.dispatch(Actions.setRecordConfig({
                config: item.config,
                configType: {type: 'NAMED', name: item.title},
              }));
              globals.rafScheduler.scheduleFullRedraw();
            }
          },
        },
        m('i.material-icons', 'save')),
      m('button',
        {
          class: 'config-button',
          title: 'Remove configuration',
          onclick: () => {
            recordConfigStore.delete(item.key);
            globals.rafScheduler.scheduleFullRedraw();
          },
        },
        m('i.material-icons', 'delete')),
    ]));

    const errorItems = [];
    for (const extraKey of validated.extraKeys) {
      errorItems.push(m('li', `${extraKey} is unrecognised`));
    }
    for (const invalidKey of validated.invalidKeys) {
      errorItems.push(m('li', `${invalidKey} contained an invalid value`));
    }

    if (errorItems.length > 0) {
      configs.push(
          m('.parsing-errors',
            'One or more errors have been found while loading configuration "' +
                item.title + '". Loading is possible, but make sure to check ' +
                'the settings afterwards.',
            m('ul', errorItems)));
    }
  }
  return configs;
}

export const ConfigTitleState = {
  title: '',
  getTitle: () => {
    return ConfigTitleState.title;
  },
  setTitle: (value: string) => {
    ConfigTitleState.title = value;
  },
  clearTitle: () => {
    ConfigTitleState.title = '';
  },
};

export function Configurations(cssClass: string) {
  const canSave = recordConfigStore.canSave(ConfigTitleState.getTitle());
  return m(
      `.record-section${cssClass}`,
      m('header', 'Save and load configurations'),
      m('.input-config',
        [
          m('input', {
            value: ConfigTitleState.title,
            placeholder: 'Title for config',
            oninput() {
              ConfigTitleState.setTitle(this.value);
              globals.rafScheduler.scheduleFullRedraw();
            },
          }),
          m('button',
            {
              class: 'config-button',
              disabled: !canSave,
              title: canSave ? 'Save current config' :
                               'Duplicate name, saving disabled',
              onclick: () => {
                recordConfigStore.save(
                    globals.state.recordConfig, ConfigTitleState.getTitle());
                globals.rafScheduler.scheduleFullRedraw();
                ConfigTitleState.clearTitle();
              },
            },
            m('i.material-icons', 'save')),
          m('button',
            {
              class: 'config-button',
              title: 'Clear current configuration',
              onclick: () => {
                if (confirm(
                        'Current configuration will be cleared. ' +
                        'Are you sure?')) {
                  globals.dispatch(Actions.setRecordConfig({
                    config: createEmptyRecordConfig(),
                    configType: {type: 'NONE'},
                  }));
                  globals.rafScheduler.scheduleFullRedraw();
                }
              },
            },
            m('i.material-icons', 'delete_forever')),
        ]),
      displayRecordConfigs());
}

function BufferUsageProgressBar() {
  if (!globals.state.recordingInProgress) return [];

  const bufferUsage = globals.bufferUsage ? globals.bufferUsage : 0.0;
  // Buffer usage is not available yet on Android.
  if (bufferUsage === 0) return [];

  return m(
      'label',
      'Buffer usage: ',
      m('progress', {max: 100, value: bufferUsage * 100}));
}

function RecordingNotes() {
  const sideloadUrl =
      'https://perfetto.dev/docs/contributing/build-instructions#get-the-code';
  const linuxUrl = 'https://perfetto.dev/docs/quickstart/linux-tracing';
  const cmdlineUrl =
      'https://perfetto.dev/docs/quickstart/android-tracing#perfetto-cmdline';
  const extensionURL = `https://chrome.google.com/webstore/detail/
      perfetto-ui/lfmkphfpdbjijhpomgecfikhfohaoine`;

  const notes: m.Children = [];

  const msgFeatNotSupported =
      m('span', `Some probes are only supported in Perfetto versions running
      on Android Q+. `);

  const msgPerfettoNotSupported =
      m('span', `Perfetto is not supported natively before Android P. `);

  const msgSideload =
      m('span',
        `If you have a rooted device you can `,
        m('a',
          {href: sideloadUrl, target: '_blank'},
          `sideload the latest version of
         Perfetto.`));

  const msgRecordingNotSupported =
      m('.note',
        `Recording Perfetto traces from the UI is not supported natively
     before Android Q. If you are using a P device, please select 'Android P'
     as the 'Target Platform' and `,
        m('a',
          {href: cmdlineUrl, target: '_blank'},
          `collect the trace using ADB.`));

  const msgChrome =
      m('.note',
        `To trace Chrome from the Perfetto UI, you need to install our `,
        m('a', {href: extensionURL, target: '_blank'}, 'Chrome extension'),
        ' and then reload this page.');

  const msgLinux =
      m('.note',
        `Use this `,
        m('a', {href: linuxUrl, target: '_blank'}, `quickstart guide`),
        ` to get started with tracing on Linux.`);

  const msgLongTraces = m(
      '.note',
      `Recording in long trace mode through the UI is not supported. Please copy
    the command and `,
      m('a',
        {href: cmdlineUrl, target: '_blank'},
        `collect the trace using ADB.`));

  const msgZeroProbes =
      m('.note',
        'It looks like you didn\'t add any probes. ' +
            'Please add at least one to get a non-empty trace.');

  if (!hasActiveProbes(globals.state.recordConfig)) {
    notes.push(msgZeroProbes);
  }

  if (isAdbTarget(globals.state.recordingTarget)) {
    notes.push(msgRecordingNotSupported);
  }
  switch (globals.state.recordingTarget.os) {
    case 'Q':
      break;
    case 'P':
      notes.push(m('.note', msgFeatNotSupported, msgSideload));
      break;
    case 'O':
      notes.push(m('.note', msgPerfettoNotSupported, msgSideload));
      break;
    case 'L':
      notes.push(msgLinux);
      break;
    case 'C':
      if (!globals.state.extensionInstalled) notes.push(msgChrome);
      break;
    case 'CrOS':
      if (!globals.state.extensionInstalled) notes.push(msgChrome);
      break;
    default:
  }
  if (globals.state.recordConfig.mode === 'LONG_TRACE') {
    notes.unshift(msgLongTraces);
  }

  return notes.length > 0 ? m('div', notes) : [];
}

function RecordingSnippet() {
  const target = globals.state.recordingTarget;

  // We don't need commands to start tracing on chrome
  if (isChromeTarget(target)) {
    return globals.state.extensionInstalled &&
            !globals.state.recordingInProgress ?
        m('div',
          m('label',
            `To trace Chrome from the Perfetto UI you just have to press
         'Start Recording'.`)) :
        [];
  }
  return m(CodeSnippet, {text: getRecordCommand(target)});
}

function getRecordCommand(target: RecordingTarget) {
  const data = globals.trackDataStore.get('config') as
          {commandline: string, pbtxt: string, pbBase64: string} |
      null;

  const cfg = globals.state.recordConfig;
  let time = cfg.durationMs / 1000;

  if (time > MAX_TIME) {
    time = MAX_TIME;
  }

  const pbBase64 = data ? data.pbBase64 : '';
  const pbtx = data ? data.pbtxt : '';
  let cmd = '';
  if (isAndroidP(target)) {
    cmd += `echo '${pbBase64}' | \n`;
    cmd += 'base64 --decode | \n';
    cmd += 'adb shell "perfetto -c - -o /data/misc/perfetto-traces/trace"\n';
  } else {
    cmd +=
        isAndroidTarget(target) ? 'adb shell perfetto \\\n' : 'perfetto \\\n';
    cmd += '  -c - --txt \\\n';
    cmd += '  -o /data/misc/perfetto-traces/trace \\\n';
    cmd += '<<EOF\n\n';
    cmd += pbtx;
    cmd += '\nEOF\n';
  }
  return cmd;
}

function recordingButtons() {
  const state = globals.state;
  const target = state.recordingTarget;
  const recInProgress = state.recordingInProgress;

  const start =
      m(`button`,
        {
          class: recInProgress ? '' : 'selected',
          onclick: onStartRecordingPressed,
        },
        'Start Recording');

  const buttons: m.Children = [];

  if (isAndroidTarget(target)) {
    if (!recInProgress && isAdbTarget(target) &&
        globals.state.recordConfig.mode !== 'LONG_TRACE') {
      buttons.push(start);
    }
  } else if (isChromeTarget(target) && state.extensionInstalled) {
    buttons.push(start);
  }
  return m('.button', buttons);
}

function StopCancelButtons() {
  if (!globals.state.recordingInProgress) return [];

  const stop =
      m(`button.selected`,
        {onclick: () => globals.dispatch(Actions.stopRecording({}))},
        'Stop');

  const cancel =
      m(`button`,
        {onclick: () => globals.dispatch(Actions.cancelRecording({}))},
        'Cancel');

  return [stop, cancel];
}

function onStartRecordingPressed() {
  location.href = '#!/record/instructions';
  globals.rafScheduler.scheduleFullRedraw();
  autosaveConfigStore.save(globals.state.recordConfig);

  const target = globals.state.recordingTarget;
  if (isAndroidTarget(target) || isChromeTarget(target)) {
    globals.logging.logEvent('Record Trace', `Record trace (${target.os})`);
    globals.dispatch(Actions.startRecording({}));
  }
}

function RecordingStatusLabel() {
  const recordingStatus = globals.state.recordingStatus;
  if (!recordingStatus) return [];
  return m('label', recordingStatus);
}

export function ErrorLabel() {
  const lastRecordingError = globals.state.lastRecordingError;
  if (!lastRecordingError) return [];
  return m('label.error-label', `Error:  ${lastRecordingError}`);
}

function recordingLog() {
  const logs = globals.recordingLog;
  if (logs === undefined) return [];
  return m('.code-snippet.no-top-bar', m('code', logs));
}

// The connection must be done in the frontend. After it, the serial ID will
// be inserted in the state, and the worker will be able to connect to the
// correct device.
async function addAndroidDevice() {
  let device: USBDevice;
  try {
    device = await new AdbOverWebUsb().findDevice();
  } catch (e) {
    const err = `No device found: ${e.name}: ${e.message}`;
    console.error(err, e);
    alert(err);
    return;
  }

  if (!device.serialNumber) {
    console.error('serial number undefined');
    return;
  }

  // After the user has selected a device with the chrome UI, it will be
  // available when listing all the available device from WebUSB. Therefore,
  // we update the list of available devices.
  await updateAvailableAdbDevices(device.serialNumber);
}

export async function updateAvailableAdbDevices(
    preferredDeviceSerial?: string) {
  const devices = await new AdbOverWebUsb().getPairedDevices();

  let recordingTarget: AdbRecordingTarget|undefined = undefined;

  const availableAdbDevices: AdbRecordingTarget[] = [];
  devices.forEach((d) => {
    if (d.productName && d.serialNumber) {
      // TODO(nicomazz): At this stage, we can't know the OS version, so we
      // assume it is 'Q'. This can create problems with devices with an old
      // version of perfetto. The os detection should be done after the adb
      // connection, from adb_record_controller
      availableAdbDevices.push(
          {name: d.productName, serial: d.serialNumber, os: 'Q'});
      if (preferredDeviceSerial && preferredDeviceSerial === d.serialNumber) {
        recordingTarget = availableAdbDevices[availableAdbDevices.length - 1];
      }
    }
  });

  globals.dispatch(
      Actions.setAvailableAdbDevices({devices: availableAdbDevices}));
  selectAndroidDeviceIfAvailable(availableAdbDevices, recordingTarget);
  globals.rafScheduler.scheduleFullRedraw();
  return availableAdbDevices;
}

function selectAndroidDeviceIfAvailable(
    availableAdbDevices: AdbRecordingTarget[],
    recordingTarget?: RecordingTarget) {
  if (!recordingTarget) {
    recordingTarget = globals.state.recordingTarget;
  }
  const deviceConnected = isAdbTarget(recordingTarget);
  const connectedDeviceDisconnected = deviceConnected &&
      availableAdbDevices.find(
          (e) => e.serial ===
              (recordingTarget as AdbRecordingTarget).serial) === undefined;

  if (availableAdbDevices.length) {
    // If there's an Android device available and the current selection isn't
    // one, select the Android device by default. If the current device isn't
    // available anymore, but another Android device is, select the other
    // Android device instead.
    if (!deviceConnected || connectedDeviceDisconnected) {
      recordingTarget = availableAdbDevices[0];
    }

    globals.dispatch(Actions.setRecordingTarget({target: recordingTarget}));
    return;
  }

  // If the currently selected device was disconnected, reset the recording
  // target to the default one.
  if (connectedDeviceDisconnected) {
    globals.dispatch(
        Actions.setRecordingTarget({target: getDefaultRecordingTargets()[0]}));
  }
}

function recordMenu(routePage: string) {
  const target = globals.state.recordingTarget;
  const chromeProbe =
      m('a[href="#!/record/chrome"]',
        m(`li${routePage === 'chrome' ? '.active' : ''}`,
          m('i.material-icons', 'laptop_chromebook'),
          m('.title', 'Chrome'),
          m('.sub', 'Chrome traces')));
  const cpuProbe =
      m('a[href="#!/record/cpu"]',
        m(`li${routePage === 'cpu' ? '.active' : ''}`,
          m('i.material-icons', 'subtitles'),
          m('.title', 'CPU'),
          m('.sub', 'CPU usage, scheduling, wakeups')));
  const gpuProbe =
      m('a[href="#!/record/gpu"]',
        m(`li${routePage === 'gpu' ? '.active' : ''}`,
          m('i.material-icons', 'aspect_ratio'),
          m('.title', 'GPU'),
          m('.sub', 'GPU frequency, memory')));
  const powerProbe =
      m('a[href="#!/record/power"]',
        m(`li${routePage === 'power' ? '.active' : ''}`,
          m('i.material-icons', 'battery_charging_full'),
          m('.title', 'Power'),
          m('.sub', 'Battery and other energy counters')));
  const memoryProbe =
      m('a[href="#!/record/memory"]',
        m(`li${routePage === 'memory' ? '.active' : ''}`,
          m('i.material-icons', 'memory'),
          m('.title', 'Memory'),
          m('.sub', 'Physical mem, VM, LMK')));
  const androidProbe =
      m('a[href="#!/record/android"]',
        m(`li${routePage === 'android' ? '.active' : ''}`,
          m('i.material-icons', 'android'),
          m('.title', 'Android apps & svcs'),
          m('.sub', 'atrace and logcat')));
  const advancedProbe =
      m('a[href="#!/record/advanced"]',
        m(`li${routePage === 'advanced' ? '.active' : ''}`,
          m('i.material-icons', 'settings'),
          m('.title', 'Advanced settings'),
          m('.sub', 'Complicated stuff for wizards')));
  const recInProgress = globals.state.recordingInProgress;

  const probes = [];
  if (isCrOSTarget(target) || isLinuxTarget(target)) {
    probes.push(cpuProbe, powerProbe, memoryProbe, chromeProbe, advancedProbe);
  } else if (isChromeTarget(target)) {
    probes.push(chromeProbe);
  } else {
    probes.push(
        cpuProbe,
        gpuProbe,
        powerProbe,
        memoryProbe,
        androidProbe,
        chromeProbe,
        advancedProbe);
  }

  return m(
      '.record-menu',
      {
        class: recInProgress ? 'disabled' : '',
        onclick: () => globals.rafScheduler.scheduleFullRedraw(),
      },
      m('header', 'Trace config'),
      m('ul',
        m('a[href="#!/record/buffers"]',
          m(`li${routePage === 'buffers' ? '.active' : ''}`,
            m('i.material-icons', 'tune'),
            m('.title', 'Recording settings'),
            m('.sub', 'Buffer mode, size and duration'))),
        m('a[href="#!/record/instructions"]',
          m(`li${routePage === 'instructions' ? '.active' : ''}`,
            m('i.material-icons-filled.rec', 'fiber_manual_record'),
            m('.title', 'Recording command'),
            m('.sub', 'Manually record trace'))),
        PERSIST_CONFIG_FLAG.get() ?
            m('a[href="#!/record/config"]',
              {
                onclick: () => {
                  recordConfigStore.reloadFromLocalStorage();
                },
              },
              m(`li${routePage === 'config' ? '.active' : ''}`,
                m('i.material-icons', 'save'),
                m('.title', 'Saved configs'),
                m('.sub', 'Manage local configs'))) :
            null),
      m('header', 'Probes'),
      m('ul', probes));
}

export function maybeGetActiveCss(routePage: string, section: string): string {
  return routePage === section ? '.active' : '';
}

export const RecordPage = createPage({
  view({attrs}: m.Vnode<PageAttrs>) {
    const pages: m.Children = [];
    // we need to remove the `/` character from the route
    let routePage = attrs.subpage ? attrs.subpage.substr(1) : '';
    if (!RECORDING_SECTIONS.includes(routePage)) {
      routePage = 'buffers';
    }
    pages.push(recordMenu(routePage));

    pages.push(m(RecordingSettings, {
      dataSources: [],
      cssClass: maybeGetActiveCss(routePage, 'buffers'),
    } as RecordingSectionAttrs));
    pages.push(Instructions(maybeGetActiveCss(routePage, 'instructions')));
    pages.push(Configurations(maybeGetActiveCss(routePage, 'config')));

    const settingsSections = new Map([
      ['cpu', CpuSettings],
      ['gpu', GpuSettings],
      ['power', PowerSettings],
      ['memory', MemorySettings],
      ['android', AndroidSettings],
      ['chrome', ChromeSettings],
      ['advanced', AdvancedSettings],
    ]);
    for (const [section, component] of settingsSections.entries()) {
      pages.push(m(component, {
        dataSources: [],
        cssClass: maybeGetActiveCss(routePage, section),
      } as RecordingSectionAttrs));
    }

    return m(
        '.record-page',
        globals.state.recordingInProgress ? m('.hider') : [],
        m('.record-container',
          RecordHeader(),
          m('.record-container-content', recordMenu(routePage), pages)));
  },
});
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import m from 'mithril';

import {EngineProxy} from '../common/engine';
import {QueryResponse, runQuery} from '../common/queries';

import {globals} from './globals';
import {createPage} from './pages';


interface StatsSectionAttrs {
  title: string;
  subTitle: string;
  sqlConstraints: string;
  cssClass: string;
  queryId: string;
}

function getEngine(name: string): EngineProxy|undefined {
  const currentEngine = globals.getCurrentEngine();
  if (currentEngine === undefined) return undefined;
  const engineId = currentEngine.id;
  return globals.engines.get(engineId)?.getProxy(name);
}

// Generic class that generate a <section> + <table> from the stats table.
// The caller defines the query constraint, title and styling.
// Used for errors, data losses and debugging sections.
class StatsSection implements m.ClassComponent<StatsSectionAttrs> {
  private queryResponse?: QueryResponse;

  constructor({attrs}: m.CVnode<StatsSectionAttrs>) {
    const engine = getEngine('StatsSection');
    if (engine === undefined) {
      return;
    }
    const query = `select name, value, cast(ifnull(idx, '') as text) as idx,
              description, severity, source from stats
              where ${attrs.sqlConstraints || '1=1'}
              order by name, idx`;
    runQuery(query, engine).then((resp: QueryResponse) => {
      this.queryResponse = resp;
      globals.rafScheduler.scheduleFullRedraw();
    });
  }

  view({attrs}: m.CVnode<StatsSectionAttrs>) {
    const resp = this.queryResponse;
    if (resp === undefined || resp.totalRowCount === 0) {
      return m('');
    }
    if (resp.error) throw new Error(resp.error);

    const tableRows = [];
    for (const row of resp.rows) {
      const help = [];
      if (row.description) {
        help.push(m('i.material-icons.contextual-help', 'help_outline'));
      }
      const idx = row.idx !== '' ? `[${row.idx}]` : '';
      tableRows.push(m(
          'tr',
          m('td.name', {title: row.description}, `${row.name}${idx}`, help),
          m('td', `${row.value}`),
          m('td', `${row.severity} (${row.source})`),
          ));
    }

    return m(
        `section${attrs.cssClass}`,
        m('h2', attrs.title),
        m('h3', attrs.subTitle),
        m(
            'table',
            m('thead',
              m('tr', m('td', 'Name'), m('td', 'Value'), m('td', 'Type'))),
            m('tbody', tableRows),
            ),
    );
  }
}

class MetricErrors implements m.ClassComponent {
  view() {
    if (!globals.metricError) return;
    return m(
        `section.errors`,
        m('h2', `Metric Errors`),
        m('h3', `One or more metrics were not computed successfully:`),
        m('div.metric-error', globals.metricError));
  }
}

class TraceMetadata implements m.ClassComponent {
  private queryResponse?: QueryResponse;

  constructor() {
    const engine = getEngine('StatsSection');
    if (engine === undefined) {
      return;
    }
    const query = `with 
          metadata_with_priorities as (select
            name, ifnull(str_value, cast(int_value as text)) as value,
            name in (
               "trace_size_bytes", 
               "cr-os-arch",
               "cr-os-name",
               "cr-os-version",
               "cr-physical-memory",
               "cr-product-version",
               "cr-hardware-class"
            ) as priority 
            from metadata
          )
          select name, value
          from metadata_with_priorities 
          order by priority desc, name`;
    runQuery(query, engine).then((resp: QueryResponse) => {
      this.queryResponse = resp;
      globals.rafScheduler.scheduleFullRedraw();
    });
  }


  view() {
    const resp = this.queryResponse;
    if (resp === undefined || resp.totalRowCount === 0) {
      return m('');
    }

    const tableRows = [];
    for (const row of resp.rows) {
      tableRows.push(m(
          'tr',
          m('td.name', `${row.name}`),
          m('td', `${row.value}`),
          ));
    }

    return m(
        'section',
        m('h2', 'System info and metadata'),
        m(
            'table',
            m('thead', m('tr', m('td', 'Name'), m('td', 'Value'))),
            m('tbody', tableRows),
            ),
    );
  }
}

class AndroidGameInterventionList implements m.ClassComponent {
  private queryResponse?: QueryResponse;

  constructor() {
    const engine = getEngine('StatsSection');
    if (engine === undefined) {
      return;
    }
    const query = `select
                package_name,
                uid,
                current_mode,
                standard_mode_supported,
                standard_mode_downscale,
                standard_mode_use_angle,
                standard_mode_fps,
                perf_mode_supported,
                perf_mode_downscale,
                perf_mode_use_angle,
                perf_mode_fps,
                battery_mode_supported,
                battery_mode_downscale,
                battery_mode_use_angle,
                battery_mode_fps
                from android_game_intervention_list`;
    runQuery(query, engine).then((resp: QueryResponse) => {
      this.queryResponse = resp;
      globals.rafScheduler.scheduleFullRedraw();
    });
  }


  view() {
    const resp = this.queryResponse;
    if (resp === undefined || resp.totalRowCount === 0) {
      return m('');
    }

    const tableRows = [];
    let standardInterventions = '';
    let perfInterventions = '';
    let batteryInterventions = '';
    for (const row of resp.rows) {
      if (row.standard_mode_supported) {
        standardInterventions =
            `angle=${row.standard_mode_use_angle},downscale=${
                row.standard_mode_downscale},fps=${row.standard_mode_fps}`;
      } else {
        standardInterventions = 'Not supported';
      }

      if (row.perf_mode_supported) {
        perfInterventions = `angle=${row.perf_mode_use_angle},downscale=${
            row.perf_mode_downscale},fps=${row.perf_mode_fps}`;
      } else {
        perfInterventions = 'Not supported';
      }

      if (row.battery_mode_supported) {
        batteryInterventions = `angle=${row.battery_mode_use_angle},downscale=${
            row.battery_mode_downscale},fps=${row.battery_mode_fps}`;
      } else {
        batteryInterventions = 'Not supported';
      }
      // Game mode numbers are defined in
      // https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/android/app/GameManager.java;l=68
      if (row.current_mode === 1) {
        row.current_mode = 'Standard';
      } else if (row.current_mode === 2) {
        row.current_mode = 'Performance';
      } else if (row.current_mode === 3) {
        row.current_mode = 'Battery';
      }
      tableRows.push(m(
          'tr',
          m('td.name', `${row.package_name}`),
          m('td', `${row.current_mode}`),
          m('td', standardInterventions),
          m('td', perfInterventions),
          m('td', batteryInterventions),
          ));
    }

    return m(
        'section',
        m('h2', 'Game Intervention List'),
        m(
            'table',
            m('thead',
              m(
                  'tr',
                  m('td', 'Name'),
                  m('td', 'Current mode'),
                  m('td', 'Standard mode interventions'),
                  m('td', 'Performance mode interventions'),
                  m('td', 'Battery mode interventions'),
                  )),
            m('tbody', tableRows),
            ),
    );
  }
}

class PackageList implements m.ClassComponent {
  private queryResponse?: QueryResponse;

  constructor() {
    const engine = getEngine('StatsSection');
    if (engine === undefined) {
      return;
    }
    const query = `select package_name, version_code, debuggable,
                profileable_from_shell from package_list`;
    runQuery(query, engine).then((resp: QueryResponse) => {
      this.queryResponse = resp;
      globals.rafScheduler.scheduleFullRedraw();
    });
  }


  view() {
    const resp = this.queryResponse;
    if (resp === undefined || resp.totalRowCount === 0) {
      return m('');
    }

    const tableRows = [];
    for (const row of resp.rows) {
      tableRows.push(m(
          'tr',
          m('td.name', `${row.package_name}`),
          m('td', `${row.version_code}`),
          m('td',
            `${row.debuggable ? 'debuggable' : ''} ${
                row.profileable_from_shell ? 'profileable' : ''}`),
          ));
    }

    return m(
        'section',
        m('h2', 'Package list'),
        m(
            'table',
            m('thead',
              m('tr',
                m('td', 'Name'),
                m('td', 'Version code'),
                m('td', 'Flags'))),
            m('tbody', tableRows),
            ),
    );
  }
}

export const TraceInfoPage = createPage({
  view() {
    return m(
        '.trace-info-page',
        m(MetricErrors),
        m(StatsSection, {
          queryId: 'info_errors',
          title: 'Import errors',
          cssClass: '.errors',
          subTitle:
              `The following errors have been encountered while importing the
               trace. These errors are usually non-fatal but indicate that one
               or more tracks might be missing or showing erroneous data.`,
          sqlConstraints: `severity = 'error' and value > 0`,

        }),
        m(StatsSection, {
          queryId: 'info_data_losses',
          title: 'Data losses',
          cssClass: '.errors',
          subTitle:
              `These counters are collected at trace recording time. The trace
               data for one or more data sources was dropped and hence some
               track contents will be incomplete.`,
          sqlConstraints: `severity = 'data_loss' and value > 0`,
        }),
        m(TraceMetadata),
        m(PackageList),
        m(AndroidGameInterventionList),
        m(StatsSection, {
          queryId: 'info_all',
          title: 'Debugging stats',
          cssClass: '',
          subTitle: `Debugging statistics such as trace buffer usage and metrics
                     coming from the TraceProcessor importer stages.`,
          sqlConstraints: '',

        }),
    );
  },
});
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export class DragGestureHandler {
  private readonly boundOnMouseDown = this.onMouseDown.bind(this);
  private readonly boundOnMouseMove = this.onMouseMove.bind(this);
  private readonly boundOnMouseUp = this.onMouseUp.bind(this);
  private clientRect?: DOMRect;
  private pendingMouseDownEvent?: MouseEvent;
  private _isDragging = false;

  constructor(
      private element: HTMLElement,
      private onDrag: (x: number, y: number) => void,
      private onDragStarted: (x: number, y: number) => void = () => {},
      private onDragFinished = () => {}) {
    element.addEventListener('mousedown', this.boundOnMouseDown);
  }

  private onMouseDown(e: MouseEvent) {
    this._isDragging = true;
    document.body.addEventListener('mousemove', this.boundOnMouseMove);
    document.body.addEventListener('mouseup', this.boundOnMouseUp);
    this.pendingMouseDownEvent = e;
    // Prevent interactions with other DragGestureHandlers and event listeners
    e.stopPropagation();
  }

  // We don't start the drag gesture on mouse down, instead we wait until
  // the mouse has moved at least 1px. This prevents accidental drags that
  // were meant to be clicks.
  private startDragGesture(e: MouseEvent) {
    this.clientRect = this.element.getBoundingClientRect();
    this.onDragStarted(
        e.clientX - this.clientRect.left, e.clientY - this.clientRect.top);
  }

  private onMouseMove(e: MouseEvent) {
    if (e.buttons === 0) {
      return this.onMouseUp(e);
    }
    if (this.pendingMouseDownEvent &&
        (Math.abs(e.clientX - this.pendingMouseDownEvent.clientX) > 1 ||
         Math.abs(e.clientY - this.pendingMouseDownEvent.clientY) > 1)) {
      this.startDragGesture(this.pendingMouseDownEvent);
      this.pendingMouseDownEvent = undefined;
    }
    if (!this.pendingMouseDownEvent) {
      this.onDrag(
          e.clientX - this.clientRect!.left, e.clientY - this.clientRect!.top);
    }
    e.stopPropagation();
  }

  private onMouseUp(e: MouseEvent) {
    this._isDragging = false;
    document.body.removeEventListener('mousemove', this.boundOnMouseMove);
    document.body.removeEventListener('mouseup', this.boundOnMouseUp);
    if (!this.pendingMouseDownEvent) {
      this.onDragFinished();
    }
    e.stopPropagation();
  }

  get isDragging() {
    return this._isDragging;
  }
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {assertFalse, assertTrue} from '../base/logging';
import {TimeSpan} from '../common/time';

const MAX_ZOOM_SPAN_SEC = 1e-8;  // 10 ns.

/**
 * Defines a mapping between number and seconds for the entire application.
 * Linearly scales time values from boundsMs to pixel values in boundsPx and
 * back.
 */
export class TimeScale {
  private timeBounds: TimeSpan;
  private _startPx: number;
  private _endPx: number;
  private secPerPx = 0;

  constructor(timeBounds: TimeSpan, boundsPx: [number, number]) {
    this.timeBounds = timeBounds;
    this._startPx = boundsPx[0];
    this._endPx = boundsPx[1];
    this.updateSlope();
  }

  private updateSlope() {
    this.secPerPx = this.timeBounds.duration / (this._endPx - this._startPx);
  }

  deltaTimeToPx(time: number): number {
    return Math.round(time / this.secPerPx);
  }

  timeToPx(time: number): number {
    return this._startPx + (time - this.timeBounds.start) / this.secPerPx;
  }

  pxToTime(px: number): number {
    return this.timeBounds.start + (px - this._startPx) * this.secPerPx;
  }

  deltaPxToDuration(px: number): number {
    return px * this.secPerPx;
  }

  setTimeBounds(timeBounds: TimeSpan) {
    this.timeBounds = timeBounds;
    this.updateSlope();
  }

  setLimitsPx(pxStart: number, pxEnd: number) {
    assertFalse(pxStart === pxEnd);
    assertTrue(pxStart >= 0 && pxEnd >= 0);
    this._startPx = pxStart;
    this._endPx = pxEnd;
    this.updateSlope();
  }

  timeInBounds(time: number): boolean {
    return this.timeBounds.isInBounds(time);
  }

  get startPx(): number {
    return this._startPx;
  }

  get endPx(): number {
    return this._endPx;
  }

  get widthPx(): number {
    return this._endPx - this._startPx;
  }

  get timeSpan(): TimeSpan {
    return this.timeBounds;
  }
}

export function computeZoom(
    scale: TimeScale, span: TimeSpan, zoomFactor: number, zoomPx: number):
    TimeSpan {
  const startPx = scale.startPx;
  const endPx = scale.endPx;
  const deltaPx = endPx - startPx;
  const deltaTime = span.end - span.start;
  const newDeltaTime = Math.max(deltaTime * zoomFactor, MAX_ZOOM_SPAN_SEC);
  const clampedZoomPx = Math.max(startPx, Math.min(endPx, zoomPx));
  const zoomTime = scale.pxToTime(clampedZoomPx);
  const r = (clampedZoomPx - startPx) / deltaPx;
  const newStartTime = zoomTime - newDeltaTime * r;
  const newEndTime = newStartTime + newDeltaTime;
  return new TimeSpan(newStartTime, newEndTime);
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import m from 'mithril';

import {EngineProxy} from '../common/engine';
import {QueryResponse, runQuery} from '../common/queries';

import {addTab} from './bottom_tab';
import {globals} from './globals';
import {createPage} from './pages';
import {QueryHistoryComponent, queryHistoryStorage} from './query_history';
import {QueryResultTab} from './query_result_tab';
import {QueryTable} from './query_table';

const INPUT_PLACEHOLDER = 'Enter query and press Cmd/Ctrl + Enter';
const INPUT_MIN_LINES = 2;
const INPUT_MAX_LINES = 10;
const INPUT_LINE_HEIGHT_EM = 1.2;
const TAB_SPACES = 2;
const TAB_SPACES_STRING = ' '.repeat(TAB_SPACES);

interface AnalyzePageState {
  enteredText: string;
  executedQuery?: string;
  queryResult?: QueryResponse;
}

const state: AnalyzePageState = {
  enteredText: '',
};

export function runAnalyzeQuery(query: string) {
  state.executedQuery = query;
  state.queryResult = undefined;
  const engine = getEngine();
  if (engine) {
    runQuery(query, engine).then((resp: QueryResponse) => {
      addTab({
        kind: QueryResultTab.kind,
        tag: 'analyze_page_query',
        config: {
          query: query,
          title: 'Standalone Query',
          prefetchedResponse: resp,
        },
      });
      // We might have started to execute another query. Ignore it in that case.
      if (state.executedQuery !== query) {
        return;
      }
      state.queryResult = resp;
      globals.rafScheduler.scheduleFullRedraw();
    });
  }
}

function getEngine(): EngineProxy|undefined {
  const engineId = globals.getCurrentEngine()?.id;
  if (engineId === undefined) {
    return undefined;
  }
  const engine = globals.engines.get(engineId)?.getProxy('AnalyzePage');
  return engine;
}

class QueryInput implements m.ClassComponent {
  // How many lines to display if the user hasn't resized the input box.
  displayLines = INPUT_MIN_LINES;

  static onKeyDown(e: Event) {
    const event = e as KeyboardEvent;
    const target = e.target as HTMLTextAreaElement;
    const {selectionStart, selectionEnd} = target;

    if (event.code === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      let query = target.value;
      if (selectionEnd > selectionStart) {
        query = query.substring(selectionStart, selectionEnd);
      }
      if (!query) return;
      queryHistoryStorage.saveQuery(query);

      runAnalyzeQuery(query);
    }

    if (event.code === 'Tab') {
      // Handle tabs to insert spaces.
      event.preventDefault();
      const lastLineBreak = target.value.lastIndexOf('\n', selectionEnd);

      if (selectionStart === selectionEnd || lastLineBreak < selectionStart) {
        // Selection does not contain line breaks, therefore is on a single
        // line. In this case, replace the selection with spaces. Replacement is
        // done via document.execCommand as opposed to direct manipulation of
        // element's value attribute because modifying latter programmatically
        // drops the edit history which breaks undo/redo functionality.
        document.execCommand('insertText', false, TAB_SPACES_STRING);
      } else {
        this.handleMultilineTab(target, event);
      }
    }
  }

  // Handle Tab press when the current selection is multiline: find all the
  // lines intersecting with the selection, and either indent or dedent (if
  // Shift key is held) them.
  private static handleMultilineTab(
      target: HTMLTextAreaElement, event: KeyboardEvent) {
    const {selectionStart, selectionEnd} = target;
    const firstLineBreak = target.value.lastIndexOf('\n', selectionStart - 1);

    // If no line break is found (selection begins at the first line),
    // replacementStart would have the correct value of 0.
    const replacementStart = firstLineBreak + 1;
    const replacement = target.value.substring(replacementStart, selectionEnd)
                            .split('\n')
                            .map((line) => {
                              if (event.shiftKey) {
                                // When Shift is held, remove whitespace at the
                                // beginning
                                return this.dedent(line);
                              } else {
                                return TAB_SPACES_STRING + line;
                              }
                            })
                            .join('\n');
    // Select the range to be replaced.
    target.setSelectionRange(replacementStart, selectionEnd);
    document.execCommand('insertText', false, replacement);
    // Restore the selection to match the previous selection, allowing to chain
    // indent operations by just pressing Tab several times.
    target.setSelectionRange(
        replacementStart, replacementStart + replacement.length);
  }

  // Chop off up to TAB_SPACES leading spaces from a string.
  private static dedent(line: string): string {
    let i = 0;
    while (i < line.length && i < TAB_SPACES && line[i] === ' ') {
      i++;
    }
    return line.substring(i);
  }

  onInput(textareaValue: string) {
    const textareaLines = textareaValue.split('\n').length;
    const clampedNumLines =
        Math.min(Math.max(textareaLines, INPUT_MIN_LINES), INPUT_MAX_LINES);
    this.displayLines = clampedNumLines;
    state.enteredText = textareaValue;
    globals.rafScheduler.scheduleFullRedraw();
  }

  // This method exists because unfortunatley setting custom properties on an
  // element's inline style attribue doesn't seem to work in mithril, even
  // though the docs claim so.
  setHeightBeforeResize(node: HTMLElement) {
    // +2em for some extra breathing space to account for padding.
    const heightEm = this.displayLines * INPUT_LINE_HEIGHT_EM + 2;
    // We set a height based on the number of lines that we want to display by
    // default. If the user resizes the textbox using the resize handle in the
    // bottom-right corner, this height is overridden.
    node.style.setProperty('--height-before-resize', `${heightEm}em`);
    // TODO(dproy): The resized height is lost if user navigates away from the
    // page and comes back.
  }

  oncreate(vnode: m.VnodeDOM) {
    // This makes sure query persists if user navigates to other pages and comes
    // back to analyze page.
    const existingQuery = state.enteredText;
    const textarea = vnode.dom as HTMLTextAreaElement;
    if (existingQuery) {
      textarea.value = existingQuery;
      this.onInput(existingQuery);
    }

    this.setHeightBeforeResize(textarea);
  }

  onupdate(vnode: m.VnodeDOM) {
    this.setHeightBeforeResize(vnode.dom as HTMLElement);
  }

  view() {
    return m('textarea.query-input', {
      placeholder: INPUT_PLACEHOLDER,
      onkeydown: (e: Event) => QueryInput.onKeyDown(e),
      oninput: (e: Event) =>
          this.onInput((e.target as HTMLTextAreaElement).value),
    });
  }
}


export const AnalyzePage = createPage({
  view() {
    return m(
        '.analyze-page',
        m(QueryInput),
        state.executedQuery === undefined ? null : m(QueryTable, {
          query: state.executedQuery,
          resp: state.queryResult,
          onClose: () => {
            state.executedQuery = undefined;
            state.queryResult = undefined;
            globals.rafScheduler.scheduleFullRedraw();
          },
        }),
        m(QueryHistoryComponent));
  },
});
// Copyright (C) 2021 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {featureFlags} from '../common/feature_flags';
import {globals} from './globals';

let lastReloadDialogTime = 0;
const kMinTimeBetweenDialogsMs = 10000;
const changedPaths = new Set<string>();

export function initLiveReloadIfLocalhost() {
  if (!location.origin.startsWith('http://localhost:')) return;
  if (globals.embeddedMode) return;

  const monitor = new EventSource('/live_reload');
  monitor.onmessage = (msg) => {
    const change = msg.data;
    console.log('Live reload:', change);
    changedPaths.add(change);
    if (change.endsWith('.css')) {
      reloadCSS();
    } else if (change.endsWith('.html') || change.endsWith('.js')) {
      reloadDelayed();
    }
  };
  monitor.onerror = (err) => {
    // In most cases the error is fired on reload, when the socket disconnects.
    // Delay the error and the reconnection, so in the case of a reload we don't
    // see any midleading message.
    setTimeout(() => console.error('LiveReload SSE error', err), 1000);
  };
}

function reloadCSS() {
  const css = document.querySelector('link[rel=stylesheet]') as HTMLLinkElement;
  if (!css) return;
  const parent = css.parentElement!;
  parent.removeChild(css);
  parent.appendChild(css);
}

const rapidReloadFlag = featureFlags.register({
  id: 'rapidReload',
  name: 'Development: rapid live reload',
  defaultValue: false,
  description: 'During development, instantly reload the page on change. ' +
      'Enables lower latency of live reload at the cost of potential ' +
      'multiple re-reloads.',
  devOnly: true,
});

function reloadDelayed() {
  setTimeout(() => {
    let pathsStr = '';
    for (const path of changedPaths) {
      pathsStr += path + '\n';
    }
    changedPaths.clear();
    if (Date.now() - lastReloadDialogTime < kMinTimeBetweenDialogsMs) return;
    const reload =
        rapidReloadFlag.get() || confirm(`${pathsStr}changed, click to reload`);
    lastReloadDialogTime = Date.now();
    if (reload) {
      window.location.reload();
    }
  }, rapidReloadFlag.get() ? 0 : 1000);
}
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {TRACK_SHELL_WIDTH} from './css_constants';
import {ALL_CATEGORIES, getFlowCategories} from './flow_events_panel';
import {Flow, FlowPoint, globals} from './globals';
import {PanelVNode} from './panel';
import {SliceRect} from './track';
import {TrackGroupPanel} from './track_group_panel';
import {TrackPanel} from './track_panel';

const TRACK_GROUP_CONNECTION_OFFSET = 5;
const TRIANGLE_SIZE = 5;
const CIRCLE_RADIUS = 3;
const BEZIER_OFFSET = 30;

const CONNECTED_FLOW_HUE = 10;
const SELECTED_FLOW_HUE = 230;

const DEFAULT_FLOW_WIDTH = 2;
const FOCUSED_FLOW_WIDTH = 3;

const HIGHLIGHTED_FLOW_INTENSITY = 45;
const FOCUSED_FLOW_INTENSITY = 55;
const DEFAULT_FLOW_INTENSITY = 70;

type LineDirection = 'LEFT'|'RIGHT'|'UP'|'DOWN';
type ConnectionType = 'TRACK'|'TRACK_GROUP';

interface TrackPanelInfo {
  panel: TrackPanel;
  yStart: number;
}

interface TrackGroupPanelInfo {
  panel: TrackGroupPanel;
  yStart: number;
  height: number;
}

function hasTrackId(obj: {}): obj is {trackId: number} {
  return (obj as {trackId?: number}).trackId !== undefined;
}

function hasManyTrackIds(obj: {}): obj is {trackIds: number[]} {
  return (obj as {trackIds?: number}).trackIds !== undefined;
}

function hasId(obj: {}): obj is {id: number} {
  return (obj as {id?: number}).id !== undefined;
}

function hasTrackGroupId(obj: {}): obj is {trackGroupId: string} {
  return (obj as {trackGroupId?: string}).trackGroupId !== undefined;
}

export class FlowEventsRendererArgs {
  trackIdToTrackPanel: Map<number, TrackPanelInfo>;
  groupIdToTrackGroupPanel: Map<string, TrackGroupPanelInfo>;

  constructor(public canvasWidth: number, public canvasHeight: number) {
    this.trackIdToTrackPanel = new Map<number, TrackPanelInfo>();
    this.groupIdToTrackGroupPanel = new Map<string, TrackGroupPanelInfo>();
  }

  registerPanel(panel: PanelVNode, yStart: number, height: number) {
    if (panel.state instanceof TrackPanel && hasId(panel.attrs)) {
      const config = globals.state.tracks[panel.attrs.id].config;
      if (hasTrackId(config)) {
        this.trackIdToTrackPanel.set(
            config.trackId, {panel: panel.state, yStart});
      }
      if (hasManyTrackIds(config)) {
        for (const trackId of config.trackIds) {
          this.trackIdToTrackPanel.set(trackId, {panel: panel.state, yStart});
        }
      }
    } else if (
        panel.state instanceof TrackGroupPanel &&
        hasTrackGroupId(panel.attrs)) {
      this.groupIdToTrackGroupPanel.set(
          panel.attrs.trackGroupId, {panel: panel.state, yStart, height});
    }
  }
}

export class FlowEventsRenderer {
  private getTrackGroupIdByTrackId(trackId: number): string|undefined {
    const uiTrackId = globals.state.uiTrackIdByTraceTrackId[trackId];
    return uiTrackId ? globals.state.tracks[uiTrackId].trackGroup : undefined;
  }

  private getTrackGroupYCoordinate(
      args: FlowEventsRendererArgs, trackId: number): number|undefined {
    const trackGroupId = this.getTrackGroupIdByTrackId(trackId);
    if (!trackGroupId) {
      return undefined;
    }
    const trackGroupInfo = args.groupIdToTrackGroupPanel.get(trackGroupId);
    if (!trackGroupInfo) {
      return undefined;
    }
    return trackGroupInfo.yStart + trackGroupInfo.height -
        TRACK_GROUP_CONNECTION_OFFSET;
  }

  private getTrackYCoordinate(args: FlowEventsRendererArgs, trackId: number):
      number|undefined {
    return args.trackIdToTrackPanel.get(trackId) ?.yStart;
  }

  private getYConnection(
      args: FlowEventsRendererArgs, trackId: number,
      rect?: SliceRect): {y: number, connection: ConnectionType}|undefined {
    if (!rect) {
      const y = this.getTrackGroupYCoordinate(args, trackId);
      if (y === undefined) {
        return undefined;
      }
      return {y, connection: 'TRACK_GROUP'};
    }
    const y = (this.getTrackYCoordinate(args, trackId) || 0) + rect.top +
        rect.height * 0.5;

    return {
      y: Math.min(Math.max(0, y), args.canvasHeight),
      connection: 'TRACK',
    };
  }

  private getXCoordinate(ts: number): number {
    return globals.frontendLocalState.timeScale.timeToPx(ts);
  }

  private getSliceRect(args: FlowEventsRendererArgs, point: FlowPoint):
      SliceRect|undefined {
    const trackPanel = args.trackIdToTrackPanel.get(point.trackId) ?.panel;
    if (!trackPanel) {
      return undefined;
    }
    return trackPanel.getSliceRect(
        point.sliceStartTs, point.sliceEndTs, point.depth);
  }

  render(ctx: CanvasRenderingContext2D, args: FlowEventsRendererArgs) {
    ctx.save();
    ctx.translate(TRACK_SHELL_WIDTH, 0);
    ctx.rect(0, 0, args.canvasWidth - TRACK_SHELL_WIDTH, args.canvasHeight);
    ctx.clip();

    globals.connectedFlows.forEach((flow) => {
      this.drawFlow(ctx, args, flow, CONNECTED_FLOW_HUE);
    });

    globals.selectedFlows.forEach((flow) => {
      const categories = getFlowCategories(flow);
      for (const cat of categories) {
        if (globals.visibleFlowCategories.get(cat) ||
            globals.visibleFlowCategories.get(ALL_CATEGORIES)) {
          this.drawFlow(ctx, args, flow, SELECTED_FLOW_HUE);
          break;
        }
      }
    });

    ctx.restore();
  }

  private drawFlow(
      ctx: CanvasRenderingContext2D, args: FlowEventsRendererArgs, flow: Flow,
      hue: number) {
    const beginSliceRect = this.getSliceRect(args, flow.begin);
    const endSliceRect = this.getSliceRect(args, flow.end);

    const beginYConnection =
        this.getYConnection(args, flow.begin.trackId, beginSliceRect);
    const endYConnection =
        this.getYConnection(args, flow.end.trackId, endSliceRect);

    if (!beginYConnection || !endYConnection) {
      return;
    }

    let beginDir: LineDirection = 'LEFT';
    let endDir: LineDirection = 'RIGHT';
    if (beginYConnection.connection === 'TRACK_GROUP') {
      beginDir = beginYConnection.y > endYConnection.y ? 'DOWN' : 'UP';
    }
    if (endYConnection.connection === 'TRACK_GROUP') {
      endDir = endYConnection.y > beginYConnection.y ? 'DOWN' : 'UP';
    }

    const begin = {
      x: this.getXCoordinate(flow.begin.sliceEndTs),
      y: beginYConnection.y,
      dir: beginDir,
    };
    const end = {
      x: this.getXCoordinate(flow.end.sliceStartTs),
      y: endYConnection.y,
      dir: endDir,
    };
    const highlighted = flow.end.sliceId === globals.state.highlightedSliceId ||
        flow.begin.sliceId === globals.state.highlightedSliceId;
    const focused = flow.id === globals.state.focusedFlowIdLeft ||
        flow.id === globals.state.focusedFlowIdRight;

    let intensity = DEFAULT_FLOW_INTENSITY;
    let width = DEFAULT_FLOW_WIDTH;
    if (focused) {
      intensity = FOCUSED_FLOW_INTENSITY;
      width = FOCUSED_FLOW_WIDTH;
    }
    if (highlighted) {
      intensity = HIGHLIGHTED_FLOW_INTENSITY;
    }
    this.drawFlowArrow(ctx, begin, end, hue, intensity, width);
  }

  private getDeltaX(dir: LineDirection, offset: number): number {
    switch (dir) {
      case 'LEFT':
        return -offset;
      case 'RIGHT':
        return offset;
      case 'UP':
        return 0;
      case 'DOWN':
        return 0;
      default:
        return 0;
    }
  }

  private getDeltaY(dir: LineDirection, offset: number): number {
    switch (dir) {
      case 'LEFT':
        return 0;
      case 'RIGHT':
        return 0;
      case 'UP':
        return -offset;
      case 'DOWN':
        return offset;
      default:
        return 0;
    }
  }

  private drawFlowArrow(
      ctx: CanvasRenderingContext2D,
      begin: {x: number, y: number, dir: LineDirection},
      end: {x: number, y: number, dir: LineDirection}, hue: number,
      intensity: number, width: number) {
    const hasArrowHead = Math.abs(begin.x - end.x) > 3 * TRIANGLE_SIZE;
    const END_OFFSET =
        (((end.dir === 'RIGHT' || end.dir === 'LEFT') && hasArrowHead) ?
             TRIANGLE_SIZE :
             0);
    const color = `hsl(${hue}, 50%, ${intensity}%)`;
    // draw curved line from begin to end (bezier curve)
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);
    ctx.bezierCurveTo(
        begin.x - this.getDeltaX(begin.dir, BEZIER_OFFSET),
        begin.y - this.getDeltaY(begin.dir, BEZIER_OFFSET),
        end.x - this.getDeltaX(end.dir, BEZIER_OFFSET + END_OFFSET),
        end.y - this.getDeltaY(end.dir, BEZIER_OFFSET + END_OFFSET),
        end.x - this.getDeltaX(end.dir, END_OFFSET),
        end.y - this.getDeltaY(end.dir, END_OFFSET));
    ctx.stroke();

    // TODO (andrewbb): probably we should add a parameter 'MarkerType' to be
    // able to choose what marker we want to draw _before_ the function call.
    // e.g. triangle, circle, square?
    if (begin.dir !== 'RIGHT' && begin.dir !== 'LEFT') {
      // draw a circle if we the line has a vertical connection
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(begin.x, begin.y, 3, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    }


    if (end.dir !== 'RIGHT' && end.dir !== 'LEFT') {
      // draw a circle if we the line has a vertical connection
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(end.x, end.y, CIRCLE_RADIUS, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    } else if (hasArrowHead) {
      this.drawArrowHead(end, ctx, color);
    }
  }

  private drawArrowHead(
      end: {x: number; y: number; dir: LineDirection},
      ctx: CanvasRenderingContext2D, color: string) {
    const dx = this.getDeltaX(end.dir, TRIANGLE_SIZE);
    const dy = this.getDeltaY(end.dir, TRIANGLE_SIZE);
    // draw small triangle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(end.x - dx - dy, end.y + dx - dy);
    ctx.lineTo(end.x - dx + dy, end.y - dx - dy);
    ctx.closePath();
    ctx.fill();
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {classNames} from '../classnames';

export interface CheckboxAttrs {
  // Optional text to show to the right of the checkbox.
  label?: string;
  // Whether the label is checked or not, defaults to false.
  // If omitted, the checkbox will be uncontrolled.
  checked?: boolean;
  // Make the checkbox appear greyed out block any interaction with it. No
  // events will be fired.
  // Defaults to false.
  disabled?: boolean;
  // Extra classes
  classes?: string|string[];
  // Remaining attributes forwarded to the underlying HTML <label>.
  [htmlAttrs: string]: any;
}

export class Checkbox implements m.ClassComponent<CheckboxAttrs> {
  view({attrs}: m.CVnode<CheckboxAttrs>) {
    const {
      label,
      checked,
      disabled = false,
      classes: extraClasses,
      ...htmlAttrs
    } = attrs;

    const classes = classNames(
        disabled && 'pf-disabled',
        extraClasses,
    );

    // The default checkbox is removed and an entirely new one created inside
    // the span element in CSS.
    return m(
        'label.pf-checkbox',
        {class: classes, ...htmlAttrs},
        m('input[type=checkbox]', {disabled, checked}),
        m('span'),
        label,
    );
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {classNames} from '../classnames';

interface SpinnerAttrs {
  // Whether to use an ease-in-ease-out animation rather than a linear one.
  // Defaults to false.
  easing: boolean;
}

export class Spinner implements m.ClassComponent<SpinnerAttrs> {
  view({attrs}: m.Vnode<SpinnerAttrs, this>): void|m.Children {
    const {
      easing = false,
    } = attrs;
    const classes = classNames(easing && 'easing');
    return m('.pf-spinner', {class: classes});
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

export interface EmptyStateAttrs {
  // Which material icon to show.
  // Defaults to 'search'.
  icon?: string;
  // Some text to show under the icon. No text shown if omitted.
  header?: string;
}

// Something to show when there's nothing else to show!
// Features a large icon, followed by some text explaining what went wrong, and
// some optional content passed as children elements, usually containing common
// actions for things you might want to do next (e.g. clear a search box).
export class EmptyState implements m.ClassComponent<EmptyStateAttrs> {
  view({attrs, children}: m.Vnode<EmptyStateAttrs, this>): void|m.Children {
    const {
      icon = 'search',  // Icon defaults to the search symbol
      header,
    } = attrs;
    return m(
        '.pf-empty-state',
        m('i.material-icons', icon),
        header && m('span.pf-empty-state-header', header),
        m('div.pf-empty-state-content', children),
    );
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {timeToCode} from '../../common/time';
import {toTraceTime, TPTimestamp} from '../sql_types';

interface TimestampAttrs {
  ts: TPTimestamp;
}

export class Timestamp implements m.ClassComponent<TimestampAttrs> {
  view(vnode: m.Vnode<TimestampAttrs>) {
    return timeToCode(toTraceTime(vnode.attrs.ts));
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

export interface SelectAttrs {
  disabled?: boolean;
  [htmlAttrs: string]: any;
}

export class Select implements m.ClassComponent<SelectAttrs> {
  view({attrs, children}: m.CVnode<SelectAttrs>) {
    const {disabled = false, ...htmlAttrs} = attrs;

    return m(
        'select.pf-select' + (disabled ? '[disabled]' : ''),
        htmlAttrs,
        children);
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

// Check whether a DOM element contains another, or whether they're the same
export function isOrContains(container: Element, target: Element): boolean {
  return container === target || container.contains(target);
}

// Find a DOM element with a given "ref" attribute
export function findRef(root: Element, ref: string): Element|null {
  const query = `[ref=${ref}]`;
  if (root.matches(query)) {
    return root;
  } else {
    return root.querySelector(query);
  }
}

// Safely case an Element to an HTMLElement.
// Throws if the element is not an HTMLElement.
export function toHTMLElement(el: Element): HTMLElement {
  if (!(el instanceof HTMLElement)) {
    throw new Error('Element is not an HTLMElement');
  }
  return el as HTMLElement;
}

// Check if a mithril component vnode has children
export function hasChildren({children}: m.Vnode<any>): boolean {
  return Array.isArray(children) && children.length > 0;
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {classNames} from '../classnames';
import {Icon} from './icon';

interface CommonAttrs {
  // Always show the button as if the "active" pseudo class were applied, which
  // makes the button look permanently pressed.
  // Useful for when the button represents some toggleable state, such as
  // showing/hiding a popup menu.
  // Defaults to false.
  active?: boolean;
  // Use minimal padding, reducing the overall size of the button by a few px.
  // Defaults to false.
  compact?: boolean;
  // Reduces button decorations.
  // Defaults to false.
  minimal?: boolean;
  // Make the button appear greyed out block any interaction with it. No events
  // will be fired.
  // Defaults to false.
  disabled?: boolean;
  // Optional right icon.
  rightIcon?: string;
  // List of space separated class names forwarded to the icon.
  className?: string;
  // Remaining attributes forwarded to the underlying HTML <button>.
  [htmlAttrs: string]: any;
}

interface IconButtonAttrs extends CommonAttrs {
  // Icon buttons require an icon.
  icon: string;
}

interface LabelButtonAttrs extends CommonAttrs {
  // Label buttons require a label.
  label: string;
  // Label buttons can have an optional icon.
  icon?: string;
}

export type ButtonAttrs = LabelButtonAttrs|IconButtonAttrs;

export class Button implements m.ClassComponent<ButtonAttrs> {
  view({attrs}: m.CVnode<ButtonAttrs>) {
    const {
      label,
      icon,
      active = false,
      compact = false,
      minimal = false,
      disabled = false,
      rightIcon,
      className,
      ...htmlAttrs
    } = attrs;

    const classes = classNames(
        'pf-button',
        active && 'pf-active',
        compact && 'pf-compact',
        minimal && 'pf-minimal',
        (icon && !label) && 'pf-icon-only',
        className,
    );

    return m(
        'button' + (disabled ? '[disabled]' : ''),
        {
          class: classes,
          ...htmlAttrs,
        },
        icon && m(Icon, {className: 'pf-left-icon', icon}),
        rightIcon && m(Icon, {className: 'pf-right-icon', icon: rightIcon}),
        label || '\u200B',  // Zero width space keeps button in-flow
    );
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {classNames} from '../classnames';

interface FormAttrs {
  // List of space separated class names forwarded to the icon.
  className?: string;
  // Remaining attributes forwarded to the underlying HTML <button>.
  [htmlAttrs: string]: any;
}

export class Form implements m.ClassComponent<FormAttrs> {
  view({attrs, children}: m.CVnode<FormAttrs>) {
    const {className, ...htmlAttrs} = attrs;

    const classes = classNames(
        'pf-form',
        className,
    );

    return m(
        'form.pf-form',
        {
          class: classes,
          ...htmlAttrs,
        },
        children,
    );
  }
}

export class FormButtonBar implements m.ClassComponent<{}> {
  view({children}: m.CVnode<{}>) {
    return m('.pf-form-button-bar', children);
  }
}

interface FormLabelAttrs {
  for: string;
  // Remaining attributes forwarded to the underlying HTML <button>.
  [htmlAttrs: string]: any;
}

export class FormLabel implements m.ClassComponent<FormLabelAttrs> {
  view({attrs, children}: m.CVnode<FormLabelAttrs>) {
    return m('label.pf-form-label', attrs, children);
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {classNames} from '../classnames';
import {Icon} from './icon';
import {Popup, PopupPosition} from './popup';
import {hasChildren} from './utils';

export interface MenuItemAttrs {
  // Text to display on the menu button.
  label: string;
  // Optional left icon.
  icon?: string;
  // Optional right icon.
  rightIcon?: string;
  // Make the item appear greyed out block any interaction with it. No events
  // will be fired.
  // Defaults to false.
  disabled?: boolean;
  // Always show the button as if the "active" pseudo class were applied, which
  // makes the button look permanently pressed.
  // Useful for when the button represents some toggleable state, such as
  // showing/hiding a popup menu.
  // Defaults to false.
  active?: boolean;
  // If this menu item is a descendant of a popup, this setting means that
  // clicking it will result in the popup being dismissed.
  // Defaults to false when menuitem has children, true otherwise.
  closePopupOnClick?: boolean;
  // Remaining attributes forwarded to the underlying HTML element.
  [htmlAttrs: string]: any;
}

// An interactive menu element with an icon.
// If this node has children, a nested popup menu will be rendered.
export class MenuItem implements m.ClassComponent<MenuItemAttrs> {
  view(vnode: m.CVnode<MenuItemAttrs>): m.Children {
    if (hasChildren(vnode)) {
      return this.renderNested(vnode);
    } else {
      return this.renderSingle(vnode);
    }
  }

  private renderNested({attrs, children}: m.CVnode<MenuItemAttrs>) {
    const {rightIcon = 'chevron_right', closePopupOnClick = false, ...rest} =
        attrs;

    return m(
        PopupMenu2,
        {
          popupPosition: PopupPosition.RightStart,
          trigger: m(MenuItem, {
            rightIcon: rightIcon ?? 'chevron_right',
            closePopupOnClick,
            ...rest,
          }),
          showArrow: false,
        },
        children,
    );
  }

  private renderSingle({attrs}: m.CVnode<MenuItemAttrs>) {
    const {
      label,
      icon,
      rightIcon,
      disabled,
      active,
      closePopupOnClick = true,
      ...htmlAttrs
    } = attrs;

    const classes = classNames(
        active && 'pf-active',
        !disabled && closePopupOnClick && 'pf-close-parent-popup-on-click',
    );

    return m(
        'button.pf-menu-item' + (disabled ? '[disabled]' : ''),
        {class: classes, ...htmlAttrs},
        icon && m(Icon, {className: 'pf-left-icon', icon}),
        rightIcon && m(Icon, {className: 'pf-right-icon', icon: rightIcon}),
        label,
    );
  }
};

// An element which shows a dividing line between menu items.
export class MenuDivider implements m.ClassComponent {
  view() {
    return m('.pf-menu-divider');
  }
};

// A siple container for a menu.
// The menu contents are passed in as children, and are typically MenuItems or
// MenuDividers, but really they can be any Mithril component.
export class Menu implements m.ClassComponent {
  view({children}: m.CVnode) {
    return m('.pf-menu', children);
  }
};

interface PopupMenu2Attrs {
  // The trigger is mithril component which is used to toggle the popup when
  // clicked, and provides the anchor on the page which the popup shall hover
  // next to, and to which the popup's arrow shall point. The popup shall move
  // around the page with this component, as if attached to it.
  // This trigger can be any mithril component, but it is typically a Button,
  // an Icon, or some other interactive component.
  // Beware this element will have its `onclick`, `ref`, and `active` attributes
  // overwritten.
  trigger: m.Vnode<any, any>;
  // Which side of the trigger to place to popup.
  // Defaults to "bottom".
  popupPosition?: PopupPosition;
  // Whether we should show the little arrow pointing to the trigger.
  // Defaults to true.
  showArrow?: boolean;
}

// A combination of a Popup and a Menu component.
// The menu contents are passed in as children, and are typically MenuItems or
// MenuDividers, but really they can be any Mithril component.
export class PopupMenu2 implements m.ClassComponent<PopupMenu2Attrs> {
  view({attrs, children}: m.CVnode<PopupMenu2Attrs>) {
    const {trigger, popupPosition = PopupPosition.Bottom, ...popupAttrs} =
        attrs;

    return m(
        Popup,
        {
          trigger,
          position: popupPosition,
          closeOnContentClick: true,
          ...popupAttrs,
        },
        m(Menu, children));
  }
};
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {createPopper, Instance, OptionsGeneric} from '@popperjs/core';
import type {StrictModifiers} from '@popperjs/core';
import m from 'mithril';
import {globals} from '../globals';
import {MountOptions, Portal, PortalAttrs} from './portal';
import {classNames} from '../classnames';
import {findRef, isOrContains, toHTMLElement} from './utils';
import {assertExists} from '../../base/logging';

// Note: We could just use the Placement type from popper.js instead, which is a
// union of string literals corresponding to the values in this enum, but having
// the emun makes it possible to enumerate the possible options, which is a
// feature used in the widgets page.
export enum PopupPosition {
  Auto = 'auto',
  AutoStart = 'auto-start',
  AutoEnd = 'auto-end',
  Top = 'top',
  TopStart = 'top-start',
  TopEnd = 'top-end',
  Bottom = 'bottom',
  BottomStart = 'bottom-start',
  BottomEnd = 'bottom-end',
  Right = 'right',
  RightStart = 'right-start',
  RightEnd = 'right-end',
  Left = 'left',
  LeftStart = 'left-start',
  LeftEnd = 'left-end',
}

type OnChangeCallback = (shouldOpen: boolean) => void;

export interface PopupAttrs {
  // Which side of the trigger to place to popup.
  // Defaults to "Auto"
  position?: PopupPosition;
  // The element used to open and close the popup, and the target which the near
  // which the popup should hover.
  // Beware this element will have its `onclick`, `ref`, and `active` attributes
  // overwritten.
  trigger: m.Vnode<any, any>;
  // Close when the escape key is pressed
  // Defaults to true.
  closeOnEscape?: boolean;
  // Close on mouse down somewhere other than the popup or trigger.
  // Defaults to true.
  closeOnOutsideClick?: boolean;
  // Controls whether the popup is open or not.
  // If omitted, the popup operates in uncontrolled mode.
  isOpen?: boolean;
  // Called when the popup isOpen state should be changed in controlled mode.
  onChange?: OnChangeCallback;
  // Close the popup if clicked on.
  // Defaults to false.
  closeOnContentClick?: boolean;
  // Space delimited class names applied to the popup div.
  className?: string;
  // Whether to show a little arrow pointing to our trigger element.
  // Defaults to true.
  showArrow?: boolean;
}

// A popup is a portal whose position is dynamically updated so that it floats
// next to a trigger element. It is also styled with a nice backdrop, and
// a little arrow pointing at the trigger element.
// Useful for displaying things like popup menus.
export class Popup implements m.ClassComponent<PopupAttrs> {
  private isOpen: boolean = false;
  private triggerElement?: Element;
  private popupElement?: HTMLElement;
  private popper?: Instance;
  private onChange: OnChangeCallback = () => {};
  private closeOnEscape?: boolean;
  private closeOnOutsideClick?: boolean;

  private static readonly TRIGGER_REF = 'trigger';
  private static readonly POPUP_REF = 'popup';

  view({attrs, children}: m.CVnode<PopupAttrs>): m.Children {
    const {
      trigger,
      isOpen = this.isOpen,
      onChange = () => {},
      closeOnEscape = true,
      closeOnOutsideClick = true,
    } = attrs;

    this.isOpen = isOpen;
    this.onChange = onChange;
    this.closeOnEscape = closeOnEscape;
    this.closeOnOutsideClick = closeOnOutsideClick;

    return [
      this.renderTrigger(trigger),
      isOpen && this.renderPopup(attrs, children),
    ];
  }

  private renderTrigger(trigger: m.Vnode<any, any>): m.Children {
    trigger.attrs = {
      ...trigger.attrs,
      ref: Popup.TRIGGER_REF,
      onclick: () => {
        this.togglePopup();
      },
      active: this.isOpen,
    };
    return trigger;
  }

  private renderPopup(attrs: PopupAttrs, children: any): m.Children {
    const {
      className,
      showArrow = true,
    } = attrs;

    const portalAttrs: PortalAttrs = {
      className: 'pf-popup-portal',
      onBeforeContentMount: (dom: Element): MountOptions => {
        // Check to see if dom is a descendant of a popup
        // If so, get the popup's "container" and put it in there instead
        // This handles the case where popups are placed inside the other popups
        // we nest outselves in their containers instead of document body which
        // means we become part of their hitbox for mouse events.
        const closestPopup = dom.closest(`[ref=${Popup.POPUP_REF}]`);
        return {container: closestPopup ?? undefined};
      },
      onContentMount: (dom: HTMLElement) => {
        this.popupElement =
            toHTMLElement(assertExists(findRef(dom, Popup.POPUP_REF)));
        this.createOrUpdatePopper(attrs);
        document.addEventListener('mousedown', this.handleDocMouseDown);
        document.addEventListener('keydown', this.handleDocKeyPress);
        dom.addEventListener('click', this.handleContentClick);
      },
      onContentUpdate: () => {
        // The content inside the portal has updated, so we call popper to
        // recompute the popup's position, in case it has changed size.
        this.popper && this.popper.update();
      },
      onContentUnmount: (dom: HTMLElement) => {
        dom.removeEventListener('click', this.handleContentClick);
        document.removeEventListener('keydown', this.handleDocKeyPress);
        document.removeEventListener('mousedown', this.handleDocMouseDown);
        this.popper && this.popper.destroy();
        this.popper = undefined;
        this.popupElement = undefined;
      },
    };

    return m(
        Portal,
        portalAttrs,
        m('.pf-popup',
          {
            class: classNames(className),
            ref: Popup.POPUP_REF,
          },
          showArrow && m('.pf-popup-arrow[data-popper-arrow]'),
          m('.pf-popup-content', children)),
    );
  }

  oncreate({dom}: m.VnodeDOM<PopupAttrs, this>) {
    this.triggerElement = assertExists(findRef(dom, Popup.TRIGGER_REF));
  }

  onupdate({attrs}: m.VnodeDOM<PopupAttrs, this>) {
    // We might have some new popper options, or the trigger might have changed
    // size, so we call popper to recompute the popup's position.
    this.createOrUpdatePopper(attrs);
  }

  onremove(_: m.VnodeDOM<PopupAttrs, this>) {
    this.triggerElement = undefined;
  }

  private createOrUpdatePopper(attrs: PopupAttrs) {
    const {
      position = PopupPosition.Auto,
      showArrow = true,
    } = attrs;

    const options: Partial<OptionsGeneric<StrictModifiers>> = {
      placement: position,
      modifiers: [
        // Move the popup away from the target allowing room for the arrow
        {
          name: 'offset',
          options: {offset: [0, showArrow ? 8 : 0]},
        },
        // Don't let the popup touch the edge of the viewport
        {name: 'preventOverflow', options: {padding: 8}},
        // Don't let the arrow reach the end of the popup, which looks odd when
        // the popup has rounded corners
        {name: 'arrow', options: {padding: 8}},
      ],
    };

    if (this.popper) {
      this.popper.setOptions(options);
    } else {
      if (this.popupElement && this.triggerElement) {
        this.popper = createPopper<StrictModifiers>(
            this.triggerElement, this.popupElement, options);
      }
    }
  }

  private eventInPopupOrTrigger(e: Event): boolean {
    const target = e.target as HTMLElement;
    const onTrigger = isOrContains(assertExists(this.triggerElement), target);
    const onPopup = isOrContains(assertExists(this.popupElement), target);
    return onTrigger || onPopup;
  }

  private handleDocMouseDown = (e: Event) => {
    if (this.closeOnOutsideClick && !this.eventInPopupOrTrigger(e)) {
      this.closePopup();
    }
  };

  private handleDocKeyPress = (e: KeyboardEvent) => {
    if (this.closeOnEscape && e.key === 'Escape') {
      this.closePopup();
    }
  };

  private handleContentClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.closest('.pf-close-parent-popup-on-click')) {
      this.closePopup();
    }
  };

  private closePopup() {
    if (this.isOpen) {
      this.isOpen = false;
      this.onChange(this.isOpen);
      globals.rafScheduler.scheduleFullRedraw();
    }
  }

  private togglePopup() {
    this.isOpen = !this.isOpen;
    this.onChange(this.isOpen);
    globals.rafScheduler.scheduleFullRedraw();
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {findRef, isOrContains, toHTMLElement} from './utils';

describe('isOrContains', () => {
  const parent = document.createElement('div');
  const child = document.createElement('div');
  parent.appendChild(child);

  it('finds child in parent', () => {
    expect(isOrContains(parent, child)).toBeTruthy();
  });

  it('finds child in child', () => {
    expect(isOrContains(child, child)).toBeTruthy();
  });

  it('does not find parent in child', () => {
    expect(isOrContains(child, parent)).toBeFalsy();
  });
});

describe('findRef', () => {
  const parent = document.createElement('div');
  const fooChild = document.createElement('div');
  fooChild.setAttribute('ref', 'foo');
  parent.appendChild(fooChild);
  const barChild = document.createElement('div');
  barChild.setAttribute('ref', 'bar');
  parent.appendChild(barChild);

  it('should find refs in parent divs', () => {
    expect(findRef(parent, 'foo')).toEqual(fooChild);
    expect(findRef(parent, 'bar')).toEqual(barChild);
  });

  it('should find refs in self divs', () => {
    expect(findRef(fooChild, 'foo')).toEqual(fooChild);
    expect(findRef(barChild, 'bar')).toEqual(barChild);
  });

  it('should fail to find ref in unrelated divs', () => {
    const unrelated = document.createElement('div');
    expect(findRef(unrelated, 'foo')).toBeNull();
    expect(findRef(fooChild, 'bar')).toBeNull();
    expect(findRef(barChild, 'foo')).toBeNull();
  });
});

describe('toHTMLElement', () => {
  it('should convert a div to an HTMLElement', () => {
    const divElement: Element = document.createElement('div');
    expect(toHTMLElement(divElement)).toEqual(divElement);
  });

  it('should fail to convert an svg element to an HTMLElement', () => {
    const svgElement =
        document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expect(() => toHTMLElement(svgElement)).toThrow(Error);
  });
});
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {classNames} from '../classnames';

export interface SwitchAttrs {
  // Optional text to show to the right of the switch.
  // If omitted, no text will be shown.
  label?: string;
  // Whether the switch is checked or not.
  // If omitted, the switch will be uncontrolled.
  checked?: boolean;
  // Make the switch appear greyed out block any interaction with it.
  // No events will be fired when interacting with it.
  // Defaults to false.
  disabled?: boolean;
  // Remaining attributes forwarded to the underlying HTML <label>.
  [htmlAttrs: string]: any;
}

export class Switch implements m.ClassComponent<SwitchAttrs> {
  view({attrs}: m.CVnode<SwitchAttrs>) {
    const {label, checked, disabled = false, ...htmlAttrs} = attrs;

    const classes = classNames(
        disabled && 'pf-disabled',
    );

    // The default checkbox is removed and an entirely new one created inside
    // the span element in CSS.
    return m(
        'label.pf-switch',
        {class: classes, ...htmlAttrs},
        m('input[type=checkbox]', {disabled, checked}),
        m('span'),
        label,
    );
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {globals} from '../globals';
import {DESELECT, SELECT_ALL} from '../icons';
import {Button} from './button';
import {Checkbox} from './checkbox';
import {EmptyState} from './empty_state';
import {Popup, PopupPosition} from './popup';
import {TextInput} from './text_input';

export interface Option {
  // The ID is used to indentify this option, and is used in callbacks.
  id: string;
  // This is the name displayed and used for searching.
  name: string;
  // Whether the option is selected or not.
  checked: boolean;
}

export interface MultiSelectDiff {
  id: string;
  checked: boolean;
}

export interface MultiSelectAttrs {
  icon?: string;
  label: string;
  options: Option[];
  onChange?: (diffs: MultiSelectDiff[]) => void;
  repeatCheckedItemsAtTop?: boolean;
  showNumSelected?: boolean;
  popupPosition?: PopupPosition;
}

// A component which shows a list of items with checkboxes, allowing the user to
// select from the list which ones they want to be selected.
// Also provides search functionality.
// This component is entirely controlled and callbacks must be supplied for when
// the selected items changes, and when the search term changes.
// There is an optional boolean flag to enable repeating the selected items at
// the top of the list for easy access - defaults to false.
export class MultiSelect implements m.ClassComponent<MultiSelectAttrs> {
  private searchText: string = '';
  view({attrs}: m.CVnode<MultiSelectAttrs>) {
    const {
      icon,
      popupPosition = PopupPosition.Auto,
    } = attrs;

    return m(
        Popup,
        {
          trigger: m(Button, {label: this.labelText(attrs), icon}),
          position: popupPosition,
        },
        this.renderPopup(attrs),
    );
  }

  private labelText(attrs: MultiSelectAttrs): string {
    const {
      options,
      showNumSelected,
      label,
    } = attrs;

    if (showNumSelected) {
      const numSelected = options.filter(({checked}) => checked).length;
      return `${label} (${numSelected} selected)`;
    } else {
      return label;
    }
  }

  private renderPopup(attrs: MultiSelectAttrs) {
    const {
      options,
    } = attrs;

    const filteredItems = options.filter(({name}) => {
      return name.toLowerCase().includes(this.searchText.toLowerCase());
    });

    return m(
        '.pf-multiselect-popup',
        this.renderSearchBox(),
        this.renderListOfItems(attrs, filteredItems),
    );
  }

  private renderListOfItems(attrs: MultiSelectAttrs, options: Option[]) {
    const {
      repeatCheckedItemsAtTop,
      onChange = () => {},
    } = attrs;
    const allChecked = options.every(({checked}) => checked);
    const anyChecked = options.some(({checked}) => checked);

    if (options.length === 0) {
      return m(EmptyState, {
        header: `No results for '${this.searchText}'`,
      });
    } else {
      return [m(
          '.pf-list',
          repeatCheckedItemsAtTop && anyChecked &&
              m(
                  '.pf-multiselect-container',
                  m(
                      '.pf-multiselect-header',
                      m('span',
                        this.searchText === '' ? 'Selected' :
                                                 `Selected (Filtered)`),
                      m(Button, {
                        label: this.searchText === '' ? 'Clear All' :
                                                        'Clear Filtered',
                        icon: DESELECT,
                        minimal: true,
                        onclick: () => {
                          const diffs =
                              options.filter(({checked}) => checked)
                                  .map(({id}) => ({id, checked: false}));
                          onChange(diffs);
                          globals.rafScheduler.scheduleFullRedraw();
                        },
                        disabled: !anyChecked,
                      }),
                      ),
                  this.renderOptions(
                      attrs, options.filter(({checked}) => checked)),
                  ),
          m(
              '.pf-multiselect-container',
              m(
                  '.pf-multiselect-header',
                  m('span',
                    this.searchText === '' ? 'Options' : `Options (Filtered)`),
                  m(Button, {
                    label: this.searchText === '' ? 'Select All' :
                                                    'Select Filtered',
                    icon: SELECT_ALL,
                    minimal: true,
                    compact: true,
                    onclick: () => {
                      const diffs = options.filter(({checked}) => !checked)
                                        .map(({id}) => ({id, checked: true}));
                      onChange(diffs);
                      globals.rafScheduler.scheduleFullRedraw();
                    },
                    disabled: allChecked,
                  }),
                  m(Button, {
                    label: this.searchText === '' ? 'Clear All' :
                                                    'Clear Filtered',
                    icon: DESELECT,
                    minimal: true,
                    compact: true,
                    onclick: () => {
                      const diffs = options.filter(({checked}) => checked)
                                        .map(({id}) => ({id, checked: false}));
                      onChange(diffs);
                      globals.rafScheduler.scheduleFullRedraw();
                    },
                    disabled: !anyChecked,
                  }),
                  ),
              this.renderOptions(attrs, options),
              ),
          )];
    }
  }

  private renderSearchBox() {
    return m(
        '.pf-search-bar',
        m(TextInput, {
          oninput: (event: Event) => {
            const eventTarget = event.target as HTMLTextAreaElement;
            this.searchText = eventTarget.value;
            globals.rafScheduler.scheduleFullRedraw();
          },
          value: this.searchText,
          placeholder: 'Filter options...',
          extraClasses: 'pf-search-box',
        }),
        this.renderClearButton(),
    );
  }

  private renderClearButton() {
    if (this.searchText != '') {
      return m(Button, {
        onclick: () => {
          this.searchText = '';
          globals.rafScheduler.scheduleFullRedraw();
        },
        label: '',
        icon: 'close',
        minimal: true,
      });
    } else {
      return null;
    }
  }

  private renderOptions(attrs: MultiSelectAttrs, options: Option[]) {
    const {
      onChange = () => {},
    } = attrs;

    return options.map((item) => {
      const {checked, name, id} = item;
      return m(Checkbox, {
        label: name,
        key: id,  // Prevents transitions jumping between items when searching
        checked,
        classes: 'pf-multiselect-item',
        onchange: () => {
          onChange([{id, checked: !checked}]);
          globals.rafScheduler.scheduleFullRedraw();
        },
      });
    });
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {fromNs, timeToCode} from '../../common/time';

interface DurationAttrs {
  dur: number;
}

export class Duration implements m.ClassComponent<DurationAttrs> {
  view(vnode: m.Vnode<DurationAttrs>) {
    return timeToCode(fromNs(vnode.attrs.dur));
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

type Style = string|Partial<CSSStyleDeclaration>;

export interface MountOptions {
  // Optionally specify an element in which to place our portal.
  // Defaults to body.
  container?: Element;
}

export interface PortalAttrs {
  // Space delimited class list forwarded to our portal element.
  className?: string;
  // Inline styles forwarded to our portal element.
  style?: Style;
  // Called before our portal is created, allowing customization of where in the
  // DOM the portal is mounted.
  // The dom parameter is a dummy element representing where the portal would be
  // located if it were rendered into the normal tree hierarchy.
  onBeforeContentMount?: (dom: Element) => MountOptions;
  // Called after our portal is created and its content rendered.
  onContentMount?: (portalElement: HTMLElement) => void;
  // Called after our portal's content is updated.
  onContentUpdate?: (portalElement: HTMLElement) => void;
  // Called before our portal is removed.
  onContentUnmount?: (portalElement: HTMLElement) => void;
}

// A portal renders children into a a div outside of the normal hierarchy of the
// parent component, usually in order to stack elements on top of others.
// Useful for creating overlays, dialogs, and popups.
export class Portal implements m.ClassComponent<PortalAttrs> {
  private portalElement?: HTMLElement;
  private containerElement?: Element;

  view() {
    // Dummy element renders nothing but permits DOM access in lifecycle hooks.
    return m('span', {style: {display: 'none'}});
  }

  oncreate({attrs, children, dom}: m.VnodeDOM<PortalAttrs, this>) {
    const {
      onContentMount = () => {},
      onBeforeContentMount = (): MountOptions => ({}),
    } = attrs;

    const {container = document.body} = onBeforeContentMount(dom);
    this.containerElement = container;

    this.portalElement = document.createElement('div');
    container.appendChild(this.portalElement);
    this.applyPortalProps(attrs);

    m.render(this.portalElement, children);

    onContentMount(this.portalElement);
  }

  onupdate({attrs, children}: m.VnodeDOM<PortalAttrs, this>) {
    const {onContentUpdate = () => {}} = attrs;
    if (this.portalElement) {
      this.applyPortalProps(attrs);
      m.render(this.portalElement, children);
      onContentUpdate(this.portalElement);
    }
  }

  private applyPortalProps(attrs: PortalAttrs) {
    if (this.portalElement) {
      this.portalElement.className = attrs.className ?? '';
      Object.assign(this.portalElement.style, attrs.style);
    }
  }

  onremove({attrs}: m.VnodeDOM<PortalAttrs, this>) {
    const {onContentUnmount = () => {}} = attrs;
    const container = this.containerElement ?? document.body;
    if (this.portalElement) {
      if (container.contains(this.portalElement)) {
        onContentUnmount(this.portalElement);
        // Rendering null ensures previous vnodes are removed properly.
        m.render(this.portalElement, null);
        container.removeChild(this.portalElement);
      }
    }
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {classNames} from '../classnames';

export interface TextInputAttrs {
  [htmlAttrs: string]: any;
  extraClasses?: string|string[];
}

// For now, this component is just a simple wrapper around a plain old input
// element, which does no more than specify a class. However, in the future we
// might want to add more features such as an optional icon or button (e.g. a
// clear button), at which point the benefit of having this as a component would
// become more apparent.
export class TextInput implements m.ClassComponent<TextInputAttrs> {
  view({attrs}: m.CVnode<TextInputAttrs>) {
    const {extraClasses = '', ...htmlAttrs} = attrs;
    const classes = classNames(extraClasses);
    return m('input.pf-text-input', {
      class: classes,
      // Stop keydown events from triggering hotkeys
      onkeydown: (e: Event) => e.stopPropagation(),
      ...htmlAttrs,
    });
  }
}
import m from 'mithril';
import {classNames} from '../classnames';
import {globals} from '../globals';
import {Button} from './button';
import {hasChildren} from './utils';

export enum TreeLayout {
  // Classic heirachical tree layout with no columnar alignment.
  // Example:
  // foo: bar
  //  ├ baz: qux
  //  └ quux: corge
  // grault: garply
  Tree = 'tree',

  // Heirachical tree layout but right values are horizontally aligned.
  // Example:
  // foo     bar
  //  ├ baz  qux
  //  └ quux corge
  // grault  garply
  Grid = 'grid',
}

interface TreeAttrs {
  // The style of layout.
  // Defaults to grid.
  layout?: TreeLayout;
  // Space delimited class list applied to our tree element.
  className?: string;
}

export class Tree implements m.ClassComponent<TreeAttrs> {
  view({attrs, children}: m.Vnode<TreeAttrs>): m.Children {
    const {
      layout: style = TreeLayout.Grid,
      className = '',
    } = attrs;

    if (style === TreeLayout.Grid) {
      return m('.pf-ptree-grid', {class: className}, children);
    } else if (style === TreeLayout.Tree) {
      return m('.pf-ptree', {class: className}, children);
    } else {
      return null;
    }
  }
}

interface TreeNodeAttrs {
  // Content to display on the left hand column.
  // If omitted, this side will be blank.
  left?: m.Child;
  // Content to display on the right hand column.
  // If omitted, this side will be left blank.
  right?: m.Child;
  // Whether this node is collapsed or not.
  // If omitted, collapsed state 'uncontrolled' - i.e. controlled internally.
  collapsed?: boolean;
  // Called when the collapsed state is changed, mainly used in controlled mode.
  onCollapseChanged?: (collapsed: boolean, attrs: TreeNodeAttrs) => void;
}

export class TreeNode implements m.ClassComponent<TreeNodeAttrs> {
  private collapsed = false;
  view(vnode: m.CVnode<TreeNodeAttrs>): m.Children {
    return [
      m(
          '.pf-tree-node',
          this.renderLeft(vnode),
          this.renderRight(vnode),
          ),
      hasChildren(vnode) && this.renderChildren(vnode),
    ];
  }

  private renderLeft(vnode: m.CVnode<TreeNodeAttrs>) {
    const {
      attrs: {left},
    } = vnode;

    return m(
        '.pf-tree-left',
        left,
        hasChildren(vnode) && this.renderCollapseButton(vnode),
    );
  }

  private renderRight({attrs: {right}}: m.CVnode<TreeNodeAttrs>) {
    return m('.pf-tree-right', right);
  }

  private renderChildren(vnode: m.CVnode<TreeNodeAttrs>) {
    const {children} = vnode;

    return m(
        '.pf-tree-children',
        {
          class: classNames(this.isCollapsed(vnode) && 'pf-pgrid-hidden'),
        },
        children,
    );
  }

  private renderCollapseButton(vnode: m.Vnode<TreeNodeAttrs>) {
    const {attrs, attrs: {onCollapseChanged = () => {}}} = vnode;

    return m(Button, {
      icon: this.isCollapsed(vnode) ? 'chevron_right' : 'expand_more',
      minimal: true,
      compact: true,
      onclick: () => {
        this.collapsed = !this.isCollapsed(vnode);
        onCollapseChanged(this.collapsed, attrs);
        globals.rafScheduler.scheduleFullRedraw();
      },
    });
  }

  private isCollapsed({attrs}: m.Vnode<TreeNodeAttrs>): boolean {
    // If collapsed is omitted, use our local collapsed state instead.
    const {
      collapsed = this.collapsed,
    } = attrs;

    return collapsed;
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';
import {classNames} from '../classnames';

export interface IconAttrs {
  // The material icon name.
  icon: string;
  // Whether to show the filled version of the icon.
  // Defaults to false.
  filled?: boolean;
  // List of space separated class names forwarded to the icon.
  className?: string;
}

export class Icon implements m.ClassComponent<IconAttrs> {
  view(vnode: m.Vnode<IconAttrs>): m.Child {
    const classes = classNames(vnode.attrs.className);
    return m(
        vnode.attrs.filled ? 'i.material-icons-filled' : 'i.material-icons',
        {class: classes},
        vnode.attrs.icon);
  }
}

// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {Actions} from '../common/actions';
import {globals} from './globals';
import {PanelContainer} from './panel_container';

// Shorthand for if globals perf debug mode is on.
export const perfDebug = () => globals.state.perfDebug;

// Returns performance.now() if perfDebug is enabled, otherwise 0.
// This is needed because calling performance.now is generally expensive
// and should not be done for every frame.
export const debugNow = () => perfDebug() ? performance.now() : 0;

// Returns execution time of |fn| if perf debug mode is on. Returns 0 otherwise.
export function measure(fn: () => void): number {
  const start = debugNow();
  fn();
  return debugNow() - start;
}

// Stores statistics about samples, and keeps a fixed size buffer of most recent
// samples.
export class RunningStatistics {
  private _count = 0;
  private _mean = 0;
  private _lastValue = 0;
  private _ptr = 0;

  private buffer: number[] = [];

  constructor(private _maxBufferSize = 10) {}

  addValue(value: number) {
    this._lastValue = value;
    if (this.buffer.length >= this._maxBufferSize) {
      this.buffer[this._ptr++] = value;
      if (this._ptr >= this.buffer.length) {
        this._ptr -= this.buffer.length;
      }
    } else {
      this.buffer.push(value);
    }

    this._mean = (this._mean * this._count + value) / (this._count + 1);
    this._count++;
  }

  get mean() {
    return this._mean;
  }
  get count() {
    return this._count;
  }
  get bufferMean() {
    return this.buffer.reduce((sum, v) => sum + v, 0) / this.buffer.length;
  }
  get bufferSize() {
    return this.buffer.length;
  }
  get maxBufferSize() {
    return this._maxBufferSize;
  }
  get last() {
    return this._lastValue;
  }
}

// Returns a summary string representation of a RunningStatistics object.
export function runningStatStr(stat: RunningStatistics) {
  return `Last: ${stat.last.toFixed(2)}ms | ` +
      `Avg: ${stat.mean.toFixed(2)}ms | ` +
      `Avg${stat.maxBufferSize}: ${stat.bufferMean.toFixed(2)}ms`;
}

// Globals singleton class that renders performance stats for the whole app.
class PerfDisplay {
  private containers: PanelContainer[] = [];
  addContainer(container: PanelContainer) {
    this.containers.push(container);
  }

  removeContainer(container: PanelContainer) {
    const i = this.containers.indexOf(container);
    this.containers.splice(i, 1);
  }

  renderPerfStats() {
    if (!perfDebug()) return;
    const perfDisplayEl = document.querySelector('.perf-stats');
    if (!perfDisplayEl) return;
    m.render(perfDisplayEl, [
      m('section', globals.rafScheduler.renderPerfStats()),
      m('button.close-button',
        {
          onclick: () => globals.dispatch(Actions.togglePerfDebug({})),
        },
        m('i.material-icons', 'close')),
      this.containers.map((c, i) => m('section', c.renderPerfStats(i))),
    ]);
  }
}

export const perfDisplay = new PerfDisplay();
// Copyright (C) 2019 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use size file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {timeToString} from '../common/time';
import {TimeSpan} from '../common/time';

import {
  BACKGROUND_COLOR,
  FOREGROUND_COLOR,
  TRACK_SHELL_WIDTH,
} from './css_constants';
import {globals} from './globals';
import {
  TickGenerator,
  TickType,
  timeScaleForVisibleWindow,
} from './gridline_helper';
import {Panel, PanelSize} from './panel';

export interface BBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Draws a vertical line with two horizontal tails at the left and right and
// a label in the middle. It looks a bit like a stretched H:
// |--- Label ---|
// The |target| bounding box determines where to draw the H.
// The |bounds| bounding box gives the visible region, this is used to adjust
// the positioning of the label to ensure it is on screen.
function drawHBar(
    ctx: CanvasRenderingContext2D, target: BBox, bounds: BBox, label: string) {
  ctx.fillStyle = FOREGROUND_COLOR;

  const xLeft = Math.floor(target.x);
  const xRight = Math.ceil(target.x + target.width);
  const yMid = Math.floor(target.height / 2 + target.y);
  const xWidth = xRight - xLeft;

  // Don't draw in the track shell.
  ctx.beginPath();
  ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
  ctx.clip();

  // Draw horizontal bar of the H.
  ctx.fillRect(xLeft, yMid, xWidth, 1);
  // Draw left vertical bar of the H.
  ctx.fillRect(xLeft, target.y, 1, target.height);
  // Draw right vertical bar of the H.
  ctx.fillRect(xRight, target.y, 1, target.height);

  const labelWidth = ctx.measureText(label).width;

  // Find a good position for the label:
  // By default put the label in the middle of the H:
  let labelXLeft = Math.floor(xWidth / 2 - labelWidth / 2 + xLeft);

  if (labelWidth > target.width || labelXLeft < bounds.x ||
      (labelXLeft + labelWidth) > (bounds.x + bounds.width)) {
    // It won't fit in the middle or would be at least partly out of bounds
    // so put it either to the left or right:
    if (xRight > bounds.x + bounds.width) {
      // If the H extends off the right side of the screen the label
      // goes on the left of the H.
      labelXLeft = xLeft - labelWidth - 3;
    } else {
      // Otherwise the label goes on the right of the H.
      labelXLeft = xRight + 3;
    }
  }

  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(labelXLeft - 1, 0, labelWidth + 1, target.height);

  ctx.textBaseline = 'middle';
  ctx.fillStyle = FOREGROUND_COLOR;
  ctx.font = '10px Roboto Condensed';
  ctx.fillText(label, labelXLeft, yMid);
}

function drawIBar(
    ctx: CanvasRenderingContext2D, xPos: number, bounds: BBox, label: string) {
  if (xPos < bounds.x) return;

  ctx.fillStyle = FOREGROUND_COLOR;
  ctx.fillRect(xPos, 0, 1, bounds.width);

  const yMid = Math.floor(bounds.height / 2 + bounds.y);
  const labelWidth = ctx.measureText(label).width;
  const padding = 3;

  let xPosLabel;
  if (xPos + padding + labelWidth > bounds.width) {
    xPosLabel = xPos - padding;
    ctx.textAlign = 'right';
  } else {
    xPosLabel = xPos + padding;
    ctx.textAlign = 'left';
  }

  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(xPosLabel - 1, 0, labelWidth + 2, bounds.height);

  ctx.textBaseline = 'middle';
  ctx.fillStyle = FOREGROUND_COLOR;
  ctx.font = '10px Roboto Condensed';
  ctx.fillText(label, xPosLabel, yMid);
}

export class TimeSelectionPanel extends Panel {
  view() {
    return m('.time-selection-panel');
  }

  renderCanvas(ctx: CanvasRenderingContext2D, size: PanelSize) {
    ctx.fillStyle = '#999';
    ctx.fillRect(TRACK_SHELL_WIDTH - 2, 0, 2, size.height);
    const scale = timeScaleForVisibleWindow(TRACK_SHELL_WIDTH, size.width);
    if (scale.timeSpan.duration > 0 && scale.widthPx > 0) {
      for (const {position, type} of new TickGenerator(scale)) {
        if (type === TickType.MAJOR) {
          ctx.fillRect(position, 0, 1, size.height);
        }
      }
    }

    const localArea = globals.frontendLocalState.selectedArea;
    const selection = globals.state.currentSelection;
    if (localArea !== undefined) {
      const start = Math.min(localArea.startSec, localArea.endSec);
      const end = Math.max(localArea.startSec, localArea.endSec);
      this.renderSpan(ctx, size, new TimeSpan(start, end));
    } else if (selection !== null && selection.kind === 'AREA') {
      const selectedArea = globals.state.areas[selection.areaId];
      const start = Math.min(selectedArea.startSec, selectedArea.endSec);
      const end = Math.max(selectedArea.startSec, selectedArea.endSec);
      this.renderSpan(ctx, size, new TimeSpan(start, end));
    }

    if (globals.state.hoverCursorTimestamp !== -1) {
      this.renderHover(ctx, size, globals.state.hoverCursorTimestamp);
    }

    for (const note of Object.values(globals.state.notes)) {
      const noteIsSelected = selection !== null && selection.kind === 'AREA' &&
          selection.noteId === note.id;
      if (note.noteType === 'AREA' && !noteIsSelected) {
        const selectedArea = globals.state.areas[note.areaId];
        this.renderSpan(
            ctx,
            size,
            new TimeSpan(selectedArea.startSec, selectedArea.endSec));
      }
    }
  }

  renderHover(ctx: CanvasRenderingContext2D, size: PanelSize, ts: number) {
    const timeScale = globals.frontendLocalState.timeScale;
    const xPos = TRACK_SHELL_WIDTH + Math.floor(timeScale.timeToPx(ts));
    const offsetTime = timeToString(ts - globals.state.traceTime.startSec);
    const timeFromStart = timeToString(ts);
    const label = `${offsetTime} (${timeFromStart})`;
    drawIBar(ctx, xPos, this.bounds(size), label);
  }

  renderSpan(ctx: CanvasRenderingContext2D, size: PanelSize, span: TimeSpan) {
    const timeScale = globals.frontendLocalState.timeScale;
    const xLeft = timeScale.timeToPx(span.start);
    const xRight = timeScale.timeToPx(span.end);
    const label = timeToString(span.duration);
    drawHBar(
        ctx,
        {
          x: TRACK_SHELL_WIDTH + xLeft,
          y: 0,
          width: xRight - xLeft,
          height: size.height,
        },
        this.bounds(size),
        label);
  }

  private bounds(size: PanelSize): BBox {
    return {
      x: TRACK_SHELL_WIDTH,
      y: 0,
      width: size.width - TRACK_SHELL_WIDTH,
      height: size.height,
    };
  }
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import m from 'mithril';

import {assertExists, assertTrue} from '../base/logging';
import {Actions} from '../common/actions';
import {getCurrentChannel} from '../common/channels';
import {TRACE_SUFFIX} from '../common/constants';
import {ConversionJobStatus} from '../common/conversion_jobs';
import {Engine} from '../common/engine';
import {featureFlags} from '../common/feature_flags';
import {
  disableMetatracingAndGetTrace,
  enableMetatracing,
  isMetatracingEnabled,
} from '../common/metatracing';
import {EngineMode, TraceArrayBufferSource} from '../common/state';
import {SCM_REVISION, VERSION} from '../gen/perfetto_version';

import {Animation} from './animation';
import {onClickCopy} from './clipboard';
import {downloadData, downloadUrl} from './download_utils';
import {globals} from './globals';
import {toggleHelp} from './help_modal';
import {
  isLegacyTrace,
  openFileWithLegacyTraceViewer,
} from './legacy_trace_viewer';
import {showModal} from './modal';
import {runQueryInNewTab} from './query_result_tab';
import {Router} from './router';
import {isDownloadable, isShareable} from './trace_attrs';
import {
  convertToJson,
  convertTraceToJsonAndDownload,
  convertTraceToSystraceAndDownload,
} from './trace_converter';

const ALL_PROCESSES_QUERY = 'select name, pid from process order by name;';

const CPU_TIME_FOR_PROCESSES = `
select
  process.name,
  sum(dur)/1e9 as cpu_sec
from sched
join thread using(utid)
join process using(upid)
group by upid
order by cpu_sec desc
limit 100;`;

const CYCLES_PER_P_STATE_PER_CPU = `
select
  cpu,
  freq,
  dur,
  sum(dur * freq)/1e6 as mcycles
from (
  select
    cpu,
    value as freq,
    lead(ts) over (partition by cpu order by ts) - ts as dur
  from counter
  inner join cpu_counter_track on counter.track_id = cpu_counter_track.id
  where name = 'cpufreq'
) group by cpu, freq
order by mcycles desc limit 32;`;

const CPU_TIME_BY_CPU_BY_PROCESS = `
select
  process.name as process,
  thread.name as thread,
  cpu,
  sum(dur) / 1e9 as cpu_sec
from sched
inner join thread using(utid)
inner join process using(upid)
group by utid, cpu
order by cpu_sec desc
limit 30;`;

const HEAP_GRAPH_BYTES_PER_TYPE = `
select
  o.upid,
  o.graph_sample_ts,
  c.name,
  sum(o.self_size) as total_self_size
from heap_graph_object o join heap_graph_class c on o.type_id = c.id
group by
 o.upid,
 o.graph_sample_ts,
 c.name
order by total_self_size desc
limit 100;`;

const SQL_STATS = `
with first as (select started as ts from sqlstats limit 1)
select
    round((max(ended - started, 0))/1e6) as runtime_ms,
    round((started - first.ts)/1e6) as t_start_ms,
    query
from sqlstats, first
order by started desc`;

const GITILES_URL =
    'https://android.googlesource.com/platform/external/perfetto';

let lastTabTitle = '';

function getBugReportUrl(): string {
  if (globals.isInternalUser) {
    return 'https://goto.google.com/perfetto-ui-bug';
  } else {
    return 'https://github.com/google/perfetto/issues/new';
  }
}

const HIRING_BANNER_FLAG = featureFlags.register({
  id: 'showHiringBanner',
  name: 'Show hiring banner',
  description: 'Show the "We\'re hiring" banner link in the side bar.',
  defaultValue: false,
});

const WIDGETS_PAGE_IN_NAV_FLAG = featureFlags.register({
  id: 'showWidgetsPageInNav',
  name: 'Show widgets page',
  description: 'Show a link to the widgets page in the side bar.',
  defaultValue: false,
});

function shouldShowHiringBanner(): boolean {
  return globals.isInternalUser && HIRING_BANNER_FLAG.get();
}

function createCannedQuery(query: string, title: string): (_: Event) => void {
  return (e: Event) => {
    e.preventDefault();
    runQueryInNewTab(query, title);
  };
}

const EXAMPLE_ANDROID_TRACE_URL =
    'https://storage.googleapis.com/perfetto-misc/example_android_trace_15s';

const EXAMPLE_CHROME_TRACE_URL =
    'https://storage.googleapis.com/perfetto-misc/chrome_example_wikipedia.perfetto_trace.gz';

interface SectionItem {
  t: string;
  a: string|((e: Event) => void);
  i: string;
  isPending?: () => boolean;
  isVisible?: () => boolean;
  internalUserOnly?: boolean;
  checkDownloadDisabled?: boolean;
  checkMetatracingEnabled?: boolean;
  checkMetatracingDisabled?: boolean;
}

interface Section {
  title: string;
  summary: string;
  items: SectionItem[];
  expanded?: boolean;
  hideIfNoTraceLoaded?: boolean;
  appendOpenedTraceTitle?: boolean;
}

const SECTIONS: Section[] = [

  {
    title: 'Navigation',
    summary: 'Open or record a new trace',
    expanded: true,
    items: [
      {t: 'Open trace file', a: popupFileSelectionDialog, i: 'folder_open'},
      {
        t: 'Open with legacy UI',
        a: popupFileSelectionDialogOldUI,
        i: 'filter_none',
      },
      {t: 'Record new trace', a: navigateRecord, i: 'fiber_smart_record'},
      {
        t: 'Widgets',
        a: navigateWidgets,
        i: 'widgets',
        isVisible: () => WIDGETS_PAGE_IN_NAV_FLAG.get(),
      },
    ],
  },

  {
    title: 'Current Trace',
    summary: 'Actions on the current trace',
    expanded: true,
    hideIfNoTraceLoaded: true,
    appendOpenedTraceTitle: true,
    items: [
      {t: 'Show timeline', a: navigateViewer, i: 'line_style'},
      {
        t: 'Share',
        a: shareTrace,
        i: 'share',
        internalUserOnly: true,
        isPending: () => globals.getConversionJobStatus('create_permalink') ===
            ConversionJobStatus.InProgress,
      },
      {
        t: 'Download',
        a: downloadTrace,
        i: 'file_download',
        checkDownloadDisabled: true,
      },
      {t: 'Query (SQL)', a: navigateAnalyze, i: 'control_camera'},
      {t: 'Metrics', a: navigateMetrics, i: 'speed'},
      {t: 'Info and stats', a: navigateInfo, i: 'info'},
    ],
  },

  {
    title: 'Convert trace',
    summary: 'Convert to other formats',
    expanded: true,
    hideIfNoTraceLoaded: true,
    items: [
      {
        t: 'Switch to legacy UI',
        a: openCurrentTraceWithOldUI,
        i: 'filter_none',
        isPending: () => globals.getConversionJobStatus('open_in_legacy') ===
            ConversionJobStatus.InProgress,
      },
      {
        t: 'Convert to .json',
        a: convertTraceToJson,
        i: 'file_download',
        isPending: () => globals.getConversionJobStatus('convert_json') ===
            ConversionJobStatus.InProgress,
        checkDownloadDisabled: true,
      },

      {
        t: 'Convert to .systrace',
        a: convertTraceToSystrace,
        i: 'file_download',
        isVisible: () => globals.hasFtrace,
        isPending: () => globals.getConversionJobStatus('convert_systrace') ===
            ConversionJobStatus.InProgress,
        checkDownloadDisabled: true,
      },

    ],
  },

  {
    title: 'Example Traces',
    expanded: true,
    summary: 'Open an example trace',
    items: [
      {
        t: 'Open Android example',
        a: openTraceUrl(EXAMPLE_ANDROID_TRACE_URL),
        i: 'description',
      },
      {
        t: 'Open Chrome example',
        a: openTraceUrl(EXAMPLE_CHROME_TRACE_URL),
        i: 'description',
      },
    ],
  },

  {
    title: 'Support',
    expanded: true,
    summary: 'Documentation & Bugs',
    items: [
      {t: 'Keyboard shortcuts', a: openHelp, i: 'help'},
      {t: 'Documentation', a: 'https://perfetto.dev/docs', i: 'find_in_page'},
      {t: 'Flags', a: navigateFlags, i: 'emoji_flags'},
      {
        t: 'Report a bug',
        a: () => window.open(getBugReportUrl()),
        i: 'bug_report',
      },
    ],
  },

  {
    title: 'Sample queries',
    summary: 'Compute summary statistics',
    items: [
      {
        t: 'Record metatrace',
        a: recordMetatrace,
        i: 'fiber_smart_record',
        checkMetatracingDisabled: true,
      },
      {
        t: 'Finalise metatrace',
        a: finaliseMetatrace,
        i: 'file_download',
        checkMetatracingEnabled: true,
      },
      {
        t: 'All Processes',
        a: createCannedQuery(ALL_PROCESSES_QUERY, 'All Processes'),
        i: 'search',
      },
      {
        t: 'CPU Time by process',
        a: createCannedQuery(CPU_TIME_FOR_PROCESSES, 'CPU Time by process'),
        i: 'search',
      },
      {
        t: 'Cycles by p-state by CPU',
        a: createCannedQuery(
            CYCLES_PER_P_STATE_PER_CPU, 'Cycles by p-state by CPU'),
        i: 'search',
      },
      {
        t: 'CPU Time by CPU by process',
        a: createCannedQuery(
            CPU_TIME_BY_CPU_BY_PROCESS, 'CPU Time by CPU by process'),
        i: 'search',
      },
      {
        t: 'Heap Graph: Bytes per type',
        a: createCannedQuery(
            HEAP_GRAPH_BYTES_PER_TYPE, 'Heap Graph: Bytes per type'),
        i: 'search',
      },
      {
        t: 'Debug SQL performance',
        a: createCannedQuery(SQL_STATS, 'Recent SQL queries'),
        i: 'bug_report',
      },
    ],
  },

];

function openHelp(e: Event) {
  e.preventDefault();
  toggleHelp();
}

function getFileElement(): HTMLInputElement {
  return assertExists(
      document.querySelector<HTMLInputElement>('input[type=file]'));
}

function popupFileSelectionDialog(e: Event) {
  e.preventDefault();
  delete getFileElement().dataset['useCatapultLegacyUi'];
  getFileElement().click();
}

function popupFileSelectionDialogOldUI(e: Event) {
  e.preventDefault();
  getFileElement().dataset['useCatapultLegacyUi'] = '1';
  getFileElement().click();
}

function downloadTraceFromUrl(url: string): Promise<File> {
  return m.request({
    method: 'GET',
    url,
    // TODO(hjd): Once mithril is updated we can use responseType here rather
    // than using config and remove the extract below.
    config: (xhr) => {
      xhr.responseType = 'blob';
      xhr.onprogress = (progress) => {
        const percent = (100 * progress.loaded / progress.total).toFixed(1);
        globals.dispatch(Actions.updateStatus({
          msg: `Downloading trace ${percent}%`,
          timestamp: Date.now() / 1000,
        }));
      };
    },
    extract: (xhr) => {
      return xhr.response;
    },
  });
}

export async function getCurrentTrace(): Promise<Blob> {
  // Caller must check engine exists.
  const engine = assertExists(globals.getCurrentEngine());
  const src = engine.source;
  if (src.type === 'ARRAY_BUFFER') {
    return new Blob([src.buffer]);
  } else if (src.type === 'FILE') {
    return src.file;
  } else if (src.type === 'URL') {
    return downloadTraceFromUrl(src.url);
  } else {
    throw new Error(`Loading to catapult from source with type ${src.type}`);
  }
}

function openCurrentTraceWithOldUI(e: Event) {
  e.preventDefault();
  assertTrue(isTraceLoaded());
  globals.logging.logEvent('Trace Actions', 'Open current trace in legacy UI');
  if (!isTraceLoaded) return;
  getCurrentTrace()
      .then((file) => {
        openInOldUIWithSizeCheck(file);
      })
      .catch((error) => {
        throw new Error(`Failed to get current trace ${error}`);
      });
}

function convertTraceToSystrace(e: Event) {
  e.preventDefault();
  assertTrue(isTraceLoaded());
  globals.logging.logEvent('Trace Actions', 'Convert to .systrace');
  if (!isTraceLoaded) return;
  getCurrentTrace()
      .then((file) => {
        convertTraceToSystraceAndDownload(file);
      })
      .catch((error) => {
        throw new Error(`Failed to get current trace ${error}`);
      });
}

function convertTraceToJson(e: Event) {
  e.preventDefault();
  assertTrue(isTraceLoaded());
  globals.logging.logEvent('Trace Actions', 'Convert to .json');
  if (!isTraceLoaded) return;
  getCurrentTrace()
      .then((file) => {
        convertTraceToJsonAndDownload(file);
      })
      .catch((error) => {
        throw new Error(`Failed to get current trace ${error}`);
      });
}

export function isTraceLoaded(): boolean {
  return globals.getCurrentEngine() !== undefined;
}

function openTraceUrl(url: string): (e: Event) => void {
  return (e) => {
    globals.logging.logEvent('Trace Actions', 'Open example trace');
    e.preventDefault();
    globals.dispatch(Actions.openTraceFromUrl({url}));
  };
}

function onInputElementFileSelectionChanged(e: Event) {
  if (!(e.target instanceof HTMLInputElement)) {
    throw new Error('Not an input element');
  }
  if (!e.target.files) return;
  const file = e.target.files[0];
  // Reset the value so onchange will be fired with the same file.
  e.target.value = '';

  if (e.target.dataset['useCatapultLegacyUi'] === '1') {
    openWithLegacyUi(file);
    return;
  }

  globals.logging.logEvent('Trace Actions', 'Open trace from file');
  globals.dispatch(Actions.openTraceFromFile({file}));
}

async function openWithLegacyUi(file: File) {
  // Switch back to the old catapult UI.
  globals.logging.logEvent('Trace Actions', 'Open trace in Legacy UI');
  if (await isLegacyTrace(file)) {
    openFileWithLegacyTraceViewer(file);
    return;
  }
  openInOldUIWithSizeCheck(file);
}

function openInOldUIWithSizeCheck(trace: Blob) {
  // Perfetto traces smaller than 50mb can be safely opened in the legacy UI.
  if (trace.size < 1024 * 1024 * 50) {
    convertToJson(trace);
    return;
  }

  // Give the user the option to truncate larger perfetto traces.
  const size = Math.round(trace.size / (1024 * 1024));
  showModal({
    title: 'Legacy UI may fail to open this trace',
    content:
        m('div',
          m('p',
            `This trace is ${size}mb, opening it in the legacy UI ` +
                `may fail.`),
          m('p',
            'More options can be found at ',
            m('a',
              {
                href: 'https://goto.google.com/opening-large-traces',
                target: '_blank',
              },
              'go/opening-large-traces'),
            '.')),
    buttons: [
      {
        text: 'Open full trace (not recommended)',
        action: () => convertToJson(trace),
      },
      {
        text: 'Open beginning of trace',
        action: () => convertToJson(trace, /* truncate*/ 'start'),
      },
      {
        text: 'Open end of trace',
        primary: true,
        action: () => convertToJson(trace, /* truncate*/ 'end'),
      },
    ],
  });
  return;
}

function navigateRecord(e: Event) {
  e.preventDefault();
  Router.navigate('#!/record');
}

function navigateWidgets(e: Event) {
  e.preventDefault();
  Router.navigate('#!/widgets');
}

function navigateAnalyze(e: Event) {
  e.preventDefault();
  Router.navigate('#!/query');
}

function navigateFlags(e: Event) {
  e.preventDefault();
  Router.navigate('#!/flags');
}

function navigateMetrics(e: Event) {
  e.preventDefault();
  Router.navigate('#!/metrics');
}

function navigateInfo(e: Event) {
  e.preventDefault();
  Router.navigate('#!/info');
}

function navigateViewer(e: Event) {
  e.preventDefault();
  Router.navigate('#!/viewer');
}

function shareTrace(e: Event) {
  e.preventDefault();
  const engine = assertExists(globals.getCurrentEngine());
  const traceUrl = (engine.source as (TraceArrayBufferSource)).url || '';

  // If the trace is not shareable (has been pushed via postMessage()) but has
  // a url, create a pseudo-permalink by echoing back the URL.
  if (!isShareable()) {
    const msg =
        [m('p',
           'This trace was opened by an external site and as such cannot ' +
               'be re-shared preserving the UI state.')];
    if (traceUrl) {
      msg.push(m('p', 'By using the URL below you can open this trace again.'));
      msg.push(m('p', 'Clicking will copy the URL into the clipboard.'));
      msg.push(createTraceLink(traceUrl, traceUrl));
    }

    showModal({
      title: 'Cannot create permalink from external trace',
      content: m('div', msg),
    });
    return;
  }

  if (!isShareable() || !isTraceLoaded()) return;

  const result = confirm(
      `Upload UI state and generate a permalink. ` +
      `The trace will be accessible by anybody with the permalink.`);
  if (result) {
    globals.logging.logEvent('Trace Actions', 'Create permalink');
    globals.dispatch(Actions.createPermalink({isRecordingConfig: false}));
  }
}

function downloadTrace(e: Event) {
  e.preventDefault();
  if (!isDownloadable() || !isTraceLoaded()) return;
  globals.logging.logEvent('Trace Actions', 'Download trace');

  const engine = globals.getCurrentEngine();
  if (!engine) return;
  let url = '';
  let fileName = `trace${TRACE_SUFFIX}`;
  const src = engine.source;
  if (src.type === 'URL') {
    url = src.url;
    fileName = url.split('/').slice(-1)[0];
  } else if (src.type === 'ARRAY_BUFFER') {
    const blob = new Blob([src.buffer], {type: 'application/octet-stream'});
    const inputFileName =
        window.prompt('Please enter a name for your file or leave blank');
    if (inputFileName) {
      fileName = `${inputFileName}.perfetto_trace.gz`;
    } else if (src.fileName) {
      fileName = src.fileName;
    }
    url = URL.createObjectURL(blob);
  } else if (src.type === 'FILE') {
    const file = src.file;
    url = URL.createObjectURL(file);
    fileName = file.name;
  } else {
    throw new Error(`Download from ${JSON.stringify(src)} is not supported`);
  }
  downloadUrl(fileName, url);
}

function getCurrentEngine(): Engine|undefined {
  const engineId = globals.getCurrentEngine()?.id;
  if (engineId === undefined) return undefined;
  return globals.engines.get(engineId);
}

function highPrecisionTimersAvailable(): boolean {
  // High precision timers are available either when the page is cross-origin
  // isolated or when the trace processor is a standalone binary.
  return window.crossOriginIsolated ||
      globals.getCurrentEngine()?.mode === 'HTTP_RPC';
}

function recordMetatrace(e: Event) {
  e.preventDefault();
  globals.logging.logEvent('Trace Actions', 'Record metatrace');

  const engine = getCurrentEngine();
  if (!engine) return;

  if (!highPrecisionTimersAvailable()) {
    const PROMPT =
        `High-precision timers are not available to WASM trace processor yet.

Modern browsers restrict high-precision timers to cross-origin-isolated pages.
As Perfetto UI needs to open traces via postMessage, it can't be cross-origin
isolated until browsers ship support for
'Cross-origin-opener-policy: restrict-properties'.

Do you still want to record a metatrace?
Note that events under timer precision (1ms) will dropped.
Alternatively, connect to a trace_processor_shell --httpd instance.
`;
    showModal({
      title: `Trace processor doesn't have high-precision timers`,
      content: m('.modal-pre', PROMPT),
      buttons: [
        {
          text: 'YES, record metatrace',
          primary: true,
          action: () => {
            enableMetatracing();
            engine.enableMetatrace();
          },
        },
        {
          text: 'NO, cancel',
        },
      ],
    });
  } else {
    engine.enableMetatrace();
  }
}

async function finaliseMetatrace(e: Event) {
  e.preventDefault();
  globals.logging.logEvent('Trace Actions', 'Finalise metatrace');

  const jsEvents = disableMetatracingAndGetTrace();

  const engine = getCurrentEngine();
  if (!engine) return;

  const result = await engine.stopAndGetMetatrace();
  if (result.error.length !== 0) {
    throw new Error(`Failed to read metatrace: ${result.error}`);
  }

  downloadData('metatrace', result.metatrace, jsEvents);
}


const EngineRPCWidget: m.Component = {
  view() {
    let cssClass = '';
    let title = 'Number of pending SQL queries';
    let label: string;
    let failed = false;
    let mode: EngineMode|undefined;

    const engine = globals.state.engine;
    if (engine !== undefined) {
      mode = engine.mode;
      if (engine.failed !== undefined) {
        cssClass += '.red';
        title = 'Query engine crashed\n' + engine.failed;
        failed = true;
      }
    }

    // If we don't have an engine yet, guess what will be the mode that will
    // be used next time we'll create one. Even if we guess it wrong (somehow
    // trace_controller.ts takes a different decision later, e.g. because the
    // RPC server is shut down after we load the UI and cached httpRpcState)
    // this will eventually become  consistent once the engine is created.
    if (mode === undefined) {
      if (globals.frontendLocalState.httpRpcState.connected &&
          globals.state.newEngineMode === 'USE_HTTP_RPC_IF_AVAILABLE') {
        mode = 'HTTP_RPC';
      } else {
        mode = 'WASM';
      }
    }

    if (mode === 'HTTP_RPC') {
      cssClass += '.green';
      label = 'RPC';
      title += '\n(Query engine: native accelerator over HTTP+RPC)';
    } else {
      label = 'WSM';
      title += '\n(Query engine: built-in WASM)';
    }

    return m(
        `.dbg-info-square${cssClass}`,
        {title},
        m('div', label),
        m('div', `${failed ? 'FAIL' : globals.numQueuedQueries}`));
  },
};

const ServiceWorkerWidget: m.Component = {
  view() {
    let cssClass = '';
    let title = 'Service Worker: ';
    let label = 'N/A';
    const ctl = globals.serviceWorkerController;
    if ((!('serviceWorker' in navigator))) {
      label = 'N/A';
      title += 'not supported by the browser (requires HTTPS)';
    } else if (ctl.bypassed) {
      label = 'OFF';
      cssClass = '.red';
      title += 'Bypassed, using live network. Double-click to re-enable';
    } else if (ctl.installing) {
      label = 'UPD';
      cssClass = '.amber';
      title += 'Installing / updating ...';
    } else if (!navigator.serviceWorker.controller) {
      label = 'N/A';
      title += 'Not available, using network';
    } else {
      label = 'ON';
      cssClass = '.green';
      title += 'Serving from cache. Ready for offline use';
    }

    const toggle = async () => {
      if (globals.serviceWorkerController.bypassed) {
        globals.serviceWorkerController.setBypass(false);
        return;
      }
      showModal({
        title: 'Disable service worker?',
        content: m(
            'div',
            m('p', `If you continue the service worker will be disabled until
                      manually re-enabled.`),
            m('p', `All future requests will be served from the network and the
                    UI won't be available offline.`),
            m('p', `You should do this only if you are debugging the UI
                    or if you are experiencing caching-related problems.`),
            m('p', `Disabling will cause a refresh of the UI, the current state
                    will be lost.`),
            ),
        buttons: [
          {
            text: 'Disable and reload',
            primary: true,
            action: () => {
              globals.serviceWorkerController.setBypass(true).then(
                  () => location.reload());
            },
          },
          {text: 'Cancel'},
        ],
      });
    };

    return m(
        `.dbg-info-square${cssClass}`,
        {title, ondblclick: toggle},
        m('div', 'SW'),
        m('div', label));
  },
};

const SidebarFooter: m.Component = {
  view() {
    return m(
        '.sidebar-footer',
        m('button',
          {
            onclick: () => globals.dispatch(Actions.togglePerfDebug({})),
          },
          m('i.material-icons',
            {title: 'Toggle Perf Debug Mode'},
            'assessment')),
        m(EngineRPCWidget),
        m(ServiceWorkerWidget),
        m(
            '.version',
            m('a',
              {
                href: `${GITILES_URL}/+/${SCM_REVISION}/ui`,
                title: `Channel: ${getCurrentChannel()}`,
                target: '_blank',
              },
              `${VERSION.substr(0, 11)}`),
            ),
    );
  },
};

class HiringBanner implements m.ClassComponent {
  view() {
    return m(
        '.hiring-banner',
        m('a',
          {
            href: 'http://go/perfetto-open-roles',
            target: '_blank',
          },
          'We\'re hiring!'));
  }
}

export class Sidebar implements m.ClassComponent {
  private _redrawWhileAnimating =
      new Animation(() => globals.rafScheduler.scheduleFullRedraw());
  view() {
    if (globals.hideSidebar) return null;
    const vdomSections = [];
    for (const section of SECTIONS) {
      if (section.hideIfNoTraceLoaded && !isTraceLoaded()) continue;
      const vdomItems = [];
      for (const item of section.items) {
        if (item.isVisible !== undefined && !item.isVisible()) {
          continue;
        }
        let css = '';
        let attrs = {
          onclick: typeof item.a === 'function' ? item.a : null,
          href: typeof item.a === 'string' ? item.a : '#',
          target: typeof item.a === 'string' ? '_blank' : null,
          disabled: false,
          id: item.t.toLowerCase().replace(/[^\w]/g, '_'),
        };
        if (item.isPending && item.isPending()) {
          attrs.onclick = (e) => e.preventDefault();
          css = '.pending';
        }
        if (item.internalUserOnly && !globals.isInternalUser) {
          continue;
        }
        if (item.checkMetatracingEnabled || item.checkMetatracingDisabled) {
          if (item.checkMetatracingEnabled === true &&
              !isMetatracingEnabled()) {
            continue;
          }
          if (item.checkMetatracingDisabled === true &&
              isMetatracingEnabled()) {
            continue;
          }
          if (item.checkMetatracingDisabled &&
              !highPrecisionTimersAvailable()) {
            attrs.disabled = true;
          }
        }
        if (item.checkDownloadDisabled && !isDownloadable()) {
          attrs = {
            onclick: (e) => {
              e.preventDefault();
              alert('Can not download external trace.');
            },
            href: '#',
            target: null,
            disabled: true,
            id: '',
          };
        }
        vdomItems.push(m(
            'li', m(`a${css}`, attrs, m('i.material-icons', item.i), item.t)));
      }
      if (section.appendOpenedTraceTitle) {
        const engine = globals.state.engine;
        if (engine !== undefined) {
          let traceTitle = '';
          let traceUrl = '';
          switch (engine.source.type) {
            case 'FILE':
              // Split on both \ and / (because C:\Windows\paths\are\like\this).
              traceTitle = engine.source.file.name.split(/[/\\]/).pop()!;
              const fileSizeMB = Math.ceil(engine.source.file.size / 1e6);
              traceTitle += ` (${fileSizeMB} MB)`;
              break;
            case 'URL':
              traceUrl = engine.source.url;
              traceTitle = traceUrl.split('/').pop()!;
              break;
            case 'ARRAY_BUFFER':
              traceTitle = engine.source.title;
              traceUrl = engine.source.url || '';
              const arrayBufferSizeMB =
                  Math.ceil(engine.source.buffer.byteLength / 1e6);
              traceTitle += ` (${arrayBufferSizeMB} MB)`;
              break;
            case 'HTTP_RPC':
              traceTitle = 'External trace (RPC)';
              break;
            default:
              break;
          }
          if (traceTitle !== '') {
            const tabTitle = `${traceTitle} - Perfetto UI`;
            if (tabTitle !== lastTabTitle) {
              document.title = lastTabTitle = tabTitle;
            }
            vdomItems.unshift(m('li', createTraceLink(traceTitle, traceUrl)));
          }
        }
      }
      vdomSections.push(
          m(`section${section.expanded ? '.expanded' : ''}`,
            m('.section-header',
              {
                onclick: () => {
                  section.expanded = !section.expanded;
                  globals.rafScheduler.scheduleFullRedraw();
                },
              },
              m('h1', {title: section.summary}, section.title),
              m('h2', section.summary)),
            m('.section-content', m('ul', vdomItems))));
    }
    return m(
        'nav.sidebar',
        {
          class: globals.state.sidebarVisible ? 'show-sidebar' : 'hide-sidebar',
          // 150 here matches --sidebar-timing in the css.
          // TODO(hjd): Should link to the CSS variable.
          ontransitionstart: () => this._redrawWhileAnimating.start(150),
          ontransitionend: () => this._redrawWhileAnimating.stop(),
        },
        shouldShowHiringBanner() ? m(HiringBanner) : null,
        m(
            `header.${getCurrentChannel()}`,
            m(`img[src=${globals.root}assets/brand.png].brand`),
            m('button.sidebar-button',
              {
                onclick: () => {
                  globals.dispatch(Actions.toggleSidebar({}));
                },
              },
              m('i.material-icons',
                {
                  title: globals.state.sidebarVisible ? 'Hide menu' :
                                                        'Show menu',
                },
                'menu')),
            ),
        m('input.trace_file[type=file]',
          {onchange: onInputElementFileSelectionChanged}),
        m('.sidebar-scroll',
          m(
              '.sidebar-scroll-container',
              ...vdomSections,
              m(SidebarFooter),
              )),
    );
  }
}

function createTraceLink(title: string, url: string) {
  if (url === '') {
    return m('a.trace-file-name', title);
  }
  const linkProps = {
    href: url,
    title: 'Click to copy the URL',
    target: '_blank',
    onclick: onClickCopy(url),
  };
  return m('a.trace-file-name', linkProps, title);
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Animation} from './animation';
import {DragGestureHandler} from './drag_gesture_handler';
import {globals} from './globals';
import {handleKey} from './keyboard_event_handler';

// When first starting to pan or zoom, move at least this many units.
const INITIAL_PAN_STEP_PX = 50;
const INITIAL_ZOOM_STEP = 0.1;

// The snappiness (spring constant) of pan and zoom animations [0..1].
const SNAP_FACTOR = 0.4;

// How much the velocity of a pan or zoom animation increases per millisecond.
const ACCELERATION_PER_MS = 1 / 50;

// The default duration of a pan or zoom animation. The animation may run longer
// if the user keeps holding the respective button down or shorter if the button
// is released. This value so chosen so that it is longer than the typical key
// repeat timeout to avoid breaks in the animation.
const DEFAULT_ANIMATION_DURATION = 700;

// The minimum number of units to pan or zoom per frame (before the
// ACCELERATION_PER_MS multiplier is applied).
const ZOOM_RATIO_PER_FRAME = 0.008;
const KEYBOARD_PAN_PX_PER_FRAME = 8;

// Scroll wheel animation steps.
const HORIZONTAL_WHEEL_PAN_SPEED = 1;
const WHEEL_ZOOM_SPEED = -0.02;

const EDITING_RANGE_CURSOR = 'ew-resize';
const DRAG_CURSOR = 'default';
const PAN_CURSOR = 'move';

// Use key mapping based on the 'KeyboardEvent.code' property vs the
// 'KeyboardEvent.key', because the former corresponds to the physical key
// position rather than the glyph printed on top of it, and is unaffected by
// the user's keyboard layout.
// For example, 'KeyW' always corresponds to the key at the physical location of
// the 'w' key on an English QWERTY keyboard, regardless of the user's keyboard
// layout, or at least the layout they have configured in their OS.
// Seeing as most users use the keys in the English QWERTY "WASD" position for
// controlling kb+mouse applications like games, it's a good bet that these are
// the keys most poeple are going to find natural for navigating the UI.
// See https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system
export enum KeyMapping {
  KEY_PAN_LEFT = 'KeyA',
  KEY_PAN_RIGHT = 'KeyD',
  KEY_ZOOM_IN = 'KeyW',
  KEY_ZOOM_OUT = 'KeyS',
}

enum Pan {
  None = 0,
  Left = -1,
  Right = 1
}
function keyToPan(e: KeyboardEvent): Pan {
  if (e.code === KeyMapping.KEY_PAN_LEFT) return Pan.Left;
  if (e.code === KeyMapping.KEY_PAN_RIGHT) return Pan.Right;
  return Pan.None;
}

enum Zoom {
  None = 0,
  In = 1,
  Out = -1
}
function keyToZoom(e: KeyboardEvent): Zoom {
  if (e.code === KeyMapping.KEY_ZOOM_IN) return Zoom.In;
  if (e.code === KeyMapping.KEY_ZOOM_OUT) return Zoom.Out;
  return Zoom.None;
}

/**
 * Enables horizontal pan and zoom with mouse-based drag and WASD navigation.
 */
export class PanAndZoomHandler {
  private mousePositionX: number|null = null;
  private boundOnMouseMove = this.onMouseMove.bind(this);
  private boundOnWheel = this.onWheel.bind(this);
  private boundOnKeyDown = this.onKeyDown.bind(this);
  private boundOnKeyUp = this.onKeyUp.bind(this);
  private shiftDown = false;
  private panning: Pan = Pan.None;
  private panOffsetPx = 0;
  private targetPanOffsetPx = 0;
  private zooming: Zoom = Zoom.None;
  private zoomRatio = 0;
  private targetZoomRatio = 0;
  private panAnimation = new Animation(this.onPanAnimationStep.bind(this));
  private zoomAnimation = new Animation(this.onZoomAnimationStep.bind(this));

  private element: HTMLElement;
  private contentOffsetX: number;
  private onPanned: (movedPx: number) => void;
  private onZoomed: (zoomPositionPx: number, zoomRatio: number) => void;
  private editSelection: (currentPx: number) => boolean;
  private onSelection:
      (dragStartX: number, dragStartY: number, prevX: number, currentX: number,
       currentY: number, editing: boolean) => void;
  private endSelection: (edit: boolean) => void;

  constructor({
    element,
    contentOffsetX,
    onPanned,
    onZoomed,
    editSelection,
    onSelection,
    endSelection,
  }: {
    element: HTMLElement,
    contentOffsetX: number,
    onPanned: (movedPx: number) => void,
    onZoomed: (zoomPositionPx: number, zoomRatio: number) => void,
    editSelection: (currentPx: number) => boolean,
    onSelection:
        (dragStartX: number, dragStartY: number, prevX: number,
         currentX: number, currentY: number, editing: boolean) => void,
    endSelection: (edit: boolean) => void,
  }) {
    this.element = element;
    this.contentOffsetX = contentOffsetX;
    this.onPanned = onPanned;
    this.onZoomed = onZoomed;
    this.editSelection = editSelection;
    this.onSelection = onSelection;
    this.endSelection = endSelection;

    document.body.addEventListener('keydown', this.boundOnKeyDown);
    document.body.addEventListener('keyup', this.boundOnKeyUp);
    this.element.addEventListener('mousemove', this.boundOnMouseMove);
    this.element.addEventListener('wheel', this.boundOnWheel, {passive: true});

    let prevX = -1;
    let dragStartX = -1;
    let dragStartY = -1;
    let edit = false;
    new DragGestureHandler(
        this.element,
        (x, y) => {
          if (this.shiftDown) {
            this.onPanned(prevX - x);
          } else {
            this.onSelection(dragStartX, dragStartY, prevX, x, y, edit);
          }
          prevX = x;
        },
        (x, y) => {
          prevX = x;
          dragStartX = x;
          dragStartY = y;
          edit = this.editSelection(x);
          // Set the cursor style based on where the cursor is when the drag
          // starts.
          if (edit) {
            this.element.style.cursor = EDITING_RANGE_CURSOR;
          } else if (!this.shiftDown) {
            this.element.style.cursor = DRAG_CURSOR;
          }
        },
        () => {
          // Reset the cursor now the drag has ended.
          this.element.style.cursor = this.shiftDown ? PAN_CURSOR : DRAG_CURSOR;
          dragStartX = -1;
          dragStartY = -1;
          this.endSelection(edit);
        });
  }


  shutdown() {
    document.body.removeEventListener('keydown', this.boundOnKeyDown);
    document.body.removeEventListener('keyup', this.boundOnKeyUp);
    this.element.removeEventListener('mousemove', this.boundOnMouseMove);
    this.element.removeEventListener('wheel', this.boundOnWheel);
  }

  private onPanAnimationStep(msSinceStartOfAnimation: number) {
    const step = (this.targetPanOffsetPx - this.panOffsetPx) * SNAP_FACTOR;
    if (this.panning !== Pan.None) {
      const velocity = 1 + msSinceStartOfAnimation * ACCELERATION_PER_MS;
      // Pan at least as fast as the snapping animation to avoid a
      // discontinuity.
      const targetStep = Math.max(KEYBOARD_PAN_PX_PER_FRAME * velocity, step);
      this.targetPanOffsetPx += this.panning * targetStep;
    }
    this.panOffsetPx += step;
    if (Math.abs(step) > 1e-1) {
      this.onPanned(step);
    } else {
      this.panAnimation.stop();
    }
  }

  private onZoomAnimationStep(msSinceStartOfAnimation: number) {
    if (this.mousePositionX === null) return;
    const step = (this.targetZoomRatio - this.zoomRatio) * SNAP_FACTOR;
    if (this.zooming !== Zoom.None) {
      const velocity = 1 + msSinceStartOfAnimation * ACCELERATION_PER_MS;
      // Zoom at least as fast as the snapping animation to avoid a
      // discontinuity.
      const targetStep = Math.max(ZOOM_RATIO_PER_FRAME * velocity, step);
      this.targetZoomRatio += this.zooming * targetStep;
    }
    this.zoomRatio += step;
    if (Math.abs(step) > 1e-6) {
      this.onZoomed(this.mousePositionX, step);
    } else {
      this.zoomAnimation.stop();
    }
  }

  private onMouseMove(e: MouseEvent) {
    const pageOffset = globals.state.sidebarVisible && !globals.hideSidebar ?
        this.contentOffsetX :
        0;
    // We can't use layerX here because there are many layers in this element.
    this.mousePositionX = e.clientX - pageOffset;
    // Only change the cursor when hovering, the DragGestureHandler handles
    // changing the cursor during drag events. This avoids the problem of
    // the cursor flickering between styles if you drag fast and get too
    // far from the current time range.
    if (e.buttons === 0) {
      if (this.editSelection(this.mousePositionX)) {
        this.element.style.cursor = EDITING_RANGE_CURSOR;
      } else {
        this.element.style.cursor = this.shiftDown ? PAN_CURSOR : DRAG_CURSOR;
      }
    }
  }

  private onWheel(e: WheelEvent) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      this.onPanned(e.deltaX * HORIZONTAL_WHEEL_PAN_SPEED);
      globals.rafScheduler.scheduleRedraw();
    } else if (e.ctrlKey && this.mousePositionX) {
      const sign = e.deltaY < 0 ? -1 : 1;
      const deltaY = sign * Math.log2(1 + Math.abs(e.deltaY));
      this.onZoomed(this.mousePositionX, deltaY * WHEEL_ZOOM_SPEED);
      globals.rafScheduler.scheduleRedraw();
    }
  }

  private onKeyDown(e: KeyboardEvent) {
    this.updateShift(e.shiftKey);

    // Handle key events that are not pan or zoom.
    if (handleKey(e, true)) return;

    if (keyToPan(e) !== Pan.None) {
      if (this.panning !== keyToPan(e)) {
        this.panAnimation.stop();
        this.panOffsetPx = 0;
        this.targetPanOffsetPx = keyToPan(e) * INITIAL_PAN_STEP_PX;
      }
      this.panning = keyToPan(e);
      this.panAnimation.start(DEFAULT_ANIMATION_DURATION);
    }

    if (keyToZoom(e) !== Zoom.None) {
      if (this.zooming !== keyToZoom(e)) {
        this.zoomAnimation.stop();
        this.zoomRatio = 0;
        this.targetZoomRatio = keyToZoom(e) * INITIAL_ZOOM_STEP;
      }
      this.zooming = keyToZoom(e);
      this.zoomAnimation.start(DEFAULT_ANIMATION_DURATION);
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    this.updateShift(e.shiftKey);

    // Handle key events that are not pan or zoom.
    if (handleKey(e, false)) return;

    if (keyToPan(e) === this.panning) {
      this.panning = Pan.None;
    }
    if (keyToZoom(e) === this.zooming) {
      this.zooming = Zoom.None;
    }
  }

  // TODO(hjd): Move this shift handling into the viewer page.
  private updateShift(down: boolean) {
    if (down === this.shiftDown) return;
    this.shiftDown = down;
    if (this.shiftDown) {
      this.element.style.cursor = PAN_CURSOR;
    } else if (this.mousePositionX) {
      this.element.style.cursor = DRAG_CURSOR;
    }
  }
}
// Copyright (C) 2023 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {classNames} from './classnames';

test('classnames', () => {
  expect(classNames('foo', 'bar')).toEqual('foo bar');
  expect(classNames('foo', '', 'bar')).toEqual('foo bar');
  expect(classNames(false, 'foo', 'bar')).toEqual('foo bar');
  expect(classNames(undefined, 'foo', 'bar')).toEqual('foo bar');
  expect(classNames('foo', 'bar', ['baz', 'qux'])).toEqual('foo bar baz qux');
  expect(classNames('foo bar', 'baz')).toEqual('foo bar baz');
});

test('example usecase with flags', () => {
  const foo = true;
  const bar = false;
  const baz = true;
  expect(classNames(
             foo && 'foo',
             bar && 'bar',
             baz && 'baz',
             ))
      .toEqual('foo baz');
});

test('example usecase with possibly undefined classnames', () => {
  let fooClass: string|undefined;
  const barClass = 'bar';
  expect(classNames(
             fooClass,
             barClass,
             ))
      .toEqual('bar');
});
// Copyright (C) 2020 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {globals} from './globals';

export function isShareable() {
  return (globals.isInternalUser && isDownloadable());
}

export function isDownloadable() {
  const engine = globals.getCurrentEngine();
  if (!engine) {
    return false;
  }
  if (engine.source.type === 'ARRAY_BUFFER' && engine.source.localOnly) {
    return false;
  }
  if (engine.source.type === 'HTTP_RPC') {
    return false;
  }
  return true;
}
// Copyright (C) 2018 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {TimeSpan} from '../common/time';

import {getStepSize, Tick, TickGenerator, TickType} from './gridline_helper';
import {TimeScale} from './time_scale';

const pattern1 = '|....:....';
const pattern2 = '|.:.';
const pattern5 = '|....';
const timeScale = new TimeScale(new TimeSpan(0, 1), [1, 2]);

test('gridline helper to have sensible step sizes', () => {
  expect(getStepSize(10, 14)).toEqual([1, pattern1]);
  expect(getStepSize(30, 14)).toEqual([5, pattern5]);
  expect(getStepSize(60, 14)).toEqual([5, pattern5]);
  expect(getStepSize(100, 14)).toEqual([10, pattern1]);

  expect(getStepSize(10, 21)).toEqual([0.5, pattern5]);
  expect(getStepSize(30, 21)).toEqual([2, pattern2]);
  expect(getStepSize(60, 21)).toEqual([5, pattern5]);
  expect(getStepSize(100, 21)).toEqual([5, pattern5]);

  expect(getStepSize(10, 3)).toEqual([5, pattern5]);
  expect(getStepSize(30, 3)).toEqual([10, pattern1]);
  expect(getStepSize(60, 3)).toEqual([20, pattern2]);
  expect(getStepSize(100, 3)).toEqual([50, pattern5]);

  expect(getStepSize(800, 4)).toEqual([200, pattern2]);
});

test('gridline helper to scale to very small and very large values', () => {
  expect(getStepSize(.01, 14)).toEqual([.001, pattern1]);
  expect(getStepSize(10000, 14)).toEqual([1000, pattern1]);
});

test('gridline helper to always return a reasonable number of steps', () => {
  for (let i = 1; i <= 1000; i++) {
    const [stepSize, _] = getStepSize(i, 14);
    expect(Math.round(i / stepSize)).toBeGreaterThanOrEqual(6);
    expect(Math.round(i / stepSize)).toBeLessThanOrEqual(14);
  }
});

describe('TickGenerator with range 0.0-1.0 and room for 2 labels', () => {
  let tickGen: TickGenerator|undefined = undefined;
  beforeAll(() => {
    const timeSpan = new TimeSpan(0.0, 1.0);
    const timeScale = new TimeScale(timeSpan, [0, 200]);
    tickGen = new TickGenerator(timeScale, {minLabelPx: 100});
  });
  it('should produce major ticks at 0.5s and minor ticks at 0.1s starting at 0',
     () => {
       const expected = [
         {type: TickType.MAJOR, time: 0.0},
         {type: TickType.MINOR, time: 0.1},
         {type: TickType.MINOR, time: 0.2},
         {type: TickType.MINOR, time: 0.3},
         {type: TickType.MINOR, time: 0.4},
         {type: TickType.MAJOR, time: 0.5},
         {type: TickType.MINOR, time: 0.6},
         {type: TickType.MINOR, time: 0.7},
         {type: TickType.MINOR, time: 0.8},
         {type: TickType.MINOR, time: 0.9},
       ];
       const actual = Array.from(tickGen!);
       expectTicksEqual(actual, expected);
     });
  it('should tell us to use 1 decimal place for labels', () => {
    expect(tickGen!.digits).toEqual(1);
  });
});

describe('TickGenerator with range 0.3-1.3 and room for 2 labels', () => {
  let tickGen: TickGenerator|undefined = undefined;
  beforeAll(() => {
    const timeSpan = new TimeSpan(0.3, 1.3);
    const timeScale = new TimeScale(timeSpan, [0, 200]);
    tickGen = new TickGenerator(timeScale, {minLabelPx: 100});
  });
  it('should produce major ticks at 0.5s and minor ticks at 0.1s starting at 0',
     () => {
       const expected = [
         {type: TickType.MINOR, time: 0.3},
         {type: TickType.MINOR, time: 0.4},
         {type: TickType.MAJOR, time: 0.5},
         {type: TickType.MINOR, time: 0.6},
         {type: TickType.MINOR, time: 0.7},
         {type: TickType.MINOR, time: 0.8},
         {type: TickType.MINOR, time: 0.9},
         {type: TickType.MAJOR, time: 1.0},
         {type: TickType.MINOR, time: 1.1},
         {type: TickType.MINOR, time: 1.2},
       ];
       const actual = Array.from(tickGen!);
       expectTicksEqual(actual, expected);
     });
  it('should tell us to use 1 decimal place for labels', () => {
    expect(tickGen!.digits).toEqual(1);
  });
});

describe('TickGenerator with range 0.0-0.2 and room for 1 label', () => {
  let tickGen: TickGenerator|undefined = undefined;
  beforeAll(() => {
    const timeSpan = new TimeSpan(0.0, 0.2);
    const timeScale = new TimeScale(timeSpan, [0, 100]);
    tickGen = new TickGenerator(timeScale, {minLabelPx: 100});
  });
  it('should produce major ticks at 0.2s and minor ticks at 0.1s starting at 0',
     () => {
       const expected = [
         {type: TickType.MAJOR, time: 0.0},
         {type: TickType.MINOR, time: 0.05},
         {type: TickType.MEDIUM, time: 0.1},
         {type: TickType.MINOR, time: 0.15},
       ];
       const actual = Array.from(tickGen!);
       expectTicksEqual(actual, expected);
     });
  it('should tell us to use 1 decimal place for labels', () => {
    expect(tickGen!.digits).toEqual(1);
  });
});

describe('TickGenerator with range 0.0-0.1 and room for 1 label', () => {
  let tickGen: TickGenerator|undefined = undefined;
  beforeAll(() => {
    const timeSpan = new TimeSpan(0.0, 0.1);
    const timeScale = new TimeScale(timeSpan, [0, 100]);
    tickGen = new TickGenerator(timeScale, {minLabelPx: 100});
  });
  it('should produce major ticks at 0.1s & minor ticks at 0.02s starting at 0',
     () => {
       const expected = [
         {type: TickType.MAJOR, time: 0.0},
         {type: TickType.MINOR, time: 0.01},
         {type: TickType.MINOR, time: 0.02},
         {type: TickType.MINOR, time: 0.03},
         {type: TickType.MINOR, time: 0.04},
         {type: TickType.MEDIUM, time: 0.05},
         {type: TickType.MINOR, time: 0.06},
         {type: TickType.MINOR, time: 0.07},
         {type: TickType.MINOR, time: 0.08},
         {type: TickType.MINOR, time: 0.09},
       ];
       const actual = Array.from(tickGen!);
       expect(tickGen!.digits).toEqual(1);
       expectTicksEqual(actual, expected);
     });
  it('should tell us to use 1 decimal place for labels', () => {
    expect(tickGen!.digits).toEqual(1);
  });
});

describe('TickGenerator with a very small timespan', () => {
  let tickGen: TickGenerator|undefined = undefined;
  beforeAll(() => {
    const timeSpan = new TimeSpan(0.0, 1e-9);
    const timeScale = new TimeScale(timeSpan, [0, 100]);
    tickGen = new TickGenerator(timeScale, {minLabelPx: 100});
  });
  it('should generate minor ticks at 2e-10s and one major tick at the start',
     () => {
       const expected = [
         {type: TickType.MAJOR, time: 0.0},
         {type: TickType.MINOR, time: 1e-10},
         {type: TickType.MINOR, time: 2e-10},
         {type: TickType.MINOR, time: 3e-10},
         {type: TickType.MINOR, time: 4e-10},
         {type: TickType.MEDIUM, time: 5e-10},
         {type: TickType.MINOR, time: 6e-10},
         {type: TickType.MINOR, time: 7e-10},
         {type: TickType.MINOR, time: 8e-10},
         {type: TickType.MINOR, time: 9e-10},
       ];
       const actual = Array.from(tickGen!);
       expectTicksEqual(actual, expected);
     });
  it('should tell us to use 9 decimal places for labels', () => {
    expect(tickGen!.digits).toEqual(9);
  });
});

describe('TickGenerator with a very large timespan', () => {
  let tickGen: TickGenerator|undefined = undefined;
  beforeAll(() => {
    const timeSpan = new TimeSpan(0.0, 1e9);
    const timeScale = new TimeScale(timeSpan, [0, 100]);
    tickGen = new TickGenerator(timeScale, {minLabelPx: 100});
  });
  it('should generate minor ticks at 2e8 and one major tick at the start',
     () => {
       const expected = [
         {type: TickType.MAJOR, time: 0.0},
         {type: TickType.MINOR, time: 1e8},
         {type: TickType.MINOR, time: 2e8},
         {type: TickType.MINOR, time: 3e8},
         {type: TickType.MINOR, time: 4e8},
         {type: TickType.MEDIUM, time: 5e8},
         {type: TickType.MINOR, time: 6e8},
         {type: TickType.MINOR, time: 7e8},
         {type: TickType.MINOR, time: 8e8},
         {type: TickType.MINOR, time: 9e8},
       ];
       const actual = Array.from(tickGen!);
       expectTicksEqual(actual, expected);
     });
  it('should tell us to use 0 decimal places for labels', () => {
    expect(tickGen!.digits).toEqual(0);
  });
});

describe('TickGenerator where the timespan has a dynamic range of 1e12', () => {
  // This is the equivalent of zooming in to the nanosecond level, 1000 seconds
  // into a trace Note: this is about the limit of what this generator can
  // handle.
  let tickGen: TickGenerator|undefined = undefined;
  beforeAll(() => {
    const timeSpan = new TimeSpan(1000, 1000.000000001);
    const timeScale = new TimeScale(timeSpan, [0, 100]);
    tickGen = new TickGenerator(timeScale, {minLabelPx: 100});
  });
  it('should generate minor ticks at 1e-10s and one major tick at the start',
     () => {
       const expected = [
         {type: TickType.MAJOR, time: 1000.0000000000},
         {type: TickType.MINOR, time: 1000.0000000001},
         {type: TickType.MINOR, time: 1000.0000000002},
         {type: TickType.MINOR, time: 1000.0000000003},
         {type: TickType.MINOR, time: 1000.0000000004},
         {type: TickType.MEDIUM, time: 1000.0000000005},
         {type: TickType.MINOR, time: 1000.0000000006},
         {type: TickType.MINOR, time: 1000.0000000007},
         {type: TickType.MINOR, time: 1000.0000000008},
         {type: TickType.MINOR, time: 1000.0000000009},
       ];
       const actual = Array.from(tickGen!);
       expectTicksEqual(actual, expected);
     });
  it('should tell us to use 9 decimal places for labels', () => {
    expect(tickGen!.digits).toEqual(9);
  });
});

describe(
    'TickGenerator where the timespan has a ridiculously huge dynamic range',
    () => {
      // We don't expect this to work, just wanna make sure it doesn't crash or
      // get stuck
      it('should not crash or get stuck in an infinite loop', () => {
        const timeSpan = new TimeSpan(1000, 1000.000000000001);
        const timeScale = new TimeScale(timeSpan, [0, 100]);
        new TickGenerator(timeScale);
      });
    });

describe(
    'TickGenerator where the timespan has a ridiculously huge dynamic range',
    () => {
      // We don't expect this to work, just wanna make sure it doesn't crash or
      // get stuck
      it('should not crash or get stuck in an infinite loop', () => {
        const timeSpan = new TimeSpan(1000, 1000.000000000001);
        const timeScale = new TimeScale(timeSpan, [0, 100]);
        new TickGenerator(timeScale);
      });
    });

test('TickGenerator constructed with a 0 width throws an error', () => {
  expect(() => {
    const timeScale = new TimeScale(new TimeSpan(0.0, 1.0), [0, 0]);
    new TickGenerator(timeScale);
  }).toThrow(Error);
});

test(
    'TickGenerator constructed with desiredPxPerStep of 0 throws an error',
    () => {
      expect(() => {
        new TickGenerator(timeScale, {minLabelPx: 0});
      }).toThrow(Error);
    });

test('TickGenerator constructed with a 0 duration throws an error', () => {
  expect(() => {
    const timeScale = new TimeScale(new TimeSpan(0.0, 0.0), [0, 1]);
    new TickGenerator(timeScale);
  }).toThrow(Error);
});

function expectTicksEqual(actual: Tick[], expected: any[]) {
  // TODO(stevegolton) We could write a custom matcher for this; this approach
  // produces cryptic error messages.
  expect(actual.length).toEqual(expected.length);
  for (let i = 0; i < actual.length; ++i) {
    const ex = expected[i];
    const ac = actual[i];
    expect(ac.type).toEqual(ex.type);
    expect(ac.time).toBeCloseTo(ex.time, 9);
  }
}
