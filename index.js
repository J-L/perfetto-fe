"use strict";
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetsPage = exports.recordTargetStore = exports.RecordTargetStore = exports.autosaveConfigStore = exports.AutosaveConfigStore = exports.recordConfigStore = exports.RecordConfigStore = exports.FrontendLocalState = exports.LogPanel = exports.FlamegraphDetailsPanel = exports.AttributeModalHolder = exports.Table = exports.TableData = exports.stringColumn = exports.numberColumn = exports.ColumnDescriptor = exports.TableShowcase = exports.drawGridLines = exports.timeScaleForVisibleWindow = exports.TickGenerator = exports.TickType = exports.guessDecimalPlaces = exports.getStepSize = exports.publishFtracePanelData = exports.publishConnectedFlows = exports.publishThreadStateDetails = exports.publishSliceDetails = exports.publishThreads = exports.publishQueryResult = exports.publishAggregateData = exports.publishMetricError = exports.publishTraceErrors = exports.publishRecordingLog = exports.publishSearchResult = exports.publishSearch = exports.publishBufferUsage = exports.publishLoading = exports.publishConversionJobStatusUpdate = exports.publishFtraceCounters = exports.publishCpuProfileDetails = exports.publishFlamegraphDetails = exports.publishCounterDetails = exports.publishSelectedFlows = exports.publishMetricResult = exports.publishTrackData = exports.publishOverviewData = exports.loadAndroidBugToolInfo = exports.taskTracker = exports.TaskTracker = exports.CookieConsent = void 0;
exports.value = exports.Topbar = exports.DISMISSED_PANNING_HINT_KEY = exports.Router = exports.ROUTE_PREFIX = exports.ThreadStateTab = exports.fromNumNull = exports.constraintsToQueryFragment = exports.TrackPanel = exports.TrackButton = exports.TrackContent = exports.ChromeSliceDetailsPanel = exports.drawVerticalLineAtTime = exports.ArgumentPopup = exports.initCssConstants = exports.FOREGROUND_COLOR = exports.BACKGROUND_COLOR = exports.SELECTED_LOG_ROWS_COLOR = exports.DEFAULT_DETAILS_CONTENT_HEIGHT = exports.OVERVIEW_TIMELINE_NON_VISIBLE_COLOR = exports.SELECTION_FILL_COLOR = exports.SELECTION_STROKE_COLOR = exports.TOPBAR_HEIGHT = exports.TRACK_BORDER_COLOR = exports.SIDEBAR_WIDTH = exports.TRACK_SHELL_WIDTH = exports.download = exports.queryResponseToClipboard = exports.copyToClipboard = exports.onClickCopy = exports.TimeAxisPanel = exports.SliceDetailsPanel = exports.scrollToTrackAndTs = exports.verticalScrollToTrack = exports.focusHorizontalRange = exports.horizontalScrollToTs = exports.isPanelVNode = exports.Panel = exports.openBufferWithLegacyTraceViewer = exports.openFileWithLegacyTraceViewer = exports.isLegacyTrace = exports.postMessageHandler = exports.ServiceWorkerController = exports.toggleHelp = exports.DEFAULT_SLICE_LAYOUT = exports.SLICE_LAYOUT_FLAT_DEFAULTS = exports.SLICE_LAYOUT_FIT_CONTENT_DEFAULTS = exports.SLICE_LAYOUT_FIXED_DEFAULTS = exports.SLICE_LAYOUT_BASE_DEFAULTS = exports.OverviewTimelinePanel = void 0;
exports.getThreadState = exports.getThreadStateFromConstraints = exports.getThreadName = exports.getThreadInfo = exports.getProcessName = exports.SlicePanel = exports.TickmarkPanel = exports.TrackGroupPanel = exports.registerDebugGlobals = exports.trackRegistry = exports.ChromeSettings = exports.RecordingSettings = exports.PowerSettings = exports.MemorySettings = exports.addNewTarget = exports.couldNotClaimInterface = exports.RecordingMultipleChoice = exports.AndroidSettings = exports.POLL_INTERVAL_MS = exports.DEFAULT_TRACED_WEBSOCKET_URL = exports.DEFAULT_ADB_WEBSOCKET_URL = exports.TRACED_ENDPOINT = exports.ADB_ENDPOINT = exports.DEFAULT_WEBSOCKET_URL = exports.FORCE_RESET_MESSAGE = exports.AdvancedSettings = exports.CpuSettings = exports.GpuSettings = exports.splitIfTooBig = exports.Flamegraph = exports.findRootSize = exports.FLAMEGRAPH_HOVERED_COLOR = exports.QueryTable = exports.nativeKeyboardLayoutMap = exports.NotSupportedError = exports.showModal = exports.fullscreenModalContainer = exports.ModalContainer = exports.Modal = exports.NullAnalytics = exports.initAnalytics = exports.ViewerPage = exports.TrackGroup = exports.renderDict = exports.isStringValue = exports.isDict = exports.isArray = exports.array = exports.dict = exports.maybeValue = void 0;
exports.aggregationEquals = exports.toggleEnabled = exports.tableColumnEquals = exports.MetricsPage = exports.FlowEventsAreaSelectedPanel = exports.FlowEventsPanel = exports.getFlowCategories = exports.ALL_CATEGORIES = exports.DetailsPanel = exports.generateQueryFromState = exports.aggregationIndex = exports.extractArgumentExpression = exports.expression = exports.areaFilter = exports.QueryGeneratorError = exports.tables = exports.sliceAggregationColumns = exports.sliceTable = exports.TrackCache = exports.CacheKey = exports.BUCKETS_PER_PIXEL = exports.QueryResultTab = exports.runQueryInNewTab = exports.PivotTable = exports.markFirst = exports.executeSearch = exports.RecordPageV2 = exports.targetSelection = exports.DragStrategy = exports.OuterDragStrategy = exports.BorderDragStrategy = exports.InnerDragStrategy = exports.CheckHttpRpcConnection = exports.downloadData = exports.downloadUrl = exports.Animation = exports.RafScheduler = exports.PopupMenuButton = exports.popupMenuIcon = exports.menuItem = exports.NamedSliceTrack = exports.NAMED_SLICE_ROW = exports.ReorderableCellGroup = exports.checkerboardExcept = exports.checkerboard = exports.createPage = exports.HomePage = exports.PanelContainer = exports.threadStateToDict = exports.goToSchedSlice = void 0;
exports.CategoriesCheckboxList = exports.CodeSnippet = exports.Textarea = exports.Dropdown = exports.Slider = exports.Toggle = exports.CompactProbe = exports.Probe = exports.Anchor = exports.BottomTabList = exports.closeTab = exports.addTab = exports.BottomTab = exports.BottomTabBase = exports.bottomTabRegistry = exports.NotesEditorTab = exports.NotesPanel = exports.Track = exports.maybeOpenTraceFromRoute = exports.STAR = exports.DESELECT = exports.SELECT_ALL = exports.LIBRARY_ADD_CHECK = exports.PIN = exports.EXPAND_UP = exports.EXPAND_DOWN = exports.INDETERMINATE_CHECKBOX = exports.CHECKBOX = exports.BLANK_CHECKBOX = exports.cachedHsluvToHex = exports.queryHistoryStorage = exports.HistoryItemComponent = exports.QueryHistoryComponent = exports.LogsFilters = exports.LOG_PRIORITIES = exports.FtracePanel = exports.findCurrentSelection = exports.handleKey = exports.CpuProfileDetailsPanel = exports.globals = exports.convertTraceToPprofAndDownload = exports.convertToJson = exports.convertTraceToSystraceAndDownload = exports.convertTraceToJsonAndDownload = exports.debounce = exports.ratelimit = exports.installFileDropHandler = exports.AggregationPanel = exports.aggregationKey = exports.columnKey = void 0;
exports.toHTMLElement = exports.findRef = exports.isOrContains = exports.Select = exports.Timestamp = exports.EmptyState = exports.Spinner = exports.Checkbox = exports.FlowEventsRenderer = exports.FlowEventsRendererArgs = exports.initLiveReloadIfLocalhost = exports.AnalyzePage = exports.runAnalyzeQuery = exports.computeZoom = exports.TimeScale = exports.DragGestureHandler = exports.TraceInfoPage = exports.RecordPage = exports.maybeGetActiveCss = exports.updateAvailableAdbDevices = exports.ErrorLabel = exports.Configurations = exports.ConfigTitleState = exports.displayRecordConfigs = exports.loadConfigButton = exports.loadedConfigEqual = exports.RECORDING_SECTIONS = exports.PERSIST_CONFIG_FLAG = exports.asUtid = exports.asUpid = exports.toTraceTime = exports.timestampFromSqlNanos = exports.timestampFromNanos = exports.CounterDetailsPanel = exports.FlagsPage = exports.showFailedToPushBinary = exports.showIssueParsingTheTracedResponse = exports.showWebsocketConnectionIssue = exports.showExtensionNotInstalled = exports.showNoDeviceSelected = exports.showAllowUSBDebugging = exports.showConnectionLostError = exports.showWebUSBErrorV2 = exports.maybeShowErrorDialog = exports.BaseSliceTrack = exports.BASE_SLICE_ROW = exports.filterVisibleSlicesForTesting = exports.SLICE_FLAGS_INSTANT = exports.SLICE_FLAGS_INCOMPLETE = exports.classNames = void 0;
exports.isDownloadable = exports.isShareable = exports.PanAndZoomHandler = exports.KeyMapping = exports.Sidebar = exports.isTraceLoaded = exports.getCurrentTrace = exports.TimeSelectionPanel = exports.perfDisplay = exports.runningStatStr = exports.RunningStatistics = exports.measure = exports.debugNow = exports.perfDebug = exports.Icon = exports.TreeNode = exports.Tree = exports.TreeLayout = exports.TextInput = exports.Portal = exports.Duration = exports.MultiSelect = exports.Switch = exports.Popup = exports.PopupPosition = exports.PopupMenu2 = exports.Menu = exports.MenuDivider = exports.MenuItem = exports.FormLabel = exports.FormButtonBar = exports.Form = exports.Button = exports.hasChildren = void 0;
var mithril_1 = require("mithril");
var globals_1 = require("./globals");
var COOKIE_ACK_KEY = 'cookieAck';
var CookieConsent = /** @class */ (function () {
    function CookieConsent() {
        this.showCookieConsent = true;
    }
    CookieConsent.prototype.oninit = function () {
        this.showCookieConsent = true;
        if (!exports.globals.logging.isEnabled() ||
            localStorage.getItem(COOKIE_ACK_KEY) === 'true') {
            this.showCookieConsent = false;
        }
    };
    CookieConsent.prototype.view = function () {
        var _this = this;
        if (!this.showCookieConsent)
            return;
        return (0, mithril_1.default)('.cookie-consent', (0, mithril_1.default)('.cookie-text', "This site uses cookies from Google to deliver its services and to\n          analyze traffic."), (0, mithril_1.default)('.buttons', (0, mithril_1.default)('button', (0, mithril_1.default)('a', {
            href: 'https://policies.google.com/technologies/cookies',
            target: '_blank',
        }, 'More details')), (0, mithril_1.default)('button', {
            onclick: function () {
                _this.showCookieConsent = false;
                localStorage.setItem(COOKIE_ACK_KEY, 'true');
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, 'OK')));
    };
    return CookieConsent;
}());
exports.CookieConsent = CookieConsent;
var TaskTracker = /** @class */ (function () {
    function TaskTracker() {
        this.promisesSeen = 0;
        this.promisesRejected = 0;
        this.promisesFulfilled = 0;
        this.promiseInfo = new Map();
    }
    TaskTracker.prototype.trackPromise = function (promise, message) {
        var _this = this;
        this.promiseInfo.set(promise, {
            startTimeMs: (new Date()).getMilliseconds(),
            message: message,
        });
        this.promisesSeen += 1;
        promise.then(function () {
            _this.promisesFulfilled += 1;
        }).catch(function () {
            _this.promisesRejected += 1;
        }).finally(function () {
            _this.promiseInfo.delete(promise);
        });
    };
    TaskTracker.prototype.hasPendingTasks = function () {
        return this.promisesSeen > (this.promisesFulfilled + this.promisesRejected);
    };
    TaskTracker.prototype.progressMessage = function () {
        var value = this.promiseInfo.values().next().value;
        if (value === undefined) {
            return value;
        }
        else {
            var nowMs = (new Date()).getMilliseconds();
            var runtimeSeconds = Math.round((nowMs - value.startTimeMs) / 1000);
            return "".concat(value.message, " (").concat(runtimeSeconds, "s)");
        }
    };
    return TaskTracker;
}());
exports.TaskTracker = TaskTracker;
exports.taskTracker = new task_tracker_2.TaskTracker();
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
var deferred_1 = require("../base/deferred");
var WebContentScriptMessageType;
(function (WebContentScriptMessageType) {
    WebContentScriptMessageType[WebContentScriptMessageType["UNKNOWN"] = 0] = "UNKNOWN";
    WebContentScriptMessageType[WebContentScriptMessageType["CONVERT_OBJECT_URL"] = 1] = "CONVERT_OBJECT_URL";
    WebContentScriptMessageType[WebContentScriptMessageType["CONVERT_OBJECT_URL_RESPONSE"] = 2] = "CONVERT_OBJECT_URL_RESPONSE";
})(WebContentScriptMessageType || (WebContentScriptMessageType = {}));
var ANDROID_BUG_TOOL_EXTENSION_ID = 'mbbaofdfoekifkfpgehgffcpagbbjkmj';
function loadAndroidBugToolInfo() {
    var _this = this;
    var deferred = (0, deferred_1.defer)();
    // Request to convert the blob object url "blob:chrome-extension://xxx"
    // the chrome extension has to a web downloadable url "blob:http://xxx".
    chrome.runtime.sendMessage(ANDROID_BUG_TOOL_EXTENSION_ID, { action: WebContentScriptMessageType.CONVERT_OBJECT_URL }, function (response) { return __awaiter(_this, void 0, void 0, function () {
        var _a, filesBlobPromises, files;
        var _this = this;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = response.action;
                    switch (_a) {
                        case WebContentScriptMessageType.CONVERT_OBJECT_URL_RESPONSE: return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 5];
                case 1:
                    if (!(((_b = response.attachments) === null || _b === void 0 ? void 0 : _b.length) > 0)) return [3 /*break*/, 3];
                    filesBlobPromises = response.attachments.map(function (attachment) { return __awaiter(_this, void 0, void 0, function () {
                        var fileQueryResponse, blob;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fetch(attachment.objectUrl)];
                                case 1:
                                    fileQueryResponse = _a.sent();
                                    return [4 /*yield*/, fileQueryResponse.blob()];
                                case 2:
                                    blob = _a.sent();
                                    // Note: The blob's media type is always set to "image/png".
                                    // Clone blob to clear media type.
                                    return [2 /*return*/, new File([blob], attachment.name)];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(filesBlobPromises)];
                case 2:
                    files = _c.sent();
                    deferred.resolve({
                        issueId: response.issueId,
                        issueTitle: response.issueTitle,
                        file: files[0],
                    });
                    return [3 /*break*/, 4];
                case 3: throw new Error('Got no attachements from extension');
                case 4: return [3 /*break*/, 6];
                case 5: throw new Error("Received unhandled response code (".concat(response.action, ") from extension."));
                case 6: return [2 /*return*/];
            }
        });
    }); });
    return deferred;
}
exports.loadAndroidBugToolInfo = loadAndroidBugToolInfo;
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
var actions_1 = require("../common/actions");
var aggregation_data_1 = require("../common/aggregation_data");
var logs_1 = require("../common/logs");
var keyboard_event_handler_1 = require("./keyboard_event_handler");
function publishOverviewData(data) {
    var _a;
    for (var _i = 0, _b = Object.entries(data); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], value_3 = _c[1];
        if (!exports.globals.overviewStore.has(key)) {
            exports.globals.overviewStore.set(key, []);
        }
        if (value_3 instanceof Array) {
            (_a = exports.globals.overviewStore.get(key)).push.apply(_a, value_3);
        }
        else {
            exports.globals.overviewStore.get(key).push(value_3);
        }
    }
    exports.globals.rafScheduler.scheduleRedraw();
}
exports.publishOverviewData = publishOverviewData;
function publishTrackData(args) {
    exports.globals.setTrackData(args.id, args.data);
    if ([logs_1.LogExistsKey, logs_1.LogBoundsKey, logs_1.LogEntriesKey].includes(args.id)) {
        var data = exports.globals.trackDataStore.get(logs_1.LogExistsKey);
        if (data && data.exists)
            exports.globals.rafScheduler.scheduleFullRedraw();
    }
    else {
        exports.globals.rafScheduler.scheduleRedraw();
    }
}
exports.publishTrackData = publishTrackData;
function publishMetricResult(metricResult) {
    exports.globals.setMetricResult(metricResult);
    exports.globals.publishRedraw();
}
exports.publishMetricResult = publishMetricResult;
function publishSelectedFlows(selectedFlows) {
    exports.globals.selectedFlows = selectedFlows;
    exports.globals.publishRedraw();
}
exports.publishSelectedFlows = publishSelectedFlows;
function publishCounterDetails(click) {
    exports.globals.counterDetails = click;
    exports.globals.publishRedraw();
}
exports.publishCounterDetails = publishCounterDetails;
function publishFlamegraphDetails(click) {
    exports.globals.flamegraphDetails = click;
    exports.globals.publishRedraw();
}
exports.publishFlamegraphDetails = publishFlamegraphDetails;
function publishCpuProfileDetails(details) {
    exports.globals.cpuProfileDetails = details;
    exports.globals.publishRedraw();
}
exports.publishCpuProfileDetails = publishCpuProfileDetails;
function publishFtraceCounters(counters) {
    exports.globals.ftraceCounters = counters;
    exports.globals.publishRedraw();
}
exports.publishFtraceCounters = publishFtraceCounters;
function publishConversionJobStatusUpdate(job) {
    exports.globals.setConversionJobStatus(job.jobName, job.jobStatus);
    exports.globals.publishRedraw();
}
exports.publishConversionJobStatusUpdate = publishConversionJobStatusUpdate;
function publishLoading(numQueuedQueries) {
    exports.globals.numQueuedQueries = numQueuedQueries;
    // TODO(hjd): Clean up loadingAnimation given that this now causes a full
    // redraw anyways. Also this should probably just go via the global state.
    exports.globals.rafScheduler.scheduleFullRedraw();
}
exports.publishLoading = publishLoading;
function publishBufferUsage(args) {
    exports.globals.setBufferUsage(args.percentage);
    exports.globals.publishRedraw();
}
exports.publishBufferUsage = publishBufferUsage;
function publishSearch(args) {
    exports.globals.searchSummary = args;
    exports.globals.publishRedraw();
}
exports.publishSearch = publishSearch;
function publishSearchResult(args) {
    exports.globals.currentSearchResults = args;
    exports.globals.publishRedraw();
}
exports.publishSearchResult = publishSearchResult;
function publishRecordingLog(args) {
    exports.globals.setRecordingLog(args.logs);
    exports.globals.publishRedraw();
}
exports.publishRecordingLog = publishRecordingLog;
function publishTraceErrors(numErrors) {
    exports.globals.setTraceErrors(numErrors);
    exports.globals.publishRedraw();
}
exports.publishTraceErrors = publishTraceErrors;
function publishMetricError(error) {
    exports.globals.setMetricError(error);
    exports.globals.logging.logError(error, false);
    exports.globals.publishRedraw();
}
exports.publishMetricError = publishMetricError;
function publishAggregateData(args) {
    exports.globals.setAggregateData(args.kind, args.data);
    if (!(0, aggregation_data_1.isEmptyData)(args.data)) {
        exports.globals.dispatch(actions_1.Actions.setCurrentTab({ tab: args.data.tabName }));
    }
    exports.globals.publishRedraw();
}
exports.publishAggregateData = publishAggregateData;
function publishQueryResult(args) {
    exports.globals.queryResults.set(args.id, args.data);
    exports.globals.dispatch(actions_1.Actions.setCurrentTab({ tab: "query_result_".concat(args.id) }));
    exports.globals.publishRedraw();
}
exports.publishQueryResult = publishQueryResult;
function publishThreads(data) {
    exports.globals.threads.clear();
    data.forEach(function (thread) {
        exports.globals.threads.set(thread.utid, thread);
    });
    exports.globals.publishRedraw();
}
exports.publishThreads = publishThreads;
function publishSliceDetails(click) {
    exports.globals.sliceDetails = click;
    var id = click.id;
    if (id !== undefined && id === exports.globals.state.pendingScrollId) {
        (0, keyboard_event_handler_1.findCurrentSelection)();
        exports.globals.dispatch(actions_1.Actions.setCurrentTab({ tab: 'slice' }));
        exports.globals.dispatch(actions_1.Actions.clearPendingScrollId({ id: undefined }));
    }
    exports.globals.publishRedraw();
}
exports.publishSliceDetails = publishSliceDetails;
function publishThreadStateDetails(click) {
    exports.globals.threadStateDetails = click;
    exports.globals.publishRedraw();
}
exports.publishThreadStateDetails = publishThreadStateDetails;
function publishConnectedFlows(connectedFlows) {
    var _a;
    exports.globals.connectedFlows = connectedFlows;
    // If a chrome slice is selected and we have any flows in connectedFlows
    // we will find the flows on the right and left of that slice to set a default
    // focus. In all other cases the focusedFlowId(Left|Right) will be set to -1.
    exports.globals.dispatch(actions_1.Actions.setHighlightedFlowLeftId({ flowId: -1 }));
    exports.globals.dispatch(actions_1.Actions.setHighlightedFlowRightId({ flowId: -1 }));
    if (((_a = exports.globals.state.currentSelection) === null || _a === void 0 ? void 0 : _a.kind) === 'CHROME_SLICE') {
        var sliceId = exports.globals.state.currentSelection.id;
        for (var _i = 0, _b = exports.globals.connectedFlows; _i < _b.length; _i++) {
            var flow = _b[_i];
            if (flow.begin.sliceId === sliceId) {
                exports.globals.dispatch(actions_1.Actions.setHighlightedFlowRightId({ flowId: flow.id }));
            }
            if (flow.end.sliceId === sliceId) {
                exports.globals.dispatch(actions_1.Actions.setHighlightedFlowLeftId({ flowId: flow.id }));
            }
        }
    }
    exports.globals.publishRedraw();
}
exports.publishConnectedFlows = publishConnectedFlows;
function publishFtracePanelData(data) {
    exports.globals.ftracePanelData = data;
    exports.globals.publishRedraw();
}
exports.publishFtracePanelData = publishFtracePanelData;
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
var logging_1 = require("../base/logging");
var math_utils_1 = require("../base/math_utils");
var css_constants_1 = require("./css_constants");
var time_scale_1 = require("./time_scale");
Object.defineProperty(exports, "TimeScale", { enumerable: true, get: function () { return time_scale_1.TimeScale; } });
// Returns the optimal step size (in seconds) and tick pattern of ticks within
// the step. The returned step size has two properties: (1) It is 1, 2, or 5,
// multiplied by some integer power of 10. (2) It is maximised given the
// constraint: |range| / stepSize <= |maxNumberOfSteps|.
function getStepSize(range, maxNumberOfSteps) {
    // First, get the largest possible power of 10 that is smaller than the
    // desired step size, and use it as our initial step size.
    // For example, if the range is 2345ms and the desired steps is 10, then the
    // minimum step size is 234.5ms so the step size will initialise to 100.
    var minStepSize = range / maxNumberOfSteps;
    var zeros = Math.floor(Math.log10(minStepSize));
    var initialStepSize = Math.pow(10, zeros);
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
    var stepSizeMultipliers = [[1, '|....:....'], [2, '|.:.'], [5, '|....'], [10, '|....:....']];
    for (var _i = 0, stepSizeMultipliers_1 = stepSizeMultipliers; _i < stepSizeMultipliers_1.length; _i++) {
        var _a = stepSizeMultipliers_1[_i], multiplier = _a[0], pattern = _a[1];
        var newStepSize = multiplier * initialStepSize;
        var numberOfNewSteps = range / newStepSize;
        if (numberOfNewSteps <= maxNumberOfSteps) {
            return [newStepSize, pattern];
        }
    }
    throw new Error('Something has gone horribly wrong with maths');
}
exports.getStepSize = getStepSize;
function tickPatternToArray(pattern) {
    var array = Array.from(pattern);
    return array.map(function (char) {
        switch (char) {
            case '|':
                return gridline_helper_1.TickType.MAJOR;
            case ':':
                return gridline_helper_1.TickType.MEDIUM;
            case '.':
                return gridline_helper_1.TickType.MINOR;
            default:
                // This is almost certainly a developer/fat-finger error
                throw Error("Invalid char \"".concat(char, "\" in pattern \"").concat(pattern, "\""));
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
function guessDecimalPlaces(val) {
    var neglog10 = -Math.floor(Math.log10(val));
    var clamped = Math.max(0, neglog10);
    return clamped;
}
exports.guessDecimalPlaces = guessDecimalPlaces;
var TickType;
(function (TickType) {
    TickType[TickType["MAJOR"] = 0] = "MAJOR";
    TickType[TickType["MEDIUM"] = 1] = "MEDIUM";
    TickType[TickType["MINOR"] = 2] = "MINOR";
})(TickType = exports.TickType || (exports.TickType = {}));
var MIN_PX_PER_STEP = 80;
// An iterable which generates a series of ticks for a given timescale.
var TickGenerator = /** @class */ (function () {
    function TickGenerator(scale, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.minLabelPx, minLabelPx = _c === void 0 ? MIN_PX_PER_STEP : _c;
        this.scale = scale;
        (0, logging_1.assertTrue)(minLabelPx > 0, 'minLabelPx cannot be lte 0');
        (0, logging_1.assertTrue)(scale.widthPx > 0, 'widthPx cannot be lte 0');
        (0, logging_1.assertTrue)(scale.timeSpan.duration > 0, 'timeSpan.duration cannot be lte 0');
        var desiredSteps = scale.widthPx / minLabelPx;
        var _d = (0, gridline_helper_4.getStepSize)(scale.timeSpan.duration, desiredSteps), size = _d[0], pattern = _d[1];
        this._patternSize = size;
        this._tickPattern = tickPatternToArray(pattern);
    }
    // Returns an iterable, so this object can be iterated over directly using the
    // `for x of y` notation. The use of a generator here is just to make things
    // more elegant than creating an array of ticks and building an iterator for
    // it.
    TickGenerator.prototype[Symbol.iterator] = function () {
        var span, stepSize, start, timeAtStep, i, time, position, type;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    span = this.scale.timeSpan;
                    stepSize = this._patternSize / this._tickPattern.length;
                    start = (0, math_utils_1.roundDownNearest)(span.start, this._patternSize);
                    timeAtStep = function (i) { return start + (i * stepSize); };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(timeAtStep(i) < span.end)) return [3 /*break*/, 4];
                    time = timeAtStep(i);
                    if (!(time >= span.start)) return [3 /*break*/, 3];
                    position = Math.floor(this.scale.timeToPx(time));
                    type = this._tickPattern[i % this._tickPattern.length];
                    return [4 /*yield*/, { type: type, time: time, position: position }];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    Object.defineProperty(TickGenerator.prototype, "digits", {
        // The number of decimal places labels should be printed with, assuming labels
        // are only printed on major ticks.
        get: function () {
            return guessDecimalPlaces(this._patternSize);
        },
        enumerable: false,
        configurable: true
    });
    return TickGenerator;
}());
exports.TickGenerator = TickGenerator;
// Gets the timescale associated with the current visible window.
function timeScaleForVisibleWindow(startPx, endPx) {
    var span = exports.globals.frontendLocalState.visibleWindowTime;
    var spanRelative = span.add(-exports.globals.state.traceTime.startSec);
    return new time_scale_1.TimeScale(spanRelative, [startPx, endPx]);
}
exports.timeScaleForVisibleWindow = timeScaleForVisibleWindow;
function drawGridLines(ctx, width, height) {
    ctx.strokeStyle = exports.TRACK_BORDER_COLOR;
    ctx.lineWidth = 1;
    var timeScale = (0, gridline_helper_2.timeScaleForVisibleWindow)(exports.TRACK_SHELL_WIDTH, width);
    if (timeScale.timeSpan.duration > 0 && timeScale.widthPx > 0) {
        for (var _i = 0, _a = new gridline_helper_1.TickGenerator(timeScale); _i < _a.length; _i++) {
            var _b = _a[_i], type = _b.type, position = _b.position;
            if (type === gridline_helper_1.TickType.MAJOR) {
                ctx.beginPath();
                ctx.moveTo(position + 0.5, 0);
                ctx.lineTo(position + 0.5, height);
                ctx.stroke();
            }
        }
    }
}
exports.drawGridLines = drawGridLines;
var table_1 = require("./table");
Object.defineProperty(exports, "ColumnDescriptor", { enumerable: true, get: function () { return table_1.ColumnDescriptor; } });
Object.defineProperty(exports, "Table", { enumerable: true, get: function () { return table_1.Table; } });
Object.defineProperty(exports, "TableData", { enumerable: true, get: function () { return table_1.TableData; } });
var languagesList = [
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
var columns = [
    (0, table_1.numberColumn)('ID', function (x) { return x.id; }),
    (0, table_1.stringColumn)('Name', function (x) { return x.name; }),
    (0, table_1.numberColumn)('Year', function (x) { return x.year; }),
];
var TableShowcase = /** @class */ (function () {
    function TableShowcase() {
        this.data = new table_1.TableData(languagesList);
    }
    TableShowcase.prototype.view = function () {
        return (0, mithril_1.default)(table_1.Table, {
            data: this.data,
            columns: columns,
        });
    };
    return TableShowcase;
}());
exports.TableShowcase = TableShowcase;
var array_utils_1 = require("../../base/array_utils");
var comparison_utils_1 = require("../../base/comparison_utils");
var popup_menu_1 = require("../popup_menu");
Object.defineProperty(exports, "PopupMenuButton", { enumerable: true, get: function () { return popup_menu_1.PopupMenuButton; } });
var ColumnDescriptor = /** @class */ (function () {
    function ColumnDescriptor(name, render, attrs) {
        this.name = name;
        this.render = render;
        this.id = (attrs === null || attrs === void 0 ? void 0 : attrs.columnId) === undefined ? name : attrs.columnId;
        if (attrs === undefined) {
            return;
        }
        if (attrs.sortKey !== undefined && attrs.ordering !== undefined) {
            throw new Error('only one way to order a column should be specified');
        }
        if (attrs.sortKey !== undefined) {
            this.ordering = (0, comparison_utils_1.comparingBy)(attrs.sortKey, comparison_utils_1.compareUniversal);
        }
        if (attrs.ordering !== undefined) {
            this.ordering = attrs.ordering;
        }
    }
    return ColumnDescriptor;
}());
exports.ColumnDescriptor = ColumnDescriptor;
function numberColumn(name, getter, contextMenu) {
    return new table_1.ColumnDescriptor(name, getter, { contextMenu: contextMenu, sortKey: getter });
}
exports.numberColumn = numberColumn;
function stringColumn(name, getter, contextMenu) {
    return new table_1.ColumnDescriptor(name, getter, { contextMenu: contextMenu, sortKey: getter });
}
exports.stringColumn = stringColumn;
// Encapsulated table data, that contains the input to be displayed, as well as
// some helper information to allow sorting.
var TableData = /** @class */ (function () {
    function TableData(data) {
        this.data = data;
        this.permutation = (0, array_utils_1.range)(data.length);
    }
    TableData.prototype.iterateItems = function () {
        var _i, _a, index;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = this.permutation;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    index = _a[_i];
                    return [4 /*yield*/, this.data[index]];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    TableData.prototype.items = function () {
        return Array.from(this.iterateItems());
    };
    TableData.prototype.setItems = function (newItems) {
        this.data = newItems;
        this.permutation = (0, array_utils_1.range)(newItems.length);
        if (this._sortingInfo !== undefined) {
            this.reorder(this._sortingInfo);
        }
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    TableData.prototype.resetOrder = function () {
        this.permutation = (0, array_utils_1.range)(this.data.length);
        this._sortingInfo = undefined;
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    Object.defineProperty(TableData.prototype, "sortingInfo", {
        get: function () {
            return this._sortingInfo;
        },
        enumerable: false,
        configurable: true
    });
    TableData.prototype.reorder = function (info) {
        var _this = this;
        this._sortingInfo = info;
        this.permutation.sort((0, comparison_utils_1.withDirection)((0, comparison_utils_1.comparingBy)(function (index) { return _this.data[index]; }, info.ordering), info.direction));
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    return TableData;
}());
exports.TableData = TableData;
function directionOnIndex(columnId, info) {
    if (info === undefined) {
        return undefined;
    }
    return info.columnId === columnId ? info.direction : undefined;
}
var Table = /** @class */ (function () {
    function Table() {
    }
    Table.prototype.renderColumnHeader = function (vnode, column) {
        var currDirection = undefined;
        var items = column.contextMenu;
        if (column.ordering !== undefined) {
            var ordering_1 = column.ordering;
            currDirection = directionOnIndex(column.id, vnode.attrs.data.sortingInfo);
            var newItems = [];
            if (currDirection !== 'ASC') {
                newItems.push((0, popup_menu_1.menuItem)('Sort ascending', function () {
                    vnode.attrs.data.reorder({ columnId: column.id, direction: 'ASC', ordering: ordering_1 });
                }));
            }
            if (currDirection !== 'DESC') {
                newItems.push((0, popup_menu_1.menuItem)('Sort descending', function () {
                    vnode.attrs.data.reorder({
                        columnId: column.id,
                        direction: 'DESC',
                        ordering: ordering_1,
                    });
                }));
            }
            if (currDirection !== undefined) {
                newItems.push((0, popup_menu_1.menuItem)('Restore original order', function () {
                    vnode.attrs.data.resetOrder();
                }));
            }
            items = __spreadArray(__spreadArray([], newItems, true), (items !== null && items !== void 0 ? items : []), true);
        }
        return (0, mithril_1.default)('td', column.name, items === undefined ? null : (0, mithril_1.default)(popup_menu_1.PopupMenuButton, {
            icon: (0, popup_menu_1.popupMenuIcon)(currDirection),
            items: items,
        }));
    };
    Table.prototype.checkValid = function (attrs) {
        if (!(0, array_utils_1.allUnique)(attrs.columns.map(function (c) { return c.id; }))) {
            throw new Error('column IDs should be unique');
        }
    };
    Table.prototype.oncreate = function (vnode) {
        this.checkValid(vnode.attrs);
    };
    Table.prototype.onupdate = function (vnode) {
        this.checkValid(vnode.attrs);
    };
    Table.prototype.view = function (vnode) {
        var _this = this;
        var attrs = vnode.attrs;
        return (0, mithril_1.default)('table.generic-table', (0, mithril_1.default)('thead', (0, mithril_1.default)('tr.header', attrs.columns.map(function (column) { return _this.renderColumnHeader(vnode, column); }))), attrs.data.items().map(function (row) {
            return (0, mithril_1.default)('tr', attrs.columns.map(function (column) { return (0, mithril_1.default)('td', column.render(row)); }));
        }));
    };
    return Table;
}());
exports.Table = Table;
var modal_1 = require("../modal");
var pivot_table_argument_popup_1 = require("../pivot_table_argument_popup");
Object.defineProperty(exports, "ArgumentPopup", { enumerable: true, get: function () { return pivot_table_argument_popup_1.ArgumentPopup; } });
var AttributeModalHolder = /** @class */ (function () {
    function AttributeModalHolder(callback) {
        this.showModal = false;
        this.typedArgument = '';
        this.callback = callback;
    }
    AttributeModalHolder.prototype.start = function () {
        this.showModal = true;
        exports.fullscreenModalContainer.createNew(this.renderModal());
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    AttributeModalHolder.prototype.renderModal = function () {
        var _this = this;
        return {
            title: 'Enter argument name',
            content: (0, mithril_1.default)(pivot_table_argument_popup_1.ArgumentPopup, {
                knownArguments: exports.globals.state.nonSerializableState.pivotTable.argumentNames,
                onArgumentChange: function (arg) {
                    _this.typedArgument = arg;
                },
            }),
            buttons: [
                {
                    text: 'Add',
                    action: function () {
                        _this.callback(_this.typedArgument);
                        _this.typedArgument = '';
                    },
                },
            ],
            onClose: function () {
                _this.showModal = false;
            },
        };
    };
    // A method that should be called in `view` method of whatever component is
    // using the attribute modal.
    AttributeModalHolder.prototype.update = function () {
        if (this.showModal) {
            exports.fullscreenModalContainer.updateVdom(this.renderModal());
        }
    };
    return AttributeModalHolder;
}());
exports.AttributeModalHolder = AttributeModalHolder;
var logging_2 = require("../base/logging");
var flamegraph_util_1 = require("../common/flamegraph_util");
var state_1 = require("../common/state");
var time_1 = require("../common/time");
var flamegraph_controller_1 = require("../controller/flamegraph_controller");
var flamegraph_1 = require("./flamegraph");
Object.defineProperty(exports, "Flamegraph", { enumerable: true, get: function () { return flamegraph_1.Flamegraph; } });
var modal_2 = require("./modal");
Object.defineProperty(exports, "Modal", { enumerable: true, get: function () { return modal_2.Modal; } });
var panel_1 = require("./panel");
Object.defineProperty(exports, "Panel", { enumerable: true, get: function () { return panel_1.Panel; } });
var rate_limiters_1 = require("./rate_limiters");
var router_1 = require("./router");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return router_1.Router; } });
var sidebar_1 = require("./sidebar");
var trace_converter_1 = require("./trace_converter");
var button_1 = require("./widgets/button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return button_1.Button; } });
var HEADER_HEIGHT = 30;
function toSelectedCallsite(c) {
    if (c !== undefined && c.name !== undefined) {
        return c.name;
    }
    return '(none)';
}
var RENDER_SELF_AND_TOTAL = {
    selfSize: 'Self',
    totalSize: 'Total',
};
var RENDER_OBJ_COUNT = {
    selfSize: 'Self objects',
    totalSize: 'Subtree objects',
};
var FlamegraphDetailsPanel = /** @class */ (function (_super) {
    __extends(FlamegraphDetailsPanel, _super);
    function FlamegraphDetailsPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.profileType = undefined;
        _this.ts = 0;
        _this.pids = [];
        _this.flamegraph = new flamegraph_1.Flamegraph([]);
        _this.focusRegex = '';
        _this.updateFocusRegexDebounced = (0, rate_limiters_1.debounce)(function () {
            _this.updateFocusRegex();
        }, 20);
        return _this;
    }
    FlamegraphDetailsPanel.prototype.view = function () {
        var _this = this;
        var flamegraphDetails = exports.globals.flamegraphDetails;
        if (flamegraphDetails && flamegraphDetails.type !== undefined &&
            flamegraphDetails.startNs !== undefined &&
            flamegraphDetails.durNs !== undefined &&
            flamegraphDetails.pids !== undefined &&
            flamegraphDetails.upids !== undefined) {
            this.profileType = (0, flamegraph_controller_1.profileType)(flamegraphDetails.type);
            this.ts = flamegraphDetails.startNs + flamegraphDetails.durNs;
            this.pids = flamegraphDetails.pids;
            if (flamegraphDetails.flamegraph) {
                this.flamegraph.updateDataIfChanged(this.nodeRendering(), flamegraphDetails.flamegraph);
            }
            var height = flamegraphDetails.flamegraph ?
                this.flamegraph.getHeight() + HEADER_HEIGHT :
                0;
            return (0, mithril_1.default)('.details-panel', {
                onclick: function (e) {
                    if (_this.flamegraph !== undefined) {
                        _this.onMouseClick({ y: e.layerY, x: e.layerX });
                    }
                    return false;
                },
                onmousemove: function (e) {
                    if (_this.flamegraph !== undefined) {
                        _this.onMouseMove({ y: e.layerY, x: e.layerX });
                        exports.globals.rafScheduler.scheduleRedraw();
                    }
                },
                onmouseout: function () {
                    if (_this.flamegraph !== undefined) {
                        _this.onMouseOut();
                    }
                },
            }, this.maybeShowModal(flamegraphDetails.graphIncomplete), (0, mithril_1.default)('.details-panel-heading.flamegraph-profile', { onclick: function (e) { return e.stopPropagation(); } }, [
                (0, mithril_1.default)('div.options', [
                    (0, mithril_1.default)('div.title', this.getTitle()),
                    this.getViewingOptionButtons(),
                ]),
                (0, mithril_1.default)('div.details', [
                    (0, mithril_1.default)('div.selected', "Selected function: ".concat(toSelectedCallsite(flamegraphDetails.expandedCallsite))),
                    (0, mithril_1.default)('div.time', "Snapshot time: ".concat((0, time_1.timeToCode)(flamegraphDetails.durNs))),
                    (0, mithril_1.default)('input[type=text][placeholder=Focus]', {
                        oninput: function (e) {
                            var target = e.target;
                            _this.focusRegex = target.value;
                            _this.updateFocusRegexDebounced();
                        },
                        // Required to stop hot-key handling:
                        onkeydown: function (e) { return e.stopPropagation(); },
                    }),
                    (this.profileType === state_1.ProfileType.NATIVE_HEAP_PROFILE ||
                        this.profileType === state_1.ProfileType.JAVA_HEAP_SAMPLES) &&
                        (0, mithril_1.default)(button_1.Button, {
                            icon: 'file_download',
                            onclick: function () {
                                _this.downloadPprof();
                            },
                        }),
                ]),
            ]), (0, mithril_1.default)("div[style=height:".concat(height, "px]")));
        }
        else {
            return (0, mithril_1.default)('.details-panel', (0, mithril_1.default)('.details-panel-heading', (0, mithril_1.default)('h2', "Flamegraph Profile")));
        }
    };
    FlamegraphDetailsPanel.prototype.maybeShowModal = function (graphIncomplete) {
        if (!graphIncomplete || exports.globals.state.flamegraphModalDismissed) {
            return undefined;
        }
        return (0, mithril_1.default)(modal_2.Modal, {
            title: 'The flamegraph is incomplete',
            vAlign: 'TOP',
            content: (0, mithril_1.default)('div', 'The current trace does not have a fully formed flamegraph'),
            buttons: [
                {
                    text: 'Show the errors',
                    primary: true,
                    action: function () { return router_1.Router.navigate('#!/info'); },
                },
                {
                    text: 'Skip',
                    action: function () {
                        exports.globals.dispatch(actions_1.Actions.dismissFlamegraphModal({}));
                        exports.globals.rafScheduler.scheduleFullRedraw();
                    },
                },
            ],
        });
    };
    FlamegraphDetailsPanel.prototype.getTitle = function () {
        switch (this.profileType) {
            case state_1.ProfileType.HEAP_PROFILE:
                return 'Heap profile:';
            case state_1.ProfileType.NATIVE_HEAP_PROFILE:
                return 'Native heap profile:';
            case state_1.ProfileType.JAVA_HEAP_SAMPLES:
                return 'Java heap samples:';
            case state_1.ProfileType.JAVA_HEAP_GRAPH:
                return 'Java heap graph:';
            case state_1.ProfileType.PERF_SAMPLE:
                return 'Profile:';
            default:
                throw new Error('unknown type');
        }
    };
    FlamegraphDetailsPanel.prototype.nodeRendering = function () {
        if (this.profileType === undefined) {
            return {};
        }
        var viewingOption = exports.globals.state.currentFlamegraphState.viewingOption;
        switch (this.profileType) {
            case state_1.ProfileType.JAVA_HEAP_GRAPH:
                if (viewingOption === flamegraph_util_1.OBJECTS_ALLOCATED_NOT_FREED_KEY) {
                    return RENDER_OBJ_COUNT;
                }
                else {
                    return RENDER_SELF_AND_TOTAL;
                }
            case state_1.ProfileType.HEAP_PROFILE:
            case state_1.ProfileType.NATIVE_HEAP_PROFILE:
            case state_1.ProfileType.JAVA_HEAP_SAMPLES:
            case state_1.ProfileType.PERF_SAMPLE:
                return RENDER_SELF_AND_TOTAL;
            default:
                throw new Error('unknown type');
        }
    };
    FlamegraphDetailsPanel.prototype.updateFocusRegex = function () {
        exports.globals.dispatch(actions_1.Actions.changeFocusFlamegraphState({
            focusRegex: this.focusRegex,
        }));
    };
    FlamegraphDetailsPanel.prototype.getViewingOptionButtons = function () {
        return mithril_1.default.apply(void 0, __spreadArray(['div'], flamegraph_panel_1.FlamegraphDetailsPanel.selectViewingOptions((0, logging_2.assertExists)(this.profileType)), false));
    };
    FlamegraphDetailsPanel.prototype.downloadPprof = function () {
        var _this = this;
        var engine = exports.globals.getCurrentEngine();
        if (!engine)
            return;
        (0, sidebar_1.getCurrentTrace)()
            .then(function (file) {
            (0, logging_1.assertTrue)(_this.pids.length === 1, 'Native profiles can only contain one pid.');
            (0, trace_converter_1.convertTraceToPprofAndDownload)(file, _this.pids[0], _this.ts);
        })
            .catch(function (error) {
            throw new Error("Failed to get current trace ".concat(error));
        });
    };
    FlamegraphDetailsPanel.prototype.changeFlamegraphData = function () {
        var data = exports.globals.flamegraphDetails;
        var flamegraphData = data.flamegraph === undefined ? [] : data.flamegraph;
        this.flamegraph.updateDataIfChanged(this.nodeRendering(), flamegraphData, data.expandedCallsite);
    };
    FlamegraphDetailsPanel.prototype.renderCanvas = function (ctx, size) {
        this.changeFlamegraphData();
        var current = exports.globals.state.currentFlamegraphState;
        if (current === null)
            return;
        var unit = current.viewingOption === flamegraph_util_1.SPACE_MEMORY_ALLOCATED_NOT_FREED_KEY ||
            current.viewingOption === flamegraph_util_1.ALLOC_SPACE_MEMORY_ALLOCATED_KEY ?
            'B' :
            '';
        this.flamegraph.draw(ctx, size.width, size.height, 0, HEADER_HEIGHT, unit);
    };
    FlamegraphDetailsPanel.prototype.onMouseClick = function (_a) {
        var x = _a.x, y = _a.y;
        var expandedCallsite = this.flamegraph.onMouseClick({ x: x, y: y });
        exports.globals.dispatch(actions_1.Actions.expandFlamegraphState({ expandedCallsite: expandedCallsite }));
        return true;
    };
    FlamegraphDetailsPanel.prototype.onMouseMove = function (_a) {
        var x = _a.x, y = _a.y;
        this.flamegraph.onMouseMove({ x: x, y: y });
        return true;
    };
    FlamegraphDetailsPanel.prototype.onMouseOut = function () {
        this.flamegraph.onMouseOut();
    };
    FlamegraphDetailsPanel.selectViewingOptions = function (profileType) {
        switch (profileType) {
            case state_1.ProfileType.PERF_SAMPLE:
                return [this.buildButtonComponent(flamegraph_util_1.PERF_SAMPLES_KEY, 'Samples')];
            case state_1.ProfileType.JAVA_HEAP_GRAPH:
                return [
                    this.buildButtonComponent(flamegraph_util_1.SPACE_MEMORY_ALLOCATED_NOT_FREED_KEY, 'Size'),
                    this.buildButtonComponent(flamegraph_util_1.OBJECTS_ALLOCATED_NOT_FREED_KEY, 'Objects'),
                ];
            case state_1.ProfileType.HEAP_PROFILE:
                return [
                    this.buildButtonComponent(flamegraph_util_1.SPACE_MEMORY_ALLOCATED_NOT_FREED_KEY, 'Unreleased size'),
                    this.buildButtonComponent(flamegraph_util_1.OBJECTS_ALLOCATED_NOT_FREED_KEY, 'Unreleased count'),
                    this.buildButtonComponent(flamegraph_util_1.ALLOC_SPACE_MEMORY_ALLOCATED_KEY, 'Total size'),
                    this.buildButtonComponent(flamegraph_util_1.OBJECTS_ALLOCATED_KEY, 'Total count'),
                ];
            case state_1.ProfileType.NATIVE_HEAP_PROFILE:
                return [
                    this.buildButtonComponent(flamegraph_util_1.SPACE_MEMORY_ALLOCATED_NOT_FREED_KEY, 'Unreleased malloc size'),
                    this.buildButtonComponent(flamegraph_util_1.OBJECTS_ALLOCATED_NOT_FREED_KEY, 'Unreleased malloc count'),
                    this.buildButtonComponent(flamegraph_util_1.ALLOC_SPACE_MEMORY_ALLOCATED_KEY, 'Total malloc size'),
                    this.buildButtonComponent(flamegraph_util_1.OBJECTS_ALLOCATED_KEY, 'Total malloc count'),
                ];
            case state_1.ProfileType.JAVA_HEAP_SAMPLES:
                return [
                    this.buildButtonComponent(flamegraph_util_1.ALLOC_SPACE_MEMORY_ALLOCATED_KEY, 'Total allocation size'),
                    this.buildButtonComponent(flamegraph_util_1.OBJECTS_ALLOCATED_KEY, 'Total allocation count'),
                ];
            default:
                throw new Error("Unexpected profile type ".concat(profileType));
        }
    };
    FlamegraphDetailsPanel.buildButtonComponent = function (viewingOption, text) {
        var active = (exports.globals.state.currentFlamegraphState !== null &&
            exports.globals.state.currentFlamegraphState.viewingOption === viewingOption);
        return (0, mithril_1.default)(button_1.Button, {
            label: text,
            active: active,
            minimal: true,
            onclick: function () {
                exports.globals.dispatch(actions_1.Actions.changeViewFlamegraphState({ viewingOption: viewingOption }));
            },
        });
    };
    return FlamegraphDetailsPanel;
}(panel_1.Panel));
exports.FlamegraphDetailsPanel = FlamegraphDetailsPanel;
var time_2 = require("../common/time");
var time_3 = require("../common/time");
var css_constants_2 = require("./css_constants");
var logs_filters_1 = require("./logs_filters");
Object.defineProperty(exports, "LogsFilters", { enumerable: true, get: function () { return logs_filters_1.LogsFilters; } });
var ROW_H = 20;
var LogPanel = /** @class */ (function (_super) {
    __extends(LogPanel, _super);
    function LogPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visibleRowOffset = 0;
        _this.visibleRowCount = 0;
        return _this;
    }
    LogPanel.prototype.recomputeVisibleRowsAndUpdate = function () {
        var scrollContainer = (0, logging_2.assertExists)(this.scrollContainer);
        var prevOffset = this.visibleRowOffset;
        var prevCount = this.visibleRowCount;
        this.visibleRowOffset = Math.floor(scrollContainer.scrollTop / ROW_H);
        this.visibleRowCount = Math.ceil(scrollContainer.clientHeight / ROW_H);
        if (this.visibleRowOffset !== prevOffset ||
            this.visibleRowCount !== prevCount) {
            exports.globals.dispatch(actions_1.Actions.updateLogsPagination({
                offset: this.visibleRowOffset,
                count: this.visibleRowCount,
            }));
        }
    };
    LogPanel.prototype.oncreate = function (_a) {
        var dom = _a.dom;
        this.scrollContainer = (0, logging_2.assertExists)(dom.parentElement.parentElement.parentElement);
        this.scrollContainer.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
        this.bounds = exports.globals.trackDataStore.get(logs_1.LogBoundsKey);
        this.entries = exports.globals.trackDataStore.get(logs_1.LogEntriesKey);
        this.recomputeVisibleRowsAndUpdate();
    };
    LogPanel.prototype.onbeforeupdate = function (_) {
        this.bounds = exports.globals.trackDataStore.get(logs_1.LogBoundsKey);
        this.entries = exports.globals.trackDataStore.get(logs_1.LogEntriesKey);
        this.recomputeVisibleRowsAndUpdate();
    };
    LogPanel.prototype.onScroll = function () {
        if (this.scrollContainer === undefined)
            return;
        this.recomputeVisibleRowsAndUpdate();
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    LogPanel.prototype.onRowOver = function (ts) {
        exports.globals.dispatch(actions_1.Actions.setHoverCursorTimestamp({ ts: ts }));
    };
    LogPanel.prototype.onRowOut = function () {
        exports.globals.dispatch(actions_1.Actions.setHoverCursorTimestamp({ ts: -1 }));
    };
    LogPanel.prototype.totalRows = function () {
        if (!this.bounds) {
            return { isStale: false, total: 0, offset: 0, count: 0 };
        }
        var _a = this.bounds, total = _a.total, startTs = _a.startTs, endTs = _a.endTs, firstRowTs = _a.firstRowTs, lastRowTs = _a.lastRowTs;
        var vis = exports.globals.frontendLocalState.visibleWindowTime;
        var leftSpan = new time_3.TimeSpan(startTs, firstRowTs);
        var rightSpan = new time_3.TimeSpan(lastRowTs, endTs);
        var isStaleLeft = !leftSpan.isInBounds(vis.start);
        var isStaleRight = !rightSpan.isInBounds(vis.end);
        var isStale = isStaleLeft || isStaleRight;
        var offset = Math.min(this.visibleRowOffset, total);
        var visCount = Math.min(total - offset, this.visibleRowCount);
        return { isStale: isStale, total: total, count: visCount, offset: offset };
    };
    LogPanel.prototype.view = function (_) {
        var _a = this.totalRows(), isStale = _a.isStale, total = _a.total, offset = _a.offset, count = _a.count;
        var hasProcessNames = this.entries &&
            this.entries.processName.filter(function (name) { return name; }).length > 0;
        var rows = [];
        rows.push((0, mithril_1.default)(".row", (0, mithril_1.default)('.cell.row-header', 'Timestamp'), (0, mithril_1.default)('.cell.row-header', 'Level'), (0, mithril_1.default)('.cell.row-header', 'Tag'), hasProcessNames ? (0, mithril_1.default)('.cell.with-process.row-header', 'Process name') :
            undefined, hasProcessNames ? (0, mithril_1.default)('.cell.with-process.row-header', 'Message') :
            (0, mithril_1.default)('.cell.no-process.row-header', 'Message'), (0, mithril_1.default)('br')));
        if (this.entries) {
            var offset_1 = this.entries.offset;
            var timestamps = this.entries.timestamps;
            var priorities = this.entries.priorities;
            var tags = this.entries.tags;
            var messages = this.entries.messages;
            var processNames = this.entries.processName;
            for (var i = 0; i < this.entries.timestamps.length; i++) {
                var priorityLetter = exports.LOG_PRIORITIES[priorities[i]][0];
                var ts = timestamps[i];
                var prioClass = priorityLetter || '';
                var style = {
                    // 1.5 is for the width of the header
                    top: "".concat((offset_1 + i + 1.5) * ROW_H, "px"),
                };
                if (this.entries.isHighlighted[i]) {
                    style.backgroundColor = exports.SELECTED_LOG_ROWS_COLOR;
                }
                rows.push((0, mithril_1.default)(".row.".concat(prioClass), {
                    'class': isStale ? 'stale' : '',
                    style: style,
                    'onmouseover': this.onRowOver.bind(this, ts / 1e9),
                    'onmouseout': this.onRowOut.bind(this),
                }, (0, mithril_1.default)('.cell', (0, time_2.formatTimestamp)(ts / 1e9 - exports.globals.state.traceTime.startSec)), (0, mithril_1.default)('.cell', priorityLetter || '?'), (0, mithril_1.default)('.cell', tags[i]), hasProcessNames ? (0, mithril_1.default)('.cell.with-process', processNames[i]) :
                    undefined, hasProcessNames ? (0, mithril_1.default)('.cell.with-process', messages[i]) :
                    (0, mithril_1.default)('.cell.no-process', messages[i]), (0, mithril_1.default)('br')));
            }
        }
        return (0, mithril_1.default)('.log-panel', (0, mithril_1.default)('header', {
            'class': isStale ? 'stale' : '',
        }, [
            (0, mithril_1.default)('.log-rows-label', "Logs rows [".concat(offset, ", ").concat(offset + count, "] / ").concat(total)),
            (0, mithril_1.default)(logs_filters_1.LogsFilters),
        ]), (0, mithril_1.default)('.rows', { style: { height: "".concat(total * ROW_H, "px") } }, rows));
    };
    LogPanel.prototype.renderCanvas = function () { };
    return LogPanel;
}(panel_1.Panel));
exports.LogPanel = LogPanel;
var rate_limiters_2 = require("./rate_limiters");
function chooseLatest(current, next) {
    if (next !== current && next.lastUpdate > current.lastUpdate) {
        // |next| is from state. Callers may mutate the return value of
        // this function so we need to clone |next| to prevent bad mutations
        // of state:
        return Object.assign({}, next);
    }
    return current;
}
function capBetween(t, start, end) {
    return Math.min(Math.max(t, start), end);
}
// Calculate the space a scrollbar takes up so that we can subtract it from
// the canvas width.
function calculateScrollbarWidth() {
    var outer = document.createElement('div');
    outer.style.overflowY = 'scroll';
    var inner = document.createElement('div');
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var width = outer.getBoundingClientRect().width - inner.getBoundingClientRect().width;
    document.body.removeChild(outer);
    return width;
}
/**
 * State that is shared between several frontend components, but not the
 * controller. This state is updated at 60fps.
 */
var FrontendLocalState = /** @class */ (function () {
    function FrontendLocalState() {
        var _this = this;
        this.visibleWindowTime = new time_3.TimeSpan(0, 10);
        this.timeScale = new time_scale_1.TimeScale(this.visibleWindowTime, [0, 0]);
        this.showPanningHint = false;
        this.showCookieConsent = false;
        this.visibleTracks = new Set();
        this.prevVisibleTracks = new Set();
        this.httpRpcState = { connected: false };
        this.newVersionAvailable = false;
        // This is used to calculate the tracks within a Y range for area selection.
        this.areaY = {};
        this._visibleState = {
            lastUpdate: 0,
            startSec: 0,
            endSec: 10,
            resolution: 1,
        };
        this.ratelimitedUpdateVisible = (0, rate_limiters_2.ratelimit)(function () {
            exports.globals.dispatch(actions_1.Actions.setVisibleTraceTime(_this._visibleState));
        }, 50);
    }
    // TODO: there is some redundancy in the fact that both |visibleWindowTime|
    // and a |timeScale| have a notion of time range. That should live in one
    // place only.
    FrontendLocalState.prototype.getScrollbarWidth = function () {
        if (this.scrollBarWidth === undefined) {
            this.scrollBarWidth = calculateScrollbarWidth();
        }
        return this.scrollBarWidth;
    };
    FrontendLocalState.prototype.setHttpRpcState = function (httpRpcState) {
        this.httpRpcState = httpRpcState;
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    FrontendLocalState.prototype.addVisibleTrack = function (trackId) {
        this.visibleTracks.add(trackId);
    };
    // Called when beginning a canvas redraw.
    FrontendLocalState.prototype.clearVisibleTracks = function () {
        this.visibleTracks.clear();
    };
    // Called when the canvas redraw is complete.
    FrontendLocalState.prototype.sendVisibleTracks = function () {
        var _this = this;
        if (this.prevVisibleTracks.size !== this.visibleTracks.size ||
            !__spreadArray([], this.prevVisibleTracks, true).every(function (value) { return _this.visibleTracks.has(value); })) {
            exports.globals.dispatch(actions_1.Actions.setVisibleTracks({ tracks: Array.from(this.visibleTracks) }));
            this.prevVisibleTracks = new Set(this.visibleTracks);
        }
    };
    FrontendLocalState.prototype.mergeState = function (state) {
        // This is unfortunately subtle. This class mutates this._visibleState.
        // Since we may not mutate |state| (in order to make immer's immutable
        // updates work) this means that we have to make a copy of the visibleState.
        // when updating it. We don't want to have to do that unnecessarily so
        // chooseLatest returns a shallow clone of state.visibleState *only* when
        // that is the newer state. All of these complications should vanish when
        // we remove this class.
        var previousVisibleState = this._visibleState;
        this._visibleState = chooseLatest(this._visibleState, state.visibleState);
        var visibleStateWasUpdated = previousVisibleState !== this._visibleState;
        if (visibleStateWasUpdated) {
            this.updateLocalTime(new time_3.TimeSpan(this._visibleState.startSec, this._visibleState.endSec));
        }
    };
    FrontendLocalState.prototype.selectArea = function (startSec, endSec, tracks) {
        if (tracks === void 0) { tracks = this._selectedArea ? this._selectedArea.tracks : []; }
        (0, logging_1.assertTrue)(endSec >= startSec, "Impossible select area: startSec [".concat(startSec, "] >= endSec [").concat(endSec, "]"));
        this.showPanningHint = true;
        this._selectedArea = { startSec: startSec, endSec: endSec, tracks: tracks };
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    FrontendLocalState.prototype.deselectArea = function () {
        this._selectedArea = undefined;
        exports.globals.rafScheduler.scheduleRedraw();
    };
    Object.defineProperty(FrontendLocalState.prototype, "selectedArea", {
        get: function () {
            return this._selectedArea;
        },
        enumerable: false,
        configurable: true
    });
    FrontendLocalState.prototype.updateLocalTime = function (ts) {
        var traceTime = exports.globals.state.traceTime;
        var startSec = capBetween(ts.start, traceTime.startSec, traceTime.endSec);
        var endSec = capBetween(ts.end, traceTime.startSec, traceTime.endSec);
        this.visibleWindowTime = new time_3.TimeSpan(startSec, endSec);
        this.timeScale.setTimeBounds(this.visibleWindowTime);
        this.updateResolution();
    };
    FrontendLocalState.prototype.updateResolution = function () {
        this._visibleState.lastUpdate = Date.now() / 1000;
        this._visibleState.resolution = exports.globals.getCurResolution();
        this.ratelimitedUpdateVisible();
    };
    FrontendLocalState.prototype.updateVisibleTime = function (ts) {
        this.updateLocalTime(ts);
        this._visibleState.lastUpdate = Date.now() / 1000;
        this._visibleState.startSec = this.visibleWindowTime.start;
        this._visibleState.endSec = this.visibleWindowTime.end;
        this._visibleState.resolution = exports.globals.getCurResolution();
        this.ratelimitedUpdateVisible();
    };
    FrontendLocalState.prototype.getVisibleStateBounds = function () {
        return [this.visibleWindowTime.start, this.visibleWindowTime.end];
    };
    // Whenever start/end px of the timeScale is changed, update
    // the resolution.
    FrontendLocalState.prototype.updateLocalLimits = function (pxStart, pxEnd) {
        // Numbers received here can be negative or equal, but we should fix that
        // before updating the timescale.
        pxStart = Math.max(0, pxStart);
        pxEnd = Math.max(0, pxEnd);
        if (pxStart === pxEnd)
            pxEnd = pxStart + 1;
        this.timeScale.setLimitsPx(pxStart, pxEnd);
        this.updateResolution();
    };
    return FrontendLocalState;
}());
exports.FrontendLocalState = FrontendLocalState;
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
var state_2 = require("../common/state");
var record_config_types_1 = require("../controller/record_config_types");
var validators_1 = require("../controller/validators");
var LOCAL_STORAGE_RECORD_CONFIGS_KEY = 'recordConfigs';
var LOCAL_STORAGE_AUTOSAVE_CONFIG_KEY = 'autosaveConfig';
var LOCAL_STORAGE_RECORD_TARGET_OS_KEY = 'recordTargetOS';
var RecordConfigStore = /** @class */ (function () {
    function RecordConfigStore() {
        this.recordConfigs = [];
        this.recordConfigNames = new Set();
        this.reloadFromLocalStorage();
    }
    RecordConfigStore.prototype._save = function () {
        window.localStorage.setItem(LOCAL_STORAGE_RECORD_CONFIGS_KEY, JSON.stringify(this.recordConfigs.map(function (x) { return x.result; })));
    };
    RecordConfigStore.prototype.save = function (recordConfig, title) {
        // We reload from local storage in case of concurrent
        // modifications of local storage from a different tab.
        this.reloadFromLocalStorage();
        var savedTitle = title ? title : new Date().toJSON();
        var config = {
            title: savedTitle,
            config: recordConfig,
            key: new Date().toJSON(),
        };
        this.recordConfigs.push({ result: config, invalidKeys: [], extraKeys: [] });
        this.recordConfigNames.add(savedTitle);
        this._save();
    };
    RecordConfigStore.prototype.overwrite = function (recordConfig, key) {
        // We reload from local storage in case of concurrent
        // modifications of local storage from a different tab.
        this.reloadFromLocalStorage();
        var found = this.recordConfigs.find(function (e) { return e.result.key === key; });
        if (found === undefined) {
            throw new Error('trying to overwrite non-existing config');
        }
        found.result.config = recordConfig;
        this._save();
    };
    RecordConfigStore.prototype.delete = function (key) {
        // We reload from local storage in case of concurrent
        // modifications of local storage from a different tab.
        this.reloadFromLocalStorage();
        var idx = -1;
        for (var i = 0; i < this.recordConfigs.length; ++i) {
            if (this.recordConfigs[i].result.key === key) {
                idx = i;
                break;
            }
        }
        if (idx !== -1) {
            this.recordConfigNames.delete(this.recordConfigs[idx].result.title);
            this.recordConfigs.splice(idx, 1);
            this._save();
        }
        else {
            // TODO(bsebastien): Show a warning message to the user in the UI.
            console.warn('The config selected doesn\'t exist any more');
        }
    };
    RecordConfigStore.prototype.clearRecordConfigs = function () {
        this.recordConfigs = [];
        this.recordConfigNames.clear();
        this._save();
    };
    RecordConfigStore.prototype.reloadFromLocalStorage = function () {
        var configsLocalStorage = window.localStorage.getItem(LOCAL_STORAGE_RECORD_CONFIGS_KEY);
        if (configsLocalStorage) {
            this.recordConfigNames.clear();
            try {
                var validConfigLocalStorage = [];
                var parsedConfigsLocalStorage = JSON.parse(configsLocalStorage);
                // Check if it's an array.
                if (!Array.isArray(parsedConfigsLocalStorage)) {
                    this.clearRecordConfigs();
                    return;
                }
                for (var i = 0; i < parsedConfigsLocalStorage.length; ++i) {
                    try {
                        validConfigLocalStorage.push((0, validators_1.runValidator)(record_config_types_1.namedRecordConfigValidator, parsedConfigsLocalStorage[i]));
                    }
                    catch (_a) {
                        // Parsing failed with unrecoverable error (e.g. title or key are
                        // missing), ignore the result.
                        console.log('Validation of saved record config has failed: ' +
                            JSON.stringify(parsedConfigsLocalStorage[i]));
                    }
                }
                this.recordConfigs = validConfigLocalStorage;
                this._save();
            }
            catch (e) {
                this.clearRecordConfigs();
            }
        }
        else {
            this.clearRecordConfigs();
        }
    };
    RecordConfigStore.prototype.canSave = function (title) {
        return !this.recordConfigNames.has(title);
    };
    return RecordConfigStore;
}());
exports.RecordConfigStore = RecordConfigStore;
// This class is a singleton to avoid many instances
// conflicting as they attempt to edit localStorage.
exports.recordConfigStore = new RecordConfigStore();
var AutosaveConfigStore = /** @class */ (function () {
    function AutosaveConfigStore() {
        this.hasSavedConfig = false;
        this.config = (0, record_config_types_1.createEmptyRecordConfig)();
        var savedItem = window.localStorage.getItem(LOCAL_STORAGE_AUTOSAVE_CONFIG_KEY);
        if (savedItem === null) {
            return;
        }
        var parsed = JSON.parse(savedItem);
        if (parsed !== null && typeof parsed === 'object') {
            this.config = (0, validators_1.runValidator)(record_config_types_1.recordConfigValidator, parsed).result;
            this.hasSavedConfig = true;
        }
    }
    AutosaveConfigStore.prototype.get = function () {
        return this.config;
    };
    AutosaveConfigStore.prototype.save = function (newConfig) {
        window.localStorage.setItem(LOCAL_STORAGE_AUTOSAVE_CONFIG_KEY, JSON.stringify(newConfig));
        this.config = newConfig;
        this.hasSavedConfig = true;
    };
    return AutosaveConfigStore;
}());
exports.AutosaveConfigStore = AutosaveConfigStore;
exports.autosaveConfigStore = new AutosaveConfigStore();
var RecordTargetStore = /** @class */ (function () {
    function RecordTargetStore() {
        this.recordTargetOS =
            window.localStorage.getItem(LOCAL_STORAGE_RECORD_TARGET_OS_KEY);
    }
    RecordTargetStore.prototype.get = function () {
        return this.recordTargetOS;
    };
    RecordTargetStore.prototype.getValidTarget = function () {
        var validTargets = (0, state_2.getDefaultRecordingTargets)();
        var savedOS = this.get();
        var validSavedTarget = validTargets.find(function (el) { return el.os === savedOS; });
        return validSavedTarget || validTargets[0];
    };
    RecordTargetStore.prototype.save = function (newTargetOS) {
        window.localStorage.setItem(LOCAL_STORAGE_RECORD_TARGET_OS_KEY, newTargetOS);
        this.recordTargetOS = newTargetOS;
    };
    return RecordTargetStore;
}());
exports.RecordTargetStore = RecordTargetStore;
exports.recordTargetStore = new RecordTargetStore();
var anchor_1 = require("./anchor");
Object.defineProperty(exports, "Anchor", { enumerable: true, get: function () { return anchor_1.Anchor; } });
var classnames_1 = require("./classnames");
var icons_1 = require("./icons");
var pages_1 = require("./pages");
var table_showcase_1 = require("./tables/table_showcase");
Object.defineProperty(exports, "TableShowcase", { enumerable: true, get: function () { return table_showcase_1.TableShowcase; } });
var checkbox_1 = require("./widgets/checkbox");
Object.defineProperty(exports, "Checkbox", { enumerable: true, get: function () { return checkbox_1.Checkbox; } });
var empty_state_1 = require("./widgets/empty_state");
Object.defineProperty(exports, "EmptyState", { enumerable: true, get: function () { return empty_state_1.EmptyState; } });
var form_1 = require("./widgets/form");
Object.defineProperty(exports, "Form", { enumerable: true, get: function () { return form_1.Form; } });
Object.defineProperty(exports, "FormButtonBar", { enumerable: true, get: function () { return form_1.FormButtonBar; } });
Object.defineProperty(exports, "FormLabel", { enumerable: true, get: function () { return form_1.FormLabel; } });
var icon_1 = require("./widgets/icon");
Object.defineProperty(exports, "Icon", { enumerable: true, get: function () { return icon_1.Icon; } });
var menu_1 = require("./widgets/menu");
Object.defineProperty(exports, "Menu", { enumerable: true, get: function () { return menu_1.Menu; } });
Object.defineProperty(exports, "MenuDivider", { enumerable: true, get: function () { return menu_1.MenuDivider; } });
Object.defineProperty(exports, "MenuItem", { enumerable: true, get: function () { return menu_1.MenuItem; } });
Object.defineProperty(exports, "PopupMenu2", { enumerable: true, get: function () { return menu_1.PopupMenu2; } });
var multiselect_1 = require("./widgets/multiselect");
Object.defineProperty(exports, "MultiSelect", { enumerable: true, get: function () { return multiselect_1.MultiSelect; } });
var popup_1 = require("./widgets/popup");
Object.defineProperty(exports, "Popup", { enumerable: true, get: function () { return popup_1.Popup; } });
var portal_1 = require("./widgets/portal");
Object.defineProperty(exports, "Portal", { enumerable: true, get: function () { return portal_1.Portal; } });
var select_1 = require("./widgets/select");
Object.defineProperty(exports, "Select", { enumerable: true, get: function () { return select_1.Select; } });
var spinner_1 = require("./widgets/spinner");
Object.defineProperty(exports, "Spinner", { enumerable: true, get: function () { return spinner_1.Spinner; } });
var switch_1 = require("./widgets/switch");
Object.defineProperty(exports, "Switch", { enumerable: true, get: function () { return switch_1.Switch; } });
var text_input_1 = require("./widgets/text_input");
Object.defineProperty(exports, "TextInput", { enumerable: true, get: function () { return text_input_1.TextInput; } });
var tree_1 = require("./widgets/tree");
Object.defineProperty(exports, "Tree", { enumerable: true, get: function () { return tree_1.Tree; } });
Object.defineProperty(exports, "TreeNode", { enumerable: true, get: function () { return tree_1.TreeNode; } });
var options = {
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
    var portalOpen = false;
    return {
        view: function (_a) {
            var attrs = _a.attrs;
            var _b = attrs.zIndex, zIndex = _b === void 0 ? true : _b, _c = attrs.absolute, absolute = _c === void 0 ? true : _c, _d = attrs.top, top = _d === void 0 ? true : _d;
            return [
                (0, mithril_1.default)(button_1.Button, {
                    label: 'Toggle Portal',
                    onclick: function () {
                        portalOpen = !portalOpen;
                        exports.globals.rafScheduler.scheduleFullRedraw();
                    },
                }),
                portalOpen &&
                    (0, mithril_1.default)(portal_1.Portal, {
                        style: {
                            position: absolute && 'absolute',
                            top: top && '0',
                            zIndex: zIndex ? '10' : '0',
                            background: 'white',
                        },
                    }, (0, mithril_1.default)('', "A very simple portal - a div rendered outside of the normal\n              flow of the page")),
            ];
        },
    };
}
function lorem() {
    var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n      commodo consequat.Duis aute irure dolor in reprehenderit in voluptate\n      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\n      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id\n      est laborum.";
    return (0, mithril_1.default)('', { style: { width: '200px' } }, text);
}
function ControlledPopup() {
    var popupOpen = false;
    return {
        view: function () {
            return (0, mithril_1.default)(popup_1.Popup, {
                trigger: (0, mithril_1.default)(button_1.Button, { label: "".concat(popupOpen ? 'Close' : 'Open', " Popup") }),
                isOpen: popupOpen,
                onChange: function (shouldOpen) { return popupOpen = shouldOpen; },
            }, (0, mithril_1.default)(button_1.Button, {
                label: 'Close Popup',
                onclick: function () {
                    popupOpen = !popupOpen;
                    exports.globals.rafScheduler.scheduleFullRedraw();
                },
            }));
        },
    };
}
var EnumOption = /** @class */ (function () {
    function EnumOption(initial, options) {
        this.initial = initial;
        this.options = options;
    }
    return EnumOption;
}());
// A little helper class to render any vnode with a dynamic set of options
var WidgetShowcase = /** @class */ (function () {
    function WidgetShowcase() {
        this.optValues = {};
    }
    WidgetShowcase.prototype.renderOptions = function (listItems) {
        if (listItems.length === 0) {
            return null;
        }
        return (0, mithril_1.default)('.widget-controls', (0, mithril_1.default)('h3', 'Options'), (0, mithril_1.default)('ul', listItems));
    };
    WidgetShowcase.prototype.oninit = function (_a) {
        var opts = _a.attrs.initialOpts;
        this.opts = opts;
        if (opts) {
            // Make the initial options values
            for (var key in opts) {
                if (Object.prototype.hasOwnProperty.call(opts, key)) {
                    var option = opts[key];
                    if (option instanceof EnumOption) {
                        this.optValues[key] = option.initial;
                    }
                    else if (typeof option === 'boolean') {
                        this.optValues[key] = option;
                    }
                }
            }
        }
    };
    WidgetShowcase.prototype.view = function (_a) {
        var _b = _a.attrs, renderWidget = _b.renderWidget, wide = _b.wide;
        var listItems = [];
        if (this.opts) {
            for (var key in this.opts) {
                if (Object.prototype.hasOwnProperty.call(this.opts, key)) {
                    listItems.push((0, mithril_1.default)('li', this.renderControlForOption(key)));
                }
            }
        }
        return [
            (0, mithril_1.default)('.widget-block', (0, mithril_1.default)('div', {
                class: (0, classnames_1.classNames)('widget-container', wide && 'widget-container-wide'),
            }, renderWidget(this.optValues)), this.renderOptions(listItems)),
        ];
    };
    WidgetShowcase.prototype.renderControlForOption = function (key) {
        if (!this.opts)
            return null;
        var value = this.opts[key];
        if (value instanceof EnumOption) {
            return this.renderEnumOption(key, value);
        }
        else if (typeof value === 'boolean') {
            return this.renderBooleanOption(key);
        }
        else {
            return null;
        }
    };
    WidgetShowcase.prototype.renderBooleanOption = function (key) {
        var _this = this;
        return (0, mithril_1.default)(checkbox_1.Checkbox, {
            checked: this.optValues[key],
            label: key,
            onchange: function () {
                _this.optValues[key] = !_this.optValues[key];
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        });
    };
    WidgetShowcase.prototype.renderEnumOption = function (key, opt) {
        var _this = this;
        var optionElements = opt.options.map(function (option) {
            return (0, mithril_1.default)('option', { value: option }, option);
        });
        return (0, mithril_1.default)(select_1.Select, {
            value: this.optValues[key],
            onchange: function (e) {
                var el = e.target;
                _this.optValues[key] = el.value;
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, optionElements);
    };
    return WidgetShowcase;
}());
exports.WidgetsPage = (0, pages_1.createPage)({
    view: function () {
        return (0, mithril_1.default)('.widgets-page', (0, mithril_1.default)('h1', 'Widgets'), (0, mithril_1.default)('h2', 'Button'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (_a) {
                var label = _a.label, icon = _a.icon, rightIcon = _a.rightIcon, rest = __rest(_a, ["label", "icon", "rightIcon"]);
                return (0, mithril_1.default)(button_1.Button, __assign({ icon: icon ? 'send' : undefined, rightIcon: rightIcon ? 'arrow_forward' : undefined, label: label ? 'Button' : '' }, rest));
            },
            initialOpts: {
                label: true,
                icon: true,
                rightIcon: false,
                disabled: false,
                minimal: false,
                active: false,
                compact: false,
            },
        }), (0, mithril_1.default)('h2', 'Checkbox'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (opts) { return (0, mithril_1.default)(checkbox_1.Checkbox, __assign({ label: 'Checkbox' }, opts)); },
            initialOpts: {
                disabled: false,
            },
        }), (0, mithril_1.default)('h2', 'Switch'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (_a) {
                var label = _a.label, rest = __rest(_a, ["label"]);
                return (0, mithril_1.default)(switch_1.Switch, __assign({ label: label ? 'Switch' : undefined }, rest));
            },
            initialOpts: {
                label: true,
                disabled: false,
            },
        }), (0, mithril_1.default)('h2', 'Text Input'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (_a) {
                var placeholder = _a.placeholder, rest = __rest(_a, ["placeholder"]);
                return (0, mithril_1.default)(text_input_1.TextInput, __assign({ placeholder: placeholder ? 'Placeholder...' : '' }, rest));
            },
            initialOpts: {
                placeholder: true,
                disabled: false,
            },
        }), (0, mithril_1.default)('h2', 'Select'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (opts) {
                return (0, mithril_1.default)(select_1.Select, opts, [
                    (0, mithril_1.default)('option', { value: 'foo', label: 'Foo' }),
                    (0, mithril_1.default)('option', { value: 'bar', label: 'Bar' }),
                    (0, mithril_1.default)('option', { value: 'baz', label: 'Baz' }),
                ]);
            },
            initialOpts: {
                disabled: false,
            },
        }), (0, mithril_1.default)('h2', 'Empty State'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (_a) {
                var header = _a.header, content = _a.content;
                return (0, mithril_1.default)(empty_state_1.EmptyState, {
                    header: header && 'No search results found...',
                }, content && (0, mithril_1.default)(button_1.Button, { label: 'Try again' }));
            },
            initialOpts: {
                header: true,
                content: true,
            },
        }), (0, mithril_1.default)('h2', 'Anchor'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (_a) {
                var icon = _a.icon;
                return (0, mithril_1.default)(anchor_1.Anchor, {
                    icon: icon && 'open_in_new',
                    href: 'https://perfetto.dev/docs/',
                    target: '_blank',
                }, 'Docs');
            },
            initialOpts: {
                icon: true,
            },
        }), (0, mithril_1.default)('h2', 'Table'), (0, mithril_1.default)(WidgetShowcase, { renderWidget: function () { return (0, mithril_1.default)(table_showcase_1.TableShowcase); }, initialOpts: {}, wide: true }), (0, mithril_1.default)('h2', 'Portal'), (0, mithril_1.default)('p', "A portal is a div rendered out of normal flow of the\n        hierarchy."), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (opts) { return (0, mithril_1.default)(PortalButton, opts); },
            initialOpts: {
                absolute: true,
                zIndex: true,
                top: true,
            },
        }), (0, mithril_1.default)('h2', 'Popup'), (0, mithril_1.default)('p', "A popup is a nicely styled portal element whose position is\n        dynamically updated to appear to float alongside a specific element on\n        the page, even as the element is moved and scrolled around."), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (opts) { return (0, mithril_1.default)(popup_1.Popup, __assign({ trigger: (0, mithril_1.default)(button_1.Button, { label: 'Toggle Popup' }) }, opts), lorem()); },
            initialOpts: {
                position: new EnumOption(popup_1.PopupPosition.Auto, Object.values(popup_1.PopupPosition)),
                closeOnEscape: true,
                closeOnOutsideClick: true,
            },
        }), (0, mithril_1.default)('h2', 'Controlled Popup'), (0, mithril_1.default)('p', "The open/close state of a controlled popup is passed in via\n        the 'isOpen' attribute. This means we can get open or close the popup\n        from wherever we like. E.g. from a button inside the popup.\n        Keeping this state external also means we can modify other parts of the\n        page depending on whether the popup is open or not, such as the text\n        on this button.\n        Note, this is the same component as the popup above, but used in\n        controlled mode."), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (opts) { return (0, mithril_1.default)(ControlledPopup, opts); },
            initialOpts: {},
        }), (0, mithril_1.default)('h2', 'Icon'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (opts) { return (0, mithril_1.default)(icon_1.Icon, __assign({ icon: 'star' }, opts)); },
            initialOpts: { filled: false },
        }), (0, mithril_1.default)('h2', 'MultiSelect'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (_a) {
                var icon = _a.icon, rest = __rest(_a, ["icon"]);
                return (0, mithril_1.default)(multiselect_1.MultiSelect, __assign({ options: Object.entries(options).map(function (_a) {
                        var key = _a[0], value = _a[1];
                        return {
                            id: key,
                            name: key,
                            checked: value,
                        };
                    }), popupPosition: popup_1.PopupPosition.Top, label: 'Multi Select', icon: icon ? exports.LIBRARY_ADD_CHECK : undefined, onChange: function (diffs) {
                        diffs.forEach(function (_a) {
                            var id = _a.id, checked = _a.checked;
                            options[id] = checked;
                        });
                        exports.globals.rafScheduler.scheduleFullRedraw();
                    } }, rest));
            },
            initialOpts: {
                icon: true,
                showNumSelected: true,
                repeatCheckedItemsAtTop: false,
            },
        }), (0, mithril_1.default)('h2', 'PopupMenu'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function () {
                return (0, mithril_1.default)(popup_menu_1.PopupMenuButton, {
                    icon: 'description',
                    items: [
                        { itemType: 'regular', text: 'New', callback: function () { } },
                        { itemType: 'regular', text: 'Open', callback: function () { } },
                        { itemType: 'regular', text: 'Save', callback: function () { } },
                        { itemType: 'regular', text: 'Delete', callback: function () { } },
                        {
                            itemType: 'group',
                            text: 'Share',
                            itemId: 'foo',
                            children: [
                                { itemType: 'regular', text: 'Friends', callback: function () { } },
                                { itemType: 'regular', text: 'Family', callback: function () { } },
                                { itemType: 'regular', text: 'Everyone', callback: function () { } },
                            ],
                        },
                    ],
                });
            },
        }), (0, mithril_1.default)('h2', 'Menu'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function () { return (0, mithril_1.default)(menu_1.Menu, (0, mithril_1.default)(menu_1.MenuItem, { label: 'New', icon: 'add' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Open', icon: 'folder_open' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Save', icon: 'save', disabled: true }), (0, mithril_1.default)(menu_1.MenuDivider), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Delete', icon: 'delete' }), (0, mithril_1.default)(menu_1.MenuDivider), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Share', icon: 'share' }, (0, mithril_1.default)(menu_1.MenuItem, { label: 'Everyone', icon: 'public' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Friends', icon: 'group' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Specific people', icon: 'person_add' }, (0, mithril_1.default)(menu_1.MenuItem, { label: 'Alice', icon: 'person' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Bob', icon: 'person' }))), (0, mithril_1.default)(menu_1.MenuItem, { label: 'More', icon: 'more_horiz' }, (0, mithril_1.default)(menu_1.MenuItem, { label: 'Query', icon: 'database' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Download', icon: 'download' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Clone', icon: 'copy_all' }))); },
        }), (0, mithril_1.default)('h2', 'PopupMenu2'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (opts) { return (0, mithril_1.default)(menu_1.PopupMenu2, __assign({ trigger: (0, mithril_1.default)(button_1.Button, { label: 'Menu', icon: 'arrow_drop_down' }) }, opts), (0, mithril_1.default)(menu_1.MenuItem, { label: 'New', icon: 'add' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Open', icon: 'folder_open' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Save', icon: 'save', disabled: true }), (0, mithril_1.default)(menu_1.MenuDivider), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Delete', icon: 'delete' }), (0, mithril_1.default)(menu_1.MenuDivider), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Share', icon: 'share' }, (0, mithril_1.default)(menu_1.MenuItem, { label: 'Everyone', icon: 'public' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Friends', icon: 'group' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Specific people', icon: 'person_add' }, (0, mithril_1.default)(menu_1.MenuItem, { label: 'Alice', icon: 'person' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Bob', icon: 'person' }))), (0, mithril_1.default)(menu_1.MenuItem, { label: 'More', icon: 'more_horiz' }, (0, mithril_1.default)(menu_1.MenuItem, { label: 'Query', icon: 'database' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Download', icon: 'download' }), (0, mithril_1.default)(menu_1.MenuItem, { label: 'Clone', icon: 'copy_all' }))); },
            initialOpts: {
                popupPosition: new EnumOption(popup_1.PopupPosition.Bottom, Object.values(popup_1.PopupPosition)),
            },
        }), (0, mithril_1.default)('h2', 'Spinner'), (0, mithril_1.default)('p', "Simple spinner, rotates forever. Width and height match the font\n         size."), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (_a) {
                var fontSize = _a.fontSize, easing = _a.easing;
                return (0, mithril_1.default)('', { style: { fontSize: fontSize } }, (0, mithril_1.default)(spinner_1.Spinner, { easing: easing }));
            },
            initialOpts: {
                fontSize: new EnumOption('16px', ['12px', '16px', '24px', '32px', '64px', '128px']),
                easing: false,
            },
        }), (0, mithril_1.default)('h2', 'Tree'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function (opts) { return (0, mithril_1.default)(tree_1.Tree, opts, (0, mithril_1.default)(tree_1.TreeNode, { left: 'Name', right: 'my_event' }), (0, mithril_1.default)(tree_1.TreeNode, { left: 'CPU', right: '2' }), (0, mithril_1.default)(tree_1.TreeNode, {
                left: 'SQL',
                right: (0, mithril_1.default)(menu_1.PopupMenu2, {
                    trigger: (0, mithril_1.default)(anchor_1.Anchor, {
                        text: 'SELECT * FROM ftrace_event WHERE id = 123',
                        icon: 'unfold_more',
                    }),
                }, (0, mithril_1.default)(menu_1.MenuItem, {
                    label: 'Copy SQL Query',
                    icon: 'content_copy',
                }), (0, mithril_1.default)(menu_1.MenuItem, {
                    label: 'Execute Query in new tab',
                    icon: 'open_in_new',
                })),
            }), (0, mithril_1.default)(tree_1.TreeNode, {
                left: 'Thread',
                right: (0, mithril_1.default)(anchor_1.Anchor, { text: 'my_thread[456]', icon: 'open_in_new' }),
            }), (0, mithril_1.default)(tree_1.TreeNode, {
                left: 'Process',
                right: (0, mithril_1.default)(anchor_1.Anchor, { text: '/bin/foo[789]', icon: 'open_in_new' }),
            }), (0, mithril_1.default)(tree_1.TreeNode, { left: 'Args', right: 'foo: bar, baz: qux' }, (0, mithril_1.default)(tree_1.TreeNode, { left: 'foo', right: 'bar' }), (0, mithril_1.default)(tree_1.TreeNode, { left: 'baz', right: 'qux' }), (0, mithril_1.default)(tree_1.TreeNode, { left: 'quux' }, (0, mithril_1.default)(tree_1.TreeNode, { left: '[0]', right: 'corge' }), (0, mithril_1.default)(tree_1.TreeNode, { left: '[1]', right: 'grault' }), (0, mithril_1.default)(tree_1.TreeNode, { left: '[2]', right: 'garply' }), (0, mithril_1.default)(tree_1.TreeNode, { left: '[3]', right: 'waldo' })))); },
            initialOpts: {
                layout: new EnumOption(tree_1.TreeLayout.Grid, Object.values(tree_1.TreeLayout)),
            },
            wide: true,
        }), (0, mithril_1.default)('h2', 'Form'), (0, mithril_1.default)(WidgetShowcase, {
            renderWidget: function () { return (0, mithril_1.default)(form_1.Form, (0, mithril_1.default)(form_1.FormLabel, { for: 'foo' }, 'Foo'), (0, mithril_1.default)(text_input_1.TextInput, { id: 'foo' }), (0, mithril_1.default)(form_1.FormLabel, { for: 'bar' }, 'Bar'), (0, mithril_1.default)(select_1.Select, { id: 'bar' }, [
                (0, mithril_1.default)('option', { value: 'foo', label: 'Foo' }),
                (0, mithril_1.default)('option', { value: 'bar', label: 'Bar' }),
                (0, mithril_1.default)('option', { value: 'baz', label: 'Baz' }),
            ]), (0, mithril_1.default)(form_1.FormButtonBar, (0, mithril_1.default)(button_1.Button, { label: 'Submit', rightIcon: 'chevron_right' }), (0, mithril_1.default)(button_1.Button, { label: 'Cancel', minimal: true }))); },
        }));
    },
});
var colorizer_1 = require("../common/colorizer");
var css_constants_3 = require("./css_constants");
var border_drag_strategy_1 = require("./drag/border_drag_strategy");
Object.defineProperty(exports, "BorderDragStrategy", { enumerable: true, get: function () { return border_drag_strategy_1.BorderDragStrategy; } });
var drag_strategy_1 = require("./drag/drag_strategy");
Object.defineProperty(exports, "DragStrategy", { enumerable: true, get: function () { return drag_strategy_1.DragStrategy; } });
var inner_drag_strategy_1 = require("./drag/inner_drag_strategy");
Object.defineProperty(exports, "InnerDragStrategy", { enumerable: true, get: function () { return inner_drag_strategy_1.InnerDragStrategy; } });
var outer_drag_strategy_1 = require("./drag/outer_drag_strategy");
Object.defineProperty(exports, "OuterDragStrategy", { enumerable: true, get: function () { return outer_drag_strategy_1.OuterDragStrategy; } });
var drag_gesture_handler_1 = require("./drag_gesture_handler");
Object.defineProperty(exports, "DragGestureHandler", { enumerable: true, get: function () { return drag_gesture_handler_1.DragGestureHandler; } });
var gridline_helper_1 = require("./gridline_helper");
Object.defineProperty(exports, "TickGenerator", { enumerable: true, get: function () { return gridline_helper_1.TickGenerator; } });
var OverviewTimelinePanel = /** @class */ (function (_super) {
    __extends(OverviewTimelinePanel, _super);
    function OverviewTimelinePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = 0;
        _this.totTime = new time_3.TimeSpan(0, 0);
        _this.boundOnMouseMove = _this.onMouseMove.bind(_this);
        return _this;
    }
    // Must explicitly type now; arguments types are no longer auto-inferred.
    // https://github.com/Microsoft/TypeScript/issues/1373
    OverviewTimelinePanel.prototype.onupdate = function (_a) {
        var dom = _a.dom;
        this.width = dom.getBoundingClientRect().width;
        this.totTime = new time_3.TimeSpan(exports.globals.state.traceTime.startSec, exports.globals.state.traceTime.endSec);
        this.timeScale = new time_scale_1.TimeScale(this.totTime, [exports.TRACK_SHELL_WIDTH, (0, logging_2.assertExists)(this.width)]);
        if (this.gesture === undefined) {
            this.gesture = new drag_gesture_handler_1.DragGestureHandler(dom, this.onDrag.bind(this), this.onDragStart.bind(this), this.onDragEnd.bind(this));
        }
    };
    OverviewTimelinePanel.prototype.oncreate = function (vnode) {
        this.onupdate(vnode);
        vnode.dom
            .addEventListener('mousemove', this.boundOnMouseMove);
    };
    OverviewTimelinePanel.prototype.onremove = function (_a) {
        var dom = _a.dom;
        dom
            .removeEventListener('mousemove', this.boundOnMouseMove);
    };
    OverviewTimelinePanel.prototype.view = function () {
        return (0, mithril_1.default)('.overview-timeline');
    };
    OverviewTimelinePanel.prototype.renderCanvas = function (ctx, size) {
        if (this.width === undefined)
            return;
        if (this.timeScale === undefined)
            return;
        var headerHeight = 20;
        var tracksHeight = size.height - headerHeight;
        var timeSpan = new time_3.TimeSpan(0, this.totTime.duration);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [exports.TRACK_SHELL_WIDTH, this.width]);
        if (timeScale.timeSpan.duration > 0 && timeScale.widthPx > 0) {
            var tickGen = new gridline_helper_1.TickGenerator(timeScale);
            // Draw time labels on the top header.
            ctx.font = '10px Roboto Condensed';
            ctx.fillStyle = '#999';
            for (var _i = 0, tickGen_1 = tickGen; _i < tickGen_1.length; _i++) {
                var _a = tickGen_1[_i], type = _a.type, time = _a.time, position = _a.position;
                var xPos = Math.round(position);
                if (xPos <= 0)
                    continue;
                if (xPos > this.width)
                    break;
                if (type === gridline_helper_1.TickType.MAJOR) {
                    ctx.fillRect(xPos - 1, 0, 1, headerHeight - 5);
                    ctx.fillText(time.toFixed(tickGen.digits) + ' s', xPos + 5, 18);
                }
                else if (type == gridline_helper_1.TickType.MEDIUM) {
                    ctx.fillRect(xPos - 1, 0, 1, 8);
                }
                else if (type == gridline_helper_1.TickType.MINOR) {
                    ctx.fillRect(xPos - 1, 0, 1, 5);
                }
            }
        }
        // Draw mini-tracks with quanitzed density for each process.
        if (exports.globals.overviewStore.size > 0) {
            var numTracks = exports.globals.overviewStore.size;
            var y = 0;
            var trackHeight = (tracksHeight - 1) / numTracks;
            for (var _b = 0, _c = exports.globals.overviewStore.keys(); _b < _c.length; _b++) {
                var key = _c[_b];
                var loads = exports.globals.overviewStore.get(key);
                for (var i = 0; i < loads.length; i++) {
                    var xStart = Math.floor(this.timeScale.timeToPx(loads[i].startSec));
                    var xEnd = Math.ceil(this.timeScale.timeToPx(loads[i].endSec));
                    var yOff = Math.floor(headerHeight + y * trackHeight);
                    var lightness = Math.ceil((1 - loads[i].load * 0.7) * 100);
                    ctx.fillStyle = "hsl(".concat((0, colorizer_1.hueForCpu)(y), ", 50%, ").concat(lightness, "%)");
                    ctx.fillRect(xStart, yOff, xEnd - xStart, Math.ceil(trackHeight));
                }
                y++;
            }
        }
        // Draw bottom border.
        ctx.fillStyle = '#dadada';
        ctx.fillRect(0, size.height - 1, this.width, 1);
        // Draw semi-opaque rects that occlude the non-visible time range.
        var _d = overview_timeline_panel_1.OverviewTimelinePanel.extractBounds(this.timeScale), vizStartPx = _d[0], vizEndPx = _d[1];
        ctx.fillStyle = exports.OVERVIEW_TIMELINE_NON_VISIBLE_COLOR;
        ctx.fillRect(exports.TRACK_SHELL_WIDTH - 1, headerHeight, vizStartPx - exports.TRACK_SHELL_WIDTH, tracksHeight);
        ctx.fillRect(vizEndPx, headerHeight, this.width - vizEndPx, tracksHeight);
        // Draw brushes.
        ctx.fillStyle = '#999';
        ctx.fillRect(vizStartPx - 1, headerHeight, 1, tracksHeight);
        ctx.fillRect(vizEndPx, headerHeight, 1, tracksHeight);
        var hbarWidth = overview_timeline_panel_1.OverviewTimelinePanel.HANDLE_SIZE_PX;
        var hbarHeight = tracksHeight * 0.4;
        // Draw handlebar
        ctx.fillRect(vizStartPx - Math.floor(hbarWidth / 2) - 1, headerHeight, hbarWidth, hbarHeight);
        ctx.fillRect(vizEndPx - Math.floor(hbarWidth / 2), headerHeight, hbarWidth, hbarHeight);
    };
    OverviewTimelinePanel.prototype.onMouseMove = function (e) {
        if (this.gesture === undefined || this.gesture.isDragging) {
            return;
        }
        e.target.style.cursor = this.chooseCursor(e.x);
    };
    OverviewTimelinePanel.prototype.chooseCursor = function (x) {
        if (this.timeScale === undefined)
            return 'default';
        var _a = overview_timeline_panel_1.OverviewTimelinePanel.extractBounds(this.timeScale), vizStartPx = _a[0], vizEndPx = _a[1];
        var startBound = vizStartPx - 1 + exports.SIDEBAR_WIDTH;
        var endBound = vizEndPx + exports.SIDEBAR_WIDTH;
        if (overview_timeline_panel_1.OverviewTimelinePanel.inBorderRange(x, startBound) ||
            overview_timeline_panel_1.OverviewTimelinePanel.inBorderRange(x, endBound)) {
            return 'ew-resize';
        }
        else if (x < exports.SIDEBAR_WIDTH + exports.TRACK_SHELL_WIDTH) {
            return 'default';
        }
        else if (x < startBound || endBound < x) {
            return 'crosshair';
        }
        else {
            return 'all-scroll';
        }
    };
    OverviewTimelinePanel.prototype.onDrag = function (x) {
        if (this.dragStrategy === undefined)
            return;
        this.dragStrategy.onDrag(x);
    };
    OverviewTimelinePanel.prototype.onDragStart = function (x) {
        if (this.timeScale === undefined)
            return;
        var pixelBounds = overview_timeline_panel_1.OverviewTimelinePanel.extractBounds(this.timeScale);
        if (overview_timeline_panel_1.OverviewTimelinePanel.inBorderRange(x, pixelBounds[0]) ||
            overview_timeline_panel_1.OverviewTimelinePanel.inBorderRange(x, pixelBounds[1])) {
            this.dragStrategy = new border_drag_strategy_1.BorderDragStrategy(this.timeScale, pixelBounds);
        }
        else if (x < pixelBounds[0] || pixelBounds[1] < x) {
            this.dragStrategy = new outer_drag_strategy_1.OuterDragStrategy(this.timeScale);
        }
        else {
            this.dragStrategy = new inner_drag_strategy_1.InnerDragStrategy(this.timeScale, pixelBounds);
        }
        this.dragStrategy.onDragStart(x);
    };
    OverviewTimelinePanel.prototype.onDragEnd = function () {
        this.dragStrategy = undefined;
    };
    OverviewTimelinePanel.extractBounds = function (timeScale) {
        var vizTime = exports.globals.frontendLocalState.getVisibleStateBounds();
        return [
            Math.floor(timeScale.timeToPx(vizTime[0])),
            Math.ceil(timeScale.timeToPx(vizTime[1])),
        ];
    };
    OverviewTimelinePanel.inBorderRange = function (a, b) {
        return Math.abs(a - b) < this.HANDLE_SIZE_PX / 2;
    };
    OverviewTimelinePanel.HANDLE_SIZE_PX = 5;
    return OverviewTimelinePanel;
}(panel_1.Panel));
exports.OverviewTimelinePanel = OverviewTimelinePanel;
exports.SLICE_LAYOUT_BASE_DEFAULTS = Object.freeze({
    padding: 3,
    rowSpacing: 0,
    minDepth: 0,
    // A realistic bound to avoid tracks with unlimited height. If somebody wants
    // extremely deep tracks they need to change this explicitly.
    maxDepth: 128,
});
exports.SLICE_LAYOUT_FIXED_DEFAULTS = Object.freeze(__assign(__assign({}, exports.SLICE_LAYOUT_BASE_DEFAULTS), { heightMode: 'FIXED', fixedHeight: 30 }));
exports.SLICE_LAYOUT_FIT_CONTENT_DEFAULTS = Object.freeze(__assign(__assign({}, exports.SLICE_LAYOUT_BASE_DEFAULTS), { heightMode: 'FIT_CONTENT', sliceHeight: 18 }));
exports.SLICE_LAYOUT_FLAT_DEFAULTS = Object.freeze(__assign(__assign({}, exports.SLICE_LAYOUT_BASE_DEFAULTS), { minDepth: 0, maxDepth: 1, heightMode: 'FIXED', fixedHeight: 30 }));
exports.DEFAULT_SLICE_LAYOUT = exports.SLICE_LAYOUT_FIT_CONTENT_DEFAULTS;
var keyboard_layout_map_1 = require("./keyboard_layout_map");
Object.defineProperty(exports, "NotSupportedError", { enumerable: true, get: function () { return keyboard_layout_map_1.NotSupportedError; } });
var modal_3 = require("./modal");
var pan_and_zoom_handler_1 = require("./pan_and_zoom_handler");
function toggleHelp() {
    exports.globals.logging.logEvent('User Actions', 'Show help');
    showHelp();
}
exports.toggleHelp = toggleHelp;
function keycap(glyph) {
    return (0, mithril_1.default)('.keycap', glyph);
}
// A fallback keyboard map based on the QWERTY keymap. Converts keyboard event
// codes to their associated glyphs on an English QWERTY keyboard.
var EnglishQwertyKeyboardLayoutMap = /** @class */ (function () {
    function EnglishQwertyKeyboardLayoutMap() {
    }
    EnglishQwertyKeyboardLayoutMap.prototype.get = function (code) {
        // Converts 'KeyX' -> 'x'
        return code.replace(/^Key([A-Z])$/, '$1').toLowerCase();
    };
    return EnglishQwertyKeyboardLayoutMap;
}());
var KeyMappingsHelp = /** @class */ (function () {
    function KeyMappingsHelp() {
    }
    KeyMappingsHelp.prototype.oninit = function () {
        var _this = this;
        (0, keyboard_layout_map_1.nativeKeyboardLayoutMap)()
            .then(function (keyMap) {
            _this.keyMap = keyMap;
            exports.globals.rafScheduler.scheduleFullRedraw();
        })
            .catch(function (e) {
            if (e instanceof keyboard_layout_map_1.NotSupportedError ||
                e.toString().includes('SecurityError')) {
                // Keyboard layout is unavailable. Since showing the keyboard
                // mappings correct for the user's keyboard layout is a nice-to-
                // have, and users with non-QWERTY layouts are usually aware of the
                // fact that the are using non-QWERTY layouts, we resort to showing
                // English QWERTY mappings as a best-effort approach.
                // The alternative would be to show key mappings for all keyboard
                // layouts which is not feasible.
                _this.keyMap = new EnglishQwertyKeyboardLayoutMap();
                exports.globals.rafScheduler.scheduleFullRedraw();
            }
            else {
                // Something unexpected happened. Either the browser doesn't conform
                // to the keyboard API spec, or the keyboard API spec has changed!
                throw e;
            }
        });
    };
    KeyMappingsHelp.prototype.view = function (_) {
        var ctrlOrCmd = window.navigator.platform.indexOf('Mac') !== -1 ? 'Cmd' : 'Ctrl';
        var queryPageInstructions = exports.globals.hideSidebar ? [] : [
            (0, mithril_1.default)('h2', 'Making SQL queries from the query page'),
            (0, mithril_1.default)('table', (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap('Ctrl'), ' + ', keycap('Enter')), (0, mithril_1.default)('td', 'Execute query')), (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap('Ctrl'), ' + ', keycap('Enter'), ' (with selection)'), (0, mithril_1.default)('td', 'Execute selection'))),
        ];
        var sidebarInstructions = exports.globals.hideSidebar ?
            [] :
            [(0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap(ctrlOrCmd), ' + ', keycap('b')), (0, mithril_1.default)('td', 'Toggle display of sidebar'))];
        return mithril_1.default.apply(void 0, __spreadArray(__spreadArray(['.help',
            (0, mithril_1.default)('h2', 'Navigation'),
            (0, mithril_1.default)('table', (0, mithril_1.default)('tr', (0, mithril_1.default)('td', this.codeToKeycap(pan_and_zoom_handler_1.KeyMapping.KEY_ZOOM_IN), '/', this.codeToKeycap(pan_and_zoom_handler_1.KeyMapping.KEY_ZOOM_OUT)), (0, mithril_1.default)('td', 'Zoom in/out')), (0, mithril_1.default)('tr', (0, mithril_1.default)('td', this.codeToKeycap(pan_and_zoom_handler_1.KeyMapping.KEY_PAN_LEFT), '/', this.codeToKeycap(pan_and_zoom_handler_1.KeyMapping.KEY_PAN_RIGHT)), (0, mithril_1.default)('td', 'Pan left/right'))),
            (0, mithril_1.default)('h2', 'Mouse Controls'),
            (0, mithril_1.default)('table', (0, mithril_1.default)('tr', (0, mithril_1.default)('td', 'Click'), (0, mithril_1.default)('td', 'Select event')), (0, mithril_1.default)('tr', (0, mithril_1.default)('td', 'Ctrl + Scroll wheel'), (0, mithril_1.default)('td', 'Zoom in/out')), (0, mithril_1.default)('tr', (0, mithril_1.default)('td', 'Click + Drag'), (0, mithril_1.default)('td', 'Select area')), (0, mithril_1.default)('tr', (0, mithril_1.default)('td', 'Shift + Click + Drag'), (0, mithril_1.default)('td', 'Pan left/right'))),
            (0, mithril_1.default)('h2', 'Making SQL queries from the viewer page'),
            (0, mithril_1.default)('table', (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap(':'), ' in the (empty) search box'), (0, mithril_1.default)('td', 'Switch to query input')), (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap('Enter')), (0, mithril_1.default)('td', 'Execute query')), (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap('Ctrl'), ' + ', keycap('Enter')), (0, mithril_1.default)('td', 'Execute query and pin output ' +
                '(output will not be replaced by regular query input)')))], queryPageInstructions, false), [(0, mithril_1.default)('h2', 'Other'), mithril_1.default.apply(void 0, __spreadArray(__spreadArray(['table',
                (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap('f'), ' (with event selected)'), (0, mithril_1.default)('td', 'Scroll + zoom to current selection')),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap('['), '/', keycap(']'), ' (with event selected)'), (0, mithril_1.default)('td', 'Select next/previous slice that is connected by a flow.', (0, mithril_1.default)('br'), 'If there are multiple flows,' +
                    'the one that is in focus (bold) is selected')),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap(ctrlOrCmd), ' + ', keycap('['), '/', keycap(']'), ' (with event selected)'), (0, mithril_1.default)('td', 'Switch focus to another flow')),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap('m'), ' (with event or area selected)'), (0, mithril_1.default)('td', 'Mark the area (temporarily)')),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap('Shift'), ' + ', keycap('m'), ' (with event or area selected)'), (0, mithril_1.default)('td', 'Mark the area (persistently)')),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap(ctrlOrCmd), ' + ', keycap('a')), (0, mithril_1.default)('td', 'Select all'))], sidebarInstructions, false), [(0, mithril_1.default)('tr', (0, mithril_1.default)('td', keycap('?')), (0, mithril_1.default)('td', 'Show help'))], false))], false));
    };
    KeyMappingsHelp.prototype.codeToKeycap = function (code) {
        if (this.keyMap) {
            return keycap(this.keyMap.get(code));
        }
        else {
            return keycap((0, mithril_1.default)(spinner_1.Spinner));
        }
    };
    return KeyMappingsHelp;
}());
function showHelp() {
    (0, modal_3.showModal)({
        title: 'Perfetto Help',
        content: function () { return (0, mithril_1.default)(KeyMappingsHelp); },
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
var logging_3 = require("../base/logging");
var errors_1 = require("../common/errors");
// We use a dedicated |caches| object to share a global boolean beween the main
// thread and the SW. SW cannot use local-storage or anything else other than
// IndexedDB (which would be overkill).
var BYPASS_ID = 'BYPASS_SERVICE_WORKER';
var BypassCache = /** @class */ (function () {
    function BypassCache() {
    }
    BypassCache.isBypassed = function () {
        return __awaiter(this, void 0, Promise, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, caches.has(BYPASS_ID)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, (0, errors_1.ignoreCacheUnactionableErrors)(e_1, false)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BypassCache.setBypass = function (bypass) {
        return __awaiter(this, void 0, Promise, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!bypass) return [3 /*break*/, 2];
                        return [4 /*yield*/, caches.open(BYPASS_ID)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, caches.delete(BYPASS_ID)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        (0, errors_1.ignoreCacheUnactionableErrors)(e_2, undefined);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return BypassCache;
}());
var ServiceWorkerController = /** @class */ (function () {
    function ServiceWorkerController() {
        this._initialWorker = null;
        this._bypassed = false;
        this._installing = false;
    }
    // Caller should reload().
    ServiceWorkerController.prototype.setBypass = function (bypass) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, reg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!('serviceWorker' in navigator))
                            return [2 /*return*/]; // Not supported.
                        this._bypassed = bypass;
                        if (!bypass) return [3 /*break*/, 7];
                        return [4 /*yield*/, BypassCache.setBypass(true)];
                    case 1:
                        _b.sent(); // Create the entry.
                        _i = 0;
                        return [4 /*yield*/, navigator.serviceWorker.getRegistrations()];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        reg = _a[_i];
                        return [4 /*yield*/, reg.unregister()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, BypassCache.setBypass(false)];
                    case 8:
                        _b.sent();
                        if (window.localStorage) {
                            window.localStorage.setItem('bypassDisabled', '1');
                        }
                        this.install();
                        _b.label = 9;
                    case 9:
                        exports.globals.rafScheduler.scheduleFullRedraw();
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerController.prototype.onStateChange = function (sw) {
        exports.globals.rafScheduler.scheduleFullRedraw();
        if (sw.state === 'installing') {
            this._installing = true;
        }
        else if (sw.state === 'activated') {
            this._installing = false;
            // Don't show the notification if the site was served straight
            // from the network (e.g., on the very first visit or after
            // Ctrl+Shift+R). In these cases, we are already at the last
            // version.
            if (sw !== this._initialWorker && this._initialWorker) {
                exports.globals.frontendLocalState.newVersionAvailable = true;
            }
        }
    };
    ServiceWorkerController.prototype.monitorWorker = function (sw) {
        var _this = this;
        if (!sw)
            return;
        sw.addEventListener('error', function (e) { return (0, logging_3.reportError)(e); });
        sw.addEventListener('statechange', function () { return _this.onStateChange(sw); });
        this.onStateChange(sw); // Trigger updates for the current state.
    };
    ServiceWorkerController.prototype.install = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hostname, isLocalhost, bypassDisabled, versionDir, swUri;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('serviceWorker' in navigator))
                            return [2 /*return*/]; // Not supported.
                        if (location.pathname !== '/') {
                            // Disable the service worker when the UI is loaded from a non-root URL
                            // (e.g. from the CI artifacts GCS bucket). Supporting the case of a
                            // nested index.html is too cumbersome and has no benefits.
                            return [2 /*return*/];
                        }
                        hostname = location.hostname;
                        isLocalhost = ['127.0.0.1', '::1', 'localhost'].includes(hostname);
                        bypassDisabled = window.localStorage &&
                            window.localStorage.getItem('bypassDisabled') === '1';
                        if (!(isLocalhost && !bypassDisabled)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setBypass(true)];
                    case 1:
                        _a.sent(); // Will cause the check below to bail out.
                        _a.label = 2;
                    case 2: return [4 /*yield*/, BypassCache.isBypassed()];
                    case 3:
                        if (_a.sent()) {
                            this._bypassed = true;
                            console.log('Skipping service worker registration, disabled by the user');
                            return [2 /*return*/];
                        }
                        versionDir = exports.globals.root.split('/').slice(-2)[0];
                        swUri = "/service_worker.js?v=".concat(versionDir);
                        navigator.serviceWorker.register(swUri).then(function (registration) {
                            _this._initialWorker = registration.active;
                            // At this point there are two options:
                            // 1. This is the first time we visit the site (or cache was cleared) and
                            //    no SW is installed yet. In this case |installing| will be set.
                            // 2. A SW is already installed (though it might be obsolete). In this
                            //    case |active| will be set.
                            _this.monitorWorker(registration.installing);
                            _this.monitorWorker(registration.active);
                            // Setup the event that shows the "Updated to v1.2.3" notification.
                            registration.addEventListener('updatefound', function () {
                                _this.monitorWorker(registration.installing);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ServiceWorkerController.prototype, "bypassed", {
        get: function () {
            return this._bypassed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceWorkerController.prototype, "installing", {
        get: function () {
            return this._installing;
        },
        enumerable: false,
        configurable: true
    });
    return ServiceWorkerController;
}());
exports.ServiceWorkerController = ServiceWorkerController;
var css_constants_4 = require("./css_constants");
var help_modal_1 = require("./help_modal");
var scroll_helper_1 = require("./scroll_helper");
// Returns whether incoming traces should be opened automatically or should
// instead require a user interaction.
function isTrustedOrigin(origin) {
    var TRUSTED_ORIGINS = [
        'https://chrometto.googleplex.com',
        'https://uma.googleplex.com',
        'https://android-build.googleplex.com',
    ];
    if (origin === window.origin)
        return true;
    if (TRUSTED_ORIGINS.includes(origin))
        return true;
    var hostname = new URL(origin).hostname;
    if (hostname.endsWith('corp.google.com'))
        return true;
    if (hostname === 'localhost' || hostname === '127.0.0.1')
        return true;
    return false;
}
// Returns whether we should ignore a given message based on the value of
// the 'perfettoIgnore' field in the event data.
function shouldGracefullyIgnoreMessage(messageEvent) {
    return messageEvent.data.perfettoIgnore === true;
}
// The message handler supports loading traces from an ArrayBuffer.
// There is no other requirement than sending the ArrayBuffer as the |data|
// property. However, since this will happen across different origins, it is not
// possible for the source website to inspect whether the message handler is
// ready, so the message handler always replies to a 'PING' message with 'PONG',
// which indicates it is ready to receive a trace.
function postMessageHandler(messageEvent) {
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
    var fromOpener = messageEvent.source === window.opener;
    var fromIframeHost = messageEvent.source === window.parent;
    // This adds support for the folowing flow:
    // * A (page that whats to open a trace in perfetto) opens B
    // * B (does something to get the traceBuffer)
    // * A is navigated to Perfetto UI
    // * B sends the traceBuffer to A
    // * closes itself
    var fromOpenee = messageEvent.source.opener === window;
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
        var windowSource = messageEvent.source;
        windowSource.postMessage('PONG', messageEvent.origin);
        return;
    }
    if (messageEvent.data === 'SHOW-HELP') {
        (0, help_modal_1.toggleHelp)();
        return;
    }
    if (messageEvent.data === 'RELOAD-CSS-CONSTANTS') {
        (0, css_constants_4.initCssConstants)();
        return;
    }
    var postedScrollToRange;
    if (isPostedScrollToRange(messageEvent.data)) {
        postedScrollToRange = messageEvent.data.perfetto;
        scrollToTimeRange(postedScrollToRange);
        return;
    }
    var postedTrace;
    var keepApiOpen = false;
    if (isPostedTraceWrapped(messageEvent.data)) {
        postedTrace = sanitizePostedTrace(messageEvent.data.perfetto);
        if (postedTrace.keepApiOpen) {
            keepApiOpen = true;
        }
    }
    else if (messageEvent.data instanceof ArrayBuffer) {
        postedTrace = { title: 'External trace', buffer: messageEvent.data };
    }
    else {
        console.warn('Unknown postMessage() event received. If you are trying to open a ' +
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
        window.removeEventListener('message', post_message_handler_1.postMessageHandler);
    }
    var openTrace = function () {
        // For external traces, we need to disable other features such as
        // downloading and sharing a trace.
        postedTrace.localOnly = true;
        exports.globals.dispatch(actions_1.Actions.openTraceFromBuffer(postedTrace));
    };
    // If the origin is trusted open the trace directly.
    if (isTrustedOrigin(messageEvent.origin)) {
        openTrace();
        return;
    }
    // If not ask the user if they expect this and trust the origin.
    (0, modal_3.showModal)({
        title: 'Open trace?',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('div', "".concat(messageEvent.origin, " is trying to open a trace file.")), (0, mithril_1.default)('div', 'Do you trust the origin and want to proceed?')),
        buttons: [
            { text: 'NO', primary: true },
            { text: 'YES', primary: false, action: openTrace },
        ],
    });
}
exports.postMessageHandler = postMessageHandler;
function sanitizePostedTrace(postedTrace) {
    var result = {
        title: sanitizeString(postedTrace.title),
        buffer: postedTrace.buffer,
        keepApiOpen: postedTrace.keepApiOpen,
    };
    if (postedTrace.url !== undefined) {
        result.url = sanitizeString(postedTrace.url);
    }
    return result;
}
function sanitizeString(str) {
    return str.replace(/[^A-Za-z0-9.\-_#:/?=&;%+$ ]/g, ' ');
}
function isTraceViewerReady() {
    var _a;
    return !!((_a = exports.globals.getCurrentEngine()) === null || _a === void 0 ? void 0 : _a.ready);
}
var _maxScrollToRangeAttempts = 20;
function scrollToTimeRange(postedScrollToRange, maxAttempts) {
    return __awaiter(this, void 0, void 0, function () {
        var ready;
        return __generator(this, function (_a) {
            ready = isTraceViewerReady();
            if (!ready) {
                if (maxAttempts === undefined) {
                    maxAttempts = 0;
                }
                if (maxAttempts > _maxScrollToRangeAttempts) {
                    console.warn('Could not scroll to time range. Trace viewer not ready.');
                    return [2 /*return*/];
                }
                setTimeout(scrollToTimeRange, 200, postedScrollToRange, maxAttempts + 1);
            }
            else {
                (0, scroll_helper_1.focusHorizontalRange)(postedScrollToRange.timeStart, postedScrollToRange.timeEnd, postedScrollToRange.viewPercentage);
            }
            return [2 /*return*/];
        });
    });
}
function isPostedScrollToRange(obj) {
    var wrapped = obj;
    if (wrapped.perfetto === undefined) {
        return false;
    }
    return wrapped.perfetto.timeStart !== undefined ||
        wrapped.perfetto.timeEnd !== undefined;
}
function isPostedTraceWrapped(obj) {
    var wrapped = obj;
    if (wrapped.perfetto === undefined) {
        return false;
    }
    return wrapped.perfetto.buffer !== undefined &&
        wrapped.perfetto.title !== undefined;
}
var pako_1 = require("pako");
var CTRACE_HEADER = 'TRACE:\n';
function isCtrace(file) {
    return __awaiter(this, void 0, Promise, function () {
        var fileName, header;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileName = file.name.toLowerCase();
                    if (fileName.endsWith('.ctrace')) {
                        return [2 /*return*/, true];
                    }
                    if (!fileName.endsWith('.txt')) return [3 /*break*/, 2];
                    return [4 /*yield*/, readText(file.slice(0, 128))];
                case 1:
                    header = _a.sent();
                    if (header.includes(CTRACE_HEADER)) {
                        return [2 /*return*/, true];
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/, false];
            }
        });
    });
}
function readText(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
            if (typeof reader.result === 'string') {
                return resolve(reader.result);
            }
        };
        reader.onerror = function (err) {
            reject(err);
        };
        reader.readAsText(blob);
    });
}
function isLegacyTrace(file) {
    return __awaiter(this, void 0, Promise, function () {
        var fileName, header, lines, commentCount, _i, lines_1, line;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileName = file.name.toLowerCase();
                    if (fileName.endsWith('.json') || fileName.endsWith('.json.gz') ||
                        fileName.endsWith('.zip') || fileName.endsWith('.html')) {
                        return [2 /*return*/, true];
                    }
                    return [4 /*yield*/, isCtrace(file)];
                case 1:
                    if (_a.sent()) {
                        return [2 /*return*/, true];
                    }
                    if (!fileName.endsWith('.trace')) return [3 /*break*/, 3];
                    return [4 /*yield*/, readText(file.slice(0, 512))];
                case 2:
                    header = _a.sent();
                    lines = header.split('\n');
                    commentCount = 0;
                    for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        line = lines_1[_i];
                        if (line.startsWith('#')) {
                            commentCount++;
                        }
                    }
                    if (commentCount > 5) {
                        return [2 /*return*/, true];
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/, false];
            }
        });
    });
}
exports.isLegacyTrace = isLegacyTrace;
function openFileWithLegacyTraceViewer(file) {
    return __awaiter(this, void 0, void 0, function () {
        var reader, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = new FileReader();
                    reader.onload = function () {
                        if (reader.result instanceof ArrayBuffer) {
                            return (0, legacy_trace_viewer_1.openBufferWithLegacyTraceViewer)(file.name, reader.result, reader.result.byteLength);
                        }
                        else {
                            var str_1 = reader.result;
                            return (0, legacy_trace_viewer_1.openBufferWithLegacyTraceViewer)(file.name, str_1, str_1.length);
                        }
                    };
                    reader.onerror = function (err) {
                        console.error(err);
                    };
                    _a = file.name.endsWith('.gz') || file.name.endsWith('.zip');
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, isCtrace(file)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    if (_a) {
                        reader.readAsArrayBuffer(file);
                    }
                    else {
                        reader.readAsText(file);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.openFileWithLegacyTraceViewer = openFileWithLegacyTraceViewer;
function openBufferWithLegacyTraceViewer(name, data, size) {
    if (data instanceof ArrayBuffer) {
        (0, logging_1.assertTrue)(size <= data.byteLength);
        if (size !== data.byteLength) {
            data = data.slice(0, size);
        }
        // Handle .ctrace files.
        var enc = new TextDecoder('utf-8');
        var header = enc.decode(data.slice(0, 128));
        if (header.includes(CTRACE_HEADER)) {
            var offset = header.indexOf(CTRACE_HEADER) + CTRACE_HEADER.length;
            data = (0, pako_1.inflate)(new Uint8Array(data.slice(offset)), { to: 'string' });
        }
    }
    // The location.pathname mangling is to make this code work also when hosted
    // in a non-root sub-directory, for the case of CI artifacts.
    var catapultUrl = exports.globals.root + 'assets/catapult_trace_viewer.html';
    var newWin = window.open(catapultUrl);
    if (newWin) {
        // Popup succeedeed.
        newWin.addEventListener('load', function (e) {
            var doc = e.target;
            var ctl = doc.querySelector('x-profiling-view');
            ctl.setActiveTrace(name, data);
        });
        return;
    }
    // Popup blocker detected.
    (0, modal_3.showModal)({
        title: 'Open trace in the legacy Catapult Trace Viewer',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('div', 'You are seeing this interstitial because popups are blocked'), (0, mithril_1.default)('div', 'Enable popups to skip this dialog next time.')),
        buttons: [{
                text: 'Open legacy UI',
                primary: true,
                action: function () { return (0, legacy_trace_viewer_1.openBufferWithLegacyTraceViewer)(name, data, size); },
            }],
    });
}
exports.openBufferWithLegacyTraceViewer = openBufferWithLegacyTraceViewer;
var Panel = /** @class */ (function () {
    function Panel() {
    }
    return Panel;
}());
exports.Panel = Panel;
function isPanelVNode(vnode) {
    var tag = vnode.tag;
    return (typeof tag === 'function' && 'prototype' in tag &&
        tag.prototype instanceof panel_1.Panel);
}
exports.isPanelVNode = isPanelVNode;
var state_3 = require("../common/state");
var time_4 = require("../common/time");
var INCOMPLETE_SLICE_TIME_S = 0.00003;
// Given a timestamp, if |ts| is not currently in view move the view to
// center |ts|, keeping the same zoom level.
function horizontalScrollToTs(ts) {
    var startNs = (0, time_4.toNs)(exports.globals.frontendLocalState.visibleWindowTime.start);
    var endNs = (0, time_4.toNs)(exports.globals.frontendLocalState.visibleWindowTime.end);
    var currentViewNs = endNs - startNs;
    if (ts < startNs || ts > endNs) {
        // TODO(hjd): This is an ugly jump, we should do a smooth pan instead.
        exports.globals.frontendLocalState.updateVisibleTime(new time_3.TimeSpan((0, time_4.fromNs)(ts - currentViewNs / 2), (0, time_4.fromNs)(ts + currentViewNs / 2)));
    }
}
exports.horizontalScrollToTs = horizontalScrollToTs;
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
function focusHorizontalRange(startTs, endTs, viewPercentage) {
    var visibleDur = exports.globals.frontendLocalState.visibleWindowTime.end -
        exports.globals.frontendLocalState.visibleWindowTime.start;
    var selectDur = endTs - startTs;
    // TODO(altimin): We go from `ts` and `dur` to `startTs` and `endTs` and back
    // to `dur`. We should fix that.
    if ((0, time_4.toNs)(selectDur) === -1) { // Unfinished slice
        selectDur = INCOMPLETE_SLICE_TIME_S;
        endTs = startTs;
    }
    if (viewPercentage !== undefined) {
        if (viewPercentage <= 0.0 || viewPercentage > 1.0) {
            console.warn('Invalid value for [viewPercentage]. ' +
                'Value must be between 0.0 (exclusive) and 1.0 (inclusive).');
            // Default to 50%.
            viewPercentage = 0.5;
        }
        var paddingPercentage = 1.0 - viewPercentage;
        var paddingTime = selectDur * paddingPercentage;
        var halfPaddingTime = paddingTime / 2;
        exports.globals.frontendLocalState.updateVisibleTime(new time_3.TimeSpan(startTs - halfPaddingTime, endTs + halfPaddingTime));
        return;
    }
    // If the range is too large to fit on the current zoom level, resize.
    if (selectDur > 0.5 * visibleDur) {
        exports.globals.frontendLocalState.updateVisibleTime(new time_3.TimeSpan(startTs - (selectDur * 2), endTs + (selectDur * 2)));
        return;
    }
    var midpointTs = (endTs + startTs) / 2;
    // Calculate the new visible window preserving the zoom level.
    var newStartTs = midpointTs - visibleDur / 2;
    var newEndTs = midpointTs + visibleDur / 2;
    // Adjust the new visible window if it intersects with the trace boundaries.
    // It's needed to make the "update the zoom level if visible window doesn't
    // change" logic reliable.
    if (newEndTs > exports.globals.state.traceTime.endSec) {
        newStartTs = exports.globals.state.traceTime.endSec - visibleDur;
        newEndTs = exports.globals.state.traceTime.endSec;
    }
    if (newStartTs < exports.globals.state.traceTime.startSec) {
        newStartTs = exports.globals.state.traceTime.startSec;
        newEndTs = exports.globals.state.traceTime.startSec + visibleDur;
    }
    var newStartNs = (0, time_4.toNs)(newStartTs);
    var newEndNs = (0, time_4.toNs)(newEndTs);
    var viewStartNs = (0, time_4.toNs)(exports.globals.frontendLocalState.visibleWindowTime.start);
    var viewEndNs = (0, time_4.toNs)(exports.globals.frontendLocalState.visibleWindowTime.end);
    // If preserving the zoom doesn't change the visible window, update the zoom
    // level.
    if (newStartNs === viewStartNs && newEndNs === viewEndNs) {
        exports.globals.frontendLocalState.updateVisibleTime(new time_3.TimeSpan(startTs - (selectDur * 2), endTs + (selectDur * 2)));
        return;
    }
    exports.globals.frontendLocalState.updateVisibleTime(new time_3.TimeSpan(newStartTs, newEndTs));
}
exports.focusHorizontalRange = focusHorizontalRange;
// Given a track id, find a track with that id and scroll it into view. If the
// track is nested inside a track group, scroll to that track group instead.
// If |openGroup| then open the track group and scroll to the track.
function verticalScrollToTrack(trackId, openGroup) {
    if (openGroup === void 0) { openGroup = false; }
    var trackIdString = "".concat(trackId);
    var track = document.querySelector('#track_' + trackIdString);
    if (track) {
        // block: 'nearest' means that it will only scroll if the track is not
        // currently in view.
        track.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
    }
    var trackGroup = null;
    var trackGroupId = (0, state_3.getContainingTrackId)(exports.globals.state, trackIdString);
    if (trackGroupId) {
        trackGroup = document.querySelector('#track_' + trackGroupId);
    }
    if (!trackGroupId || !trackGroup) {
        console.error("Can't scroll, track (".concat(trackIdString, ") not found."));
        return;
    }
    // The requested track is inside a closed track group, either open the track
    // group and scroll to the track or just scroll to the track group.
    if (openGroup) {
        // After the track exists in the dom, it will be scrolled to.
        exports.globals.frontendLocalState.scrollToTrackId = trackId;
        exports.globals.dispatch(actions_1.Actions.toggleTrackGroupCollapsed({ trackGroupId: trackGroupId }));
        return;
    }
    else {
        trackGroup.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
exports.verticalScrollToTrack = verticalScrollToTrack;
// Scroll vertically and horizontally to reach track (|trackId|) at |ts|.
function scrollToTrackAndTs(trackId, ts, openGroup) {
    if (openGroup === void 0) { openGroup = false; }
    if (trackId !== undefined) {
        (0, scroll_helper_3.verticalScrollToTrack)(trackId, openGroup);
    }
    horizontalScrollToTs(ts);
}
exports.scrollToTrackAndTs = scrollToTrackAndTs;
var thread_state_1 = require("../common/thread_state");
var scroll_helper_2 = require("./scroll_helper");
var slice_panel_1 = require("./slice_panel");
Object.defineProperty(exports, "SlicePanel", { enumerable: true, get: function () { return slice_panel_1.SlicePanel; } });
var SliceDetailsPanel = /** @class */ (function (_super) {
    __extends(SliceDetailsPanel, _super);
    function SliceDetailsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliceDetailsPanel.prototype.view = function () {
        var sliceInfo = exports.globals.sliceDetails;
        if (sliceInfo.utid === undefined)
            return;
        var threadInfo = exports.globals.threads.get(sliceInfo.utid);
        return (0, mithril_1.default)('.details-panel', (0, mithril_1.default)('.details-panel-heading', (0, mithril_1.default)('h2.split', "Slice Details"), this.hasSchedLatencyInfo(sliceInfo) &&
            (0, mithril_1.default)('h2.split', 'Scheduling Latency')), this.renderDetails(sliceInfo, threadInfo));
    };
    SliceDetailsPanel.prototype.renderSchedLatencyInfo = function (sliceInfo) {
        if (!this.hasSchedLatencyInfo(sliceInfo)) {
            return null;
        }
        return (0, mithril_1.default)('.half-width-panel.slice-details-latency-panel', (0, mithril_1.default)('img.slice-details-image', {
            src: "".concat(exports.globals.root, "assets/scheduling_latency.png"),
        }), this.renderWakeupText(sliceInfo), this.renderDisplayLatencyText(sliceInfo));
    };
    SliceDetailsPanel.prototype.renderWakeupText = function (sliceInfo) {
        if (sliceInfo.wakerUtid === undefined) {
            return null;
        }
        var threadInfo = exports.globals.threads.get(sliceInfo.wakerUtid);
        if (!threadInfo) {
            return null;
        }
        var timestamp = (0, time_1.timeToCode)(sliceInfo.wakeupTs - exports.globals.state.traceTime.startSec);
        return (0, mithril_1.default)('.slice-details-wakeup-text', (0, mithril_1.default)('', "Wakeup @ ".concat(timestamp, " on CPU ").concat(sliceInfo.wakerCpu, " by")), (0, mithril_1.default)('', "P: ".concat(threadInfo.procName, " [").concat(threadInfo.pid, "]")), (0, mithril_1.default)('', "T: ".concat(threadInfo.threadName, " [").concat(threadInfo.tid, "]")));
    };
    SliceDetailsPanel.prototype.renderDisplayLatencyText = function (sliceInfo) {
        if (sliceInfo.ts === undefined || sliceInfo.wakeupTs === undefined) {
            return null;
        }
        var latency = (0, time_1.timeToCode)(sliceInfo.ts - (sliceInfo.wakeupTs - exports.globals.state.traceTime.startSec));
        return (0, mithril_1.default)('.slice-details-latency-text', (0, mithril_1.default)('', "Scheduling latency: ".concat(latency)), (0, mithril_1.default)('.text-detail', "This is the interval from when the task became eligible to run\n        (e.g. because of notifying a wait queue it was suspended on) to\n        when it started running."));
    };
    SliceDetailsPanel.prototype.hasSchedLatencyInfo = function (_a) {
        var wakeupTs = _a.wakeupTs, wakerUtid = _a.wakerUtid;
        return wakeupTs !== undefined && wakerUtid !== undefined;
    };
    SliceDetailsPanel.prototype.renderDetails = function (sliceInfo, threadInfo) {
        var _this = this;
        if (!threadInfo || sliceInfo.ts === undefined ||
            sliceInfo.dur === undefined) {
            return null;
        }
        else {
            var tableRows = [
                (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Process"), (0, mithril_1.default)('td', "".concat(threadInfo.procName, " [").concat(threadInfo.pid, "]"))),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Thread"), (0, mithril_1.default)('td', "".concat(threadInfo.threadName, " [").concat(threadInfo.tid, "]"), (0, mithril_1.default)('i.material-icons.grey', { onclick: function () { return _this.goToThread(); }, title: 'Go to thread' }, 'call_made'))),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Cmdline"), (0, mithril_1.default)('td', threadInfo.cmdline)),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Start time"), (0, mithril_1.default)('td', "".concat((0, time_1.timeToCode)(sliceInfo.ts)))),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Duration"), (0, mithril_1.default)('td', this.computeDuration(sliceInfo.ts, sliceInfo.dur))),
                (sliceInfo.threadDur === undefined ||
                    sliceInfo.threadTs === undefined) ?
                    '' :
                    (0, mithril_1.default)('tr', (0, mithril_1.default)('th', 'Thread duration'), (0, mithril_1.default)('td', this.computeDuration(sliceInfo.threadTs, sliceInfo.threadDur))),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Prio"), (0, mithril_1.default)('td', "".concat(sliceInfo.priority))),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "End State"), (0, mithril_1.default)('td', (0, thread_state_1.translateState)(sliceInfo.endState))),
                (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Slice ID"), (0, mithril_1.default)('td', (sliceInfo.id !== undefined) ? sliceInfo.id.toString() :
                    'Unknown')),
            ];
            for (var _i = 0, _a = this.getProcessThreadDetails(sliceInfo); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value_4 = _b[1];
                if (value_4 !== undefined) {
                    tableRows.push((0, mithril_1.default)('tr', (0, mithril_1.default)('th', key), (0, mithril_1.default)('td', value_4)));
                }
            }
            return (0, mithril_1.default)('.details-table-multicolumn', (0, mithril_1.default)('table.half-width-panel', tableRows), this.renderSchedLatencyInfo(sliceInfo));
        }
    };
    SliceDetailsPanel.prototype.goToThread = function () {
        var sliceInfo = exports.globals.sliceDetails;
        if (sliceInfo.utid === undefined)
            return;
        var threadInfo = exports.globals.threads.get(sliceInfo.utid);
        if (sliceInfo.id === undefined || sliceInfo.ts === undefined ||
            sliceInfo.dur === undefined || sliceInfo.cpu === undefined ||
            threadInfo === undefined) {
            return;
        }
        var trackId;
        for (var _i = 0, _a = Object.values(exports.globals.state.tracks); _i < _a.length; _i++) {
            var track = _a[_i];
            if (track.kind === 'ThreadStateTrack' &&
                track.config.utid === threadInfo.utid) {
                trackId = track.id;
            }
        }
        if (trackId && sliceInfo.threadStateId) {
            exports.globals.makeSelection(actions_1.Actions.selectThreadState({
                id: sliceInfo.threadStateId,
                trackId: trackId.toString(),
            }));
            (0, scroll_helper_2.scrollToTrackAndTs)(trackId, (0, time_4.toNs)(sliceInfo.ts + exports.globals.state.traceTime.startSec), true);
        }
    };
    SliceDetailsPanel.prototype.renderCanvas = function () { };
    return SliceDetailsPanel;
}(slice_panel_1.SlicePanel));
exports.SliceDetailsPanel = SliceDetailsPanel;
var time_5 = require("../common/time");
var gridline_helper_2 = require("./gridline_helper");
var TimeAxisPanel = /** @class */ (function (_super) {
    __extends(TimeAxisPanel, _super);
    function TimeAxisPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeAxisPanel.prototype.view = function () {
        return (0, mithril_1.default)('.time-axis-panel');
    };
    TimeAxisPanel.prototype.renderCanvas = function (ctx, size) {
        ctx.fillStyle = '#999';
        ctx.font = '10px Roboto Condensed';
        ctx.textAlign = 'left';
        var startTime = (0, time_5.timeToString)(exports.globals.state.traceTime.startSec);
        ctx.fillText(startTime + ' +', 6, 11);
        // Draw time axis.
        var timeScale = (0, gridline_helper_2.timeScaleForVisibleWindow)(exports.TRACK_SHELL_WIDTH, size.width);
        if (timeScale.timeSpan.duration > 0 && timeScale.widthPx > 0) {
            var tickGen = new gridline_helper_1.TickGenerator(timeScale);
            for (var _i = 0, tickGen_2 = tickGen; _i < tickGen_2.length; _i++) {
                var _a = tickGen_2[_i], type = _a.type, time = _a.time, position = _a.position;
                if (type === gridline_helper_1.TickType.MAJOR) {
                    ctx.fillRect(position, 0, 1, size.height);
                    ctx.fillText(time.toFixed(tickGen.digits) + ' s', position + 5, 10);
                }
            }
        }
        ctx.fillRect(exports.TRACK_SHELL_WIDTH - 2, 0, 2, size.height);
    };
    return TimeAxisPanel;
}(panel_1.Panel));
exports.TimeAxisPanel = TimeAxisPanel;
function onClickCopy(url) {
    return function (e) {
        e.preventDefault();
        (0, clipboard_1.copyToClipboard)(url);
        exports.globals.dispatch(actions_1.Actions.updateStatus({ msg: 'Link copied into the clipboard', timestamp: Date.now() / 1000 }));
    };
}
exports.onClickCopy = onClickCopy;
function copyToClipboard(text) {
    return __awaiter(this, void 0, Promise, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // TODO(hjd): Fix typescript type for navigator.
                    return [4 /*yield*/, navigator.clipboard.writeText(text)];
                case 1:
                    // TODO(hjd): Fix typescript type for navigator.
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Failed to copy \"".concat(text, "\" to clipboard: ").concat(err_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.copyToClipboard = copyToClipboard;
function queryResponseToClipboard(resp) {
    return __awaiter(this, void 0, Promise, function () {
        var lines, _i, _a, row, line, _b, _c, col, value_5;
        return __generator(this, function (_d) {
            lines = [];
            lines.push(resp.columns);
            for (_i = 0, _a = resp.rows; _i < _a.length; _i++) {
                row = _a[_i];
                line = [];
                for (_b = 0, _c = resp.columns; _b < _c.length; _b++) {
                    col = _c[_b];
                    value_5 = row[col];
                    line.push(value_5 === null ? 'NULL' : value_5.toString());
                }
                lines.push(line);
            }
            (0, clipboard_1.copyToClipboard)(lines.map(function (line) { return line.join('\t'); }).join('\n'));
            return [2 /*return*/];
        });
    });
}
exports.queryResponseToClipboard = queryResponseToClipboard;
function download(file, name) {
    var url = URL.createObjectURL(file);
    var a = document.createElement('a');
    a.href = url;
    a.download = name === undefined ? file.name : name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
exports.download = download;
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
exports.TRACK_SHELL_WIDTH = 100;
exports.SIDEBAR_WIDTH = 100;
exports.TRACK_BORDER_COLOR = '#ffc0cb';
exports.TOPBAR_HEIGHT = 48;
exports.SELECTION_STROKE_COLOR = '#00344596';
exports.SELECTION_FILL_COLOR = '#8398e64d';
exports.OVERVIEW_TIMELINE_NON_VISIBLE_COLOR = '#c8c8c8cc';
exports.DEFAULT_DETAILS_CONTENT_HEIGHT = 280;
exports.SELECTED_LOG_ROWS_COLOR = '#D2EFE0';
exports.BACKGROUND_COLOR = '#ffffff';
exports.FOREGROUND_COLOR = '#222';
function initCssConstants() {
    exports.TRACK_SHELL_WIDTH = getCssNum('--track-shell-width') || exports.TRACK_SHELL_WIDTH;
    exports.SIDEBAR_WIDTH = getCssNum('--sidebar-width') || exports.SIDEBAR_WIDTH;
    exports.TRACK_BORDER_COLOR = getCssStr('--track-border-color') || exports.TRACK_BORDER_COLOR;
    exports.TOPBAR_HEIGHT = getCssNum('--topbar-height') || exports.TOPBAR_HEIGHT;
    exports.SELECTION_STROKE_COLOR =
        getCssStr('--selection-stroke-color') || exports.SELECTION_STROKE_COLOR;
    exports.SELECTION_FILL_COLOR =
        getCssStr('--selection-fill-color') || exports.SELECTION_FILL_COLOR;
    exports.OVERVIEW_TIMELINE_NON_VISIBLE_COLOR =
        getCssStr('--overview-timeline-non-visible-color') ||
            exports.OVERVIEW_TIMELINE_NON_VISIBLE_COLOR;
    exports.DEFAULT_DETAILS_CONTENT_HEIGHT =
        getCssNum('--details-content-height') || exports.DEFAULT_DETAILS_CONTENT_HEIGHT;
    exports.BACKGROUND_COLOR = getCssStr('--main-background-color') || exports.BACKGROUND_COLOR;
    exports.FOREGROUND_COLOR = getCssStr('--main-foreground-color') || exports.FOREGROUND_COLOR;
}
exports.initCssConstants = initCssConstants;
function getCssStr(prop) {
    if (typeof window === 'undefined')
        return undefined;
    var body = window.document.body;
    return window.getComputedStyle(body).getPropertyValue(prop);
}
function getCssNum(prop) {
    var str = getCssStr(prop);
    if (str === undefined)
        return undefined;
    var match = str.match(/^\W*(\d+)px(|\!important')$/);
    if (!match)
        throw Error("Could not parse CSS property \"".concat(str, "\" as a number"));
    return Number(match[1]);
}
function longestString(array) {
    if (array.length === 0) {
        return '';
    }
    var answer = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i].length > answer.length) {
            answer = array[i];
        }
    }
    return answer;
}
// Component rendering popup for entering an argument name to use as a pivot.
var ArgumentPopup = /** @class */ (function () {
    function ArgumentPopup() {
        this.argument = '';
    }
    ArgumentPopup.prototype.setArgument = function (attrs, arg) {
        this.argument = arg;
        attrs.onArgumentChange(arg);
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    ArgumentPopup.prototype.renderMatches = function (attrs) {
        var _this = this;
        var result = [];
        var _loop_1 = function (option) {
            // Would be great to have smarter fuzzy matching, but in the meantime
            // simple substring check should work fine.
            var index = option.indexOf(this_1.argument);
            if (index === -1) {
                return "continue";
            }
            if (result.length === 10) {
                return "break";
            }
            result.push((0, mithril_1.default)('div', {
                onclick: function () {
                    _this.setArgument(attrs, option);
                },
            }, option.substring(0, index), 
            // Highlight the matching part with bold font
            (0, mithril_1.default)('strong', this_1.argument), option.substring(index + this_1.argument.length)));
        };
        var this_1 = this;
        for (var _i = 0, _a = attrs.knownArguments; _i < _a.length; _i++) {
            var option = _a[_i];
            var state_6 = _loop_1(option);
            if (state_6 === "break")
                break;
        }
        return result;
    };
    ArgumentPopup.prototype.view = function (_a) {
        var _this = this;
        var attrs = _a.attrs;
        return (0, mithril_1.default)('.name-completion', (0, mithril_1.default)('input', {
            oncreate: function (vnode) {
                return vnode.dom.focus();
            },
            oninput: function (e) {
                var input = e.target;
                _this.setArgument(attrs, input.value);
            },
            value: this.argument,
        }), (0, mithril_1.default)('.arguments-popup-sizer', longestString(attrs.knownArguments)), this.renderMatches(attrs));
    };
    return ArgumentPopup;
}());
exports.ArgumentPopup = ArgumentPopup;
function drawVerticalLineAtTime(ctx, timeScale, time, height, color, lineWidth) {
    if (lineWidth === void 0) { lineWidth = 2; }
    var xPos = exports.TRACK_SHELL_WIDTH + Math.floor(timeScale.timeToPx(time));
    drawVerticalLine(ctx, xPos, height, color, lineWidth);
}
exports.drawVerticalLineAtTime = drawVerticalLineAtTime;
function drawVerticalLine(ctx, xPos, height, color, lineWidth) {
    if (lineWidth === void 0) { lineWidth = 2; }
    ctx.beginPath();
    ctx.strokeStyle = color;
    var prevLineWidth = ctx.lineWidth;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(xPos, 0);
    ctx.lineTo(xPos, height);
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = prevLineWidth;
}
var string_utils_1 = require("../base/string_utils");
var arg_types_1 = require("../common/arg_types");
var query_result_tab_1 = require("./query_result_tab");
var scroll_helper_3 = require("./scroll_helper");
var ITEMS = [
    {
        name: 'Average duration',
        shouldDisplay: function (slice) { return slice.name !== undefined; },
        getAction: function (slice) { return (0, query_result_tab_1.runQueryInNewTab)("SELECT AVG(dur) / 1e9 FROM slice WHERE name = '".concat(slice.name, "'"), "".concat(slice.name, " average dur")); },
    },
    {
        name: 'Binder by TXN',
        shouldDisplay: function () { return true; },
        getAction: function () { return (0, query_result_tab_1.runQueryInNewTab)("SELECT IMPORT('android.binder');\n\n         SELECT *\n         FROM android_sync_binder_metrics_by_txn\n         ORDER BY client_dur DESC", 'Binder by TXN'); },
    },
    {
        name: 'Lock graph',
        shouldDisplay: function (slice) { return slice.id !== undefined; },
        getAction: function (slice) { return (0, query_result_tab_1.runQueryInNewTab)("SELECT IMPORT('android.monitor_contention');\n         DROP TABLE IF EXISTS FAST;\n         CREATE TABLE FAST\n         AS\n         WITH slice_process AS (\n         SELECT process.name, process.upid FROM slice\n         JOIN thread_track ON thread_track.id = slice.track_id\n         JOIN thread USING(utid)\n         JOIN process USING(upid)\n         WHERE slice.id = ".concat(slice.id, "\n         )\n         SELECT *,\n         IIF(blocked_thread_name LIKE 'binder:%', 'binder', blocked_thread_name)\n          AS blocked_thread_name_norm,\n         IIF(blocking_thread_name LIKE 'binder:%', 'binder', blocking_thread_name)\n          AS blocking_thread_name_norm\n         FROM android_monitor_contention_chain, slice_process\n         WHERE android_monitor_contention_chain.upid = slice_process.upid;\n\n         WITH\n         R AS (\n         SELECT\n           id,\n           dur,\n           CAT_STACKS(blocked_thread_name_norm || ':' || short_blocked_method,\n             blocking_thread_name_norm || ':' || short_blocking_method) AS stack\n         FROM FAST\n         WHERE parent_id IS NULL\n         UNION ALL\n         SELECT\n         c.id,\n         c.dur AS dur,\n         CAT_STACKS(stack, blocking_thread_name_norm || ':' || short_blocking_method) AS stack\n         FROM FAST c, R AS p\n         WHERE p.id = c.parent_id\n         )\n         SELECT TITLE.process_name, EXPERIMENTAL_PROFILE(stack, 'duration', 'ns', dur) AS pprof\n         FROM R, (SELECT process_name FROM FAST LIMIT 1) TITLE;"), 'Lock graph'); },
    },
];
function getSliceContextMenuItems(slice) {
    return ITEMS.filter(function (item) { return item.shouldDisplay(slice); }).map(function (item) {
        return {
            itemType: 'regular',
            text: item.name,
            callback: function () { return item.getAction(slice); },
        };
    });
}
function isTableHeader(contents) {
    return contents.kind === 'TableHeader';
}
function appendPrefix(p1, p2) {
    if (p1.length === 0) {
        return p2;
    }
    return "".concat(p1, ".").concat(p2);
}
var TableBuilder = /** @class */ (function () {
    function TableBuilder() {
        // Row data generated by builder
        this.rows = [];
        this.indentLevel = 0;
        // Maximum indent level of a key, used to determine total number of columns
        this.maxIndent = 0;
    }
    // Add a key-value pair into the table
    TableBuilder.prototype.add = function (key, value) {
        this.rows.push({
            indentLevel: 0,
            contents: { kind: 'TableRow', key: key, value: value, isArg: false },
        });
    };
    // Add arguments tree into the table
    TableBuilder.prototype.addTree = function (tree) {
        this.addTreeInternal(tree, '', '');
    };
    TableBuilder.prototype.addTreeInternal = function (record, prefix, completePrefix) {
        if ((0, arg_types_1.isArgTreeArray)(record)) {
            if (record.length === 1) {
                this.addTreeInternal(record[0], "".concat(prefix, "[0]"), "".concat(completePrefix, "[0]"));
                return;
            }
            // Add the current prefix as a separate row
            if (prefix.length > 0) {
                this.rows.push({
                    indentLevel: this.indentLevel,
                    contents: { kind: 'TableHeader', header: prefix },
                    tooltip: completePrefix,
                });
            }
            this.indentLevel++;
            for (var i = 0; i < record.length; i++) {
                // Prefix is empty for array elements because we don't want to repeat
                // the common prefix
                this.addTreeInternal(record[i], "[".concat(i, "]"), "".concat(completePrefix, "[").concat(i, "]"));
            }
            this.indentLevel--;
        }
        else if ((0, arg_types_1.isArgTreeMap)(record)) {
            var entries = Object.entries(record);
            if (entries.length === 1) {
                // Don't want to create a level of indirection in case object contains
                // only one value; think of it like file browser in IDEs not showing
                // intermediate nodes for common hierarchy corresponding to Java package
                // prefix (e.g. "com/google/perfetto").
                //
                // In this case, add key as a prefix part.
                var _a = entries[0], key = _a[0], value_6 = _a[1];
                this.addTreeInternal(value_6, appendPrefix(prefix, key), appendPrefix(completePrefix, key));
            }
            else {
                if (prefix.length > 0) {
                    var row = this.indentLevel;
                    this.rows.push({
                        indentLevel: row,
                        contents: { kind: 'TableHeader', header: prefix },
                        tooltip: completePrefix,
                    });
                    this.indentLevel++;
                }
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var _b = entries_1[_i], key = _b[0], value_7 = _b[1];
                    this.addTreeInternal(value_7, key, appendPrefix(completePrefix, key));
                }
                if (prefix.length > 0) {
                    this.indentLevel--;
                }
            }
        }
        else {
            // Leaf value in the tree: add to the table
            var row = this.indentLevel;
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
    };
    return TableBuilder;
}());
var ChromeSliceDetailsPanel = /** @class */ (function (_super) {
    __extends(ChromeSliceDetailsPanel, _super);
    function ChromeSliceDetailsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChromeSliceDetailsPanel.prototype.view = function () {
        var sliceInfo = exports.globals.sliceDetails;
        if (sliceInfo.ts !== undefined && sliceInfo.dur !== undefined &&
            sliceInfo.name !== undefined) {
            var defaultBuilder = new TableBuilder();
            defaultBuilder.add('Name', sliceInfo.name);
            defaultBuilder.add('Category', !sliceInfo.category || sliceInfo.category === '[NULL]' ?
                'N/A' :
                sliceInfo.category);
            defaultBuilder.add('Start time', (0, time_1.timeToCode)(sliceInfo.ts));
            if (sliceInfo.absTime !== undefined) {
                defaultBuilder.add('Absolute Time', sliceInfo.absTime);
            }
            defaultBuilder.add('Duration', this.computeDuration(sliceInfo.ts, sliceInfo.dur));
            if (sliceInfo.threadTs !== undefined &&
                sliceInfo.threadDur !== undefined) {
                // If we have valid thread duration, also display a percentage of
                // |threadDur| compared to |dur|.
                var threadDurFractionSuffix = sliceInfo.threadDur === -1 ?
                    '' :
                    " (".concat((sliceInfo.threadDur / sliceInfo.dur * 100).toFixed(2), "%)");
                defaultBuilder.add('Thread duration', this.computeDuration(sliceInfo.threadTs, sliceInfo.threadDur) +
                    threadDurFractionSuffix);
            }
            for (var _i = 0, _a = this.getProcessThreadDetails(sliceInfo); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value_8 = _b[1];
                if (value_8 !== undefined) {
                    defaultBuilder.add(key, value_8);
                }
            }
            defaultBuilder.add('Slice ID', (sliceInfo.id !== undefined) ? sliceInfo.id.toString() : 'Unknown');
            if (sliceInfo.description) {
                for (var _c = 0, _d = sliceInfo.description; _c < _d.length; _c++) {
                    var _e = _d[_c], key = _e[0], value_9 = _e[1];
                    defaultBuilder.add(key, value_9);
                }
            }
            return (0, mithril_1.default)('.details-panel', (0, mithril_1.default)('.details-panel-heading', (0, mithril_1.default)('h2', "Slice Details")), (0, mithril_1.default)('.details-table-multicolumn', [
                this.renderTable(defaultBuilder, '.half-width-panel'),
                this.renderRhs(sliceInfo),
            ]));
        }
        else {
            return (0, mithril_1.default)('.details-panel', (0, mithril_1.default)('.details-panel-heading', (0, mithril_1.default)('h2', "Slice Details")));
        }
    };
    ChromeSliceDetailsPanel.prototype.fillFlowPanel = function (name, flows, includeProcessName, result) {
        if (flows.length === 0)
            return;
        var builder = new TableBuilder();
        for (var _i = 0, flows_1 = flows; _i < flows_1.length; _i++) {
            var _a = flows_1[_i], flow = _a.flow, dur = _a.dur;
            builder.add('Slice', {
                kind: 'SLICE',
                sliceId: flow.sliceId,
                trackId: exports.globals.state.uiTrackIdByTraceTrackId[flow.trackId],
                description: flow.sliceChromeCustomName === undefined ?
                    flow.sliceName :
                    flow.sliceChromeCustomName,
            });
            builder.add('Delay', (0, time_1.timeToCode)(dur));
            builder.add('Thread', includeProcessName ? "".concat(flow.threadName, " (").concat(flow.processName, ")") :
                flow.threadName);
        }
        result.set(name, builder);
    };
    ChromeSliceDetailsPanel.prototype.renderCanvas = function (_ctx, _size) { };
    ChromeSliceDetailsPanel.prototype.fillArgs = function (slice, builder) {
        if (slice.argsTree && slice.args) {
            // Parsed arguments are available, need only to iterate over them to get
            // slice references
            for (var _i = 0, _a = slice.args; _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value_10 = _b[1];
                if (typeof value_10 !== 'string') {
                    builder.add(key, value_10);
                }
            }
            builder.addTree(slice.argsTree);
        }
        else if (slice.args) {
            // Parsing has failed, but arguments are available: display them in a flat
            // 2-column table
            for (var _c = 0, _d = slice.args; _c < _d.length; _c++) {
                var _e = _d[_c], key = _e[0], value_11 = _e[1];
                builder.add(key, value_11);
            }
        }
    };
    ChromeSliceDetailsPanel.prototype.getArgumentContextMenuItems = function (argument) {
        if (argument.full_key === undefined)
            return [];
        if (typeof argument.value !== 'string')
            return [];
        var argValue = argument.value;
        var fullKey = argument.full_key;
        return [
            {
                itemType: 'regular',
                text: 'Copy full key',
                callback: function () {
                    navigator.clipboard.writeText(fullKey);
                },
            },
            {
                itemType: 'regular',
                text: 'Find slices with the same arg value',
                callback: function () {
                    (0, query_result_tab_1.runQueryInNewTab)("\n              select slice.*\n              from slice\n              join args using (arg_set_id)\n              where key=".concat((0, string_utils_1.sqliteString)(fullKey), " and display_value=").concat((0, string_utils_1.sqliteString)(argValue), "\n          "), "Arg: ".concat((0, string_utils_1.sqliteString)(fullKey), "=").concat((0, string_utils_1.sqliteString)(argValue)));
                },
            },
            {
                itemType: 'regular',
                text: 'Visualise argument values',
                callback: function () {
                    exports.globals.dispatch(actions_1.Actions.addVisualisedArg({ argName: fullKey }));
                },
            },
        ];
    };
    ChromeSliceDetailsPanel.prototype.renderRhs = function (sliceInfo) {
        var builders = new Map();
        var immediatelyPrecedingByFlowSlices = [];
        var immediatelyFollowingByFlowSlices = [];
        for (var _i = 0, _a = exports.globals.connectedFlows; _i < _a.length; _i++) {
            var flow = _a[_i];
            if (flow.begin.sliceId === sliceInfo.id) {
                immediatelyFollowingByFlowSlices.push({ flow: flow.end, dur: flow.dur });
            }
            if (flow.end.sliceId === sliceInfo.id) {
                immediatelyPrecedingByFlowSlices.push({ flow: flow.begin, dur: flow.dur });
            }
        }
        // This is Chrome-specific bits:
        var isRunTask = sliceInfo.name === 'ThreadControllerImpl::RunTask' ||
            sliceInfo.name === 'ThreadPool_RunTask';
        var isPostTask = sliceInfo.name === 'ThreadPool_PostTask' ||
            sliceInfo.name === 'SequenceManager PostTask';
        // RunTask and PostTask are always same-process, so we can skip
        // emitting process name for them.
        this.fillFlowPanel('Preceding flows', immediatelyPrecedingByFlowSlices, !isRunTask, builders);
        this.fillFlowPanel('Following flows', immediatelyFollowingByFlowSlices, !isPostTask, builders);
        var argsBuilder = new TableBuilder();
        this.fillArgs(sliceInfo, argsBuilder);
        builders.set('Arguments', argsBuilder);
        var rows = [];
        for (var _b = 0, builders_1 = builders; _b < builders_1.length; _b++) {
            var _c = builders_1[_b], name = _c[0], builder = _c[1];
            rows.push((0, mithril_1.default)('h3', name));
            rows.push(this.renderTable(builder));
        }
        var contextMenuItems = getSliceContextMenuItems(sliceInfo);
        if (contextMenuItems.length > 0) {
            rows.push((0, mithril_1.default)(popup_menu_1.PopupMenuButton, {
                icon: 'arrow_drop_down',
                items: contextMenuItems,
            }, 'Contextual Options'));
        }
        return (0, mithril_1.default)('.half-width-panel', rows);
    };
    ChromeSliceDetailsPanel.prototype.renderTable = function (builder, additionalClasses) {
        if (additionalClasses === void 0) { additionalClasses = ''; }
        var rows = [];
        var _loop_2 = function (row) {
            var renderedRow = [];
            var paddingLeft = "".concat(row.indentLevel * 20, "px");
            if (isTableHeader(row.contents)) {
                renderedRow.push((0, mithril_1.default)('th', {
                    colspan: 2,
                    title: row.tooltip,
                    style: { 'padding-left': paddingLeft },
                }, row.contents.header));
            }
            else {
                var contents = [row.contents.key];
                if (row.contents.isArg) {
                    contents.push((0, mithril_1.default)('span.context-wrapper', mithril_1.default.trust('&nbsp;'), (0, mithril_1.default)(popup_menu_1.PopupMenuButton, {
                        icon: 'arrow_drop_down',
                        items: this_2.getArgumentContextMenuItems(row.contents),
                    })));
                }
                renderedRow.push((0, mithril_1.default)('th', { title: row.tooltip, style: { 'padding-left': paddingLeft } }, contents));
                var value_12 = row.contents.value;
                if (typeof value_12 === 'string') {
                    renderedRow.push((0, mithril_1.default)('td.value', this_2.mayLinkify(value_12)));
                }
                else {
                    // Type of value being a record is not propagated into the callback
                    // for some reason, extracting necessary parts as constants instead.
                    var sliceId_1 = value_12.sliceId;
                    var trackId_1 = value_12.trackId;
                    renderedRow.push((0, mithril_1.default)('td', (0, mithril_1.default)('i.material-icons.grey', {
                        onclick: function () {
                            exports.globals.makeSelection(actions_1.Actions.selectChromeSlice({ id: sliceId_1, trackId: trackId_1, table: 'slice' }));
                            // Ideally we want to have a callback to
                            // findCurrentSelection after this selection has been
                            // made. Here we do not have the info for horizontally
                            // scrolling to ts.
                            (0, scroll_helper_3.verticalScrollToTrack)(trackId_1, true);
                        },
                        title: 'Go to destination slice',
                    }, 'call_made'), value_12.description));
                }
            }
            rows.push((0, mithril_1.default)('tr', renderedRow));
        };
        var this_2 = this;
        for (var _i = 0, _a = builder.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            _loop_2(row);
        }
        return (0, mithril_1.default)("table.auto-layout".concat(additionalClasses), rows);
    };
    ChromeSliceDetailsPanel.prototype.mayLinkify = function (what) {
        if (what.startsWith('http://') || what.startsWith('https://')) {
            return (0, mithril_1.default)('a', { href: what, target: '_blank' }, what);
        }
        return what;
    };
    return ChromeSliceDetailsPanel;
}(slice_panel_1.SlicePanel));
exports.ChromeSliceDetailsPanel = ChromeSliceDetailsPanel;
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
var color_convert_1 = require("color-convert");
var css_constants_5 = require("./css_constants");
var gridline_helper_3 = require("./gridline_helper");
var icons_2 = require("./icons");
var track_1 = require("./track");
Object.defineProperty(exports, "Track", { enumerable: true, get: function () { return track_1.Track; } });
var track_registry_1 = require("./track_registry");
var vertical_line_helper_1 = require("./vertical_line_helper");
function getTitleSize(title) {
    var length = title.length;
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
function isPinned(id) {
    return exports.globals.state.pinnedTracks.indexOf(id) !== -1;
}
function isSelected(id) {
    var selection = exports.globals.state.currentSelection;
    if (selection === null || selection.kind !== 'AREA')
        return false;
    var selectedArea = exports.globals.state.areas[selection.areaId];
    return selectedArea.tracks.includes(id);
}
var TrackShell = /** @class */ (function () {
    function TrackShell() {
        // Set to true when we click down and drag the
        this.dragging = false;
        this.dropping = undefined;
    }
    TrackShell.prototype.oninit = function (vnode) {
        this.attrs = vnode.attrs;
    };
    TrackShell.prototype.view = function (_a) {
        var attrs = _a.attrs;
        // The shell should be highlighted if the current search result is inside
        // this track.
        var highlightClass = '';
        var searchIndex = exports.globals.state.searchIndex;
        if (searchIndex !== -1) {
            var trackId = exports.globals.currentSearchResults.trackIds[searchIndex];
            if (trackId === attrs.trackState.id) {
                highlightClass = 'flash';
            }
        }
        var dragClass = this.dragging ? "drag" : '';
        var dropClass = this.dropping ? "drop-".concat(this.dropping) : '';
        return (0, mithril_1.default)(".track-shell[draggable=true]", {
            class: "".concat(highlightClass, " ").concat(dragClass, " ").concat(dropClass),
            onmousedown: this.onmousedown.bind(this),
            ondragstart: this.ondragstart.bind(this),
            ondragend: this.ondragend.bind(this),
            ondragover: this.ondragover.bind(this),
            ondragleave: this.ondragleave.bind(this),
            ondrop: this.ondrop.bind(this),
        }, (0, mithril_1.default)('h1', {
            title: attrs.trackState.name,
            style: {
                'font-size': getTitleSize(attrs.trackState.name),
            },
        }, attrs.trackState.name, ('namespace' in attrs.trackState.config) &&
            (0, mithril_1.default)('span.chip', 'metric')), (0, mithril_1.default)('.track-buttons', attrs.track.getTrackShellButtons(), attrs.track.getContextMenu(), (0, mithril_1.default)(TrackButton, {
            action: function () {
                exports.globals.dispatch(actions_1.Actions.toggleTrackPinned({ trackId: attrs.trackState.id }));
            },
            i: exports.PIN,
            filledIcon: isPinned(attrs.trackState.id),
            tooltip: isPinned(attrs.trackState.id) ? 'Unpin' : 'Pin to top',
            showButton: isPinned(attrs.trackState.id),
            fullHeight: true,
        }), exports.globals.state.currentSelection !== null &&
            exports.globals.state.currentSelection.kind === 'AREA' ?
            (0, mithril_1.default)(TrackButton, {
                action: function (e) {
                    exports.globals.dispatch(actions_1.Actions.toggleTrackSelection({ id: attrs.trackState.id, isTrackGroup: false }));
                    e.stopPropagation();
                },
                i: isSelected(attrs.trackState.id) ? exports.CHECKBOX : exports.BLANK_CHECKBOX,
                tooltip: isSelected(attrs.trackState.id) ?
                    'Remove track' :
                    'Add track to selection',
                showButton: true,
            }) :
            ''));
    };
    TrackShell.prototype.onmousedown = function (e) {
        // Prevent that the click is intercepted by the PanAndZoomHandler and that
        // we start panning while dragging.
        e.stopPropagation();
    };
    TrackShell.prototype.ondragstart = function (e) {
        var dataTransfer = e.dataTransfer;
        if (dataTransfer === null)
            return;
        this.dragging = true;
        exports.globals.rafScheduler.scheduleFullRedraw();
        dataTransfer.setData('perfetto/track', "".concat(this.attrs.trackState.id));
        dataTransfer.setDragImage(new Image(), 0, 0);
        e.stopImmediatePropagation();
    };
    TrackShell.prototype.ondragend = function () {
        this.dragging = false;
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    TrackShell.prototype.ondragover = function (e) {
        if (this.dragging)
            return;
        if (!(e.target instanceof HTMLElement))
            return;
        var dataTransfer = e.dataTransfer;
        if (dataTransfer === null)
            return;
        if (!dataTransfer.types.includes('perfetto/track'))
            return;
        dataTransfer.dropEffect = 'move';
        e.preventDefault();
        // Apply some hysteresis to the drop logic so that the lightened border
        // changes only when we get close enough to the border.
        if (e.offsetY < e.target.scrollHeight / 3) {
            this.dropping = 'before';
        }
        else if (e.offsetY > e.target.scrollHeight / 3 * 2) {
            this.dropping = 'after';
        }
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    TrackShell.prototype.ondragleave = function () {
        this.dropping = undefined;
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    TrackShell.prototype.ondrop = function (e) {
        if (this.dropping === undefined)
            return;
        var dataTransfer = e.dataTransfer;
        if (dataTransfer === null)
            return;
        exports.globals.rafScheduler.scheduleFullRedraw();
        var srcId = dataTransfer.getData('perfetto/track');
        var dstId = this.attrs.trackState.id;
        exports.globals.dispatch(actions_1.Actions.moveTrack({ srcId: srcId, op: this.dropping, dstId: dstId }));
        this.dropping = undefined;
    };
    return TrackShell;
}());
var TrackContent = /** @class */ (function () {
    function TrackContent() {
        this.selectionOccurred = false;
    }
    TrackContent.prototype.view = function (node) {
        var _this = this;
        var attrs = node.attrs;
        return (0, mithril_1.default)('.track-content', {
            onmousemove: function (e) {
                attrs.track.onMouseMove({ x: e.layerX - exports.TRACK_SHELL_WIDTH, y: e.layerY });
                exports.globals.rafScheduler.scheduleRedraw();
            },
            onmouseout: function () {
                attrs.track.onMouseOut();
                exports.globals.rafScheduler.scheduleRedraw();
            },
            onmousedown: function (e) {
                _this.mouseDownX = e.layerX;
                _this.mouseDownY = e.layerY;
            },
            onmouseup: function (e) {
                if (_this.mouseDownX === undefined ||
                    _this.mouseDownY === undefined) {
                    return;
                }
                if (Math.abs(e.layerX - _this.mouseDownX) > 1 ||
                    Math.abs(e.layerY - _this.mouseDownY) > 1) {
                    _this.selectionOccurred = true;
                }
                _this.mouseDownX = undefined;
                _this.mouseDownY = undefined;
            },
            onclick: function (e) {
                // This click event occurs after any selection mouse up/drag events
                // so we have to look if the mouse moved during this click to know
                // if a selection occurred.
                if (_this.selectionOccurred) {
                    _this.selectionOccurred = false;
                    return;
                }
                // Returns true if something was selected, so stop propagation.
                if (attrs.track.onMouseClick({ x: e.layerX - exports.TRACK_SHELL_WIDTH, y: e.layerY })) {
                    e.stopPropagation();
                }
                exports.globals.rafScheduler.scheduleRedraw();
            },
        }, node.children);
    };
    return TrackContent;
}());
exports.TrackContent = TrackContent;
var TrackComponent = /** @class */ (function () {
    function TrackComponent() {
    }
    TrackComponent.prototype.view = function (_a) {
        var attrs = _a.attrs;
        // TODO(hjd): The min height below must match the track_shell_title
        // max height in common.scss so we should read it from CSS to avoid
        // them going out of sync.
        return (0, mithril_1.default)('.track', {
            style: {
                height: "".concat(Math.max(18, attrs.track.getHeight()), "px"),
            },
            id: 'track_' + attrs.trackState.id,
        }, [
            (0, mithril_1.default)(TrackShell, { track: attrs.track, trackState: attrs.trackState }),
            (0, mithril_1.default)(track_panel_2.TrackContent, { track: attrs.track }),
        ]);
    };
    TrackComponent.prototype.oncreate = function (_a) {
        var attrs = _a.attrs;
        if (exports.globals.frontendLocalState.scrollToTrackId === attrs.trackState.id) {
            (0, scroll_helper_3.verticalScrollToTrack)(attrs.trackState.id);
            exports.globals.frontendLocalState.scrollToTrackId = undefined;
        }
    };
    return TrackComponent;
}());
var TrackButton = /** @class */ (function () {
    function TrackButton() {
    }
    TrackButton.prototype.view = function (_a) {
        var attrs = _a.attrs;
        return (0, mithril_1.default)('i.track-button', {
            class: [
                (attrs.showButton ? 'show' : ''),
                (attrs.fullHeight ? 'full-height' : ''),
                (attrs.filledIcon ? 'material-icons-filled' : 'material-icons'),
            ].filter(Boolean)
                .join(' '),
            onclick: attrs.action,
            title: attrs.tooltip,
        }, attrs.i);
    };
    return TrackButton;
}());
exports.TrackButton = TrackButton;
var TrackPanel = /** @class */ (function (_super) {
    __extends(TrackPanel, _super);
    function TrackPanel(vnode) {
        var _this = _super.call(this) || this;
        var trackId = vnode.attrs.id;
        var trackState = exports.globals.state.tracks[trackId];
        if (trackState === undefined) {
            return _this;
        }
        var engine = exports.globals.engines.get(trackState.engineId);
        if (engine === undefined) {
            return _this;
        }
        var trackCreator = exports.trackRegistry.get(trackState.kind);
        _this.track = trackCreator.create({ trackId: trackId, engine: engine });
        _this.trackState = trackState;
        return _this;
    }
    TrackPanel.prototype.view = function () {
        if (this.track === undefined || this.trackState === undefined) {
            return (0, mithril_1.default)('div', 'No such track');
        }
        return (0, mithril_1.default)(TrackComponent, { trackState: this.trackState, track: this.track });
    };
    TrackPanel.prototype.oncreate = function () {
        if (this.track !== undefined) {
            this.track.onFullRedraw();
        }
    };
    TrackPanel.prototype.onupdate = function () {
        if (this.track !== undefined) {
            this.track.onFullRedraw();
        }
    };
    TrackPanel.prototype.onremove = function () {
        if (this.track !== undefined) {
            this.track.onDestroy();
            this.track = undefined;
        }
    };
    TrackPanel.prototype.highlightIfTrackSelected = function (ctx, size) {
        var localState = exports.globals.frontendLocalState;
        var selection = exports.globals.state.currentSelection;
        var trackState = this.trackState;
        if (!selection || selection.kind !== 'AREA' || trackState === undefined) {
            return;
        }
        var selectedArea = exports.globals.state.areas[selection.areaId];
        if (selectedArea.tracks.includes(trackState.id)) {
            var timeScale_1 = localState.timeScale;
            ctx.fillStyle = exports.SELECTION_FILL_COLOR;
            ctx.fillRect(timeScale_1.timeToPx(selectedArea.startSec) + exports.TRACK_SHELL_WIDTH, 0, timeScale_1.deltaTimeToPx(selectedArea.endSec - selectedArea.startSec), size.height);
        }
    };
    TrackPanel.prototype.renderCanvas = function (ctx, size) {
        ctx.save();
        (0, gridline_helper_3.drawGridLines)(ctx, size.width, size.height);
        ctx.translate(exports.TRACK_SHELL_WIDTH, 0);
        if (this.track !== undefined) {
            this.track.render(ctx);
        }
        ctx.restore();
        this.highlightIfTrackSelected(ctx, size);
        var localState = exports.globals.frontendLocalState;
        // Draw vertical line when hovering on the notes panel.
        if (exports.globals.state.hoveredNoteTimestamp !== -1) {
            (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.state.hoveredNoteTimestamp, size.height, "#aaa");
        }
        if (exports.globals.state.hoverCursorTimestamp !== -1) {
            (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.state.hoverCursorTimestamp, size.height, "#344596");
        }
        if (exports.globals.state.currentSelection !== null) {
            if (exports.globals.state.currentSelection.kind === 'SLICE' &&
                exports.globals.sliceDetails.wakeupTs !== undefined) {
                (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.sliceDetails.wakeupTs, size.height, "black");
            }
        }
        // All marked areas should have semi-transparent vertical lines
        // marking the start and end.
        for (var _i = 0, _a = Object.values(exports.globals.state.notes); _i < _a.length; _i++) {
            var note = _a[_i];
            if (note.noteType === 'AREA') {
                var transparentNoteColor = 'rgba(' + color_convert_1.hex.rgb(note.color.substr(1)).toString() + ', 0.65)';
                (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.state.areas[note.areaId].startSec, size.height, transparentNoteColor, 1);
                (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.state.areas[note.areaId].endSec, size.height, transparentNoteColor, 1);
            }
            else if (note.noteType === 'DEFAULT') {
                (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, note.timestamp, size.height, note.color);
            }
        }
    };
    TrackPanel.prototype.getSliceRect = function (tStart, tDur, depth) {
        if (this.track === undefined) {
            return undefined;
        }
        return this.track.getSliceRect(tStart, tDur, depth);
    };
    return TrackPanel;
}(panel_1.Panel));
exports.TrackPanel = TrackPanel;
// Formatting given constraints into a string which can be injected into
// SQL query.
function constraintsToQueryFragment(c) {
    var result = [];
    if (c.filters && c.filters.length > 0) {
        result.push("WHERE ".concat(c.filters.join(' and ')));
    }
    if (c.orderBy && c.orderBy.length > 0) {
        var orderBys = c.orderBy.map(function (clause) {
            var direction = clause.direction ? " ".concat(clause.direction) : '';
            return "".concat(clause.fieldName).concat(direction);
        });
        result.push("ORDER BY ".concat(orderBys.join(', ')));
    }
    if (c.limit) {
        result.push("LIMIT ".concat(c.limit));
    }
    return result.join('\n');
}
exports.constraintsToQueryFragment = constraintsToQueryFragment;
// Trace Processor returns number | null for NUM_NULL, while most of the UI
// code uses number | undefined. This functions provides a short-hand
// conversion.
// TODO(altimin): Support NUM_UNDEFINED as a first-class citizen.
function fromNumNull(n) {
    if (n === null) {
        return undefined;
    }
    return n;
}
exports.fromNumNull = fromNumNull;
var bottom_tab_1 = require("./bottom_tab");
Object.defineProperty(exports, "BottomTab", { enumerable: true, get: function () { return bottom_tab_1.BottomTab; } });
var thread_state_2 = require("./thread_state");
var value_1 = require("./value");
var ThreadStateTab = /** @class */ (function (_super) {
    __extends(ThreadStateTab, _super);
    function ThreadStateTab(args) {
        var _this = _super.call(this, args) || this;
        _this.loaded = false;
        (0, thread_state_2.getThreadState)(_this.engine, _this.config.id).then(function (state) {
            _this.loaded = true;
            _this.state = state;
            exports.globals.rafScheduler.scheduleFullRedraw();
        });
        return _this;
    }
    ThreadStateTab.create = function (args) {
        return new thread_state_tab_1.ThreadStateTab(args);
    };
    ThreadStateTab.prototype.getTitle = function () {
        // TODO(altimin): Support dynamic titles here.
        return 'Current Selection';
    };
    ThreadStateTab.prototype.renderTabContents = function () {
        if (!this.loaded) {
            return (0, mithril_1.default)('h2', 'Loading');
        }
        if (!this.state) {
            return (0, mithril_1.default)('h2', "Thread state ".concat(this.config.id, " does not exist"));
        }
        return (0, value_1.renderDict)((0, thread_state_2.threadStateToDict)(this.state));
    };
    ThreadStateTab.prototype.viewTab = function () {
        // TODO(altimin): Create a reusable component for showing the header and
        // differentiate between "Current Selection" and "Pinned" views.
        return (0, mithril_1.default)('div.details-panel', (0, mithril_1.default)('header.overview', (0, mithril_1.default)('span', 'Thread State')), this.renderTabContents());
    };
    ThreadStateTab.prototype.isLoading = function () {
        return this.state === undefined;
    };
    ThreadStateTab.prototype.renderTabCanvas = function () { };
    ThreadStateTab.kind = 'org.perfetto.ThreadStateTab';
    return ThreadStateTab;
}(bottom_tab_1.BottomTab));
exports.ThreadStateTab = ThreadStateTab;
exports.bottomTabRegistry.register(thread_state_tab_1.ThreadStateTab);
exports.ROUTE_PREFIX = '#!';
var DEFAULT_ROUTE = '/';
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
var Router = /** @class */ (function () {
    function Router(routes) {
        var _this = this;
        this.recentChanges = [];
        // frontend/index.ts calls maybeOpenTraceFromRoute() + redraw here.
        // This event is decoupled for testing and to avoid circular deps.
        this.onRouteChanged = function () { };
        (0, logging_2.assertExists)(routes[DEFAULT_ROUTE]);
        this.routes = routes;
        window.onhashchange = function (e) { return _this.onHashChange(e); };
    }
    Router.prototype.onHashChange = function (e) {
        this.crashIfLivelock();
        var oldRoute = router_1.Router.parseUrl(e.oldURL);
        var newRoute = router_1.Router.parseUrl(e.newURL);
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
        var args = mithril_1.default.buildQueryString(newRoute.args);
        var normalizedFragment = "#!".concat(newRoute.page).concat(newRoute.subpage);
        normalizedFragment += args.length > 0 ? '?' + args : '';
        if (!e.newURL.endsWith(normalizedFragment)) {
            location.replace(normalizedFragment);
            return;
        }
        this.onRouteChanged(newRoute);
    };
    // Returns the component for the current route in the URL.
    // If no route matches the URL, returns a component corresponding to
    // |this.defaultRoute|.
    Router.prototype.resolve = function () {
        var route = router_1.Router.parseFragment(location.hash);
        var component = this.routes[route.page];
        if (component === undefined) {
            component = (0, logging_2.assertExists)(this.routes[DEFAULT_ROUTE]);
        }
        return (0, mithril_1.default)(component, { subpage: route.subpage });
    };
    Router.navigate = function (newHash) {
        (0, logging_1.assertTrue)(newHash.startsWith(exports.ROUTE_PREFIX));
        window.location.hash = newHash;
    };
    // Breaks down a fragment into a Route object.
    // Sample input:
    // '#!/record/gpu?local_cache_key=abcd-1234'
    // Sample output:
    // {page: '/record', subpage: '/gpu', args: {local_cache_key: 'abcd-1234'}}
    Router.parseFragment = function (hash) {
        var prefixLength = exports.ROUTE_PREFIX.length;
        var route = '';
        if (hash.startsWith(exports.ROUTE_PREFIX)) {
            route = hash.substring(prefixLength).split('?')[0];
        }
        var page = route;
        var subpage = '';
        var splittingPoint = route.indexOf('/', 1);
        if (splittingPoint > 0) {
            page = route.substring(0, splittingPoint);
            subpage = route.substring(splittingPoint);
        }
        var argsStart = hash.indexOf('?');
        var argsStr = argsStart < 0 ? '' : hash.substring(argsStart + 1);
        var args = argsStr ? mithril_1.default.parseQueryString(hash.substring(argsStart)) : {};
        return { page: page, subpage: subpage, args: args };
    };
    // Like parseFragment() but takes a full URL.
    Router.parseUrl = function (url) {
        var hashPos = url.indexOf('#');
        var fragment = hashPos < 0 ? '' : url.substring(hashPos);
        return router_1.Router.parseFragment(fragment);
    };
    // Throws if EVENT_LIMIT onhashchange events occur within WINDOW_MS.
    Router.prototype.crashIfLivelock = function () {
        var WINDOW_MS = 1000;
        var EVENT_LIMIT = 20;
        var now = Date.now();
        while (this.recentChanges.length > 0 &&
            now - this.recentChanges[0] > WINDOW_MS) {
            this.recentChanges.shift();
        }
        this.recentChanges.push(now);
        if (this.recentChanges.length > EVENT_LIMIT) {
            throw new Error('History rewriting livelock');
        }
    };
    return Router;
}());
exports.Router = Router;
var perfetto_version_1 = require("../gen/perfetto_version");
var search_handler_1 = require("./search_handler");
var task_tracker_1 = require("./task_tracker");
var SEARCH = Symbol('search');
var COMMAND = Symbol('command');
var PLACEHOLDER = (_a = {},
    _a[SEARCH] = 'Search',
    _a[COMMAND] = 'e.g. select * from sched left join thread using(utid) limit 10',
    _a);
exports.DISMISSED_PANNING_HINT_KEY = 'dismissedPanningHint';
var mode = SEARCH;
var displayStepThrough = false;
function onKeyDown(e) {
    var event = e;
    var key = event.key;
    if (key !== 'Enter') {
        e.stopPropagation();
    }
    var txt = e.target;
    if (mode === SEARCH && txt.value === '' && key === ':') {
        e.preventDefault();
        mode = COMMAND;
        exports.globals.rafScheduler.scheduleFullRedraw();
        return;
    }
    if (mode === COMMAND && txt.value === '' && key === 'Backspace') {
        mode = SEARCH;
        exports.globals.rafScheduler.scheduleFullRedraw();
        return;
    }
    if (mode === SEARCH && key === 'Enter') {
        txt.blur();
    }
    if (mode === COMMAND && key === 'Enter') {
        var openInPinnedTab = event.metaKey || event.ctrlKey;
        (0, query_result_tab_1.runQueryInNewTab)(txt.value, openInPinnedTab ? 'Pinned query' : 'Omnibox query', openInPinnedTab ? undefined : 'omnibox_query');
    }
}
function onKeyUp(e) {
    e.stopPropagation();
    var event = e;
    var key = event.key;
    var txt = e.target;
    if (key === 'Escape') {
        mode = SEARCH;
        txt.value = '';
        txt.blur();
        exports.globals.rafScheduler.scheduleFullRedraw();
        return;
    }
}
var Omnibox = /** @class */ (function () {
    function Omnibox() {
    }
    Omnibox.prototype.oncreate = function (vnode) {
        var txt = vnode.dom.querySelector('input');
        txt.addEventListener('keydown', onKeyDown);
        txt.addEventListener('keyup', onKeyUp);
    };
    Omnibox.prototype.view = function () {
        var msgTTL = exports.globals.state.status.timestamp + 1 - Date.now() / 1e3;
        var engineIsBusy = exports.globals.state.engine !== undefined && !exports.globals.state.engine.ready;
        if (msgTTL > 0 || engineIsBusy) {
            setTimeout(function () { return exports.globals.rafScheduler.scheduleFullRedraw(); }, msgTTL * 1000);
            return (0, mithril_1.default)(".omnibox.message-mode", (0, mithril_1.default)("input[placeholder=".concat(exports.globals.state.status.msg, "][readonly]"), {
                value: '',
            }));
        }
        var commandMode = mode === COMMAND;
        return (0, mithril_1.default)(".omnibox".concat(commandMode ? '.command-mode' : ''), (0, mithril_1.default)('input', {
            placeholder: PLACEHOLDER[mode],
            oninput: function (e) {
                var value = e.target.value;
                exports.globals.dispatch(actions_1.Actions.setOmnibox({
                    omnibox: value,
                    mode: commandMode ? 'COMMAND' : 'SEARCH',
                }));
                if (mode === SEARCH) {
                    displayStepThrough = value.length >= 4;
                    exports.globals.dispatch(actions_1.Actions.setSearchIndex({ index: -1 }));
                }
            },
            value: exports.globals.state.omniboxState.omnibox,
        }), displayStepThrough ?
            (0, mithril_1.default)('.stepthrough', (0, mithril_1.default)('.current', "".concat(exports.globals.currentSearchResults.totalResults === 0 ?
                '0 / 0' :
                "".concat(exports.globals.state.searchIndex + 1, " / ").concat(exports.globals.currentSearchResults.totalResults))), (0, mithril_1.default)('button', {
                onclick: function () {
                    (0, search_handler_1.executeSearch)(true /* reverse direction */);
                },
            }, (0, mithril_1.default)('i.material-icons.left', 'keyboard_arrow_left')), (0, mithril_1.default)('button', {
                onclick: function () {
                    (0, search_handler_1.executeSearch)();
                },
            }, (0, mithril_1.default)('i.material-icons.right', 'keyboard_arrow_right'))) :
            '');
    };
    return Omnibox;
}());
var Progress = /** @class */ (function () {
    function Progress() {
        var _this = this;
        this.loading = function () { return _this.loadingAnimation(); };
    }
    Progress.prototype.oncreate = function (vnodeDom) {
        this.progressBar = vnodeDom.dom;
        exports.globals.rafScheduler.addRedrawCallback(this.loading);
    };
    Progress.prototype.onremove = function () {
        exports.globals.rafScheduler.removeRedrawCallback(this.loading);
    };
    Progress.prototype.view = function () {
        return (0, mithril_1.default)('.progress');
    };
    Progress.prototype.loadingAnimation = function () {
        if (this.progressBar === undefined)
            return;
        var engine = exports.globals.getCurrentEngine();
        if ((engine && !engine.ready) || exports.globals.numQueuedQueries > 0 ||
            exports.taskTracker.hasPendingTasks()) {
            this.progressBar.classList.add('progress-anim');
        }
        else {
            this.progressBar.classList.remove('progress-anim');
        }
    };
    return Progress;
}());
var NewVersionNotification = /** @class */ (function () {
    function NewVersionNotification() {
    }
    NewVersionNotification.prototype.view = function () {
        return (0, mithril_1.default)('.new-version-toast', "Updated to ".concat(perfetto_version_1.VERSION, " and ready for offline use!"), (0, mithril_1.default)('button.notification-btn.preferred', {
            onclick: function () {
                exports.globals.frontendLocalState.newVersionAvailable = false;
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, 'Dismiss'));
    };
    return NewVersionNotification;
}());
var HelpPanningNotification = /** @class */ (function () {
    function HelpPanningNotification() {
    }
    HelpPanningNotification.prototype.view = function () {
        var dismissed = localStorage.getItem(exports.DISMISSED_PANNING_HINT_KEY);
        // Do not show the help notification in embedded mode because local storage
        // does not persist for iFrames. The host is responsible for communicating
        // to users that they can press '?' for help.
        if (exports.globals.embeddedMode || dismissed === 'true' ||
            !exports.globals.frontendLocalState.showPanningHint) {
            return;
        }
        return (0, mithril_1.default)('.helpful-hint', (0, mithril_1.default)('.hint-text', 'Are you trying to pan? Use the WASD keys or hold shift to click ' +
            'and drag. Press \'?\' for more help.'), (0, mithril_1.default)('button.hint-dismiss-button', {
            onclick: function () {
                exports.globals.frontendLocalState.showPanningHint = false;
                localStorage.setItem(exports.DISMISSED_PANNING_HINT_KEY, 'true');
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, 'Dismiss'));
    };
    return HelpPanningNotification;
}());
var TraceErrorIcon = /** @class */ (function () {
    function TraceErrorIcon() {
    }
    TraceErrorIcon.prototype.view = function () {
        if (exports.globals.embeddedMode)
            return;
        var errors = exports.globals.traceErrors;
        if (!errors && !exports.globals.metricError || mode === COMMAND)
            return;
        var message = errors ? "".concat(errors, " import or data loss errors detected.") :
            "Metric error detected.";
        return (0, mithril_1.default)('a.error', { href: '#!/info' }, (0, mithril_1.default)('i.material-icons', {
            title: message + " Click for more info.",
        }, 'announcement'));
    };
    return TraceErrorIcon;
}());
var Topbar = /** @class */ (function () {
    function Topbar() {
    }
    Topbar.prototype.view = function () {
        return (0, mithril_1.default)('.topbar', { class: exports.globals.state.sidebarVisible ? '' : 'hide-sidebar' }, exports.globals.frontendLocalState.newVersionAvailable ?
            (0, mithril_1.default)(NewVersionNotification) :
            (0, mithril_1.default)(Omnibox), (0, mithril_1.default)(Progress), (0, mithril_1.default)(HelpPanningNotification), (0, mithril_1.default)(TraceErrorIcon));
    };
    return Topbar;
}());
exports.Topbar = Topbar;
// Helper function to create a StringValue from string together with optional
// parameters.
function value(value, params) {
    return __assign({ kind: 'STRING', value: value }, params);
}
exports.value = value;
// Helper function to convert a potentially undefined value to StringValue or
// null.
function maybeValue(v, params) {
    if (!v) {
        return null;
    }
    return (0, value_2.value)(v, params);
}
exports.maybeValue = maybeValue;
// Helper function to simplify creation of a dictionary.
// This function accepts and filters out nulls as values in the passed
// dictionary (useful for simplifying the code to render optional values).
function dict(items, params) {
    var result = {};
    for (var _i = 0, _a = Object.entries(items); _i < _a.length; _i++) {
        var _b = _a[_i], name = _b[0], value_13 = _b[1];
        if (value_13 !== null) {
            result[name] = value_13;
        }
    }
    return __assign({ kind: 'DICT', items: result }, params);
}
exports.dict = dict;
// Helper function to simplify creation of an array.
// This function accepts and filters out nulls in the passed array (useful for
// simplifying the code to render optional values).
function array(items, params) {
    return __assign({ kind: 'ARRAY', items: items.filter(function (item) { return item !== null; }) }, params);
}
exports.array = array;
function isArray(value) {
    return value.kind === 'ARRAY';
}
exports.isArray = isArray;
;
function isDict(value) {
    return value.kind === 'DICT';
}
exports.isDict = isDict;
;
function isStringValue(value) {
    return !isArray(value) && !isDict(value);
}
exports.isStringValue = isStringValue;
;
// Recursively render the given value and its children, returning a list of
// vnodes corresponding to the nodes of the table.
function renderValue(name, value, depth) {
    var row, i, _i, _a, key, renderButton;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                row = [
                    (0, mithril_1.default)('th', {
                        style: "padding-left: ".concat(15 * depth, "px"),
                    }, name, value.contextMenu ? (0, mithril_1.default)(popup_menu_1.PopupMenuButton, {
                        icon: 'arrow_drop_down',
                        items: value.contextMenu,
                    }) :
                        null),
                ];
                if (!isArray(value)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, mithril_1.default)('tr', row)];
            case 1:
                _b.sent();
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < value.items.length)) return [3 /*break*/, 5];
                return [5 /*yield**/, __values(renderValue("[".concat(i, "]"), value.items[i], depth + 1))];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                ++i;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
            case 6:
                if (!isDict(value)) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, mithril_1.default)('tr', row)];
            case 7:
                _b.sent();
                _i = 0, _a = Object.keys(value.items);
                _b.label = 8;
            case 8:
                if (!(_i < _a.length)) return [3 /*break*/, 11];
                key = _a[_i];
                return [5 /*yield**/, __values(renderValue(key, value.items[key], depth + 1))];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 8];
            case 11: return [2 /*return*/];
            case 12:
                renderButton = function (button) {
                    if (!button) {
                        return null;
                    }
                    return (0, mithril_1.default)('i.material-icons.grey', {
                        onclick: button.action,
                        title: button.hoverText,
                    }, button.icon ? button.icon : 'call_made');
                };
                if (value.kind === 'STRING') {
                    row.push((0, mithril_1.default)('td', renderButton(value.leftButton), (0, mithril_1.default)('span', value.value), renderButton(value.rightButton)));
                }
                return [4 /*yield*/, (0, mithril_1.default)('tr', row)];
            case 13:
                _b.sent();
                return [2 /*return*/];
        }
    });
}
// Render a given dictionary into a vnode.
function renderDict(dict) {
    var rows = [];
    for (var _i = 0, _a = Object.keys(dict.items); _i < _a.length; _i++) {
        var key = _a[_i];
        for (var _b = 0, _c = renderValue(key, dict.items[key], 0); _b < _c.length; _b++) {
            var vnode = _c[_b];
            rows.push(vnode);
        }
    }
    return (0, mithril_1.default)('table.auto-layout', rows);
}
exports.renderDict = renderDict;
var feature_flags_1 = require("../common/feature_flags");
var details_panel_1 = require("./details_panel");
Object.defineProperty(exports, "DetailsPanel", { enumerable: true, get: function () { return details_panel_1.DetailsPanel; } });
var notes_panel_1 = require("./notes_panel");
Object.defineProperty(exports, "NotesPanel", { enumerable: true, get: function () { return notes_panel_1.NotesPanel; } });
var overview_timeline_panel_1 = require("./overview_timeline_panel");
Object.defineProperty(exports, "OverviewTimelinePanel", { enumerable: true, get: function () { return overview_timeline_panel_1.OverviewTimelinePanel; } });
var pan_and_zoom_handler_2 = require("./pan_and_zoom_handler");
Object.defineProperty(exports, "PanAndZoomHandler", { enumerable: true, get: function () { return pan_and_zoom_handler_2.PanAndZoomHandler; } });
var panel_container_1 = require("./panel_container");
Object.defineProperty(exports, "PanelContainer", { enumerable: true, get: function () { return panel_container_1.PanelContainer; } });
var tickmark_panel_1 = require("./tickmark_panel");
Object.defineProperty(exports, "TickmarkPanel", { enumerable: true, get: function () { return tickmark_panel_1.TickmarkPanel; } });
var time_axis_panel_1 = require("./time_axis_panel");
Object.defineProperty(exports, "TimeAxisPanel", { enumerable: true, get: function () { return time_axis_panel_1.TimeAxisPanel; } });
var time_scale_2 = require("./time_scale");
var time_selection_panel_1 = require("./time_selection_panel");
Object.defineProperty(exports, "TimeSelectionPanel", { enumerable: true, get: function () { return time_selection_panel_1.TimeSelectionPanel; } });
var topbar_1 = require("./topbar");
var track_group_panel_1 = require("./track_group_panel");
Object.defineProperty(exports, "TrackGroupPanel", { enumerable: true, get: function () { return track_group_panel_1.TrackGroupPanel; } });
var track_panel_1 = require("./track_panel");
Object.defineProperty(exports, "TrackPanel", { enumerable: true, get: function () { return track_panel_1.TrackPanel; } });
var SIDEBAR_WIDTH = 256;
var OVERVIEW_PANEL_FLAG = feature_flags_1.featureFlags.register({
    id: 'overviewVisible',
    name: 'Overview Panel',
    description: 'Show the panel providing an overview of the trace',
    defaultValue: true,
});
// Checks if the mousePos is within 3px of the start or end of the
// current selected time range.
function onTimeRangeBoundary(mousePos) {
    var selection = exports.globals.state.currentSelection;
    if (selection !== null && selection.kind === 'AREA') {
        // If frontend selectedArea exists then we are in the process of editing the
        // time range and need to use that value instead.
        var area = exports.globals.frontendLocalState.selectedArea ?
            exports.globals.frontendLocalState.selectedArea :
            exports.globals.state.areas[selection.areaId];
        var start = exports.globals.frontendLocalState.timeScale.timeToPx(area.startSec);
        var end = exports.globals.frontendLocalState.timeScale.timeToPx(area.endSec);
        var startDrag = mousePos - exports.TRACK_SHELL_WIDTH;
        var startDistance = Math.abs(start - startDrag);
        var endDistance = Math.abs(end - startDrag);
        var range_1 = 3 * window.devicePixelRatio;
        // We might be within 3px of both boundaries but we should choose
        // the closest one.
        if (startDistance < range_1 && startDistance <= endDistance)
            return 'START';
        if (endDistance < range_1 && endDistance <= startDistance)
            return 'END';
    }
    return null;
}
var TrackGroup = /** @class */ (function () {
    function TrackGroup() {
    }
    TrackGroup.prototype.view = function () {
        // TrackGroup component acts as a holder for a bunch of tracks rendered
        // together: the actual rendering happens in PanelContainer. In order to
        // avoid confusion, this method remains empty.
    };
    return TrackGroup;
}());
exports.TrackGroup = TrackGroup;
/**
 * Top-most level component for the viewer page. Holds tracks, brush timeline,
 * panels, and everything else that's part of the main trace viewer page.
 */
var TraceViewer = /** @class */ (function () {
    function TraceViewer() {
        this.onResize = function () { };
        // Used to prevent global deselection if a pan/drag select occurred.
        this.keepCurrentSelection = false;
    }
    TraceViewer.prototype.oncreate = function (vnode) {
        var _this = this;
        var frontendLocalState = exports.globals.frontendLocalState;
        var updateDimensions = function () {
            var rect = vnode.dom.getBoundingClientRect();
            frontendLocalState.updateLocalLimits(0, rect.width - exports.TRACK_SHELL_WIDTH -
                frontendLocalState.getScrollbarWidth());
        };
        updateDimensions();
        // TODO: Do resize handling better.
        this.onResize = function () {
            updateDimensions();
            exports.globals.rafScheduler.scheduleFullRedraw();
        };
        // Once ResizeObservers are out, we can stop accessing the window here.
        window.addEventListener('resize', this.onResize);
        var panZoomEl = vnode.dom.querySelector('.pan-and-zoom-content');
        this.zoomContent = new pan_and_zoom_handler_2.PanAndZoomHandler({
            element: panZoomEl,
            contentOffsetX: exports.SIDEBAR_WIDTH,
            onPanned: function (pannedPx) {
                _this.keepCurrentSelection = true;
                var traceTime = exports.globals.state.traceTime;
                var vizTime = exports.globals.frontendLocalState.visibleWindowTime;
                var origDelta = vizTime.duration;
                var tDelta = frontendLocalState.timeScale.deltaPxToDuration(pannedPx);
                var tStart = vizTime.start + tDelta;
                var tEnd = vizTime.end + tDelta;
                if (tStart < traceTime.startSec) {
                    tStart = traceTime.startSec;
                    tEnd = tStart + origDelta;
                }
                else if (tEnd > traceTime.endSec) {
                    tEnd = traceTime.endSec;
                    tStart = tEnd - origDelta;
                }
                frontendLocalState.updateVisibleTime(new time_3.TimeSpan(tStart, tEnd));
                // If the user has panned they no longer need the hint.
                localStorage.setItem(exports.DISMISSED_PANNING_HINT_KEY, 'true');
                exports.globals.rafScheduler.scheduleRedraw();
            },
            onZoomed: function (zoomedPositionPx, zoomRatio) {
                // TODO(hjd): Avoid hardcoding TRACK_SHELL_WIDTH.
                // TODO(hjd): Improve support for zooming in overview timeline.
                var span = frontendLocalState.visibleWindowTime;
                var scale = frontendLocalState.timeScale;
                var zoomPx = zoomedPositionPx - exports.TRACK_SHELL_WIDTH;
                var newSpan = (0, time_scale_2.computeZoom)(scale, span, 1 - zoomRatio, zoomPx);
                frontendLocalState.updateVisibleTime(newSpan);
                exports.globals.rafScheduler.scheduleRedraw();
            },
            editSelection: function (currentPx) {
                return onTimeRangeBoundary(currentPx) !== null;
            },
            onSelection: function (dragStartX, dragStartY, prevX, currentX, currentY, editing) {
                var traceTime = exports.globals.state.traceTime;
                var scale = frontendLocalState.timeScale;
                _this.keepCurrentSelection = true;
                if (editing) {
                    var selection = exports.globals.state.currentSelection;
                    if (selection !== null && selection.kind === 'AREA') {
                        var area = exports.globals.frontendLocalState.selectedArea ?
                            exports.globals.frontendLocalState.selectedArea :
                            exports.globals.state.areas[selection.areaId];
                        var newTime = scale.pxToTime(currentX - exports.TRACK_SHELL_WIDTH);
                        // Have to check again for when one boundary crosses over the other.
                        var curBoundary = onTimeRangeBoundary(prevX);
                        if (curBoundary == null)
                            return;
                        var keepTime = curBoundary === 'START' ? area.endSec : area.startSec;
                        // Don't drag selection outside of current screen.
                        if (newTime < keepTime) {
                            newTime = Math.max(newTime, scale.pxToTime(scale.startPx));
                        }
                        else {
                            newTime = Math.min(newTime, scale.pxToTime(scale.endPx));
                        }
                        // When editing the time range we always use the saved tracks,
                        // since these will not change.
                        frontendLocalState.selectArea(Math.max(Math.min(keepTime, newTime), traceTime.startSec), Math.min(Math.max(keepTime, newTime), traceTime.endSec), exports.globals.state.areas[selection.areaId].tracks);
                    }
                }
                else {
                    var startPx = Math.min(dragStartX, currentX) - exports.TRACK_SHELL_WIDTH;
                    var endPx = Math.max(dragStartX, currentX) - exports.TRACK_SHELL_WIDTH;
                    if (startPx < 0 && endPx < 0)
                        return;
                    startPx = Math.max(startPx, scale.startPx);
                    endPx = Math.min(endPx, scale.endPx);
                    frontendLocalState.selectArea(scale.pxToTime(startPx), scale.pxToTime(endPx));
                    frontendLocalState.areaY.start = dragStartY;
                    frontendLocalState.areaY.end = currentY;
                }
                exports.globals.rafScheduler.scheduleRedraw();
            },
            endSelection: function (edit) {
                exports.globals.frontendLocalState.areaY.start = undefined;
                exports.globals.frontendLocalState.areaY.end = undefined;
                var area = exports.globals.frontendLocalState.selectedArea;
                // If we are editing we need to pass the current id through to ensure
                // the marked area with that id is also updated.
                if (edit) {
                    var selection = exports.globals.state.currentSelection;
                    if (selection !== null && selection.kind === 'AREA' && area) {
                        exports.globals.dispatch(actions_1.Actions.editArea({ area: area, areaId: selection.areaId }));
                    }
                }
                else if (area) {
                    exports.globals.makeSelection(actions_1.Actions.selectArea({ area: area }));
                }
                // Now the selection has ended we stored the final selected area in the
                // global state and can remove the in progress selection from the
                // frontendLocalState.
                exports.globals.frontendLocalState.deselectArea();
                // Full redraw to color track shell.
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        });
    };
    TraceViewer.prototype.onremove = function () {
        window.removeEventListener('resize', this.onResize);
        if (this.zoomContent)
            this.zoomContent.shutdown();
    };
    TraceViewer.prototype.view = function () {
        var _this = this;
        var scrollingPanels = exports.globals.state.scrollingTracks.map(function (id) { return (0, mithril_1.default)(track_panel_1.TrackPanel, { key: id, id: id, selectable: true }); });
        for (var _i = 0, _a = Object.values(exports.globals.state.trackGroups); _i < _a.length; _i++) {
            var group = _a[_i];
            var headerPanel = (0, mithril_1.default)(track_group_panel_1.TrackGroupPanel, {
                trackGroupId: group.id,
                key: "trackgroup-".concat(group.id),
                selectable: true,
            });
            var childTracks = [];
            // The first track is the summary track, and is displayed as part of the
            // group panel, we don't want to display it twice so we start from 1.
            if (!group.collapsed) {
                for (var i = 1; i < group.tracks.length; ++i) {
                    var id = group.tracks[i];
                    childTracks.push((0, mithril_1.default)(track_panel_1.TrackPanel, {
                        key: "track-".concat(group.id, "-").concat(id),
                        id: id,
                        selectable: true,
                    }));
                }
            }
            scrollingPanels.push((0, mithril_1.default)(TrackGroup, {
                header: headerPanel,
                collapsed: group.collapsed,
                childTracks: childTracks,
            }));
        }
        var overviewPanel = [];
        if (OVERVIEW_PANEL_FLAG.get()) {
            overviewPanel.push((0, mithril_1.default)(overview_timeline_panel_1.OverviewTimelinePanel, { key: 'overview' }));
        }
        return (0, mithril_1.default)('.page', (0, mithril_1.default)('.split-panel', (0, mithril_1.default)('.pan-and-zoom-content', {
            onclick: function () {
                // We don't want to deselect when panning/drag selecting.
                if (_this.keepCurrentSelection) {
                    _this.keepCurrentSelection = false;
                    return;
                }
                exports.globals.makeSelection(actions_1.Actions.deselect({}));
            },
        }, (0, mithril_1.default)('.pinned-panel-container', (0, mithril_1.default)(panel_container_1.PanelContainer, {
            doesScroll: false,
            panels: __spreadArray(__spreadArray(__spreadArray([], overviewPanel, true), [
                (0, mithril_1.default)(time_axis_panel_1.TimeAxisPanel, { key: 'timeaxis' }),
                (0, mithril_1.default)(time_selection_panel_1.TimeSelectionPanel, { key: 'timeselection' }),
                (0, mithril_1.default)(notes_panel_1.NotesPanel, { key: 'notes' }),
                (0, mithril_1.default)(tickmark_panel_1.TickmarkPanel, { key: 'searchTickmarks' })
            ], false), exports.globals.state.pinnedTracks.map(function (id) { return (0, mithril_1.default)(track_panel_1.TrackPanel, { key: id, id: id, selectable: true }); }), true),
            kind: 'OVERVIEW',
        })), (0, mithril_1.default)('.scrolling-panel-container', (0, mithril_1.default)(panel_container_1.PanelContainer, {
            doesScroll: true,
            panels: scrollingPanels,
            kind: 'TRACKS',
        })))), (0, mithril_1.default)(details_panel_1.DetailsPanel));
    };
    return TraceViewer;
}());
exports.ViewerPage = (0, pages_1.createPage)({
    view: function () {
        return (0, mithril_1.default)(TraceViewer);
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
var channels_1 = require("../common/channels");
var ANALYTICS_ID = 'UA-137828855-1';
var PAGE_TITLE = 'no-page-title';
function initAnalytics() {
    // Only initialize logging on the official site and on localhost (to catch
    // analytics bugs when testing locally).
    // Skip analytics is the fragment has "testing=1", this is used by UI tests.
    // Skip analytics in embeddedMode since iFrames do not have the same access to
    // local storage.
    if ((window.location.origin.startsWith('http://localhost:') ||
        window.location.origin.endsWith('.perfetto.dev')) &&
        !exports.globals.testing && !exports.globals.embeddedMode) {
        return new AnalyticsImpl();
    }
    return new NullAnalytics();
}
exports.initAnalytics = initAnalytics;
var gtagGlobals = window;
var NullAnalytics = /** @class */ (function () {
    function NullAnalytics() {
    }
    NullAnalytics.prototype.initialize = function () { };
    NullAnalytics.prototype.updatePath = function (_) { };
    NullAnalytics.prototype.logEvent = function (_x, _y) { };
    NullAnalytics.prototype.logError = function (_x) { };
    NullAnalytics.prototype.isEnabled = function () {
        return false;
    };
    return NullAnalytics;
}());
exports.NullAnalytics = NullAnalytics;
var AnalyticsImpl = /** @class */ (function () {
    function AnalyticsImpl() {
        this.initialized_ = false;
        // The code below is taken from the official Google Analytics docs [1] and
        // adapted to TypeScript. We have it here rather than as an inline script
        // in index.html (as suggested by GA's docs) because inline scripts don't
        // play nicely with the CSP policy, at least in Firefox (Firefox doesn't
        // support all CSP 3 features we use).
        // [1] https://developers.google.com/analytics/devguides/collection/gtagjs .
        gtagGlobals.dataLayer = gtagGlobals.dataLayer || [];
        function gtagFunction() {
            var _ = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _[_i] = arguments[_i];
            }
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
    AnalyticsImpl.prototype.initialize = function () {
        if (this.initialized_)
            return;
        this.initialized_ = true;
        var script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS_ID;
        script.defer = true;
        document.head.appendChild(script);
        var route = router_1.Router.parseUrl(window.location.href).page || '/';
        console.log("GA initialized. route=".concat(route), "isInternalUser=".concat(exports.globals.isInternalUser));
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
            dimension1: exports.globals.isInternalUser ? '1' : '0',
            dimension2: perfetto_version_1.VERSION,
            dimension3: (0, channels_1.getCurrentChannel)(),
        });
        this.updatePath(route);
    };
    AnalyticsImpl.prototype.updatePath = function (path) {
        gtagGlobals.gtag('event', 'page_view', { page_path: path, page_title: PAGE_TITLE });
    };
    AnalyticsImpl.prototype.logEvent = function (category, event) {
        gtagGlobals.gtag('event', event, { event_category: category });
    };
    AnalyticsImpl.prototype.logError = function (description, fatal) {
        if (fatal === void 0) { fatal = true; }
        gtagGlobals.gtag('event', 'exception', { description: description, fatal: fatal });
    };
    AnalyticsImpl.prototype.isEnabled = function () {
        return true;
    };
    return AnalyticsImpl;
}());
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
var colorizer_2 = require("../common/colorizer");
function slice(startS, durationS) {
    return {
        id: 42,
        startS: startS,
        durationS: durationS,
        depth: 0,
        flags: 0,
        title: '',
        subTitle: '',
        baseColor: colorizer_2.GRAY_COLOR,
        color: colorizer_2.GRAY_COLOR,
    };
}
var s = slice;
test('filterVisibleSlices', function () {
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
    expect(filterVisibleSlices([
        s(0, 5),
        s(50, 0),
        s(95, 5),
    ], 10, 90))
        .toEqual([
        s(50, 0),
    ]);
    expect(filterVisibleSlices([
        s(0, 5),
        s(1, 9),
        s(6, 3),
    ], 10, 90))
        .toContainEqual(s(1, 9));
    expect(filterVisibleSlices([
        s(0, 5),
        s(1, 9),
        s(6, 3),
        s(50, 0),
    ], 10, 90))
        .toContainEqual(s(1, 9));
    expect(filterVisibleSlices([
        s(85, 10),
        s(100, 10),
    ], 10, 90))
        .toEqual([
        s(85, 10),
    ]);
    expect(filterVisibleSlices([
        s(0, 100),
    ], 10, 90))
        .toEqual([
        s(0, 100),
    ]);
    expect(filterVisibleSlices([
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
    ], 10, 90))
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
var perf_1 = require("./perf");
Object.defineProperty(exports, "RunningStatistics", { enumerable: true, get: function () { return perf_1.RunningStatistics; } });
test('buffer size is accurate before reaching max capacity', function () {
    var buf = new perf_1.RunningStatistics(10);
    for (var i = 0; i < 10; i++) {
        buf.addValue(i);
        expect(buf.bufferSize).toEqual(i + 1);
    }
});
test('buffer size is accurate after reaching max capacity', function () {
    var buf = new perf_1.RunningStatistics(10);
    for (var i = 0; i < 10; i++) {
        buf.addValue(i);
    }
    for (var i = 0; i < 10; i++) {
        buf.addValue(i);
        expect(buf.bufferSize).toEqual(10);
    }
});
test('buffer mean is accurate before reaching max capacity', function () {
    var buf = new perf_1.RunningStatistics(10);
    buf.addValue(1);
    buf.addValue(2);
    buf.addValue(3);
    expect(buf.bufferMean).toBeCloseTo(2);
});
test('buffer mean is accurate after reaching max capacity', function () {
    var buf = new perf_1.RunningStatistics(10);
    for (var i = 0; i < 20; i++) {
        buf.addValue(2);
    }
    expect(buf.bufferMean).toBeCloseTo(2);
});
// The component that handles the actual modal dialog. Note that this uses
// position: absolute, so the modal dialog will be relative to the surrounding
// DOM.
// We need to split this into two components (Modal and ModalImpl) so that we
// can handle the fade-out animation via onbeforeremove. The problem here is
// that onbeforeremove is emitted only when the *parent* component removes the
// children from the vdom hierarchy. So we need a parent/child in our control to
// trigger this.
var Modal = /** @class */ (function () {
    function Modal() {
        this.requestClose = false;
    }
    Modal.prototype.close = function () {
        // The next view pass will kick-off the modalFadeOut CSS animation by
        // appending the .modal-hidden CSS class.
        this.requestClose = true;
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    Modal.prototype.view = function (vnode) {
        if (this.requestClose || vnode.attrs.close) {
            return null;
        }
        return (0, mithril_1.default)(ModalImpl, __assign(__assign({}, vnode.attrs), { parent: this }));
    };
    return Modal;
}());
exports.Modal = Modal;
// The component that handles the actual modal dialog. Note that this uses
// position: absolute, so the modal dialog will be relative to the surrounding
// DOM.
var ModalImpl = /** @class */ (function () {
    function ModalImpl() {
    }
    ModalImpl.prototype.view = function (_a) {
        var attrs = _a.attrs;
        this.onClose = attrs.onClose;
        this.parent = attrs.parent;
        var buttons = [];
        var _loop_3 = function (button) {
            buttons.push((0, mithril_1.default)('button.modal-btn', {
                class: button.primary ? 'modal-btn-primary' : '',
                id: button.id,
                onclick: function () {
                    attrs.parent.close();
                    if (button.action !== undefined)
                        button.action();
                },
            }, button.text));
        };
        for (var _i = 0, _b = attrs.buttons || []; _i < _b.length; _i++) {
            var button = _b[_i];
            _loop_3(button);
        }
        var aria = '[aria-labelledby=mm-title][aria-model][role=dialog]';
        var align = attrs.vAlign === 'TOP' ? '.modal-dialog-valign-top' : '';
        return (0, mithril_1.default)('.modal-backdrop', {
            onclick: this.onclick.bind(this),
            onkeyup: this.onkeyupdown.bind(this),
            onkeydown: this.onkeyupdown.bind(this),
            // onanimationend: this.onanimationend.bind(this),
            tabIndex: 0,
        }, (0, mithril_1.default)(".modal-dialog".concat(align).concat(aria), (0, mithril_1.default)('header', (0, mithril_1.default)('h2', { id: 'mm-title' }, attrs.title), (0, mithril_1.default)('button[aria-label=Close Modal]', { onclick: function () { return attrs.parent.close(); } }, mithril_1.default.trust('&#x2715'))), (0, mithril_1.default)('main', this.renderContent(attrs.content)), (0, mithril_1.default)('footer', buttons)));
    };
    ModalImpl.prototype.renderContent = function (content) {
        if (typeof content === 'function') {
            return content();
        }
        else {
            return content;
        }
    };
    ModalImpl.prototype.oncreate = function (vnode) {
        if (vnode.dom instanceof HTMLElement) {
            // Focus the newly created dialog, so that we react to Escape keydown
            // even if the user has not clicked yet on any element.
            // If there is a primary button, focus that, so Enter does the default
            // action. If not just focus the whole dialog.
            var primaryBtn = vnode.dom.querySelector('.modal-btn-primary');
            if (primaryBtn) {
                primaryBtn.focus();
            }
            else {
                vnode.dom.focus();
            }
            // If the modal dialog is instantiated in a tall scrollable container,
            // make sure to scroll it into the view.
            vnode.dom.scrollIntoView({ 'block': 'center' });
        }
    };
    ModalImpl.prototype.onbeforeremove = function (vnode) {
        var removePromise = (0, deferred_1.defer)();
        vnode.dom.addEventListener('animationend', function () { return removePromise.resolve(); });
        vnode.dom.classList.add('modal-fadeout');
        // Retuning `removePromise` will cause Mithril to defer the actual component
        // removal until the fade-out animation is done.
        return removePromise;
    };
    ModalImpl.prototype.onremove = function () {
        if (this.onClose !== undefined) {
            this.onClose();
            exports.globals.rafScheduler.scheduleFullRedraw();
        }
    };
    ModalImpl.prototype.onclick = function (e) {
        e.stopPropagation();
        // Only react when clicking on the backdrop. Don't close if the user clicks
        // on the dialog itself.
        var t = e.target;
        if (t instanceof Element && t.classList.contains('modal-backdrop')) {
            (0, logging_2.assertExists)(this.parent).close();
        }
    };
    ModalImpl.prototype.onkeyupdown = function (e) {
        e.stopPropagation();
        if (e.key === 'Escape' && e.type !== 'keyup') {
            (0, logging_2.assertExists)(this.parent).close();
        }
    };
    return ModalImpl;
}());
// This is deliberately NOT a Mithril component. We want to manage the lifetime
// independently (outside of Mithril), so we can render from outside the current
// vdom sub-tree. ModalContainer instances should be singletons / globals.
var ModalContainer = /** @class */ (function () {
    function ModalContainer() {
        this.generation = 1; // Start with a generation > `closeGeneration`.
        this.closeGeneration = 0;
        // This is the mithril component that is exposed to the embedder (e.g. see
        // pages.ts). The caller is supposed to hyperscript this while building the
        // vdom tree that should host the modal dialog.
        this.mithrilComponent = {
            container: this,
            view: function () {
                var thiz = this.container;
                var attrs = thiz.attrs;
                if (attrs === undefined) {
                    return null;
                }
                return [(0, mithril_1.default)(modal_2.Modal, __assign(__assign({}, attrs), { onClose: function () {
                            var _a;
                            // Remember the fact that the dialog was dismissed, in case the
                            // whole ModalContainer gets instantiated from a different page
                            // (which would cause the Modal to be destroyed and recreated).
                            thiz.closeGeneration = thiz.generation;
                            if (((_a = thiz.attrs) === null || _a === void 0 ? void 0 : _a.onClose) !== undefined) {
                                thiz.attrs.onClose();
                                exports.globals.rafScheduler.scheduleFullRedraw();
                            }
                        }, close: thiz.closeGeneration === thiz.generation ? true :
                            attrs.close, key: thiz.generation }))];
            },
        };
    }
    // This should be called to show a new modal dialog. The modal dialog will
    // be shown the next time something calls render() in a Mithril draw pass.
    // This enforces the creation of a new dialog.
    ModalContainer.prototype.createNew = function (attrs) {
        this.generation++;
        this.updateVdom(attrs);
    };
    // Updates the current dialog or creates a new one if not existing. If a
    // dialog exists already, this will update the DOM of the existing dialog.
    // This should be called in at view() time by a nested Mithril component which
    // wants to display a modal dialog (but wants it to render outside).
    ModalContainer.prototype.updateVdom = function (attrs) {
        this.attrs = attrs;
    };
    ModalContainer.prototype.close = function () {
        this.closeGeneration = this.generation;
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    return ModalContainer;
}());
exports.ModalContainer = ModalContainer;
// This is the default instance used for full-screen modal dialogs.
// page.ts calls `m(fullscreenModalContainer.mithrilComponent)` in its view().
exports.fullscreenModalContainer = new ModalContainer();
function showModal(attrs) {
    return __awaiter(this, void 0, Promise, function () {
        var promise;
        return __generator(this, function (_a) {
            // When using showModal, the caller cannot pass an onClose promise. It should
            // use the returned promised instead. onClose is only for clients using the
            // Mithril component directly.
            (0, logging_1.assertTrue)(attrs.onClose === undefined);
            promise = (0, deferred_1.defer)();
            exports.fullscreenModalContainer.createNew(__assign(__assign({}, attrs), { onClose: function () { return promise.resolve(); } }));
            exports.globals.rafScheduler.scheduleFullRedraw();
            return [2 /*return*/, promise];
        });
    });
}
exports.showModal = showModal;
var NotSupportedError = /** @class */ (function (_super) {
    __extends(NotSupportedError, _super);
    function NotSupportedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotSupportedError;
}(Error));
exports.NotSupportedError = NotSupportedError;
// Fetch the user's keyboard layout map.
// This function is merely a wrapper around the keyboard API, which throws a
// specific error when used in browsers that don't support it.
function nativeKeyboardLayoutMap() {
    return __awaiter(this, void 0, Promise, function () {
        var keyboard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!('keyboard' in window.navigator)) return [3 /*break*/, 2];
                    keyboard = window.navigator.keyboard;
                    return [4 /*yield*/, keyboard.getLayoutMap()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: throw new keyboard_layout_map_1.NotSupportedError('Keyboard API is not supported');
            }
        });
    });
}
exports.nativeKeyboardLayoutMap = nativeKeyboardLayoutMap;
var clipboard_1 = require("./clipboard");
var download_utils_1 = require("./download_utils");
// Convert column value to number if it's a bigint or a number, otherwise throw
function colToNumber(colValue) {
    if (typeof colValue === 'bigint') {
        return Number(colValue);
    }
    else if (typeof colValue === 'number') {
        return colValue;
    }
    else {
        throw Error('Value is not a number or a bigint');
    }
}
var QueryTableRow = /** @class */ (function () {
    function QueryTableRow() {
    }
    QueryTableRow.columnsContainsSliceLocation = function (columns) {
        var requiredColumns = ['ts', 'dur', 'track_id'];
        for (var _i = 0, requiredColumns_1 = requiredColumns; _i < requiredColumns_1.length; _i++) {
            var col = requiredColumns_1[_i];
            if (!columns.includes(col))
                return false;
        }
        return true;
    };
    QueryTableRow.rowOnClickHandler = function (event, row, nextTab) {
        var _a;
        // TODO(dproy): Make click handler work from analyze page.
        if (router_1.Router.parseUrl(window.location.href).page !== '/viewer')
            return;
        // If the click bubbles up to the pan and zoom handler that will deselect
        // the slice.
        event.stopPropagation();
        var sliceStart = (0, time_4.fromNs)(colToNumber(row.ts));
        // row.dur can be negative. Clamp to 1ns.
        var sliceDur = (0, time_4.fromNs)(Math.max(colToNumber(row.dur), 1));
        var sliceEnd = sliceStart + sliceDur;
        var trackId = colToNumber(row.track_id);
        var uiTrackId = exports.globals.state.uiTrackIdByTraceTrackId[trackId];
        if (uiTrackId === undefined)
            return;
        (0, scroll_helper_3.verticalScrollToTrack)(uiTrackId, true);
        // TODO(stevegolton) Soon this function will only accept Bigints
        (0, scroll_helper_1.focusHorizontalRange)(sliceStart, sliceEnd);
        var sliceId;
        if ((_a = row.type) === null || _a === void 0 ? void 0 : _a.toString().includes('slice')) {
            sliceId = colToNumber(row.id);
        }
        else {
            sliceId = colToNumber(row.slice_id);
        }
        if (sliceId !== undefined) {
            exports.globals.makeSelection(actions_1.Actions.selectChromeSlice({ id: sliceId, trackId: uiTrackId, table: 'slice' }), nextTab === 'QueryResults' ? exports.globals.state.currentTab :
                'current_selection');
        }
    };
    QueryTableRow.prototype.view = function (vnode) {
        var cells = [];
        var _a = vnode.attrs, row = _a.row, columns = _a.columns;
        var _loop_4 = function (col) {
            var value_14 = row[col];
            if (value_14 instanceof Uint8Array) {
                cells.push((0, mithril_1.default)('td', (0, mithril_1.default)(anchor_1.Anchor, {
                    onclick: function () { return (0, download_utils_1.downloadData)("".concat(col, ".blob"), value_14); },
                }, "Blob (".concat(value_14.length, " bytes)"))));
            }
            else if (typeof value_14 === 'bigint') {
                cells.push((0, mithril_1.default)('td', value_14.toString()));
            }
            else {
                cells.push((0, mithril_1.default)('td', value_14));
            }
        };
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var col = columns_1[_i];
            _loop_4(col);
        }
        var containsSliceLocation = QueryTableRow.columnsContainsSliceLocation(columns);
        var maybeOnClick = containsSliceLocation ?
            function (e) { return QueryTableRow.rowOnClickHandler(e, row, 'QueryResults'); } :
            null;
        var maybeOnDblClick = containsSliceLocation ?
            function (e) {
                return QueryTableRow.rowOnClickHandler(e, row, 'CurrentSelection');
            } :
            null;
        return (0, mithril_1.default)('tr', {
            'onclick': maybeOnClick,
            // TODO(altimin): Consider improving the logic here (e.g. delay?) to
            // account for cases when dblclick fires late.
            'ondblclick': maybeOnDblClick,
            'clickable': containsSliceLocation,
        }, cells);
    };
    return QueryTableRow;
}());
var QueryTableContent = /** @class */ (function () {
    function QueryTableContent() {
    }
    QueryTableContent.prototype.onbeforeupdate = function (vnode) {
        return vnode.attrs.resp !== this.previousResponse;
    };
    QueryTableContent.prototype.view = function (vnode) {
        var resp = vnode.attrs.resp;
        this.previousResponse = resp;
        var cols = [];
        for (var _i = 0, _a = resp.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            cols.push((0, mithril_1.default)('td', col));
        }
        var tableHeader = (0, mithril_1.default)('tr', cols);
        var rows = resp.rows.map(function (row) { return (0, mithril_1.default)(QueryTableRow, { row: row, columns: resp.columns }); });
        if (resp.error) {
            return (0, mithril_1.default)('.query-error', "SQL error: ".concat(resp.error));
        }
        else {
            return (0, mithril_1.default)('.query-table-container.x-scrollable', (0, mithril_1.default)('table.query-table', (0, mithril_1.default)('thead', tableHeader), (0, mithril_1.default)('tbody', rows)));
        }
    };
    return QueryTableContent;
}());
var QueryTable = /** @class */ (function (_super) {
    __extends(QueryTable, _super);
    function QueryTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryTable.prototype.view = function (vnode) {
        var _a;
        var resp = vnode.attrs.resp;
        var header = __spreadArray(__spreadArray([
            (0, mithril_1.default)('span', resp ? "Query result - ".concat(Math.round(resp.durationMs), " ms") :
                "Query - running"),
            (0, mithril_1.default)('span.code.text-select', vnode.attrs.query),
            (0, mithril_1.default)('span.spacer')
        ], ((_a = vnode.attrs.contextButtons) !== null && _a !== void 0 ? _a : []), true), [
            (0, mithril_1.default)(button_1.Button, {
                label: 'Copy query',
                minimal: true,
                onclick: function () {
                    (0, clipboard_1.copyToClipboard)(vnode.attrs.query);
                },
            }),
        ], false);
        if (resp) {
            if (resp.error === undefined) {
                header.push((0, mithril_1.default)(button_1.Button, {
                    label: 'Copy result (.tsv)',
                    minimal: true,
                    onclick: function () {
                        (0, clipboard_1.queryResponseToClipboard)(resp);
                    },
                }));
            }
        }
        header.push((0, mithril_1.default)(button_1.Button, {
            label: 'Close',
            minimal: true,
            onclick: function () { return vnode.attrs.onClose(); },
        }));
        var headers = [mithril_1.default.apply(void 0, __spreadArray(['header.overview'], header, false))];
        if (resp === undefined) {
            return mithril_1.default.apply(void 0, __spreadArray(['div'], headers, false));
        }
        if (resp.statementWithOutputCount > 1) {
            headers.push((0, mithril_1.default)('header.overview', "".concat(resp.statementWithOutputCount, " out of ").concat(resp.statementCount, " ") +
                "statements returned a result. Only the results for the last " +
                "statement are displayed in the table below."));
        }
        return mithril_1.default.apply(void 0, __spreadArray(__spreadArray(['div'], headers, false), [(0, mithril_1.default)(QueryTableContent, { resp: resp })], false));
    };
    QueryTable.prototype.renderCanvas = function () { };
    return QueryTable;
}(panel_1.Panel));
exports.QueryTable = QueryTable;
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
var binary_search_1 = require("../base/binary_search");
var canvas_utils_1 = require("../common/canvas_utils");
// Height of one 'row' on the flame chart including 1px of whitespace
// below the box.
var NODE_HEIGHT = 18;
exports.FLAMEGRAPH_HOVERED_COLOR = 'hsl(224, 45%, 55%)';
function findRootSize(data) {
    var totalSize = 0;
    var i = 0;
    while (i < data.length && data[i].depth === 0) {
        totalSize += data[i].totalSize;
        i++;
    }
    return totalSize;
}
exports.findRootSize = findRootSize;
var Flamegraph = /** @class */ (function () {
    function Flamegraph(flamegraphData) {
        this.nodeRendering = {};
        this.highlightSomeNodes = false;
        this.maxDepth = -1;
        this.totalSize = -1;
        // Initialised on first draw() call
        this.labelCharWidth = 0;
        this.labelFontStyle = '12px Roboto Mono';
        this.rolloverFontStyle = '12px Roboto Condensed';
        // Key for the map is depth followed by x coordinate - `depth;x`
        this.graphData = new Map();
        this.xStartsPerDepth = new Map();
        this.hoveredX = -1;
        this.hoveredY = -1;
        this.startingY = 0;
        this.flamegraphData = flamegraphData;
        this.findMaxDepth();
    }
    Flamegraph.prototype.findMaxDepth = function () {
        this.maxDepth = Math.max.apply(Math, this.flamegraphData.map(function (value) { return value.depth; }));
    };
    // Instead of highlighting the interesting nodes, we actually want to
    // de-emphasize the non-highlighted nodes. Returns true if there
    // are any highlighted nodes in the flamegraph.
    Flamegraph.prototype.highlightingExists = function () {
        this.highlightSomeNodes = this.flamegraphData.some(function (e) { return e.highlighted; });
    };
    Flamegraph.prototype.generateColor = function (name, isGreyedOut, highlighted) {
        if (isGreyedOut === void 0) { isGreyedOut = false; }
        if (isGreyedOut) {
            return '#d9d9d9';
        }
        if (name === 'unknown' || name === 'root') {
            return '#c0c0c0';
        }
        var x = 0;
        for (var i = 0; i < name.length; i += 1) {
            x += name.charCodeAt(i) % 64;
        }
        x = x % 360;
        var l = '76';
        // Make non-highlighted node lighter.
        if (this.highlightSomeNodes && !highlighted) {
            l = '90';
        }
        return "hsl(".concat(x, "deg, 45%, ").concat(l, "%)");
    };
    // Caller will have to call draw method after updating data to have updated
    // graph.
    Flamegraph.prototype.updateDataIfChanged = function (nodeRendering, flamegraphData, clickedCallsite) {
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
    };
    Flamegraph.prototype.draw = function (ctx, width, height, x, y, unit) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (unit === void 0) { unit = 'B'; }
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
        var nodesMap = new Map();
        var currentY = y;
        nodesMap.set(-1, { width: width, nextXForChildren: x, size: this.totalSize, x: x });
        // Initialize data needed for click/hover behavior.
        this.graphData = new Map();
        this.xStartsPerDepth = new Map();
        // Draw root node.
        ctx.fillStyle = this.generateColor('root', false, false);
        ctx.fillRect(x, currentY, width, NODE_HEIGHT - 1);
        var text = (0, canvas_utils_1.cropText)("root: ".concat(this.displaySize(this.totalSize, unit, unit === 'B' ? 1024 : 1000)), this.labelCharWidth, width - 2);
        ctx.fillStyle = 'black';
        ctx.fillText(text, x + 5, currentY + (NODE_HEIGHT - 1) / 2);
        currentY += NODE_HEIGHT;
        // Set style for borders.
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 0.5;
        for (var i = 0; i < this.flamegraphData.length; i++) {
            if (currentY > height) {
                break;
            }
            var value_15 = this.flamegraphData[i];
            var parentNode = nodesMap.get(value_15.parentId);
            if (parentNode === undefined) {
                continue;
            }
            var isClicked = this.clickedCallsite !== undefined;
            var isFullWidth = isClicked && value_15.depth <= this.clickedCallsite.depth;
            var isGreyedOut = isClicked && value_15.depth < this.clickedCallsite.depth;
            var parent = value_15.parentId;
            var parentSize = parent === -1 ? this.totalSize : parentNode.size;
            // Calculate node's width based on its proportion in parent.
            var width_1 = (isFullWidth ? 1 : value_15.totalSize / parentSize) * parentNode.width;
            var currentX = parentNode.nextXForChildren;
            currentY = y + NODE_HEIGHT * (value_15.depth + 1);
            // Draw node.
            var name = this.getCallsiteName(value_15);
            ctx.fillStyle = this.generateColor(name, isGreyedOut, value_15.highlighted);
            ctx.fillRect(currentX, currentY, width_1, NODE_HEIGHT - 1);
            // Set current node's data in map for children to use.
            nodesMap.set(value_15.id, {
                width: width_1,
                nextXForChildren: currentX,
                size: value_15.totalSize,
                x: currentX,
            });
            // Update next x coordinate in parent.
            nodesMap.set(value_15.parentId, {
                width: parentNode.width,
                nextXForChildren: currentX + width_1,
                size: parentNode.size,
                x: parentNode.x,
            });
            // Draw name.
            var labelPaddingPx = 5;
            var maxLabelWidth = width_1 - labelPaddingPx * 2;
            var text_1 = (0, canvas_utils_1.cropText)(name, this.labelCharWidth, maxLabelWidth);
            // If cropped text and the original text are within 20% we keep the
            // original text and just squish it a bit.
            if (text_1.length * 1.2 > name.length) {
                text_1 = name;
            }
            ctx.fillStyle = 'black';
            ctx.fillText(text_1, currentX + labelPaddingPx, currentY + (NODE_HEIGHT - 1) / 2, maxLabelWidth);
            // Draw border on the right of node.
            ctx.beginPath();
            ctx.moveTo(currentX + width_1, currentY);
            ctx.lineTo(currentX + width_1, currentY + NODE_HEIGHT);
            ctx.stroke();
            // Add this node for recognizing in click/hover.
            // Map graphData contains one callsite which is on that depth and X
            // start. Map xStartsPerDepth for each depth contains all X start
            // coordinates that callsites on that level have.
            this.graphData.set("".concat(value_15.depth, ";").concat(currentX), { callsite: value_15, width: width_1 });
            var xStarts = this.xStartsPerDepth.get(value_15.depth);
            if (xStarts === undefined) {
                this.xStartsPerDepth.set(value_15.depth, [currentX]);
            }
            else {
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
            var paddingPx = 8;
            // Size in px of the x and y offset between the mouse and the top left
            // corner of the rollover box.
            var offsetPx = 4;
            var lines = [];
            var textWidth = this.addToTooltip(this.getCallsiteName(this.hoveredCallsite), width - paddingPx, ctx, lines);
            if (this.hoveredCallsite.location != null) {
                textWidth = Math.max(textWidth, this.addToTooltip(this.hoveredCallsite.location, width, ctx, lines));
            }
            textWidth = Math.max(textWidth, this.addToTooltip(this.hoveredCallsite.mapping, width, ctx, lines));
            if (this.nodeRendering.totalSize !== undefined) {
                var percentage = this.hoveredCallsite.totalSize / this.totalSize * 100;
                var totalSizeText = "".concat(this.nodeRendering.totalSize, ": ").concat(this.displaySize(this.hoveredCallsite.totalSize, unit, unit === 'B' ? 1024 : 1000), " (").concat(percentage.toFixed(2), "%)");
                textWidth = Math.max(textWidth, this.addToTooltip(totalSizeText, width, ctx, lines));
            }
            if (this.nodeRendering.selfSize !== undefined &&
                this.hoveredCallsite.selfSize > 0) {
                var selfPercentage = this.hoveredCallsite.selfSize / this.totalSize * 100;
                var selfSizeText = "".concat(this.nodeRendering.selfSize, ": ").concat(this.displaySize(this.hoveredCallsite.selfSize, unit, unit === 'B' ? 1024 : 1000), " (").concat(selfPercentage.toFixed(2), "%)");
                textWidth = Math.max(textWidth, this.addToTooltip(selfSizeText, width, ctx, lines));
            }
            // Compute a line height as the bounding box height + 50%:
            var heightSample = ctx.measureText('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            var lineHeight = Math.round(heightSample.actualBoundingBoxDescent * 1.5);
            var rectWidth = textWidth + 2 * paddingPx;
            var rectHeight = lineHeight * lines.length + 2 * paddingPx;
            var rectXStart = this.hoveredX + offsetPx;
            var rectYStart = this.hoveredY + offsetPx;
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
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                ctx.fillText(line, rectXStart + paddingPx, rectYStart + paddingPx + i * lineHeight);
            }
        }
    };
    Flamegraph.prototype.addToTooltip = function (text, width, ctx, lines) {
        var lineSplitter = (0, flamegraph_2.splitIfTooBig)(text, width, ctx.measureText(text).width);
        lines.push.apply(lines, lineSplitter.lines);
        return lineSplitter.lineWidth;
    };
    Flamegraph.prototype.getCallsiteName = function (value) {
        return value.name === undefined || value.name === '' ? 'unknown' :
            value.name;
    };
    Flamegraph.prototype.displaySize = function (totalSize, unit, step) {
        if (step === void 0) { step = 1024; }
        if (unit === '')
            return totalSize.toLocaleString();
        if (totalSize === 0)
            return "0 ".concat(unit);
        var units = [
            ['', 1],
            ['K', step],
            ['M', Math.pow(step, 2)],
            ['G', Math.pow(step, 3)],
        ];
        var unitsIndex = Math.trunc(Math.log(totalSize) / Math.log(step));
        unitsIndex = unitsIndex > units.length - 1 ? units.length - 1 : unitsIndex;
        var result = totalSize / +units[unitsIndex][1];
        var resultString = totalSize % +units[unitsIndex][1] === 0 ?
            result.toString() :
            result.toFixed(2);
        return "".concat(resultString, " ").concat(units[unitsIndex][0]).concat(unit);
    };
    Flamegraph.prototype.onMouseMove = function (_a) {
        var x = _a.x, y = _a.y;
        this.hoveredX = x;
        this.hoveredY = y;
        this.hoveredCallsite = this.findSelectedCallsite(x, y);
        var isCallsiteSelected = this.hoveredCallsite !== undefined;
        if (!isCallsiteSelected) {
            this.onMouseOut();
        }
        return isCallsiteSelected;
    };
    Flamegraph.prototype.onMouseOut = function () {
        this.hoveredX = -1;
        this.hoveredY = -1;
        this.hoveredCallsite = undefined;
    };
    Flamegraph.prototype.onMouseClick = function (_a) {
        var x = _a.x, y = _a.y;
        var clickedCallsite = this.findSelectedCallsite(x, y);
        // TODO(b/148596659): Allow to expand [merged] callsites. Currently,
        // this expands to the biggest of the nodes that were merged, which
        // is confusing, so we disallow clicking on them.
        if (clickedCallsite === undefined || clickedCallsite.merged) {
            return undefined;
        }
        return clickedCallsite;
    };
    Flamegraph.prototype.findSelectedCallsite = function (x, y) {
        var depth = Math.trunc((y - this.startingY) / NODE_HEIGHT) - 1; // at 0 is root
        if (depth >= 0 && this.xStartsPerDepth.has(depth)) {
            var startX = this.searchSmallest(this.xStartsPerDepth.get(depth), x);
            var result = this.graphData.get("".concat(depth, ";").concat(startX));
            if (result !== undefined) {
                var width = result.width;
                return startX + width >= x ? result.callsite : undefined;
            }
        }
        return undefined;
    };
    Flamegraph.prototype.searchSmallest = function (haystack, needle) {
        haystack = haystack.sort(function (n1, n2) { return n1 - n2; });
        var left = (0, binary_search_1.searchSegment)(haystack, needle)[0];
        return left === -1 ? -1 : haystack[left];
    };
    Flamegraph.prototype.getHeight = function () {
        return this.flamegraphData.length === 0 ? 0 :
            (this.maxDepth + 2) * NODE_HEIGHT;
    };
    return Flamegraph;
}());
exports.Flamegraph = Flamegraph;
function splitIfTooBig(line, width, lineWidth) {
    if (line === '')
        return { lineWidth: lineWidth, lines: [] };
    var lines = [];
    var charWidth = lineWidth / line.length;
    var maxWidth = width - 32;
    var maxLineLen = Math.trunc(maxWidth / charWidth);
    while (line.length > 0) {
        lines.push(line.slice(0, maxLineLen));
        line = line.slice(maxLineLen);
    }
    lineWidth = Math.min(maxLineLen * charWidth, lineWidth);
    return { lineWidth: lineWidth, lines: lines };
}
exports.splitIfTooBig = splitIfTooBig;
var record_widgets_1 = require("../record_widgets");
Object.defineProperty(exports, "Probe", { enumerable: true, get: function () { return record_widgets_1.Probe; } });
var GpuSettings = /** @class */ (function () {
    function GpuSettings() {
    }
    GpuSettings.prototype.view = function (_a) {
        var attrs = _a.attrs;
        return (0, mithril_1.default)(".record-section".concat(attrs.cssClass), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'GPU frequency',
            img: 'rec_cpu_freq.png',
            descr: 'Records gpu frequency via ftrace',
            setEnabled: function (cfg, val) { return cfg.gpuFreq = val; },
            isEnabled: function (cfg) { return cfg.gpuFreq; },
        }), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'GPU memory',
            img: 'rec_gpu_mem_total.png',
            descr: "Allows to track per process and global total GPU memory usages.\n                (Available on recent Android 12+ kernels)",
            setEnabled: function (cfg, val) { return cfg.gpuMemTotal = val; },
            isEnabled: function (cfg) { return cfg.gpuMemTotal; },
        }));
    };
    return GpuSettings;
}());
exports.GpuSettings = GpuSettings;
var record_widgets_2 = require("../record_widgets");
Object.defineProperty(exports, "Slider", { enumerable: true, get: function () { return record_widgets_2.Slider; } });
var recording_sections_1 = require("./recording_sections");
var CpuSettings = /** @class */ (function () {
    function CpuSettings() {
    }
    CpuSettings.prototype.view = function (_a) {
        var attrs = _a.attrs;
        return (0, mithril_1.default)(".record-section".concat(attrs.cssClass), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Coarse CPU usage counter',
            img: 'rec_cpu_coarse.png',
            descr: "Lightweight polling of CPU usage counters via /proc/stat.\n                    Allows to periodically monitor CPU usage.",
            setEnabled: function (cfg, val) { return cfg.cpuCoarse = val; },
            isEnabled: function (cfg) { return cfg.cpuCoarse; },
        }, (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: exports.POLL_INTERVAL_MS,
            unit: 'ms',
            set: function (cfg, val) { return cfg.cpuCoarsePollMs = val; },
            get: function (cfg) { return cfg.cpuCoarsePollMs; },
        })), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Scheduling details',
            img: 'rec_cpu_fine.png',
            descr: 'Enables high-detailed tracking of scheduling events',
            setEnabled: function (cfg, val) { return cfg.cpuSched = val; },
            isEnabled: function (cfg) { return cfg.cpuSched; },
        }), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'CPU frequency and idle states',
            img: 'rec_cpu_freq.png',
            descr: 'Records cpu frequency and idle state changes via ftrace and sysfs',
            setEnabled: function (cfg, val) { return cfg.cpuFreq = val; },
            isEnabled: function (cfg) { return cfg.cpuFreq; },
        }, (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Sysfs poll interval',
            cssClass: '.thin',
            values: exports.POLL_INTERVAL_MS,
            unit: 'ms',
            set: function (cfg, val) { return cfg.cpuFreqPollMs = val; },
            get: function (cfg) { return cfg.cpuFreqPollMs; },
        })), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Syscalls',
            img: 'rec_syscalls.png',
            descr: "Tracks the enter and exit of all syscalls. On Android\n                requires a userdebug or eng build.",
            setEnabled: function (cfg, val) { return cfg.cpuSyscall = val; },
            isEnabled: function (cfg) { return cfg.cpuSyscall; },
        }));
    };
    return CpuSettings;
}());
exports.CpuSettings = CpuSettings;
var record_widgets_3 = require("../record_widgets");
Object.defineProperty(exports, "Dropdown", { enumerable: true, get: function () { return record_widgets_3.Dropdown; } });
Object.defineProperty(exports, "Textarea", { enumerable: true, get: function () { return record_widgets_3.Textarea; } });
Object.defineProperty(exports, "Toggle", { enumerable: true, get: function () { return record_widgets_3.Toggle; } });
var FTRACE_CATEGORIES = new Map();
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
var AdvancedSettings = /** @class */ (function () {
    function AdvancedSettings() {
    }
    AdvancedSettings.prototype.view = function (_a) {
        var attrs = _a.attrs;
        return (0, mithril_1.default)(".record-section".concat(attrs.cssClass), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Advanced ftrace config',
            img: 'rec_ftrace.png',
            descr: "Enable individual events and tune the kernel-tracing (ftrace)\n                  module. The events enabled here are in addition to those from\n                  enabled by other probes.",
            setEnabled: function (cfg, val) { return cfg.ftrace = val; },
            isEnabled: function (cfg) { return cfg.ftrace; },
        }, (0, mithril_1.default)(record_widgets_3.Toggle, {
            title: 'Resolve kernel symbols',
            cssClass: '.thin',
            descr: "Enables lookup via /proc/kallsyms for workqueue,\n              sched_blocked_reason and other events\n              (userdebug/eng builds only).",
            setEnabled: function (cfg, val) { return cfg.symbolizeKsyms = val; },
            isEnabled: function (cfg) { return cfg.symbolizeKsyms; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Buf size',
            cssClass: '.thin',
            values: [0, 512, 1024, 2 * 1024, 4 * 1024, 16 * 1024, 32 * 1024],
            unit: 'KB',
            zeroIsDefault: true,
            set: function (cfg, val) { return cfg.ftraceBufferSizeKb = val; },
            get: function (cfg) { return cfg.ftraceBufferSizeKb; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Drain rate',
            cssClass: '.thin',
            values: [0, 100, 250, 500, 1000, 2500, 5000],
            unit: 'ms',
            zeroIsDefault: true,
            set: function (cfg, val) { return cfg.ftraceDrainPeriodMs = val; },
            get: function (cfg) { return cfg.ftraceDrainPeriodMs; },
        }), (0, mithril_1.default)(record_widgets_3.Dropdown, {
            title: 'Event groups',
            cssClass: '.multicolumn.ftrace-events',
            options: FTRACE_CATEGORIES,
            set: function (cfg, val) { return cfg.ftraceEvents = val; },
            get: function (cfg) { return cfg.ftraceEvents; },
        }), (0, mithril_1.default)(record_widgets_3.Textarea, {
            placeholder: 'Add extra events, one per line, e.g.:\n' +
                'sched/sched_switch\n' +
                'kmem/*',
            set: function (cfg, val) { return cfg.ftraceExtraEvents = val; },
            get: function (cfg) { return cfg.ftraceExtraEvents; },
        })));
    };
    return AdvancedSettings;
}());
exports.AdvancedSettings = AdvancedSettings;
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
exports.FORCE_RESET_MESSAGE = 'Force reset the USB interface';
exports.DEFAULT_WEBSOCKET_URL = 'ws://127.0.0.1:8037';
exports.ADB_ENDPOINT = '/adb';
exports.TRACED_ENDPOINT = '/traced';
exports.DEFAULT_ADB_WEBSOCKET_URL = exports.DEFAULT_WEBSOCKET_URL + exports.ADB_ENDPOINT;
exports.DEFAULT_TRACED_WEBSOCKET_URL = exports.DEFAULT_WEBSOCKET_URL + exports.TRACED_ENDPOINT;
exports.POLL_INTERVAL_MS = [250, 500, 1000, 2500, 5000, 30000, 60000];
var LOG_BUFFERS = new Map();
LOG_BUFFERS.set('LID_CRASH', 'Crash');
LOG_BUFFERS.set('LID_DEFAULT', 'Main');
LOG_BUFFERS.set('LID_EVENTS', 'Binary events');
LOG_BUFFERS.set('LID_KERNEL', 'Kernel');
LOG_BUFFERS.set('LID_RADIO', 'Radio');
LOG_BUFFERS.set('LID_SECURITY', 'Security');
LOG_BUFFERS.set('LID_STATS', 'Stats');
LOG_BUFFERS.set('LID_SYSTEM', 'System');
var DEFAULT_ATRACE_CATEGORIES = new Map();
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
function isDataSourceDescriptor(descriptor) {
    if (descriptor instanceof Object) {
        return descriptor.name !== undefined;
    }
    return false;
}
var AtraceAppsList = /** @class */ (function () {
    function AtraceAppsList() {
    }
    AtraceAppsList.prototype.view = function () {
        if (exports.globals.state.recordConfig.allAtraceApps) {
            return (0, mithril_1.default)('div');
        }
        return (0, mithril_1.default)(record_widgets_3.Textarea, {
            placeholder: 'Apps to profile, one per line, e.g.:\n' +
                'com.android.phone\n' +
                'lmkd\n' +
                'com.android.nfc',
            cssClass: '.atrace-apps-list',
            set: function (cfg, val) { return cfg.atraceApps = val; },
            get: function (cfg) { return cfg.atraceApps; },
        });
    };
    return AtraceAppsList;
}());
var AndroidSettings = /** @class */ (function () {
    function AndroidSettings() {
    }
    AndroidSettings.prototype.view = function (_a) {
        var _b;
        var attrs = _a.attrs;
        var atraceCategories = DEFAULT_ATRACE_CATEGORIES;
        for (var _i = 0, _c = attrs.dataSources; _i < _c.length; _i++) {
            var dataSource = _c[_i];
            if (dataSource.name !== 'linux.ftrace' ||
                !isDataSourceDescriptor(dataSource.descriptor)) {
                continue;
            }
            var atraces = (_b = dataSource.descriptor.ftraceDescriptor) === null || _b === void 0 ? void 0 : _b.atraceCategories;
            if (!atraces || atraces.length === 0) {
                break;
            }
            atraceCategories = new Map();
            for (var _d = 0, atraces_1 = atraces; _d < atraces_1.length; _d++) {
                var atrace = atraces_1[_d];
                if (atrace.name) {
                    atraceCategories.set(atrace.name, atrace.description || '');
                }
            }
        }
        return (0, mithril_1.default)(".record-section".concat(attrs.cssClass), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Atrace userspace annotations',
            img: 'rec_atrace.png',
            descr: "Enables C++ / Java codebase annotations (ATRACE_BEGIN() /\n                      os.Trace())",
            setEnabled: function (cfg, val) { return cfg.atrace = val; },
            isEnabled: function (cfg) { return cfg.atrace; },
        }, (0, mithril_1.default)(record_widgets_3.Dropdown, {
            title: 'Categories',
            cssClass: '.multicolumn.atrace-categories',
            options: atraceCategories,
            set: function (cfg, val) { return cfg.atraceCats = val; },
            get: function (cfg) { return cfg.atraceCats; },
        }), (0, mithril_1.default)(record_widgets_3.Toggle, {
            title: 'Record events from all Android apps and services',
            descr: '',
            setEnabled: function (cfg, val) { return cfg.allAtraceApps = val; },
            isEnabled: function (cfg) { return cfg.allAtraceApps; },
        }), (0, mithril_1.default)(AtraceAppsList)), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Event log (logcat)',
            img: 'rec_logcat.png',
            descr: "Streams the event log into the trace. If no buffer filter is\n                      specified, all buffers are selected.",
            setEnabled: function (cfg, val) { return cfg.androidLogs = val; },
            isEnabled: function (cfg) { return cfg.androidLogs; },
        }, (0, mithril_1.default)(record_widgets_3.Dropdown, {
            title: 'Buffers',
            cssClass: '.multicolumn',
            options: LOG_BUFFERS,
            set: function (cfg, val) { return cfg.androidLogBuffers = val; },
            get: function (cfg) { return cfg.androidLogBuffers; },
        })), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Frame timeline',
            img: 'rec_frame_timeline.png',
            descr: "Records expected/actual frame timings from surface_flinger.\n                      Requires Android 12 (S) or above.",
            setEnabled: function (cfg, val) { return cfg.androidFrameTimeline = val; },
            isEnabled: function (cfg) { return cfg.androidFrameTimeline; },
        }), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Game intervention list',
            img: '',
            descr: "List game modes and interventions.\n                    Requires Android 13 (T) or above.",
            setEnabled: function (cfg, val) { return cfg.androidGameInterventionList = val; },
            isEnabled: function (cfg) { return cfg.androidGameInterventionList; },
        }), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Network Tracing',
            img: '',
            descr: "Records detailed information on network packets.\n                      Requires Android 14 (U) or above.",
            setEnabled: function (cfg, val) { return cfg.androidNetworkTracing = val; },
            isEnabled: function (cfg) { return cfg.androidNetworkTracing; },
        }, (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: [100, 250, 500, 1000, 2500],
            unit: 'ms',
            set: function (cfg, val) { return cfg.androidNetworkTracingPollMs = val; },
            get: function (cfg) { return cfg.androidNetworkTracingPollMs; },
        })));
    };
    return AndroidSettings;
}());
exports.AndroidSettings = AndroidSettings;
var recording_page_controller_1 = require("../../common/recordingV2/recording_page_controller");
var RecordingMultipleChoice = /** @class */ (function () {
    function RecordingMultipleChoice() {
        this.selectedIndex = -1;
    }
    RecordingMultipleChoice.prototype.targetSelection = function (targets, controller) {
        var _this = this;
        var targetInfo = controller.getTargetInfo();
        var targetNames = [];
        this.selectedIndex = -1;
        for (var i = 0; i < targets.length; i++) {
            var targetName = targets[i].getInfo().name;
            targetNames.push((0, mithril_1.default)('option', targetName));
            if (targetInfo && targetName === targetInfo.name) {
                this.selectedIndex = i;
            }
        }
        var selectedIndex = this.selectedIndex;
        return (0, mithril_1.default)('label', mithril_1.default.apply(void 0, __spreadArray(['select', __assign({ selectedIndex: selectedIndex, onchange: function (e) {
                    controller.onTargetSelection(e.target.value);
                }, onupdate: function (select) {
                    // Work around mithril bug
                    // (https://github.com/MithrilJS/mithril.js/issues/2107): We
                    // may update the select's options while also changing the
                    // selectedIndex at the same time. The update of selectedIndex
                    // may be applied before the new options are added to the
                    // select element. Because the new selectedIndex may be
                    // outside of the select's options at that time, we have to
                    // reselect the correct index here after any new children were
                    // added.
                    select.dom.selectedIndex =
                        _this.selectedIndex;
                } }, { size: targets.length, multiple: 'multiple' })], targetNames, false)));
    };
    RecordingMultipleChoice.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var controller = attrs.controller;
        if (!controller.shouldShowTargetSelection()) {
            return undefined;
        }
        var targets = [];
        for (var _i = 0, _b = attrs.targetFactories; _i < _b.length; _i++) {
            var targetFactory = _b[_i];
            for (var _c = 0, _d = targetFactory.listTargets(); _c < _d.length; _c++) {
                var target = _d[_c];
                targets.push(target);
            }
        }
        if (targets.length === 0) {
            return undefined;
        }
        return [
            (0, mithril_1.default)('text', 'Select target:'),
            (0, mithril_1.default)('.record-modal-command', this.targetSelection(targets, controller), (0, mithril_1.default)('button.record-modal-button-high', {
                disabled: this.selectedIndex === -1,
                onclick: function () {
                    exports.fullscreenModalContainer.close();
                    controller.onStartRecordingPressed();
                },
            }, 'Connect')),
        ];
    };
    return RecordingMultipleChoice;
}());
exports.RecordingMultipleChoice = RecordingMultipleChoice;
var recording_ui_utils_1 = require("./recording_ui_utils");
function couldNotClaimInterface(onReset, onCancel) {
    var hasPressedAButton = false;
    (0, modal_3.showModal)({
        title: 'Could not claim the USB interface',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('text', 'This can happen if you have the Android Debug Bridge ' +
            '(adb) running on your workstation or any other tool which is ' +
            'taking exclusive access of the USB interface.'), (0, mithril_1.default)('br'), (0, mithril_1.default)('br'), (0, mithril_1.default)('text.small-font', 'Resetting will cause the ADB server to disconnect and ' +
            'will try to reassign the interface to the current browser.')),
        buttons: [
            {
                text: exports.FORCE_RESET_MESSAGE,
                primary: true,
                id: 'force_USB_interface',
                action: function () {
                    hasPressedAButton = true;
                    onReset();
                },
            },
            {
                text: 'Cancel',
                primary: false,
                id: 'cancel_USB_interface',
                action: function () {
                    hasPressedAButton = true;
                    onCancel();
                },
            },
        ],
    }).then(function () {
        // If the user has clicked away from the modal, we interpret that as a
        // 'Cancel'.
        if (!hasPressedAButton) {
            onCancel();
        }
    });
}
exports.couldNotClaimInterface = couldNotClaimInterface;
var recording_utils_1 = require("../../common/recordingV2/recording_utils");
var chrome_target_factory_1 = require("../../common/recordingV2/target_factories/chrome_target_factory");
var target_factory_registry_1 = require("../../common/recordingV2/target_factory_registry");
var websocket_menu_controller_1 = require("../../common/recordingV2/websocket_menu_controller");
var record_widgets_4 = require("../record_widgets");
Object.defineProperty(exports, "CodeSnippet", { enumerable: true, get: function () { return record_widgets_4.CodeSnippet; } });
var recording_multiple_choice_1 = require("./recording_multiple_choice");
Object.defineProperty(exports, "RecordingMultipleChoice", { enumerable: true, get: function () { return recording_multiple_choice_1.RecordingMultipleChoice; } });
var RUN_WEBSOCKET_CMD = '# Get tracebox\n' +
    'curl -LO https://get.perfetto.dev/tracebox\n' +
    'chmod +x ./tracebox\n' +
    '# Option A - trace android devices\n' +
    'adb start-server\n' +
    '# Option B - trace the host OS\n' +
    './tracebox traced --background\n' +
    './tracebox traced_probes --background\n' +
    '# Start the websocket server\n' +
    './tracebox websocket_bridge\n';
function addNewTarget(recordingPageController) {
    var components = [];
    components.push((0, mithril_1.default)('text', 'Select platform:'));
    components.push(assembleWebusbSection(recordingPageController));
    components.push((0, mithril_1.default)('.line'));
    components.push(assembleWebsocketSection(recordingPageController));
    components.push((0, mithril_1.default)('.line'));
    components.push(assembleChromeSection(recordingPageController));
    return {
        title: 'Add new recording target',
        content: (0, mithril_1.default)('.record-modal', components),
    };
}
exports.addNewTarget = addNewTarget;
function assembleWebusbSection(recordingPageController) {
    return (0, mithril_1.default)('.record-modal-section', (0, mithril_1.default)('.logo-wrapping', (0, mithril_1.default)('i.material-icons', 'usb')), (0, mithril_1.default)('.record-modal-description', (0, mithril_1.default)('h3', 'Android device over WebUSB'), (0, mithril_1.default)('text', 'Android developers: this option cannot co-operate ' +
        'with the adb host on your machine. Only one entity between ' +
        'the browser and adb can control the USB endpoint. If adb is ' +
        'running, you will be prompted to re-assign the device to the ' +
        'browser. Use the websocket option below to use both ' +
        'simultaneously.'), (0, mithril_1.default)('.record-modal-button', {
        onclick: function () {
            exports.fullscreenModalContainer.close();
            recordingPageController.addAndroidDevice();
        },
    }, 'Connect new WebUSB driver')));
}
function assembleWebsocketSection(recordingPageController) {
    var websocketComponents = [];
    websocketComponents.push((0, mithril_1.default)('h3', 'Android / Linux / MacOS device via Websocket'));
    websocketComponents.push((0, mithril_1.default)('text', 'This option assumes that the adb server is already ' +
        'running on your machine.'), (0, mithril_1.default)('.record-modal-command', (0, mithril_1.default)(record_widgets_4.CodeSnippet, {
        text: RUN_WEBSOCKET_CMD,
    })));
    websocketComponents.push((0, mithril_1.default)('.record-modal-command', (0, mithril_1.default)('text', 'Websocket bridge address: '), (0, mithril_1.default)('input[type=text]', {
        value: websocketMenuController.getPath(),
        oninput: function () {
            websocketMenuController.setPath(this.value);
        },
    }), (0, mithril_1.default)('.record-modal-logo-button', {
        onclick: function () { return websocketMenuController.onPathChange(); },
    }, (0, mithril_1.default)('i.material-icons', 'refresh'))));
    websocketComponents.push((0, mithril_1.default)(recording_multiple_choice_1.RecordingMultipleChoice, {
        controller: recordingPageController,
        targetFactories: websocketMenuController.getTargetFactories(),
    }));
    return (0, mithril_1.default)('.record-modal-section', (0, mithril_1.default)('.logo-wrapping', (0, mithril_1.default)('i.material-icons', 'settings_ethernet')), mithril_1.default.apply(void 0, __spreadArray(['.record-modal-description'], websocketComponents, false)));
}
function assembleChromeSection(recordingPageController) {
    if (!target_factory_registry_1.targetFactoryRegistry.has(chrome_target_factory_1.CHROME_TARGET_FACTORY)) {
        return undefined;
    }
    var chromeComponents = [];
    chromeComponents.push((0, mithril_1.default)('h3', 'Chrome Browser instance or ChromeOS device'));
    var chromeFactory = target_factory_registry_1.targetFactoryRegistry.get(chrome_target_factory_1.CHROME_TARGET_FACTORY);
    if (!chromeFactory.isExtensionInstalled) {
        chromeComponents.push((0, mithril_1.default)('text', 'Install the extension ', (0, mithril_1.default)('a', { href: recording_utils_1.EXTENSION_URL, target: '_blank' }, 'from this link '), 'and refresh the page.'));
    }
    else {
        chromeComponents.push((0, mithril_1.default)(recording_multiple_choice_1.RecordingMultipleChoice, {
            controller: recordingPageController,
            targetFactories: [chromeFactory],
        }));
    }
    return (0, mithril_1.default)('.record-modal-section', (0, mithril_1.default)('.logo-wrapping', (0, mithril_1.default)('i.material-icons', 'web')), mithril_1.default.apply(void 0, __spreadArray(['.record-modal-description'], chromeComponents, false)));
}
var websocketMenuController = new websocket_menu_controller_1.WebsocketMenuController();
var protos_1 = require("../../common/protos");
var HeapSettings = /** @class */ (function () {
    function HeapSettings() {
    }
    HeapSettings.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var valuesForMS = [
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
        var valuesForShMemBuff = [
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
        return (0, mithril_1.default)(".".concat(attrs.cssClass), (0, mithril_1.default)(record_widgets_3.Textarea, {
            title: 'Names or pids of the processes to track (required)',
            docsLink: 'https://perfetto.dev/docs/data-sources/native-heap-profiler#heapprofd-targets',
            placeholder: 'One per line, e.g.:\n' +
                'system_server\n' +
                'com.google.android.apps.photos\n' +
                '1503',
            set: function (cfg, val) { return cfg.hpProcesses = val; },
            get: function (cfg) { return cfg.hpProcesses; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Sampling interval',
            cssClass: '.thin',
            values: [
                /* eslint-disable no-multi-spaces */
                0, 1, 2, 4, 8, 16, 32, 64,
                128, 256, 512, 1024, 2048, 4096, 8192, 16384,
                32768, 65536, 131072, 262144, 524288, 1048576,
                /* eslint-enable no-multi-spaces */
            ],
            unit: 'B',
            min: 0,
            set: function (cfg, val) { return cfg.hpSamplingIntervalBytes = val; },
            get: function (cfg) { return cfg.hpSamplingIntervalBytes; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Continuous dumps interval ',
            description: 'Time between following dumps (0 = disabled)',
            cssClass: '.thin',
            values: valuesForMS,
            unit: 'ms',
            min: 0,
            set: function (cfg, val) {
                cfg.hpContinuousDumpsInterval = val;
            },
            get: function (cfg) { return cfg.hpContinuousDumpsInterval; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Continuous dumps phase',
            description: 'Time before first dump',
            cssClass: ".thin".concat(exports.globals.state.recordConfig.hpContinuousDumpsInterval === 0 ?
                '.greyed-out' :
                ''),
            values: valuesForMS,
            unit: 'ms',
            min: 0,
            disabled: exports.globals.state.recordConfig.hpContinuousDumpsInterval === 0,
            set: function (cfg, val) { return cfg.hpContinuousDumpsPhase = val; },
            get: function (cfg) { return cfg.hpContinuousDumpsPhase; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: "Shared memory buffer",
            cssClass: '.thin',
            values: valuesForShMemBuff.filter(function (value) { return value === 0 || value >= 8192 && value % 4096 === 0; }),
            unit: 'B',
            min: 0,
            set: function (cfg, val) { return cfg.hpSharedMemoryBuffer = val; },
            get: function (cfg) { return cfg.hpSharedMemoryBuffer; },
        }), (0, mithril_1.default)(record_widgets_3.Toggle, {
            title: 'Block client',
            cssClass: '.thin',
            descr: "Slow down target application if profiler cannot keep up.",
            setEnabled: function (cfg, val) { return cfg.hpBlockClient = val; },
            isEnabled: function (cfg) { return cfg.hpBlockClient; },
        }), (0, mithril_1.default)(record_widgets_3.Toggle, {
            title: 'All custom allocators (Q+)',
            cssClass: '.thin',
            descr: "If the target application exposes custom allocators, also\nsample from those.",
            setEnabled: function (cfg, val) { return cfg.hpAllHeaps = val; },
            isEnabled: function (cfg) { return cfg.hpAllHeaps; },
        }));
    };
    return HeapSettings;
}());
var JavaHeapDumpSettings = /** @class */ (function () {
    function JavaHeapDumpSettings() {
    }
    JavaHeapDumpSettings.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var valuesForMS = [
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
        return (0, mithril_1.default)(".".concat(attrs.cssClass), (0, mithril_1.default)(record_widgets_3.Textarea, {
            title: 'Names or pids of the processes to track (required)',
            placeholder: 'One per line, e.g.:\n' +
                'com.android.vending\n' +
                '1503',
            set: function (cfg, val) { return cfg.jpProcesses = val; },
            get: function (cfg) { return cfg.jpProcesses; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Continuous dumps interval ',
            description: 'Time between following dumps (0 = disabled)',
            cssClass: '.thin',
            values: valuesForMS,
            unit: 'ms',
            min: 0,
            set: function (cfg, val) {
                cfg.jpContinuousDumpsInterval = val;
            },
            get: function (cfg) { return cfg.jpContinuousDumpsInterval; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Continuous dumps phase',
            description: 'Time before first dump',
            cssClass: ".thin".concat(exports.globals.state.recordConfig.jpContinuousDumpsInterval === 0 ?
                '.greyed-out' :
                ''),
            values: valuesForMS,
            unit: 'ms',
            min: 0,
            disabled: exports.globals.state.recordConfig.jpContinuousDumpsInterval === 0,
            set: function (cfg, val) { return cfg.jpContinuousDumpsPhase = val; },
            get: function (cfg) { return cfg.jpContinuousDumpsPhase; },
        }));
    };
    return JavaHeapDumpSettings;
}());
var MemorySettings = /** @class */ (function () {
    function MemorySettings() {
    }
    MemorySettings.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var meminfoOpts = new Map();
        for (var x in protos_1.MeminfoCounters) {
            if (typeof protos_1.MeminfoCounters[x] === 'number' &&
                !"".concat(x).endsWith('_UNSPECIFIED')) {
                meminfoOpts.set(x, x.replace('MEMINFO_', '').toLowerCase());
            }
        }
        var vmstatOpts = new Map();
        for (var x in protos_1.VmstatCounters) {
            if (typeof protos_1.VmstatCounters[x] === 'number' &&
                !"".concat(x).endsWith('_UNSPECIFIED')) {
                vmstatOpts.set(x, x.replace('VMSTAT_', '').toLowerCase());
            }
        }
        return (0, mithril_1.default)(".record-section".concat(attrs.cssClass), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Native heap profiling',
            img: 'rec_native_heap_profiler.png',
            descr: "Track native heap allocations & deallocations of an Android\n               process. (Available on Android 10+)",
            setEnabled: function (cfg, val) { return cfg.heapProfiling = val; },
            isEnabled: function (cfg) { return cfg.heapProfiling; },
        }, (0, mithril_1.default)(HeapSettings, attrs)), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Java heap dumps',
            img: 'rec_java_heap_dump.png',
            descr: "Dump information about the Java object graph of an\n          Android app. (Available on Android 11+)",
            setEnabled: function (cfg, val) { return cfg.javaHeapDump = val; },
            isEnabled: function (cfg) { return cfg.javaHeapDump; },
        }, (0, mithril_1.default)(JavaHeapDumpSettings, attrs)), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Kernel meminfo',
            img: 'rec_meminfo.png',
            descr: 'Polling of /proc/meminfo',
            setEnabled: function (cfg, val) { return cfg.meminfo = val; },
            isEnabled: function (cfg) { return cfg.meminfo; },
        }, (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: exports.POLL_INTERVAL_MS,
            unit: 'ms',
            set: function (cfg, val) { return cfg.meminfoPeriodMs = val; },
            get: function (cfg) { return cfg.meminfoPeriodMs; },
        }), (0, mithril_1.default)(record_widgets_3.Dropdown, {
            title: 'Select counters',
            cssClass: '.multicolumn',
            options: meminfoOpts,
            set: function (cfg, val) { return cfg.meminfoCounters = val; },
            get: function (cfg) { return cfg.meminfoCounters; },
        })), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'High-frequency memory events',
            img: 'rec_mem_hifreq.png',
            descr: "Allows to track short memory spikes and transitories through\n                ftrace's mm_event, rss_stat and ion events. Available only\n                on recent Android Q+ kernels",
            setEnabled: function (cfg, val) { return cfg.memHiFreq = val; },
            isEnabled: function (cfg) { return cfg.memHiFreq; },
        }), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Low memory killer',
            img: 'rec_lmk.png',
            descr: "Record LMK events. Works both with the old in-kernel LMK\n                and the newer userspace lmkd. It also tracks OOM score\n                adjustments.",
            setEnabled: function (cfg, val) { return cfg.memLmk = val; },
            isEnabled: function (cfg) { return cfg.memLmk; },
        }), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Per process stats',
            img: 'rec_ps_stats.png',
            descr: "Periodically samples all processes in the system tracking:\n                    their thread list, memory counters (RSS, swap and other\n                    /proc/status counters) and oom_score_adj.",
            setEnabled: function (cfg, val) { return cfg.procStats = val; },
            isEnabled: function (cfg) { return cfg.procStats; },
        }, (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: exports.POLL_INTERVAL_MS,
            unit: 'ms',
            set: function (cfg, val) { return cfg.procStatsPeriodMs = val; },
            get: function (cfg) { return cfg.procStatsPeriodMs; },
        })), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Virtual memory stats',
            img: 'rec_vmstat.png',
            descr: "Periodically polls virtual memory stats from /proc/vmstat.\n                    Allows to gather statistics about swap, eviction,\n                    compression and pagecache efficiency",
            setEnabled: function (cfg, val) { return cfg.vmstat = val; },
            isEnabled: function (cfg) { return cfg.vmstat; },
        }, (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: exports.POLL_INTERVAL_MS,
            unit: 'ms',
            set: function (cfg, val) { return cfg.vmstatPeriodMs = val; },
            get: function (cfg) { return cfg.vmstatPeriodMs; },
        }), (0, mithril_1.default)(record_widgets_3.Dropdown, {
            title: 'Select counters',
            cssClass: '.multicolumn',
            options: vmstatOpts,
            set: function (cfg, val) { return cfg.vmstatCounters = val; },
            get: function (cfg) { return cfg.vmstatCounters; },
        })));
    };
    return MemorySettings;
}());
exports.MemorySettings = MemorySettings;
var PowerSettings = /** @class */ (function () {
    function PowerSettings() {
    }
    PowerSettings.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var DOC_URL = 'https://perfetto.dev/docs/data-sources/battery-counters';
        var descr = [(0, mithril_1.default)('div', (0, mithril_1.default)('span', "Polls charge counters and instantaneous power draw from\n                    the battery power management IC and the power rails from\n                    the PowerStats HAL ("), (0, mithril_1.default)('a', { href: DOC_URL, target: '_blank' }, 'see docs for more'), (0, mithril_1.default)('span', ')'))];
        if (exports.globals.isInternalUser) {
            descr.push((0, mithril_1.default)('div', (0, mithril_1.default)('span', 'Googlers: See '), (0, mithril_1.default)('a', { href: 'http://go/power-rails-internal-doc', target: '_blank' }, 'this doc'), (0, mithril_1.default)('span', " for instructions on how to change the refault rail selection\n                  on internal devices.")));
        }
        return (0, mithril_1.default)(".record-section".concat(attrs.cssClass), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Battery drain & power rails',
            img: 'rec_battery_counters.png',
            descr: descr,
            setEnabled: function (cfg, val) { return cfg.batteryDrain = val; },
            isEnabled: function (cfg) { return cfg.batteryDrain; },
        }, (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Poll interval',
            cssClass: '.thin',
            values: exports.POLL_INTERVAL_MS,
            unit: 'ms',
            set: function (cfg, val) { return cfg.batteryDrainPollMs = val; },
            get: function (cfg) { return cfg.batteryDrainPollMs; },
        })), (0, mithril_1.default)(record_widgets_1.Probe, {
            title: 'Board voltages & frequencies',
            img: 'rec_board_voltage.png',
            descr: 'Tracks voltage and frequency changes from board sensors',
            setEnabled: function (cfg, val) { return cfg.boardSensors = val; },
            isEnabled: function (cfg) { return cfg.boardSensors; },
        }));
    };
    return PowerSettings;
}());
exports.PowerSettings = PowerSettings;
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
var immer_1 = require("immer");
var RecordingSettings = /** @class */ (function () {
    function RecordingSettings() {
    }
    RecordingSettings.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var S = function (x) { return x * 1000; };
        var M = function (x) { return x * 1000 * 60; };
        var H = function (x) { return x * 1000 * 60 * 60; };
        var cfg = exports.globals.state.recordConfig;
        var recButton = function (mode, title, img) {
            var checkboxArgs = {
                checked: cfg.mode === mode,
                onchange: function (e) {
                    var checked = e.target.checked;
                    if (!checked)
                        return;
                    var traceCfg = (0, immer_1.produce)(exports.globals.state.recordConfig, function (draft) {
                        draft.mode = mode;
                    });
                    exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: traceCfg }));
                },
            };
            return (0, mithril_1.default)("label".concat(cfg.mode === mode ? '.selected' : ''), (0, mithril_1.default)("input[type=radio][name=rec_mode]", checkboxArgs), (0, mithril_1.default)("img[src=".concat(exports.globals.root, "assets/").concat(img, "]")), (0, mithril_1.default)('span', title));
        };
        return (0, mithril_1.default)(".record-section".concat(attrs.cssClass), (0, mithril_1.default)('header', 'Recording mode'), (0, mithril_1.default)('.record-mode', recButton('STOP_WHEN_FULL', 'Stop when full', 'rec_one_shot.png'), recButton('RING_BUFFER', 'Ring buffer', 'rec_ring_buf.png'), recButton('LONG_TRACE', 'Long trace', 'rec_long_trace.png')), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'In-memory buffer size',
            icon: '360',
            values: [4, 8, 16, 32, 64, 128, 256, 512],
            unit: 'MB',
            set: function (cfg, val) { return cfg.bufferSizeMb = val; },
            get: function (cfg) { return cfg.bufferSizeMb; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Max duration',
            icon: 'timer',
            values: [S(10), S(15), S(30), S(60), M(5), M(30), H(1), H(6), H(12)],
            isTime: true,
            unit: 'h:m:s',
            set: function (cfg, val) { return cfg.durationMs = val; },
            get: function (cfg) { return cfg.durationMs; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Max file size',
            icon: 'save',
            cssClass: cfg.mode !== 'LONG_TRACE' ? '.hide' : '',
            values: [5, 25, 50, 100, 500, 1000, 1000 * 5, 1000 * 10],
            unit: 'MB',
            set: function (cfg, val) { return cfg.maxFileSizeMb = val; },
            get: function (cfg) { return cfg.maxFileSizeMb; },
        }), (0, mithril_1.default)(record_widgets_2.Slider, {
            title: 'Flush on disk every',
            cssClass: cfg.mode !== 'LONG_TRACE' ? '.hide' : '',
            icon: 'av_timer',
            values: [100, 250, 500, 1000, 2500, 5000],
            unit: 'ms',
            set: function (cfg, val) { return cfg.fileWritePeriodMs = val; },
            get: function (cfg) { return cfg.fileWritePeriodMs || 0; },
        }));
    };
    return RecordingSettings;
}());
exports.RecordingSettings = RecordingSettings;
var state_4 = require("../../common/state");
var record_widgets_5 = require("../record_widgets");
Object.defineProperty(exports, "CategoriesCheckboxList", { enumerable: true, get: function () { return record_widgets_5.CategoriesCheckboxList; } });
function extractChromeCategories(dataSources) {
    for (var _i = 0, dataSources_1 = dataSources; _i < dataSources_1.length; _i++) {
        var dataSource = dataSources_1[_i];
        if (dataSource.name === 'chromeCategories') {
            return dataSource.descriptor;
        }
    }
    return undefined;
}
var ChromeCategoriesSelection = /** @class */ (function () {
    function ChromeCategoriesSelection() {
    }
    ChromeCategoriesSelection.prototype.view = function (_a) {
        var attrs = _a.attrs;
        // If we are attempting to record via the Chrome extension, we receive the
        // list of actually supported categories via DevTools. Otherwise, we fall
        // back to an integrated list of categories from a recent version of Chrome.
        var categories = exports.globals.state.chromeCategories ||
            extractChromeCategories(attrs.dataSources);
        if (!categories || !(0, state_4.isChromeTarget)(exports.globals.state.recordingTarget)) {
            categories = (0, state_4.getBuiltinChromeCategoryList)();
        }
        var defaultCategories = new Map();
        var disabledByDefaultCategories = new Map();
        var disabledPrefix = 'disabled-by-default-';
        categories.forEach(function (cat) {
            if (cat.startsWith(disabledPrefix)) {
                disabledByDefaultCategories.set(cat, cat.replace(disabledPrefix, ''));
            }
            else {
                defaultCategories.set(cat, cat);
            }
        });
        return (0, mithril_1.default)('.chrome-categories', (0, mithril_1.default)(record_widgets_5.CategoriesCheckboxList, {
            categories: defaultCategories,
            title: 'Additional categories',
            get: function (cfg) { return cfg.chromeCategoriesSelected; },
            set: function (cfg, val) { return cfg.chromeCategoriesSelected = val; },
        }), (0, mithril_1.default)(record_widgets_5.CategoriesCheckboxList, {
            categories: disabledByDefaultCategories,
            title: 'High overhead categories',
            get: function (cfg) { return cfg.chromeHighOverheadCategoriesSelected; },
            set: function (cfg, val) { return cfg.chromeHighOverheadCategoriesSelected = val; },
        }));
    };
    return ChromeCategoriesSelection;
}());
var ChromeSettings = /** @class */ (function () {
    function ChromeSettings() {
    }
    ChromeSettings.prototype.view = function (_a) {
        var attrs = _a.attrs;
        return (0, mithril_1.default)(".record-section".concat(attrs.cssClass), (0, record_widgets_5.CompactProbe)({
            title: 'Task scheduling',
            setEnabled: function (cfg, val) { return cfg.taskScheduling = val; },
            isEnabled: function (cfg) { return cfg.taskScheduling; },
        }), (0, record_widgets_5.CompactProbe)({
            title: 'IPC flows',
            setEnabled: function (cfg, val) { return cfg.ipcFlows = val; },
            isEnabled: function (cfg) { return cfg.ipcFlows; },
        }), (0, record_widgets_5.CompactProbe)({
            title: 'Javascript execution',
            setEnabled: function (cfg, val) { return cfg.jsExecution = val; },
            isEnabled: function (cfg) { return cfg.jsExecution; },
        }), (0, record_widgets_5.CompactProbe)({
            title: 'Web content rendering, layout and compositing',
            setEnabled: function (cfg, val) { return cfg.webContentRendering = val; },
            isEnabled: function (cfg) { return cfg.webContentRendering; },
        }), (0, record_widgets_5.CompactProbe)({
            title: 'UI rendering & surface compositing',
            setEnabled: function (cfg, val) { return cfg.uiRendering = val; },
            isEnabled: function (cfg) { return cfg.uiRendering; },
        }), (0, record_widgets_5.CompactProbe)({
            title: 'Input events',
            setEnabled: function (cfg, val) { return cfg.inputEvents = val; },
            isEnabled: function (cfg) { return cfg.inputEvents; },
        }), (0, record_widgets_5.CompactProbe)({
            title: 'Navigation & Loading',
            setEnabled: function (cfg, val) { return cfg.navigationAndLoading = val; },
            isEnabled: function (cfg) { return cfg.navigationAndLoading; },
        }), (0, record_widgets_5.CompactProbe)({
            title: 'Chrome Logs',
            setEnabled: function (cfg, val) { return cfg.chromeLogs = val; },
            isEnabled: function (cfg) { return cfg.chromeLogs; },
        }), (0, mithril_1.default)(record_widgets_3.Toggle, {
            title: 'Remove untyped and sensitive data like URLs from the trace',
            descr: 'Not recommended unless you intend to share the trace' +
                ' with third-parties.',
            setEnabled: function (cfg, val) { return cfg.chromePrivacyFiltering = val; },
            isEnabled: function (cfg) { return cfg.chromePrivacyFiltering; },
        }), (0, mithril_1.default)(ChromeCategoriesSelection, attrs));
    };
    return ChromeSettings;
}());
exports.ChromeSettings = ChromeSettings;
test('time scale to work', function () {
    var scale = new time_scale_1.TimeScale(new time_3.TimeSpan(0, 100), [200, 1000]);
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
test('time scale to be updatable', function () {
    var scale = new time_scale_1.TimeScale(new time_3.TimeSpan(0, 100), [100, 1000]);
    expect(scale.timeToPx(0)).toEqual(100);
    scale.setLimitsPx(200, 1000);
    expect(scale.timeToPx(0)).toEqual(200);
    expect(scale.timeToPx(100)).toEqual(1000);
    scale.setTimeBounds(new time_3.TimeSpan(0, 200));
    expect(scale.timeToPx(0)).toEqual(200);
    expect(scale.timeToPx(100)).toEqual(600);
    expect(scale.timeToPx(200)).toEqual(1000);
});
test('it zooms', function () {
    var span = new time_3.TimeSpan(0, 20);
    var scale = new time_scale_1.TimeScale(span, [0, 100]);
    var newSpan = (0, time_scale_2.computeZoom)(scale, span, 0.5, 50);
    expect(newSpan.start).toEqual(5);
    expect(newSpan.end).toEqual(15);
});
test('it zooms an offset scale and span', function () {
    var span = new time_3.TimeSpan(1000, 1020);
    var scale = new time_scale_1.TimeScale(span, [200, 300]);
    var newSpan = (0, time_scale_2.computeZoom)(scale, span, 0.5, 250);
    expect(newSpan.start).toEqual(1005);
    expect(newSpan.end).toEqual(1015);
});
test('it clamps zoom in', function () {
    var span = new time_3.TimeSpan(1000, 1040);
    var scale = new time_scale_1.TimeScale(span, [200, 300]);
    var newSpan = (0, time_scale_2.computeZoom)(scale, span, 0.0000000001, 225);
    expect((newSpan.end - newSpan.start) / 2 + newSpan.start).toBeCloseTo(1010);
    expect(newSpan.end - newSpan.start).toBeCloseTo(1e-8);
});
var mockComponent = {
    view: function () { },
};
beforeEach(function () {
    window.location.hash = '';
});
test('Default route must be defined', function () {
    expect(function () { return new router_1.Router({ '/a': mockComponent }); }).toThrow();
});
test('Resolves empty route to default component', function () {
    var router = new router_1.Router({ '/': mockComponent });
    window.location.hash = '';
    expect(router.resolve().tag).toBe(mockComponent);
});
test('Resolves subpage route to component of main page', function () {
    var nonDefaultComponent = { view: function () { } };
    var router = new router_1.Router({
        '/': mockComponent,
        '/a': nonDefaultComponent,
    });
    window.location.hash = '#!/a/subpage';
    expect(router.resolve().tag).toBe(nonDefaultComponent);
    expect(router.resolve().attrs.subpage).toBe('/subpage');
});
test('Pass empty subpage if not found in URL', function () {
    var nonDefaultComponent = { view: function () { } };
    var router = new router_1.Router({
        '/': mockComponent,
        '/a': nonDefaultComponent,
    });
    window.location.hash = '#!/a';
    expect(router.resolve().tag).toBe(nonDefaultComponent);
    expect(router.resolve().attrs.subpage).toBe('');
});
test('Args parsing', function () {
    var url = 'http://localhost/#!/foo?p=123&s=42&url=a?b?c';
    var args = router_1.Router.parseUrl(url).args;
    expect(args.p).toBe('123');
    expect(args.s).toBe('42');
    expect(args.url).toBe('a?b?c');
});
test('empty route broken into empty components', function () {
    var _a = router_1.Router.parseFragment(''), page = _a.page, subpage = _a.subpage, args = _a.args;
    expect(page).toBe('');
    expect(subpage).toBe('');
    expect(args).toEqual({});
});
test('invalid route broken into empty components', function () {
    var _a = router_1.Router.parseFragment('/bla'), page = _a.page, subpage = _a.subpage, args = _a.args;
    expect(page).toBe('');
    expect(subpage).toBe('');
    expect(args).toEqual({});
});
test('simple route has page defined', function () {
    var _a = router_1.Router.parseFragment('#!/record'), page = _a.page, subpage = _a.subpage, args = _a.args;
    expect(page).toBe('/record');
    expect(subpage).toBe('');
    expect(args).toEqual({});
});
test('simple route has both components defined', function () {
    var _a = router_1.Router.parseFragment('#!/record/memory'), page = _a.page, subpage = _a.subpage, args = _a.args;
    expect(page).toBe('/record');
    expect(subpage).toBe('/memory');
    expect(args).toEqual({});
});
test('route broken at first slash', function () {
    var _a = router_1.Router.parseFragment('#!/record/memory/stuff'), page = _a.page, subpage = _a.subpage, args = _a.args;
    expect(page).toBe('/record');
    expect(subpage).toBe('/memory/stuff');
    expect(args).toEqual({});
});
test('parameters separated from route', function () {
    var _a = router_1.Router.parseFragment('#!/record/memory?url=http://localhost:1234/aaaa'), page = _a.page, subpage = _a.subpage, args = _a.args;
    expect(page).toBe('/record');
    expect(subpage).toBe('/memory');
    expect(args).toEqual({ url: 'http://localhost:1234/aaaa' });
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
var registry_1 = require("../common/registry");
/**
 * Global registry that maps types to TrackCreator.
 */
exports.trackRegistry = registry_1.Registry.kindRegistry();
var schema_1 = require("../common/schema");
function registerDebugGlobals() {
    window.getSchema = schema_1.getSchema;
    window.m = mithril_1.default;
    window.globals = exports.globals;
    window.Actions = actions_1.Actions;
}
exports.registerDebugGlobals = registerDebugGlobals;
var icons_3 = require("./icons");
var track_panel_2 = require("./track_panel");
Object.defineProperty(exports, "TrackContent", { enumerable: true, get: function () { return track_panel_2.TrackContent; } });
var TrackGroupPanel = /** @class */ (function (_super) {
    __extends(TrackGroupPanel, _super);
    function TrackGroupPanel(_a) {
        var attrs = _a.attrs;
        var _this = _super.call(this) || this;
        _this.shellWidth = 0;
        _this.backgroundColor = '#ffffff'; // Updated from CSS later.
        _this.trackGroupId = attrs.trackGroupId;
        var trackCreator = exports.trackRegistry.get(_this.summaryTrackState.kind);
        var engineId = _this.summaryTrackState.engineId;
        var engine = exports.globals.engines.get(engineId);
        if (engine !== undefined) {
            _this.summaryTrack =
                trackCreator.create({ trackId: _this.summaryTrackState.id, engine: engine });
        }
        return _this;
    }
    Object.defineProperty(TrackGroupPanel.prototype, "trackGroupState", {
        get: function () {
            return (0, logging_2.assertExists)(exports.globals.state.trackGroups[this.trackGroupId]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrackGroupPanel.prototype, "summaryTrackState", {
        get: function () {
            return (0, logging_2.assertExists)(exports.globals.state.tracks[this.trackGroupState.tracks[0]]);
        },
        enumerable: false,
        configurable: true
    });
    TrackGroupPanel.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var collapsed = this.trackGroupState.collapsed;
        var name = this.trackGroupState.name;
        if (name[0] === '/') {
            name = StripPathFromExecutable(name);
        }
        // The shell should be highlighted if the current search result is inside
        // this track group.
        var highlightClass = '';
        var searchIndex = exports.globals.state.searchIndex;
        if (searchIndex !== -1) {
            var trackId = exports.globals.currentSearchResults.trackIds[searchIndex];
            var parentTrackId = (0, state_3.getContainingTrackId)(exports.globals.state, trackId);
            if (parentTrackId === attrs.trackGroupId) {
                highlightClass = 'flash';
            }
        }
        var selection = exports.globals.state.currentSelection;
        var trackGroup = exports.globals.state.trackGroups[attrs.trackGroupId];
        var checkBox = exports.BLANK_CHECKBOX;
        if (selection !== null && selection.kind === 'AREA') {
            var selectedArea_1 = exports.globals.state.areas[selection.areaId];
            if (selectedArea_1.tracks.includes(attrs.trackGroupId) &&
                trackGroup.tracks.every(function (id) { return selectedArea_1.tracks.includes(id); })) {
                checkBox = exports.CHECKBOX;
            }
            else if (selectedArea_1.tracks.includes(attrs.trackGroupId) ||
                trackGroup.tracks.some(function (id) { return selectedArea_1.tracks.includes(id); })) {
                checkBox = exports.INDETERMINATE_CHECKBOX;
            }
        }
        var child = null;
        if (this.summaryTrackState.labels &&
            this.summaryTrackState.labels.length > 0) {
            child = this.summaryTrackState.labels.join(', ');
        }
        return (0, mithril_1.default)(".track-group-panel[collapsed=".concat(collapsed, "]"), { id: 'track_' + this.trackGroupId }, (0, mithril_1.default)(".shell", {
            onclick: function (e) {
                exports.globals.dispatch(actions_1.Actions.toggleTrackGroupCollapsed({
                    trackGroupId: attrs.trackGroupId,
                })),
                    e.stopPropagation();
            },
            class: "".concat(highlightClass),
        }, (0, mithril_1.default)('.fold-button', (0, mithril_1.default)('i.material-icons', this.trackGroupState.collapsed ? exports.EXPAND_DOWN : exports.EXPAND_UP)), (0, mithril_1.default)('.title-wrapper', (0, mithril_1.default)('h1.track-title', { title: name }, name, ('namespace' in this.summaryTrackState.config) &&
            (0, mithril_1.default)('span.chip', 'metric')), (this.trackGroupState.collapsed && child !== null) ?
            (0, mithril_1.default)('h2.track-subtitle', child) :
            null), selection && selection.kind === 'AREA' ?
            (0, mithril_1.default)('i.material-icons.track-button', {
                onclick: function (e) {
                    exports.globals.dispatch(actions_1.Actions.toggleTrackSelection({ id: attrs.trackGroupId, isTrackGroup: true }));
                    e.stopPropagation();
                },
            }, checkBox) :
            ''), this.summaryTrack ?
            (0, mithril_1.default)(track_panel_2.TrackContent, { track: this.summaryTrack }, (!this.trackGroupState.collapsed && child !== null) ?
                (0, mithril_1.default)('span', child) :
                null) :
            null);
    };
    TrackGroupPanel.prototype.oncreate = function (vnode) {
        this.onupdate(vnode);
    };
    TrackGroupPanel.prototype.onupdate = function (_a) {
        var dom = _a.dom;
        var shell = (0, logging_2.assertExists)(dom.querySelector('.shell'));
        this.shellWidth = shell.getBoundingClientRect().width;
        // TODO(andrewbb): move this to css_constants
        if (this.trackGroupState.collapsed) {
            this.backgroundColor =
                getComputedStyle(dom).getPropertyValue('--collapsed-background');
        }
        else {
            this.backgroundColor =
                getComputedStyle(dom).getPropertyValue('--expanded-background');
        }
        if (this.summaryTrack !== undefined) {
            this.summaryTrack.onFullRedraw();
        }
    };
    TrackGroupPanel.prototype.onremove = function () {
        if (this.summaryTrack !== undefined) {
            this.summaryTrack.onDestroy();
            this.summaryTrack = undefined;
        }
    };
    TrackGroupPanel.prototype.highlightIfTrackSelected = function (ctx, size) {
        var localState = exports.globals.frontendLocalState;
        var selection = exports.globals.state.currentSelection;
        if (!selection || selection.kind !== 'AREA')
            return;
        var selectedArea = exports.globals.state.areas[selection.areaId];
        if (selectedArea.tracks.includes(this.trackGroupId)) {
            ctx.fillStyle = 'rgba(131, 152, 230, 0.3)';
            ctx.fillRect(localState.timeScale.timeToPx(selectedArea.startSec) +
                this.shellWidth, 0, localState.timeScale.deltaTimeToPx(selectedArea.endSec - selectedArea.startSec), size.height);
        }
    };
    TrackGroupPanel.prototype.renderCanvas = function (ctx, size) {
        var collapsed = this.trackGroupState.collapsed;
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, size.width, size.height);
        if (!collapsed)
            return;
        this.highlightIfTrackSelected(ctx, size);
        (0, gridline_helper_3.drawGridLines)(ctx, size.width, size.height);
        ctx.save();
        ctx.translate(this.shellWidth, 0);
        if (this.summaryTrack) {
            this.summaryTrack.render(ctx);
        }
        ctx.restore();
        this.highlightIfTrackSelected(ctx, size);
        var localState = exports.globals.frontendLocalState;
        // Draw vertical line when hovering on the notes panel.
        if (exports.globals.state.hoveredNoteTimestamp !== -1) {
            (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.state.hoveredNoteTimestamp, size.height, "#aaa");
        }
        if (exports.globals.state.hoverCursorTimestamp !== -1) {
            (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.state.hoverCursorTimestamp, size.height, "#344596");
        }
        if (exports.globals.state.currentSelection !== null) {
            if (exports.globals.state.currentSelection.kind === 'SLICE' &&
                exports.globals.sliceDetails.wakeupTs !== undefined) {
                (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.sliceDetails.wakeupTs, size.height, "black");
            }
        }
        // All marked areas should have semi-transparent vertical lines
        // marking the start and end.
        for (var _i = 0, _a = Object.values(exports.globals.state.notes); _i < _a.length; _i++) {
            var note = _a[_i];
            if (note.noteType === 'AREA') {
                var transparentNoteColor = 'rgba(' + color_convert_1.hex.rgb(note.color.substr(1)).toString() + ', 0.65)';
                (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.state.areas[note.areaId].startSec, size.height, transparentNoteColor, 1);
                (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, exports.globals.state.areas[note.areaId].endSec, size.height, transparentNoteColor, 1);
            }
            else if (note.noteType === 'DEFAULT') {
                (0, vertical_line_helper_1.drawVerticalLineAtTime)(ctx, localState.timeScale, note.timestamp, size.height, note.color);
            }
        }
    };
    return TrackGroupPanel;
}(panel_1.Panel));
exports.TrackGroupPanel = TrackGroupPanel;
function StripPathFromExecutable(path) {
    return path.split('/').slice(-1)[0];
}
// This is used to display the summary of search results.
var TickmarkPanel = /** @class */ (function (_super) {
    __extends(TickmarkPanel, _super);
    function TickmarkPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TickmarkPanel.prototype.view = function () {
        return (0, mithril_1.default)('.tickbar');
    };
    TickmarkPanel.prototype.renderCanvas = function (ctx, size) {
        var _a = exports.globals.frontendLocalState, timeScale = _a.timeScale, visibleWindowTime = _a.visibleWindowTime;
        ctx.fillStyle = '#999';
        ctx.fillRect(exports.TRACK_SHELL_WIDTH - 2, 0, 2, size.height);
        var relScale = (0, gridline_helper_2.timeScaleForVisibleWindow)(exports.TRACK_SHELL_WIDTH, size.width);
        if (relScale.timeSpan.duration > 0 && relScale.widthPx > 0) {
            for (var _i = 0, _b = new gridline_helper_1.TickGenerator(relScale); _i < _b.length; _i++) {
                var _c = _b[_i], type = _c.type, position = _c.position;
                if (type === gridline_helper_1.TickType.MAJOR)
                    ctx.fillRect(position, 0, 1, size.height);
            }
        }
        var data = exports.globals.searchSummary;
        for (var i = 0; i < data.tsStarts.length; i++) {
            var tStart = data.tsStarts[i];
            var tEnd = data.tsEnds[i];
            if (tEnd <= visibleWindowTime.start || tStart >= visibleWindowTime.end) {
                continue;
            }
            var rectStart = Math.max(timeScale.timeToPx(tStart), 0) + exports.TRACK_SHELL_WIDTH;
            var rectEnd = timeScale.timeToPx(tEnd) + exports.TRACK_SHELL_WIDTH;
            ctx.fillStyle = '#ffe263';
            ctx.fillRect(Math.floor(rectStart), 0, Math.ceil(rectEnd - rectStart), size.height);
        }
        var index = exports.globals.state.searchIndex;
        var startSec = (0, time_4.fromNs)(exports.globals.currentSearchResults.tsStarts[index]);
        var triangleStart = Math.max(timeScale.timeToPx(startSec), 0) + exports.TRACK_SHELL_WIDTH;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(triangleStart, size.height);
        ctx.lineTo(triangleStart - 3, 0);
        ctx.lineTo(triangleStart + 3, 0);
        ctx.lineTo(triangleStart, size.height);
        ctx.fill();
        ctx.closePath();
    };
    return TickmarkPanel;
}(panel_1.Panel));
exports.TickmarkPanel = TickmarkPanel;
// To display process or thread, we want to concatenate their name with ID, but
// either can be undefined and all the cases need to be considered carefully to
// avoid `undefined undefined` showing up in the UI. This function does such
// concatenation.
//
// Result can be undefined if both name and process are, in this case result is
// not going to be displayed in the UI.
function getDisplayName(name, id) {
    if (name === undefined) {
        return id === undefined ? undefined : "".concat(id);
    }
    else {
        return id === undefined ? name : "".concat(name, " ").concat(id);
    }
}
var SlicePanel = /** @class */ (function (_super) {
    __extends(SlicePanel, _super);
    function SlicePanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlicePanel.prototype.computeDuration = function (ts, dur) {
        return (0, time_4.toNs)(dur) === -1 ?
            "".concat(exports.globals.state.traceTime.endSec - ts, " (Did not end)") :
            (0, time_1.timeToCode)(dur);
    };
    SlicePanel.prototype.getProcessThreadDetails = function (sliceInfo) {
        return new Map([
            ['Thread', getDisplayName(sliceInfo.threadName, sliceInfo.tid)],
            ['Process', getDisplayName(sliceInfo.processName, sliceInfo.pid)],
            ['User ID', sliceInfo.uid ? String(sliceInfo.uid) : undefined],
            ['Package name', sliceInfo.packageName],
            [
                'Version code',
                sliceInfo.versionCode ? String(sliceInfo.versionCode) : undefined,
            ],
        ]);
    };
    return SlicePanel;
}(panel_1.Panel));
exports.SlicePanel = SlicePanel;
var query_result_1 = require("../common/query_result");
var sql_utils_1 = require("./sql_utils");
function getProcessInfo(engine, upid) {
    return __awaiter(this, void 0, Promise, function () {
        var it, result, packageResult, packageDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, engine.query("\n              SELECT pid, name, uid FROM process WHERE upid = ".concat(upid, ";\n            "))];
                case 1:
                    it = (_a.sent()).iter({ pid: query_result_1.NUM, name: query_result_1.STR_NULL, uid: query_result_1.NUM_NULL });
                    if (!it.valid()) {
                        return [2 /*return*/, { upid: upid }];
                    }
                    result = {
                        upid: upid,
                        pid: it.pid,
                        name: it.name || undefined,
                    };
                    if (it.pid === null) {
                        return [2 /*return*/, result];
                    }
                    result.pid = it.pid || undefined;
                    if (it.uid === undefined) {
                        return [2 /*return*/, result];
                    }
                    return [4 /*yield*/, engine.query("\n                SELECT\n                  package_name as packageName,\n                  version_code as versionCode\n                FROM package_list WHERE uid = ".concat(it.uid, ";\n              "))];
                case 2:
                    packageResult = _a.sent();
                    // The package_list table is not populated in some traces so we need to
                    // check if the result has returned any rows.
                    if (packageResult.numRows() > 0) {
                        packageDetails = packageResult.firstRow({
                            packageName: query_result_1.STR,
                            versionCode: query_result_1.NUM,
                        });
                        result.packageName = packageDetails.packageName;
                        result.versionCode = packageDetails.versionCode || undefined;
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
function getDisplayName(name, id) {
    if (name === undefined) {
        return id === undefined ? undefined : "".concat(id);
    }
    return id === undefined ? name : "".concat(name, " [").concat(id, "]");
}
function getProcessName(info) {
    return getDisplayName(info === null || info === void 0 ? void 0 : info.name, info === null || info === void 0 ? void 0 : info.pid);
}
exports.getProcessName = getProcessName;
function getThreadInfo(engine, utid) {
    return __awaiter(this, void 0, Promise, function () {
        var it, upid, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, engine.query("\n        SELECT tid, name, upid\n        FROM thread\n        WHERE utid = ".concat(utid, ";\n    "))];
                case 1:
                    it = (_c.sent()).iter({ tid: query_result_1.NUM, name: query_result_1.STR_NULL, upid: query_result_1.NUM_NULL });
                    if (!it.valid()) {
                        return [2 /*return*/, {
                                utid: utid,
                            }];
                    }
                    upid = (0, sql_utils_1.fromNumNull)(it.upid);
                    _b = {
                        utid: utid,
                        tid: it.tid,
                        name: it.name || undefined
                    };
                    if (!upid) return [3 /*break*/, 3];
                    return [4 /*yield*/, getProcessInfo(engine, upid)];
                case 2:
                    _a = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = undefined;
                    _c.label = 4;
                case 4: return [2 /*return*/, (_b.process = _a,
                        _b)];
            }
        });
    });
}
exports.getThreadInfo = getThreadInfo;
function getThreadName(info) {
    return getDisplayName(info === null || info === void 0 ? void 0 : info.name, info === null || info === void 0 ? void 0 : info.tid);
}
exports.getThreadName = getThreadName;
var query_result_2 = require("../common/query_result");
var sql_types_1 = require("./sql_types");
var sql_utils_2 = require("./sql_utils");
var thread_and_process_info_1 = require("./thread_and_process_info");
var value_2 = require("./value");
// Gets a list of thread state objects from Trace Processor with given
// constraints.
function getThreadStateFromConstraints(engine, constraints) {
    return __awaiter(this, void 0, Promise, function () {
        var query, it, result, ioWait, wakerUtid, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, engine.query("\n    SELECT\n      thread_state.id as threadStateSqlId,\n      (select sched.id\n        from sched\n        where sched.ts=thread_state.ts and sched.utid=thread_state.utid\n        limit 1\n       ) as schedSqlId,\n      ts,\n      thread_state.dur as dur,\n      thread_state.cpu as cpu,\n      state,\n      thread_state.blocked_function as blockedFunction,\n      io_wait as ioWait,\n      thread_state.utid as utid,\n      waker_utid as wakerUtid\n    FROM thread_state\n    ".concat((0, sql_utils_2.constraintsToQueryFragment)(constraints)))];
                case 1:
                    query = _e.sent();
                    it = query.iter({
                        threadStateSqlId: query_result_1.NUM,
                        schedSqlId: query_result_1.NUM_NULL,
                        ts: query_result_2.LONG,
                        dur: query_result_1.NUM,
                        cpu: query_result_1.NUM_NULL,
                        state: query_result_1.STR_NULL,
                        blockedFunction: query_result_1.STR_NULL,
                        ioWait: query_result_1.NUM_NULL,
                        utid: query_result_1.NUM,
                        wakerUtid: query_result_1.NUM_NULL,
                    });
                    result = [];
                    _e.label = 2;
                case 2:
                    if (!it.valid()) return [3 /*break*/, 8];
                    ioWait = it.ioWait === null ? undefined : it.ioWait > 0;
                    wakerUtid = (0, sql_types_1.asUtid)(it.wakerUtid || undefined);
                    // TODO(altimin): Consider fetcing thread / process info using a single
                    // query instead of one per row.
                    _b = (_a = result).push;
                    _d = {
                        threadStateSqlId: it.threadStateSqlId,
                        schedSqlId: (0, sql_utils_1.fromNumNull)(it.schedSqlId),
                        ts: (0, sql_types_1.timestampFromNanos)(it.ts),
                        dur: it.dur,
                        cpu: (0, sql_utils_1.fromNumNull)(it.cpu),
                        state: (0, thread_state_1.translateState)(it.state || undefined, ioWait),
                        blockedFunction: it.blockedFunction || undefined
                    };
                    return [4 /*yield*/, (0, thread_and_process_info_1.getThreadInfo)(engine, (0, sql_types_1.asUtid)(it.utid))];
                case 3:
                    _d.thread = _e.sent();
                    if (!wakerUtid) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, thread_and_process_info_1.getThreadInfo)(engine, wakerUtid)];
                case 4:
                    _c = _e.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _c = undefined;
                    _e.label = 6;
                case 6:
                    // TODO(altimin): Consider fetcing thread / process info using a single
                    // query instead of one per row.
                    _b.apply(_a, [(_d.wakerThread = _c,
                            _d)]);
                    _e.label = 7;
                case 7:
                    it.next();
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/, result];
            }
        });
    });
}
exports.getThreadStateFromConstraints = getThreadStateFromConstraints;
function getThreadState(engine, id) {
    return __awaiter(this, void 0, Promise, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getThreadStateFromConstraints(engine, {
                        filters: ["id=".concat(id)],
                    })];
                case 1:
                    result = _a.sent();
                    if (result.length > 1) {
                        throw new Error("thread_state table has more than one row with id ".concat(id));
                    }
                    if (result.length === 0) {
                        return [2 /*return*/, undefined];
                    }
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.getThreadState = getThreadState;
function goToSchedSlice(cpu, id, ts) {
    var trackId;
    for (var _i = 0, _a = Object.values(exports.globals.state.tracks); _i < _a.length; _i++) {
        var track = _a[_i];
        if (track.kind === 'CpuSliceTrack' &&
            track.config.cpu === cpu) {
            trackId = track.id;
        }
    }
    if (trackId === undefined) {
        return;
    }
    exports.globals.makeSelection(actions_1.Actions.selectSlice({ id: id, trackId: trackId }));
    // TODO(stevegolton): scrollToTrackAndTs() should take a TPTimestamp
    (0, scroll_helper_2.scrollToTrackAndTs)(trackId, Number(ts));
}
exports.goToSchedSlice = goToSchedSlice;
function stateToValue(state, cpu, id, ts) {
    if (!state) {
        return null;
    }
    if (id === undefined || cpu === undefined) {
        return (0, value_2.value)(state);
    }
    return (0, value_2.value)("".concat(state, " on CPU ").concat(cpu), {
        rightButton: {
            action: function () {
                goToSchedSlice(cpu, id, ts);
            },
            hoverText: 'Go to CPU slice',
        },
    });
}
function threadStateToDict(state) {
    var _a;
    var result = {};
    result['Start time'] = (0, value_2.value)((0, time_1.timeToCode)((0, sql_types_1.toTraceTime)(state.ts)));
    result['Duration'] = (0, value_2.value)((0, time_1.timeToCode)((0, time_4.fromNs)(state.dur)));
    result['State'] =
        stateToValue(state.state, state.cpu, state.schedSqlId, state.ts);
    result['Blocked function'] = (0, value_2.maybeValue)(state.blockedFunction);
    var process = (_a = state === null || state === void 0 ? void 0 : state.thread) === null || _a === void 0 ? void 0 : _a.process;
    result['Process'] = (0, value_2.maybeValue)(process ? (0, thread_and_process_info_1.getProcessName)(process) : undefined);
    var thread = state === null || state === void 0 ? void 0 : state.thread;
    result['Thread'] = (0, value_2.maybeValue)(thread ? (0, thread_and_process_info_1.getThreadName)(thread) : undefined);
    if (state.wakerThread) {
        var process_1 = state.wakerThread.process;
        result['Waker'] = (0, value_2.dict)({
            'Process': (0, value_2.maybeValue)(process_1 ? (0, thread_and_process_info_1.getProcessName)(process_1) : undefined),
            'Thread': (0, value_2.maybeValue)((0, thread_and_process_info_1.getThreadName)(state.wakerThread)),
        });
    }
    result['SQL id'] = (0, value_2.value)("thread_state[".concat(state.threadStateSqlId, "]"), {
        contextMenu: [
            (0, popup_menu_1.menuItem)('Copy SQL query', function () {
                (0, clipboard_1.copyToClipboard)("select * from thread_state where id=".concat(state.threadStateSqlId));
            }),
        ],
    });
    return (0, value_2.dict)(result);
}
exports.threadStateToDict = threadStateToDict;
var logging_4 = require("../base/logging");
var css_constants_6 = require("./css_constants");
var flow_events_renderer_1 = require("./flow_events_renderer");
Object.defineProperty(exports, "FlowEventsRenderer", { enumerable: true, get: function () { return flow_events_renderer_1.FlowEventsRenderer; } });
Object.defineProperty(exports, "FlowEventsRendererArgs", { enumerable: true, get: function () { return flow_events_renderer_1.FlowEventsRendererArgs; } });
var panel_2 = require("./panel");
var perf_2 = require("./perf");
// If the panel container scrolls, the backing canvas height is
// SCROLLING_CANVAS_OVERDRAW_FACTOR * parent container height.
var SCROLLING_CANVAS_OVERDRAW_FACTOR = 1.2;
var PanelContainer = /** @class */ (function () {
    function PanelContainer(vnode) {
        var _this = this;
        // These values are updated with proper values in oncreate.
        this.parentWidth = 0;
        this.parentHeight = 0;
        this.scrollTop = 0;
        this.panelInfos = [];
        this.panelContainerTop = 0;
        this.panelContainerHeight = 0;
        this.panelByKey = new Map();
        this.totalPanelHeight = 0;
        this.canvasHeight = 0;
        this.panelPerfStats = new WeakMap();
        this.perfStats = {
            totalPanels: 0,
            panelsOnCanvas: 0,
            renderStats: new perf_1.RunningStatistics(10),
        };
        this.onResize = function () { };
        this.parentOnScroll = function () { };
        this.attrs = vnode.attrs;
        this.canvasRedrawer = function () { return _this.redrawCanvas(); };
        exports.globals.rafScheduler.addRedrawCallback(this.canvasRedrawer);
        exports.perfDisplay.addContainer(this);
        this.flowEventsRenderer = new flow_events_renderer_1.FlowEventsRenderer();
    }
    Object.defineProperty(PanelContainer.prototype, "canvasOverdrawFactor", {
        get: function () {
            return this.attrs.doesScroll ? SCROLLING_CANVAS_OVERDRAW_FACTOR : 1;
        },
        enumerable: false,
        configurable: true
    });
    PanelContainer.prototype.getPanelsInRegion = function (startX, endX, startY, endY) {
        var minX = Math.min(startX, endX);
        var maxX = Math.max(startX, endX);
        var minY = Math.min(startY, endY);
        var maxY = Math.max(startY, endY);
        var panels = [];
        for (var i = 0; i < this.panelInfos.length; i++) {
            var pos = this.panelInfos[i];
            var realPosX = pos.x - exports.TRACK_SHELL_WIDTH;
            if (realPosX + pos.width >= minX && realPosX <= maxX &&
                pos.y + pos.height >= minY && pos.y <= maxY &&
                pos.vnode.attrs.selectable) {
                panels.push(pos.vnode);
            }
        }
        return panels;
    };
    // This finds the tracks covered by the in-progress area selection. When
    // editing areaY is not set, so this will not be used.
    PanelContainer.prototype.handleAreaSelection = function () {
        var area = exports.globals.frontendLocalState.selectedArea;
        if (area === undefined ||
            exports.globals.frontendLocalState.areaY.start === undefined ||
            exports.globals.frontendLocalState.areaY.end === undefined ||
            this.panelInfos.length === 0) {
            return;
        }
        // Only get panels from the current panel container if the selection began
        // in this container.
        var panelContainerTop = this.panelInfos[0].y;
        var panelContainerBottom = this.panelInfos[this.panelInfos.length - 1].y +
            this.panelInfos[this.panelInfos.length - 1].height;
        if (exports.globals.frontendLocalState.areaY.start + exports.TOPBAR_HEIGHT <
            panelContainerTop ||
            exports.globals.frontendLocalState.areaY.start + exports.TOPBAR_HEIGHT >
                panelContainerBottom) {
            return;
        }
        // The Y value is given from the top of the pan and zoom region, we want it
        // from the top of the panel container. The parent offset corrects that.
        var panels = this.getPanelsInRegion(exports.globals.frontendLocalState.timeScale.timeToPx(area.startSec), exports.globals.frontendLocalState.timeScale.timeToPx(area.endSec), exports.globals.frontendLocalState.areaY.start + exports.TOPBAR_HEIGHT, exports.globals.frontendLocalState.areaY.end + exports.TOPBAR_HEIGHT);
        // Get the track ids from the panels.
        var tracks = [];
        for (var _i = 0, panels_1 = panels; _i < panels_1.length; _i++) {
            var panel = panels_1[_i];
            if (panel.attrs.id !== undefined) {
                tracks.push(panel.attrs.id);
                continue;
            }
            if (panel.attrs.trackGroupId !== undefined) {
                var trackGroup = exports.globals.state.trackGroups[panel.attrs.trackGroupId];
                // Only select a track group and all child tracks if it is closed.
                if (trackGroup.collapsed) {
                    tracks.push(panel.attrs.trackGroupId);
                    for (var _a = 0, _b = trackGroup.tracks; _a < _b.length; _a++) {
                        var track = _b[_a];
                        tracks.push(track);
                    }
                }
            }
        }
        exports.globals.frontendLocalState.selectArea(area.startSec, area.endSec, tracks);
    };
    PanelContainer.prototype.oncreate = function (vnodeDom) {
        var _this = this;
        // Save the canvas context in the state.
        var canvas = vnodeDom.dom.querySelector('.main-canvas');
        var ctx = canvas.getContext('2d');
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
        this.onResize = function () {
            _this.readParentSizeFromDom(vnodeDom.dom);
            _this.updateCanvasDimensions();
            _this.repositionCanvas();
            exports.globals.rafScheduler.scheduleFullRedraw();
        };
        // Once ResizeObservers are out, we can stop accessing the window here.
        window.addEventListener('resize', this.onResize);
        // TODO(dproy): Handle change in doesScroll attribute.
        if (this.attrs.doesScroll) {
            this.parentOnScroll = function () {
                _this.scrollTop = (0, logging_2.assertExists)(vnodeDom.dom.parentElement).scrollTop;
                _this.repositionCanvas();
                exports.globals.rafScheduler.scheduleRedraw();
            };
            vnodeDom.dom.parentElement.addEventListener('scroll', this.parentOnScroll, { passive: true });
        }
    };
    PanelContainer.prototype.onremove = function (_a) {
        var attrs = _a.attrs, dom = _a.dom;
        window.removeEventListener('resize', this.onResize);
        exports.globals.rafScheduler.removeRedrawCallback(this.canvasRedrawer);
        if (attrs.doesScroll) {
            dom.parentElement.removeEventListener('scroll', this.parentOnScroll);
        }
        exports.perfDisplay.removeContainer(this);
    };
    PanelContainer.prototype.isTrackGroupAttrs = function (attrs) {
        return attrs.collapsed !== undefined;
    };
    PanelContainer.prototype.renderPanel = function (node, key, extraClass) {
        if (extraClass === void 0) { extraClass = ''; }
        (0, logging_4.assertFalse)(this.panelByKey.has(key));
        this.panelByKey.set(key, node);
        return (0, mithril_1.default)(".panel".concat(extraClass), { key: key, 'data-key': key }, (0, exports.perfDebug)() ?
            [node, (0, mithril_1.default)('.debug-panel-border', { key: 'debug-panel-border' })] :
            node);
    };
    // Render a tree of panels into one vnode. Argument `path` is used to build
    // `key` attribute for intermediate tree vnodes: otherwise Mithril internals
    // will complain about keyed and non-keyed vnodes mixed together.
    PanelContainer.prototype.renderTree = function (node, path) {
        var _this = this;
        if (this.isTrackGroupAttrs(node.attrs)) {
            return mithril_1.default.apply(void 0, __spreadArray(['div',
                { key: path },
                this.renderPanel(node.attrs.header, "".concat(path, "-header"), node.attrs.collapsed ? '' : '.sticky')], node.attrs.childTracks.map(function (child, index) { return _this.renderTree(child, "".concat(path, "-").concat(index)); }), false));
        }
        return this.renderPanel(node, (0, logging_2.assertExists)(node.key));
    };
    PanelContainer.prototype.view = function (_a) {
        var _this = this;
        var attrs = _a.attrs;
        this.attrs = attrs;
        this.panelByKey.clear();
        var children = attrs.panels.map(function (panel, index) { return _this.renderTree(panel, "track-tree-".concat(index)); });
        return [
            (0, mithril_1.default)('.scroll-limiter', (0, mithril_1.default)('canvas.main-canvas')),
            (0, mithril_1.default)('.panels', children),
        ];
    };
    PanelContainer.prototype.onupdate = function (vnodeDom) {
        var totalPanelHeightChanged = this.readPanelHeightsFromDom(vnodeDom.dom);
        var parentSizeChanged = this.readParentSizeFromDom(vnodeDom.dom);
        var canvasSizeShouldChange = parentSizeChanged || !this.attrs.doesScroll && totalPanelHeightChanged;
        if (canvasSizeShouldChange) {
            this.updateCanvasDimensions();
            this.repositionCanvas();
            if (this.attrs.kind === 'TRACKS') {
                exports.globals.frontendLocalState.updateLocalLimits(0, this.parentWidth - exports.TRACK_SHELL_WIDTH);
            }
            this.redrawCanvas();
        }
    };
    PanelContainer.prototype.updateCanvasDimensions = function () {
        this.canvasHeight = Math.floor(this.attrs.doesScroll ? this.parentHeight * this.canvasOverdrawFactor :
            this.totalPanelHeight);
        var ctx = (0, logging_2.assertExists)(this.ctx);
        var canvas = (0, logging_2.assertExists)(ctx.canvas);
        canvas.style.height = "".concat(this.canvasHeight, "px");
        // If're we're non-scrolling canvas and the scroll-limiter should always
        // have the same height. Enforce this by explicitly setting the height.
        if (!this.attrs.doesScroll) {
            var scrollLimiter = canvas.parentElement;
            if (scrollLimiter) {
                scrollLimiter.style.height = "".concat(this.canvasHeight, "px");
            }
        }
        var dpr = window.devicePixelRatio;
        ctx.canvas.width = this.parentWidth * dpr;
        ctx.canvas.height = this.canvasHeight * dpr;
        ctx.scale(dpr, dpr);
    };
    PanelContainer.prototype.repositionCanvas = function () {
        var canvas = (0, logging_2.assertExists)((0, logging_2.assertExists)(this.ctx).canvas);
        var canvasYStart = Math.floor(this.scrollTop - this.getCanvasOverdrawHeightPerSide());
        canvas.style.transform = "translateY(".concat(canvasYStart, "px)");
    };
    // Reads dimensions of parent node. Returns true if read dimensions are
    // different from what was cached in the state.
    PanelContainer.prototype.readParentSizeFromDom = function (dom) {
        var oldWidth = this.parentWidth;
        var oldHeight = this.parentHeight;
        var clientRect = (0, logging_2.assertExists)(dom.parentElement).getBoundingClientRect();
        // On non-MacOS if there is a solid scroll bar it can cover important
        // pixels, reduce the size of the canvas so it doesn't overlap with
        // the scroll bar.
        this.parentWidth =
            clientRect.width - exports.globals.frontendLocalState.getScrollbarWidth();
        this.parentHeight = clientRect.height;
        return this.parentHeight !== oldHeight || this.parentWidth !== oldWidth;
    };
    // Reads dimensions of panels. Returns true if total panel height is different
    // from what was cached in state.
    PanelContainer.prototype.readPanelHeightsFromDom = function (dom) {
        var _this = this;
        var prevHeight = this.totalPanelHeight;
        this.panelInfos = [];
        this.totalPanelHeight = 0;
        var domRect = dom.getBoundingClientRect();
        this.panelContainerTop = domRect.y;
        this.panelContainerHeight = domRect.height;
        dom.parentElement.querySelectorAll('.panel').forEach(function (panel) {
            var key = (0, logging_2.assertExists)(panel.getAttribute('data-key'));
            var vnode = (0, logging_2.assertExists)(_this.panelByKey.get(key));
            // NOTE: the id can be undefined for singletons like overview timeline.
            var id = vnode.attrs.id || vnode.attrs.trackGroupId || '';
            var rect = panel.getBoundingClientRect();
            _this.panelInfos.push({
                id: id,
                height: rect.height,
                width: rect.width,
                x: rect.x,
                y: rect.y,
                vnode: vnode,
            });
            _this.totalPanelHeight += rect.height;
        });
        return this.totalPanelHeight !== prevHeight;
    };
    PanelContainer.prototype.overlapsCanvas = function (yStart, yEnd) {
        return yEnd > 0 && yStart < this.canvasHeight;
    };
    PanelContainer.prototype.redrawCanvas = function () {
        var redrawStart = (0, exports.debugNow)();
        if (!this.ctx)
            return;
        this.ctx.clearRect(0, 0, this.parentWidth, this.canvasHeight);
        var canvasYStart = Math.floor(this.scrollTop - this.getCanvasOverdrawHeightPerSide());
        this.handleAreaSelection();
        var panelYStart = 0;
        var totalOnCanvas = 0;
        var flowEventsRendererArgs = new flow_events_renderer_1.FlowEventsRendererArgs(this.parentWidth, this.canvasHeight);
        for (var i = 0; i < this.panelInfos.length; i++) {
            var panel = this.panelInfos[i].vnode;
            var panelHeight = this.panelInfos[i].height;
            var yStartOnCanvas = panelYStart - canvasYStart;
            if (!(0, panel_2.isPanelVNode)(panel)) {
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
            var clipRect = new Path2D();
            var size = { width: this.parentWidth, height: panelHeight };
            clipRect.rect(0, 0, size.width, size.height);
            this.ctx.clip(clipRect);
            var beforeRender = (0, exports.debugNow)();
            panel.state.renderCanvas(this.ctx, size, panel);
            this.updatePanelStats(i, panel.state, (0, exports.debugNow)() - beforeRender, this.ctx, size);
            this.ctx.restore();
            panelYStart += panelHeight;
        }
        this.drawTopLayerOnCanvas();
        this.flowEventsRenderer.render(this.ctx, flowEventsRendererArgs);
        // Collect performance as the last thing we do.
        var redrawDur = (0, exports.debugNow)() - redrawStart;
        this.updatePerfStats(redrawDur, this.panelInfos.length, totalOnCanvas);
    };
    // The panels each draw on the canvas but some details need to be drawn across
    // the whole canvas rather than per panel.
    PanelContainer.prototype.drawTopLayerOnCanvas = function () {
        if (!this.ctx)
            return;
        var area = exports.globals.frontendLocalState.selectedArea;
        if (area === undefined ||
            exports.globals.frontendLocalState.areaY.start === undefined ||
            exports.globals.frontendLocalState.areaY.end === undefined) {
            return;
        }
        if (this.panelInfos.length === 0 || area.tracks.length === 0)
            return;
        // Find the minY and maxY of the selected tracks in this panel container.
        var selectedTracksMinY = this.panelContainerHeight + this.panelContainerTop;
        var selectedTracksMaxY = this.panelContainerTop;
        var trackFromCurrentContainerSelected = false;
        for (var i = 0; i < this.panelInfos.length; i++) {
            if (area.tracks.includes(this.panelInfos[i].id)) {
                trackFromCurrentContainerSelected = true;
                selectedTracksMinY = Math.min(selectedTracksMinY, this.panelInfos[i].y);
                selectedTracksMaxY = Math.max(selectedTracksMaxY, this.panelInfos[i].y + this.panelInfos[i].height);
            }
        }
        // No box should be drawn if there are no selected tracks in the current
        // container.
        if (!trackFromCurrentContainerSelected) {
            return;
        }
        var startX = exports.globals.frontendLocalState.timeScale.timeToPx(area.startSec);
        var endX = exports.globals.frontendLocalState.timeScale.timeToPx(area.endSec);
        // To align with where to draw on the canvas subtract the first panel Y.
        selectedTracksMinY -= this.panelContainerTop;
        selectedTracksMaxY -= this.panelContainerTop;
        this.ctx.save();
        this.ctx.strokeStyle = exports.SELECTION_STROKE_COLOR;
        this.ctx.lineWidth = 1;
        var canvasYStart = Math.floor(this.scrollTop - this.getCanvasOverdrawHeightPerSide());
        this.ctx.translate(exports.TRACK_SHELL_WIDTH, -canvasYStart);
        this.ctx.strokeRect(startX, selectedTracksMaxY, endX - startX, selectedTracksMinY - selectedTracksMaxY);
        this.ctx.restore();
    };
    PanelContainer.prototype.updatePanelStats = function (panelIndex, panel, renderTime, ctx, size) {
        if (!(0, exports.perfDebug)())
            return;
        var renderStats = this.panelPerfStats.get(panel);
        if (renderStats === undefined) {
            renderStats = new perf_1.RunningStatistics();
            this.panelPerfStats.set(panel, renderStats);
        }
        renderStats.addValue(renderTime);
        var statW = 300;
        ctx.fillStyle = 'hsl(97, 100%, 96%)';
        ctx.fillRect(size.width - statW, size.height - 20, statW, 20);
        ctx.fillStyle = 'hsla(122, 77%, 22%)';
        var statStr = "Panel ".concat(panelIndex + 1, " | ") + (0, perf_2.runningStatStr)(renderStats);
        ctx.fillText(statStr, size.width - statW, size.height - 10);
    };
    PanelContainer.prototype.updatePerfStats = function (renderTime, totalPanels, panelsOnCanvas) {
        if (!(0, exports.perfDebug)())
            return;
        this.perfStats.renderStats.addValue(renderTime);
        this.perfStats.totalPanels = totalPanels;
        this.perfStats.panelsOnCanvas = panelsOnCanvas;
    };
    PanelContainer.prototype.renderPerfStats = function (index) {
        (0, logging_1.assertTrue)((0, exports.perfDebug)());
        return [(0, mithril_1.default)('section', (0, mithril_1.default)('div', "Panel Container ".concat(index + 1)), (0, mithril_1.default)('div', "".concat(this.perfStats.totalPanels, " panels, ") +
                "".concat(this.perfStats.panelsOnCanvas, " on canvas.")), (0, mithril_1.default)('div', (0, perf_2.runningStatStr)(this.perfStats.renderStats)))];
    };
    PanelContainer.prototype.getCanvasOverdrawHeightPerSide = function () {
        var overdrawHeight = (this.canvasOverdrawFactor - 1) * this.parentHeight;
        return overdrawHeight / 2;
    };
    return PanelContainer;
}());
exports.PanelContainer = PanelContainer;
var channels_2 = require("../common/channels");
exports.HomePage = (0, pages_1.createPage)({
    view: function () {
        return (0, mithril_1.default)('.page.home-page', (0, mithril_1.default)('.home-page-center', (0, mithril_1.default)('.home-page-title', 'Perfetto'), (0, mithril_1.default)("img.logo[src=".concat(exports.globals.root, "assets/logo-3d.png]")), (0, mithril_1.default)('div.channel-select', (0, mithril_1.default)('div', 'Feeling adventurous? Try our bleeding edge Canary version'), (0, mithril_1.default)('fieldset', mkChan('stable'), mkChan('canary'), (0, mithril_1.default)('.highlight')), (0, mithril_1.default)(".home-page-reload".concat((0, channels_2.channelChanged)() ? '.show' : ''), 'You need to reload the page for the changes to have effect'))), (0, mithril_1.default)('a.privacy', { href: 'https://policies.google.com/privacy', target: '_blank' }, 'Privacy policy'));
    },
});
function mkChan(chan) {
    var checked = (0, channels_2.getNextChannel)() === chan ? '[checked=true]' : '';
    return [
        (0, mithril_1.default)("input[type=radio][name=chan][id=chan_".concat(chan, "]").concat(checked), {
            onchange: function () {
                (0, channels_2.setChannel)(chan);
            },
        }),
        (0, mithril_1.default)("label[for=chan_".concat(chan, "]"), chan),
    ];
}
var clipboard_2 = require("./clipboard");
var cookie_consent_1 = require("./cookie_consent");
Object.defineProperty(exports, "CookieConsent", { enumerable: true, get: function () { return cookie_consent_1.CookieConsent; } });
var sidebar_2 = require("./sidebar");
Object.defineProperty(exports, "Sidebar", { enumerable: true, get: function () { return sidebar_2.Sidebar; } });
var topbar_2 = require("./topbar");
Object.defineProperty(exports, "Topbar", { enumerable: true, get: function () { return topbar_2.Topbar; } });
function renderPermalink() {
    var permalink = exports.globals.state.permalink;
    if (!permalink.requestId || !permalink.hash)
        return null;
    var url = "".concat(self.location.origin, "/#!/?s=").concat(permalink.hash);
    var linkProps = { title: 'Click to copy the URL', onclick: (0, clipboard_2.onClickCopy)(url) };
    return (0, mithril_1.default)('.alert-permalink', [
        (0, mithril_1.default)('div', 'Permalink: ', (0, mithril_1.default)("a[href=".concat(url, "]"), linkProps, url)),
        (0, mithril_1.default)('button', {
            onclick: function () { return exports.globals.dispatch(actions_1.Actions.clearPermalink({})); },
        }, (0, mithril_1.default)('i.material-icons.disallow-selection', 'close')),
    ]);
}
var Alerts = /** @class */ (function () {
    function Alerts() {
    }
    Alerts.prototype.view = function () {
        return (0, mithril_1.default)('.alerts', renderPermalink());
    };
    return Alerts;
}());
// Wrap component with common UI elements (nav bar etc).
function createPage(component) {
    var pageComponent = {
        view: function (_a) {
            var attrs = _a.attrs;
            var children = [
                (0, mithril_1.default)(sidebar_2.Sidebar),
                (0, mithril_1.default)(topbar_2.Topbar),
                (0, mithril_1.default)(Alerts),
                (0, mithril_1.default)(component, attrs),
                (0, mithril_1.default)(cookie_consent_1.CookieConsent),
                (0, mithril_1.default)(exports.fullscreenModalContainer.mithrilComponent),
            ];
            if (exports.globals.state.perfDebug) {
                children.push((0, mithril_1.default)('.perf-stats'));
            }
            return children;
        },
    };
    return pageComponent;
}
exports.createPage = createPage;
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
var track_cache_1 = require("./track_cache");
Object.defineProperty(exports, "CacheKey", { enumerable: true, get: function () { return track_cache_1.CacheKey; } });
Object.defineProperty(exports, "TrackCache", { enumerable: true, get: function () { return track_cache_1.TrackCache; } });
test('cacheKeys', function () {
    var k = track_cache_1.CacheKey.create(201, 302, 123);
    var n = k.normalize();
    var n2 = n.normalize();
    expect(k.isNormalized()).toEqual(false);
    expect(n.isNormalized()).toEqual(true);
    expect(n2.isNormalized()).toEqual(true);
    expect(n).toEqual(n2);
    expect(n.startNs).toBeLessThanOrEqual(k.startNs);
    expect(n.endNs).toBeGreaterThanOrEqual(k.startNs);
    expect(n.bucketNs).toBeGreaterThanOrEqual(k.bucketNs);
    expect(Math.abs(n.windowSizePx - k.windowSizePx)).toBeLessThanOrEqual(200);
});
test('cache', function () {
    var k1 = (track_cache_1.CacheKey.create(1000, 1100, 100)).normalize();
    var k2 = (track_cache_1.CacheKey.create(2000, 2100, 100)).normalize();
    var k3 = (track_cache_1.CacheKey.create(3000, 3100, 100)).normalize();
    var k4 = (track_cache_1.CacheKey.create(4000, 4100, 100)).normalize();
    var k5 = (track_cache_1.CacheKey.create(5000, 5100, 100)).normalize();
    var k6 = (track_cache_1.CacheKey.create(6000, 6100, 100)).normalize();
    var k7 = (track_cache_1.CacheKey.create(7000, 7100, 100)).normalize();
    var cache = new track_cache_1.TrackCache(5);
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
var task_tracker_2 = require("./task_tracker");
Object.defineProperty(exports, "TaskTracker", { enumerable: true, get: function () { return task_tracker_2.TaskTracker; } });
test('it starts with no pending tasks', function () {
    var tracker = new task_tracker_2.TaskTracker();
    expect(tracker.hasPendingTasks()).toEqual(false);
    expect(tracker.progressMessage()).toEqual(undefined);
});
test('it knows if a task is pending', function () {
    var tracker = new task_tracker_2.TaskTracker();
    var deferred = (0, deferred_1.defer)();
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
var LOADING_TEXT = 'Loading...';
var LOADING_TEXT_WIDTH = 0;
// Checker board the range [leftPx, rightPx].
function checkerboard(ctx, heightPx, leftPx, rightPx) {
    var widthPx = rightPx - leftPx;
    ctx.font = '12px Roboto Condensed';
    ctx.fillStyle = '#eee';
    ctx.fillRect(leftPx, 0, widthPx, heightPx);
    ctx.fillStyle = '#666';
    var oldBaseline = ctx.textBaseline;
    ctx.textBaseline = 'middle';
    if (LOADING_TEXT_WIDTH === 0) {
        LOADING_TEXT_WIDTH = ctx.measureText(LOADING_TEXT).width;
    }
    if (LOADING_TEXT_WIDTH <= widthPx) {
        ctx.fillText(LOADING_TEXT, leftPx + widthPx / 2 - LOADING_TEXT_WIDTH / 2, heightPx / 2);
    }
    ctx.textBaseline = oldBaseline;
}
exports.checkerboard = checkerboard;
// Checker board everything between [startPx, endPx] except [leftPx, rightPx].
function checkerboardExcept(ctx, heightPx, startPx, endPx, leftPx, rightPx) {
    // [leftPx, rightPx] doesn't overlap [startPx, endPx] at all:
    if (rightPx <= startPx || leftPx >= endPx) {
        (0, checkerboard_1.checkerboard)(ctx, heightPx, startPx, endPx);
        return;
    }
    // Checkerboard [startPx, leftPx]:
    if (leftPx > startPx) {
        (0, checkerboard_1.checkerboard)(ctx, heightPx, startPx, leftPx);
    }
    // Checkerboard [rightPx, endPx]:
    if (rightPx < endPx) {
        (0, checkerboard_1.checkerboard)(ctx, heightPx, rightPx, endPx);
    }
}
exports.checkerboardExcept = checkerboardExcept;
var placeholderElement = document.createElement('span');
// A component that renders a group of cells on the same row that can be
// reordered between each other by using drag'n'drop.
//
// On completed reorder, a callback is fired.
var ReorderableCellGroup = /** @class */ (function () {
    function ReorderableCellGroup() {
        // Index of a cell being dragged.
        this.draggingFrom = -1;
        // Index of a cell cursor is hovering over.
        this.draggingTo = -1;
        // Whether the cursor hovering on the left or right side of the element: used
        // to add the dragged element either before or after the drop target.
        this.dropDirection = 'left';
        // Auxillary array used to count entrances into `dragenter` event: these are
        // incremented not only when hovering over a cell, but also for any child of
        // the tree.
        this.enterCounters = [];
    }
    ReorderableCellGroup.prototype.getClassForIndex = function (index) {
        if (this.draggingFrom === index) {
            return 'dragged';
        }
        if (this.draggingTo === index) {
            return this.dropDirection === 'left' ? 'highlight-left' :
                'highlight-right';
        }
        return '';
    };
    ReorderableCellGroup.prototype.view = function (vnode) {
        var _this = this;
        return vnode.attrs.cells.map(function (cell, index) {
            var _a;
            return (0, mithril_1.default)("td.reorderable-cell".concat((_a = cell.extraClass) !== null && _a !== void 0 ? _a : ''), {
                draggable: 'draggable',
                class: _this.getClassForIndex(index),
                ondragstart: function (e) {
                    _this.draggingFrom = index;
                    if (e.dataTransfer !== null) {
                        e.dataTransfer.setDragImage(placeholderElement, 0, 0);
                    }
                    exports.globals.rafScheduler.scheduleFullRedraw();
                },
                ondragover: function (e) {
                    var target = e.target;
                    if (_this.draggingFrom === index || _this.draggingFrom === -1) {
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
                    var offset = e.clientX - target.getBoundingClientRect().x;
                    var newDropDirection = (offset > target.clientWidth / 2) ? 'right' : 'left';
                    var redraw = (newDropDirection !== _this.dropDirection) ||
                        (index !== _this.draggingTo);
                    _this.dropDirection = newDropDirection;
                    _this.draggingTo = index;
                    if (redraw) {
                        exports.globals.rafScheduler.scheduleFullRedraw();
                    }
                },
                ondragenter: function (e) {
                    _this.enterCounters[index]++;
                    if (_this.enterCounters[index] === 1 &&
                        e.dataTransfer !== null) {
                        e.dataTransfer.dropEffect = 'move';
                    }
                },
                ondragleave: function (e) {
                    _this.enterCounters[index]--;
                    if (_this.draggingFrom === -1 || _this.enterCounters[index] > 0) {
                        return;
                    }
                    if (e.dataTransfer !== null) {
                        e.dataTransfer.dropEffect = 'none';
                    }
                    _this.draggingTo = -1;
                    exports.globals.rafScheduler.scheduleFullRedraw();
                },
                ondragend: function () {
                    if (_this.draggingTo !== _this.draggingFrom &&
                        _this.draggingTo !== -1) {
                        vnode.attrs.onReorder(_this.draggingFrom, _this.draggingTo, _this.dropDirection);
                    }
                    _this.draggingFrom = -1;
                    _this.draggingTo = -1;
                    exports.globals.rafScheduler.scheduleFullRedraw();
                },
            }, cell.content);
        });
    };
    ReorderableCellGroup.prototype.oncreate = function (vnode) {
        this.enterCounters = Array(vnode.attrs.cells.length).fill(0);
    };
    ReorderableCellGroup.prototype.onupdate = function (vnode) {
        if (this.enterCounters.length !== vnode.attrs.cells.length) {
            this.enterCounters = Array(vnode.attrs.cells.length).fill(0);
        }
    };
    return ReorderableCellGroup;
}());
exports.ReorderableCellGroup = ReorderableCellGroup;
var colorizer_3 = require("../common/colorizer");
var base_slice_track_1 = require("./base_slice_track");
Object.defineProperty(exports, "BaseSliceTrack", { enumerable: true, get: function () { return base_slice_track_1.BaseSliceTrack; } });
exports.NAMED_SLICE_ROW = __assign(__assign({}, exports.BASE_SLICE_ROW), { 
    // Impl-specific columns.
    name: query_result_1.STR_NULL });
var NamedSliceTrack = /** @class */ (function (_super) {
    __extends(NamedSliceTrack, _super);
    function NamedSliceTrack(args) {
        return _super.call(this, args) || this;
    }
    // This is used by the base class to call iter().
    NamedSliceTrack.prototype.getRowSpec = function () {
        return exports.NAMED_SLICE_ROW;
    };
    // Converts a SQL result row to an "Impl" Slice.
    NamedSliceTrack.prototype.rowToSlice = function (row) {
        var baseSlice = _super.prototype.rowToSlice.call(this, row);
        // Ignore PIDs or numeric arguments when hashing.
        var name = row.name || '';
        var nameForHashing = name.replace(/\s?\d+/g, '');
        var hsl = (0, colorizer_3.hslForSlice)(nameForHashing, /* isSelected=*/ false);
        // We cache the color so we hash only once per query.
        var baseColor = { c: '', h: hsl[0], s: hsl[1], l: hsl[2] };
        return __assign(__assign({}, baseSlice), { title: name, baseColor: baseColor });
    };
    NamedSliceTrack.prototype.onSliceOver = function (args) {
        var name = args.slice.title;
        args.tooltip = [name];
    };
    NamedSliceTrack.prototype.onSliceClick = function (args) {
        exports.globals.makeSelection(actions_1.Actions.selectChromeSlice({
            id: args.slice.id,
            trackId: this.trackId,
            // |table| here can be either 'slice' or 'annotation'. The
            // AnnotationSliceTrack overrides the onSliceClick and sets this to
            // 'annotation'
            table: 'slice',
        }));
    };
    return NamedSliceTrack;
}(base_slice_track_1.BaseSliceTrack));
exports.NamedSliceTrack = NamedSliceTrack;
// Helper function for simplifying defining menus.
function menuItem(text, action) {
    return {
        itemType: 'regular',
        text: text,
        callback: action,
    };
}
exports.menuItem = menuItem;
// To ensure having at most one popup menu on the screen at a time, we need to
// listen to click events on the whole page and close currently opened popup, if
// there's any. This class, used as a singleton, does exactly that.
var PopupHolder = /** @class */ (function () {
    function PopupHolder() {
        var _this = this;
        // Invariant: global listener should be register if and only if this.popup is
        // not undefined.
        this.popup = undefined;
        this.initialized = false;
        this.listener = function (e) {
            // Only handle those events that are not part of dropdown menu themselves.
            var hasDropdown = e.composedPath().find(PopupHolder.isDropdownElement) !== undefined;
            if (!hasDropdown) {
                _this.ensureHidden();
            }
        };
    }
    PopupHolder.isDropdownElement = function (target) {
        if (target instanceof HTMLElement) {
            return target.tagName === 'DIV' && target.classList.contains('dropdown');
        }
        return false;
    };
    PopupHolder.prototype.ensureHidden = function () {
        if (this.popup !== undefined) {
            this.popup.setVisible(false);
        }
    };
    PopupHolder.prototype.clear = function () {
        if (this.popup !== undefined) {
            this.popup = undefined;
            window.removeEventListener('click', this.listener);
        }
    };
    PopupHolder.prototype.showPopup = function (popup) {
        this.ensureHidden();
        this.popup = popup;
        window.addEventListener('click', this.listener);
    };
    return PopupHolder;
}());
// Singleton instance of PopupHolder
var popupHolder = new PopupHolder();
// For a table column that can be sorted; the standard popup icon should
// reflect the current sorting direction. This function returns an icon
// corresponding to optional SortDirection according to which the column is
// sorted. (Optional because column might be unsorted)
function popupMenuIcon(sortDirection) {
    switch (sortDirection) {
        case undefined:
            return 'more_horiz';
        case 'DESC':
            return 'arrow_drop_down';
        case 'ASC':
            return 'arrow_drop_up';
    }
}
exports.popupMenuIcon = popupMenuIcon;
// Component that displays a button that shows a popup menu on click.
var PopupMenuButton = /** @class */ (function () {
    function PopupMenuButton() {
        this.popupShown = false;
        this.expandedGroups = new Set();
    }
    PopupMenuButton.prototype.setVisible = function (visible) {
        this.popupShown = visible;
        if (this.popupShown) {
            popupHolder.showPopup(this);
        }
        else {
            popupHolder.clear();
        }
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    PopupMenuButton.prototype.renderItem = function (item) {
        var _this = this;
        switch (item.itemType) {
            case 'regular':
                return (0, mithril_1.default)('button.open-menu', {
                    onclick: function () {
                        item.callback();
                        // Hide the menu item after the action has been invoked
                        _this.setVisible(false);
                    },
                }, item.text);
            case 'group':
                var isExpanded = this.expandedGroups.has(item.itemId);
                return (0, mithril_1.default)('div', (0, mithril_1.default)('button.open-menu.disallow-selection', {
                    onclick: function () {
                        if (_this.expandedGroups.has(item.itemId)) {
                            _this.expandedGroups.delete(item.itemId);
                        }
                        else {
                            _this.expandedGroups.add(item.itemId);
                        }
                        exports.globals.rafScheduler.scheduleFullRedraw();
                    },
                }, 
                // Show text with up/down arrow, depending on expanded state.
                item.text + (isExpanded ? ' \u25B2' : ' \u25BC')), isExpanded ? (0, mithril_1.default)('div.nested-menu', item.children.map(function (item) { return _this.renderItem(item); })) :
                    null);
        }
    };
    PopupMenuButton.prototype.view = function (vnode) {
        var _this = this;
        return (0, mithril_1.default)('.dropdown', (0, mithril_1.default)('.dropdown-button', {
            onclick: function () {
                _this.setVisible(!_this.popupShown);
            },
        }, vnode.children, (0, mithril_1.default)('i.material-icons', vnode.attrs.icon)), (0, mithril_1.default)(this.popupShown ? '.popup-menu.opened' : '.popup-menu.closed', vnode.attrs.items.map(function (item) { return _this.renderItem(item); })));
    };
    return PopupMenuButton;
}());
exports.PopupMenuButton = PopupMenuButton;
var perf_3 = require("./perf");
function statTableHeader() {
    return (0, mithril_1.default)('tr', (0, mithril_1.default)('th', ''), (0, mithril_1.default)('th', 'Last (ms)'), (0, mithril_1.default)('th', 'Avg (ms)'), (0, mithril_1.default)('th', 'Avg-10 (ms)'));
}
function statTableRow(title, stat) {
    return (0, mithril_1.default)('tr', (0, mithril_1.default)('td', title), (0, mithril_1.default)('td', stat.last.toFixed(2)), (0, mithril_1.default)('td', stat.mean.toFixed(2)), (0, mithril_1.default)('td', stat.bufferMean.toFixed(2)));
}
// This class orchestrates all RAFs in the UI. It ensures that there is only
// one animation frame handler overall and that callbacks are called in
// predictable order. There are two types of callbacks here:
// - actions (e.g. pan/zoon animations), which will alter the "fast"
//  (main-thread-only) state (e.g. update visible time bounds @ 60 fps).
// - redraw callbacks that will repaint canvases.
// This class guarantees that, on each frame, redraw callbacks are called after
// all action callbacks.
var RafScheduler = /** @class */ (function () {
    function RafScheduler() {
        this.actionCallbacks = new Set();
        this.canvasRedrawCallbacks = new Set();
        this._syncDomRedraw = function (_) { };
        this.hasScheduledNextFrame = false;
        this.requestedFullRedraw = false;
        this.isRedrawing = false;
        this._shutdown = false;
        this.perfStats = {
            rafActions: new perf_1.RunningStatistics(),
            rafCanvas: new perf_1.RunningStatistics(),
            rafDom: new perf_1.RunningStatistics(),
            rafTotal: new perf_1.RunningStatistics(),
            domRedraw: new perf_1.RunningStatistics(),
        };
    }
    RafScheduler.prototype.start = function (cb) {
        this.actionCallbacks.add(cb);
        this.maybeScheduleAnimationFrame();
    };
    RafScheduler.prototype.stop = function (cb) {
        this.actionCallbacks.delete(cb);
    };
    RafScheduler.prototype.addRedrawCallback = function (cb) {
        this.canvasRedrawCallbacks.add(cb);
    };
    RafScheduler.prototype.removeRedrawCallback = function (cb) {
        this.canvasRedrawCallbacks.delete(cb);
    };
    // Schedule re-rendering of canvas only.
    RafScheduler.prototype.scheduleRedraw = function () {
        this.maybeScheduleAnimationFrame(true);
    };
    RafScheduler.prototype.shutdown = function () {
        this._shutdown = true;
    };
    Object.defineProperty(RafScheduler.prototype, "domRedraw", {
        set: function (cb) {
            this._syncDomRedraw = cb;
        },
        enumerable: false,
        configurable: true
    });
    // Schedule re-rendering of virtual DOM and canvas.
    RafScheduler.prototype.scheduleFullRedraw = function () {
        this.requestedFullRedraw = true;
        this.maybeScheduleAnimationFrame(true);
    };
    RafScheduler.prototype.syncDomRedraw = function (nowMs) {
        var redrawStart = (0, exports.debugNow)();
        this._syncDomRedraw(nowMs);
        if ((0, exports.perfDebug)()) {
            this.perfStats.domRedraw.addValue((0, exports.debugNow)() - redrawStart);
        }
    };
    Object.defineProperty(RafScheduler.prototype, "hasPendingRedraws", {
        get: function () {
            return this.isRedrawing || this.hasScheduledNextFrame;
        },
        enumerable: false,
        configurable: true
    });
    RafScheduler.prototype.syncCanvasRedraw = function (nowMs) {
        var redrawStart = (0, exports.debugNow)();
        if (this.isRedrawing)
            return;
        exports.globals.frontendLocalState.clearVisibleTracks();
        this.isRedrawing = true;
        for (var _i = 0, _a = this.canvasRedrawCallbacks; _i < _a.length; _i++) {
            var redraw = _a[_i];
            redraw(nowMs);
        }
        this.isRedrawing = false;
        exports.globals.frontendLocalState.sendVisibleTracks();
        if ((0, exports.perfDebug)()) {
            this.perfStats.rafCanvas.addValue((0, exports.debugNow)() - redrawStart);
        }
    };
    RafScheduler.prototype.maybeScheduleAnimationFrame = function (force) {
        if (force === void 0) { force = false; }
        if (this.hasScheduledNextFrame)
            return;
        if (this.actionCallbacks.size !== 0 || force) {
            this.hasScheduledNextFrame = true;
            window.requestAnimationFrame(this.onAnimationFrame.bind(this));
        }
    };
    RafScheduler.prototype.onAnimationFrame = function (nowMs) {
        var _this = this;
        if (this._shutdown)
            return;
        var rafStart = (0, exports.debugNow)();
        this.hasScheduledNextFrame = false;
        var doFullRedraw = this.requestedFullRedraw;
        this.requestedFullRedraw = false;
        var actionTime = (0, perf_3.measure)(function () {
            for (var _i = 0, _a = _this.actionCallbacks; _i < _a.length; _i++) {
                var action = _a[_i];
                action(nowMs);
            }
        });
        var domTime = (0, perf_3.measure)(function () {
            if (doFullRedraw)
                _this.syncDomRedraw(nowMs);
        });
        var canvasTime = (0, perf_3.measure)(function () { return _this.syncCanvasRedraw(nowMs); });
        var totalRafTime = (0, exports.debugNow)() - rafStart;
        this.updatePerfStats(actionTime, domTime, canvasTime, totalRafTime);
        exports.perfDisplay.renderPerfStats();
        this.maybeScheduleAnimationFrame();
    };
    RafScheduler.prototype.updatePerfStats = function (actionsTime, domTime, canvasTime, totalRafTime) {
        if (!(0, exports.perfDebug)())
            return;
        this.perfStats.rafActions.addValue(actionsTime);
        this.perfStats.rafDom.addValue(domTime);
        this.perfStats.rafCanvas.addValue(canvasTime);
        this.perfStats.rafTotal.addValue(totalRafTime);
    };
    RafScheduler.prototype.renderPerfStats = function () {
        var _this = this;
        (0, logging_1.assertTrue)((0, exports.perfDebug)());
        return (0, mithril_1.default)('div', (0, mithril_1.default)('div', [
            (0, mithril_1.default)('button', { onclick: function () { return _this.scheduleRedraw(); } }, 'Do Canvas Redraw'),
            '   |   ',
            (0, mithril_1.default)('button', { onclick: function () { return _this.scheduleFullRedraw(); } }, 'Do Full Redraw'),
        ]), (0, mithril_1.default)('div', 'Raf Timing ' +
            '(Total may not add up due to imprecision)'), (0, mithril_1.default)('table', statTableHeader(), statTableRow('Actions', this.perfStats.rafActions), statTableRow('Dom', this.perfStats.rafDom), statTableRow('Canvas', this.perfStats.rafCanvas), statTableRow('Total', this.perfStats.rafTotal)), (0, mithril_1.default)('div', 'Dom redraw: ' +
            "Count: ".concat(this.perfStats.domRedraw.count, " | ") +
            (0, perf_2.runningStatStr)(this.perfStats.domRedraw)));
    };
    return RafScheduler;
}());
exports.RafScheduler = RafScheduler;
var Animation = /** @class */ (function () {
    function Animation(onAnimationStep) {
        this.onAnimationStep = onAnimationStep;
        this.startMs = 0;
        this.endMs = 0;
        this.boundOnAnimationFrame = this.onAnimationFrame.bind(this);
    }
    Animation.prototype.start = function (durationMs) {
        var nowMs = performance.now();
        // If the animation is already happening, just update its end time.
        if (nowMs <= this.endMs) {
            this.endMs = nowMs + durationMs;
            return;
        }
        this.startMs = nowMs;
        this.endMs = nowMs + durationMs;
        exports.globals.rafScheduler.start(this.boundOnAnimationFrame);
    };
    Animation.prototype.stop = function () {
        this.endMs = 0;
        exports.globals.rafScheduler.stop(this.boundOnAnimationFrame);
    };
    Object.defineProperty(Animation.prototype, "startTimeMs", {
        get: function () {
            return this.startMs;
        },
        enumerable: false,
        configurable: true
    });
    Animation.prototype.onAnimationFrame = function (nowMs) {
        if (nowMs >= this.endMs) {
            exports.globals.rafScheduler.stop(this.boundOnAnimationFrame);
            return;
        }
        this.onAnimationStep(Math.max(Math.round(nowMs - this.startMs), 0));
    };
    return Animation;
}());
exports.Animation = Animation;
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
function downloadUrl(fileName, url) {
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
exports.downloadUrl = downloadUrl;
// Initiate download of |data| a file with a given name.
function downloadData(fileName) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
    var blob = new Blob(data, { type: 'application/octet-stream' });
    var url = URL.createObjectURL(blob);
    (0, download_utils_2.downloadUrl)(fileName, url);
}
exports.downloadData = downloadData;
var http_rpc_engine_1 = require("../common/http_rpc_engine");
var protos_2 = require("../gen/protos");
var CURRENT_API_VERSION = protos_2.perfetto.protos.TraceProcessorApiVersion
    .TRACE_PROCESSOR_CURRENT_API_VERSION;
var PROMPT = "Trace Processor Native Accelerator detected on ".concat(http_rpc_engine_1.RPC_URL, " with:\n$loadedTraceName\n\nYES, use loaded trace:\nWill load from the current state of Trace Processor. If you did run\ntrace_processor_shell --httpd file.pftrace this is likely what you want.\n\nYES, but reset state:\nUse this if you want to open another trace but still use the\naccelerator. This is the equivalent of killing and restarting\ntrace_processor_shell --httpd.\n\nNO, Use builtin WASM:\nWill not use the accelerator in this tab.\n\nUsing the native accelerator has some minor caveats:\n- Only one tab can be using the accelerator.\n- Sharing, downloading and conversion-to-legacy aren't supported.\n- You may encounter UI errors if the Trace Processor version you are using is\ntoo old. Get the latest version from get.perfetto.dev/trace_processor.\n");
var MSG_TOO_OLD = "The Trace Processor instance on ".concat(http_rpc_engine_1.RPC_URL, " is too old.\n\nThis UI requires TraceProcessor features that are not present in the\nTrace Processor native accelerator you are currently running.\nIf you continue, this is almost surely going to cause UI failures.\n\nPlease update your local Trace Processor binary:\n\ncurl -LO https://get.perfetto.dev/trace_processor\nchmod +x ./trace_processor\n./trace_processor --httpd\n\nUI version: ").concat(perfetto_version_1.VERSION, "\nTraceProcessor RPC API required: ").concat(CURRENT_API_VERSION, " or higher\n\nTraceProcessor version: $tpVersion\nRPC API: $tpApi\n");
var forceUseOldVersion = false;
// Try to connect to the external Trace Processor HTTP RPC accelerator (if
// available, often it isn't). If connected it will populate the
// |httpRpcState| in the frontend local state. In turn that will show the UI
// chip in the sidebar. trace_controller.ts will repeat this check before
// trying to load a new trace. We do this ahead of time just to have a
// consistent UX (i.e. so that the user can tell if the RPC is working without
// having to open a trace).
function CheckHttpRpcConnection() {
    return __awaiter(this, void 0, Promise, function () {
        var state, tpStatus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, http_rpc_engine_1.HttpRpcEngine.checkConnection()];
                case 1:
                    state = _a.sent();
                    exports.globals.frontendLocalState.setHttpRpcState(state);
                    if (!state.connected)
                        return [2 /*return*/];
                    tpStatus = (0, logging_2.assertExists)(state.status);
                    if (!(tpStatus.apiVersion < CURRENT_API_VERSION)) return [3 /*break*/, 3];
                    return [4 /*yield*/, showDialogTraceProcessorTooOld(tpStatus)];
                case 2:
                    _a.sent();
                    if (!forceUseOldVersion)
                        return [2 /*return*/];
                    _a.label = 3;
                case 3:
                    if (tpStatus.loadedTraceName) {
                        // If a trace is already loaded in the trace processor (e.g., the user
                        // launched trace_processor_shell -D trace_file.pftrace), prompt the user to
                        // initialize the UI with the already-loaded trace.
                        return [2 /*return*/, showDialogToUsePreloadedTrace(tpStatus)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.CheckHttpRpcConnection = CheckHttpRpcConnection;
function showDialogTraceProcessorTooOld(tpStatus) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, modal_3.showModal)({
                    title: 'Your Trace Processor binary is outdated',
                    content: (0, mithril_1.default)('.modal-pre', MSG_TOO_OLD.replace('$tpVersion', tpStatus.humanReadableVersion)
                        .replace('$tpApi', "".concat(tpStatus.apiVersion))),
                    buttons: [
                        {
                            text: 'Use builtin Wasm',
                            primary: true,
                            action: function () {
                                exports.globals.dispatch(actions_1.Actions.setNewEngineMode({ mode: 'FORCE_BUILTIN_WASM' }));
                            },
                        },
                        {
                            text: 'Use old version regardless (might crash)',
                            primary: false,
                            action: function () {
                                forceUseOldVersion = true;
                            },
                        },
                    ],
                })];
        });
    });
}
function showDialogToUsePreloadedTrace(tpStatus) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, modal_3.showModal)({
                    title: 'Use Trace Processor Native Acceleration?',
                    content: (0, mithril_1.default)('.modal-pre', PROMPT.replace('$loadedTraceName', tpStatus.loadedTraceName)),
                    buttons: [
                        {
                            text: 'YES, use loaded trace',
                            primary: true,
                            action: function () {
                                exports.globals.dispatch(actions_1.Actions.openTraceFromHttpRpc({}));
                            },
                        },
                        {
                            text: 'YES, but reset state',
                        },
                        {
                            text: 'NO, Use builtin Wasm',
                            action: function () {
                                exports.globals.dispatch(actions_1.Actions.setNewEngineMode({ mode: 'FORCE_BUILTIN_WASM' }));
                            },
                        },
                    ],
                })];
        });
    });
}
var InnerDragStrategy = /** @class */ (function (_super) {
    __extends(InnerDragStrategy, _super);
    function InnerDragStrategy(timeScale, pixelBounds) {
        var _this = _super.call(this, timeScale) || this;
        _this.pixelBounds = pixelBounds;
        _this.dragStartPx = 0;
        return _this;
    }
    InnerDragStrategy.prototype.onDrag = function (x) {
        var move = x - this.dragStartPx;
        var tStart = this.timeScale.pxToTime(this.pixelBounds[0] + move);
        var tEnd = this.timeScale.pxToTime(this.pixelBounds[1] + move);
        _super.prototype.updateGlobals.call(this, tStart, tEnd);
    };
    InnerDragStrategy.prototype.onDragStart = function (x) {
        this.dragStartPx = x;
    };
    return InnerDragStrategy;
}(drag_strategy_1.DragStrategy));
exports.InnerDragStrategy = InnerDragStrategy;
var BorderDragStrategy = /** @class */ (function (_super) {
    __extends(BorderDragStrategy, _super);
    function BorderDragStrategy(timeScale, pixelBounds) {
        var _this = _super.call(this, timeScale) || this;
        _this.pixelBounds = pixelBounds;
        _this.moveStart = false;
        return _this;
    }
    BorderDragStrategy.prototype.onDrag = function (x) {
        var _a;
        var tStart = this.timeScale.pxToTime(this.moveStart ? x : this.pixelBounds[0]);
        var tEnd = this.timeScale.pxToTime(!this.moveStart ? x : this.pixelBounds[1]);
        if (tStart > tEnd) {
            this.moveStart = !this.moveStart;
            _a = [tStart, tEnd], tEnd = _a[0], tStart = _a[1];
        }
        _super.prototype.updateGlobals.call(this, tStart, tEnd);
        this.pixelBounds =
            [this.timeScale.timeToPx(tStart), this.timeScale.timeToPx(tEnd)];
    };
    BorderDragStrategy.prototype.onDragStart = function (x) {
        this.moveStart =
            Math.abs(x - this.pixelBounds[0]) < Math.abs(x - this.pixelBounds[1]);
    };
    return BorderDragStrategy;
}(drag_strategy_1.DragStrategy));
exports.BorderDragStrategy = BorderDragStrategy;
var OuterDragStrategy = /** @class */ (function (_super) {
    __extends(OuterDragStrategy, _super);
    function OuterDragStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dragStartPx = 0;
        return _this;
    }
    OuterDragStrategy.prototype.onDrag = function (x) {
        var dragBeginTime = this.timeScale.pxToTime(this.dragStartPx);
        var dragEndTime = this.timeScale.pxToTime(x);
        var tStart = Math.min(dragBeginTime, dragEndTime);
        var tEnd = Math.max(dragBeginTime, dragEndTime);
        _super.prototype.updateGlobals.call(this, tStart, tEnd);
    };
    OuterDragStrategy.prototype.onDragStart = function (x) {
        this.dragStartPx = x;
    };
    return OuterDragStrategy;
}(drag_strategy_1.DragStrategy));
exports.OuterDragStrategy = OuterDragStrategy;
var DragStrategy = /** @class */ (function () {
    function DragStrategy(timeScale) {
        this.timeScale = timeScale;
    }
    DragStrategy.prototype.updateGlobals = function (tStart, tEnd) {
        var vizTime = new time_3.TimeSpan(tStart, tEnd);
        exports.globals.frontendLocalState.updateVisibleTime(vizTime);
        exports.globals.rafScheduler.scheduleRedraw();
    };
    return DragStrategy;
}());
exports.DragStrategy = DragStrategy;
var recording_config_utils_1 = require("../common/recordingV2/recording_config_utils");
var recording_page_controller_2 = require("../common/recordingV2/recording_page_controller");
var recording_utils_2 = require("../common/recordingV2/recording_utils");
var record_config_1 = require("./record_config");
var record_page_1 = require("./record_page");
var advanced_settings_1 = require("./recording/advanced_settings");
Object.defineProperty(exports, "AdvancedSettings", { enumerable: true, get: function () { return advanced_settings_1.AdvancedSettings; } });
var android_settings_1 = require("./recording/android_settings");
Object.defineProperty(exports, "AndroidSettings", { enumerable: true, get: function () { return android_settings_1.AndroidSettings; } });
var chrome_settings_1 = require("./recording/chrome_settings");
Object.defineProperty(exports, "ChromeSettings", { enumerable: true, get: function () { return chrome_settings_1.ChromeSettings; } });
var cpu_settings_1 = require("./recording/cpu_settings");
Object.defineProperty(exports, "CpuSettings", { enumerable: true, get: function () { return cpu_settings_1.CpuSettings; } });
var gpu_settings_1 = require("./recording/gpu_settings");
Object.defineProperty(exports, "GpuSettings", { enumerable: true, get: function () { return gpu_settings_1.GpuSettings; } });
var memory_settings_1 = require("./recording/memory_settings");
Object.defineProperty(exports, "MemorySettings", { enumerable: true, get: function () { return memory_settings_1.MemorySettings; } });
var power_settings_1 = require("./recording/power_settings");
Object.defineProperty(exports, "PowerSettings", { enumerable: true, get: function () { return power_settings_1.PowerSettings; } });
var recording_settings_1 = require("./recording/recording_settings");
Object.defineProperty(exports, "RecordingSettings", { enumerable: true, get: function () { return recording_settings_1.RecordingSettings; } });
var reset_target_modal_1 = require("./recording/reset_target_modal");
var START_RECORDING_MESSAGE = 'Start Recording';
var controller = new recording_page_controller_1.RecordingPageController();
var recordConfigUtils = new recording_config_utils_1.RecordingConfigUtils();
// Whether the target selection modal is displayed.
var shouldDisplayTargetModal = false;
function isChromeTargetInfo(targetInfo) {
    return ['CHROME', 'CHROME_OS'].includes(targetInfo.targetType);
}
function RecordHeader() {
    var platformSelection = RecordingPlatformSelection();
    var statusLabel = RecordingStatusLabel();
    var buttons = RecordingButton();
    var notes = RecordingNotes();
    if (!platformSelection && !statusLabel && !buttons && !notes) {
        // The header should not be displayed when it has no content.
        return undefined;
    }
    return (0, mithril_1.default)('.record-header', (0, mithril_1.default)('.top-part', (0, mithril_1.default)('.target-and-status', platformSelection, statusLabel), buttons), notes);
}
function RecordingPlatformSelection() {
    // Don't show the platform selector while we are recording a trace.
    if (controller.getState() >= recording_page_controller_2.RecordingState.RECORDING)
        return undefined;
    return (0, mithril_1.default)('.target', (0, mithril_1.default)('.chip', {
        onclick: function () {
            shouldDisplayTargetModal = true;
            exports.fullscreenModalContainer.createNew(addNewTargetModal());
            exports.globals.rafScheduler.scheduleFullRedraw();
        },
    }, (0, mithril_1.default)('button', 'Add new recording target'), (0, mithril_1.default)('i.material-icons', 'add')), targetSelection());
}
function addNewTargetModal() {
    return __assign(__assign({}, (0, reset_target_modal_1.addNewTarget)(controller)), { onClose: function () { return shouldDisplayTargetModal = false; } });
}
function targetSelection() {
    if (!controller.shouldShowTargetSelection()) {
        return undefined;
    }
    var targets = target_factory_registry_1.targetFactoryRegistry.listTargets();
    var targetNames = [];
    var targetInfo = controller.getTargetInfo();
    if (!targetInfo) {
        targetNames.push((0, mithril_1.default)('option', 'PLEASE_SELECT_TARGET'));
    }
    var selectedIndex = 0;
    for (var i = 0; i < targets.length; i++) {
        var targetName = targets[i].getInfo().name;
        targetNames.push((0, mithril_1.default)('option', targetName));
        if (targetInfo && targetName === targetInfo.name) {
            selectedIndex = i;
        }
    }
    return (0, mithril_1.default)('label', 'Target platform:', mithril_1.default.apply(void 0, __spreadArray(['select',
        {
            selectedIndex: selectedIndex,
            onchange: function (e) {
                controller.onTargetSelection(e.target.value);
            },
            onupdate: function (select) {
                // Work around mithril bug
                // (https://github.com/MithrilJS/mithril.js/issues/2107): We may
                // update the select's options while also changing the
                // selectedIndex at the same time. The update of selectedIndex
                // may be applied before the new options are added to the select
                // element. Because the new selectedIndex may be outside of the
                // select's options at that time, we have to reselect the
                // correct index here after any new children were added.
                select.dom.selectedIndex = selectedIndex;
            },
        }], targetNames, false)));
}
exports.targetSelection = targetSelection;
// This will display status messages which are informative, but do not require
// user action, such as: "Recording in progress for X seconds" in the recording
// page header.
function RecordingStatusLabel() {
    var recordingStatus = exports.globals.state.recordingStatus;
    if (!recordingStatus)
        return undefined;
    return (0, mithril_1.default)('label', recordingStatus);
}
function Instructions(cssClass) {
    if (controller.getState() < recording_page_controller_2.RecordingState.TARGET_SELECTED) {
        return undefined;
    }
    // We will have a valid target at this step because we checked the state.
    var targetInfo = (0, logging_2.assertExists)(controller.getTargetInfo());
    return (0, mithril_1.default)(".record-section.instructions".concat(cssClass), (0, mithril_1.default)('header', 'Recording command'), (exports.PERSIST_CONFIG_FLAG.get()) ?
        (0, mithril_1.default)('button.permalinkconfig', {
            onclick: function () {
                exports.globals.dispatch(actions_1.Actions.createPermalink({ isRecordingConfig: true }));
            },
        }, 'Share recording settings') :
        null, RecordingSnippet(targetInfo), BufferUsageProgressBar(), (0, mithril_1.default)('.buttons', StopCancelButtons()));
}
function BufferUsageProgressBar() {
    // Show the Buffer Usage bar only after we start recording a trace.
    if (controller.getState() !== recording_page_controller_2.RecordingState.RECORDING) {
        return undefined;
    }
    controller.fetchBufferUsage();
    var bufferUsage = controller.getBufferUsagePercentage();
    // Buffer usage is not available yet on Android.
    if (bufferUsage === 0)
        return undefined;
    return (0, mithril_1.default)('label', 'Buffer usage: ', (0, mithril_1.default)('progress', { max: 100, value: bufferUsage * 100 }));
}
function RecordingNotes() {
    if (controller.getState() !== recording_page_controller_2.RecordingState.TARGET_INFO_DISPLAYED) {
        return undefined;
    }
    // We will have a valid target at this step because we checked the state.
    var targetInfo = (0, logging_2.assertExists)(controller.getTargetInfo());
    var linuxUrl = 'https://perfetto.dev/docs/quickstart/linux-tracing';
    var cmdlineUrl = 'https://perfetto.dev/docs/quickstart/android-tracing#perfetto-cmdline';
    var notes = [];
    var msgFeatNotSupported = (0, mithril_1.default)('span', "Some probes are only supported in Perfetto versions running\n      on Android Q+. Therefore, Perfetto will sideload the latest version onto \n      the device.");
    var msgPerfettoNotSupported = (0, mithril_1.default)('span', "Perfetto is not supported natively before Android P. Therefore, Perfetto \n       will sideload the latest version onto the device.");
    var msgLinux = (0, mithril_1.default)('.note', "Use this ", (0, mithril_1.default)('a', { href: linuxUrl, target: '_blank' }, "quickstart guide"), " to get started with tracing on Linux.");
    var msgLongTraces = (0, mithril_1.default)('.note', "Recording in long trace mode through the UI is not supported. Please copy\n    the command and ", (0, mithril_1.default)('a', { href: cmdlineUrl, target: '_blank' }, "collect the trace using ADB."));
    if (!recordConfigUtils
        .fetchLatestRecordCommand(exports.globals.state.recordConfig, targetInfo)
        .hasDataSources) {
        notes.push((0, mithril_1.default)('.note', 'It looks like you didn\'t add any probes. ' +
            'Please add at least one to get a non-empty trace.'));
    }
    target_factory_registry_1.targetFactoryRegistry.listRecordingProblems().map(function (recordingProblem) {
        if (recordingProblem.includes(recording_utils_1.EXTENSION_URL)) {
            // Special case for rendering the link to the Chrome extension.
            var parts = recordingProblem.split(recording_utils_1.EXTENSION_URL);
            notes.push((0, mithril_1.default)('.note', parts[0], (0, mithril_1.default)('a', { href: recording_utils_1.EXTENSION_URL, target: '_blank' }, recording_utils_2.EXTENSION_NAME), parts[1]));
        }
    });
    switch (targetInfo.targetType) {
        case 'LINUX':
            notes.push(msgLinux);
            break;
        case 'ANDROID': {
            var androidApiLevel = targetInfo.androidApiLevel;
            if (androidApiLevel === 28) {
                notes.push((0, mithril_1.default)('.note', msgFeatNotSupported));
            }
            else if (androidApiLevel && androidApiLevel <= 27) {
                notes.push((0, mithril_1.default)('.note', msgPerfettoNotSupported));
            }
            break;
        }
        default:
    }
    if (exports.globals.state.recordConfig.mode === 'LONG_TRACE') {
        notes.unshift(msgLongTraces);
    }
    return notes.length > 0 ? (0, mithril_1.default)('div', notes) : undefined;
}
function RecordingSnippet(targetInfo) {
    // We don't need commands to start tracing on chrome
    if (isChromeTargetInfo(targetInfo)) {
        if (controller.getState() > recording_page_controller_2.RecordingState.AUTH_P2) {
            // If the UI has started tracing, don't display a message guiding the user
            // to start recording.
            return undefined;
        }
        return (0, mithril_1.default)('div', (0, mithril_1.default)('label', "To trace Chrome from the Perfetto UI you just have to press\n         '".concat(START_RECORDING_MESSAGE, "'.")));
    }
    return (0, mithril_1.default)(record_widgets_4.CodeSnippet, { text: getRecordCommand(targetInfo) });
}
function getRecordCommand(targetInfo) {
    var recordCommand = recordConfigUtils.fetchLatestRecordCommand(exports.globals.state.recordConfig, targetInfo);
    var pbBase64 = recordCommand ? recordCommand.configProtoBase64 : '';
    var pbtx = recordCommand ? recordCommand.configProtoText : '';
    var cmd = '';
    if (targetInfo.targetType === 'ANDROID' &&
        targetInfo.androidApiLevel === 28) {
        cmd += "echo '".concat(pbBase64, "' | \n");
        cmd += 'base64 --decode | \n';
        cmd += 'adb shell "perfetto -c - -o /data/misc/perfetto-traces/trace"\n';
    }
    else {
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
    if (controller.getState() !== recording_page_controller_2.RecordingState.TARGET_INFO_DISPLAYED ||
        !controller.canCreateTracingSession()) {
        return undefined;
    }
    // We know we have a target because we checked the state.
    var targetInfo = (0, logging_2.assertExists)(controller.getTargetInfo());
    var hasDataSources = recordConfigUtils
        .fetchLatestRecordCommand(exports.globals.state.recordConfig, targetInfo)
        .hasDataSources;
    if (!hasDataSources) {
        return undefined;
    }
    return (0, mithril_1.default)('.button', (0, mithril_1.default)('button', {
        class: 'selected',
        onclick: function () { return controller.onStartRecordingPressed(); },
    }, START_RECORDING_MESSAGE));
}
function StopCancelButtons() {
    // Show the Stop/Cancel buttons only while we are recording a trace.
    if (!controller.shouldShowStopCancelButtons()) {
        return undefined;
    }
    var stop = (0, mithril_1.default)("button.selected", { onclick: function () { return controller.onStop(); } }, 'Stop');
    var cancel = (0, mithril_1.default)("button", { onclick: function () { return controller.onCancel(); } }, 'Cancel');
    return [stop, cancel];
}
function recordMenu(routePage) {
    var chromeProbe = (0, mithril_1.default)('a[href="#!/record/chrome"]', (0, mithril_1.default)("li".concat(routePage === 'chrome' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'laptop_chromebook'), (0, mithril_1.default)('.title', 'Chrome'), (0, mithril_1.default)('.sub', 'Chrome traces')));
    var cpuProbe = (0, mithril_1.default)('a[href="#!/record/cpu"]', (0, mithril_1.default)("li".concat(routePage === 'cpu' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'subtitles'), (0, mithril_1.default)('.title', 'CPU'), (0, mithril_1.default)('.sub', 'CPU usage, scheduling, wakeups')));
    var gpuProbe = (0, mithril_1.default)('a[href="#!/record/gpu"]', (0, mithril_1.default)("li".concat(routePage === 'gpu' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'aspect_ratio'), (0, mithril_1.default)('.title', 'GPU'), (0, mithril_1.default)('.sub', 'GPU frequency, memory')));
    var powerProbe = (0, mithril_1.default)('a[href="#!/record/power"]', (0, mithril_1.default)("li".concat(routePage === 'power' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'battery_charging_full'), (0, mithril_1.default)('.title', 'Power'), (0, mithril_1.default)('.sub', 'Battery and other energy counters')));
    var memoryProbe = (0, mithril_1.default)('a[href="#!/record/memory"]', (0, mithril_1.default)("li".concat(routePage === 'memory' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'memory'), (0, mithril_1.default)('.title', 'Memory'), (0, mithril_1.default)('.sub', 'Physical mem, VM, LMK')));
    var androidProbe = (0, mithril_1.default)('a[href="#!/record/android"]', (0, mithril_1.default)("li".concat(routePage === 'android' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'android'), (0, mithril_1.default)('.title', 'Android apps & svcs'), (0, mithril_1.default)('.sub', 'atrace and logcat')));
    var advancedProbe = (0, mithril_1.default)('a[href="#!/record/advanced"]', (0, mithril_1.default)("li".concat(routePage === 'advanced' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'settings'), (0, mithril_1.default)('.title', 'Advanced settings'), (0, mithril_1.default)('.sub', 'Complicated stuff for wizards')));
    // We only display the probes when we have a valid target, so it's not
    // possible for the target to be undefined here.
    var targetType = (0, logging_2.assertExists)(controller.getTargetInfo()).targetType;
    var probes = [];
    if (targetType === 'CHROME_OS' || targetType === 'LINUX') {
        probes.push(cpuProbe, powerProbe, memoryProbe, chromeProbe, advancedProbe);
    }
    else if (targetType === 'CHROME') {
        probes.push(chromeProbe);
    }
    else {
        probes.push(cpuProbe, gpuProbe, powerProbe, memoryProbe, androidProbe, chromeProbe, advancedProbe);
    }
    return (0, mithril_1.default)('.record-menu', {
        class: controller.getState() > recording_page_controller_2.RecordingState.TARGET_INFO_DISPLAYED ?
            'disabled' :
            '',
        onclick: function () { return exports.globals.rafScheduler.scheduleFullRedraw(); },
    }, (0, mithril_1.default)('header', 'Trace config'), (0, mithril_1.default)('ul', (0, mithril_1.default)('a[href="#!/record/buffers"]', (0, mithril_1.default)("li".concat(routePage === 'buffers' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'tune'), (0, mithril_1.default)('.title', 'Recording settings'), (0, mithril_1.default)('.sub', 'Buffer mode, size and duration'))), (0, mithril_1.default)('a[href="#!/record/instructions"]', (0, mithril_1.default)("li".concat(routePage === 'instructions' ? '.active' : ''), (0, mithril_1.default)('i.material-icons-filled.rec', 'fiber_manual_record'), (0, mithril_1.default)('.title', 'Recording command'), (0, mithril_1.default)('.sub', 'Manually record trace'))), exports.PERSIST_CONFIG_FLAG.get() ?
        (0, mithril_1.default)('a[href="#!/record/config"]', {
            onclick: function () {
                exports.recordConfigStore.reloadFromLocalStorage();
            },
        }, (0, mithril_1.default)("li".concat(routePage === 'config' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'save'), (0, mithril_1.default)('.title', 'Saved configs'), (0, mithril_1.default)('.sub', 'Manage local configs'))) :
        null), (0, mithril_1.default)('header', 'Probes'), (0, mithril_1.default)('ul', probes));
}
function getRecordContainer(subpage) {
    var _a;
    var components = [RecordHeader()];
    if (controller.getState() === recording_page_controller_2.RecordingState.NO_TARGET) {
        components.push((0, mithril_1.default)('.full-centered', 'Please connect a valid target.'));
        return (0, mithril_1.default)('.record-container', components);
    }
    else if (controller.getState() <= recording_page_controller_2.RecordingState.ASK_TO_FORCE_P1) {
        components.push((0, mithril_1.default)('.full-centered', 'Can not access the device without resetting the ' +
            "connection. Please refresh the page, then click " +
            "'".concat(exports.FORCE_RESET_MESSAGE, ".'")));
        return (0, mithril_1.default)('.record-container', components);
    }
    else if (controller.getState() === recording_page_controller_2.RecordingState.AUTH_P1) {
        components.push((0, mithril_1.default)('.full-centered', 'Please allow USB debugging on the device.'));
        return (0, mithril_1.default)('.record-container', components);
    }
    else if (controller.getState() === recording_page_controller_2.RecordingState.WAITING_FOR_TRACE_DISPLAY) {
        components.push((0, mithril_1.default)('.full-centered', 'Waiting for the trace to be collected.'));
        return (0, mithril_1.default)('.record-container', components);
    }
    var pages = [];
    // we need to remove the `/` character from the route
    var routePage = subpage ? subpage.substr(1) : '';
    if (!exports.RECORDING_SECTIONS.includes(routePage)) {
        routePage = 'buffers';
    }
    pages.push(recordMenu(routePage));
    pages.push((0, mithril_1.default)(recording_settings_1.RecordingSettings, {
        dataSources: [],
        cssClass: (0, record_page_1.maybeGetActiveCss)(routePage, 'buffers'),
    }));
    pages.push(Instructions((0, record_page_1.maybeGetActiveCss)(routePage, 'instructions')));
    pages.push((0, record_page_1.Configurations)((0, record_page_1.maybeGetActiveCss)(routePage, 'config')));
    var settingsSections = new Map([
        ['cpu', cpu_settings_1.CpuSettings],
        ['gpu', gpu_settings_1.GpuSettings],
        ['power', power_settings_1.PowerSettings],
        ['memory', memory_settings_1.MemorySettings],
        ['android', android_settings_1.AndroidSettings],
        ['chrome', chrome_settings_1.ChromeSettings],
        ['advanced', advanced_settings_1.AdvancedSettings],
    ]);
    for (var _i = 0, _b = settingsSections.entries(); _i < _b.length; _i++) {
        var _c = _b[_i], section = _c[0], component = _c[1];
        pages.push((0, mithril_1.default)(component, {
            dataSources: ((_a = controller.getTargetInfo()) === null || _a === void 0 ? void 0 : _a.dataSources) || [],
            cssClass: (0, record_page_1.maybeGetActiveCss)(routePage, section),
        }));
    }
    components.push((0, mithril_1.default)('.record-container-content', pages));
    return (0, mithril_1.default)('.record-container', components);
}
exports.RecordPageV2 = (0, pages_1.createPage)({
    oninit: function () {
        controller.initFactories();
    },
    view: function (_a) {
        var attrs = _a.attrs;
        if (shouldDisplayTargetModal) {
            exports.fullscreenModalContainer.updateVdom(addNewTargetModal());
        }
        return (0, mithril_1.default)('.record-page', controller.getState() > recording_page_controller_2.RecordingState.TARGET_INFO_DISPLAYED ?
            (0, mithril_1.default)('.hider') :
            [], getRecordContainer(attrs.subpage));
    },
});
function setToPrevious(current) {
    var index = current - 1;
    if (index < 0) {
        index = exports.globals.currentSearchResults.totalResults - 1;
    }
    exports.globals.dispatch(actions_1.Actions.setSearchIndex({ index: index }));
}
function setToNext(current) {
    var index = (current + 1) % exports.globals.currentSearchResults.totalResults;
    exports.globals.dispatch(actions_1.Actions.setSearchIndex({ index: index }));
}
function executeSearch(reverse) {
    if (reverse === void 0) { reverse = false; }
    var index = exports.globals.state.searchIndex;
    var startNs = (0, time_4.toNs)(exports.globals.frontendLocalState.visibleWindowTime.start);
    var endNs = (0, time_4.toNs)(exports.globals.frontendLocalState.visibleWindowTime.end);
    var currentTs = exports.globals.currentSearchResults.tsStarts[index];
    // If the value of |globals.currentSearchResults.totalResults| is 0,
    // it means that the query is in progress or no results are found.
    if (exports.globals.currentSearchResults.totalResults === 0) {
        return;
    }
    // If this is a new search or the currentTs is not in the viewport,
    // select the first/last item in the viewport.
    if (index === -1 || currentTs < startNs || currentTs > endNs) {
        if (reverse) {
            var smaller = (0, binary_search_1.searchSegment)(exports.globals.currentSearchResults.tsStarts, endNs)[0];
            // If there is no item in the viewport just go to the previous.
            if (smaller === -1) {
                setToPrevious(index);
            }
            else {
                exports.globals.dispatch(actions_1.Actions.setSearchIndex({ index: smaller }));
            }
        }
        else {
            var _a = (0, binary_search_1.searchSegment)(exports.globals.currentSearchResults.tsStarts, startNs), larger = _a[1];
            // If there is no item in the viewport just go to the next.
            if (larger === -1) {
                setToNext(index);
            }
            else {
                exports.globals.dispatch(actions_1.Actions.setSearchIndex({ index: larger }));
            }
        }
    }
    else {
        // If the currentTs is in the viewport, increment the index.
        if (reverse) {
            setToPrevious(index);
        }
        else {
            setToNext(index);
        }
    }
    selectCurrentSearchResult();
}
exports.executeSearch = executeSearch;
function selectCurrentSearchResult() {
    var searchIndex = exports.globals.state.searchIndex;
    var source = exports.globals.currentSearchResults.sources[searchIndex];
    var currentId = exports.globals.currentSearchResults.sliceIds[searchIndex];
    var trackId = exports.globals.currentSearchResults.trackIds[searchIndex];
    if (currentId === undefined)
        return;
    if (source === 'cpu') {
        exports.globals.dispatch(actions_1.Actions.selectSlice({ id: currentId, trackId: trackId, scroll: true }));
    }
    else if (source === 'log') {
        exports.globals.dispatch(actions_1.Actions.selectLog({ id: currentId, trackId: trackId, scroll: true }));
    }
    else {
        // Search results only include slices from the slice table for now.
        // When we include annotations we need to pass the correct table.
        exports.globals.dispatch(actions_1.Actions.selectChromeSlice({ id: currentId, trackId: trackId, table: 'slice', scroll: true }));
    }
}
var empty_state_2 = require("../common/empty_state");
var pivot_table_query_generator_1 = require("./pivot_table_query_generator");
var pivot_table_types_1 = require("./pivot_table_types");
var reorderable_cells_1 = require("./reorderable_cells");
Object.defineProperty(exports, "ReorderableCellGroup", { enumerable: true, get: function () { return reorderable_cells_1.ReorderableCellGroup; } });
var attribute_modal_holder_1 = require("./tables/attribute_modal_holder");
Object.defineProperty(exports, "AttributeModalHolder", { enumerable: true, get: function () { return attribute_modal_holder_1.AttributeModalHolder; } });
function drillFilterColumnName(column) {
    switch (column.kind) {
        case 'argument':
            return (0, pivot_table_query_generator_1.extractArgumentExpression)(column.argument, 'slice');
        case 'regular':
            return "".concat(column.table, ".").concat(column.column);
    }
}
// Convert DrillFilter to SQL condition to be used in WHERE clause.
function renderDrillFilter(filter) {
    var column = drillFilterColumnName(filter.column);
    if (filter.value === null) {
        return "".concat(column, " IS NULL");
    }
    else if (typeof filter.value === 'number') {
        return "".concat(column, " = ").concat(filter.value);
    }
    else if (filter.value instanceof Uint8Array) {
        throw new Error("BLOB as DrillFilter not implemented");
    }
    else if (typeof filter.value === 'bigint') {
        return "".concat(column, " = ").concat(filter.value);
    }
    return "".concat(column, " = ").concat((0, string_utils_1.sqliteString)(filter.value));
}
function readableColumnName(column) {
    switch (column.kind) {
        case 'argument':
            return "Argument ".concat(column.argument);
        case 'regular':
            return "".concat(column.table, ".").concat(column.column);
    }
}
function markFirst(index) {
    if (index === 0) {
        return '.first';
    }
    return '';
}
exports.markFirst = markFirst;
var PivotTable = /** @class */ (function (_super) {
    __extends(PivotTable, _super);
    function PivotTable() {
        var _this = _super.call(this) || this;
        _this.attributeModalHolder = new attribute_modal_holder_1.AttributeModalHolder(function (arg) {
            exports.globals.dispatch(actions_1.Actions.setPivotTablePivotSelected({
                column: { kind: 'argument', argument: arg },
                selected: true,
            }));
            exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
        });
        return _this;
    }
    Object.defineProperty(PivotTable.prototype, "pivotState", {
        get: function () {
            return exports.globals.state.nonSerializableState.pivotTable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PivotTable.prototype, "constrainToArea", {
        get: function () {
            return exports.globals.state.nonSerializableState.pivotTable.constrainToArea;
        },
        enumerable: false,
        configurable: true
    });
    PivotTable.prototype.renderCanvas = function () { };
    PivotTable.prototype.renderDrillDownCell = function (area, filters) {
        var _this = this;
        return (0, mithril_1.default)('td', (0, mithril_1.default)('button', {
            title: 'All corresponding slices',
            onclick: function () {
                var queryFilters = filters.map(renderDrillFilter);
                if (_this.constrainToArea) {
                    queryFilters.push((0, pivot_table_query_generator_1.areaFilter)(area));
                }
                var query = "\n                select slice.* from slice\n                left join thread_track on slice.track_id = thread_track.id\n                left join thread using (utid)\n                left join process using (upid)\n                where ".concat(queryFilters.join(' and \n'), "\n              ");
                // TODO(ddrone): the UI of running query as if it was a canned or
                // custom query is a temporary one, replace with a proper UI.
                (0, query_result_tab_1.runQueryInNewTab)(query, 'Pivot table details');
            },
        }, (0, mithril_1.default)('i.material-icons', 'arrow_right')));
    };
    PivotTable.prototype.renderSectionRow = function (area, path, tree, result) {
        var renderedCells = [];
        for (var j = 0; j + 1 < path.length; j++) {
            renderedCells.push((0, mithril_1.default)('td', (0, mithril_1.default)('span.indent', ' '), "".concat(path[j].nextKey)));
        }
        var treeDepth = result.metadata.pivotColumns.length;
        var colspan = treeDepth - path.length + 1;
        var button = (0, mithril_1.default)('button', {
            onclick: function () {
                tree.isCollapsed = !tree.isCollapsed;
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, (0, mithril_1.default)('i.material-icons', tree.isCollapsed ? 'expand_more' : 'expand_less'));
        renderedCells.push((0, mithril_1.default)('td', { colspan: colspan }, button, "".concat(path[path.length - 1].nextKey)));
        for (var i = 0; i < result.metadata.aggregationColumns.length; i++) {
            var renderedValue = this.renderCell(result.metadata.aggregationColumns[i].column, tree.aggregates[i]);
            renderedCells.push((0, mithril_1.default)('td' + markFirst(i), renderedValue));
        }
        var drillFilters = [];
        for (var i = 0; i < path.length; i++) {
            drillFilters.push({
                value: "".concat(path[i].nextKey),
                column: result.metadata.pivotColumns[i],
            });
        }
        renderedCells.push(this.renderDrillDownCell(area, drillFilters));
        return (0, mithril_1.default)('tr', renderedCells);
    };
    PivotTable.prototype.renderCell = function (column, value) {
        if (column.kind === 'regular' &&
            (column.column === 'dur' || column.column === 'thread_dur')) {
            if (typeof value === 'number') {
                return (0, time_1.timeToCode)((0, time_4.fromNs)(value));
            }
        }
        return "".concat(value);
    };
    PivotTable.prototype.renderTree = function (area, path, tree, result, sink) {
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
            for (var _i = 0, _a = tree.children.entries(); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], childTree = _b[1];
                path.push({ tree: childTree, nextKey: key });
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
        for (var _c = 0, _d = tree.rows; _c < _d.length; _c++) {
            var row = _d[_c];
            var renderedCells = [];
            var drillFilters = [];
            var treeDepth = result.metadata.pivotColumns.length;
            for (var j = 0; j < treeDepth; j++) {
                var value_16 = this.renderCell(result.metadata.pivotColumns[j], row[j]);
                if (j < path.length) {
                    renderedCells.push((0, mithril_1.default)('td', (0, mithril_1.default)('span.indent', ' '), value_16));
                }
                else {
                    renderedCells.push((0, mithril_1.default)("td", value_16));
                }
                drillFilters.push({ column: result.metadata.pivotColumns[j], value: row[j] });
            }
            for (var j = 0; j < result.metadata.aggregationColumns.length; j++) {
                var value_17 = row[(0, pivot_table_query_generator_1.aggregationIndex)(treeDepth, j)];
                var renderedValue = this.renderCell(result.metadata.aggregationColumns[j].column, value_17);
                renderedCells.push((0, mithril_1.default)('td.aggregation' + markFirst(j), renderedValue));
            }
            renderedCells.push(this.renderDrillDownCell(area, drillFilters));
            sink.push((0, mithril_1.default)('tr', renderedCells));
        }
    };
    PivotTable.prototype.renderTotalsRow = function (queryResult) {
        var overallValuesRow = [(0, mithril_1.default)('td.total-values', { 'colspan': queryResult.metadata.pivotColumns.length }, (0, mithril_1.default)('strong', 'Total values:'))];
        for (var i = 0; i < queryResult.metadata.aggregationColumns.length; i++) {
            overallValuesRow.push((0, mithril_1.default)('td' + markFirst(i), this.renderCell(queryResult.metadata.aggregationColumns[i].column, queryResult.tree.aggregates[i])));
        }
        overallValuesRow.push((0, mithril_1.default)('td'));
        return (0, mithril_1.default)('tr', overallValuesRow);
    };
    PivotTable.prototype.sortingItem = function (aggregationIndex, order) {
        return {
            itemType: 'regular',
            text: order === 'DESC' ? 'Highest first' : 'Lowest first',
            callback: function () {
                exports.globals.dispatch(actions_1.Actions.setPivotTableSortColumn({ aggregationIndex: aggregationIndex, order: order }));
                exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
            },
        };
    };
    PivotTable.prototype.readableAggregationName = function (aggregation) {
        if (aggregation.aggregationFunction === 'COUNT') {
            return 'Count';
        }
        return "".concat(aggregation.aggregationFunction, "(").concat(readableColumnName(aggregation.column), ")");
    };
    PivotTable.prototype.aggregationPopupItem = function (aggregation, index, nameOverride) {
        return {
            itemType: 'regular',
            text: nameOverride !== null && nameOverride !== void 0 ? nameOverride : readableColumnName(aggregation.column),
            callback: function () {
                exports.globals.dispatch(actions_1.Actions.addPivotTableAggregation({ aggregation: aggregation, after: index }));
                exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
            },
        };
    };
    PivotTable.prototype.aggregationPopupTableGroup = function (table, columns, index) {
        var items = [];
        for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
            var column = columns_2[_i];
            var tableColumn = { kind: 'regular', table: table, column: column };
            items.push(this.aggregationPopupItem({ aggregationFunction: 'SUM', column: tableColumn }, index));
        }
        if (items.length === 0) {
            return undefined;
        }
        return {
            itemType: 'group',
            itemId: "aggregations-".concat(table),
            text: "Add ".concat(table, " aggregation"),
            children: items,
        };
    };
    PivotTable.prototype.renderAggregationHeaderCell = function (aggregation, index, removeItem) {
        var popupItems = [];
        var state = exports.globals.state.nonSerializableState.pivotTable;
        if (aggregation.sortDirection === undefined) {
            popupItems.push(this.sortingItem(index, 'DESC'), this.sortingItem(index, 'ASC'));
        }
        else {
            // Table is already sorted by the same column, return one item with
            // opposite direction.
            popupItems.push(this.sortingItem(index, aggregation.sortDirection === 'DESC' ? 'ASC' : 'DESC'));
        }
        var otherAggs = ['SUM', 'MAX', 'MIN', 'AVG'];
        if (aggregation.aggregationFunction !== 'COUNT') {
            var _loop_5 = function (otherAgg) {
                if (aggregation.aggregationFunction === otherAgg) {
                    return "continue";
                }
                popupItems.push({
                    itemType: 'regular',
                    text: otherAgg,
                    callback: function () {
                        exports.globals.dispatch(actions_1.Actions.setPivotTableAggregationFunction({ index: index, function: otherAgg }));
                        exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
                    },
                });
            };
            for (var _i = 0, otherAggs_1 = otherAggs; _i < otherAggs_1.length; _i++) {
                var otherAgg = otherAggs_1[_i];
                _loop_5(otherAgg);
            }
        }
        if (removeItem) {
            popupItems.push({
                itemType: 'regular',
                text: 'Remove',
                callback: function () {
                    exports.globals.dispatch(actions_1.Actions.removePivotTableAggregation({ index: index }));
                    exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
                },
            });
        }
        var hasCount = false;
        for (var _a = 0, _b = state.selectedAggregations.values(); _a < _b.length; _a++) {
            var agg = _b[_a];
            if (agg.aggregationFunction === 'COUNT') {
                hasCount = true;
            }
        }
        if (!hasCount) {
            popupItems.push(this.aggregationPopupItem(empty_state_2.COUNT_AGGREGATION, index, 'Add count aggregation'));
        }
        var sliceAggregationsItem = this.aggregationPopupTableGroup('slice', exports.sliceAggregationColumns, index);
        if (sliceAggregationsItem !== undefined) {
            popupItems.push(sliceAggregationsItem);
        }
        return {
            extraClass: '.aggregation' + markFirst(index),
            content: [
                this.readableAggregationName(aggregation),
                (0, mithril_1.default)(popup_menu_1.PopupMenuButton, {
                    icon: (0, popup_menu_1.popupMenuIcon)(aggregation.sortDirection),
                    items: popupItems,
                }),
            ],
        };
    };
    PivotTable.prototype.renderPivotColumnHeader = function (queryResult, pivot, selectedPivots) {
        var _this = this;
        var items = [{
                itemType: 'regular',
                text: 'Add argument pivot',
                callback: function () {
                    _this.attributeModalHolder.start();
                },
            }];
        if (queryResult.metadata.pivotColumns.length > 1) {
            items.push({
                itemType: 'regular',
                text: 'Remove',
                callback: function () {
                    exports.globals.dispatch(actions_1.Actions.setPivotTablePivotSelected({ column: pivot, selected: false }));
                    exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
                },
            });
        }
        for (var _i = 0, tables_1 = exports.tables; _i < tables_1.length; _i++) {
            var table = tables_1[_i];
            var group = [];
            var _loop_6 = function (columnName) {
                var column = {
                    kind: 'regular',
                    table: table.name,
                    column: columnName,
                };
                if (selectedPivots.has((0, pivot_table_types_1.columnKey)(column))) {
                    return "continue";
                }
                group.push({
                    itemType: 'regular',
                    text: columnName,
                    callback: function () {
                        exports.globals.dispatch(actions_1.Actions.setPivotTablePivotSelected({ column: column, selected: true }));
                        exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
                    },
                });
            };
            for (var _a = 0, _b = table.columns; _a < _b.length; _a++) {
                var columnName = _b[_a];
                _loop_6(columnName);
            }
            items.push({
                itemType: 'group',
                itemId: "pivot-".concat(table.name),
                text: "Add ".concat(table.name, " pivot"),
                children: group,
            });
        }
        return {
            content: [
                readableColumnName(pivot),
                (0, mithril_1.default)(popup_menu_1.PopupMenuButton, { icon: 'more_horiz', items: items }),
            ],
        };
    };
    PivotTable.prototype.renderResultsTable = function (attrs) {
        var _this = this;
        var state = exports.globals.state.nonSerializableState.pivotTable;
        if (state.queryResult === null) {
            return (0, mithril_1.default)('div', 'Loading...');
        }
        var queryResult = state.queryResult;
        var renderedRows = [];
        var tree = state.queryResult.tree;
        if (tree.children.size === 0 && tree.rows.length === 0) {
            // Empty result, render a special message
            return (0, mithril_1.default)('.empty-result', 'No slices in the current selection.');
        }
        this.renderTree(exports.globals.state.areas[attrs.selectionArea.areaId], [], tree, state.queryResult, renderedRows);
        var selectedPivots = new Set(this.pivotState.selectedPivots.map(pivot_table_types_1.columnKey));
        var pivotTableHeaders = state.selectedPivots.map(function (pivot) {
            return _this.renderPivotColumnHeader(queryResult, pivot, selectedPivots);
        });
        var removeItem = state.queryResult.metadata.aggregationColumns.length > 1;
        var aggregationTableHeaders = state.queryResult.metadata.aggregationColumns.map(function (aggregation, index) { return _this.renderAggregationHeaderCell(aggregation, index, removeItem); });
        return (0, mithril_1.default)('table.pivot-table', (0, mithril_1.default)('thead', 
        // First row of the table, containing names of pivot and aggregation
        // columns, as well as popup menus to modify the columns. Last cell
        // is empty because of an extra column with "drill down" button for
        // each pivot table row.
        (0, mithril_1.default)('tr.header', (0, mithril_1.default)(reorderable_cells_1.ReorderableCellGroup, {
            cells: pivotTableHeaders,
            onReorder: function (from, to, direction) {
                exports.globals.dispatch(actions_1.Actions.changePivotTablePivotOrder({ from: from, to: to, direction: direction }));
                exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
            },
        }), (0, mithril_1.default)(reorderable_cells_1.ReorderableCellGroup, {
            cells: aggregationTableHeaders,
            onReorder: function (from, to, direction) {
                exports.globals.dispatch(actions_1.Actions.changePivotTableAggregationOrder({ from: from, to: to, direction: direction }));
                exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
            },
        }), (0, mithril_1.default)('td.menu', (0, mithril_1.default)(popup_menu_1.PopupMenuButton, {
            icon: 'menu',
            items: [{
                    itemType: 'regular',
                    text: state.constrainToArea ?
                        'Query data for the whole timeline' :
                        'Constrain to selected area',
                    callback: function () {
                        exports.globals.dispatch(actions_1.Actions.setPivotTableConstrainToArea({ constrain: !state.constrainToArea }));
                        exports.globals.dispatch(actions_1.Actions.setPivotTableQueryRequested({ queryRequested: true }));
                    },
                }],
        })))), (0, mithril_1.default)('tbody', this.renderTotalsRow(state.queryResult), renderedRows));
    };
    PivotTable.prototype.view = function (_a) {
        var attrs = _a.attrs;
        this.attributeModalHolder.update();
        return (0, mithril_1.default)('.pivot-table', this.renderResultsTable(attrs));
    };
    return PivotTable;
}(panel_1.Panel));
exports.PivotTable = PivotTable;
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
var flamegraph_2 = require("./flamegraph");
test('textGoingToMultipleLines', function () {
    var text = 'Dummy text to go to multiple lines.';
    var lineSplitter = (0, flamegraph_2.splitIfTooBig)(text, 7 + 32, text.length);
    expect(lineSplitter).toEqual({
        lines: ['Dummy t', 'ext to ', 'go to m', 'ultiple', ' lines.'],
        lineWidth: 7,
    });
});
test('emptyText', function () {
    var text = '';
    var lineSplitter = (0, flamegraph_2.splitIfTooBig)(text, 10, 5);
    expect(lineSplitter).toEqual({ lines: [], lineWidth: 5 });
});
test('textEnoughForOneLine', function () {
    var text = 'Dummy text to go to one lines.';
    var lineSplitter = (0, flamegraph_2.splitIfTooBig)(text, text.length + 32, text.length);
    expect(lineSplitter).toEqual({ lines: [text], lineWidth: text.length });
});
test('textGoingToTwoLines', function () {
    var text = 'Dummy text to go to two lines.';
    var lineSplitter = (0, flamegraph_2.splitIfTooBig)(text, text.length / 2 + 32, text.length);
    expect(lineSplitter).toEqual({
        lines: ['Dummy text to g', 'o to two lines.'],
        lineWidth: text.length / 2,
    });
});
var uuid_1 = require("uuid");
var queries_1 = require("../common/queries");
var query_result_3 = require("../common/query_result");
var add_debug_track_menu_1 = require("../tracks/debug/add_debug_track_menu");
var bottom_tab_2 = require("./bottom_tab");
var query_table_1 = require("./query_table");
Object.defineProperty(exports, "QueryTable", { enumerable: true, get: function () { return query_table_1.QueryTable; } });
function runQueryInNewTab(query, title, tag) {
    return (0, bottom_tab_2.addTab)({
        kind: query_result_tab_2.QueryResultTab.kind,
        tag: tag,
        config: {
            query: query,
            title: title,
        },
    });
}
exports.runQueryInNewTab = runQueryInNewTab;
var QueryResultTab = /** @class */ (function (_super) {
    __extends(QueryResultTab, _super);
    function QueryResultTab(args) {
        var _this = _super.call(this, args) || this;
        _this.initTrack(args);
        return _this;
    }
    QueryResultTab.create = function (args) {
        return new query_result_tab_2.QueryResultTab(args);
    };
    QueryResultTab.prototype.initTrack = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var uuid, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uuid = '';
                        if (!(this.config.prefetchedResponse !== undefined)) return [3 /*break*/, 1];
                        this.queryResponse = this.config.prefetchedResponse;
                        uuid = args.uuid;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, (0, queries_1.runQuery)(this.config.query, this.engine)];
                    case 2:
                        result = _b.sent();
                        this.queryResponse = result;
                        exports.globals.rafScheduler.scheduleFullRedraw();
                        if (result.error !== undefined) {
                            return [2 /*return*/];
                        }
                        uuid = (0, uuid_1.v4)();
                        _b.label = 3;
                    case 3:
                        if (!(uuid !== '')) return [3 /*break*/, 5];
                        _a = this;
                        return [4 /*yield*/, this.createViewForDebugTrack(uuid)];
                    case 4:
                        _a.sqlViewName = _b.sent();
                        if (this.sqlViewName) {
                            exports.globals.rafScheduler.scheduleFullRedraw();
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    QueryResultTab.prototype.getTitle = function () {
        var suffix = this.queryResponse ? " (".concat(this.queryResponse.rows.length, ")") : '';
        return "".concat(this.config.title).concat(suffix);
    };
    QueryResultTab.prototype.viewTab = function () {
        var _this = this;
        return (0, mithril_1.default)(query_table_1.QueryTable, {
            query: this.config.query,
            resp: this.queryResponse,
            onClose: function () { return (0, bottom_tab_2.closeTab)(_this.uuid); },
            contextButtons: [
                this.sqlViewName === undefined ?
                    null :
                    (0, mithril_1.default)(popup_1.Popup, {
                        trigger: (0, mithril_1.default)(button_1.Button, { label: 'Show debug track', minimal: true }),
                        position: popup_1.PopupPosition.Top,
                    }, (0, mithril_1.default)(add_debug_track_menu_1.AddDebugTrackMenu, {
                        sqlViewName: this.sqlViewName,
                        columns: (0, logging_2.assertExists)(this.queryResponse).columns,
                        engine: this.engine,
                    })),
            ],
        });
    };
    QueryResultTab.prototype.isLoading = function () {
        return this.queryResponse === undefined;
    };
    QueryResultTab.prototype.renderTabCanvas = function () { };
    QueryResultTab.prototype.createViewForDebugTrack = function (uuid) {
        return __awaiter(this, void 0, Promise, function () {
            var viewId, createViewResult, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewId = (0, add_debug_track_menu_1.uuidToViewName)(uuid);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.engine.query("create view ".concat(viewId, " as ").concat(this.config.query))];
                    case 2:
                        createViewResult = _a.sent();
                        if (createViewResult.error()) {
                            // If it failed, do nothing.
                            return [2 /*return*/, ''];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        if (e_3 instanceof query_result_3.QueryError) {
                            // If it failed, do nothing.
                            return [2 /*return*/, ''];
                        }
                        throw e_3;
                    case 4: return [2 /*return*/, viewId];
                }
            });
        });
    };
    QueryResultTab.kind = 'org.perfetto.QueryResultTab';
    return QueryResultTab;
}(bottom_tab_1.BottomTab));
exports.QueryResultTab = QueryResultTab;
exports.bottomTabRegistry.register(query_result_tab_2.QueryResultTab);
// Clean up repeated whitespaces to allow for easier testing.
function normalize(s) {
    return s.replace(/\s+/g, ' ');
}
test('constraintsToQueryFragment: where', function () {
    expect(normalize((0, sql_utils_2.constraintsToQueryFragment)({
        filters: ['ts > 1000', 'dur != 0'],
    }))).toEqual('WHERE ts > 1000 and dur != 0');
});
test('constraintsToQueryFragment: order by', function () {
    expect(normalize((0, sql_utils_2.constraintsToQueryFragment)({
        orderBy: [{ fieldName: 'name' }, { fieldName: 'count', direction: 'DESC' }],
    }))).toEqual('ORDER BY name, count DESC');
});
test('constraintsToQueryFragment: limit', function () {
    expect(normalize((0, sql_utils_2.constraintsToQueryFragment)({ limit: 3 }))).toEqual('LIMIT 3');
});
test('constraintsToQueryFragment: all', function () {
    expect(normalize((0, sql_utils_2.constraintsToQueryFragment)({
        filters: ['id != 1'],
        orderBy: [{ fieldName: 'ts' }],
        limit: 1,
    }))).toEqual('WHERE id != 1 ORDER BY ts LIMIT 1');
});
exports.BUCKETS_PER_PIXEL = 2;
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
var CacheKey = /** @class */ (function () {
    function CacheKey(startNs, endNs, bucketNs, windowSizePx) {
        this.startNs = startNs;
        this.endNs = endNs;
        this.bucketNs = bucketNs;
        this.windowSizePx = windowSizePx;
    }
    CacheKey.create = function (startNs, endNs, windowSizePx) {
        var bucketNs = (endNs - startNs) / (windowSizePx * exports.BUCKETS_PER_PIXEL);
        return new track_cache_1.CacheKey(startNs, endNs, bucketNs, windowSizePx);
    };
    CacheKey.zero = function () {
        return new track_cache_1.CacheKey(0, 0, 0, 100);
    };
    Object.defineProperty(CacheKey.prototype, "normalizedBucketNs", {
        get: function () {
            // Round bucketNs down to the nearest smaller power of 2 (minimum 1):
            return Math.max(1, Math.pow(2, Math.floor(Math.log2(this.bucketNs))));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CacheKey.prototype, "normalizedWindowSizePx", {
        get: function () {
            return Math.max(100, Math.round(this.windowSizePx / 100) * 100);
        },
        enumerable: false,
        configurable: true
    });
    CacheKey.prototype.normalize = function () {
        var windowSizePx = this.normalizedWindowSizePx;
        var bucketNs = this.normalizedBucketNs;
        var windowNs = windowSizePx * exports.BUCKETS_PER_PIXEL * bucketNs;
        var startNs = Math.floor(this.startNs / windowNs) * windowNs;
        var endNs = Math.ceil(this.endNs / windowNs) * windowNs;
        return new track_cache_1.CacheKey(startNs, endNs, bucketNs, windowSizePx);
    };
    CacheKey.prototype.isNormalized = function () {
        return this.toString() === this.normalize().toString();
    };
    CacheKey.prototype.isCoveredBy = function (other) {
        var r = true;
        r = r && other.startNs <= this.startNs;
        r = r && other.endNs >= this.endNs;
        r = r && other.normalizedBucketNs === this.normalizedBucketNs;
        r = r && other.normalizedWindowSizePx === this.normalizedWindowSizePx;
        return r;
    };
    // toString is 'load bearing' in that it's used to key e.g. caches
    // with CacheKey's.
    CacheKey.prototype.toString = function () {
        var start = this.startNs;
        var end = this.endNs;
        var bucket = this.bucketNs;
        var size = this.windowSizePx;
        return "CacheKey<".concat(start, ", ").concat(end, ", ").concat(bucket, ", ").concat(size, ">");
    };
    return CacheKey;
}());
exports.CacheKey = CacheKey;
// LRU cache for the tracks.
// T is all the data needed for a displaying the track in a given
// CacheKey area - generally an array of slices.
var TrackCache = /** @class */ (function () {
    function TrackCache(cacheSize) {
        (0, logging_1.assertTrue)(cacheSize >= 2);
        this.cacheSize = cacheSize;
        this.cache = new Map();
        this.lastAccessId = 0;
    }
    TrackCache.prototype.insert = function (cacheKey, t) {
        (0, logging_1.assertTrue)(cacheKey.isNormalized());
        var key = cacheKey.toString();
        this.cache.set(key, {
            t: t,
            lastAccessId: this.lastAccessId++,
        });
        this.updateLru();
    };
    TrackCache.prototype.lookup = function (cacheKey) {
        (0, logging_1.assertTrue)(cacheKey.isNormalized());
        var key = cacheKey.toString();
        var item = this.cache.get(key);
        if (item) {
            item.lastAccessId = this.lastAccessId++;
            this.updateLru();
        }
        return item === undefined ? undefined : item.t;
    };
    TrackCache.prototype.updateLru = function () {
        while (this.cache.size > this.cacheSize) {
            var oldestKey = '';
            var oldestAccessId = Number.MAX_SAFE_INTEGER;
            for (var _i = 0, _a = this.cache.entries(); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.lastAccessId < oldestAccessId) {
                    oldestAccessId = v.lastAccessId;
                    oldestKey = k;
                }
            }
            this.cache.delete(oldestKey);
        }
    };
    return TrackCache;
}());
exports.TrackCache = TrackCache;
var slice_aggregation_controller_1 = require("../controller/aggregation/slice_aggregation_controller");
exports.sliceTable = {
    name: 'slice',
    columns: ['type', 'ts', 'dur', 'category', 'name', 'depth'],
};
// Columns of `slice` table available for aggregation.
exports.sliceAggregationColumns = [
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
exports.tables = [
    exports.sliceTable,
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
    { name: 'thread', columns: ['type', 'name', 'tid', 'upid', 'is_main_thread'] },
    { name: 'thread_track', columns: ['type', 'name', 'utid'] },
];
// Exception thrown by query generator in case incoming parameters are not
// suitable in order to build a correct query; these are caught by the UI and
// displayed to the user.
var QueryGeneratorError = /** @class */ (function (_super) {
    __extends(QueryGeneratorError, _super);
    function QueryGeneratorError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueryGeneratorError;
}(Error));
exports.QueryGeneratorError = QueryGeneratorError;
// Internal column name for different rollover levels of aggregate columns.
function aggregationAlias(aggregationIndex) {
    return "agg_".concat(aggregationIndex);
}
function areaFilter(area) {
    return "\n    ts + dur > ".concat((0, time_4.toNs)(area.startSec), "\n    and ts < ").concat((0, time_4.toNs)(area.endSec), "\n    and track_id in (").concat((0, slice_aggregation_controller_1.getSelectedTrackIds)(area).join(', '), ")\n  ");
}
exports.areaFilter = areaFilter;
function expression(column) {
    switch (column.kind) {
        case 'regular':
            return "".concat(column.table, ".").concat(column.column);
        case 'argument':
            return (0, pivot_table_query_generator_1.extractArgumentExpression)(column.argument, 'slice');
    }
}
exports.expression = expression;
function aggregationExpression(aggregation) {
    if (aggregation.aggregationFunction === 'COUNT') {
        return 'COUNT()';
    }
    return "".concat(aggregation.aggregationFunction, "(").concat(expression(aggregation.column), ")");
}
function extractArgumentExpression(argument, table) {
    var prefix = table === undefined ? '' : "".concat(table, ".");
    return "extract_arg(".concat(prefix, "arg_set_id, ").concat((0, string_utils_1.sqliteString)(argument), ")");
}
exports.extractArgumentExpression = extractArgumentExpression;
function aggregationIndex(pivotColumns, aggregationNo) {
    return pivotColumns + aggregationNo;
}
exports.aggregationIndex = aggregationIndex;
function generateQueryFromState(state) {
    if (state.selectionArea === undefined) {
        throw new QueryGeneratorError('Should not be called without area');
    }
    var sliceTableAggregations = __spreadArray([], state.selectedAggregations.values(), true);
    if (sliceTableAggregations.length === 0) {
        throw new QueryGeneratorError('No aggregations selected');
    }
    var pivots = state.selectedPivots;
    var aggregations = sliceTableAggregations.map(function (agg, index) {
        return "".concat(aggregationExpression(agg), " as ").concat(aggregationAlias(index));
    });
    var countIndex = aggregations.length;
    // Extra count aggregation, needed in order to compute combined averages.
    aggregations.push('COUNT() as hidden_count');
    var renderedPivots = pivots.map(expression);
    var sortClauses = [];
    for (var i = 0; i < sliceTableAggregations.length; i++) {
        var sortDirection = sliceTableAggregations[i].sortDirection;
        if (sortDirection !== undefined) {
            sortClauses.push("".concat(aggregationAlias(i), " ").concat(sortDirection));
        }
    }
    var joins = "\n    left join thread_track on thread_track.id = slice.track_id\n    left join thread using (utid)\n    left join process using (upid)\n  ";
    var whereClause = state.constrainToArea ?
        "where ".concat((0, pivot_table_query_generator_1.areaFilter)(exports.globals.state.areas[state.selectionArea.areaId])) :
        '';
    var text = "\n    select\n      ".concat(renderedPivots.concat(aggregations).join(',\n'), "\n    from slice\n    ").concat(pivots.length > 0 ? joins : '', "\n    ").concat(whereClause, "\n    group by ").concat(renderedPivots.join(', '), "\n    ").concat(sortClauses.length > 0 ? ('order by ' + sortClauses.join(', ')) : '', "\n  ");
    return {
        text: text,
        metadata: {
            pivotColumns: pivots,
            aggregationColumns: sliceTableAggregations,
            countIndex: countIndex,
        },
    };
}
exports.generateQueryFromState = generateQueryFromState;
var selection_observer_1 = require("../common/selection_observer");
var details_tab_1 = require("../tracks/debug/details_tab");
var aggregation_panel_1 = require("./aggregation_panel");
Object.defineProperty(exports, "AggregationPanel", { enumerable: true, get: function () { return aggregation_panel_1.AggregationPanel; } });
var chrome_slice_panel_1 = require("./chrome_slice_panel");
Object.defineProperty(exports, "ChromeSliceDetailsPanel", { enumerable: true, get: function () { return chrome_slice_panel_1.ChromeSliceDetailsPanel; } });
var counter_panel_1 = require("./counter_panel");
Object.defineProperty(exports, "CounterDetailsPanel", { enumerable: true, get: function () { return counter_panel_1.CounterDetailsPanel; } });
var cpu_profile_panel_1 = require("./cpu_profile_panel");
Object.defineProperty(exports, "CpuProfileDetailsPanel", { enumerable: true, get: function () { return cpu_profile_panel_1.CpuProfileDetailsPanel; } });
var css_constants_7 = require("./css_constants");
var flamegraph_panel_1 = require("./flamegraph_panel");
Object.defineProperty(exports, "FlamegraphDetailsPanel", { enumerable: true, get: function () { return flamegraph_panel_1.FlamegraphDetailsPanel; } });
var flow_events_panel_1 = require("./flow_events_panel");
Object.defineProperty(exports, "FlowEventsAreaSelectedPanel", { enumerable: true, get: function () { return flow_events_panel_1.FlowEventsAreaSelectedPanel; } });
Object.defineProperty(exports, "FlowEventsPanel", { enumerable: true, get: function () { return flow_events_panel_1.FlowEventsPanel; } });
var ftrace_panel_1 = require("./ftrace_panel");
Object.defineProperty(exports, "FtracePanel", { enumerable: true, get: function () { return ftrace_panel_1.FtracePanel; } });
var logs_panel_1 = require("./logs_panel");
Object.defineProperty(exports, "LogPanel", { enumerable: true, get: function () { return logs_panel_1.LogPanel; } });
var notes_panel_2 = require("./notes_panel");
Object.defineProperty(exports, "NotesEditorTab", { enumerable: true, get: function () { return notes_panel_2.NotesEditorTab; } });
var pivot_table_1 = require("./pivot_table");
Object.defineProperty(exports, "PivotTable", { enumerable: true, get: function () { return pivot_table_1.PivotTable; } });
var slice_details_panel_1 = require("./slice_details_panel");
Object.defineProperty(exports, "SliceDetailsPanel", { enumerable: true, get: function () { return slice_details_panel_1.SliceDetailsPanel; } });
var thread_state_tab_1 = require("./thread_state_tab");
Object.defineProperty(exports, "ThreadStateTab", { enumerable: true, get: function () { return thread_state_tab_1.ThreadStateTab; } });
var UP_ICON = 'keyboard_arrow_up';
var DOWN_ICON = 'keyboard_arrow_down';
var DRAG_HANDLE_HEIGHT_PX = 28;
function getDetailsHeight() {
    // This needs to be a function instead of a const to ensure the CSS constants
    // have been initialized by the time we perform this calculation;
    return exports.DEFAULT_DETAILS_CONTENT_HEIGHT + DRAG_HANDLE_HEIGHT_PX;
}
function getFullScreenHeight() {
    var panelContainer = document.querySelector('.pan-and-zoom-content');
    if (panelContainer !== null) {
        return panelContainer.clientHeight;
    }
    else {
        return getDetailsHeight();
    }
}
function hasLogs() {
    var data = exports.globals.trackDataStore.get(logs_1.LogExistsKey);
    return data && data.exists;
}
var DragHandle = /** @class */ (function () {
    function DragHandle() {
        this.dragStartHeight = 0;
        this.height = 0;
        this.previousHeight = this.height;
        this.resize = function () { };
        this.isClosed = this.height <= DRAG_HANDLE_HEIGHT_PX;
        this.isFullscreen = false;
        // We can't get real fullscreen height until the pan_and_zoom_handler exists.
        this.fullscreenHeight = getDetailsHeight();
    }
    DragHandle.prototype.oncreate = function (_a) {
        var dom = _a.dom, attrs = _a.attrs;
        this.resize = attrs.resize;
        this.height = attrs.height;
        this.isClosed = this.height <= DRAG_HANDLE_HEIGHT_PX;
        this.fullscreenHeight = getFullScreenHeight();
        var elem = dom;
        new drag_gesture_handler_1.DragGestureHandler(elem, this.onDrag.bind(this), this.onDragStart.bind(this), this.onDragEnd.bind(this));
    };
    DragHandle.prototype.onupdate = function (_a) {
        var attrs = _a.attrs;
        this.resize = attrs.resize;
        this.height = attrs.height;
        this.isClosed = this.height <= DRAG_HANDLE_HEIGHT_PX;
    };
    DragHandle.prototype.onDrag = function (_x, y) {
        var newHeight = Math.floor(this.dragStartHeight + (DRAG_HANDLE_HEIGHT_PX / 2) - y);
        this.isClosed = newHeight <= DRAG_HANDLE_HEIGHT_PX;
        this.isFullscreen = newHeight >= this.fullscreenHeight;
        this.resize(newHeight);
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    DragHandle.prototype.onDragStart = function (_x, _y) {
        this.dragStartHeight = this.height;
    };
    DragHandle.prototype.onDragEnd = function () { };
    DragHandle.prototype.view = function (_a) {
        var _this = this;
        var attrs = _a.attrs;
        var icon = this.isClosed ? UP_ICON : DOWN_ICON;
        var title = this.isClosed ? 'Show panel' : 'Hide panel';
        var renderTab = function (tab) {
            if (attrs.currentTabKey === tab.key) {
                return (0, mithril_1.default)('.tab[active]', tab.name);
            }
            return (0, mithril_1.default)('.tab', {
                onclick: function () {
                    exports.globals.dispatch(actions_1.Actions.setCurrentTab({ tab: tab.key }));
                },
            }, tab.name);
        };
        return (0, mithril_1.default)('.handle', (0, mithril_1.default)('.tabs', attrs.tabs.map(renderTab)), (0, mithril_1.default)('.buttons', (0, mithril_1.default)('i.material-icons', {
            onclick: function () {
                _this.isClosed = false;
                _this.isFullscreen = true;
                _this.resize(_this.fullscreenHeight);
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
            title: 'Open fullscreen',
            disabled: this.isFullscreen,
        }, 'vertical_align_top'), (0, mithril_1.default)('i.material-icons', {
            onclick: function () {
                if (_this.height === DRAG_HANDLE_HEIGHT_PX) {
                    _this.isClosed = false;
                    if (_this.previousHeight === 0) {
                        _this.previousHeight = getDetailsHeight();
                    }
                    _this.resize(_this.previousHeight);
                }
                else {
                    _this.isFullscreen = false;
                    _this.isClosed = true;
                    _this.previousHeight = _this.height;
                    _this.resize(DRAG_HANDLE_HEIGHT_PX);
                }
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
            title: title,
        }, icon)));
    };
    return DragHandle;
}());
function handleSelectionChange(newSelection, _) {
    var currentSelectionTag = 'current_selection';
    var bottomTabList = exports.globals.bottomTabList;
    if (!bottomTabList)
        return;
    if (newSelection === undefined) {
        bottomTabList.closeTabByTag(currentSelectionTag);
        return;
    }
    switch (newSelection.kind) {
        case 'NOTE':
            bottomTabList.addTab({
                kind: notes_panel_2.NotesEditorTab.kind,
                tag: currentSelectionTag,
                config: {
                    id: newSelection.id,
                },
            });
            break;
        case 'AREA':
            if (newSelection.noteId !== undefined) {
                bottomTabList.addTab({
                    kind: notes_panel_2.NotesEditorTab.kind,
                    tag: currentSelectionTag,
                    config: {
                        id: newSelection.noteId,
                    },
                });
            }
            break;
        case 'THREAD_STATE':
            bottomTabList.addTab({
                kind: thread_state_tab_1.ThreadStateTab.kind,
                tag: currentSelectionTag,
                config: {
                    id: newSelection.id,
                },
            });
            break;
        case 'DEBUG_SLICE':
            bottomTabList.addTab({
                kind: details_tab_1.DebugSliceDetailsTab.kind,
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
(0, selection_observer_1.addSelectionChangeObserver)(handleSelectionChange);
var DetailsPanel = /** @class */ (function () {
    function DetailsPanel() {
        this.detailsHeight = getDetailsHeight();
    }
    DetailsPanel.prototype.view = function () {
        var _this = this;
        var _a;
        var detailsPanels = [];
        if (exports.globals.bottomTabList) {
            for (var _i = 0, _b = exports.globals.bottomTabList.getTabs(); _i < _b.length; _i++) {
                var tab = _b[_i];
                detailsPanels.push({
                    key: (_a = tab.tag) !== null && _a !== void 0 ? _a : tab.uuid,
                    name: tab.getTitle(),
                    vnode: tab.createPanelVnode(),
                });
            }
        }
        var curSelection = exports.globals.state.currentSelection;
        if (curSelection) {
            switch (curSelection.kind) {
                case 'NOTE':
                    // Handled in handleSelectionChange.
                    break;
                case 'AREA':
                    if (exports.globals.flamegraphDetails.isInAreaSelection) {
                        detailsPanels.push({
                            key: 'flamegraph_selection',
                            name: 'Flamegraph Selection',
                            vnode: (0, mithril_1.default)(flamegraph_panel_1.FlamegraphDetailsPanel, { key: 'flamegraph' }),
                        });
                    }
                    break;
                case 'SLICE':
                    detailsPanels.push({
                        key: 'current_selection',
                        name: 'Current Selection',
                        vnode: (0, mithril_1.default)(slice_details_panel_1.SliceDetailsPanel, {
                            key: 'slice',
                        }),
                    });
                    break;
                case 'COUNTER':
                    detailsPanels.push({
                        key: 'current_selection',
                        name: 'Current Selection',
                        vnode: (0, mithril_1.default)(counter_panel_1.CounterDetailsPanel, {
                            key: 'counter',
                        }),
                    });
                    break;
                case 'PERF_SAMPLES':
                case 'HEAP_PROFILE':
                    detailsPanels.push({
                        key: 'current_selection',
                        name: 'Current Selection',
                        vnode: (0, mithril_1.default)(flamegraph_panel_1.FlamegraphDetailsPanel, { key: 'flamegraph' }),
                    });
                    break;
                case 'CPU_PROFILE_SAMPLE':
                    detailsPanels.push({
                        key: 'current_selection',
                        name: 'Current Selection',
                        vnode: (0, mithril_1.default)(cpu_profile_panel_1.CpuProfileDetailsPanel, {
                            key: 'cpu_profile_sample',
                        }),
                    });
                    break;
                case 'CHROME_SLICE':
                    detailsPanels.push({
                        key: 'current_selection',
                        name: 'Current Selection',
                        vnode: (0, mithril_1.default)(chrome_slice_panel_1.ChromeSliceDetailsPanel, { key: 'chrome_slice' }),
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
                vnode: (0, mithril_1.default)(logs_panel_1.LogPanel, { key: 'logs_panel' }),
            });
        }
        var trackGroup = exports.globals.state.trackGroups['ftrace-track-group'];
        if (trackGroup) {
            var collapsed = trackGroup.collapsed;
            if (!collapsed) {
                detailsPanels.push({
                    key: 'ftrace_events',
                    name: 'Ftrace Events',
                    vnode: (0, mithril_1.default)(ftrace_panel_1.FtracePanel, { key: 'ftrace_panel' }),
                });
            }
        }
        if (exports.globals.state.nonSerializableState.pivotTable.selectionArea !==
            undefined) {
            detailsPanels.push({
                key: 'pivot_table',
                name: 'Pivot Table',
                vnode: (0, mithril_1.default)(pivot_table_1.PivotTable, {
                    key: 'pivot_table',
                    selectionArea: exports.globals.state.nonSerializableState.pivotTable.selectionArea,
                }),
            });
        }
        if (exports.globals.connectedFlows.length > 0) {
            detailsPanels.push({
                key: 'bound_flows',
                name: 'Flow Events',
                vnode: (0, mithril_1.default)(flow_events_panel_1.FlowEventsPanel, { key: 'flow_events' }),
            });
        }
        for (var _c = 0, _d = exports.globals.aggregateDataStore.entries(); _c < _d.length; _c++) {
            var _e = _d[_c], key = _e[0], value_18 = _e[1];
            if (!(0, aggregation_data_1.isEmptyData)(value_18)) {
                detailsPanels.push({
                    key: value_18.tabName,
                    name: value_18.tabName,
                    vnode: (0, mithril_1.default)(aggregation_panel_1.AggregationPanel, { kind: key, key: key, data: value_18 }),
                });
            }
        }
        // Add this after all aggregation panels, to make it appear after 'Slices'
        if (exports.globals.selectedFlows.length > 0) {
            detailsPanels.push({
                key: 'selected_flows',
                name: 'Flow Events',
                vnode: (0, mithril_1.default)(flow_events_panel_1.FlowEventsAreaSelectedPanel, { key: 'flow_events_area' }),
            });
        }
        var currentTabDetails = detailsPanels.find(function (tab) { return tab.key === exports.globals.state.currentTab; });
        if (currentTabDetails === undefined && detailsPanels.length > 0) {
            currentTabDetails = detailsPanels[0];
        }
        var panel = currentTabDetails === null || currentTabDetails === void 0 ? void 0 : currentTabDetails.vnode;
        var panels = panel ? [panel] : [];
        return (0, mithril_1.default)('.details-content', {
            style: {
                height: "".concat(this.detailsHeight, "px"),
                display: detailsPanels.length > 0 ? null : 'none',
            },
        }, (0, mithril_1.default)(DragHandle, {
            resize: function (height) {
                _this.detailsHeight = Math.max(height, DRAG_HANDLE_HEIGHT_PX);
            },
            height: this.detailsHeight,
            tabs: detailsPanels.map(function (tab) {
                return { key: tab.key, name: tab.name };
            }),
            currentTabKey: currentTabDetails === null || currentTabDetails === void 0 ? void 0 : currentTabDetails.key,
        }), (0, mithril_1.default)('.details-panel-container.x-scrollable', (0, mithril_1.default)(panel_container_1.PanelContainer, { doesScroll: true, panels: panels, kind: 'DETAILS' })));
    };
    return DetailsPanel;
}());
exports.DetailsPanel = DetailsPanel;
exports.ALL_CATEGORIES = '_all_';
function getFlowCategories(flow) {
    var categories = [];
    // v1 flows have their own categories
    if (flow.category) {
        categories.push.apply(categories, flow.category.split(','));
        return categories;
    }
    var beginCats = flow.begin.sliceCategory.split(',');
    var endCats = flow.end.sliceCategory.split(',');
    categories.push.apply(categories, new Set(__spreadArray(__spreadArray([], beginCats, true), endCats, true)));
    return categories;
}
exports.getFlowCategories = getFlowCategories;
var FlowEventsPanel = /** @class */ (function (_super) {
    __extends(FlowEventsPanel, _super);
    function FlowEventsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlowEventsPanel.prototype.view = function () {
        var selection = exports.globals.state.currentSelection;
        if (!selection || selection.kind !== 'CHROME_SLICE') {
            return;
        }
        var flowClickHandler = function (sliceId, trackId) {
            var uiTrackId = exports.globals.state.uiTrackIdByTraceTrackId[trackId];
            if (uiTrackId) {
                exports.globals.makeSelection(actions_1.Actions.selectChromeSlice({ id: sliceId, trackId: uiTrackId, table: 'slice' }), 'bound_flows');
            }
        };
        // Can happen only for flow events version 1
        var haveCategories = exports.globals.connectedFlows.filter(function (flow) { return flow.category; }).length > 0;
        var columns = [
            (0, mithril_1.default)('th', 'Direction'),
            (0, mithril_1.default)('th', 'Duration'),
            (0, mithril_1.default)('th', 'Connected Slice ID'),
            (0, mithril_1.default)('th', 'Connected Slice Name'),
            (0, mithril_1.default)('th', 'Thread Out'),
            (0, mithril_1.default)('th', 'Thread In'),
            (0, mithril_1.default)('th', 'Process Out'),
            (0, mithril_1.default)('th', 'Process In'),
        ];
        if (haveCategories) {
            columns.push((0, mithril_1.default)('th', 'Flow Category'));
            columns.push((0, mithril_1.default)('th', 'Flow Name'));
        }
        var rows = [(0, mithril_1.default)('tr', columns)];
        // Fill the table with all the directly connected flow events
        exports.globals.connectedFlows.forEach(function (flow) {
            if (selection.id !== flow.begin.sliceId &&
                selection.id !== flow.end.sliceId) {
                return;
            }
            var outgoing = selection.id === flow.begin.sliceId;
            var otherEnd = (outgoing ? flow.end : flow.begin);
            var args = {
                onclick: function () { return flowClickHandler(otherEnd.sliceId, otherEnd.trackId); },
                onmousemove: function () { return exports.globals.dispatch(actions_1.Actions.setHighlightedSliceId({ sliceId: otherEnd.sliceId })); },
                onmouseleave: function () {
                    return exports.globals.dispatch(actions_1.Actions.setHighlightedSliceId({ sliceId: -1 }));
                },
            };
            var data = [
                (0, mithril_1.default)('td.flow-link', args, outgoing ? 'Outgoing' : 'Incoming'),
                (0, mithril_1.default)('td.flow-link', args, (0, time_1.timeToCode)(flow.dur)),
                (0, mithril_1.default)('td.flow-link', args, otherEnd.sliceId.toString()),
                (0, mithril_1.default)('td.flow-link', args, otherEnd.sliceName),
                (0, mithril_1.default)('td.flow-link', args, flow.begin.threadName),
                (0, mithril_1.default)('td.flow-link', args, flow.end.threadName),
                (0, mithril_1.default)('td.flow-link', args, flow.begin.processName),
                (0, mithril_1.default)('td.flow-link', args, flow.end.processName),
            ];
            if (haveCategories) {
                data.push((0, mithril_1.default)('td.flow-info', flow.category || '-'));
                data.push((0, mithril_1.default)('td.flow-info', flow.name || '-'));
            }
            rows.push((0, mithril_1.default)('tr', data));
        });
        return (0, mithril_1.default)('.details-panel', [
            (0, mithril_1.default)('.details-panel-heading', (0, mithril_1.default)('h2', "Flow events")),
            (0, mithril_1.default)('.flow-events-table', (0, mithril_1.default)('table', rows)),
        ]);
    };
    FlowEventsPanel.prototype.renderCanvas = function (_ctx, _size) { };
    return FlowEventsPanel;
}(panel_1.Panel));
exports.FlowEventsPanel = FlowEventsPanel;
var FlowEventsAreaSelectedPanel = /** @class */ (function (_super) {
    __extends(FlowEventsAreaSelectedPanel, _super);
    function FlowEventsAreaSelectedPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlowEventsAreaSelectedPanel.prototype.view = function () {
        var selection = exports.globals.state.currentSelection;
        if (!selection || selection.kind !== 'AREA') {
            return;
        }
        var columns = [
            (0, mithril_1.default)('th', 'Flow Category'),
            (0, mithril_1.default)('th', 'Number of flows'),
            (0, mithril_1.default)('th', 'Show', (0, mithril_1.default)('a.warning', (0, mithril_1.default)('i.material-icons', 'warning'), (0, mithril_1.default)('.tooltip', 'Showing a large number of flows may impact performance.'))),
        ];
        var rows = [(0, mithril_1.default)('tr', columns)];
        var categoryToFlowsNum = new Map();
        exports.globals.selectedFlows.forEach(function (flow) {
            var categories = (0, flow_events_panel_2.getFlowCategories)(flow);
            categories.forEach(function (cat) {
                if (!categoryToFlowsNum.has(cat)) {
                    categoryToFlowsNum.set(cat, 0);
                }
                categoryToFlowsNum.set(cat, categoryToFlowsNum.get(cat) + 1);
            });
        });
        var allWasChecked = exports.globals.visibleFlowCategories.get(exports.ALL_CATEGORIES);
        rows.push((0, mithril_1.default)('tr.sum', [
            (0, mithril_1.default)('td.sum-data', 'All'),
            (0, mithril_1.default)('td.sum-data', exports.globals.selectedFlows.length),
            (0, mithril_1.default)('td.sum-data', (0, mithril_1.default)('i.material-icons', {
                onclick: function () {
                    if (allWasChecked) {
                        exports.globals.visibleFlowCategories.clear();
                    }
                    else {
                        categoryToFlowsNum.forEach(function (_, cat) {
                            exports.globals.visibleFlowCategories.set(cat, true);
                        });
                    }
                    exports.globals.visibleFlowCategories.set(exports.ALL_CATEGORIES, !allWasChecked);
                    exports.globals.rafScheduler.scheduleFullRedraw();
                },
            }, allWasChecked ? exports.CHECKBOX : exports.BLANK_CHECKBOX)),
        ]));
        categoryToFlowsNum.forEach(function (num, cat) {
            var wasChecked = exports.globals.visibleFlowCategories.get(cat) ||
                exports.globals.visibleFlowCategories.get(exports.ALL_CATEGORIES);
            var data = [
                (0, mithril_1.default)('td.flow-info', cat),
                (0, mithril_1.default)('td.flow-info', num),
                (0, mithril_1.default)('td.flow-info', (0, mithril_1.default)('i.material-icons', {
                    onclick: function () {
                        if (wasChecked) {
                            exports.globals.visibleFlowCategories.set(exports.ALL_CATEGORIES, false);
                        }
                        exports.globals.visibleFlowCategories.set(cat, !wasChecked);
                        exports.globals.rafScheduler.scheduleFullRedraw();
                    },
                }, wasChecked ? exports.CHECKBOX : exports.BLANK_CHECKBOX)),
            ];
            rows.push((0, mithril_1.default)('tr', data));
        });
        return (0, mithril_1.default)('.details-panel', [
            (0, mithril_1.default)('.details-panel-heading', (0, mithril_1.default)('h2', "Selected flow events")),
            (0, mithril_1.default)('.flow-events-table', (0, mithril_1.default)('table', rows)),
        ]);
    };
    FlowEventsAreaSelectedPanel.prototype.renderCanvas = function (_ctx, _size) { };
    return FlowEventsAreaSelectedPanel;
}(panel_1.Panel));
exports.FlowEventsAreaSelectedPanel = FlowEventsAreaSelectedPanel;
function getCurrSelectedMetric() {
    var _a = exports.globals.state.metrics, availableMetrics = _a.availableMetrics, selectedIndex = _a.selectedIndex;
    if (!availableMetrics)
        return undefined;
    if (selectedIndex === undefined)
        return undefined;
    return availableMetrics[selectedIndex];
}
var MetricResult = /** @class */ (function () {
    function MetricResult() {
    }
    MetricResult.prototype.view = function () {
        var metricResult = exports.globals.metricResult;
        if (metricResult === undefined)
            return undefined;
        var currSelection = getCurrSelectedMetric();
        if (!(metricResult && metricResult.name === currSelection)) {
            return undefined;
        }
        if (metricResult.error !== undefined) {
            return (0, mithril_1.default)('pre.metric-error', metricResult.error);
        }
        if (metricResult.resultString !== undefined) {
            return (0, mithril_1.default)('pre', metricResult.resultString);
        }
        return undefined;
    };
    return MetricResult;
}());
var MetricPicker = /** @class */ (function () {
    function MetricPicker() {
    }
    MetricPicker.prototype.view = function () {
        var _a = exports.globals.state.metrics, availableMetrics = _a.availableMetrics, selectedIndex = _a.selectedIndex;
        if (availableMetrics === undefined)
            return 'Loading metrics...';
        if (availableMetrics.length === 0)
            return 'No metrics available';
        if (selectedIndex === undefined) {
            throw Error('Should not happen when avaibleMetrics is non-empty');
        }
        return (0, mithril_1.default)('div', [
            'Select a metric:',
            (0, mithril_1.default)('select', {
                selectedIndex: exports.globals.state.metrics.selectedIndex,
                onchange: function (e) {
                    exports.globals.dispatch(actions_1.Actions.setMetricSelectedIndex({ index: e.target.selectedIndex }));
                },
            }, availableMetrics.map(function (metric) { return (0, mithril_1.default)('option', { value: metric, key: metric }, metric); })),
            (0, mithril_1.default)(button_1.Button, {
                onclick: function () { return exports.globals.dispatch(actions_1.Actions.requestSelectedMetric({})); },
                label: 'Run',
            }),
        ]);
    };
    return MetricPicker;
}());
exports.MetricsPage = (0, pages_1.createPage)({
    view: function () {
        return (0, mithril_1.default)('.metrics-page', (0, mithril_1.default)(MetricPicker), (0, mithril_1.default)(MetricResult));
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
var comparator_builder_1 = require("../common/comparator_builder");
function tableColumnEquals(t1, t2) {
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
exports.tableColumnEquals = tableColumnEquals;
function toggleEnabled(compare, arr, column, enabled) {
    if (enabled && arr.find(function (value) { return compare(column, value); }) === undefined) {
        arr.push(column);
    }
    if (!enabled) {
        var index = arr.findIndex(function (value) { return compare(column, value); });
        if (index !== -1) {
            arr.splice(index, 1);
        }
    }
}
exports.toggleEnabled = toggleEnabled;
function aggregationEquals(agg1, agg2) {
    return new comparator_builder_1.EqualsBuilder(agg1, agg2)
        .comparePrimitive(function (agg) { return agg.aggregationFunction; })
        .compare(tableColumnEquals, function (agg) { return agg.column; })
        .equals();
}
exports.aggregationEquals = aggregationEquals;
// Used to convert TableColumn to a string in order to store it in a Map, as
// ES6 does not support compound Set/Map keys. This function should only be used
// for interning keys, and does not have any requirements beyond different
// TableColumn objects mapping to different strings.
function columnKey(tableColumn) {
    switch (tableColumn.kind) {
        case 'argument': {
            return "argument:".concat(tableColumn.argument);
        }
        case 'regular': {
            return "".concat(tableColumn.table, ".").concat(tableColumn.column);
        }
    }
}
exports.columnKey = columnKey;
function aggregationKey(aggregation) {
    return "".concat(aggregation.aggregationFunction, ":").concat((0, pivot_table_types_1.columnKey)(aggregation.column));
}
exports.aggregationKey = aggregationKey;
var colorizer_4 = require("../common/colorizer");
var AggregationPanel = /** @class */ (function (_super) {
    __extends(AggregationPanel, _super);
    function AggregationPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregationPanel.prototype.view = function (_a) {
        var _this = this;
        var attrs = _a.attrs;
        return (0, mithril_1.default)('.details-panel', (0, mithril_1.default)('.details-panel-heading.aggregation', attrs.data.extra !== undefined &&
            attrs.data.extra.kind === 'THREAD_STATE' ?
            this.showStateSummary(attrs.data.extra) :
            null, this.showTimeRange(), (0, mithril_1.default)('table', (0, mithril_1.default)('tr', attrs.data.columns.map(function (col) { return _this.formatColumnHeading(col, attrs.kind); })), (0, mithril_1.default)('tr.sum', attrs.data.columnSums.map(function (sum) {
            var sumClass = sum === '' ? 'td' : 'td.sum-data';
            return (0, mithril_1.default)(sumClass, sum);
        })))), (0, mithril_1.default)('.details-table.aggregation', (0, mithril_1.default)('table', this.getRows(attrs.data))));
    };
    AggregationPanel.prototype.formatColumnHeading = function (col, id) {
        var pref = exports.globals.state.aggregatePreferences[id];
        var sortIcon = '';
        if (pref && pref.sorting && pref.sorting.column === col.columnId) {
            sortIcon = pref.sorting.direction === 'DESC' ? 'arrow_drop_down' :
                'arrow_drop_up';
        }
        return (0, mithril_1.default)('th', {
            onclick: function () {
                exports.globals.dispatch(actions_1.Actions.updateAggregateSorting({ id: id, column: col.columnId }));
            },
        }, col.title, (0, mithril_1.default)('i.material-icons', sortIcon));
    };
    AggregationPanel.prototype.getRows = function (data) {
        if (data.columns.length === 0)
            return;
        var rows = [];
        for (var i = 0; i < data.columns[0].data.length; i++) {
            var row = [];
            for (var j = 0; j < data.columns.length; j++) {
                row.push((0, mithril_1.default)('td', this.getFormattedData(data, i, j)));
            }
            rows.push((0, mithril_1.default)('tr', row));
        }
        return rows;
    };
    AggregationPanel.prototype.getFormattedData = function (data, rowIndex, columnIndex) {
        switch (data.columns[columnIndex].kind) {
            case 'STRING':
                return data.strings[data.columns[columnIndex].data[rowIndex]];
            case 'TIMESTAMP_NS':
                return "".concat(data.columns[columnIndex].data[rowIndex] / 1000000);
            case 'STATE': {
                var concatState = data.strings[data.columns[columnIndex].data[rowIndex]];
                var split = concatState.split(',');
                var ioWait = split[1] === 'NULL' ? undefined : !!Number.parseInt(split[1], 10);
                return (0, thread_state_1.translateState)(split[0], ioWait);
            }
            case 'NUMBER':
            default:
                return data.columns[columnIndex].data[rowIndex];
        }
    };
    AggregationPanel.prototype.showTimeRange = function () {
        var selection = exports.globals.state.currentSelection;
        if (selection === null || selection.kind !== 'AREA')
            return undefined;
        var selectedArea = exports.globals.state.areas[selection.areaId];
        var rangeDurationMs = (selectedArea.endSec - selectedArea.startSec) * 1e3;
        return (0, mithril_1.default)('.time-range', "Selected range: ".concat(rangeDurationMs.toFixed(6), " ms"));
    };
    // Thread state aggregation panel only
    AggregationPanel.prototype.showStateSummary = function (data) {
        if (data === undefined)
            return undefined;
        var states = [];
        for (var i = 0; i < data.states.length; i++) {
            var color = (0, colorizer_4.colorForState)(data.states[i]);
            var textColor = (0, colorizer_4.textColorForState)(data.states[i]);
            var width = data.values[i] / data.totalMs * 100;
            states.push((0, mithril_1.default)('.state', {
                style: {
                    background: "hsl(".concat(color.h, ",").concat(color.s, "%,").concat(color.l, "%)"),
                    color: "".concat(textColor),
                    width: "".concat(width, "%"),
                },
            }, "".concat(data.states[i], ": ").concat(data.values[i], " ms")));
        }
        return (0, mithril_1.default)('.states', states);
    };
    AggregationPanel.prototype.renderCanvas = function () { };
    return AggregationPanel;
}(panel_1.Panel));
exports.AggregationPanel = AggregationPanel;
var lastDragTarget = null;
function installFileDropHandler() {
    window.ondragenter = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        lastDragTarget = evt.target;
        if (dragEventHasFiles(evt)) {
            document.body.classList.add('filedrag');
        }
    };
    window.ondragleave = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (evt.target === lastDragTarget) {
            document.body.classList.remove('filedrag');
        }
    };
    window.ondrop = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        document.body.classList.remove('filedrag');
        if (evt.dataTransfer && dragEventHasFiles(evt)) {
            var file = evt.dataTransfer.files[0];
            if (file) {
                exports.globals.dispatch(actions_1.Actions.openTraceFromFile({ file: file }));
            }
        }
        evt.preventDefault();
    };
    window.ondragover = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    };
}
exports.installFileDropHandler = installFileDropHandler;
function dragEventHasFiles(event) {
    if (event.dataTransfer && event.dataTransfer.types) {
        for (var _i = 0, _a = event.dataTransfer.types; _i < _a.length; _i++) {
            var type = _a[_i];
            if (type === 'Files')
                return true;
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
function ratelimit(f, ms) {
    var inProgess = false;
    return function () {
        if (inProgess) {
            return;
        }
        inProgess = true;
        setTimeout(function () {
            f();
            inProgess = false;
        }, ms);
    };
}
exports.ratelimit = ratelimit;
// Returns a wrapper around |f| which waits for a |ms|ms pause in calls
// before calling |f|.
function debounce(f, ms) {
    var timerId;
    return function () {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            f();
            timerId = undefined;
        }, ms);
    };
}
exports.debounce = debounce;
var conversion_jobs_1 = require("../common/conversion_jobs");
var clipboard_3 = require("./clipboard");
var error_dialog_1 = require("./error_dialog");
var legacy_trace_viewer_1 = require("./legacy_trace_viewer");
function handleOnMessage(msg) {
    var args = msg.data;
    if (args.kind === 'updateStatus') {
        exports.globals.dispatch(actions_1.Actions.updateStatus({
            msg: args.status,
            timestamp: Date.now() / 1000,
        }));
    }
    else if (args.kind === 'updateJobStatus') {
        exports.globals.setConversionJobStatus(args.name, args.status);
    }
    else if (args.kind === 'downloadFile') {
        (0, clipboard_3.download)(new File([new Blob([args.buffer])], args.name));
    }
    else if (args.kind === 'openTraceInLegacy') {
        var str_2 = (new TextDecoder('utf-8')).decode(args.buffer);
        (0, legacy_trace_viewer_1.openBufferWithLegacyTraceViewer)('trace.json', str_2, 0);
    }
    else if (args.kind === 'error') {
        (0, error_dialog_1.maybeShowErrorDialog)(args.error);
    }
    else {
        throw new Error("Unhandled message ".concat(JSON.stringify(args)));
    }
}
function makeWorkerAndPost(msg) {
    var worker = new Worker(exports.globals.root + 'traceconv_bundle.js');
    worker.onmessage = handleOnMessage;
    worker.postMessage(msg);
}
function convertTraceToJsonAndDownload(trace) {
    makeWorkerAndPost({
        kind: 'ConvertTraceAndDownload',
        trace: trace,
        format: 'json',
    });
}
exports.convertTraceToJsonAndDownload = convertTraceToJsonAndDownload;
function convertTraceToSystraceAndDownload(trace) {
    makeWorkerAndPost({
        kind: 'ConvertTraceAndDownload',
        trace: trace,
        format: 'systrace',
    });
}
exports.convertTraceToSystraceAndDownload = convertTraceToSystraceAndDownload;
function convertToJson(trace, truncate) {
    makeWorkerAndPost({
        kind: 'ConvertTraceAndOpenInLegacy',
        trace: trace,
        truncate: truncate,
    });
}
exports.convertToJson = convertToJson;
function convertTraceToPprofAndDownload(trace, pid, ts) {
    makeWorkerAndPost({
        kind: 'ConvertTraceToPprof',
        trace: trace,
        pid: pid,
        ts: ts,
    });
}
exports.convertTraceToPprofAndDownload = convertTraceToPprofAndDownload;
var empty_state_3 = require("../common/empty_state");
var analytics_1 = require("./analytics");
var frontend_local_state_1 = require("./frontend_local_state");
Object.defineProperty(exports, "FrontendLocalState", { enumerable: true, get: function () { return frontend_local_state_1.FrontendLocalState; } });
var raf_scheduler_1 = require("./raf_scheduler");
Object.defineProperty(exports, "RafScheduler", { enumerable: true, get: function () { return raf_scheduler_1.RafScheduler; } });
var service_worker_controller_1 = require("./service_worker_controller");
Object.defineProperty(exports, "ServiceWorkerController", { enumerable: true, get: function () { return service_worker_controller_1.ServiceWorkerController; } });
function getRoot() {
    // Works out the root directory where the content should be served from
    // e.g. `http://origin/v1.2.3/`.
    var script = document.currentScript;
    // Needed for DOM tests, that do not have script element.
    if (script === null) {
        return '';
    }
    var root = script.src;
    root = root.substr(0, root.lastIndexOf('/') + 1);
    return root;
}
/**
 * Global accessors for state/dispatch in the frontend.
 */
var Globals = /** @class */ (function () {
    function Globals() {
        this.root = getRoot();
        this.bottomTabList = undefined;
        this._testing = false;
        this._dispatch = undefined;
        this._state = undefined;
        this._frontendLocalState = undefined;
        this._rafScheduler = undefined;
        this._serviceWorkerController = undefined;
        this._logging = undefined;
        this._isInternalUser = undefined;
        // TODO(hjd): Unify trackDataStore, queryResults, overviewStore, threads.
        this._trackDataStore = undefined;
        this._queryResults = undefined;
        this._overviewStore = undefined;
        this._aggregateDataStore = undefined;
        this._threadMap = undefined;
        this._sliceDetails = undefined;
        this._threadStateDetails = undefined;
        this._connectedFlows = undefined;
        this._selectedFlows = undefined;
        this._visibleFlowCategories = undefined;
        this._counterDetails = undefined;
        this._flamegraphDetails = undefined;
        this._cpuProfileDetails = undefined;
        this._numQueriesQueued = 0;
        this._bufferUsage = undefined;
        this._recordingLog = undefined;
        this._traceErrors = undefined;
        this._metricError = undefined;
        this._metricResult = undefined;
        this._jobStatus = undefined;
        this._router = undefined;
        this._embeddedMode = undefined;
        this._hideSidebar = undefined;
        this._ftraceCounters = undefined;
        this._ftracePanelData = undefined;
        // TODO(hjd): Remove once we no longer need to update UUID on redraw.
        this._publishRedraw = undefined;
        this._currentSearchResults = {
            sliceIds: new Float64Array(0),
            tsStarts: new Float64Array(0),
            utids: new Float64Array(0),
            trackIds: [],
            sources: [],
            totalResults: 0,
        };
        this.searchSummary = {
            tsStarts: new Float64Array(0),
            tsEnds: new Float64Array(0),
            count: new Uint8Array(0),
        };
        this.engines = new Map();
    }
    Globals.prototype.initialize = function (dispatch, router) {
        this._dispatch = dispatch;
        this._router = router;
        this._state = (0, empty_state_3.createEmptyState)();
        this._frontendLocalState = new frontend_local_state_1.FrontendLocalState();
        this._rafScheduler = new raf_scheduler_1.RafScheduler();
        this._serviceWorkerController = new service_worker_controller_1.ServiceWorkerController();
        this._testing =
            self.location && self.location.search.indexOf('testing=1') >= 0;
        this._logging = (0, analytics_1.initAnalytics)();
        // TODO(hjd): Unify trackDataStore, queryResults, overviewStore, threads.
        this._trackDataStore = new Map();
        this._queryResults = new Map();
        this._overviewStore = new Map();
        this._aggregateDataStore = new Map();
        this._threadMap = new Map();
        this._sliceDetails = {};
        this._connectedFlows = [];
        this._selectedFlows = [];
        this._visibleFlowCategories = new Map();
        this._counterDetails = {};
        this._threadStateDetails = {};
        this._flamegraphDetails = {};
        this._cpuProfileDetails = {};
        this.engines.clear();
    };
    Object.defineProperty(Globals.prototype, "router", {
        get: function () {
            return (0, logging_2.assertExists)(this._router);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "publishRedraw", {
        get: function () {
            return this._publishRedraw || (function () { });
        },
        set: function (f) {
            this._publishRedraw = f;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "state", {
        get: function () {
            return (0, logging_2.assertExists)(this._state);
        },
        set: function (state) {
            this._state = (0, logging_2.assertExists)(state);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "dispatch", {
        get: function () {
            return (0, logging_2.assertExists)(this._dispatch);
        },
        enumerable: false,
        configurable: true
    });
    Globals.prototype.dispatchMultiple = function (actions) {
        var dispatch = this.dispatch;
        for (var _i = 0, actions_3 = actions; _i < actions_3.length; _i++) {
            var action = actions_3[_i];
            dispatch(action);
        }
    };
    Object.defineProperty(Globals.prototype, "frontendLocalState", {
        get: function () {
            return (0, logging_2.assertExists)(this._frontendLocalState);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "rafScheduler", {
        get: function () {
            return (0, logging_2.assertExists)(this._rafScheduler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "logging", {
        get: function () {
            return (0, logging_2.assertExists)(this._logging);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "serviceWorkerController", {
        get: function () {
            return (0, logging_2.assertExists)(this._serviceWorkerController);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "overviewStore", {
        // TODO(hjd): Unify trackDataStore, queryResults, overviewStore, threads.
        get: function () {
            return (0, logging_2.assertExists)(this._overviewStore);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "trackDataStore", {
        get: function () {
            return (0, logging_2.assertExists)(this._trackDataStore);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "queryResults", {
        get: function () {
            return (0, logging_2.assertExists)(this._queryResults);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "threads", {
        get: function () {
            return (0, logging_2.assertExists)(this._threadMap);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "sliceDetails", {
        get: function () {
            return (0, logging_2.assertExists)(this._sliceDetails);
        },
        set: function (click) {
            this._sliceDetails = (0, logging_2.assertExists)(click);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "threadStateDetails", {
        get: function () {
            return (0, logging_2.assertExists)(this._threadStateDetails);
        },
        set: function (click) {
            this._threadStateDetails = (0, logging_2.assertExists)(click);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "connectedFlows", {
        get: function () {
            return (0, logging_2.assertExists)(this._connectedFlows);
        },
        set: function (connectedFlows) {
            this._connectedFlows = (0, logging_2.assertExists)(connectedFlows);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "selectedFlows", {
        get: function () {
            return (0, logging_2.assertExists)(this._selectedFlows);
        },
        set: function (selectedFlows) {
            this._selectedFlows = (0, logging_2.assertExists)(selectedFlows);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "visibleFlowCategories", {
        get: function () {
            return (0, logging_2.assertExists)(this._visibleFlowCategories);
        },
        set: function (visibleFlowCategories) {
            this._visibleFlowCategories = (0, logging_2.assertExists)(visibleFlowCategories);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "counterDetails", {
        get: function () {
            return (0, logging_2.assertExists)(this._counterDetails);
        },
        set: function (click) {
            this._counterDetails = (0, logging_2.assertExists)(click);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "aggregateDataStore", {
        get: function () {
            return (0, logging_2.assertExists)(this._aggregateDataStore);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "flamegraphDetails", {
        get: function () {
            return (0, logging_2.assertExists)(this._flamegraphDetails);
        },
        set: function (click) {
            this._flamegraphDetails = (0, logging_2.assertExists)(click);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "traceErrors", {
        get: function () {
            return this._traceErrors;
        },
        enumerable: false,
        configurable: true
    });
    Globals.prototype.setTraceErrors = function (arg) {
        this._traceErrors = arg;
    };
    Object.defineProperty(Globals.prototype, "metricError", {
        get: function () {
            return this._metricError;
        },
        enumerable: false,
        configurable: true
    });
    Globals.prototype.setMetricError = function (arg) {
        this._metricError = arg;
    };
    Object.defineProperty(Globals.prototype, "metricResult", {
        get: function () {
            return this._metricResult;
        },
        enumerable: false,
        configurable: true
    });
    Globals.prototype.setMetricResult = function (result) {
        this._metricResult = result;
    };
    Object.defineProperty(Globals.prototype, "cpuProfileDetails", {
        get: function () {
            return (0, logging_2.assertExists)(this._cpuProfileDetails);
        },
        set: function (click) {
            this._cpuProfileDetails = (0, logging_2.assertExists)(click);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "numQueuedQueries", {
        get: function () {
            return this._numQueriesQueued;
        },
        set: function (value) {
            this._numQueriesQueued = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "bufferUsage", {
        get: function () {
            return this._bufferUsage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "recordingLog", {
        get: function () {
            return this._recordingLog;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "currentSearchResults", {
        get: function () {
            return this._currentSearchResults;
        },
        set: function (results) {
            this._currentSearchResults = results;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "hasFtrace", {
        get: function () {
            return Boolean(this._ftraceCounters && this._ftraceCounters.length > 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "ftraceCounters", {
        get: function () {
            return this._ftraceCounters;
        },
        set: function (value) {
            this._ftraceCounters = value;
        },
        enumerable: false,
        configurable: true
    });
    Globals.prototype.getConversionJobStatus = function (name) {
        return this.getJobStatusMap().get(name) || conversion_jobs_1.ConversionJobStatus.NotRunning;
    };
    Globals.prototype.setConversionJobStatus = function (name, status) {
        var map = this.getJobStatusMap();
        if (status === conversion_jobs_1.ConversionJobStatus.NotRunning) {
            map.delete(name);
        }
        else {
            map.set(name, status);
        }
    };
    Globals.prototype.getJobStatusMap = function () {
        if (!this._jobStatus) {
            this._jobStatus = new Map();
        }
        return this._jobStatus;
    };
    Object.defineProperty(Globals.prototype, "embeddedMode", {
        get: function () {
            return !!this._embeddedMode;
        },
        set: function (value) {
            this._embeddedMode = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "hideSidebar", {
        get: function () {
            return !!this._hideSidebar;
        },
        set: function (value) {
            this._hideSidebar = value;
        },
        enumerable: false,
        configurable: true
    });
    Globals.prototype.setBufferUsage = function (bufferUsage) {
        this._bufferUsage = bufferUsage;
    };
    Globals.prototype.setTrackData = function (id, data) {
        this.trackDataStore.set(id, data);
    };
    Globals.prototype.setRecordingLog = function (recordingLog) {
        this._recordingLog = recordingLog;
    };
    Globals.prototype.setAggregateData = function (kind, data) {
        this.aggregateDataStore.set(kind, data);
    };
    Globals.prototype.getCurResolution = function () {
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
        var pxToSec = this.frontendLocalState.timeScale.deltaPxToDuration(1);
        // TODO(b/186265930): Remove once fixed:
        if (!isFinite(pxToSec)) {
            // Resolution is in pixels per second so 1000 means 1px = 1ms.
            console.error("b/186265930: Bad pxToSec suppressed ".concat(pxToSec));
            return (0, time_4.fromNs)(Math.pow(2, Math.floor(Math.log2((0, time_4.toNs)(1000)))));
        }
        var pxToNs = Math.max((0, time_4.toNs)(pxToSec), 1);
        var resolution = (0, time_4.fromNs)(Math.pow(2, Math.floor(Math.log2(pxToNs))));
        var log2 = Math.log2((0, time_4.toNs)(resolution));
        if (log2 % 1 !== 0) {
            throw new Error("Resolution should be a power of two.\n        pxToSec: ".concat(pxToSec, ",\n        pxToNs: ").concat(pxToNs, ",\n        resolution: ").concat(resolution, ",\n        log2: ").concat(Math.log2((0, time_4.toNs)(resolution))));
        }
        return resolution;
    };
    Globals.prototype.getCurrentEngine = function () {
        return this.state.engine;
    };
    Object.defineProperty(Globals.prototype, "ftracePanelData", {
        get: function () {
            return this._ftracePanelData;
        },
        set: function (data) {
            this._ftracePanelData = data;
        },
        enumerable: false,
        configurable: true
    });
    Globals.prototype.makeSelection = function (action, tabToOpen) {
        if (tabToOpen === void 0) { tabToOpen = 'current_selection'; }
        // A new selection should cancel the current search selection.
        exports.globals.dispatch(actions_1.Actions.setSearchIndex({ index: -1 }));
        var tab = action.type === 'deselect' ? undefined : tabToOpen;
        exports.globals.dispatch(actions_1.Actions.setCurrentTab({ tab: tab }));
        exports.globals.dispatch(action);
    };
    Globals.prototype.resetForTesting = function () {
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
    };
    Object.defineProperty(Globals.prototype, "isInternalUser", {
        // This variable is set by the is_internal_user.js script if the user is a
        // googler. This is used to avoid exposing features that are not ready yet
        // for public consumption. The gated features themselves are not secret.
        // If a user has been detected as a Googler once, make that sticky in
        // localStorage, so that we keep treating them as such when they connect over
        // public networks.
        get: function () {
            if (this._isInternalUser === undefined) {
                this._isInternalUser = localStorage.getItem('isInternalUser') === '1';
            }
            return this._isInternalUser;
        },
        set: function (value) {
            localStorage.setItem('isInternalUser', value ? '1' : '0');
            this._isInternalUser = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Globals.prototype, "testing", {
        get: function () {
            return this._testing;
        },
        enumerable: false,
        configurable: true
    });
    // Used when switching to the legacy TraceViewer UI.
    // Most resources are cleaned up by replacing the current |window| object,
    // however pending RAFs and workers seem to outlive the |window| and need to
    // be cleaned up explicitly.
    Globals.prototype.shutdown = function () {
        this._rafScheduler.shutdown();
    };
    return Globals;
}());
exports.globals = new Globals();
var CpuProfileDetailsPanel = /** @class */ (function (_super) {
    __extends(CpuProfileDetailsPanel, _super);
    function CpuProfileDetailsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CpuProfileDetailsPanel.prototype.view = function () {
        var sampleDetails = exports.globals.cpuProfileDetails;
        var header = (0, mithril_1.default)('.details-panel-heading', (0, mithril_1.default)('h2', "CPU Profile Sample Details"));
        if (!sampleDetails || sampleDetails.id === undefined) {
            return (0, mithril_1.default)('.details-panel', header);
        }
        return (0, mithril_1.default)('.details-panel', header, (0, mithril_1.default)('table', this.getStackText(sampleDetails.stack)));
    };
    CpuProfileDetailsPanel.prototype.getStackText = function (stack) {
        if (!stack)
            return [];
        var result = [];
        for (var i = stack.length - 1; i >= 0; --i) {
            result.push((0, mithril_1.default)('tr', (0, mithril_1.default)('td', stack[i].name), (0, mithril_1.default)('td', stack[i].mapping)));
        }
        return result;
    };
    CpuProfileDetailsPanel.prototype.renderCanvas = function () { };
    return CpuProfileDetailsPanel;
}(panel_1.Panel));
exports.CpuProfileDetailsPanel = CpuProfileDetailsPanel;
var INSTANT_FOCUS_DURATION_S = 1 / 1e9; // 1 ns.
// Handles all key events than are not handled by the
// pan and zoom handler. Returns true if the event was handled.
function handleKey(e, down) {
    var key = e.key.toLowerCase();
    var selection = exports.globals.state.currentSelection;
    var noModifiers = !(e.ctrlKey || e.metaKey || e.altKey || e.shiftKey);
    var ctrlOrMeta = (e.ctrlKey || e.metaKey) && !(e.altKey || e.shiftKey);
    // No other modifiers other than possibly Shift.
    var maybeShift = !(e.ctrlKey || e.metaKey || e.altKey);
    if (down && 'm' === key && maybeShift) {
        if (selection && selection.kind === 'AREA') {
            exports.globals.dispatch(actions_1.Actions.toggleMarkCurrentArea({ persistent: e.shiftKey }));
        }
        else if (selection) {
            lockSliceSpan(e.shiftKey);
        }
        return true;
    }
    if (down && 'f' === key && noModifiers) {
        (0, keyboard_event_handler_1.findCurrentSelection)();
        return true;
    }
    if (down && 'a' === key && ctrlOrMeta) {
        var tracksToSelect = [];
        var selection_1 = exports.globals.state.currentSelection;
        if (selection_1 !== null && selection_1.kind === 'AREA') {
            var area = exports.globals.state.areas[selection_1.areaId];
            var coversEntireTimeRange = exports.globals.state.traceTime.startSec === area.startSec &&
                exports.globals.state.traceTime.endSec === area.endSec;
            if (!coversEntireTimeRange) {
                // If the current selection is an area which does not cover the entire
                // time range, preserve the list of selected tracks and expand the time
                // range.
                tracksToSelect = area.tracks;
            }
            else {
                // If the entire time range is already covered, update the selection to
                // cover all tracks.
                tracksToSelect = Object.keys(exports.globals.state.tracks);
            }
        }
        else {
            // If the current selection is not an area, select all.
            tracksToSelect = Object.keys(exports.globals.state.tracks);
        }
        exports.globals.dispatch(actions_1.Actions.selectArea({
            area: {
                startSec: exports.globals.state.traceTime.startSec,
                endSec: exports.globals.state.traceTime.endSec,
                tracks: tracksToSelect,
            },
        }));
        e.preventDefault();
        return true;
    }
    if (down && 'b' === key && ctrlOrMeta) {
        exports.globals.dispatch(actions_1.Actions.toggleSidebar({}));
        return true;
    }
    if (down && '?' === key && maybeShift) {
        (0, help_modal_1.toggleHelp)();
        return true;
    }
    if (down && 'enter' === key && maybeShift) {
        e.preventDefault();
        (0, search_handler_1.executeSearch)(e.shiftKey);
        return true;
    }
    if (down && 'escape' === key) {
        exports.globals.frontendLocalState.deselectArea();
        exports.globals.makeSelection(actions_1.Actions.deselect({}));
        exports.globals.dispatch(actions_1.Actions.removeNote({ id: '0' }));
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
exports.handleKey = handleKey;
// Search |boundFlows| for |flowId| and return the id following it.
// Returns the first flow id if nothing was found or |flowId| was the last flow
// in |boundFlows|, and -1 if |boundFlows| is empty
function findAnotherFlowExcept(boundFlows, flowId) {
    var selectedFlowFound = false;
    if (boundFlows.length === 0) {
        return -1;
    }
    for (var _i = 0, boundFlows_1 = boundFlows; _i < boundFlows_1.length; _i++) {
        var flow = boundFlows_1[_i];
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
function focusOtherFlow(direction) {
    if (!exports.globals.state.currentSelection ||
        exports.globals.state.currentSelection.kind !== 'CHROME_SLICE') {
        return;
    }
    var sliceId = exports.globals.state.currentSelection.id;
    if (sliceId === -1) {
        return;
    }
    var boundFlows = exports.globals.connectedFlows.filter(function (flow) { return flow.begin.sliceId === sliceId && direction === 'Forward' ||
        flow.end.sliceId === sliceId && direction === 'Backward'; });
    if (direction === 'Backward') {
        var nextFlowId = findAnotherFlowExcept(boundFlows, exports.globals.state.focusedFlowIdLeft);
        exports.globals.dispatch(actions_1.Actions.setHighlightedFlowLeftId({ flowId: nextFlowId }));
    }
    else {
        var nextFlowId = findAnotherFlowExcept(boundFlows, exports.globals.state.focusedFlowIdRight);
        exports.globals.dispatch(actions_1.Actions.setHighlightedFlowRightId({ flowId: nextFlowId }));
    }
}
// Select the slice connected to the flow in focus
function moveByFocusedFlow(direction) {
    if (!exports.globals.state.currentSelection ||
        exports.globals.state.currentSelection.kind !== 'CHROME_SLICE') {
        return;
    }
    var sliceId = exports.globals.state.currentSelection.id;
    var flowId = (direction === 'Backward' ? exports.globals.state.focusedFlowIdLeft :
        exports.globals.state.focusedFlowIdRight);
    if (sliceId === -1 || flowId === -1) {
        return;
    }
    // Find flow that is in focus and select corresponding slice
    for (var _i = 0, _a = exports.globals.connectedFlows; _i < _a.length; _i++) {
        var flow = _a[_i];
        if (flow.id === flowId) {
            var flowPoint = (direction === 'Backward' ? flow.begin : flow.end);
            var uiTrackId = exports.globals.state.uiTrackIdByTraceTrackId[flowPoint.trackId];
            if (uiTrackId) {
                exports.globals.makeSelection(actions_1.Actions.selectChromeSlice({
                    id: flowPoint.sliceId,
                    trackId: uiTrackId,
                    table: 'slice',
                    scroll: true,
                }));
            }
        }
    }
}
function findTimeRangeOfSelection() {
    var selection = exports.globals.state.currentSelection;
    var startTs = -1;
    var endTs = -1;
    if (selection === null) {
        return { startTs: startTs, endTs: endTs };
    }
    else if (selection.kind === 'SLICE' || selection.kind === 'CHROME_SLICE') {
        var slice_1 = exports.globals.sliceDetails;
        if (slice_1.ts && slice_1.dur !== undefined && slice_1.dur > 0) {
            startTs = slice_1.ts + exports.globals.state.traceTime.startSec;
            endTs = startTs + slice_1.dur;
        }
        else if (slice_1.ts) {
            startTs = slice_1.ts + exports.globals.state.traceTime.startSec;
            // This will handle either:
            // a)slice.dur === -1 -> unfinished slice
            // b)slice.dur === 0  -> instant event
            endTs = slice_1.dur === -1 ? exports.globals.state.traceTime.endSec :
                startTs + INSTANT_FOCUS_DURATION_S;
        }
    }
    else if (selection.kind === 'THREAD_STATE') {
        var threadState = exports.globals.threadStateDetails;
        if (threadState.ts && threadState.dur) {
            startTs = threadState.ts + exports.globals.state.traceTime.startSec;
            endTs = startTs + threadState.dur;
        }
    }
    else if (selection.kind === 'COUNTER') {
        startTs = selection.leftTs;
        endTs = selection.rightTs;
    }
    else if (selection.kind === 'AREA') {
        var selectedArea = exports.globals.state.areas[selection.areaId];
        if (selectedArea) {
            startTs = selectedArea.startSec;
            endTs = selectedArea.endSec;
        }
    }
    else if (selection.kind === 'NOTE') {
        var selectedNote = exports.globals.state.notes[selection.id];
        // Notes can either be default or area notes. Area notes are handled
        // above in the AREA case.
        if (selectedNote && selectedNote.noteType === 'DEFAULT') {
            startTs = selectedNote.timestamp;
            endTs = selectedNote.timestamp + INSTANT_FOCUS_DURATION_S;
        }
    }
    else if (selection.kind === 'LOG') {
        // TODO(hjd): Make focus selection work for logs.
    }
    else if (selection.kind === 'DEBUG_SLICE') {
        startTs = selection.startS;
        if (selection.durationS > 0) {
            endTs = startTs + selection.durationS;
        }
        else {
            endTs = startTs + INSTANT_FOCUS_DURATION_S;
        }
    }
    return { startTs: startTs, endTs: endTs };
}
function lockSliceSpan(persistent) {
    if (persistent === void 0) { persistent = false; }
    var range = findTimeRangeOfSelection();
    if (range.startTs !== -1 && range.endTs !== -1 &&
        exports.globals.state.currentSelection !== null) {
        var tracks = exports.globals.state.currentSelection.trackId ?
            [exports.globals.state.currentSelection.trackId] :
            [];
        var area = { startSec: range.startTs, endSec: range.endTs, tracks: tracks };
        exports.globals.dispatch(actions_1.Actions.markArea({ area: area, persistent: persistent }));
    }
}
function findCurrentSelection() {
    var selection = exports.globals.state.currentSelection;
    if (selection === null)
        return;
    var range = findTimeRangeOfSelection();
    if (range.startTs !== -1 && range.endTs !== -1) {
        (0, scroll_helper_1.focusHorizontalRange)(range.startTs, range.endTs);
    }
    if (selection.trackId) {
        (0, scroll_helper_3.verticalScrollToTrack)(selection.trackId, true);
    }
}
exports.findCurrentSelection = findCurrentSelection;
var colorizer_5 = require("../common/colorizer");
var ROW_H = 20;
var PAGE_SIZE = 250;
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
var FtracePanel = /** @class */ (function (_super) {
    __extends(FtracePanel, _super);
    function FtracePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = 0;
        _this.pageCount = 0;
        _this.onScroll = function (e) {
            var scrollContainer = e.target;
            _this.recomputeVisibleRowsAndUpdate(scrollContainer);
        };
        return _this;
    }
    FtracePanel.prototype.view = function (_) {
        return (0, mithril_1.default)('.ftrace-panel', (0, mithril_1.default)('.sticky', [
            this.renderRowsLabel(),
            this.renderFilterPanel(),
        ]), this.renderRows());
    };
    FtracePanel.prototype.scrollContainer = function (dom) {
        var el = dom.parentElement.parentElement.parentElement;
        return (0, logging_2.assertExists)(el);
    };
    FtracePanel.prototype.oncreate = function (_a) {
        var dom = _a.dom;
        var sc = this.scrollContainer(dom);
        sc.addEventListener('scroll', this.onScroll);
        this.recomputeVisibleRowsAndUpdate(sc);
    };
    FtracePanel.prototype.onupdate = function (_a) {
        var dom = _a.dom;
        var sc = this.scrollContainer(dom);
        this.recomputeVisibleRowsAndUpdate(sc);
    };
    FtracePanel.prototype.recomputeVisibleRowsAndUpdate = function (scrollContainer) {
        var prevPage = this.page;
        var prevPageCount = this.pageCount;
        var visibleRowOffset = Math.floor(scrollContainer.scrollTop / ROW_H);
        var visibleRowCount = Math.ceil(scrollContainer.clientHeight / ROW_H);
        // Work out which "page" we're on
        this.page = Math.floor(visibleRowOffset / PAGE_SIZE) - 1;
        this.pageCount = Math.ceil(visibleRowCount / PAGE_SIZE) + 2;
        if (this.page !== prevPage || this.pageCount !== prevPageCount) {
            exports.globals.dispatch(actions_1.Actions.updateFtracePagination({
                offset: Math.max(0, this.page) * PAGE_SIZE,
                count: this.pageCount * PAGE_SIZE,
            }));
        }
    };
    FtracePanel.prototype.onremove = function (_a) {
        var dom = _a.dom;
        var sc = this.scrollContainer(dom);
        sc.removeEventListener('scroll', this.onScroll);
        exports.globals.dispatch(actions_1.Actions.updateFtracePagination({
            offset: 0,
            count: 0,
        }));
    };
    FtracePanel.prototype.onRowOver = function (ts) {
        exports.globals.dispatch(actions_1.Actions.setHoverCursorTimestamp({ ts: ts }));
    };
    FtracePanel.prototype.onRowOut = function () {
        exports.globals.dispatch(actions_1.Actions.setHoverCursorTimestamp({ ts: -1 }));
    };
    FtracePanel.prototype.renderRowsLabel = function () {
        if (exports.globals.ftracePanelData) {
            var numEvents = exports.globals.ftracePanelData.numEvents;
            return (0, mithril_1.default)('.ftrace-rows-label', "Ftrace Events (".concat(numEvents, ")"));
        }
        else {
            return (0, mithril_1.default)('.ftrace-rows-label', 'Ftrace Rows');
        }
    };
    FtracePanel.prototype.renderFilterPanel = function () {
        if (!exports.globals.ftraceCounters) {
            return null;
        }
        var options = exports.globals.ftraceCounters.map(function (_a) {
            var name = _a.name, count = _a.count;
            return {
                id: name,
                name: "".concat(name, " (").concat(count, ")"),
                checked: !exports.globals.state.ftraceFilter.excludedNames.some(function (excluded) { return excluded === name; }),
            };
        });
        return (0, mithril_1.default)(multiselect_1.MultiSelect, {
            label: 'Filter by name',
            icon: 'filter_list_alt',
            popupPosition: popup_1.PopupPosition.Top,
            options: options,
            onChange: function (diffs) {
                var excludedNames = diffs.map(function (_a) {
                    var id = _a.id, checked = _a.checked;
                    return [checked ? 'remove' : 'add', id];
                });
                exports.globals.dispatchMultiple([
                    actions_1.Actions.updateFtraceFilter({ excludedNames: excludedNames }),
                    actions_1.Actions.requestTrackReload({}),
                ]);
            },
        });
    };
    // Render all the rows including the first title row
    FtracePanel.prototype.renderRows = function () {
        var data = exports.globals.ftracePanelData;
        var rows = [];
        rows.push((0, mithril_1.default)(".row", (0, mithril_1.default)('.cell.row-header', 'Timestamp'), (0, mithril_1.default)('.cell.row-header', 'Name'), (0, mithril_1.default)('.cell.row-header', 'CPU'), (0, mithril_1.default)('.cell.row-header', 'Process'), (0, mithril_1.default)('.cell.row-header', 'Args')));
        if (data) {
            var events = data.events, offset = data.offset, numEvents = data.numEvents;
            for (var i = 0; i < events.length; i++) {
                var _a = events[i], ts = _a.ts, name = _a.name, cpu = _a.cpu, process = _a.process, args = _a.args;
                var timestamp = (0, time_2.formatTimestamp)(ts / 1e9 - exports.globals.state.traceTime.startSec);
                var rank = i + offset;
                var color = (0, colorizer_5.colorForString)(name);
                var hsl = "hsl(\n          ".concat(color.h, ",\n          ").concat(color.s - 20, "%,\n          ").concat(Math.min(color.l + 10, 60), "%\n        )");
                rows.push((0, mithril_1.default)(".row", {
                    style: { top: "".concat((rank + 1.0) * ROW_H, "px") },
                    onmouseover: this.onRowOver.bind(this, ts / 1e9),
                    onmouseout: this.onRowOut.bind(this),
                }, (0, mithril_1.default)('.cell', timestamp), (0, mithril_1.default)('.cell', (0, mithril_1.default)('span.colour', { style: { background: hsl } }), name), (0, mithril_1.default)('.cell', cpu), (0, mithril_1.default)('.cell', process), (0, mithril_1.default)('.cell', args)));
            }
            return (0, mithril_1.default)('.rows', { style: { height: "".concat(numEvents * ROW_H, "px") } }, rows);
        }
        else {
            return (0, mithril_1.default)('.rows', rows);
        }
    };
    FtracePanel.prototype.renderCanvas = function () { };
    return FtracePanel;
}(panel_1.Panel));
exports.FtracePanel = FtracePanel;
exports.LOG_PRIORITIES = ['-', '-', 'Verbose', 'Debug', 'Info', 'Warn', 'Error', 'Fatal'];
var IGNORED_STATES = 2;
var LogPriorityWidget = /** @class */ (function () {
    function LogPriorityWidget() {
    }
    LogPriorityWidget.prototype.view = function (vnode) {
        var attrs = vnode.attrs;
        var optionComponents = [];
        for (var i = IGNORED_STATES; i < attrs.options.length; i++) {
            var selected = i === attrs.selectedIndex;
            optionComponents.push((0, mithril_1.default)('option', { value: i, selected: selected }, attrs.options[i]));
        }
        return (0, mithril_1.default)('select', {
            onchange: function (e) {
                var selectionValue = e.target.value;
                attrs.onSelect(Number(selectionValue));
            },
        }, optionComponents);
    };
    return LogPriorityWidget;
}());
var LogTagChip = /** @class */ (function () {
    function LogTagChip() {
    }
    LogTagChip.prototype.view = function (_a) {
        var attrs = _a.attrs;
        return (0, mithril_1.default)('.chip', (0, mithril_1.default)('.chip-text', attrs.name), (0, mithril_1.default)('button.chip-button', {
            onclick: function () {
                attrs.removeTag(attrs.name);
            },
        }, '×'));
    };
    return LogTagChip;
}());
var LogTagsWidget = /** @class */ (function () {
    function LogTagsWidget() {
    }
    LogTagsWidget.prototype.removeTag = function (tag) {
        exports.globals.dispatch(actions_1.Actions.removeLogTag({ tag: tag }));
    };
    LogTagsWidget.prototype.view = function (vnode) {
        var _this = this;
        var tags = vnode.attrs.tags;
        return (0, mithril_1.default)('.tag-container', (0, mithril_1.default)('.chips', tags.map(function (tag) { return (0, mithril_1.default)(LogTagChip, {
            name: tag,
            removeTag: _this.removeTag.bind(_this),
        }); })), (0, mithril_1.default)("input.chip-input[placeholder='Add new tag']", {
            onkeydown: function (e) {
                // This is to avoid zooming on 'w'(and other unexpected effects
                // of key presses in this input field).
                e.stopPropagation();
                var htmlElement = e.target;
                // When the user clicks 'Backspace' we delete the previous tag.
                if (e.key === 'Backspace' && tags.length > 0 &&
                    htmlElement.value === '') {
                    exports.globals.dispatch(actions_1.Actions.removeLogTag({ tag: tags[tags.length - 1] }));
                    return;
                }
                if (e.key !== 'Enter') {
                    return;
                }
                if (htmlElement.value === '') {
                    return;
                }
                exports.globals.dispatch(actions_1.Actions.addLogTag({ tag: htmlElement.value.trim() }));
                htmlElement.value = '';
            },
        }));
    };
    return LogTagsWidget;
}());
var LogTextWidget = /** @class */ (function () {
    function LogTextWidget() {
    }
    LogTextWidget.prototype.view = function () {
        return (0, mithril_1.default)('.tag-container', (0, mithril_1.default)("input.chip-input[placeholder='Search log text']", {
            onkeydown: function (e) {
                // This is to avoid zooming on 'w'(and other unexpected effects
                // of key presses in this input field).
                e.stopPropagation();
            },
            onkeyup: function (e) {
                // We want to use the value of the input field after it has been
                // updated with the latest key (onkeyup).
                var htmlElement = e.target;
                exports.globals.dispatch(actions_1.Actions.updateLogFilterText({ textEntry: htmlElement.value }));
            },
        }));
    };
    return LogTextWidget;
}());
var FilterByTextWidget = /** @class */ (function () {
    function FilterByTextWidget() {
    }
    FilterByTextWidget.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var icon = attrs.hideNonMatching ? 'unfold_less' : 'unfold_more';
        var tooltip = attrs.hideNonMatching ? 'Expand all and view highlighted' :
            'Collapse all';
        return (0, mithril_1.default)('.filter-widget', (0, mithril_1.default)('.tooltip', tooltip), (0, mithril_1.default)('i.material-icons', {
            onclick: function () {
                exports.globals.dispatch(actions_1.Actions.toggleCollapseByTextEntry({}));
            },
        }, icon));
    };
    return FilterByTextWidget;
}());
var LogsFilters = /** @class */ (function () {
    function LogsFilters() {
    }
    LogsFilters.prototype.view = function (_) {
        return (0, mithril_1.default)('.log-filters', (0, mithril_1.default)('.log-label', 'Log Level'), (0, mithril_1.default)(LogPriorityWidget, {
            options: exports.LOG_PRIORITIES,
            selectedIndex: exports.globals.state.logFilteringCriteria.minimumLevel,
            onSelect: function (minimumLevel) {
                exports.globals.dispatch(actions_1.Actions.setMinimumLogLevel({ minimumLevel: minimumLevel }));
            },
        }), (0, mithril_1.default)(LogTagsWidget, { tags: exports.globals.state.logFilteringCriteria.tags }), (0, mithril_1.default)(LogTextWidget), (0, mithril_1.default)(FilterByTextWidget, {
            hideNonMatching: exports.globals.state.logFilteringCriteria.hideNonMatching,
        }));
    };
    return LogsFilters;
}());
exports.LogsFilters = LogsFilters;
var icons_4 = require("./icons");
var validators_2 = require("../controller/validators");
var analyze_page_1 = require("./analyze_page");
var QUERY_HISTORY_KEY = 'queryHistory';
var QueryHistoryComponent = /** @class */ (function () {
    function QueryHistoryComponent() {
    }
    QueryHistoryComponent.prototype.view = function () {
        var unstarred = [];
        var starred = [];
        for (var i = exports.queryHistoryStorage.data.length - 1; i >= 0; i--) {
            var entry = exports.queryHistoryStorage.data[i];
            var arr = entry.starred ? starred : unstarred;
            arr.push({ index: i, entry: entry });
        }
        return (0, mithril_1.default)('.query-history', (0, mithril_1.default)('header.overview', "Query history (".concat(exports.queryHistoryStorage.data.length, " queries)")), starred.map(function (attrs) { return (0, mithril_1.default)(HistoryItemComponent, attrs); }), unstarred.map(function (attrs) { return (0, mithril_1.default)(HistoryItemComponent, attrs); }));
    };
    return QueryHistoryComponent;
}());
exports.QueryHistoryComponent = QueryHistoryComponent;
var HistoryItemComponent = /** @class */ (function () {
    function HistoryItemComponent() {
    }
    HistoryItemComponent.prototype.view = function (vnode) {
        var query = vnode.attrs.entry.query;
        return (0, mithril_1.default)('.history-item', (0, mithril_1.default)('.history-item-buttons', (0, mithril_1.default)('button', {
            onclick: function () {
                exports.queryHistoryStorage.setStarred(vnode.attrs.index, !vnode.attrs.entry.starred);
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, (0, mithril_1.default)(icon_1.Icon, { icon: exports.STAR, filled: vnode.attrs.entry.starred })), (0, mithril_1.default)('button', {
            onclick: function () { return (0, analyze_page_1.runAnalyzeQuery)(query); },
        }, (0, mithril_1.default)(icon_1.Icon, { icon: 'play_arrow' })), (0, mithril_1.default)('button', {
            onclick: function () {
                exports.queryHistoryStorage.remove(vnode.attrs.index);
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, (0, mithril_1.default)(icon_1.Icon, { icon: 'delete' }))), (0, mithril_1.default)('pre', query));
    };
    return HistoryItemComponent;
}());
exports.HistoryItemComponent = HistoryItemComponent;
var HistoryStorage = /** @class */ (function () {
    function HistoryStorage() {
        this.maxItems = 50;
        this.data = this.load();
    }
    HistoryStorage.prototype.saveQuery = function (query) {
        var items = this.data;
        var firstUnstarred = -1;
        var countUnstarred = 0;
        for (var i = 0; i < items.length; i++) {
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
            (0, logging_1.assertTrue)(firstUnstarred !== -1);
            items.splice(firstUnstarred, 1);
        }
        items.push({ query: query, starred: false });
        this.save();
    };
    HistoryStorage.prototype.setStarred = function (index, starred) {
        (0, logging_1.assertTrue)(index >= 0 && index < this.data.length);
        this.data[index].starred = starred;
        this.save();
    };
    HistoryStorage.prototype.remove = function (index) {
        (0, logging_1.assertTrue)(index >= 0 && index < this.data.length);
        this.data.splice(index, 1);
        this.save();
    };
    HistoryStorage.prototype.load = function () {
        var value = window.localStorage.getItem(QUERY_HISTORY_KEY);
        if (value === null) {
            return [];
        }
        return (0, validators_1.runValidator)(queryHistoryValidator, JSON.parse(value)).result;
    };
    HistoryStorage.prototype.save = function () {
        window.localStorage.setItem(QUERY_HISTORY_KEY, JSON.stringify(this.data));
    };
    return HistoryStorage;
}());
var queryHistoryEntryValidator = (0, validators_2.record)({ query: (0, validators_2.str)(), starred: (0, validators_2.bool)() });
var queryHistoryValidator = (0, validators_2.arrayOf)(queryHistoryEntryValidator);
exports.queryHistoryStorage = new HistoryStorage();
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
var hsluv_1 = require("hsluv");
var HsluvCache = /** @class */ (function () {
    function HsluvCache() {
        this.storage = new Map();
    }
    HsluvCache.prototype.get = function (hue, saturation, lightness) {
        var key = hue * 1e6 + saturation * 1e3 + lightness;
        var value = this.storage.get(key);
        if (value === undefined) {
            var computed = (0, hsluv_1.hsluvToHex)([hue, saturation, lightness]);
            this.storage.set(key, computed);
            return computed;
        }
        return value;
    };
    return HsluvCache;
}());
var cache = new HsluvCache();
function cachedHsluvToHex(hue, saturation, lightness) {
    return cache.get(hue, saturation, lightness);
}
exports.cachedHsluvToHex = cachedHsluvToHex;
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
exports.BLANK_CHECKBOX = 'check_box_outline_blank';
exports.CHECKBOX = 'check_box';
exports.INDETERMINATE_CHECKBOX = 'indeterminate_check_box';
exports.EXPAND_DOWN = 'expand_more';
exports.EXPAND_UP = 'expand_less';
exports.PIN = 'push_pin';
exports.LIBRARY_ADD_CHECK = 'library_add_check';
exports.SELECT_ALL = 'select_all';
exports.DESELECT = 'deselect';
exports.STAR = 'star';
var cache_manager_1 = require("../common/cache_manager");
var android_bug_tool_1 = require("./android_bug_tool");
function maybeOpenTraceFromRoute(route) {
    if (route.args.s) {
        // /?s=xxxx for permalinks.
        exports.globals.dispatch(actions_1.Actions.loadPermalink({ hash: route.args.s }));
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
        router_1.Router.navigate("#!/record/".concat(route.args.p));
        return;
    }
    if (route.args.local_cache_key) {
        // Handles the case of loading traces from the cache storage.
        maybeOpenCachedTrace(route.args.local_cache_key);
        return;
    }
}
exports.maybeOpenTraceFromRoute = maybeOpenTraceFromRoute;
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
function maybeOpenCachedTrace(traceUuid) {
    return __awaiter(this, void 0, void 0, function () {
        var eng, maybeTrace, navigateToOldTraceUuid, hasOpenedNewTrace;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (traceUuid === exports.globals.state.traceUuid) {
                        // Do nothing, matches the currently loaded trace.
                        return [2 /*return*/];
                    }
                    if (traceUuid === '') {
                        // This can happen if we switch from an empty UI state to an invalid UUID
                        // (e.g. due to a cache miss, below). This can also happen if the user just
                        // types /#!/viewer?local_cache_key=.
                        return [2 /*return*/];
                    }
                    // This handles the case when a trace T1 is loaded and then the url is set to
                    // ?local_cache_key=T2. In that case globals.state.traceUuid remains set to T1
                    // until T2 has been loaded by the trace processor (can take several seconds).
                    // This early out prevents to re-trigger the openTraceFromXXX() action if the
                    // URL changes (e.g. if the user navigates back/fwd) while the new trace is
                    // being loaded.
                    if (exports.globals.state.engine !== undefined) {
                        eng = exports.globals.state.engine;
                        if (eng.source.type === 'ARRAY_BUFFER' && eng.source.uuid === traceUuid) {
                            return [2 /*return*/];
                        }
                    }
                    return [4 /*yield*/, (0, cache_manager_1.tryGetTrace)(traceUuid)];
                case 1:
                    maybeTrace = _a.sent();
                    navigateToOldTraceUuid = function () {
                        router_1.Router.navigate("#!/viewer?local_cache_key=".concat(exports.globals.state.traceUuid || ''));
                    };
                    if (!maybeTrace) {
                        (0, modal_3.showModal)({
                            title: 'Could not find the trace in the cache storage',
                            content: (0, mithril_1.default)('div', (0, mithril_1.default)('p', 'You are trying to load a cached trace by setting the ' +
                                '?local_cache_key argument in the URL.'), (0, mithril_1.default)('p', 'Unfortunately the trace wasn\'t in the cache storage.'), (0, mithril_1.default)('p', 'This can happen if a tab was discarded and wasn\'t opened ' +
                                'for too long, or if you just mis-pasted the URL.'), (0, mithril_1.default)('pre', "Trace UUID: ".concat(traceUuid))),
                        });
                        navigateToOldTraceUuid();
                        return [2 /*return*/];
                    }
                    // If the UI is in a blank state (no trace has been ever opened), just load
                    // the trace without showing any further dialog. This is the case of tab
                    // discarding, reloading or pasting a url with a local_cache_key in an empty
                    // instance.
                    if (exports.globals.state.traceUuid === undefined) {
                        exports.globals.dispatch(actions_1.Actions.openTraceFromBuffer(maybeTrace));
                        return [2 /*return*/];
                    }
                    hasOpenedNewTrace = false;
                    return [4 /*yield*/, (0, modal_3.showModal)({
                            title: 'You are about to load a different trace and reset the UI state',
                            content: (0, mithril_1.default)('div', (0, mithril_1.default)('p', 'You are seeing this because you either pasted a URL with ' +
                                'a different ?local_cache_key=xxx argument or because you hit ' +
                                'the history back/fwd button and reached a different trace.'), (0, mithril_1.default)('p', 'If you continue another trace will be loaded and the UI ' +
                                'state will be cleared.'), (0, mithril_1.default)('pre', "Old trace: ".concat(exports.globals.state.traceUuid || '<no trace>', "\n") +
                                "New trace: ".concat(traceUuid))),
                            buttons: [
                                {
                                    text: 'Continue',
                                    id: 'trace_id_open',
                                    primary: true,
                                    action: function () {
                                        hasOpenedNewTrace = true;
                                        exports.globals.dispatch(actions_1.Actions.openTraceFromBuffer(maybeTrace));
                                    },
                                },
                                { text: 'Cancel' },
                            ],
                        })];
                case 2:
                    _a.sent();
                    if (!hasOpenedNewTrace) {
                        // We handle this after the modal await rather than in the cancel button
                        // action so this has effect even if the user clicks Esc or clicks outside
                        // of the modal dialog and dismisses it.
                        navigateToOldTraceUuid();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function loadTraceFromUrl(url) {
    var isLocalhostTraceUrl = ['127.0.0.1', 'localhost'].includes((new URL(url)).hostname);
    if (isLocalhostTraceUrl) {
        // This handles the special case of tools/record_android_trace serving the
        // traces from a local webserver and killing it immediately after having
        // seen the HTTP GET request. In those cases store the trace as a file, so
        // when users click on share we don't fail the re-fetch().
        var fileName_1 = url.split('/').pop() || 'local_trace.pftrace';
        var request = fetch(url)
            .then(function (response) { return response.blob(); })
            .then(function (blob) {
            exports.globals.dispatch(actions_1.Actions.openTraceFromFile({
                file: new File([blob], fileName_1),
            }));
        })
            .catch(function (e) { return alert("Could not load local trace ".concat(e)); });
        exports.taskTracker.trackPromise(request, 'Downloading local trace');
    }
    else {
        exports.globals.dispatch(actions_1.Actions.openTraceFromUrl({ url: url }));
    }
}
function openTraceFromAndroidBugTool() {
    // TODO(hjd): Unify updateStatus and TaskTracker
    exports.globals.dispatch(actions_1.Actions.updateStatus({ msg: 'Loading trace from ABT extension', timestamp: Date.now() / 1000 }));
    var loadInfo = (0, android_bug_tool_1.loadAndroidBugToolInfo)();
    exports.taskTracker.trackPromise(loadInfo, 'Loading trace from ABT extension');
    loadInfo
        .then(function (info) {
        exports.globals.dispatch(actions_1.Actions.openTraceFromFile({
            file: info.file,
        }));
    })
        .catch(function (e) {
        console.error(e);
    });
}
var checkerboard_1 = require("./checkerboard");
// The abstract class that needs to be implemented by all tracks.
var Track = /** @class */ (function () {
    function Track(args) {
        // When true this is a new controller-less track type.
        // TODO(hjd): eventually all tracks will be controller-less and this
        // should be removed then.
        this.frontendOnly = false;
        this.trackId = args.trackId;
        this.engine = args.engine;
        this.lastTrackState = (0, logging_2.assertExists)(exports.globals.state.tracks[this.trackId]);
    }
    // Last call the track will receive. Called just before the last reference to
    // this object is removed.
    Track.prototype.onDestroy = function () { };
    Object.defineProperty(Track.prototype, "trackState", {
        get: function () {
            // We can end up in a state where a Track is still in the mithril renderer
            // tree but its corresponding state has been deleted. This can happen in the
            // interval of time between a track being removed from the state and the
            // next animation frame that would remove the Track object. If a mouse event
            // is dispatched in the meanwhile (or a promise is resolved), we need to be
            // able to access the state. Hence the caching logic here.
            var trackState = exports.globals.state.tracks[this.trackId];
            if (trackState === undefined) {
                return this.lastTrackState;
            }
            this.lastTrackState = trackState;
            return trackState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "config", {
        get: function () {
            return this.trackState.config;
        },
        enumerable: false,
        configurable: true
    });
    Track.prototype.data = function () {
        if (this.frontendOnly) {
            return undefined;
        }
        return exports.globals.trackDataStore.get(this.trackId);
    };
    Track.prototype.getHeight = function () {
        return 40;
    };
    Track.prototype.getTrackShellButtons = function () {
        return [];
    };
    Track.prototype.getContextMenu = function () {
        return null;
    };
    Track.prototype.onMouseMove = function (_position) { };
    // Returns whether the mouse click has selected something.
    // Used to prevent further propagation if necessary.
    Track.prototype.onMouseClick = function (_position) {
        return false;
    };
    Track.prototype.onMouseOut = function () { };
    Track.prototype.onFullRedraw = function () { };
    Track.prototype.render = function (ctx) {
        exports.globals.frontendLocalState.addVisibleTrack(this.trackState.id);
        if (this.data() === undefined && !this.frontendOnly) {
            var _a = exports.globals.frontendLocalState, visibleWindowTime = _a.visibleWindowTime, timeScale_2 = _a.timeScale;
            var startPx = Math.floor(timeScale_2.timeToPx(visibleWindowTime.start));
            var endPx = Math.ceil(timeScale_2.timeToPx(visibleWindowTime.end));
            (0, checkerboard_1.checkerboard)(ctx, this.getHeight(), startPx, endPx);
        }
        else {
            this.renderCanvas(ctx);
        }
    };
    Track.prototype.drawTrackHoverTooltip = function (ctx, pos, text, text2) {
        ctx.font = '10px Roboto Condensed';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        // TODO(hjd): Avoid measuring text all the time (just use monospace?)
        var textMetrics = ctx.measureText(text);
        var text2Metrics = ctx.measureText(text2 || '');
        // Padding on each side of the box containing the tooltip:
        var paddingPx = 4;
        // Figure out the width of the tool tip box:
        var width = Math.max(textMetrics.width, text2Metrics.width);
        width += paddingPx * 2;
        // and the height:
        var height = 0;
        height += textMetrics.fontBoundingBoxAscent;
        height += textMetrics.fontBoundingBoxDescent;
        if (text2 !== undefined) {
            height += text2Metrics.fontBoundingBoxAscent;
            height += text2Metrics.fontBoundingBoxDescent;
        }
        height += paddingPx * 2;
        var x = pos.x;
        var y = pos.y;
        // Move box to the top right of the mouse:
        x += 10;
        y -= 10;
        // Ensure the box is on screen:
        var endPx = exports.globals.frontendLocalState.timeScale.endPx;
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
        ctx.fillText(text, x + paddingPx, y + paddingPx + textMetrics.fontBoundingBoxAscent);
        if (text2 !== undefined) {
            var yOffsetPx = textMetrics.fontBoundingBoxAscent +
                textMetrics.fontBoundingBoxDescent +
                text2Metrics.fontBoundingBoxAscent;
            ctx.fillText(text2, x + paddingPx, y + paddingPx + yOffsetPx);
        }
    };
    // Returns a place where a given slice should be drawn. Should be implemented
    // only for track types that support slices e.g. chrome_slice, async_slices
    // tStart - slice start time in seconds, tEnd - slice end time in seconds,
    // depth - slice depth
    Track.prototype.getSliceRect = function (_tStart, _tEnd, _depth) {
        return undefined;
    };
    return Track;
}());
exports.Track = Track;
var colorizer_6 = require("../common/colorizer");
var sidebar_3 = require("./sidebar");
var FLAG_WIDTH = 16;
var AREA_TRIANGLE_WIDTH = 10;
var FLAG = "\uE153";
function toSummary(s) {
    var newlineIndex = s.indexOf('\n') > 0 ? s.indexOf('\n') : s.length;
    return s.slice(0, Math.min(newlineIndex, s.length, 16));
}
function getStartTimestamp(note) {
    if (note.noteType === 'AREA') {
        return exports.globals.state.areas[note.areaId].startSec;
    }
    else {
        return note.timestamp;
    }
}
var NotesPanel = /** @class */ (function (_super) {
    __extends(NotesPanel, _super);
    function NotesPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hoveredX = null;
        return _this;
    }
    NotesPanel.prototype.oncreate = function (_a) {
        var _this = this;
        var dom = _a.dom;
        dom.addEventListener('mousemove', function (e) {
            _this.hoveredX = e.layerX - exports.TRACK_SHELL_WIDTH;
            exports.globals.rafScheduler.scheduleRedraw();
        }, { passive: true });
        dom.addEventListener('mouseenter', function (e) {
            _this.hoveredX = e.layerX - exports.TRACK_SHELL_WIDTH;
            exports.globals.rafScheduler.scheduleRedraw();
        });
        dom.addEventListener('mouseout', function () {
            _this.hoveredX = null;
            exports.globals.dispatch(actions_1.Actions.setHoveredNoteTimestamp({ ts: -1 }));
        }, { passive: true });
    };
    NotesPanel.prototype.view = function () {
        var _this = this;
        var allCollapsed = Object.values(exports.globals.state.trackGroups)
            .every(function (group) { return group.collapsed; });
        return (0, mithril_1.default)('.notes-panel', {
            onclick: function (e) {
                _this.onClick(e.layerX - exports.TRACK_SHELL_WIDTH, e.layerY);
                e.stopPropagation();
            },
        }, (0, sidebar_3.isTraceLoaded)() ?
            [
                (0, mithril_1.default)('button', {
                    onclick: function (e) {
                        e.preventDefault();
                        exports.globals.dispatch(actions_1.Actions.toggleAllTrackGroups({ collapsed: !allCollapsed }));
                    },
                }, (0, mithril_1.default)('i.material-icons', { title: allCollapsed ? 'Expand all' : 'Collapse all' }, allCollapsed ? 'unfold_more' : 'unfold_less')),
                (0, mithril_1.default)('button', {
                    onclick: function (e) {
                        e.preventDefault();
                        exports.globals.dispatch(actions_1.Actions.clearAllPinnedTracks({}));
                    },
                }, (0, mithril_1.default)('i.material-icons', { title: 'Clear all pinned tracks' }, 'clear_all')),
            ] :
            '');
    };
    NotesPanel.prototype.renderCanvas = function (ctx, size) {
        var timeScale = exports.globals.frontendLocalState.timeScale;
        var aNoteIsHovered = false;
        ctx.fillStyle = '#999';
        ctx.fillRect(exports.TRACK_SHELL_WIDTH - 2, 0, 2, size.height);
        var relScale = (0, gridline_helper_2.timeScaleForVisibleWindow)(exports.TRACK_SHELL_WIDTH, size.width);
        if (relScale.timeSpan.duration > 0 && relScale.widthPx > 0) {
            for (var _i = 0, _a = new gridline_helper_1.TickGenerator(relScale); _i < _a.length; _i++) {
                var _b = _a[_i], type = _b.type, position = _b.position;
                if (type === gridline_helper_1.TickType.MAJOR)
                    ctx.fillRect(position, 0, 1, size.height);
            }
        }
        ctx.textBaseline = 'bottom';
        ctx.font = '10px Helvetica';
        for (var _c = 0, _d = Object.values(exports.globals.state.notes); _c < _d.length; _c++) {
            var note = _d[_c];
            var timestamp = getStartTimestamp(note);
            // TODO(hjd): We should still render area selection marks in viewport is
            // *within* the area (e.g. both lhs and rhs are out of bounds).
            if ((note.noteType !== 'AREA' && !timeScale.timeInBounds(timestamp)) ||
                (note.noteType === 'AREA' &&
                    !timeScale.timeInBounds(exports.globals.state.areas[note.areaId].endSec) &&
                    !timeScale.timeInBounds(exports.globals.state.areas[note.areaId].startSec))) {
                continue;
            }
            var currentIsHovered = this.hoveredX && this.mouseOverNote(this.hoveredX, note);
            if (currentIsHovered)
                aNoteIsHovered = true;
            var selection = exports.globals.state.currentSelection;
            var isSelected_1 = selection !== null &&
                ((selection.kind === 'NOTE' && selection.id === note.id) ||
                    (selection.kind === 'AREA' && selection.noteId === note.id));
            var x = timeScale.timeToPx(timestamp);
            var left = Math.floor(x + exports.TRACK_SHELL_WIDTH);
            // Draw flag or marker.
            if (note.noteType === 'AREA') {
                var area = exports.globals.state.areas[note.areaId];
                this.drawAreaMarker(ctx, left, Math.floor(timeScale.timeToPx(area.endSec) + exports.TRACK_SHELL_WIDTH), note.color, isSelected_1);
            }
            else {
                this.drawFlag(ctx, left, size.height, note.color, isSelected_1);
            }
            if (note.text) {
                var summary = toSummary(note.text);
                var measured = ctx.measureText(summary);
                // Add a white semi-transparent background for the text.
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(left + FLAG_WIDTH + 2, size.height + 2, measured.width + 2, -12);
                ctx.fillStyle = '#3c4b5d';
                ctx.fillText(summary, left + FLAG_WIDTH + 3, size.height + 1);
            }
        }
        // A real note is hovered so we don't need to see the preview line.
        // TODO(hjd): Change cursor to pointer here.
        if (aNoteIsHovered) {
            exports.globals.dispatch(actions_1.Actions.setHoveredNoteTimestamp({ ts: -1 }));
        }
        // View preview note flag when hovering on notes panel.
        if (!aNoteIsHovered && this.hoveredX !== null) {
            var timestamp = timeScale.pxToTime(this.hoveredX);
            if (timeScale.timeInBounds(timestamp)) {
                exports.globals.dispatch(actions_1.Actions.setHoveredNoteTimestamp({ ts: timestamp }));
                var x = timeScale.timeToPx(timestamp);
                var left = Math.floor(x + exports.TRACK_SHELL_WIDTH);
                this.drawFlag(ctx, left, size.height, '#aaa', /* fill */ true);
            }
        }
    };
    NotesPanel.prototype.drawAreaMarker = function (ctx, x, xEnd, color, fill) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        var topOffset = 10;
        // Don't draw in the track shell section.
        if (x >= exports.globals.frontendLocalState.timeScale.startPx + exports.TRACK_SHELL_WIDTH) {
            // Draw left triangle.
            ctx.beginPath();
            ctx.moveTo(x, topOffset);
            ctx.lineTo(x, topOffset + AREA_TRIANGLE_WIDTH);
            ctx.lineTo(x + AREA_TRIANGLE_WIDTH, topOffset);
            ctx.lineTo(x, topOffset);
            if (fill)
                ctx.fill();
            ctx.stroke();
        }
        // Draw right triangle.
        ctx.beginPath();
        ctx.moveTo(xEnd, topOffset);
        ctx.lineTo(xEnd, topOffset + AREA_TRIANGLE_WIDTH);
        ctx.lineTo(xEnd - AREA_TRIANGLE_WIDTH, topOffset);
        ctx.lineTo(xEnd, topOffset);
        if (fill)
            ctx.fill();
        ctx.stroke();
        // Start line after track shell section, join triangles.
        var startDraw = Math.max(x, exports.globals.frontendLocalState.timeScale.startPx + exports.TRACK_SHELL_WIDTH);
        ctx.beginPath();
        ctx.moveTo(startDraw, topOffset);
        ctx.lineTo(xEnd, topOffset);
        ctx.stroke();
    };
    NotesPanel.prototype.drawFlag = function (ctx, x, height, color, fill) {
        var prevFont = ctx.font;
        var prevBaseline = ctx.textBaseline;
        ctx.textBaseline = 'alphabetic';
        // Adjust height for icon font.
        ctx.font = '24px Material Symbols Sharp';
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        // The ligatures have padding included that means the icon is not drawn
        // exactly at the x value. This adjusts for that.
        var iconPadding = 6;
        if (fill) {
            ctx.fillText(FLAG, x - iconPadding, height + 2);
        }
        else {
            ctx.strokeText(FLAG, x - iconPadding, height + 2.5);
        }
        ctx.font = prevFont;
        ctx.textBaseline = prevBaseline;
    };
    NotesPanel.prototype.onClick = function (x, _) {
        if (x < 0)
            return;
        var timeScale = exports.globals.frontendLocalState.timeScale;
        var timestamp = timeScale.pxToTime(x);
        for (var _i = 0, _a = Object.values(exports.globals.state.notes); _i < _a.length; _i++) {
            var note = _a[_i];
            if (this.hoveredX && this.mouseOverNote(this.hoveredX, note)) {
                if (note.noteType === 'AREA') {
                    exports.globals.makeSelection(actions_1.Actions.reSelectArea({ areaId: note.areaId, noteId: note.id }));
                }
                else {
                    exports.globals.makeSelection(actions_1.Actions.selectNote({ id: note.id }));
                }
                return;
            }
        }
        var color = (0, colorizer_6.randomColor)();
        exports.globals.makeSelection(actions_1.Actions.addNote({ timestamp: timestamp, color: color }));
    };
    NotesPanel.prototype.mouseOverNote = function (x, note) {
        var timeScale = exports.globals.frontendLocalState.timeScale;
        var noteX = timeScale.timeToPx(getStartTimestamp(note));
        if (note.noteType === 'AREA') {
            var noteArea = exports.globals.state.areas[note.areaId];
            return (noteX <= x && x < noteX + AREA_TRIANGLE_WIDTH) ||
                (timeScale.timeToPx(noteArea.endSec) > x &&
                    x > timeScale.timeToPx(noteArea.endSec) - AREA_TRIANGLE_WIDTH);
        }
        else {
            var width = FLAG_WIDTH;
            return noteX <= x && x < noteX + width;
        }
    };
    return NotesPanel;
}(panel_1.Panel));
exports.NotesPanel = NotesPanel;
var NotesEditorTab = /** @class */ (function (_super) {
    __extends(NotesEditorTab, _super);
    function NotesEditorTab(args) {
        return _super.call(this, args) || this;
    }
    NotesEditorTab.create = function (args) {
        return new notes_panel_2.NotesEditorTab(args);
    };
    NotesEditorTab.prototype.renderTabCanvas = function () { };
    NotesEditorTab.prototype.getTitle = function () {
        return 'Current Selection';
    };
    NotesEditorTab.prototype.viewTab = function () {
        var _this = this;
        var note = exports.globals.state.notes[this.config.id];
        if (note === undefined) {
            return (0, mithril_1.default)('.', "No Note with id ".concat(this.config.id));
        }
        var startTime = getStartTimestamp(note) - exports.globals.state.traceTime.startSec;
        return (0, mithril_1.default)('.notes-editor-panel', (0, mithril_1.default)('.notes-editor-panel-heading-bar', (0, mithril_1.default)('.notes-editor-panel-heading', "Annotation at ".concat((0, time_5.timeToString)(startTime))), (0, mithril_1.default)('input[type=text]', {
            onkeydown: function (e) {
                e.stopImmediatePropagation();
            },
            value: note.text,
            onchange: function (e) {
                var newText = e.target.value;
                exports.globals.dispatch(actions_1.Actions.changeNoteText({
                    id: _this.config.id,
                    newText: newText,
                }));
            },
        }), (0, mithril_1.default)('span.color-change', "Change color: ", (0, mithril_1.default)('input[type=color]', {
            value: note.color,
            onchange: function (e) {
                var newColor = e.target.value;
                exports.globals.dispatch(actions_1.Actions.changeNoteColor({
                    id: _this.config.id,
                    newColor: newColor,
                }));
            },
        })), (0, mithril_1.default)('button', {
            onclick: function () {
                exports.globals.dispatch(actions_1.Actions.removeNote({ id: _this.config.id }));
                exports.globals.dispatch(actions_1.Actions.setCurrentTab({ tab: undefined }));
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, 'Remove')));
    };
    NotesEditorTab.kind = 'org.perfetto.NotesEditorTab';
    return NotesEditorTab;
}(bottom_tab_1.BottomTab));
exports.NotesEditorTab = NotesEditorTab;
exports.bottomTabRegistry.register(notes_panel_2.NotesEditorTab);
exports.bottomTabRegistry = registry_1.Registry.kindRegistry();
// Period to wait for the newly-added tabs which are loading before showing
// them to the user. This period is short enough to not be user-visible,
// while being long enough for most of the simple queries to complete, reducing
// flickering in the UI.
var NEW_LOADING_TAB_DELAY_MS = 50;
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
var BottomTabBase = /** @class */ (function () {
    function BottomTabBase(args) {
        this.config = args.config;
        this.engine = args.engine;
        this.tag = args.tag;
        this.uuid = args.uuid;
    }
    // API for the tab to notify the TabList that it's still preparing the data.
    // If true, adding a new tab will be delayed for a short while (~50ms) to
    // reduce the flickering.
    //
    // Note: it's a "poll" rather than "push" API: there is no explicit API
    // for the tabs to notify the tab list, as the tabs are expected to schedule
    // global redraw anyway and the tab list will poll the tabs as necessary
    // during the redraw.
    BottomTabBase.prototype.isLoading = function () {
        return false;
    };
    return BottomTabBase;
}());
exports.BottomTabBase = BottomTabBase;
// BottomTabBase provides a more generic API allowing users to provide their
// custom mithril component, which would allow them to listen to mithril
// lifecycle events. Most cases, however, don't need them and BottomTab
// provides a simplified API for the common case.
var BottomTab = /** @class */ (function (_super) {
    __extends(BottomTab, _super);
    function BottomTab(args) {
        return _super.call(this, args) || this;
    }
    BottomTab.prototype.createPanelVnode = function () {
        return (0, mithril_1.default)(BottomTabAdapter, { key: this.uuid, panel: this });
    };
    return BottomTab;
}(BottomTabBase));
exports.BottomTab = BottomTab;
var BottomTabAdapter = /** @class */ (function (_super) {
    __extends(BottomTabAdapter, _super);
    function BottomTabAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BottomTabAdapter.prototype.renderCanvas = function (ctx, size, vnode) {
        vnode.attrs.panel.renderTabCanvas(ctx, size);
    };
    BottomTabAdapter.prototype.view = function (vnode) {
        return vnode.attrs.panel.viewTab();
    };
    return BottomTabAdapter;
}(panel_1.Panel));
// Shorthand for globals.bottomTabList.addTab(...) & redraw.
// Ignored when bottomTabList does not exist (e.g. no trace is open in the UI).
function addTab(args) {
    var tabList = exports.globals.bottomTabList;
    if (!tabList) {
        return;
    }
    tabList.addTab(args);
    exports.globals.rafScheduler.scheduleFullRedraw();
}
exports.addTab = addTab;
// Shorthand for globals.bottomTabList.closeTabById(...) & redraw.
// Ignored when bottomTabList does not exist (e.g. no trace is open in the UI).
function closeTab(uuid) {
    var tabList = exports.globals.bottomTabList;
    if (!tabList) {
        return;
    }
    tabList.closeTabById(uuid);
    exports.globals.rafScheduler.scheduleFullRedraw();
}
exports.closeTab = closeTab;
function tabSelectionKey(tab) {
    var _a;
    return (_a = tab.tag) !== null && _a !== void 0 ? _a : tab.uuid;
}
var BottomTabList = /** @class */ (function () {
    function BottomTabList(engine) {
        this.tabs = [];
        this.pendingTabs = [];
        this.engine = engine;
    }
    BottomTabList.prototype.getTabs = function () {
        this.flushPendingTabs();
        return this.tabs;
    };
    // Add and create a new panel with given kind and config, replacing an
    // existing panel with the same tag if needed. Returns the uuid of a newly
    // created panel (which can be used in the future to close it).
    BottomTabList.prototype.addTab = function (args) {
        var uuid = (0, uuid_1.v4)();
        var newPanel = exports.bottomTabRegistry.get(args.kind).create({
            engine: this.engine,
            uuid: uuid,
            config: args.config,
            tag: args.tag,
        });
        this.pendingTabs.push({
            tab: newPanel,
            args: args,
            startTime: window.performance.now(),
        });
        this.flushPendingTabs();
        return {
            uuid: uuid,
        };
    };
    BottomTabList.prototype.closeTabByTag = function (tag) {
        var index = this.tabs.findIndex(function (tab) { return tab.tag === tag; });
        if (index !== -1) {
            this.removeTabAtIndex(index);
        }
        // User closing a tab by tag should affect pending tabs as well, as these
        // tabs were requested to be added to the tab list before this call.
        this.pendingTabs = this.pendingTabs.filter(function (_a) {
            var tab = _a.tab;
            return tab.tag !== tag;
        });
    };
    BottomTabList.prototype.closeTabById = function (uuid) {
        var index = this.tabs.findIndex(function (tab) { return tab.uuid === uuid; });
        if (index !== -1) {
            this.removeTabAtIndex(index);
        }
        // User closing a tab by id should affect pending tabs as well, as these
        // tabs were requested to be added to the tab list before this call.
        this.pendingTabs = this.pendingTabs.filter(function (_a) {
            var tab = _a.tab;
            return tab.uuid !== uuid;
        });
    };
    BottomTabList.prototype.removeTabAtIndex = function (index) {
        var tab = this.tabs[index];
        this.tabs.splice(index, 1);
        // If the current tab was closed, select the tab to the right of it.
        // If the closed tab was current and last in the tab list, select the tab
        // that became last.
        if (tab.uuid === exports.globals.state.currentTab && this.tabs.length > 0) {
            var newActiveIndex = index === this.tabs.length ? index - 1 : index;
            exports.globals.dispatch(actions_1.Actions.setCurrentTab({ tab: tabSelectionKey(this.tabs[newActiveIndex]) }));
        }
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    // Check the list of the pending tabs and add the ones that are ready
    // (either tab.isLoading returns false or NEW_LOADING_TAB_DELAY_MS ms elapsed
    // since this tab was added).
    // Note: the pending tabs are stored in a queue to preserve the action order,
    // which matters for cases like adding tabs with the same tag.
    BottomTabList.prototype.flushPendingTabs = function () {
        var currentTime = window.performance.now();
        var _loop_7 = function () {
            var _a = this_3.pendingTabs[0], tab = _a.tab, args = _a.args, startTime = _a.startTime;
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
            var currentSelectionTabAlreadyExists = this_3.tabs.filter(function (tab) { return tab.tag === 'current_selection'; }).length > 0;
            var dirtyHackForCurrentSelectionApplies = tab.tag === 'current_selection' && !currentSelectionTabAlreadyExists;
            var elapsedTimeMs = currentTime - startTime;
            if (tab.isLoading() && elapsedTimeMs < NEW_LOADING_TAB_DELAY_MS &&
                !dirtyHackForCurrentSelectionApplies) {
                this_3.schedulePendingTabsFlush(NEW_LOADING_TAB_DELAY_MS - elapsedTimeMs);
                return { value: void 0 };
            }
            this_3.pendingTabs.shift();
            var index = args.tag ? this_3.tabs.findIndex(function (tab) { return tab.tag === args.tag; }) : -1;
            if (index === -1) {
                this_3.tabs.push(tab);
            }
            else {
                this_3.tabs[index] = tab;
            }
            if (args.select === undefined || args.select === true) {
                exports.globals.dispatch(actions_1.Actions.setCurrentTab({ tab: tabSelectionKey(tab) }));
            }
        };
        var this_3 = this;
        while (this.pendingTabs.length > 0) {
            var state_7 = _loop_7();
            if (typeof state_7 === "object")
                return state_7.value;
        }
    };
    BottomTabList.prototype.schedulePendingTabsFlush = function (waitTimeMs) {
        var _this = this;
        if (this.scheduledFlushSetTimeoutId) {
            // The flush is already pending, no action is required.
            return;
        }
        setTimeout(function () {
            _this.scheduledFlushSetTimeoutId = undefined;
            _this.flushPendingTabs();
        }, waitTimeMs);
    };
    return BottomTabList;
}());
exports.BottomTabList = BottomTabList;
var Anchor = /** @class */ (function () {
    function Anchor() {
    }
    Anchor.prototype.view = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var icon = attrs.icon, htmlAttrs = __rest(attrs, ["icon"]);
        return (0, mithril_1.default)('a.pf-anchor', htmlAttrs, icon && (0, mithril_1.default)('i.material-icons', icon), children);
    };
    return Anchor;
}());
exports.Anchor = Anchor;
function defaultSort(a, b) {
    return a.localeCompare(b);
}
var DocsChip = /** @class */ (function () {
    function DocsChip() {
    }
    DocsChip.prototype.view = function (_a) {
        var attrs = _a.attrs;
        return (0, mithril_1.default)('a.inline-chip', { href: attrs.href, title: 'Open docs in new tab', target: '_blank' }, (0, mithril_1.default)('i.material-icons', 'info'), ' Docs');
    };
    return DocsChip;
}());
var Probe = /** @class */ (function () {
    function Probe() {
    }
    Probe.prototype.view = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var onToggle = function (enabled) {
            var traceCfg = (0, immer_1.produce)(exports.globals.state.recordConfig, function (draft) {
                attrs.setEnabled(draft, enabled);
            });
            exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: traceCfg }));
        };
        var enabled = attrs.isEnabled(exports.globals.state.recordConfig);
        return (0, mithril_1.default)(".probe".concat(attrs.compact ? '.compact' : '').concat(enabled ? '.enabled' : ''), attrs.img && (0, mithril_1.default)('img', {
            src: "".concat(exports.globals.root, "assets/").concat(attrs.img),
            onclick: function () { return onToggle(!enabled); },
        }), (0, mithril_1.default)('label', (0, mithril_1.default)("input[type=checkbox]", {
            checked: enabled,
            oninput: function (e) {
                onToggle(e.target.checked);
            },
        }), (0, mithril_1.default)('span', attrs.title)), attrs.compact ?
            '' :
            (0, mithril_1.default)('div', (0, mithril_1.default)('div', attrs.descr), (0, mithril_1.default)('.probe-config', children)));
    };
    return Probe;
}());
exports.Probe = Probe;
function CompactProbe(args) {
    return (0, mithril_1.default)(record_widgets_1.Probe, {
        title: args.title,
        img: null,
        compact: true,
        descr: '',
        isEnabled: args.isEnabled,
        setEnabled: args.setEnabled,
    });
}
exports.CompactProbe = CompactProbe;
var Toggle = /** @class */ (function () {
    function Toggle() {
    }
    Toggle.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var onToggle = function (enabled) {
            var traceCfg = (0, immer_1.produce)(exports.globals.state.recordConfig, function (draft) {
                attrs.setEnabled(draft, enabled);
            });
            exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: traceCfg }));
        };
        var enabled = attrs.isEnabled(exports.globals.state.recordConfig);
        return (0, mithril_1.default)(".toggle".concat(enabled ? '.enabled' : '').concat(attrs.cssClass || ''), (0, mithril_1.default)('label', (0, mithril_1.default)("input[type=checkbox]", {
            checked: enabled,
            oninput: function (e) {
                onToggle(e.target.checked);
            },
        }), (0, mithril_1.default)('span', attrs.title)), (0, mithril_1.default)('.descr', attrs.descr));
    };
    return Toggle;
}());
exports.Toggle = Toggle;
var Slider = /** @class */ (function () {
    function Slider() {
    }
    Slider.prototype.onValueChange = function (attrs, newVal) {
        var traceCfg = (0, immer_1.produce)(exports.globals.state.recordConfig, function (draft) {
            attrs.set(draft, newVal);
        });
        exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: traceCfg }));
    };
    Slider.prototype.onTimeValueChange = function (attrs, hms) {
        try {
            var date = new Date("1970-01-01T".concat(hms, ".000Z"));
            if (isNaN(date.getTime()))
                return;
            this.onValueChange(attrs, date.getTime());
        }
        catch (_a) {
        }
    };
    Slider.prototype.onSliderChange = function (attrs, newIdx) {
        this.onValueChange(attrs, attrs.values[newIdx]);
    };
    Slider.prototype.view = function (_a) {
        var _this = this;
        var attrs = _a.attrs;
        var id = attrs.title.replace(/[^a-z0-9]/gmi, '_').toLowerCase();
        var maxIdx = attrs.values.length - 1;
        var val = attrs.get(exports.globals.state.recordConfig);
        var min = attrs.min || 1;
        if (attrs.zeroIsDefault) {
            min = Math.min(0, min);
        }
        var description = attrs.description;
        var disabled = attrs.disabled;
        // Find the index of the closest value in the slider.
        var idx = 0;
        for (; idx < attrs.values.length && attrs.values[idx] < val; idx++) {
        }
        var spinnerCfg = {};
        if (attrs.isTime) {
            spinnerCfg = {
                type: 'text',
                pattern: '(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}',
                value: new Date(val).toISOString().substr(11, 8),
                oninput: function (e) {
                    _this.onTimeValueChange(attrs, e.target.value);
                },
            };
        }
        else {
            var isDefault = attrs.zeroIsDefault && val === 0;
            spinnerCfg = {
                type: 'number',
                value: isDefault ? '' : val,
                placeholder: isDefault ? '(default)' : '',
                oninput: function (e) {
                    _this.onValueChange(attrs, +e.target.value);
                },
            };
        }
        return (0, mithril_1.default)('.slider' + (attrs.cssClass || ''), (0, mithril_1.default)('header', attrs.title), description ? (0, mithril_1.default)('header.descr', attrs.description) : '', attrs.icon !== undefined ? (0, mithril_1.default)('i.material-icons', attrs.icon) : [], (0, mithril_1.default)("input[id=\"".concat(id, "\"][type=range][min=0][max=").concat(maxIdx, "][value=").concat(idx, "]"), {
            disabled: disabled,
            oninput: function (e) {
                _this.onSliderChange(attrs, +e.target.value);
            },
        }), (0, mithril_1.default)("input.spinner[min=".concat(min, "][for=").concat(id, "]"), spinnerCfg), (0, mithril_1.default)('.unit', attrs.unit));
    };
    return Slider;
}());
exports.Slider = Slider;
var Dropdown = /** @class */ (function () {
    function Dropdown() {
    }
    Dropdown.prototype.resetScroll = function (dom) {
        // Chrome seems to override the scroll offset on creationa, b without this,
        // even though we call it after having marked the options as selected.
        setTimeout(function () {
            // Don't reset the scroll position if the element is still focused.
            if (dom !== document.activeElement)
                dom.scrollTop = 0;
        }, 0);
    };
    Dropdown.prototype.onChange = function (attrs, e) {
        var dom = e.target;
        var selKeys = [];
        for (var i = 0; i < dom.selectedOptions.length; i++) {
            var item = (0, logging_2.assertExists)(dom.selectedOptions.item(i));
            selKeys.push(item.value);
        }
        var traceCfg = (0, immer_1.produce)(exports.globals.state.recordConfig, function (draft) {
            attrs.set(draft, selKeys);
        });
        exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: traceCfg }));
    };
    Dropdown.prototype.view = function (_a) {
        var _this = this;
        var attrs = _a.attrs;
        var options = [];
        var selItems = attrs.get(exports.globals.state.recordConfig);
        var numSelected = 0;
        var entries = __spreadArray([], attrs.options.entries(), true);
        var f = attrs.sort === undefined ? defaultSort : attrs.sort;
        entries.sort(function (a, b) { return f(a[1], b[1]); });
        for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
            var _b = entries_2[_i], key = _b[0], label_1 = _b[1];
            var opts = { value: key, selected: false };
            if (selItems.includes(key)) {
                opts.selected = true;
                numSelected++;
            }
            options.push((0, mithril_1.default)('option', opts, label_1));
        }
        var label = "".concat(attrs.title, " ").concat(numSelected ? "(".concat(numSelected, ")") : '');
        return (0, mithril_1.default)("select.dropdown".concat(attrs.cssClass || '', "[multiple=multiple]"), {
            onblur: function (e) { return _this.resetScroll(e.target); },
            onmouseleave: function (e) {
                return _this.resetScroll(e.target);
            },
            oninput: function (e) { return _this.onChange(attrs, e); },
            oncreate: function (vnode) { return _this.resetScroll(vnode.dom); },
        }, (0, mithril_1.default)('optgroup', { label: label }, options));
    };
    return Dropdown;
}());
exports.Dropdown = Dropdown;
var Textarea = /** @class */ (function () {
    function Textarea() {
    }
    Textarea.prototype.onChange = function (attrs, dom) {
        var traceCfg = (0, immer_1.produce)(exports.globals.state.recordConfig, function (draft) {
            attrs.set(draft, dom.value);
        });
        exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: traceCfg }));
    };
    Textarea.prototype.view = function (_a) {
        var _this = this;
        var attrs = _a.attrs;
        return (0, mithril_1.default)('.textarea-holder', (0, mithril_1.default)('header', attrs.title, attrs.docsLink && [' ', (0, mithril_1.default)(DocsChip, { href: attrs.docsLink })]), (0, mithril_1.default)("textarea.extra-input".concat(attrs.cssClass || ''), {
            onchange: function (e) {
                return _this.onChange(attrs, e.target);
            },
            placeholder: attrs.placeholder,
            value: attrs.get(exports.globals.state.recordConfig),
        }));
    };
    return Textarea;
}());
exports.Textarea = Textarea;
var CodeSnippet = /** @class */ (function () {
    function CodeSnippet() {
    }
    CodeSnippet.prototype.view = function (_a) {
        var attrs = _a.attrs;
        return (0, mithril_1.default)('.code-snippet', (0, mithril_1.default)('button', {
            title: 'Copy to clipboard',
            onclick: function () { return (0, clipboard_1.copyToClipboard)(attrs.text); },
        }, (0, mithril_1.default)('i.material-icons', 'assignment')), (0, mithril_1.default)('code', attrs.text));
    };
    return CodeSnippet;
}());
exports.CodeSnippet = CodeSnippet;
var CategoriesCheckboxList = /** @class */ (function () {
    function CategoriesCheckboxList() {
    }
    CategoriesCheckboxList.prototype.updateValue = function (attrs, value, enabled) {
        var traceCfg = (0, immer_1.produce)(exports.globals.state.recordConfig, function (draft) {
            var values = attrs.get(draft);
            var index = values.indexOf(value);
            if (enabled && index === -1) {
                values.push(value);
            }
            if (!enabled && index !== -1) {
                values.splice(index, 1);
            }
        });
        exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: traceCfg }));
    };
    CategoriesCheckboxList.prototype.view = function (_a) {
        var _this = this;
        var attrs = _a.attrs;
        var enabled = new Set(attrs.get(exports.globals.state.recordConfig));
        return (0, mithril_1.default)('.categories-list', (0, mithril_1.default)('h3', attrs.title, (0, mithril_1.default)('button.config-button', {
            onclick: function () {
                var config = (0, immer_1.produce)(exports.globals.state.recordConfig, function (draft) {
                    attrs.set(draft, Array.from(attrs.categories.keys()));
                });
                exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: config }));
            },
        }, 'All'), (0, mithril_1.default)('button.config-button', {
            onclick: function () {
                var config = (0, immer_1.produce)(exports.globals.state.recordConfig, function (draft) {
                    attrs.set(draft, []);
                });
                exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: config }));
            },
        }, 'None')), (0, mithril_1.default)('ul.checkboxes', Array.from(attrs.categories.entries()).map(function (_a) {
            var key = _a[0], value = _a[1];
            var id = "category-checkbox-".concat(key);
            return (0, mithril_1.default)('label', { 'for': id }, (0, mithril_1.default)('li', (0, mithril_1.default)('input[type=checkbox]', {
                id: id,
                checked: enabled.has(key),
                onclick: function (e) {
                    var target = e.target;
                    _this.updateValue(attrs, key, target.checked);
                },
            }), value));
        })));
    };
    return CategoriesCheckboxList;
}());
exports.CategoriesCheckboxList = CategoriesCheckboxList;
// Join class names together into valid HTML class attributes
// Falsey elements are ignored
// Nested arrays are flattened
function classNames() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.flat().filter(function (x) { return x; }).join(' ');
}
exports.classNames = classNames;
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
require("../common/query_result");
var logging_5 = require("../base/logging");
var actions_2 = require("../common/actions");
var feature_flags_2 = require("../common/feature_flags");
var immer_init_1 = require("../common/immer_init");
var plugins_1 = require("../common/plugins");
var selection_observer_2 = require("../common/selection_observer");
var wasm_engine_proxy_1 = require("../common/wasm_engine_proxy");
var controller_1 = require("../controller");
var chrome_proxy_record_controller_1 = require("../controller/chrome_proxy_record_controller");
var analyze_page_2 = require("./analyze_page");
var debug_1 = require("./debug");
var file_drop_handler_1 = require("./file_drop_handler");
var flags_page_1 = require("./flags_page");
var home_page_1 = require("./home_page");
var live_reload_1 = require("./live_reload");
var metrics_page_1 = require("./metrics_page");
var post_message_handler_1 = require("./post_message_handler");
var record_page_2 = require("./record_page");
var record_page_v2_1 = require("./record_page_v2");
var rpc_http_dialog_1 = require("./rpc_http_dialog");
var trace_info_page_1 = require("./trace_info_page");
var trace_url_handler_1 = require("./trace_url_handler");
var viewer_page_1 = require("./viewer_page");
var widgets_page_1 = require("./widgets_page");
var EXTENSION_ID = 'lfmkphfpdbjijhpomgecfikhfohaoine';
var FrontendApi = /** @class */ (function () {
    function FrontendApi() {
        this.state = (0, empty_state_3.createEmptyState)();
    }
    FrontendApi.prototype.dispatchMultiple = function (actions) {
        var oldState = this.state;
        var patches = [];
        for (var _i = 0, actions_4 = actions; _i < actions_4.length; _i++) {
            var action = actions_4[_i];
            var originalLength = patches.length;
            var morePatches = this.applyAction(action);
            patches.length += morePatches.length;
            for (var i = 0; i < morePatches.length; ++i) {
                patches[i + originalLength] = morePatches[i];
            }
        }
        if (this.state === oldState) {
            return;
        }
        // Update overall state.
        exports.globals.state = this.state;
        // If the visible time in the global state has been updated more recently
        // than the visible time handled by the frontend @ 60fps, update it. This
        // typically happens when restoring the state from a permalink.
        exports.globals.frontendLocalState.mergeState(this.state.frontendLocalState);
        // Only redraw if something other than the frontendLocalState changed.
        var key;
        for (key in this.state) {
            if (key !== 'frontendLocalState' && key !== 'visibleTracks' &&
                oldState[key] !== this.state[key]) {
                exports.globals.rafScheduler.scheduleFullRedraw();
                break;
            }
        }
        if (this.state.currentSelection !== oldState.currentSelection) {
            // TODO(altimin): Currently we are not triggering this when changing
            // the set of selected tracks via toggling per-track checkboxes.
            // Fix that.
            (0, selection_observer_2.onSelectionChanged)(this.state.currentSelection || undefined, oldState.currentSelection || undefined);
        }
        if (patches.length > 0) {
            // Need to avoid reentering the controller so move this to a
            // separate task.
            setTimeout(function () {
                (0, controller_1.runControllers)();
            }, 0);
        }
    };
    FrontendApi.prototype.applyAction = function (action) {
        var patches = [];
        // 'produce' creates a immer proxy which wraps the current state turning
        // all imperative mutations of the state done in the callback into
        // immutable changes to the returned state.
        this.state = (0, immer_1.produce)(this.state, function (draft) {
            actions_2.StateActions[action.type](draft, action.args);
        }, function (morePatches, _) {
            var originalLength = patches.length;
            patches.length += morePatches.length;
            for (var i = 0; i < morePatches.length; ++i) {
                patches[i + originalLength] = morePatches[i];
            }
        });
        return patches;
    };
    return FrontendApi;
}());
function setExtensionAvailability(available) {
    exports.globals.dispatch(actions_1.Actions.setExtensionAvailable({
        available: available,
    }));
}
function initGlobalsFromQueryString() {
    var queryString = window.location.search;
    exports.globals.embeddedMode = queryString.includes('mode=embedded');
    exports.globals.hideSidebar = queryString.includes('hideSidebar=true');
}
function setupContentSecurityPolicy() {
    // Note: self and sha-xxx must be quoted, urls data: and blob: must not.
    var policy = {
        'default-src': [
            "'self'",
            // Google Tag Manager bootstrap.
            "'sha256-LirUKeorCU4uRNtNzr8tlB11uy8rzrdmqHCX38JSwHY='",
        ],
        'script-src': [
            "'self'",
            // TODO(b/201596551): this is required for Wasm after crrev.com/c/3179051
            // and should be replaced with 'wasm-unsafe-eval'.
            "'unsafe-eval'",
            'https://*.google.com',
            'https://*.googleusercontent.com',
            'https://www.googletagmanager.com',
            'https://www.google-analytics.com',
        ],
        'object-src': ['none'],
        'connect-src': [
            "'self'",
            'http://127.0.0.1:9001',
            'ws://127.0.0.1:9001',
            'ws://127.0.0.1:8037',
            'https://www.google-analytics.com',
            'https://*.googleapis.com',
            'blob:',
            'data:',
        ],
        'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://www.google-analytics.com',
            'https://www.googletagmanager.com',
        ],
        'navigate-to': ['https://*.perfetto.dev', 'self'],
    };
    var meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    var policyStr = '';
    for (var _i = 0, _a = Object.entries(policy); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], list = _b[1];
        policyStr += "".concat(key, " ").concat(list.join(' '), "; ");
    }
    meta.content = policyStr;
    document.head.appendChild(meta);
}
function main() {
    setupContentSecurityPolicy();
    // Load the css. The load is asynchronous and the CSS is not ready by the time
    // appenChild returns.
    var cssLoadPromise = (0, deferred_1.defer)();
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = exports.globals.root + 'perfetto.css';
    css.onload = function () { return cssLoadPromise.resolve(); };
    css.onerror = function (err) { return cssLoadPromise.reject(err); };
    var favicon = document.head.querySelector('#favicon');
    if (favicon)
        favicon.href = exports.globals.root + 'assets/favicon.png';
    // Load the script to detect if this is a Googler (see comments on globals.ts)
    // and initialize GA after that (or after a timeout if something goes wrong).
    var script = document.createElement('script');
    script.src =
        'https://storage.cloud.google.com/perfetto-ui-internal/is_internal_user.js';
    script.async = true;
    script.onerror = function () { return exports.globals.logging.initialize(); };
    script.onload = function () { return exports.globals.logging.initialize(); };
    setTimeout(function () { return exports.globals.logging.initialize(); }, 5000);
    document.head.append(script, css);
    // Add Error handlers for JS error and for uncaught exceptions in promises.
    (0, logging_5.setErrorHandler)(function (err) { return (0, error_dialog_1.maybeShowErrorDialog)(err); });
    window.addEventListener('error', function (e) { return (0, logging_3.reportError)(e); });
    window.addEventListener('unhandledrejection', function (e) { return (0, logging_3.reportError)(e); });
    var extensionLocalChannel = new MessageChannel();
    (0, wasm_engine_proxy_1.initWasm)(exports.globals.root);
    (0, immer_init_1.initializeImmerJs)();
    (0, controller_1.initController)(extensionLocalChannel.port1);
    var dispatch = function (action) {
        frontendApi.dispatchMultiple([action]);
    };
    var router = new router_1.Router({
        '/': exports.HomePage,
        '/viewer': exports.ViewerPage,
        '/record': feature_flags_2.RECORDING_V2_FLAG.get() ? exports.RecordPageV2 : exports.RecordPage,
        '/query': exports.AnalyzePage,
        '/flags': exports.FlagsPage,
        '/metrics': exports.MetricsPage,
        '/info': exports.TraceInfoPage,
        '/widgets': exports.WidgetsPage,
    });
    router.onRouteChanged = function (route) {
        exports.globals.rafScheduler.scheduleFullRedraw();
        (0, trace_url_handler_1.maybeOpenTraceFromRoute)(route);
    };
    // This must be called before calling `globals.initialize` so that the
    // `embeddedMode` global is set.
    initGlobalsFromQueryString();
    exports.globals.initialize(dispatch, router);
    exports.globals.serviceWorkerController.install();
    var frontendApi = new FrontendApi();
    exports.globals.publishRedraw = function () { return exports.globals.rafScheduler.scheduleFullRedraw(); };
    // We proxy messages between the extension and the controller because the
    // controller's worker can't access chrome.runtime.
    var extensionPort = window.chrome && chrome.runtime ?
        chrome.runtime.connect(EXTENSION_ID) :
        undefined;
    setExtensionAvailability(extensionPort !== undefined);
    if (extensionPort) {
        extensionPort.onDisconnect.addListener(function (_) {
            setExtensionAvailability(false);
            void chrome.runtime.lastError; // Needed to not receive an error log.
        });
        // This forwards the messages from the extension to the controller.
        extensionPort.onMessage.addListener(function (message, _port) {
            if ((0, chrome_proxy_record_controller_1.isGetCategoriesResponse)(message)) {
                exports.globals.dispatch(actions_1.Actions.setChromeCategories(message));
                return;
            }
            extensionLocalChannel.port2.postMessage(message);
        });
    }
    // This forwards the messages from the controller to the extension
    extensionLocalChannel.port2.onmessage = function (_a) {
        var data = _a.data;
        if (extensionPort)
            extensionPort.postMessage(data);
    };
    // Put debug variables in the global scope for better debugging.
    (0, debug_1.registerDebugGlobals)();
    // Prevent pinch zoom.
    document.body.addEventListener('wheel', function (e) {
        if (e.ctrlKey)
            e.preventDefault();
    }, { passive: false });
    cssLoadPromise.then(function () { return onCssLoaded(); });
    if (exports.globals.testing) {
        document.body.classList.add('testing');
    }
    // Initialize all plugins:
    for (var _i = 0, _a = plugins_1.pluginRegistry.values(); _i < _a.length; _i++) {
        var plugin = _a[_i];
        plugins_1.pluginManager.activatePlugin(plugin.pluginId);
    }
}
function onCssLoaded() {
    (0, css_constants_4.initCssConstants)();
    // Clear all the contents of the initial page (e.g. the <pre> error message)
    // And replace it with the root <main> element which will be used by mithril.
    document.body.innerHTML = '<main></main>';
    var main = (0, logging_2.assertExists)(document.body.querySelector('main'));
    exports.globals.rafScheduler.domRedraw = function () {
        mithril_1.default.render(main, exports.globals.router.resolve());
    };
    (0, live_reload_1.initLiveReloadIfLocalhost)();
    if (!feature_flags_2.RECORDING_V2_FLAG.get()) {
        (0, record_page_2.updateAvailableAdbDevices)();
        try {
            navigator.usb.addEventListener('connect', function () { return (0, record_page_2.updateAvailableAdbDevices)(); });
            navigator.usb.addEventListener('disconnect', function () { return (0, record_page_2.updateAvailableAdbDevices)(); });
        }
        catch (e) {
            console.error('WebUSB API not supported');
        }
    }
    // Will update the chip on the sidebar footer that notifies that the RPC is
    // connected. Has no effect on the controller (which will repeat this check
    // before creating a new engine).
    // Don't auto-open any trace URLs until we get a response here because we may
    // accidentially clober the state of an open trace processor instance
    // otherwise.
    (0, rpc_http_dialog_1.CheckHttpRpcConnection)().then(function () {
        if (!exports.globals.embeddedMode) {
            (0, file_drop_handler_1.installFileDropHandler)();
        }
        // Don't allow postMessage or opening trace from route when the user says
        // that they want to reuse the already loaded trace in trace processor.
        var engine = exports.globals.getCurrentEngine();
        if (engine && engine.source.type === 'HTTP_RPC') {
            return;
        }
        // Add support for opening traces from postMessage().
        window.addEventListener('message', post_message_handler_1.postMessageHandler, { passive: true });
        // Handles the initial ?local_cache_key=123 or ?s=permalink or ?url=...
        // cases.
        (0, trace_url_handler_1.maybeOpenTraceFromRoute)(router_1.Router.parseUrl(window.location.href));
    });
}
main();
var canvas_utils_2 = require("../common/canvas_utils");
var colorizer_7 = require("../common/colorizer");
var checkerboard_2 = require("./checkerboard");
var slice_layout_1 = require("./slice_layout");
var track_cache_2 = require("./track_cache");
// The common class that underpins all tracks drawing slices.
exports.SLICE_FLAGS_INCOMPLETE = 1;
exports.SLICE_FLAGS_INSTANT = 2;
// Slices smaller than this don't get any text:
var SLICE_MIN_WIDTH_FOR_TEXT_PX = 5;
var SLICE_MIN_WIDTH_PX = 1 / exports.BUCKETS_PER_PIXEL;
var CHEVRON_WIDTH_PX = 10;
var DEFAULT_SLICE_COLOR = colorizer_7.UNEXPECTED_PINK_COLOR;
// Exposed and standalone to allow for testing without making this
// visible to subclasses.
function filterVisibleSlices(slices, startS, endS) {
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
    var maybeFirstSlice = slices[0];
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
    var startIdx = 0;
    var endIdx = slices.length;
    for (; startIdx < endIdx; ++startIdx) {
        var slice_2 = slices[startIdx];
        var sliceEndS = slice_2.startS + slice_2.durationS;
        if (sliceEndS >= startS && slice_2.startS <= endS) {
            break;
        }
    }
    for (; startIdx < endIdx; --endIdx) {
        var slice_3 = slices[endIdx - 1];
        var sliceEndS = slice_3.startS + slice_3.durationS;
        if (sliceEndS >= startS && slice_3.startS <= endS) {
            break;
        }
    }
    return slices.slice(startIdx, endIdx);
}
exports.filterVisibleSlicesForTesting = filterVisibleSlices;
// The minimal set of columns that any table/view must expose to render tracks.
// Note: this class assumes that, at the SQL level, slices are:
// - Not temporally overlapping (unless they are nested at inner depth).
// - Strictly stacked (i.e. a slice at depth N+1 cannot be larger than any
//   slices at depth 0..N.
// If you need temporally overlapping slices, look at AsyncSliceTrack, which
// merges several tracks into one visual track.
exports.BASE_SLICE_ROW = {
    id: query_result_1.NUM,
    tsq: query_result_1.NUM,
    tsqEnd: query_result_1.NUM,
    ts: query_result_1.NUM,
    dur: query_result_1.NUM,
    depth: query_result_1.NUM, // Vertical depth.
};
var BaseSliceTrack = /** @class */ (function (_super) {
    __extends(BaseSliceTrack, _super);
    function BaseSliceTrack(args) {
        var _this = _super.call(this, args) || this;
        _this.sliceLayout = __assign({}, exports.DEFAULT_SLICE_LAYOUT);
        // This is the over-skirted cached bounds:
        _this.slicesKey = track_cache_1.CacheKey.zero();
        // This is the currently 'cached' slices:
        _this.slices = new Array();
        // This is the slices cache:
        _this.cache = new track_cache_1.TrackCache(5);
        _this.maxDurNs = 0;
        _this.sqlState = 'UNINITIALIZED';
        _this.charWidth = -1;
        _this.hoverTooltip = [];
        _this.maxDataDepth = 0;
        // Computed layout.
        _this.computedTrackHeight = 0;
        _this.computedSliceHeight = 0;
        _this.computedRowSpacing = 0;
        // True if this track (and any views tables it might have created) has been
        // destroyed. This is unfortunately error prone (since we must manually check
        // this between each query).
        // TODO(hjd): Replace once we have cancellable query sequences.
        _this.isDestroyed = false;
        _this.frontendOnly = true; // Disable auto checkerboarding.
        // TODO(hjd): Handle pinned tracks, which current cause a crash
        // since the tableName we generate is the same for both.
        _this.tableName = "track_".concat(_this.trackId).replace(/[^a-zA-Z0-9_]+/g, '_');
        // Work out the extra columns.
        // This is the union of the embedder-defined columns and the base columns
        // we know about (ts, dur, ...).
        var allCols = Object.keys(_this.getRowSpec());
        var baseCols = Object.keys(exports.BASE_SLICE_ROW);
        _this.extraSqlColumns = allCols.filter(function (key) { return !baseCols.includes(key); });
        return _this;
    }
    BaseSliceTrack.prototype.getRowSpec = function () {
        return exports.BASE_SLICE_ROW;
    };
    BaseSliceTrack.prototype.onSliceOver = function (_args) { };
    BaseSliceTrack.prototype.onSliceOut = function (_args) { };
    BaseSliceTrack.prototype.onSliceClick = function (_args) { };
    // The API contract of onUpdatedSlices() is:
    //  - I am going to draw these slices in the near future.
    //  - I am not going to draw any slice that I haven't passed here first.
    //  - This is guaranteed to be called at least once on every global
    //    state update.
    //  - This is NOT guaranteed to be called on every frame. For instance you
    //    cannot use this to do some colour-based animation.
    BaseSliceTrack.prototype.onUpdatedSlices = function (slices) {
        this.highlightHovererdAndSameTitle(slices);
    };
    // TODO(hjd): Remove.
    BaseSliceTrack.prototype.drawSchedLatencyArrow = function (_, _selectedSlice) { };
    BaseSliceTrack.prototype.setSliceLayout = function (sliceLayout) {
        if (sliceLayout.minDepth > sliceLayout.maxDepth) {
            var maxDepth = sliceLayout.maxDepth, minDepth = sliceLayout.minDepth;
            throw new Error("minDepth ".concat(minDepth, " must be <= maxDepth ").concat(maxDepth));
        }
        this.sliceLayout = sliceLayout;
    };
    BaseSliceTrack.prototype.onFullRedraw = function () {
        // Give a chance to the embedder to change colors and other stuff.
        this.onUpdatedSlices(this.slices);
    };
    BaseSliceTrack.prototype.isSelectionHandled = function (selection) {
        // TODO(hjd): Remove when updating selection.
        // We shouldn't know here about CHROME_SLICE. Maybe should be set by
        // whatever deals with that. Dunno the namespace of selection is weird. For
        // most cases in non-ambiguous (because most things are a 'slice'). But some
        // others (e.g. THREAD_SLICE) have their own ID namespace so we need this.
        var supportedSelectionKinds = ['SLICE', 'CHROME_SLICE'];
        return supportedSelectionKinds.includes(selection.kind);
    };
    BaseSliceTrack.prototype.renderCanvas = function (ctx) {
        // TODO(hjd): fonts and colors should come from the CSS and not hardcoded
        // here.
        var timeScale = exports.globals.frontendLocalState.timeScale;
        var vizTime = exports.globals.frontendLocalState.visibleWindowTime;
        {
            var windowSizePx = Math.max(1, timeScale.endPx - timeScale.startPx);
            var rawStartNs = (0, time_4.toNs)(vizTime.start);
            var rawEndNs = (0, time_4.toNs)(vizTime.end);
            var rawSlicesKey = track_cache_1.CacheKey.create(rawStartNs, rawEndNs, windowSizePx);
            // If the visible time range is outside the cached area, requests
            // asynchronously new data from the SQL engine.
            this.maybeRequestData(rawSlicesKey);
        }
        // In any case, draw whatever we have (which might be stale/incomplete).
        var charWidth = this.charWidth;
        if (charWidth < 0) {
            // TODO(hjd): Centralize font measurement/invalidation.
            ctx.font = '12px Roboto Condensed';
            charWidth = this.charWidth = ctx.measureText('dbpqaouk').width / 8;
        }
        // Filter only the visible slices. |this.slices| will have more slices than
        // needed because maybeRequestData() over-fetches to handle small pan/zooms.
        // We don't want to waste time drawing slices that are off screen.
        var vizSlices = this.getVisibleSlicesInternal(vizTime.start, vizTime.end);
        var selection = exports.globals.state.currentSelection;
        if (!selection || !this.isSelectionHandled(selection)) {
            selection = null;
        }
        // Believe it or not, doing 4xO(N) passes is ~2x faster than trying to draw
        // everything in one go. The key is that state changes operations on the
        // canvas (e.g., color, fonts) dominate any number crunching we do in JS.
        this.updateSliceAndTrackHeight();
        var sliceHeight = this.computedSliceHeight;
        var padding = this.sliceLayout.padding;
        var rowSpacing = this.computedRowSpacing;
        // First pass: compute geometry of slices.
        var selSlice;
        // pxEnd is the last visible pixel in the visible viewport. Drawing
        // anything < 0 or > pxEnd doesn't produce any visible effect as it goes
        // beyond the visible portion of the canvas.
        var pxEnd = Math.floor(timeScale.timeToPx(vizTime.end));
        for (var _i = 0, vizSlices_1 = vizSlices; _i < vizSlices_1.length; _i++) {
            var slice_4 = vizSlices_1[_i];
            // Compute the basic geometry for any visible slice, even if only
            // partially visible. This might end up with a negative x if the
            // slice starts before the visible time or with a width that overflows
            // pxEnd.
            slice_4.x = timeScale.timeToPx(slice_4.startS);
            slice_4.w = timeScale.deltaTimeToPx(slice_4.durationS);
            if (slice_4.flags & exports.SLICE_FLAGS_INSTANT) {
                // In the case of an instant slice, set the slice geometry on the
                // bounding box that will contain the chevron.
                slice_4.x -= CHEVRON_WIDTH_PX / 2;
                slice_4.w = CHEVRON_WIDTH_PX;
            }
            else {
                // If the slice is an actual slice, intersect the slice geometry with
                // the visible viewport (this affects only the first and last slice).
                // This is so that text is always centered even if we are zoomed in.
                // Visually if we have
                //                   [    visible viewport   ]
                //  [         slice         ]
                // The resulting geometry will be:
                //                   [slice]
                // So that the slice title stays within the visible region.
                var sliceVizLimit = Math.min(slice_4.x + slice_4.w, pxEnd);
                slice_4.x = Math.max(slice_4.x, 0);
                slice_4.w = sliceVizLimit - slice_4.x;
            }
            if (selection && selection.id === slice_4.id) {
                selSlice = slice_4;
            }
        }
        // Second pass: fill slices by color.
        // The .slice() turned out to be an unintended pun.
        var vizSlicesByColor = vizSlices.slice();
        vizSlicesByColor.sort(function (a, b) { return (0, colorizer_7.colorCompare)(a.color, b.color); });
        var lastColor = undefined;
        for (var _a = 0, vizSlicesByColor_1 = vizSlicesByColor; _a < vizSlicesByColor_1.length; _a++) {
            var slice_5 = vizSlicesByColor_1[_a];
            if (slice_5.color !== lastColor) {
                lastColor = slice_5.color;
                ctx.fillStyle = (0, colorizer_7.colorToStr)(slice_5.color);
            }
            var y = padding + slice_5.depth * (sliceHeight + rowSpacing);
            if (slice_5.flags & exports.SLICE_FLAGS_INSTANT) {
                this.drawChevron(ctx, slice_5.x, y, sliceHeight);
            }
            else if (slice_5.flags & exports.SLICE_FLAGS_INCOMPLETE) {
                var w = Math.max(slice_5.w - 2, 2);
                (0, canvas_utils_2.drawIncompleteSlice)(ctx, slice_5.x, y, w, sliceHeight);
            }
            else {
                var w = Math.max(slice_5.w, SLICE_MIN_WIDTH_PX);
                ctx.fillRect(slice_5.x, y, w, sliceHeight);
            }
        }
        // Third pass, draw the titles (e.g., process name for sched slices).
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.font = '12px Roboto Condensed';
        ctx.textBaseline = 'middle';
        for (var _b = 0, vizSlices_2 = vizSlices; _b < vizSlices_2.length; _b++) {
            var slice_6 = vizSlices_2[_b];
            if ((slice_6.flags & exports.SLICE_FLAGS_INSTANT) || !slice_6.title ||
                slice_6.w < SLICE_MIN_WIDTH_FOR_TEXT_PX) {
                continue;
            }
            var title = (0, canvas_utils_1.cropText)(slice_6.title, charWidth, slice_6.w);
            var rectXCenter = slice_6.x + slice_6.w / 2;
            var y = padding + slice_6.depth * (sliceHeight + rowSpacing);
            var yDiv = slice_6.subTitle ? 3 : 2;
            var yMidPoint = Math.floor(y + sliceHeight / yDiv) - 0.5;
            ctx.fillText(title, rectXCenter, yMidPoint);
        }
        // Fourth pass, draw the subtitles (e.g., thread name for sched slices).
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '10px Roboto Condensed';
        for (var _c = 0, vizSlices_3 = vizSlices; _c < vizSlices_3.length; _c++) {
            var slice_7 = vizSlices_3[_c];
            if (slice_7.w < SLICE_MIN_WIDTH_FOR_TEXT_PX || !slice_7.subTitle ||
                (slice_7.flags & exports.SLICE_FLAGS_INSTANT)) {
                continue;
            }
            var rectXCenter = slice_7.x + slice_7.w / 2;
            var subTitle = (0, canvas_utils_1.cropText)(slice_7.subTitle, charWidth, slice_7.w);
            var y = padding + slice_7.depth * (sliceHeight + rowSpacing);
            var yMidPoint = Math.ceil(y + sliceHeight * 2 / 3) + 1.5;
            ctx.fillText(subTitle, rectXCenter, yMidPoint);
        }
        // Draw a thicker border around the selected slice (or chevron).
        if (selSlice !== undefined) {
            var color = selSlice.color;
            var y = padding + selSlice.depth * (sliceHeight + rowSpacing);
            ctx.strokeStyle = "hsl(".concat(color.h, ", ").concat(color.s, "%, 30%)");
            ctx.beginPath();
            var THICKNESS = 3;
            ctx.lineWidth = THICKNESS;
            ctx.strokeRect(selSlice.x, y - THICKNESS / 2, selSlice.w, sliceHeight + THICKNESS);
            ctx.closePath();
        }
        // If the cached trace slices don't fully cover the visible time range,
        // show a gray rectangle with a "Loading..." label.
        (0, checkerboard_2.checkerboardExcept)(ctx, this.getHeight(), timeScale.timeToPx(vizTime.start), timeScale.timeToPx(vizTime.end), timeScale.timeToPx((0, time_4.fromNs)(this.slicesKey.startNs)), timeScale.timeToPx((0, time_4.fromNs)(this.slicesKey.endNs)));
        // TODO(hjd): Remove this.
        // The only thing this does is drawing the sched latency arrow. We should
        // have some abstraction for that arrow (ideally the same we'd use for
        // flows).
        this.drawSchedLatencyArrow(ctx, selSlice);
        // If a slice is hovered, draw the tooltip.
        var tooltip = this.hoverTooltip;
        if (this.hoveredSlice !== undefined && tooltip.length > 0 &&
            this.hoverPos !== undefined) {
            if (tooltip.length === 1) {
                this.drawTrackHoverTooltip(ctx, this.hoverPos, tooltip[0]);
            }
            else {
                this.drawTrackHoverTooltip(ctx, this.hoverPos, tooltip[0], tooltip[1]);
            }
        } // if (hoveredSlice)
    };
    BaseSliceTrack.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.isDestroyed = true;
        this.engine.query("DROP VIEW IF EXISTS ".concat(this.tableName));
    };
    // This method figures out if the visible window is outside the bounds of
    // the cached data and if so issues new queries (i.e. sorta subsumes the
    // onBoundsChange).
    BaseSliceTrack.prototype.maybeRequestData = function (rawSlicesKey) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRes_1, row, slicesKey, maybeCachedSlices, bucketNs, queryTsq, queryTsqEnd, extraCols, depthCol, maybeGroupByDepth, layout, isFlat, queryRes, slices, it, maxDataDepth, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.sqlState === 'UNINITIALIZED')) return [3 /*break*/, 3];
                        this.sqlState = 'INITIALIZING';
                        if (this.isDestroyed) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initSqlTable(this.tableName)];
                    case 1:
                        _a.sent();
                        if (this.isDestroyed) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.engine.query("select\n          ifnull(max(dur), 0) as maxDur, count(1) as rowCount\n          from ".concat(this.tableName))];
                    case 2:
                        queryRes_1 = _a.sent();
                        row = queryRes_1.firstRow({ maxDur: query_result_1.NUM, rowCount: query_result_1.NUM });
                        this.maxDurNs = row.maxDur;
                        this.sqlState = 'QUERY_DONE';
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.sqlState === 'INITIALIZING' || this.sqlState === 'QUERY_PENDING') {
                            return [2 /*return*/];
                        }
                        _a.label = 4;
                    case 4:
                        if (rawSlicesKey.isCoveredBy(this.slicesKey)) {
                            return [2 /*return*/]; // We have the data already, no need to re-query
                        }
                        slicesKey = rawSlicesKey.normalize();
                        if (!rawSlicesKey.isCoveredBy(slicesKey)) {
                            throw new Error("Normalization error ".concat(slicesKey.toString(), " ").concat(rawSlicesKey.toString()));
                        }
                        maybeCachedSlices = this.cache.lookup(slicesKey);
                        if (maybeCachedSlices) {
                            this.slicesKey = slicesKey;
                            this.onUpdatedSlices(maybeCachedSlices);
                            this.slices = maybeCachedSlices;
                            return [2 /*return*/];
                        }
                        this.sqlState = 'QUERY_PENDING';
                        bucketNs = slicesKey.bucketNs;
                        // When we're zoomed into the level of single ns there is no point
                        // doing quantization (indeed it causes bad artifacts) so instead
                        // we use ts / ts+dur directly.
                        if (bucketNs === 1) {
                            queryTsq = 'ts';
                            queryTsqEnd = 'ts + dur';
                        }
                        else {
                            queryTsq = "(ts + ".concat(bucketNs / 2, ") / ").concat(bucketNs, " * ").concat(bucketNs);
                            queryTsqEnd = "(ts + dur + ".concat(bucketNs / 2, ") / ").concat(bucketNs, " * ").concat(bucketNs);
                        }
                        extraCols = this.extraSqlColumns.join(',');
                        depthCol = 'depth';
                        maybeGroupByDepth = 'depth, ';
                        layout = this.sliceLayout;
                        isFlat = (layout.maxDepth - layout.minDepth) <= 1;
                        // maxDepth === minDepth only makes sense if track is empty which on the
                        // one hand isn't very useful (and so maybe should be an error) on the
                        // other hand I can see it happening if someone does:
                        // minDepth = min(slices.depth); maxDepth = max(slices.depth);
                        // and slices is empty, so we treat that as flat.
                        if (isFlat) {
                            depthCol = "".concat(this.sliceLayout.minDepth, " as depth");
                            maybeGroupByDepth = '';
                        }
                        // TODO(hjd): Re-reason and improve this query:
                        // - Materialize the unfinished slices one off.
                        // - Avoid the union if we know we don't have any -1 slices.
                        // - Maybe we don't need the union at all and can deal in TS?
                        if (this.isDestroyed) {
                            this.sqlState = 'QUERY_DONE';
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.engine.query("\n    with q1 as (\n      select\n        ".concat(queryTsq, " as tsq,\n        ").concat(queryTsqEnd, " as tsqEnd,\n        ts,\n        max(dur) as dur,\n        id,\n        ").concat(depthCol, "\n        ").concat(extraCols ? ',' + extraCols : '', "\n      from ").concat(this.tableName, "\n      where\n        ts >= ").concat(slicesKey.startNs - this.maxDurNs /* - durNs */, " and\n        ts <= ").concat(slicesKey.endNs /* + durNs */, "\n      group by ").concat(maybeGroupByDepth, " tsq\n      order by tsq),\n    q2 as (\n      select\n        ").concat(queryTsq, " as tsq,\n        ").concat(queryTsqEnd, " as tsqEnd,\n        ts,\n        -1 as dur,\n        id,\n        ").concat(depthCol, "\n        ").concat(extraCols ? ',' + extraCols : '', "\n      from ").concat(this.tableName, "\n      where dur = -1\n      group by ").concat(maybeGroupByDepth, " tsq\n      )\n      select min(dur) as _unused, * from\n      (select * from q1 union all select * from q2)\n      group by ").concat(maybeGroupByDepth, " tsq\n      order by tsq\n    "))];
                    case 5:
                        queryRes = _a.sent();
                        slices = new Array(queryRes.numRows());
                        it = queryRes.iter(this.getRowSpec());
                        maxDataDepth = this.maxDataDepth;
                        this.slicesKey = slicesKey;
                        for (i = 0; it.valid(); it.next(), ++i) {
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
                        exports.globals.rafScheduler.scheduleRedraw();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseSliceTrack.prototype.rowToSliceInternal = function (row) {
        var slice = this.rowToSlice(row);
        slice.x = -1;
        slice.w = -1;
        return slice;
    };
    BaseSliceTrack.prototype.rowToSlice = function (row) {
        var startNsQ = row.tsq;
        var endNsQ = row.tsqEnd;
        var flags = 0;
        if (row.dur === -1) {
            flags |= exports.SLICE_FLAGS_INCOMPLETE;
        }
        else if (row.dur === 0) {
            flags |= exports.SLICE_FLAGS_INSTANT;
        }
        return {
            id: row.id,
            startS: (0, time_4.fromNs)(startNsQ),
            durationS: (0, time_4.fromNs)(endNsQ - startNsQ),
            flags: flags,
            depth: row.depth,
            title: '',
            subTitle: '',
            // The derived class doesn't need to initialize these. They are
            // rewritten on every renderCanvas() call. We just need to initialize
            // them to something.
            baseColor: DEFAULT_SLICE_COLOR,
            color: DEFAULT_SLICE_COLOR,
        };
    };
    BaseSliceTrack.prototype.findSlice = function (_a) {
        var x = _a.x, y = _a.y;
        var trackHeight = this.computedTrackHeight;
        var sliceHeight = this.computedSliceHeight;
        var padding = this.sliceLayout.padding;
        var rowSpacing = this.computedRowSpacing;
        // Need at least a draw pass to resolve the slice layout.
        if (sliceHeight === 0) {
            return undefined;
        }
        if (y >= padding && y <= trackHeight - padding) {
            var depth = Math.floor((y - padding) / (sliceHeight + rowSpacing));
            for (var _i = 0, _b = this.slices; _i < _b.length; _i++) {
                var slice_8 = _b[_i];
                if (slice_8.depth === depth && slice_8.x <= x && x <= slice_8.x + slice_8.w) {
                    return slice_8;
                }
            }
        }
        return undefined;
    };
    BaseSliceTrack.prototype.onMouseMove = function (position) {
        this.hoverPos = position;
        this.updateHoveredSlice(this.findSlice(position));
    };
    BaseSliceTrack.prototype.onMouseOut = function () {
        this.updateHoveredSlice(undefined);
    };
    BaseSliceTrack.prototype.updateHoveredSlice = function (slice) {
        var lastHoveredSlice = this.hoveredSlice;
        this.hoveredSlice = slice;
        // Only notify the Impl if the hovered slice changes:
        if (slice === lastHoveredSlice)
            return;
        if (this.hoveredSlice === undefined) {
            exports.globals.dispatch(actions_1.Actions.setHighlightedSliceId({ sliceId: -1 }));
            this.onSliceOut({ slice: (0, logging_2.assertExists)(lastHoveredSlice) });
            this.hoverTooltip = [];
            this.hoverPos = undefined;
        }
        else {
            var args = { slice: this.hoveredSlice };
            exports.globals.dispatch(actions_1.Actions.setHighlightedSliceId({ sliceId: this.hoveredSlice.id }));
            this.onSliceOver(args);
            this.hoverTooltip = args.tooltip || [];
        }
    };
    BaseSliceTrack.prototype.onMouseClick = function (position) {
        var slice = this.findSlice(position);
        if (slice === undefined) {
            return false;
        }
        var args = { slice: slice };
        this.onSliceClick(args);
        return true;
    };
    BaseSliceTrack.prototype.getVisibleSlicesInternal = function (startS, endS) {
        return filterVisibleSlices(this.slices, startS, endS);
    };
    BaseSliceTrack.prototype.updateSliceAndTrackHeight = function () {
        var lay = this.sliceLayout;
        var rows = Math.min(Math.max(this.maxDataDepth + 1, lay.minDepth), lay.maxDepth);
        // Compute the track height.
        var trackHeight;
        if (lay.heightMode === 'FIXED') {
            trackHeight = lay.fixedHeight;
        }
        else {
            trackHeight = 2 * lay.padding + rows * (lay.sliceHeight + lay.rowSpacing);
        }
        // Compute the slice height.
        var sliceHeight;
        var rowSpacing = lay.rowSpacing;
        if (lay.heightMode === 'FIXED') {
            var rowHeight = (trackHeight - 2 * lay.padding) / rows;
            sliceHeight = Math.floor(Math.max(rowHeight - lay.rowSpacing, 0.5));
            rowSpacing = Math.max(lay.rowSpacing, rowHeight - sliceHeight);
            rowSpacing = Math.floor(rowSpacing * 2) / 2;
        }
        else {
            sliceHeight = lay.sliceHeight;
        }
        this.computedSliceHeight = sliceHeight;
        this.computedTrackHeight = trackHeight;
        this.computedRowSpacing = rowSpacing;
    };
    BaseSliceTrack.prototype.drawChevron = function (ctx, x, y, h) {
        // Draw an upward facing chevrons, in order: A, B, C, D, and back to A.
        // . (x, y)
        //      A
        //     ###
        //    ##C##
        //   ##   ##
        //  D       B
        //            . (x + CHEVRON_WIDTH_PX, y + h)
        var HALF_CHEVRON_WIDTH_PX = CHEVRON_WIDTH_PX / 2;
        var midX = x + HALF_CHEVRON_WIDTH_PX;
        ctx.beginPath();
        ctx.moveTo(midX, y); // A.
        ctx.lineTo(x + CHEVRON_WIDTH_PX, y + h); // B.
        ctx.lineTo(midX, y + h - HALF_CHEVRON_WIDTH_PX); // C.
        ctx.lineTo(x, y + h); // D.
        ctx.lineTo(midX, y); // Back to A.
        ctx.closePath();
        ctx.fill();
    };
    // This is a good default implementation for highlighting slices. By default
    // onUpdatedSlices() calls this. However, if the XxxSliceTrack impl overrides
    // onUpdatedSlices() this gives them a chance to call the highlighting without
    // having to reimplement it.
    BaseSliceTrack.prototype.highlightHovererdAndSameTitle = function (slices) {
        for (var _i = 0, slices_1 = slices; _i < slices_1.length; _i++) {
            var slice_9 = slices_1[_i];
            var isHovering = exports.globals.state.highlightedSliceId === slice_9.id ||
                (this.hoveredSlice && this.hoveredSlice.title === slice_9.title);
            if (isHovering) {
                slice_9.color = {
                    c: slice_9.baseColor.c,
                    h: slice_9.baseColor.h,
                    s: slice_9.baseColor.s,
                    l: 30,
                };
            }
            else {
                slice_9.color = slice_9.baseColor;
            }
        }
    };
    BaseSliceTrack.prototype.getHeight = function () {
        this.updateSliceAndTrackHeight();
        return this.computedTrackHeight;
    };
    BaseSliceTrack.prototype.getSliceRect = function (_tStart, _tEnd, _depth) {
        // TODO(hjd): Implement this as part of updating flow events.
        return undefined;
    };
    return BaseSliceTrack;
}(track_1.Track));
exports.BaseSliceTrack = BaseSliceTrack;
var upload_utils_1 = require("../common/upload_utils");
var trace_attrs_1 = require("./trace_attrs");
// Never show more than one dialog per minute.
var MIN_REPORT_PERIOD_MS = 60000;
var timeLastReport = 0;
// Keeps the last ERR_QUEUE_MAX_LEN errors while the dialog is throttled.
var queuedErrors = new Array();
var ERR_QUEUE_MAX_LEN = 10;
function maybeShowErrorDialog(errLog) {
    exports.globals.logging.logError(errLog);
    var now = performance.now();
    // Here we rely on the exception message from onCannotGrowMemory function
    if (errLog.includes('Cannot enlarge memory')) {
        showOutOfMemoryDialog();
        // Refresh timeLastReport to prevent a different error showing a dialog
        timeLastReport = now;
        return;
    }
    if (!feature_flags_2.RECORDING_V2_FLAG.get()) {
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
        if (queuedErrors.length > ERR_QUEUE_MAX_LEN)
            queuedErrors.pop();
        console.log('Suppressing crash dialog, last error notified too soon.');
        return;
    }
    timeLastReport = now;
    // Append queued errors.
    while (queuedErrors.length > 0) {
        var queuedErr = queuedErrors.shift();
        errLog += "\n\n---------------------------------------\n".concat(queuedErr);
    }
    var errTitle = errLog.split('\n', 1)[0].substr(0, 80);
    var userDescription = '';
    var checked = false;
    var engine = exports.globals.getCurrentEngine();
    var shareTraceSection = [];
    if ((0, trace_attrs_1.isShareable)() && !urlExists()) {
        shareTraceSection.push((0, mithril_1.default)("input[type=checkbox]", {
            checked: checked,
            oninput: function (ev) {
                checked = ev.target.checked;
                if (checked && engine && engine.source.type === 'FILE') {
                    (0, upload_utils_1.saveTrace)(engine.source.file).then(function (url) {
                        var errMessage = createErrorMessage(errLog, checked, url);
                        renderModal(errTitle, errMessage, userDescription, shareTraceSection);
                        return;
                    });
                }
                var errMessage = createErrorMessage(errLog, checked);
                renderModal(errTitle, errMessage, userDescription, shareTraceSection);
            },
        }), (0, mithril_1.default)('span', "Check this box to share the current trace for debugging\n     purposes."), (0, mithril_1.default)('div.modal-small', "This will create a permalink to this trace, you may\n     leave it unchecked and attach the trace manually\n     to the bug if preferred."));
    }
    renderModal(errTitle, createErrorMessage(errLog, checked), userDescription, shareTraceSection);
}
exports.maybeShowErrorDialog = maybeShowErrorDialog;
function renderModal(errTitle, errMessage, userDescription, shareTraceSection) {
    (0, modal_3.showModal)({
        title: 'Oops, something went wrong. Please file a bug.',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('.modal-logs', errMessage), (0, mithril_1.default)('span', "Please provide any additional details describing\n           how the crash occurred:"), (0, mithril_1.default)('textarea.modal-textarea', {
            rows: 3,
            maxlength: 1000,
            oninput: function (ev) {
                userDescription = ev.target.value;
            },
            onkeydown: function (e) {
                e.stopPropagation();
            },
            onkeyup: function (e) {
                e.stopPropagation();
            },
        }), shareTraceSection),
        buttons: [
            {
                text: 'File a bug (Googlers only)',
                primary: true,
                id: 'file_bug',
                action: function () {
                    window.open(createLink(errTitle, errMessage, userDescription), '_blank');
                },
            },
        ],
    });
}
// If there is a trace URL to share, we don't have to show the upload checkbox.
function urlExists() {
    var engine = exports.globals.getCurrentEngine();
    return engine !== undefined &&
        (engine.source.type === 'ARRAY_BUFFER' || engine.source.type === 'URL') &&
        engine.source.url !== undefined;
}
function createErrorMessage(errLog, checked, url) {
    var errMessage = '';
    var engine = exports.globals.getCurrentEngine();
    if (checked && url !== undefined) {
        errMessage += "Trace: ".concat(url);
    }
    else if (urlExists()) {
        errMessage +=
            "Trace: ".concat((0, logging_2.assertExists)(engine).source.url);
    }
    else {
        errMessage += 'To assist with debugging please attach or link to the ' +
            'trace you were viewing.';
    }
    return errMessage + '\n\n' +
        'Viewed on: ' + self.location.origin + '\n\n' + errLog;
}
function createLink(errTitle, errMessage, userDescription) {
    var link = 'https://goto.google.com/perfetto-ui-bug';
    link += '?title=' + encodeURIComponent("UI Error: ".concat(errTitle));
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
    var url = 'https://perfetto.dev/docs/quickstart/trace-analysis#get-trace-processor';
    var tpCmd = 'curl -LO https://get.perfetto.dev/trace_processor\n' +
        'chmod +x ./trace_processor\n' +
        'trace_processor --httpd /path/to/trace.pftrace\n' +
        '# Reload the UI, it will prompt to use the HTTP+RPC interface';
    (0, modal_3.showModal)({
        title: 'Oops! Your WASM trace processor ran out of memory',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('span', 'The in-memory representation of the trace is too big ' +
            'for the browser memory limits (typically 2GB per tab).'), (0, mithril_1.default)('br'), (0, mithril_1.default)('span', 'You can work around this problem by using the trace_processor ' +
            'native binary as an accelerator for the UI as follows:'), (0, mithril_1.default)('br'), (0, mithril_1.default)('br'), (0, mithril_1.default)('.modal-bash', tpCmd), (0, mithril_1.default)('br'), (0, mithril_1.default)('span', 'For details see '), (0, mithril_1.default)('a', { href: url, target: '_blank' }, url)),
        buttons: [],
    });
}
function showUnknownFileError() {
    (0, modal_3.showModal)({
        title: 'Cannot open this file',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('p', 'The file opened doesn\'t look like a Perfetto trace or any ' +
            'other format recognized by the Perfetto TraceProcessor.'), (0, mithril_1.default)('p', 'Formats supported:'), (0, mithril_1.default)('ul', (0, mithril_1.default)('li', 'Perfetto protobuf trace'), (0, mithril_1.default)('li', 'chrome://tracing JSON'), (0, mithril_1.default)('li', 'Android systrace'), (0, mithril_1.default)('li', 'Fuchsia trace'), (0, mithril_1.default)('li', 'Ninja build log'))),
        buttons: [],
    });
}
function showWebUSBError() {
    (0, modal_3.showModal)({
        title: 'A WebUSB error occurred',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('span', "Is adb already running on the host? Run this command and\n      try again."), (0, mithril_1.default)('br'), (0, mithril_1.default)('.modal-bash', '> adb kill-server'), (0, mithril_1.default)('br'), (0, mithril_1.default)('span', 'For details see '), (0, mithril_1.default)('a', { href: 'http://b/159048331', target: '_blank' }, 'b/159048331')),
        buttons: [],
    });
}
function showWebUSBErrorV2() {
    (0, modal_3.showModal)({
        title: 'A WebUSB error occurred',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('span', "Is adb already running on the host? Run this command and\n      try again."), (0, mithril_1.default)('br'), (0, mithril_1.default)('.modal-bash', '> adb kill-server'), (0, mithril_1.default)('br'), 
        // The statement below covers the following edge case:
        // 1. 'adb server' is running on the device.
        // 2. The user selects the new Android target, so we try to fetch the
        // OS version and do QSS.
        // 3. The error modal is shown.
        // 4. The user runs 'adb kill-server'.
        // At this point we don't have a trigger to try fetching the OS version
        // + QSS again. Therefore, the user will need to refresh the page.
        (0, mithril_1.default)('span', 'If after running \'adb kill-server\', you don\'t see ' +
            'a \'Start Recording\' button on the page and you don\'t see ' +
            '\'Allow USB debugging\' on the device, ' +
            'you will need to reload this page.'), (0, mithril_1.default)('br'), (0, mithril_1.default)('br'), (0, mithril_1.default)('span', 'For details see '), (0, mithril_1.default)('a', { href: 'http://b/159048331', target: '_blank' }, 'b/159048331')),
        buttons: [],
    });
}
exports.showWebUSBErrorV2 = showWebUSBErrorV2;
function showConnectionLostError() {
    (0, modal_3.showModal)({
        title: 'Connection with the ADB device lost',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('span', "Please connect the device again to restart the recording."), (0, mithril_1.default)('br')),
        buttons: [],
    });
}
exports.showConnectionLostError = showConnectionLostError;
function showAllowUSBDebugging() {
    (0, modal_3.showModal)({
        title: 'Could not connect to the device',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('span', 'Please allow USB debugging on the device.'), (0, mithril_1.default)('br')),
        buttons: [],
    });
}
exports.showAllowUSBDebugging = showAllowUSBDebugging;
function showNoDeviceSelected() {
    (0, modal_3.showModal)({
        title: 'No device was selected for recording',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('span', "If you want to connect to an ADB device,\n           please select it from the list."), (0, mithril_1.default)('br')),
        buttons: [],
    });
}
exports.showNoDeviceSelected = showNoDeviceSelected;
function showExtensionNotInstalled() {
    (0, modal_3.showModal)({
        title: 'Perfetto Chrome extension not installed',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('.note', "To trace Chrome from the Perfetto UI, you need to install our ", (0, mithril_1.default)('a', { href: recording_utils_1.EXTENSION_URL, target: '_blank' }, 'Chrome extension'), ' and then reload this page.'), (0, mithril_1.default)('br')),
        buttons: [],
    });
}
exports.showExtensionNotInstalled = showExtensionNotInstalled;
function showWebsocketConnectionIssue(message) {
    (0, modal_3.showModal)({
        title: 'Unable to connect to the device via websocket',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('span', message), (0, mithril_1.default)('br')),
        buttons: [],
    });
}
exports.showWebsocketConnectionIssue = showWebsocketConnectionIssue;
function showIssueParsingTheTracedResponse(message) {
    (0, modal_3.showModal)({
        title: 'A problem was encountered while connecting to' +
            ' the Perfetto tracing service',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('span', message), (0, mithril_1.default)('br')),
        buttons: [],
    });
}
exports.showIssueParsingTheTracedResponse = showIssueParsingTheTracedResponse;
function showFailedToPushBinary(message) {
    (0, modal_3.showModal)({
        title: 'Failed to push a binary to the device',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('span', 'This can happen if your Android device has an OS version lower ' +
            'than Q. Perfetto tried to push the latest version of its ' +
            'embedded binary but failed.'), (0, mithril_1.default)('br'), (0, mithril_1.default)('br'), (0, mithril_1.default)('span', 'Error message:'), (0, mithril_1.default)('br'), (0, mithril_1.default)('span', message)),
        buttons: [],
    });
}
exports.showFailedToPushBinary = showFailedToPushBinary;
function showRpcSequencingError() {
    (0, modal_3.showModal)({
        title: 'A TraceProcessor RPC error occurred',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('p', 'The trace processor RPC sequence ID was broken'), (0, mithril_1.default)('p', "This can happen when using a HTTP trace processor instance and\neither accidentally sharing this between multiple tabs or\nrestarting the trace processor while still in use by UI."), (0, mithril_1.default)('p', "Please refresh this tab and ensure that trace processor is used\nat most one tab at a time.")),
        buttons: [],
    });
}
var feature_flags_3 = require("../common/feature_flags");
var RELEASE_PROCESS_URL = 'https://perfetto.dev/docs/visualization/perfetto-ui-release-process';
var SelectWidget = /** @class */ (function () {
    function SelectWidget() {
    }
    SelectWidget.prototype.view = function (vnode) {
        var attrs = vnode.attrs;
        return (0, mithril_1.default)('.flag-widget', (0, mithril_1.default)('label', attrs.label), (0, mithril_1.default)('select', {
            onchange: function (e) {
                var value = e.target.value;
                attrs.onSelect(value);
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, attrs.options.map(function (o) {
            var selected = o.id === attrs.selected;
            return (0, mithril_1.default)('option', { value: o.id, selected: selected }, o.name);
        })), (0, mithril_1.default)('.description', attrs.description));
    };
    return SelectWidget;
}());
var FlagWidget = /** @class */ (function () {
    function FlagWidget() {
    }
    FlagWidget.prototype.view = function (vnode) {
        var flag = vnode.attrs.flag;
        var defaultState = flag.defaultValue ? 'Enabled' : 'Disabled';
        return (0, mithril_1.default)(SelectWidget, {
            label: flag.name,
            description: flag.description,
            options: [
                { id: feature_flags_3.OverrideState.DEFAULT, name: "Default (".concat(defaultState, ")") },
                { id: feature_flags_3.OverrideState.TRUE, name: 'Enabled' },
                { id: feature_flags_3.OverrideState.FALSE, name: 'Disabled' },
            ],
            selected: flag.overriddenState(),
            onSelect: function (value) {
                switch (value) {
                    case feature_flags_3.OverrideState.TRUE:
                        flag.set(true);
                        break;
                    case feature_flags_3.OverrideState.FALSE:
                        flag.set(false);
                        break;
                    default:
                    case feature_flags_3.OverrideState.DEFAULT:
                        flag.reset();
                        break;
                }
            },
        });
    };
    return FlagWidget;
}());
exports.FlagsPage = (0, pages_1.createPage)({
    view: function () {
        var needsReload = (0, channels_2.channelChanged)();
        return (0, mithril_1.default)('.flags-page', (0, mithril_1.default)('.flags-content', (0, mithril_1.default)('h1', 'Feature flags'), needsReload &&
            [
                (0, mithril_1.default)('h2', 'Please reload for your changes to take effect'),
            ], (0, mithril_1.default)(SelectWidget, {
            label: 'Release channel',
            description: [
                'Which release channel of the UI to use. See ',
                (0, mithril_1.default)('a', {
                    href: RELEASE_PROCESS_URL,
                }, 'Release Process'),
                ' for more information.',
            ],
            options: [
                { id: 'stable', name: 'Stable (default)' },
                { id: 'canary', name: 'Canary' },
                { id: 'autopush', name: 'Autopush' },
            ],
            selected: (0, channels_2.getNextChannel)(),
            onSelect: function (id) { return (0, channels_2.setChannel)(id); },
        }), (0, mithril_1.default)('button', {
            onclick: function () {
                feature_flags_1.featureFlags.resetAll();
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }, 'Reset all below'), feature_flags_1.featureFlags.allFlags().map(function (flag) { return (0, mithril_1.default)(FlagWidget, { flag: flag }); })));
    },
});
var CounterDetailsPanel = /** @class */ (function (_super) {
    __extends(CounterDetailsPanel, _super);
    function CounterDetailsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CounterDetailsPanel.prototype.view = function () {
        var counterInfo = exports.globals.counterDetails;
        if (counterInfo && counterInfo.startTime &&
            counterInfo.name !== undefined && counterInfo.value !== undefined &&
            counterInfo.delta !== undefined && counterInfo.duration !== undefined) {
            return (0, mithril_1.default)('.details-panel', (0, mithril_1.default)('.details-panel-heading', (0, mithril_1.default)('h2', "Counter Details")), (0, mithril_1.default)('.details-table', [(0, mithril_1.default)('table', [
                    (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Name"), (0, mithril_1.default)('td', "".concat(counterInfo.name))),
                    (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Start time"), (0, mithril_1.default)('td', "".concat((0, time_1.timeToCode)(counterInfo.startTime)))),
                    (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Value"), (0, mithril_1.default)('td', "".concat(counterInfo.value.toLocaleString()))),
                    (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Delta"), (0, mithril_1.default)('td', "".concat(counterInfo.delta.toLocaleString()))),
                    (0, mithril_1.default)('tr', (0, mithril_1.default)('th', "Duration"), (0, mithril_1.default)('td', "".concat((0, time_1.timeToCode)((0, time_4.fromNs)(counterInfo.duration))))),
                ])]));
        }
        else {
            return (0, mithril_1.default)('.details-panel', (0, mithril_1.default)('.details-panel-heading', (0, mithril_1.default)('h2', "Counter Details")));
        }
    };
    CounterDetailsPanel.prototype.renderCanvas = function () { };
    return CounterDetailsPanel;
}(panel_1.Panel));
exports.CounterDetailsPanel = CounterDetailsPanel;
// Create a timestamp from a bigint in nanos.
// Use this when we know the type is a bigint.
function timestampFromNanos(nanos) {
    return nanos;
}
exports.timestampFromNanos = timestampFromNanos;
// Create a timestamp from an arbitrary SQL value.
// Throws if the value cannot be reasonably converted to a timestamp.
// Assumes the input will be in units of nanoseconds.
function timestampFromSqlNanos(nanos) {
    if (typeof nanos === 'bigint') {
        return nanos;
    }
    else if (typeof nanos === 'number') {
        // Note - this will throw if the number is something which cannot be
        // represented by an integer - i.e. decimals, infinity, or NaN.
        return BigInt(nanos);
    }
    else {
        throw Error('Refusing to create TPTimestamp from unrelated type');
    }
}
exports.timestampFromSqlNanos = timestampFromSqlNanos;
// TODO: unify this with common/time.ts.
// TODO(stevegolton): Return a bigint, or a new TPDuration object rather than
// convert to number which could lose precision.
function toTraceTime(ts) {
    var traceStartNs = (0, time_4.toNs)(exports.globals.state.traceTime.startSec);
    return (0, time_4.fromNs)(Number(ts - BigInt(traceStartNs)));
}
exports.toTraceTime = toTraceTime;
function asUpid(v) {
    return v;
}
exports.asUpid = asUpid;
function asUtid(v) {
    return v;
}
exports.asUtid = asUtid;
var state_5 = require("../common/state");
var adb_1 = require("../controller/adb");
var record_config_2 = require("./record_config");
exports.PERSIST_CONFIG_FLAG = feature_flags_1.featureFlags.register({
    id: 'persistConfigsUI',
    name: 'Config persistence UI',
    description: 'Show experimental config persistence UI on the record page.',
    defaultValue: true,
});
exports.RECORDING_SECTIONS = [
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
    return (0, mithril_1.default)('.record-header', (0, mithril_1.default)('.top-part', (0, mithril_1.default)('.target-and-status', RecordingPlatformSelection(), RecordingStatusLabel(), ErrorLabel()), recordingButtons()), RecordingNotes());
}
function RecordingPlatformSelection() {
    if (exports.globals.state.recordingInProgress)
        return [];
    var availableAndroidDevices = exports.globals.state.availableAdbDevices;
    var recordingTarget = exports.globals.state.recordingTarget;
    var targets = [];
    for (var _i = 0, _a = (0, state_2.getDefaultRecordingTargets)(); _i < _a.length; _i++) {
        var _b = _a[_i], os = _b.os, name = _b.name;
        targets.push((0, mithril_1.default)('option', { value: os }, name));
    }
    for (var _c = 0, availableAndroidDevices_1 = availableAndroidDevices; _c < availableAndroidDevices_1.length; _c++) {
        var d = availableAndroidDevices_1[_c];
        targets.push((0, mithril_1.default)('option', { value: d.serial }, d.name));
    }
    var selectedIndex = (0, state_5.isAdbTarget)(recordingTarget) ?
        targets.findIndex(function (node) { return node.attrs.value === recordingTarget.serial; }) :
        targets.findIndex(function (node) { return node.attrs.value === recordingTarget.os; });
    return (0, mithril_1.default)('.target', (0, mithril_1.default)('label', 'Target platform:', mithril_1.default.apply(void 0, __spreadArray(['select',
        {
            selectedIndex: selectedIndex,
            onchange: function (e) {
                onTargetChange(e.target.value);
            },
            onupdate: function (select) {
                // Work around mithril bug
                // (https://github.com/MithrilJS/mithril.js/issues/2107): We may
                // update the select's options while also changing the
                // selectedIndex at the same time. The update of selectedIndex
                // may be applied before the new options are added to the select
                // element. Because the new selectedIndex may be outside of the
                // select's options at that time, we have to reselect the
                // correct index here after any new children were added.
                select.dom.selectedIndex = selectedIndex;
            },
        }], targets, false))), (0, mithril_1.default)('.chip', { onclick: addAndroidDevice }, (0, mithril_1.default)('button', 'Add ADB Device'), (0, mithril_1.default)('i.material-icons', 'add')));
}
// |target| can be the TargetOs or the android serial.
function onTargetChange(target) {
    var recordingTarget = exports.globals.state.availableAdbDevices.find(function (d) { return d.serial === target; }) ||
        (0, state_2.getDefaultRecordingTargets)().find(function (t) { return t.os === target; }) ||
        (0, state_2.getDefaultRecordingTargets)()[0];
    if ((0, state_4.isChromeTarget)(recordingTarget)) {
        exports.globals.dispatch(actions_1.Actions.setFetchChromeCategories({ fetch: true }));
    }
    exports.globals.dispatch(actions_1.Actions.setRecordingTarget({ target: recordingTarget }));
    exports.recordTargetStore.save(target);
    exports.globals.rafScheduler.scheduleFullRedraw();
}
function Instructions(cssClass) {
    return (0, mithril_1.default)(".record-section.instructions".concat(cssClass), (0, mithril_1.default)('header', 'Recording command'), exports.PERSIST_CONFIG_FLAG.get() ?
        (0, mithril_1.default)('button.permalinkconfig', {
            onclick: function () {
                exports.globals.dispatch(actions_1.Actions.createPermalink({ isRecordingConfig: true }));
            },
        }, 'Share recording settings') :
        null, RecordingSnippet(), BufferUsageProgressBar(), (0, mithril_1.default)('.buttons', StopCancelButtons()), recordingLog());
}
function loadedConfigEqual(cfg1, cfg2) {
    return cfg1.type === 'NAMED' && cfg2.type === 'NAMED' ?
        cfg1.name === cfg2.name :
        cfg1.type === cfg2.type;
}
exports.loadedConfigEqual = loadedConfigEqual;
function loadConfigButton(config, configType) {
    return (0, mithril_1.default)('button', {
        class: 'config-button',
        title: 'Apply configuration settings',
        disabled: loadedConfigEqual(configType, exports.globals.state.lastLoadedConfig),
        onclick: function () {
            exports.globals.dispatch(actions_1.Actions.setRecordConfig({ config: config, configType: configType }));
            exports.globals.rafScheduler.scheduleFullRedraw();
        },
    }, (0, mithril_1.default)('i.material-icons', 'file_upload'));
}
exports.loadConfigButton = loadConfigButton;
function displayRecordConfigs() {
    var configs = [];
    if (exports.autosaveConfigStore.hasSavedConfig) {
        configs.push((0, mithril_1.default)('.config', [
            (0, mithril_1.default)('span.title-config', (0, mithril_1.default)('strong', 'Latest started recording')),
            loadConfigButton(exports.autosaveConfigStore.get(), { type: 'AUTOMATIC' }),
        ]));
    }
    var _loop_8 = function (validated) {
        var item = validated.result;
        configs.push((0, mithril_1.default)('.config', [
            (0, mithril_1.default)('span.title-config', item.title),
            loadConfigButton(item.config, { type: 'NAMED', name: item.title }),
            (0, mithril_1.default)('button', {
                class: 'config-button',
                title: 'Overwrite configuration with current settings',
                onclick: function () {
                    if (confirm("Overwrite config \"".concat(item.title, "\" with current settings?"))) {
                        exports.recordConfigStore.overwrite(exports.globals.state.recordConfig, item.key);
                        exports.globals.dispatch(actions_1.Actions.setRecordConfig({
                            config: item.config,
                            configType: { type: 'NAMED', name: item.title },
                        }));
                        exports.globals.rafScheduler.scheduleFullRedraw();
                    }
                },
            }, (0, mithril_1.default)('i.material-icons', 'save')),
            (0, mithril_1.default)('button', {
                class: 'config-button',
                title: 'Remove configuration',
                onclick: function () {
                    exports.recordConfigStore.delete(item.key);
                    exports.globals.rafScheduler.scheduleFullRedraw();
                },
            }, (0, mithril_1.default)('i.material-icons', 'delete')),
        ]));
        var errorItems = [];
        for (var _b = 0, _c = validated.extraKeys; _b < _c.length; _b++) {
            var extraKey = _c[_b];
            errorItems.push((0, mithril_1.default)('li', "".concat(extraKey, " is unrecognised")));
        }
        for (var _d = 0, _e = validated.invalidKeys; _d < _e.length; _d++) {
            var invalidKey = _e[_d];
            errorItems.push((0, mithril_1.default)('li', "".concat(invalidKey, " contained an invalid value")));
        }
        if (errorItems.length > 0) {
            configs.push((0, mithril_1.default)('.parsing-errors', 'One or more errors have been found while loading configuration "' +
                item.title + '". Loading is possible, but make sure to check ' +
                'the settings afterwards.', (0, mithril_1.default)('ul', errorItems)));
        }
    };
    for (var _i = 0, _a = exports.recordConfigStore.recordConfigs; _i < _a.length; _i++) {
        var validated = _a[_i];
        _loop_8(validated);
    }
    return configs;
}
exports.displayRecordConfigs = displayRecordConfigs;
exports.ConfigTitleState = {
    title: '',
    getTitle: function () {
        return exports.ConfigTitleState.title;
    },
    setTitle: function (value) {
        exports.ConfigTitleState.title = value;
    },
    clearTitle: function () {
        exports.ConfigTitleState.title = '';
    },
};
function Configurations(cssClass) {
    var canSave = exports.recordConfigStore.canSave(exports.ConfigTitleState.getTitle());
    return (0, mithril_1.default)(".record-section".concat(cssClass), (0, mithril_1.default)('header', 'Save and load configurations'), (0, mithril_1.default)('.input-config', [
        (0, mithril_1.default)('input', {
            value: exports.ConfigTitleState.title,
            placeholder: 'Title for config',
            oninput: function () {
                exports.ConfigTitleState.setTitle(this.value);
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }),
        (0, mithril_1.default)('button', {
            class: 'config-button',
            disabled: !canSave,
            title: canSave ? 'Save current config' :
                'Duplicate name, saving disabled',
            onclick: function () {
                exports.recordConfigStore.save(exports.globals.state.recordConfig, exports.ConfigTitleState.getTitle());
                exports.globals.rafScheduler.scheduleFullRedraw();
                exports.ConfigTitleState.clearTitle();
            },
        }, (0, mithril_1.default)('i.material-icons', 'save')),
        (0, mithril_1.default)('button', {
            class: 'config-button',
            title: 'Clear current configuration',
            onclick: function () {
                if (confirm('Current configuration will be cleared. ' +
                    'Are you sure?')) {
                    exports.globals.dispatch(actions_1.Actions.setRecordConfig({
                        config: (0, record_config_types_1.createEmptyRecordConfig)(),
                        configType: { type: 'NONE' },
                    }));
                    exports.globals.rafScheduler.scheduleFullRedraw();
                }
            },
        }, (0, mithril_1.default)('i.material-icons', 'delete_forever')),
    ]), displayRecordConfigs());
}
exports.Configurations = Configurations;
function BufferUsageProgressBar() {
    if (!exports.globals.state.recordingInProgress)
        return [];
    var bufferUsage = exports.globals.bufferUsage ? exports.globals.bufferUsage : 0.0;
    // Buffer usage is not available yet on Android.
    if (bufferUsage === 0)
        return [];
    return (0, mithril_1.default)('label', 'Buffer usage: ', (0, mithril_1.default)('progress', { max: 100, value: bufferUsage * 100 }));
}
function RecordingNotes() {
    var sideloadUrl = 'https://perfetto.dev/docs/contributing/build-instructions#get-the-code';
    var linuxUrl = 'https://perfetto.dev/docs/quickstart/linux-tracing';
    var cmdlineUrl = 'https://perfetto.dev/docs/quickstart/android-tracing#perfetto-cmdline';
    var extensionURL = "https://chrome.google.com/webstore/detail/\n      perfetto-ui/lfmkphfpdbjijhpomgecfikhfohaoine";
    var notes = [];
    var msgFeatNotSupported = (0, mithril_1.default)('span', "Some probes are only supported in Perfetto versions running\n      on Android Q+. ");
    var msgPerfettoNotSupported = (0, mithril_1.default)('span', "Perfetto is not supported natively before Android P. ");
    var msgSideload = (0, mithril_1.default)('span', "If you have a rooted device you can ", (0, mithril_1.default)('a', { href: sideloadUrl, target: '_blank' }, "sideload the latest version of\n         Perfetto."));
    var msgRecordingNotSupported = (0, mithril_1.default)('.note', "Recording Perfetto traces from the UI is not supported natively\n     before Android Q. If you are using a P device, please select 'Android P'\n     as the 'Target Platform' and ", (0, mithril_1.default)('a', { href: cmdlineUrl, target: '_blank' }, "collect the trace using ADB."));
    var msgChrome = (0, mithril_1.default)('.note', "To trace Chrome from the Perfetto UI, you need to install our ", (0, mithril_1.default)('a', { href: extensionURL, target: '_blank' }, 'Chrome extension'), ' and then reload this page.');
    var msgLinux = (0, mithril_1.default)('.note', "Use this ", (0, mithril_1.default)('a', { href: linuxUrl, target: '_blank' }, "quickstart guide"), " to get started with tracing on Linux.");
    var msgLongTraces = (0, mithril_1.default)('.note', "Recording in long trace mode through the UI is not supported. Please copy\n    the command and ", (0, mithril_1.default)('a', { href: cmdlineUrl, target: '_blank' }, "collect the trace using ADB."));
    var msgZeroProbes = (0, mithril_1.default)('.note', 'It looks like you didn\'t add any probes. ' +
        'Please add at least one to get a non-empty trace.');
    if (!(0, state_5.hasActiveProbes)(exports.globals.state.recordConfig)) {
        notes.push(msgZeroProbes);
    }
    if ((0, state_5.isAdbTarget)(exports.globals.state.recordingTarget)) {
        notes.push(msgRecordingNotSupported);
    }
    switch (exports.globals.state.recordingTarget.os) {
        case 'Q':
            break;
        case 'P':
            notes.push((0, mithril_1.default)('.note', msgFeatNotSupported, msgSideload));
            break;
        case 'O':
            notes.push((0, mithril_1.default)('.note', msgPerfettoNotSupported, msgSideload));
            break;
        case 'L':
            notes.push(msgLinux);
            break;
        case 'C':
            if (!exports.globals.state.extensionInstalled)
                notes.push(msgChrome);
            break;
        case 'CrOS':
            if (!exports.globals.state.extensionInstalled)
                notes.push(msgChrome);
            break;
        default:
    }
    if (exports.globals.state.recordConfig.mode === 'LONG_TRACE') {
        notes.unshift(msgLongTraces);
    }
    return notes.length > 0 ? (0, mithril_1.default)('div', notes) : [];
}
function RecordingSnippet() {
    var target = exports.globals.state.recordingTarget;
    // We don't need commands to start tracing on chrome
    if ((0, state_4.isChromeTarget)(target)) {
        return exports.globals.state.extensionInstalled &&
            !exports.globals.state.recordingInProgress ?
            (0, mithril_1.default)('div', (0, mithril_1.default)('label', "To trace Chrome from the Perfetto UI you just have to press\n         'Start Recording'.")) :
            [];
    }
    return (0, mithril_1.default)(record_widgets_4.CodeSnippet, { text: getRecordCommand(target) });
}
function getRecordCommand(target) {
    var data = exports.globals.trackDataStore.get('config');
    var cfg = exports.globals.state.recordConfig;
    var time = cfg.durationMs / 1000;
    if (time > state_5.MAX_TIME) {
        time = state_5.MAX_TIME;
    }
    var pbBase64 = data ? data.pbBase64 : '';
    var pbtx = data ? data.pbtxt : '';
    var cmd = '';
    if ((0, state_5.isAndroidP)(target)) {
        cmd += "echo '".concat(pbBase64, "' | \n");
        cmd += 'base64 --decode | \n';
        cmd += 'adb shell "perfetto -c - -o /data/misc/perfetto-traces/trace"\n';
    }
    else {
        cmd +=
            (0, state_5.isAndroidTarget)(target) ? 'adb shell perfetto \\\n' : 'perfetto \\\n';
        cmd += '  -c - --txt \\\n';
        cmd += '  -o /data/misc/perfetto-traces/trace \\\n';
        cmd += '<<EOF\n\n';
        cmd += pbtx;
        cmd += '\nEOF\n';
    }
    return cmd;
}
function recordingButtons() {
    var state = exports.globals.state;
    var target = state.recordingTarget;
    var recInProgress = state.recordingInProgress;
    var start = (0, mithril_1.default)("button", {
        class: recInProgress ? '' : 'selected',
        onclick: onStartRecordingPressed,
    }, 'Start Recording');
    var buttons = [];
    if ((0, state_5.isAndroidTarget)(target)) {
        if (!recInProgress && (0, state_5.isAdbTarget)(target) &&
            exports.globals.state.recordConfig.mode !== 'LONG_TRACE') {
            buttons.push(start);
        }
    }
    else if ((0, state_4.isChromeTarget)(target) && state.extensionInstalled) {
        buttons.push(start);
    }
    return (0, mithril_1.default)('.button', buttons);
}
function StopCancelButtons() {
    if (!exports.globals.state.recordingInProgress)
        return [];
    var stop = (0, mithril_1.default)("button.selected", { onclick: function () { return exports.globals.dispatch(actions_1.Actions.stopRecording({})); } }, 'Stop');
    var cancel = (0, mithril_1.default)("button", { onclick: function () { return exports.globals.dispatch(actions_1.Actions.cancelRecording({})); } }, 'Cancel');
    return [stop, cancel];
}
function onStartRecordingPressed() {
    location.href = '#!/record/instructions';
    exports.globals.rafScheduler.scheduleFullRedraw();
    exports.autosaveConfigStore.save(exports.globals.state.recordConfig);
    var target = exports.globals.state.recordingTarget;
    if ((0, state_5.isAndroidTarget)(target) || (0, state_4.isChromeTarget)(target)) {
        exports.globals.logging.logEvent('Record Trace', "Record trace (".concat(target.os, ")"));
        exports.globals.dispatch(actions_1.Actions.startRecording({}));
    }
}
function RecordingStatusLabel() {
    var recordingStatus = exports.globals.state.recordingStatus;
    if (!recordingStatus)
        return [];
    return (0, mithril_1.default)('label', recordingStatus);
}
function ErrorLabel() {
    var lastRecordingError = exports.globals.state.lastRecordingError;
    if (!lastRecordingError)
        return [];
    return (0, mithril_1.default)('label.error-label', "Error:  ".concat(lastRecordingError));
}
exports.ErrorLabel = ErrorLabel;
function recordingLog() {
    var logs = exports.globals.recordingLog;
    if (logs === undefined)
        return [];
    return (0, mithril_1.default)('.code-snippet.no-top-bar', (0, mithril_1.default)('code', logs));
}
// The connection must be done in the frontend. After it, the serial ID will
// be inserted in the state, and the worker will be able to connect to the
// correct device.
function addAndroidDevice() {
    return __awaiter(this, void 0, void 0, function () {
        var device, e_4, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new adb_1.AdbOverWebUsb().findDevice()];
                case 1:
                    device = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    err = "No device found: ".concat(e_4.name, ": ").concat(e_4.message);
                    console.error(err, e_4);
                    alert(err);
                    return [2 /*return*/];
                case 3:
                    if (!device.serialNumber) {
                        console.error('serial number undefined');
                        return [2 /*return*/];
                    }
                    // After the user has selected a device with the chrome UI, it will be
                    // available when listing all the available device from WebUSB. Therefore,
                    // we update the list of available devices.
                    return [4 /*yield*/, (0, record_page_2.updateAvailableAdbDevices)(device.serialNumber)];
                case 4:
                    // After the user has selected a device with the chrome UI, it will be
                    // available when listing all the available device from WebUSB. Therefore,
                    // we update the list of available devices.
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateAvailableAdbDevices(preferredDeviceSerial) {
    return __awaiter(this, void 0, void 0, function () {
        var devices, recordingTarget, availableAdbDevices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new adb_1.AdbOverWebUsb().getPairedDevices()];
                case 1:
                    devices = _a.sent();
                    recordingTarget = undefined;
                    availableAdbDevices = [];
                    devices.forEach(function (d) {
                        if (d.productName && d.serialNumber) {
                            // TODO(nicomazz): At this stage, we can't know the OS version, so we
                            // assume it is 'Q'. This can create problems with devices with an old
                            // version of perfetto. The os detection should be done after the adb
                            // connection, from adb_record_controller
                            availableAdbDevices.push({ name: d.productName, serial: d.serialNumber, os: 'Q' });
                            if (preferredDeviceSerial && preferredDeviceSerial === d.serialNumber) {
                                recordingTarget = availableAdbDevices[availableAdbDevices.length - 1];
                            }
                        }
                    });
                    exports.globals.dispatch(actions_1.Actions.setAvailableAdbDevices({ devices: availableAdbDevices }));
                    selectAndroidDeviceIfAvailable(availableAdbDevices, recordingTarget);
                    exports.globals.rafScheduler.scheduleFullRedraw();
                    return [2 /*return*/, availableAdbDevices];
            }
        });
    });
}
exports.updateAvailableAdbDevices = updateAvailableAdbDevices;
function selectAndroidDeviceIfAvailable(availableAdbDevices, recordingTarget) {
    if (!recordingTarget) {
        recordingTarget = exports.globals.state.recordingTarget;
    }
    var deviceConnected = (0, state_5.isAdbTarget)(recordingTarget);
    var connectedDeviceDisconnected = deviceConnected &&
        availableAdbDevices.find(function (e) { return e.serial ===
            recordingTarget.serial; }) === undefined;
    if (availableAdbDevices.length) {
        // If there's an Android device available and the current selection isn't
        // one, select the Android device by default. If the current device isn't
        // available anymore, but another Android device is, select the other
        // Android device instead.
        if (!deviceConnected || connectedDeviceDisconnected) {
            recordingTarget = availableAdbDevices[0];
        }
        exports.globals.dispatch(actions_1.Actions.setRecordingTarget({ target: recordingTarget }));
        return;
    }
    // If the currently selected device was disconnected, reset the recording
    // target to the default one.
    if (connectedDeviceDisconnected) {
        exports.globals.dispatch(actions_1.Actions.setRecordingTarget({ target: (0, state_2.getDefaultRecordingTargets)()[0] }));
    }
}
function recordMenu(routePage) {
    var target = exports.globals.state.recordingTarget;
    var chromeProbe = (0, mithril_1.default)('a[href="#!/record/chrome"]', (0, mithril_1.default)("li".concat(routePage === 'chrome' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'laptop_chromebook'), (0, mithril_1.default)('.title', 'Chrome'), (0, mithril_1.default)('.sub', 'Chrome traces')));
    var cpuProbe = (0, mithril_1.default)('a[href="#!/record/cpu"]', (0, mithril_1.default)("li".concat(routePage === 'cpu' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'subtitles'), (0, mithril_1.default)('.title', 'CPU'), (0, mithril_1.default)('.sub', 'CPU usage, scheduling, wakeups')));
    var gpuProbe = (0, mithril_1.default)('a[href="#!/record/gpu"]', (0, mithril_1.default)("li".concat(routePage === 'gpu' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'aspect_ratio'), (0, mithril_1.default)('.title', 'GPU'), (0, mithril_1.default)('.sub', 'GPU frequency, memory')));
    var powerProbe = (0, mithril_1.default)('a[href="#!/record/power"]', (0, mithril_1.default)("li".concat(routePage === 'power' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'battery_charging_full'), (0, mithril_1.default)('.title', 'Power'), (0, mithril_1.default)('.sub', 'Battery and other energy counters')));
    var memoryProbe = (0, mithril_1.default)('a[href="#!/record/memory"]', (0, mithril_1.default)("li".concat(routePage === 'memory' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'memory'), (0, mithril_1.default)('.title', 'Memory'), (0, mithril_1.default)('.sub', 'Physical mem, VM, LMK')));
    var androidProbe = (0, mithril_1.default)('a[href="#!/record/android"]', (0, mithril_1.default)("li".concat(routePage === 'android' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'android'), (0, mithril_1.default)('.title', 'Android apps & svcs'), (0, mithril_1.default)('.sub', 'atrace and logcat')));
    var advancedProbe = (0, mithril_1.default)('a[href="#!/record/advanced"]', (0, mithril_1.default)("li".concat(routePage === 'advanced' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'settings'), (0, mithril_1.default)('.title', 'Advanced settings'), (0, mithril_1.default)('.sub', 'Complicated stuff for wizards')));
    var recInProgress = exports.globals.state.recordingInProgress;
    var probes = [];
    if ((0, state_5.isCrOSTarget)(target) || (0, state_5.isLinuxTarget)(target)) {
        probes.push(cpuProbe, powerProbe, memoryProbe, chromeProbe, advancedProbe);
    }
    else if ((0, state_4.isChromeTarget)(target)) {
        probes.push(chromeProbe);
    }
    else {
        probes.push(cpuProbe, gpuProbe, powerProbe, memoryProbe, androidProbe, chromeProbe, advancedProbe);
    }
    return (0, mithril_1.default)('.record-menu', {
        class: recInProgress ? 'disabled' : '',
        onclick: function () { return exports.globals.rafScheduler.scheduleFullRedraw(); },
    }, (0, mithril_1.default)('header', 'Trace config'), (0, mithril_1.default)('ul', (0, mithril_1.default)('a[href="#!/record/buffers"]', (0, mithril_1.default)("li".concat(routePage === 'buffers' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'tune'), (0, mithril_1.default)('.title', 'Recording settings'), (0, mithril_1.default)('.sub', 'Buffer mode, size and duration'))), (0, mithril_1.default)('a[href="#!/record/instructions"]', (0, mithril_1.default)("li".concat(routePage === 'instructions' ? '.active' : ''), (0, mithril_1.default)('i.material-icons-filled.rec', 'fiber_manual_record'), (0, mithril_1.default)('.title', 'Recording command'), (0, mithril_1.default)('.sub', 'Manually record trace'))), exports.PERSIST_CONFIG_FLAG.get() ?
        (0, mithril_1.default)('a[href="#!/record/config"]', {
            onclick: function () {
                exports.recordConfigStore.reloadFromLocalStorage();
            },
        }, (0, mithril_1.default)("li".concat(routePage === 'config' ? '.active' : ''), (0, mithril_1.default)('i.material-icons', 'save'), (0, mithril_1.default)('.title', 'Saved configs'), (0, mithril_1.default)('.sub', 'Manage local configs'))) :
        null), (0, mithril_1.default)('header', 'Probes'), (0, mithril_1.default)('ul', probes));
}
function maybeGetActiveCss(routePage, section) {
    return routePage === section ? '.active' : '';
}
exports.maybeGetActiveCss = maybeGetActiveCss;
exports.RecordPage = (0, pages_1.createPage)({
    view: function (_a) {
        var attrs = _a.attrs;
        var pages = [];
        // we need to remove the `/` character from the route
        var routePage = attrs.subpage ? attrs.subpage.substr(1) : '';
        if (!exports.RECORDING_SECTIONS.includes(routePage)) {
            routePage = 'buffers';
        }
        pages.push(recordMenu(routePage));
        pages.push((0, mithril_1.default)(recording_settings_1.RecordingSettings, {
            dataSources: [],
            cssClass: (0, record_page_1.maybeGetActiveCss)(routePage, 'buffers'),
        }));
        pages.push(Instructions((0, record_page_1.maybeGetActiveCss)(routePage, 'instructions')));
        pages.push((0, record_page_1.Configurations)((0, record_page_1.maybeGetActiveCss)(routePage, 'config')));
        var settingsSections = new Map([
            ['cpu', cpu_settings_1.CpuSettings],
            ['gpu', gpu_settings_1.GpuSettings],
            ['power', power_settings_1.PowerSettings],
            ['memory', memory_settings_1.MemorySettings],
            ['android', android_settings_1.AndroidSettings],
            ['chrome', chrome_settings_1.ChromeSettings],
            ['advanced', advanced_settings_1.AdvancedSettings],
        ]);
        for (var _i = 0, _b = settingsSections.entries(); _i < _b.length; _i++) {
            var _c = _b[_i], section = _c[0], component = _c[1];
            pages.push((0, mithril_1.default)(component, {
                dataSources: [],
                cssClass: (0, record_page_1.maybeGetActiveCss)(routePage, section),
            }));
        }
        return (0, mithril_1.default)('.record-page', exports.globals.state.recordingInProgress ? (0, mithril_1.default)('.hider') : [], (0, mithril_1.default)('.record-container', RecordHeader(), (0, mithril_1.default)('.record-container-content', recordMenu(routePage), pages)));
    },
});
function getEngine(name) {
    var _a;
    var currentEngine = exports.globals.getCurrentEngine();
    if (currentEngine === undefined)
        return undefined;
    var engineId = currentEngine.id;
    return (_a = exports.globals.engines.get(engineId)) === null || _a === void 0 ? void 0 : _a.getProxy(name);
}
// Generic class that generate a <section> + <table> from the stats table.
// The caller defines the query constraint, title and styling.
// Used for errors, data losses and debugging sections.
var StatsSection = /** @class */ (function () {
    function StatsSection(_a) {
        var _this = this;
        var attrs = _a.attrs;
        var engine = getEngine('StatsSection');
        if (engine === undefined) {
            return;
        }
        var query = "select name, value, cast(ifnull(idx, '') as text) as idx,\n              description, severity, source from stats\n              where ".concat(attrs.sqlConstraints || '1=1', "\n              order by name, idx");
        (0, queries_1.runQuery)(query, engine).then(function (resp) {
            _this.queryResponse = resp;
            exports.globals.rafScheduler.scheduleFullRedraw();
        });
    }
    StatsSection.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var resp = this.queryResponse;
        if (resp === undefined || resp.totalRowCount === 0) {
            return (0, mithril_1.default)('');
        }
        if (resp.error)
            throw new Error(resp.error);
        var tableRows = [];
        for (var _i = 0, _b = resp.rows; _i < _b.length; _i++) {
            var row = _b[_i];
            var help = [];
            if (row.description) {
                help.push((0, mithril_1.default)('i.material-icons.contextual-help', 'help_outline'));
            }
            var idx = row.idx !== '' ? "[".concat(row.idx, "]") : '';
            tableRows.push((0, mithril_1.default)('tr', (0, mithril_1.default)('td.name', { title: row.description }, "".concat(row.name).concat(idx), help), (0, mithril_1.default)('td', "".concat(row.value)), (0, mithril_1.default)('td', "".concat(row.severity, " (").concat(row.source, ")"))));
        }
        return (0, mithril_1.default)("section".concat(attrs.cssClass), (0, mithril_1.default)('h2', attrs.title), (0, mithril_1.default)('h3', attrs.subTitle), (0, mithril_1.default)('table', (0, mithril_1.default)('thead', (0, mithril_1.default)('tr', (0, mithril_1.default)('td', 'Name'), (0, mithril_1.default)('td', 'Value'), (0, mithril_1.default)('td', 'Type'))), (0, mithril_1.default)('tbody', tableRows)));
    };
    return StatsSection;
}());
var MetricErrors = /** @class */ (function () {
    function MetricErrors() {
    }
    MetricErrors.prototype.view = function () {
        if (!exports.globals.metricError)
            return;
        return (0, mithril_1.default)("section.errors", (0, mithril_1.default)('h2', "Metric Errors"), (0, mithril_1.default)('h3', "One or more metrics were not computed successfully:"), (0, mithril_1.default)('div.metric-error', exports.globals.metricError));
    };
    return MetricErrors;
}());
var TraceMetadata = /** @class */ (function () {
    function TraceMetadata() {
        var _this = this;
        var engine = getEngine('StatsSection');
        if (engine === undefined) {
            return;
        }
        var query = "with \n          metadata_with_priorities as (select\n            name, ifnull(str_value, cast(int_value as text)) as value,\n            name in (\n               \"trace_size_bytes\", \n               \"cr-os-arch\",\n               \"cr-os-name\",\n               \"cr-os-version\",\n               \"cr-physical-memory\",\n               \"cr-product-version\",\n               \"cr-hardware-class\"\n            ) as priority \n            from metadata\n          )\n          select name, value\n          from metadata_with_priorities \n          order by priority desc, name";
        (0, queries_1.runQuery)(query, engine).then(function (resp) {
            _this.queryResponse = resp;
            exports.globals.rafScheduler.scheduleFullRedraw();
        });
    }
    TraceMetadata.prototype.view = function () {
        var resp = this.queryResponse;
        if (resp === undefined || resp.totalRowCount === 0) {
            return (0, mithril_1.default)('');
        }
        var tableRows = [];
        for (var _i = 0, _a = resp.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            tableRows.push((0, mithril_1.default)('tr', (0, mithril_1.default)('td.name', "".concat(row.name)), (0, mithril_1.default)('td', "".concat(row.value))));
        }
        return (0, mithril_1.default)('section', (0, mithril_1.default)('h2', 'System info and metadata'), (0, mithril_1.default)('table', (0, mithril_1.default)('thead', (0, mithril_1.default)('tr', (0, mithril_1.default)('td', 'Name'), (0, mithril_1.default)('td', 'Value'))), (0, mithril_1.default)('tbody', tableRows)));
    };
    return TraceMetadata;
}());
var AndroidGameInterventionList = /** @class */ (function () {
    function AndroidGameInterventionList() {
        var _this = this;
        var engine = getEngine('StatsSection');
        if (engine === undefined) {
            return;
        }
        var query = "select\n                package_name,\n                uid,\n                current_mode,\n                standard_mode_supported,\n                standard_mode_downscale,\n                standard_mode_use_angle,\n                standard_mode_fps,\n                perf_mode_supported,\n                perf_mode_downscale,\n                perf_mode_use_angle,\n                perf_mode_fps,\n                battery_mode_supported,\n                battery_mode_downscale,\n                battery_mode_use_angle,\n                battery_mode_fps\n                from android_game_intervention_list";
        (0, queries_1.runQuery)(query, engine).then(function (resp) {
            _this.queryResponse = resp;
            exports.globals.rafScheduler.scheduleFullRedraw();
        });
    }
    AndroidGameInterventionList.prototype.view = function () {
        var resp = this.queryResponse;
        if (resp === undefined || resp.totalRowCount === 0) {
            return (0, mithril_1.default)('');
        }
        var tableRows = [];
        var standardInterventions = '';
        var perfInterventions = '';
        var batteryInterventions = '';
        for (var _i = 0, _a = resp.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.standard_mode_supported) {
                standardInterventions =
                    "angle=".concat(row.standard_mode_use_angle, ",downscale=").concat(row.standard_mode_downscale, ",fps=").concat(row.standard_mode_fps);
            }
            else {
                standardInterventions = 'Not supported';
            }
            if (row.perf_mode_supported) {
                perfInterventions = "angle=".concat(row.perf_mode_use_angle, ",downscale=").concat(row.perf_mode_downscale, ",fps=").concat(row.perf_mode_fps);
            }
            else {
                perfInterventions = 'Not supported';
            }
            if (row.battery_mode_supported) {
                batteryInterventions = "angle=".concat(row.battery_mode_use_angle, ",downscale=").concat(row.battery_mode_downscale, ",fps=").concat(row.battery_mode_fps);
            }
            else {
                batteryInterventions = 'Not supported';
            }
            // Game mode numbers are defined in
            // https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/android/app/GameManager.java;l=68
            if (row.current_mode === 1) {
                row.current_mode = 'Standard';
            }
            else if (row.current_mode === 2) {
                row.current_mode = 'Performance';
            }
            else if (row.current_mode === 3) {
                row.current_mode = 'Battery';
            }
            tableRows.push((0, mithril_1.default)('tr', (0, mithril_1.default)('td.name', "".concat(row.package_name)), (0, mithril_1.default)('td', "".concat(row.current_mode)), (0, mithril_1.default)('td', standardInterventions), (0, mithril_1.default)('td', perfInterventions), (0, mithril_1.default)('td', batteryInterventions)));
        }
        return (0, mithril_1.default)('section', (0, mithril_1.default)('h2', 'Game Intervention List'), (0, mithril_1.default)('table', (0, mithril_1.default)('thead', (0, mithril_1.default)('tr', (0, mithril_1.default)('td', 'Name'), (0, mithril_1.default)('td', 'Current mode'), (0, mithril_1.default)('td', 'Standard mode interventions'), (0, mithril_1.default)('td', 'Performance mode interventions'), (0, mithril_1.default)('td', 'Battery mode interventions'))), (0, mithril_1.default)('tbody', tableRows)));
    };
    return AndroidGameInterventionList;
}());
var PackageList = /** @class */ (function () {
    function PackageList() {
        var _this = this;
        var engine = getEngine('StatsSection');
        if (engine === undefined) {
            return;
        }
        var query = "select package_name, version_code, debuggable,\n                profileable_from_shell from package_list";
        (0, queries_1.runQuery)(query, engine).then(function (resp) {
            _this.queryResponse = resp;
            exports.globals.rafScheduler.scheduleFullRedraw();
        });
    }
    PackageList.prototype.view = function () {
        var resp = this.queryResponse;
        if (resp === undefined || resp.totalRowCount === 0) {
            return (0, mithril_1.default)('');
        }
        var tableRows = [];
        for (var _i = 0, _a = resp.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            tableRows.push((0, mithril_1.default)('tr', (0, mithril_1.default)('td.name', "".concat(row.package_name)), (0, mithril_1.default)('td', "".concat(row.version_code)), (0, mithril_1.default)('td', "".concat(row.debuggable ? 'debuggable' : '', " ").concat(row.profileable_from_shell ? 'profileable' : ''))));
        }
        return (0, mithril_1.default)('section', (0, mithril_1.default)('h2', 'Package list'), (0, mithril_1.default)('table', (0, mithril_1.default)('thead', (0, mithril_1.default)('tr', (0, mithril_1.default)('td', 'Name'), (0, mithril_1.default)('td', 'Version code'), (0, mithril_1.default)('td', 'Flags'))), (0, mithril_1.default)('tbody', tableRows)));
    };
    return PackageList;
}());
exports.TraceInfoPage = (0, pages_1.createPage)({
    view: function () {
        return (0, mithril_1.default)('.trace-info-page', (0, mithril_1.default)(MetricErrors), (0, mithril_1.default)(StatsSection, {
            queryId: 'info_errors',
            title: 'Import errors',
            cssClass: '.errors',
            subTitle: "The following errors have been encountered while importing the\n               trace. These errors are usually non-fatal but indicate that one\n               or more tracks might be missing or showing erroneous data.",
            sqlConstraints: "severity = 'error' and value > 0",
        }), (0, mithril_1.default)(StatsSection, {
            queryId: 'info_data_losses',
            title: 'Data losses',
            cssClass: '.errors',
            subTitle: "These counters are collected at trace recording time. The trace\n               data for one or more data sources was dropped and hence some\n               track contents will be incomplete.",
            sqlConstraints: "severity = 'data_loss' and value > 0",
        }), (0, mithril_1.default)(TraceMetadata), (0, mithril_1.default)(PackageList), (0, mithril_1.default)(AndroidGameInterventionList), (0, mithril_1.default)(StatsSection, {
            queryId: 'info_all',
            title: 'Debugging stats',
            cssClass: '',
            subTitle: "Debugging statistics such as trace buffer usage and metrics\n                     coming from the TraceProcessor importer stages.",
            sqlConstraints: '',
        }));
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
var DragGestureHandler = /** @class */ (function () {
    function DragGestureHandler(element, onDrag, onDragStarted, onDragFinished) {
        if (onDragStarted === void 0) { onDragStarted = function () { }; }
        if (onDragFinished === void 0) { onDragFinished = function () { }; }
        this.element = element;
        this.onDrag = onDrag;
        this.onDragStarted = onDragStarted;
        this.onDragFinished = onDragFinished;
        this.boundOnMouseDown = this.onMouseDown.bind(this);
        this.boundOnMouseMove = this.onMouseMove.bind(this);
        this.boundOnMouseUp = this.onMouseUp.bind(this);
        this._isDragging = false;
        element.addEventListener('mousedown', this.boundOnMouseDown);
    }
    DragGestureHandler.prototype.onMouseDown = function (e) {
        this._isDragging = true;
        document.body.addEventListener('mousemove', this.boundOnMouseMove);
        document.body.addEventListener('mouseup', this.boundOnMouseUp);
        this.pendingMouseDownEvent = e;
        // Prevent interactions with other DragGestureHandlers and event listeners
        e.stopPropagation();
    };
    // We don't start the drag gesture on mouse down, instead we wait until
    // the mouse has moved at least 1px. This prevents accidental drags that
    // were meant to be clicks.
    DragGestureHandler.prototype.startDragGesture = function (e) {
        this.clientRect = this.element.getBoundingClientRect();
        this.onDragStarted(e.clientX - this.clientRect.left, e.clientY - this.clientRect.top);
    };
    DragGestureHandler.prototype.onMouseMove = function (e) {
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
            this.onDrag(e.clientX - this.clientRect.left, e.clientY - this.clientRect.top);
        }
        e.stopPropagation();
    };
    DragGestureHandler.prototype.onMouseUp = function (e) {
        this._isDragging = false;
        document.body.removeEventListener('mousemove', this.boundOnMouseMove);
        document.body.removeEventListener('mouseup', this.boundOnMouseUp);
        if (!this.pendingMouseDownEvent) {
            this.onDragFinished();
        }
        e.stopPropagation();
    };
    Object.defineProperty(DragGestureHandler.prototype, "isDragging", {
        get: function () {
            return this._isDragging;
        },
        enumerable: false,
        configurable: true
    });
    return DragGestureHandler;
}());
exports.DragGestureHandler = DragGestureHandler;
var MAX_ZOOM_SPAN_SEC = 1e-8; // 10 ns.
/**
 * Defines a mapping between number and seconds for the entire application.
 * Linearly scales time values from boundsMs to pixel values in boundsPx and
 * back.
 */
var TimeScale = /** @class */ (function () {
    function TimeScale(timeBounds, boundsPx) {
        this.secPerPx = 0;
        this.timeBounds = timeBounds;
        this._startPx = boundsPx[0];
        this._endPx = boundsPx[1];
        this.updateSlope();
    }
    TimeScale.prototype.updateSlope = function () {
        this.secPerPx = this.timeBounds.duration / (this._endPx - this._startPx);
    };
    TimeScale.prototype.deltaTimeToPx = function (time) {
        return Math.round(time / this.secPerPx);
    };
    TimeScale.prototype.timeToPx = function (time) {
        return this._startPx + (time - this.timeBounds.start) / this.secPerPx;
    };
    TimeScale.prototype.pxToTime = function (px) {
        return this.timeBounds.start + (px - this._startPx) * this.secPerPx;
    };
    TimeScale.prototype.deltaPxToDuration = function (px) {
        return px * this.secPerPx;
    };
    TimeScale.prototype.setTimeBounds = function (timeBounds) {
        this.timeBounds = timeBounds;
        this.updateSlope();
    };
    TimeScale.prototype.setLimitsPx = function (pxStart, pxEnd) {
        (0, logging_4.assertFalse)(pxStart === pxEnd);
        (0, logging_1.assertTrue)(pxStart >= 0 && pxEnd >= 0);
        this._startPx = pxStart;
        this._endPx = pxEnd;
        this.updateSlope();
    };
    TimeScale.prototype.timeInBounds = function (time) {
        return this.timeBounds.isInBounds(time);
    };
    Object.defineProperty(TimeScale.prototype, "startPx", {
        get: function () {
            return this._startPx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeScale.prototype, "endPx", {
        get: function () {
            return this._endPx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeScale.prototype, "widthPx", {
        get: function () {
            return this._endPx - this._startPx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeScale.prototype, "timeSpan", {
        get: function () {
            return this.timeBounds;
        },
        enumerable: false,
        configurable: true
    });
    return TimeScale;
}());
exports.TimeScale = TimeScale;
function computeZoom(scale, span, zoomFactor, zoomPx) {
    var startPx = scale.startPx;
    var endPx = scale.endPx;
    var deltaPx = endPx - startPx;
    var deltaTime = span.end - span.start;
    var newDeltaTime = Math.max(deltaTime * zoomFactor, MAX_ZOOM_SPAN_SEC);
    var clampedZoomPx = Math.max(startPx, Math.min(endPx, zoomPx));
    var zoomTime = scale.pxToTime(clampedZoomPx);
    var r = (clampedZoomPx - startPx) / deltaPx;
    var newStartTime = zoomTime - newDeltaTime * r;
    var newEndTime = newStartTime + newDeltaTime;
    return new time_3.TimeSpan(newStartTime, newEndTime);
}
exports.computeZoom = computeZoom;
var query_history_1 = require("./query_history");
Object.defineProperty(exports, "QueryHistoryComponent", { enumerable: true, get: function () { return query_history_1.QueryHistoryComponent; } });
var query_result_tab_2 = require("./query_result_tab");
Object.defineProperty(exports, "QueryResultTab", { enumerable: true, get: function () { return query_result_tab_2.QueryResultTab; } });
var INPUT_PLACEHOLDER = 'Enter query and press Cmd/Ctrl + Enter';
var INPUT_MIN_LINES = 2;
var INPUT_MAX_LINES = 10;
var INPUT_LINE_HEIGHT_EM = 1.2;
var TAB_SPACES = 2;
var TAB_SPACES_STRING = ' '.repeat(TAB_SPACES);
var state = {
    enteredText: '',
};
function runAnalyzeQuery(query) {
    state.executedQuery = query;
    state.queryResult = undefined;
    var engine = getEngine();
    if (engine) {
        (0, queries_1.runQuery)(query, engine).then(function (resp) {
            (0, bottom_tab_2.addTab)({
                kind: query_result_tab_2.QueryResultTab.kind,
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
            exports.globals.rafScheduler.scheduleFullRedraw();
        });
    }
}
exports.runAnalyzeQuery = runAnalyzeQuery;
function getEngine() {
    var _a, _b;
    var engineId = (_a = exports.globals.getCurrentEngine()) === null || _a === void 0 ? void 0 : _a.id;
    if (engineId === undefined) {
        return undefined;
    }
    var engine = (_b = exports.globals.engines.get(engineId)) === null || _b === void 0 ? void 0 : _b.getProxy('AnalyzePage');
    return engine;
}
var QueryInput = /** @class */ (function () {
    function QueryInput() {
        // How many lines to display if the user hasn't resized the input box.
        this.displayLines = INPUT_MIN_LINES;
    }
    QueryInput.onKeyDown = function (e) {
        var event = e;
        var target = e.target;
        var selectionStart = target.selectionStart, selectionEnd = target.selectionEnd;
        if (event.code === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            var query = target.value;
            if (selectionEnd > selectionStart) {
                query = query.substring(selectionStart, selectionEnd);
            }
            if (!query)
                return;
            exports.queryHistoryStorage.saveQuery(query);
            (0, analyze_page_1.runAnalyzeQuery)(query);
        }
        if (event.code === 'Tab') {
            // Handle tabs to insert spaces.
            event.preventDefault();
            var lastLineBreak = target.value.lastIndexOf('\n', selectionEnd);
            if (selectionStart === selectionEnd || lastLineBreak < selectionStart) {
                // Selection does not contain line breaks, therefore is on a single
                // line. In this case, replace the selection with spaces. Replacement is
                // done via document.execCommand as opposed to direct manipulation of
                // element's value attribute because modifying latter programmatically
                // drops the edit history which breaks undo/redo functionality.
                document.execCommand('insertText', false, TAB_SPACES_STRING);
            }
            else {
                this.handleMultilineTab(target, event);
            }
        }
    };
    // Handle Tab press when the current selection is multiline: find all the
    // lines intersecting with the selection, and either indent or dedent (if
    // Shift key is held) them.
    QueryInput.handleMultilineTab = function (target, event) {
        var _this = this;
        var selectionStart = target.selectionStart, selectionEnd = target.selectionEnd;
        var firstLineBreak = target.value.lastIndexOf('\n', selectionStart - 1);
        // If no line break is found (selection begins at the first line),
        // replacementStart would have the correct value of 0.
        var replacementStart = firstLineBreak + 1;
        var replacement = target.value.substring(replacementStart, selectionEnd)
            .split('\n')
            .map(function (line) {
            if (event.shiftKey) {
                // When Shift is held, remove whitespace at the
                // beginning
                return _this.dedent(line);
            }
            else {
                return TAB_SPACES_STRING + line;
            }
        })
            .join('\n');
        // Select the range to be replaced.
        target.setSelectionRange(replacementStart, selectionEnd);
        document.execCommand('insertText', false, replacement);
        // Restore the selection to match the previous selection, allowing to chain
        // indent operations by just pressing Tab several times.
        target.setSelectionRange(replacementStart, replacementStart + replacement.length);
    };
    // Chop off up to TAB_SPACES leading spaces from a string.
    QueryInput.dedent = function (line) {
        var i = 0;
        while (i < line.length && i < TAB_SPACES && line[i] === ' ') {
            i++;
        }
        return line.substring(i);
    };
    QueryInput.prototype.onInput = function (textareaValue) {
        var textareaLines = textareaValue.split('\n').length;
        var clampedNumLines = Math.min(Math.max(textareaLines, INPUT_MIN_LINES), INPUT_MAX_LINES);
        this.displayLines = clampedNumLines;
        state.enteredText = textareaValue;
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    // This method exists because unfortunatley setting custom properties on an
    // element's inline style attribue doesn't seem to work in mithril, even
    // though the docs claim so.
    QueryInput.prototype.setHeightBeforeResize = function (node) {
        // +2em for some extra breathing space to account for padding.
        var heightEm = this.displayLines * INPUT_LINE_HEIGHT_EM + 2;
        // We set a height based on the number of lines that we want to display by
        // default. If the user resizes the textbox using the resize handle in the
        // bottom-right corner, this height is overridden.
        node.style.setProperty('--height-before-resize', "".concat(heightEm, "em"));
        // TODO(dproy): The resized height is lost if user navigates away from the
        // page and comes back.
    };
    QueryInput.prototype.oncreate = function (vnode) {
        // This makes sure query persists if user navigates to other pages and comes
        // back to analyze page.
        var existingQuery = state.enteredText;
        var textarea = vnode.dom;
        if (existingQuery) {
            textarea.value = existingQuery;
            this.onInput(existingQuery);
        }
        this.setHeightBeforeResize(textarea);
    };
    QueryInput.prototype.onupdate = function (vnode) {
        this.setHeightBeforeResize(vnode.dom);
    };
    QueryInput.prototype.view = function () {
        var _this = this;
        return (0, mithril_1.default)('textarea.query-input', {
            placeholder: INPUT_PLACEHOLDER,
            onkeydown: function (e) { return QueryInput.onKeyDown(e); },
            oninput: function (e) {
                return _this.onInput(e.target.value);
            },
        });
    };
    return QueryInput;
}());
exports.AnalyzePage = (0, pages_1.createPage)({
    view: function () {
        return (0, mithril_1.default)('.analyze-page', (0, mithril_1.default)(QueryInput), state.executedQuery === undefined ? null : (0, mithril_1.default)(query_table_1.QueryTable, {
            query: state.executedQuery,
            resp: state.queryResult,
            onClose: function () {
                state.executedQuery = undefined;
                state.queryResult = undefined;
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        }), (0, mithril_1.default)(query_history_1.QueryHistoryComponent));
    },
});
var lastReloadDialogTime = 0;
var kMinTimeBetweenDialogsMs = 10000;
var changedPaths = new Set();
function initLiveReloadIfLocalhost() {
    if (!location.origin.startsWith('http://localhost:'))
        return;
    if (exports.globals.embeddedMode)
        return;
    var monitor = new EventSource('/live_reload');
    monitor.onmessage = function (msg) {
        var change = msg.data;
        console.log('Live reload:', change);
        changedPaths.add(change);
        if (change.endsWith('.css')) {
            reloadCSS();
        }
        else if (change.endsWith('.html') || change.endsWith('.js')) {
            reloadDelayed();
        }
    };
    monitor.onerror = function (err) {
        // In most cases the error is fired on reload, when the socket disconnects.
        // Delay the error and the reconnection, so in the case of a reload we don't
        // see any midleading message.
        setTimeout(function () { return console.error('LiveReload SSE error', err); }, 1000);
    };
}
exports.initLiveReloadIfLocalhost = initLiveReloadIfLocalhost;
function reloadCSS() {
    var css = document.querySelector('link[rel=stylesheet]');
    if (!css)
        return;
    var parent = css.parentElement;
    parent.removeChild(css);
    parent.appendChild(css);
}
var rapidReloadFlag = feature_flags_1.featureFlags.register({
    id: 'rapidReload',
    name: 'Development: rapid live reload',
    defaultValue: false,
    description: 'During development, instantly reload the page on change. ' +
        'Enables lower latency of live reload at the cost of potential ' +
        'multiple re-reloads.',
    devOnly: true,
});
function reloadDelayed() {
    setTimeout(function () {
        var pathsStr = '';
        for (var _i = 0, changedPaths_1 = changedPaths; _i < changedPaths_1.length; _i++) {
            var path = changedPaths_1[_i];
            pathsStr += path + '\n';
        }
        changedPaths.clear();
        if (Date.now() - lastReloadDialogTime < kMinTimeBetweenDialogsMs)
            return;
        var reload = rapidReloadFlag.get() || confirm("".concat(pathsStr, "changed, click to reload"));
        lastReloadDialogTime = Date.now();
        if (reload) {
            window.location.reload();
        }
    }, rapidReloadFlag.get() ? 0 : 1000);
}
var flow_events_panel_2 = require("./flow_events_panel");
var TRACK_GROUP_CONNECTION_OFFSET = 5;
var TRIANGLE_SIZE = 5;
var CIRCLE_RADIUS = 3;
var BEZIER_OFFSET = 30;
var CONNECTED_FLOW_HUE = 10;
var SELECTED_FLOW_HUE = 230;
var DEFAULT_FLOW_WIDTH = 2;
var FOCUSED_FLOW_WIDTH = 3;
var HIGHLIGHTED_FLOW_INTENSITY = 45;
var FOCUSED_FLOW_INTENSITY = 55;
var DEFAULT_FLOW_INTENSITY = 70;
function hasTrackId(obj) {
    return obj.trackId !== undefined;
}
function hasManyTrackIds(obj) {
    return obj.trackIds !== undefined;
}
function hasId(obj) {
    return obj.id !== undefined;
}
function hasTrackGroupId(obj) {
    return obj.trackGroupId !== undefined;
}
var FlowEventsRendererArgs = /** @class */ (function () {
    function FlowEventsRendererArgs(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.trackIdToTrackPanel = new Map();
        this.groupIdToTrackGroupPanel = new Map();
    }
    FlowEventsRendererArgs.prototype.registerPanel = function (panel, yStart, height) {
        if (panel.state instanceof track_panel_1.TrackPanel && hasId(panel.attrs)) {
            var config = exports.globals.state.tracks[panel.attrs.id].config;
            if (hasTrackId(config)) {
                this.trackIdToTrackPanel.set(config.trackId, { panel: panel.state, yStart: yStart });
            }
            if (hasManyTrackIds(config)) {
                for (var _i = 0, _a = config.trackIds; _i < _a.length; _i++) {
                    var trackId = _a[_i];
                    this.trackIdToTrackPanel.set(trackId, { panel: panel.state, yStart: yStart });
                }
            }
        }
        else if (panel.state instanceof track_group_panel_1.TrackGroupPanel &&
            hasTrackGroupId(panel.attrs)) {
            this.groupIdToTrackGroupPanel.set(panel.attrs.trackGroupId, { panel: panel.state, yStart: yStart, height: height });
        }
    };
    return FlowEventsRendererArgs;
}());
exports.FlowEventsRendererArgs = FlowEventsRendererArgs;
var FlowEventsRenderer = /** @class */ (function () {
    function FlowEventsRenderer() {
    }
    FlowEventsRenderer.prototype.getTrackGroupIdByTrackId = function (trackId) {
        var uiTrackId = exports.globals.state.uiTrackIdByTraceTrackId[trackId];
        return uiTrackId ? exports.globals.state.tracks[uiTrackId].trackGroup : undefined;
    };
    FlowEventsRenderer.prototype.getTrackGroupYCoordinate = function (args, trackId) {
        var trackGroupId = this.getTrackGroupIdByTrackId(trackId);
        if (!trackGroupId) {
            return undefined;
        }
        var trackGroupInfo = args.groupIdToTrackGroupPanel.get(trackGroupId);
        if (!trackGroupInfo) {
            return undefined;
        }
        return trackGroupInfo.yStart + trackGroupInfo.height -
            TRACK_GROUP_CONNECTION_OFFSET;
    };
    FlowEventsRenderer.prototype.getTrackYCoordinate = function (args, trackId) {
        var _a;
        return (_a = args.trackIdToTrackPanel.get(trackId)) === null || _a === void 0 ? void 0 : _a.yStart;
    };
    FlowEventsRenderer.prototype.getYConnection = function (args, trackId, rect) {
        if (!rect) {
            var y_1 = this.getTrackGroupYCoordinate(args, trackId);
            if (y_1 === undefined) {
                return undefined;
            }
            return { y: y_1, connection: 'TRACK_GROUP' };
        }
        var y = (this.getTrackYCoordinate(args, trackId) || 0) + rect.top +
            rect.height * 0.5;
        return {
            y: Math.min(Math.max(0, y), args.canvasHeight),
            connection: 'TRACK',
        };
    };
    FlowEventsRenderer.prototype.getXCoordinate = function (ts) {
        return exports.globals.frontendLocalState.timeScale.timeToPx(ts);
    };
    FlowEventsRenderer.prototype.getSliceRect = function (args, point) {
        var _a;
        var trackPanel = (_a = args.trackIdToTrackPanel.get(point.trackId)) === null || _a === void 0 ? void 0 : _a.panel;
        if (!trackPanel) {
            return undefined;
        }
        return trackPanel.getSliceRect(point.sliceStartTs, point.sliceEndTs, point.depth);
    };
    FlowEventsRenderer.prototype.render = function (ctx, args) {
        var _this = this;
        ctx.save();
        ctx.translate(exports.TRACK_SHELL_WIDTH, 0);
        ctx.rect(0, 0, args.canvasWidth - exports.TRACK_SHELL_WIDTH, args.canvasHeight);
        ctx.clip();
        exports.globals.connectedFlows.forEach(function (flow) {
            _this.drawFlow(ctx, args, flow, CONNECTED_FLOW_HUE);
        });
        exports.globals.selectedFlows.forEach(function (flow) {
            var categories = (0, flow_events_panel_2.getFlowCategories)(flow);
            for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
                var cat = categories_1[_i];
                if (exports.globals.visibleFlowCategories.get(cat) ||
                    exports.globals.visibleFlowCategories.get(exports.ALL_CATEGORIES)) {
                    _this.drawFlow(ctx, args, flow, SELECTED_FLOW_HUE);
                    break;
                }
            }
        });
        ctx.restore();
    };
    FlowEventsRenderer.prototype.drawFlow = function (ctx, args, flow, hue) {
        var beginSliceRect = this.getSliceRect(args, flow.begin);
        var endSliceRect = this.getSliceRect(args, flow.end);
        var beginYConnection = this.getYConnection(args, flow.begin.trackId, beginSliceRect);
        var endYConnection = this.getYConnection(args, flow.end.trackId, endSliceRect);
        if (!beginYConnection || !endYConnection) {
            return;
        }
        var beginDir = 'LEFT';
        var endDir = 'RIGHT';
        if (beginYConnection.connection === 'TRACK_GROUP') {
            beginDir = beginYConnection.y > endYConnection.y ? 'DOWN' : 'UP';
        }
        if (endYConnection.connection === 'TRACK_GROUP') {
            endDir = endYConnection.y > beginYConnection.y ? 'DOWN' : 'UP';
        }
        var begin = {
            x: this.getXCoordinate(flow.begin.sliceEndTs),
            y: beginYConnection.y,
            dir: beginDir,
        };
        var end = {
            x: this.getXCoordinate(flow.end.sliceStartTs),
            y: endYConnection.y,
            dir: endDir,
        };
        var highlighted = flow.end.sliceId === exports.globals.state.highlightedSliceId ||
            flow.begin.sliceId === exports.globals.state.highlightedSliceId;
        var focused = flow.id === exports.globals.state.focusedFlowIdLeft ||
            flow.id === exports.globals.state.focusedFlowIdRight;
        var intensity = DEFAULT_FLOW_INTENSITY;
        var width = DEFAULT_FLOW_WIDTH;
        if (focused) {
            intensity = FOCUSED_FLOW_INTENSITY;
            width = FOCUSED_FLOW_WIDTH;
        }
        if (highlighted) {
            intensity = HIGHLIGHTED_FLOW_INTENSITY;
        }
        this.drawFlowArrow(ctx, begin, end, hue, intensity, width);
    };
    FlowEventsRenderer.prototype.getDeltaX = function (dir, offset) {
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
    };
    FlowEventsRenderer.prototype.getDeltaY = function (dir, offset) {
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
    };
    FlowEventsRenderer.prototype.drawFlowArrow = function (ctx, begin, end, hue, intensity, width) {
        var hasArrowHead = Math.abs(begin.x - end.x) > 3 * TRIANGLE_SIZE;
        var END_OFFSET = (((end.dir === 'RIGHT' || end.dir === 'LEFT') && hasArrowHead) ?
            TRIANGLE_SIZE :
            0);
        var color = "hsl(".concat(hue, ", 50%, ").concat(intensity, "%)");
        // draw curved line from begin to end (bezier curve)
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(begin.x, begin.y);
        ctx.bezierCurveTo(begin.x - this.getDeltaX(begin.dir, BEZIER_OFFSET), begin.y - this.getDeltaY(begin.dir, BEZIER_OFFSET), end.x - this.getDeltaX(end.dir, BEZIER_OFFSET + END_OFFSET), end.y - this.getDeltaY(end.dir, BEZIER_OFFSET + END_OFFSET), end.x - this.getDeltaX(end.dir, END_OFFSET), end.y - this.getDeltaY(end.dir, END_OFFSET));
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
        }
        else if (hasArrowHead) {
            this.drawArrowHead(end, ctx, color);
        }
    };
    FlowEventsRenderer.prototype.drawArrowHead = function (end, ctx, color) {
        var dx = this.getDeltaX(end.dir, TRIANGLE_SIZE);
        var dy = this.getDeltaY(end.dir, TRIANGLE_SIZE);
        // draw small triangle
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(end.x - dx - dy, end.y + dx - dy);
        ctx.lineTo(end.x - dx + dy, end.y - dx - dy);
        ctx.closePath();
        ctx.fill();
    };
    return FlowEventsRenderer;
}());
exports.FlowEventsRenderer = FlowEventsRenderer;
var Checkbox = /** @class */ (function () {
    function Checkbox() {
    }
    Checkbox.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var label = attrs.label, checked = attrs.checked, _b = attrs.disabled, disabled = _b === void 0 ? false : _b, extraClasses = attrs.classes, htmlAttrs = __rest(attrs, ["label", "checked", "disabled", "classes"]);
        var classes = (0, classnames_1.classNames)(disabled && 'pf-disabled', extraClasses);
        // The default checkbox is removed and an entirely new one created inside
        // the span element in CSS.
        return (0, mithril_1.default)('label.pf-checkbox', __assign({ class: classes }, htmlAttrs), (0, mithril_1.default)('input[type=checkbox]', { disabled: disabled, checked: checked }), (0, mithril_1.default)('span'), label);
    };
    return Checkbox;
}());
exports.Checkbox = Checkbox;
var Spinner = /** @class */ (function () {
    function Spinner() {
    }
    Spinner.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var _b = attrs.easing, easing = _b === void 0 ? false : _b;
        var classes = (0, classnames_1.classNames)(easing && 'easing');
        return (0, mithril_1.default)('.pf-spinner', { class: classes });
    };
    return Spinner;
}());
exports.Spinner = Spinner;
// Something to show when there's nothing else to show!
// Features a large icon, followed by some text explaining what went wrong, and
// some optional content passed as children elements, usually containing common
// actions for things you might want to do next (e.g. clear a search box).
var EmptyState = /** @class */ (function () {
    function EmptyState() {
    }
    EmptyState.prototype.view = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var _b = attrs.icon, icon = _b === void 0 ? 'search' : _b, // Icon defaults to the search symbol
        header = attrs.header;
        return (0, mithril_1.default)('.pf-empty-state', (0, mithril_1.default)('i.material-icons', icon), header && (0, mithril_1.default)('span.pf-empty-state-header', header), (0, mithril_1.default)('div.pf-empty-state-content', children));
    };
    return EmptyState;
}());
exports.EmptyState = EmptyState;
var Timestamp = /** @class */ (function () {
    function Timestamp() {
    }
    Timestamp.prototype.view = function (vnode) {
        return (0, time_1.timeToCode)((0, sql_types_1.toTraceTime)(vnode.attrs.ts));
    };
    return Timestamp;
}());
exports.Timestamp = Timestamp;
var Select = /** @class */ (function () {
    function Select() {
    }
    Select.prototype.view = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var _b = attrs.disabled, disabled = _b === void 0 ? false : _b, htmlAttrs = __rest(attrs, ["disabled"]);
        return (0, mithril_1.default)('select.pf-select' + (disabled ? '[disabled]' : ''), htmlAttrs, children);
    };
    return Select;
}());
exports.Select = Select;
// Check whether a DOM element contains another, or whether they're the same
function isOrContains(container, target) {
    return container === target || container.contains(target);
}
exports.isOrContains = isOrContains;
// Find a DOM element with a given "ref" attribute
function findRef(root, ref) {
    var query = "[ref=".concat(ref, "]");
    if (root.matches(query)) {
        return root;
    }
    else {
        return root.querySelector(query);
    }
}
exports.findRef = findRef;
// Safely case an Element to an HTMLElement.
// Throws if the element is not an HTMLElement.
function toHTMLElement(el) {
    if (!(el instanceof HTMLElement)) {
        throw new Error('Element is not an HTLMElement');
    }
    return el;
}
exports.toHTMLElement = toHTMLElement;
// Check if a mithril component vnode has children
function hasChildren(_a) {
    var children = _a.children;
    return Array.isArray(children) && children.length > 0;
}
exports.hasChildren = hasChildren;
var Button = /** @class */ (function () {
    function Button() {
    }
    Button.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var label = attrs.label, icon = attrs.icon, _b = attrs.active, active = _b === void 0 ? false : _b, _c = attrs.compact, compact = _c === void 0 ? false : _c, _d = attrs.minimal, minimal = _d === void 0 ? false : _d, _e = attrs.disabled, disabled = _e === void 0 ? false : _e, rightIcon = attrs.rightIcon, className = attrs.className, htmlAttrs = __rest(attrs, ["label", "icon", "active", "compact", "minimal", "disabled", "rightIcon", "className"]);
        var classes = (0, classnames_1.classNames)('pf-button', active && 'pf-active', compact && 'pf-compact', minimal && 'pf-minimal', (icon && !label) && 'pf-icon-only', className);
        return (0, mithril_1.default)('button' + (disabled ? '[disabled]' : ''), __assign({ class: classes }, htmlAttrs), icon && (0, mithril_1.default)(icon_1.Icon, { className: 'pf-left-icon', icon: icon }), rightIcon && (0, mithril_1.default)(icon_1.Icon, { className: 'pf-right-icon', icon: rightIcon }), label || '\u200B');
    };
    return Button;
}());
exports.Button = Button;
var Form = /** @class */ (function () {
    function Form() {
    }
    Form.prototype.view = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var className = attrs.className, htmlAttrs = __rest(attrs, ["className"]);
        var classes = (0, classnames_1.classNames)('pf-form', className);
        return (0, mithril_1.default)('form.pf-form', __assign({ class: classes }, htmlAttrs), children);
    };
    return Form;
}());
exports.Form = Form;
var FormButtonBar = /** @class */ (function () {
    function FormButtonBar() {
    }
    FormButtonBar.prototype.view = function (_a) {
        var children = _a.children;
        return (0, mithril_1.default)('.pf-form-button-bar', children);
    };
    return FormButtonBar;
}());
exports.FormButtonBar = FormButtonBar;
var FormLabel = /** @class */ (function () {
    function FormLabel() {
    }
    FormLabel.prototype.view = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        return (0, mithril_1.default)('label.pf-form-label', attrs, children);
    };
    return FormLabel;
}());
exports.FormLabel = FormLabel;
var utils_1 = require("./utils");
// An interactive menu element with an icon.
// If this node has children, a nested popup menu will be rendered.
var MenuItem = /** @class */ (function () {
    function MenuItem() {
    }
    MenuItem.prototype.view = function (vnode) {
        if ((0, utils_1.hasChildren)(vnode)) {
            return this.renderNested(vnode);
        }
        else {
            return this.renderSingle(vnode);
        }
    };
    MenuItem.prototype.renderNested = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var _b = attrs.rightIcon, rightIcon = _b === void 0 ? 'chevron_right' : _b, _c = attrs.closePopupOnClick, closePopupOnClick = _c === void 0 ? false : _c, rest = __rest(attrs, ["rightIcon", "closePopupOnClick"]);
        return (0, mithril_1.default)(menu_1.PopupMenu2, {
            popupPosition: popup_1.PopupPosition.RightStart,
            trigger: (0, mithril_1.default)(menu_1.MenuItem, __assign({ rightIcon: rightIcon !== null && rightIcon !== void 0 ? rightIcon : 'chevron_right', closePopupOnClick: closePopupOnClick }, rest)),
            showArrow: false,
        }, children);
    };
    MenuItem.prototype.renderSingle = function (_a) {
        var attrs = _a.attrs;
        var label = attrs.label, icon = attrs.icon, rightIcon = attrs.rightIcon, disabled = attrs.disabled, active = attrs.active, _b = attrs.closePopupOnClick, closePopupOnClick = _b === void 0 ? true : _b, htmlAttrs = __rest(attrs, ["label", "icon", "rightIcon", "disabled", "active", "closePopupOnClick"]);
        var classes = (0, classnames_1.classNames)(active && 'pf-active', !disabled && closePopupOnClick && 'pf-close-parent-popup-on-click');
        return (0, mithril_1.default)('button.pf-menu-item' + (disabled ? '[disabled]' : ''), __assign({ class: classes }, htmlAttrs), icon && (0, mithril_1.default)(icon_1.Icon, { className: 'pf-left-icon', icon: icon }), rightIcon && (0, mithril_1.default)(icon_1.Icon, { className: 'pf-right-icon', icon: rightIcon }), label);
    };
    return MenuItem;
}());
exports.MenuItem = MenuItem;
;
// An element which shows a dividing line between menu items.
var MenuDivider = /** @class */ (function () {
    function MenuDivider() {
    }
    MenuDivider.prototype.view = function () {
        return (0, mithril_1.default)('.pf-menu-divider');
    };
    return MenuDivider;
}());
exports.MenuDivider = MenuDivider;
;
// A siple container for a menu.
// The menu contents are passed in as children, and are typically MenuItems or
// MenuDividers, but really they can be any Mithril component.
var Menu = /** @class */ (function () {
    function Menu() {
    }
    Menu.prototype.view = function (_a) {
        var children = _a.children;
        return (0, mithril_1.default)('.pf-menu', children);
    };
    return Menu;
}());
exports.Menu = Menu;
;
// A combination of a Popup and a Menu component.
// The menu contents are passed in as children, and are typically MenuItems or
// MenuDividers, but really they can be any Mithril component.
var PopupMenu2 = /** @class */ (function () {
    function PopupMenu2() {
    }
    PopupMenu2.prototype.view = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var trigger = attrs.trigger, _b = attrs.popupPosition, popupPosition = _b === void 0 ? popup_1.PopupPosition.Bottom : _b, popupAttrs = __rest(attrs, ["trigger", "popupPosition"]);
        return (0, mithril_1.default)(popup_1.Popup, __assign({ trigger: trigger, position: popupPosition, closeOnContentClick: true }, popupAttrs), (0, mithril_1.default)(menu_1.Menu, children));
    };
    return PopupMenu2;
}());
exports.PopupMenu2 = PopupMenu2;
;
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
var core_1 = require("@popperjs/core");
var utils_2 = require("./utils");
// Note: We could just use the Placement type from popper.js instead, which is a
// union of string literals corresponding to the values in this enum, but having
// the emun makes it possible to enumerate the possible options, which is a
// feature used in the widgets page.
var PopupPosition;
(function (PopupPosition) {
    PopupPosition["Auto"] = "auto";
    PopupPosition["AutoStart"] = "auto-start";
    PopupPosition["AutoEnd"] = "auto-end";
    PopupPosition["Top"] = "top";
    PopupPosition["TopStart"] = "top-start";
    PopupPosition["TopEnd"] = "top-end";
    PopupPosition["Bottom"] = "bottom";
    PopupPosition["BottomStart"] = "bottom-start";
    PopupPosition["BottomEnd"] = "bottom-end";
    PopupPosition["Right"] = "right";
    PopupPosition["RightStart"] = "right-start";
    PopupPosition["RightEnd"] = "right-end";
    PopupPosition["Left"] = "left";
    PopupPosition["LeftStart"] = "left-start";
    PopupPosition["LeftEnd"] = "left-end";
})(PopupPosition = exports.PopupPosition || (exports.PopupPosition = {}));
// A popup is a portal whose position is dynamically updated so that it floats
// next to a trigger element. It is also styled with a nice backdrop, and
// a little arrow pointing at the trigger element.
// Useful for displaying things like popup menus.
var Popup = /** @class */ (function () {
    function Popup() {
        var _this = this;
        this.isOpen = false;
        this.onChange = function () { };
        this.handleDocMouseDown = function (e) {
            if (_this.closeOnOutsideClick && !_this.eventInPopupOrTrigger(e)) {
                _this.closePopup();
            }
        };
        this.handleDocKeyPress = function (e) {
            if (_this.closeOnEscape && e.key === 'Escape') {
                _this.closePopup();
            }
        };
        this.handleContentClick = function (e) {
            var target = e.target;
            if (target.closest('.pf-close-parent-popup-on-click')) {
                _this.closePopup();
            }
        };
    }
    Popup.prototype.view = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var trigger = attrs.trigger, _b = attrs.isOpen, isOpen = _b === void 0 ? this.isOpen : _b, _c = attrs.onChange, onChange = _c === void 0 ? function () { } : _c, _d = attrs.closeOnEscape, closeOnEscape = _d === void 0 ? true : _d, _e = attrs.closeOnOutsideClick, closeOnOutsideClick = _e === void 0 ? true : _e;
        this.isOpen = isOpen;
        this.onChange = onChange;
        this.closeOnEscape = closeOnEscape;
        this.closeOnOutsideClick = closeOnOutsideClick;
        return [
            this.renderTrigger(trigger),
            isOpen && this.renderPopup(attrs, children),
        ];
    };
    Popup.prototype.renderTrigger = function (trigger) {
        var _this = this;
        trigger.attrs = __assign(__assign({}, trigger.attrs), { ref: popup_1.Popup.TRIGGER_REF, onclick: function () {
                _this.togglePopup();
            }, active: this.isOpen });
        return trigger;
    };
    Popup.prototype.renderPopup = function (attrs, children) {
        var _this = this;
        var className = attrs.className, _a = attrs.showArrow, showArrow = _a === void 0 ? true : _a;
        var portalAttrs = {
            className: 'pf-popup-portal',
            onBeforeContentMount: function (dom) {
                // Check to see if dom is a descendant of a popup
                // If so, get the popup's "container" and put it in there instead
                // This handles the case where popups are placed inside the other popups
                // we nest outselves in their containers instead of document body which
                // means we become part of their hitbox for mouse events.
                var closestPopup = dom.closest("[ref=".concat(popup_1.Popup.POPUP_REF, "]"));
                return { container: closestPopup !== null && closestPopup !== void 0 ? closestPopup : undefined };
            },
            onContentMount: function (dom) {
                _this.popupElement =
                    (0, utils_2.toHTMLElement)((0, logging_2.assertExists)((0, utils_2.findRef)(dom, popup_1.Popup.POPUP_REF)));
                _this.createOrUpdatePopper(attrs);
                document.addEventListener('mousedown', _this.handleDocMouseDown);
                document.addEventListener('keydown', _this.handleDocKeyPress);
                dom.addEventListener('click', _this.handleContentClick);
            },
            onContentUpdate: function () {
                // The content inside the portal has updated, so we call popper to
                // recompute the popup's position, in case it has changed size.
                _this.popper && _this.popper.update();
            },
            onContentUnmount: function (dom) {
                dom.removeEventListener('click', _this.handleContentClick);
                document.removeEventListener('keydown', _this.handleDocKeyPress);
                document.removeEventListener('mousedown', _this.handleDocMouseDown);
                _this.popper && _this.popper.destroy();
                _this.popper = undefined;
                _this.popupElement = undefined;
            },
        };
        return (0, mithril_1.default)(portal_1.Portal, portalAttrs, (0, mithril_1.default)('.pf-popup', {
            class: (0, classnames_1.classNames)(className),
            ref: popup_1.Popup.POPUP_REF,
        }, showArrow && (0, mithril_1.default)('.pf-popup-arrow[data-popper-arrow]'), (0, mithril_1.default)('.pf-popup-content', children)));
    };
    Popup.prototype.oncreate = function (_a) {
        var dom = _a.dom;
        this.triggerElement = (0, logging_2.assertExists)((0, utils_2.findRef)(dom, popup_1.Popup.TRIGGER_REF));
    };
    Popup.prototype.onupdate = function (_a) {
        var attrs = _a.attrs;
        // We might have some new popper options, or the trigger might have changed
        // size, so we call popper to recompute the popup's position.
        this.createOrUpdatePopper(attrs);
    };
    Popup.prototype.onremove = function (_) {
        this.triggerElement = undefined;
    };
    Popup.prototype.createOrUpdatePopper = function (attrs) {
        var _a = attrs.position, position = _a === void 0 ? popup_1.PopupPosition.Auto : _a, _b = attrs.showArrow, showArrow = _b === void 0 ? true : _b;
        var options = {
            placement: position,
            modifiers: [
                // Move the popup away from the target allowing room for the arrow
                {
                    name: 'offset',
                    options: { offset: [0, showArrow ? 8 : 0] },
                },
                // Don't let the popup touch the edge of the viewport
                { name: 'preventOverflow', options: { padding: 8 } },
                // Don't let the arrow reach the end of the popup, which looks odd when
                // the popup has rounded corners
                { name: 'arrow', options: { padding: 8 } },
            ],
        };
        if (this.popper) {
            this.popper.setOptions(options);
        }
        else {
            if (this.popupElement && this.triggerElement) {
                this.popper = (0, core_1.createPopper)(this.triggerElement, this.popupElement, options);
            }
        }
    };
    Popup.prototype.eventInPopupOrTrigger = function (e) {
        var target = e.target;
        var onTrigger = (0, utils_2.isOrContains)((0, logging_2.assertExists)(this.triggerElement), target);
        var onPopup = (0, utils_2.isOrContains)((0, logging_2.assertExists)(this.popupElement), target);
        return onTrigger || onPopup;
    };
    Popup.prototype.closePopup = function () {
        if (this.isOpen) {
            this.isOpen = false;
            this.onChange(this.isOpen);
            exports.globals.rafScheduler.scheduleFullRedraw();
        }
    };
    Popup.prototype.togglePopup = function () {
        this.isOpen = !this.isOpen;
        this.onChange(this.isOpen);
        exports.globals.rafScheduler.scheduleFullRedraw();
    };
    Popup.TRIGGER_REF = 'trigger';
    Popup.POPUP_REF = 'popup';
    return Popup;
}());
exports.Popup = Popup;
describe('isOrContains', function () {
    var parent = document.createElement('div');
    var child = document.createElement('div');
    parent.appendChild(child);
    it('finds child in parent', function () {
        expect((0, utils_2.isOrContains)(parent, child)).toBeTruthy();
    });
    it('finds child in child', function () {
        expect((0, utils_2.isOrContains)(child, child)).toBeTruthy();
    });
    it('does not find parent in child', function () {
        expect((0, utils_2.isOrContains)(child, parent)).toBeFalsy();
    });
});
describe('findRef', function () {
    var parent = document.createElement('div');
    var fooChild = document.createElement('div');
    fooChild.setAttribute('ref', 'foo');
    parent.appendChild(fooChild);
    var barChild = document.createElement('div');
    barChild.setAttribute('ref', 'bar');
    parent.appendChild(barChild);
    it('should find refs in parent divs', function () {
        expect((0, utils_2.findRef)(parent, 'foo')).toEqual(fooChild);
        expect((0, utils_2.findRef)(parent, 'bar')).toEqual(barChild);
    });
    it('should find refs in self divs', function () {
        expect((0, utils_2.findRef)(fooChild, 'foo')).toEqual(fooChild);
        expect((0, utils_2.findRef)(barChild, 'bar')).toEqual(barChild);
    });
    it('should fail to find ref in unrelated divs', function () {
        var unrelated = document.createElement('div');
        expect((0, utils_2.findRef)(unrelated, 'foo')).toBeNull();
        expect((0, utils_2.findRef)(fooChild, 'bar')).toBeNull();
        expect((0, utils_2.findRef)(barChild, 'foo')).toBeNull();
    });
});
describe('toHTMLElement', function () {
    it('should convert a div to an HTMLElement', function () {
        var divElement = document.createElement('div');
        expect((0, utils_2.toHTMLElement)(divElement)).toEqual(divElement);
    });
    it('should fail to convert an svg element to an HTMLElement', function () {
        var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        expect(function () { return (0, utils_2.toHTMLElement)(svgElement); }).toThrow(Error);
    });
});
var Switch = /** @class */ (function () {
    function Switch() {
    }
    Switch.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var label = attrs.label, checked = attrs.checked, _b = attrs.disabled, disabled = _b === void 0 ? false : _b, htmlAttrs = __rest(attrs, ["label", "checked", "disabled"]);
        var classes = (0, classnames_1.classNames)(disabled && 'pf-disabled');
        // The default checkbox is removed and an entirely new one created inside
        // the span element in CSS.
        return (0, mithril_1.default)('label.pf-switch', __assign({ class: classes }, htmlAttrs), (0, mithril_1.default)('input[type=checkbox]', { disabled: disabled, checked: checked }), (0, mithril_1.default)('span'), label);
    };
    return Switch;
}());
exports.Switch = Switch;
var icons_5 = require("../icons");
// A component which shows a list of items with checkboxes, allowing the user to
// select from the list which ones they want to be selected.
// Also provides search functionality.
// This component is entirely controlled and callbacks must be supplied for when
// the selected items changes, and when the search term changes.
// There is an optional boolean flag to enable repeating the selected items at
// the top of the list for easy access - defaults to false.
var MultiSelect = /** @class */ (function () {
    function MultiSelect() {
        this.searchText = '';
    }
    MultiSelect.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var icon = attrs.icon, _b = attrs.popupPosition, popupPosition = _b === void 0 ? popup_1.PopupPosition.Auto : _b;
        return (0, mithril_1.default)(popup_1.Popup, {
            trigger: (0, mithril_1.default)(button_1.Button, { label: this.labelText(attrs), icon: icon }),
            position: popupPosition,
        }, this.renderPopup(attrs));
    };
    MultiSelect.prototype.labelText = function (attrs) {
        var options = attrs.options, showNumSelected = attrs.showNumSelected, label = attrs.label;
        if (showNumSelected) {
            var numSelected = options.filter(function (_a) {
                var checked = _a.checked;
                return checked;
            }).length;
            return "".concat(label, " (").concat(numSelected, " selected)");
        }
        else {
            return label;
        }
    };
    MultiSelect.prototype.renderPopup = function (attrs) {
        var _this = this;
        var options = attrs.options;
        var filteredItems = options.filter(function (_a) {
            var name = _a.name;
            return name.toLowerCase().includes(_this.searchText.toLowerCase());
        });
        return (0, mithril_1.default)('.pf-multiselect-popup', this.renderSearchBox(), this.renderListOfItems(attrs, filteredItems));
    };
    MultiSelect.prototype.renderListOfItems = function (attrs, options) {
        var repeatCheckedItemsAtTop = attrs.repeatCheckedItemsAtTop, _a = attrs.onChange, onChange = _a === void 0 ? function () { } : _a;
        var allChecked = options.every(function (_a) {
            var checked = _a.checked;
            return checked;
        });
        var anyChecked = options.some(function (_a) {
            var checked = _a.checked;
            return checked;
        });
        if (options.length === 0) {
            return (0, mithril_1.default)(empty_state_1.EmptyState, {
                header: "No results for '".concat(this.searchText, "'"),
            });
        }
        else {
            return [(0, mithril_1.default)('.pf-list', repeatCheckedItemsAtTop && anyChecked &&
                    (0, mithril_1.default)('.pf-multiselect-container', (0, mithril_1.default)('.pf-multiselect-header', (0, mithril_1.default)('span', this.searchText === '' ? 'Selected' :
                        "Selected (Filtered)"), (0, mithril_1.default)(button_1.Button, {
                        label: this.searchText === '' ? 'Clear All' :
                            'Clear Filtered',
                        icon: exports.DESELECT,
                        minimal: true,
                        onclick: function () {
                            var diffs = options.filter(function (_a) {
                                var checked = _a.checked;
                                return checked;
                            })
                                .map(function (_a) {
                                var id = _a.id;
                                return ({ id: id, checked: false });
                            });
                            onChange(diffs);
                            exports.globals.rafScheduler.scheduleFullRedraw();
                        },
                        disabled: !anyChecked,
                    })), this.renderOptions(attrs, options.filter(function (_a) {
                        var checked = _a.checked;
                        return checked;
                    }))), (0, mithril_1.default)('.pf-multiselect-container', (0, mithril_1.default)('.pf-multiselect-header', (0, mithril_1.default)('span', this.searchText === '' ? 'Options' : "Options (Filtered)"), (0, mithril_1.default)(button_1.Button, {
                    label: this.searchText === '' ? 'Select All' :
                        'Select Filtered',
                    icon: exports.SELECT_ALL,
                    minimal: true,
                    compact: true,
                    onclick: function () {
                        var diffs = options.filter(function (_a) {
                            var checked = _a.checked;
                            return !checked;
                        })
                            .map(function (_a) {
                            var id = _a.id;
                            return ({ id: id, checked: true });
                        });
                        onChange(diffs);
                        exports.globals.rafScheduler.scheduleFullRedraw();
                    },
                    disabled: allChecked,
                }), (0, mithril_1.default)(button_1.Button, {
                    label: this.searchText === '' ? 'Clear All' :
                        'Clear Filtered',
                    icon: exports.DESELECT,
                    minimal: true,
                    compact: true,
                    onclick: function () {
                        var diffs = options.filter(function (_a) {
                            var checked = _a.checked;
                            return checked;
                        })
                            .map(function (_a) {
                            var id = _a.id;
                            return ({ id: id, checked: false });
                        });
                        onChange(diffs);
                        exports.globals.rafScheduler.scheduleFullRedraw();
                    },
                    disabled: !anyChecked,
                })), this.renderOptions(attrs, options)))];
        }
    };
    MultiSelect.prototype.renderSearchBox = function () {
        var _this = this;
        return (0, mithril_1.default)('.pf-search-bar', (0, mithril_1.default)(text_input_1.TextInput, {
            oninput: function (event) {
                var eventTarget = event.target;
                _this.searchText = eventTarget.value;
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
            value: this.searchText,
            placeholder: 'Filter options...',
            extraClasses: 'pf-search-box',
        }), this.renderClearButton());
    };
    MultiSelect.prototype.renderClearButton = function () {
        var _this = this;
        if (this.searchText != '') {
            return (0, mithril_1.default)(button_1.Button, {
                onclick: function () {
                    _this.searchText = '';
                    exports.globals.rafScheduler.scheduleFullRedraw();
                },
                label: '',
                icon: 'close',
                minimal: true,
            });
        }
        else {
            return null;
        }
    };
    MultiSelect.prototype.renderOptions = function (attrs, options) {
        var _a = attrs.onChange, onChange = _a === void 0 ? function () { } : _a;
        return options.map(function (item) {
            var checked = item.checked, name = item.name, id = item.id;
            return (0, mithril_1.default)(checkbox_1.Checkbox, {
                label: name,
                key: id,
                checked: checked,
                classes: 'pf-multiselect-item',
                onchange: function () {
                    onChange([{ id: id, checked: !checked }]);
                    exports.globals.rafScheduler.scheduleFullRedraw();
                },
            });
        });
    };
    return MultiSelect;
}());
exports.MultiSelect = MultiSelect;
var Duration = /** @class */ (function () {
    function Duration() {
    }
    Duration.prototype.view = function (vnode) {
        return (0, time_1.timeToCode)((0, time_4.fromNs)(vnode.attrs.dur));
    };
    return Duration;
}());
exports.Duration = Duration;
// A portal renders children into a a div outside of the normal hierarchy of the
// parent component, usually in order to stack elements on top of others.
// Useful for creating overlays, dialogs, and popups.
var Portal = /** @class */ (function () {
    function Portal() {
    }
    Portal.prototype.view = function () {
        // Dummy element renders nothing but permits DOM access in lifecycle hooks.
        return (0, mithril_1.default)('span', { style: { display: 'none' } });
    };
    Portal.prototype.oncreate = function (_a) {
        var attrs = _a.attrs, children = _a.children, dom = _a.dom;
        var _b = attrs.onContentMount, onContentMount = _b === void 0 ? function () { } : _b, _c = attrs.onBeforeContentMount, onBeforeContentMount = _c === void 0 ? function () { return ({}); } : _c;
        var _d = onBeforeContentMount(dom).container, container = _d === void 0 ? document.body : _d;
        this.containerElement = container;
        this.portalElement = document.createElement('div');
        container.appendChild(this.portalElement);
        this.applyPortalProps(attrs);
        mithril_1.default.render(this.portalElement, children);
        onContentMount(this.portalElement);
    };
    Portal.prototype.onupdate = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var _b = attrs.onContentUpdate, onContentUpdate = _b === void 0 ? function () { } : _b;
        if (this.portalElement) {
            this.applyPortalProps(attrs);
            mithril_1.default.render(this.portalElement, children);
            onContentUpdate(this.portalElement);
        }
    };
    Portal.prototype.applyPortalProps = function (attrs) {
        var _a;
        if (this.portalElement) {
            this.portalElement.className = (_a = attrs.className) !== null && _a !== void 0 ? _a : '';
            Object.assign(this.portalElement.style, attrs.style);
        }
    };
    Portal.prototype.onremove = function (_a) {
        var _b;
        var attrs = _a.attrs;
        var _c = attrs.onContentUnmount, onContentUnmount = _c === void 0 ? function () { } : _c;
        var container = (_b = this.containerElement) !== null && _b !== void 0 ? _b : document.body;
        if (this.portalElement) {
            if (container.contains(this.portalElement)) {
                onContentUnmount(this.portalElement);
                // Rendering null ensures previous vnodes are removed properly.
                mithril_1.default.render(this.portalElement, null);
                container.removeChild(this.portalElement);
            }
        }
    };
    return Portal;
}());
exports.Portal = Portal;
// For now, this component is just a simple wrapper around a plain old input
// element, which does no more than specify a class. However, in the future we
// might want to add more features such as an optional icon or button (e.g. a
// clear button), at which point the benefit of having this as a component would
// become more apparent.
var TextInput = /** @class */ (function () {
    function TextInput() {
    }
    TextInput.prototype.view = function (_a) {
        var attrs = _a.attrs;
        var _b = attrs.extraClasses, extraClasses = _b === void 0 ? '' : _b, htmlAttrs = __rest(attrs, ["extraClasses"]);
        var classes = (0, classnames_1.classNames)(extraClasses);
        return (0, mithril_1.default)('input.pf-text-input', __assign({ class: classes, 
            // Stop keydown events from triggering hotkeys
            onkeydown: function (e) { return e.stopPropagation(); } }, htmlAttrs));
    };
    return TextInput;
}());
exports.TextInput = TextInput;
var TreeLayout;
(function (TreeLayout) {
    // Classic heirachical tree layout with no columnar alignment.
    // Example:
    // foo: bar
    //  ├ baz: qux
    //  └ quux: corge
    // grault: garply
    TreeLayout["Tree"] = "tree";
    // Heirachical tree layout but right values are horizontally aligned.
    // Example:
    // foo     bar
    //  ├ baz  qux
    //  └ quux corge
    // grault  garply
    TreeLayout["Grid"] = "grid";
})(TreeLayout = exports.TreeLayout || (exports.TreeLayout = {}));
var Tree = /** @class */ (function () {
    function Tree() {
    }
    Tree.prototype.view = function (_a) {
        var attrs = _a.attrs, children = _a.children;
        var _b = attrs.layout, style = _b === void 0 ? tree_1.TreeLayout.Grid : _b, _c = attrs.className, className = _c === void 0 ? '' : _c;
        if (style === tree_1.TreeLayout.Grid) {
            return (0, mithril_1.default)('.pf-ptree-grid', { class: className }, children);
        }
        else if (style === tree_1.TreeLayout.Tree) {
            return (0, mithril_1.default)('.pf-ptree', { class: className }, children);
        }
        else {
            return null;
        }
    };
    return Tree;
}());
exports.Tree = Tree;
var TreeNode = /** @class */ (function () {
    function TreeNode() {
        this.collapsed = false;
    }
    TreeNode.prototype.view = function (vnode) {
        return [
            (0, mithril_1.default)('.pf-tree-node', this.renderLeft(vnode), this.renderRight(vnode)),
            (0, utils_1.hasChildren)(vnode) && this.renderChildren(vnode),
        ];
    };
    TreeNode.prototype.renderLeft = function (vnode) {
        var left = vnode.attrs.left;
        return (0, mithril_1.default)('.pf-tree-left', left, (0, utils_1.hasChildren)(vnode) && this.renderCollapseButton(vnode));
    };
    TreeNode.prototype.renderRight = function (_a) {
        var right = _a.attrs.right;
        return (0, mithril_1.default)('.pf-tree-right', right);
    };
    TreeNode.prototype.renderChildren = function (vnode) {
        var children = vnode.children;
        return (0, mithril_1.default)('.pf-tree-children', {
            class: (0, classnames_1.classNames)(this.isCollapsed(vnode) && 'pf-pgrid-hidden'),
        }, children);
    };
    TreeNode.prototype.renderCollapseButton = function (vnode) {
        var _this = this;
        var attrs = vnode.attrs, _a = vnode.attrs.onCollapseChanged, onCollapseChanged = _a === void 0 ? function () { } : _a;
        return (0, mithril_1.default)(button_1.Button, {
            icon: this.isCollapsed(vnode) ? 'chevron_right' : 'expand_more',
            minimal: true,
            compact: true,
            onclick: function () {
                _this.collapsed = !_this.isCollapsed(vnode);
                onCollapseChanged(_this.collapsed, attrs);
                exports.globals.rafScheduler.scheduleFullRedraw();
            },
        });
    };
    TreeNode.prototype.isCollapsed = function (_a) {
        var attrs = _a.attrs;
        // If collapsed is omitted, use our local collapsed state instead.
        var _b = attrs.collapsed, collapsed = _b === void 0 ? this.collapsed : _b;
        return collapsed;
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
var Icon = /** @class */ (function () {
    function Icon() {
    }
    Icon.prototype.view = function (vnode) {
        var classes = (0, classnames_1.classNames)(vnode.attrs.className);
        return (0, mithril_1.default)(vnode.attrs.filled ? 'i.material-icons-filled' : 'i.material-icons', { class: classes }, vnode.attrs.icon);
    };
    return Icon;
}());
exports.Icon = Icon;
// Shorthand for if globals perf debug mode is on.
var perfDebug = function () { return exports.globals.state.perfDebug; };
exports.perfDebug = perfDebug;
// Returns performance.now() if perfDebug is enabled, otherwise 0.
// This is needed because calling performance.now is generally expensive
// and should not be done for every frame.
var debugNow = function () { return (0, exports.perfDebug)() ? performance.now() : 0; };
exports.debugNow = debugNow;
// Returns execution time of |fn| if perf debug mode is on. Returns 0 otherwise.
function measure(fn) {
    var start = (0, exports.debugNow)();
    fn();
    return (0, exports.debugNow)() - start;
}
exports.measure = measure;
// Stores statistics about samples, and keeps a fixed size buffer of most recent
// samples.
var RunningStatistics = /** @class */ (function () {
    function RunningStatistics(_maxBufferSize) {
        if (_maxBufferSize === void 0) { _maxBufferSize = 10; }
        this._maxBufferSize = _maxBufferSize;
        this._count = 0;
        this._mean = 0;
        this._lastValue = 0;
        this._ptr = 0;
        this.buffer = [];
    }
    RunningStatistics.prototype.addValue = function (value) {
        this._lastValue = value;
        if (this.buffer.length >= this._maxBufferSize) {
            this.buffer[this._ptr++] = value;
            if (this._ptr >= this.buffer.length) {
                this._ptr -= this.buffer.length;
            }
        }
        else {
            this.buffer.push(value);
        }
        this._mean = (this._mean * this._count + value) / (this._count + 1);
        this._count++;
    };
    Object.defineProperty(RunningStatistics.prototype, "mean", {
        get: function () {
            return this._mean;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RunningStatistics.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RunningStatistics.prototype, "bufferMean", {
        get: function () {
            return this.buffer.reduce(function (sum, v) { return sum + v; }, 0) / this.buffer.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RunningStatistics.prototype, "bufferSize", {
        get: function () {
            return this.buffer.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RunningStatistics.prototype, "maxBufferSize", {
        get: function () {
            return this._maxBufferSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RunningStatistics.prototype, "last", {
        get: function () {
            return this._lastValue;
        },
        enumerable: false,
        configurable: true
    });
    return RunningStatistics;
}());
exports.RunningStatistics = RunningStatistics;
// Returns a summary string representation of a RunningStatistics object.
function runningStatStr(stat) {
    return "Last: ".concat(stat.last.toFixed(2), "ms | ") +
        "Avg: ".concat(stat.mean.toFixed(2), "ms | ") +
        "Avg".concat(stat.maxBufferSize, ": ").concat(stat.bufferMean.toFixed(2), "ms");
}
exports.runningStatStr = runningStatStr;
// Globals singleton class that renders performance stats for the whole app.
var PerfDisplay = /** @class */ (function () {
    function PerfDisplay() {
        this.containers = [];
    }
    PerfDisplay.prototype.addContainer = function (container) {
        this.containers.push(container);
    };
    PerfDisplay.prototype.removeContainer = function (container) {
        var i = this.containers.indexOf(container);
        this.containers.splice(i, 1);
    };
    PerfDisplay.prototype.renderPerfStats = function () {
        if (!(0, exports.perfDebug)())
            return;
        var perfDisplayEl = document.querySelector('.perf-stats');
        if (!perfDisplayEl)
            return;
        mithril_1.default.render(perfDisplayEl, [
            (0, mithril_1.default)('section', exports.globals.rafScheduler.renderPerfStats()),
            (0, mithril_1.default)('button.close-button', {
                onclick: function () { return exports.globals.dispatch(actions_1.Actions.togglePerfDebug({})); },
            }, (0, mithril_1.default)('i.material-icons', 'close')),
            this.containers.map(function (c, i) { return (0, mithril_1.default)('section', c.renderPerfStats(i)); }),
        ]);
    };
    return PerfDisplay;
}());
exports.perfDisplay = new PerfDisplay();
var css_constants_8 = require("./css_constants");
// Draws a vertical line with two horizontal tails at the left and right and
// a label in the middle. It looks a bit like a stretched H:
// |--- Label ---|
// The |target| bounding box determines where to draw the H.
// The |bounds| bounding box gives the visible region, this is used to adjust
// the positioning of the label to ensure it is on screen.
function drawHBar(ctx, target, bounds, label) {
    ctx.fillStyle = exports.FOREGROUND_COLOR;
    var xLeft = Math.floor(target.x);
    var xRight = Math.ceil(target.x + target.width);
    var yMid = Math.floor(target.height / 2 + target.y);
    var xWidth = xRight - xLeft;
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
    var labelWidth = ctx.measureText(label).width;
    // Find a good position for the label:
    // By default put the label in the middle of the H:
    var labelXLeft = Math.floor(xWidth / 2 - labelWidth / 2 + xLeft);
    if (labelWidth > target.width || labelXLeft < bounds.x ||
        (labelXLeft + labelWidth) > (bounds.x + bounds.width)) {
        // It won't fit in the middle or would be at least partly out of bounds
        // so put it either to the left or right:
        if (xRight > bounds.x + bounds.width) {
            // If the H extends off the right side of the screen the label
            // goes on the left of the H.
            labelXLeft = xLeft - labelWidth - 3;
        }
        else {
            // Otherwise the label goes on the right of the H.
            labelXLeft = xRight + 3;
        }
    }
    ctx.fillStyle = exports.BACKGROUND_COLOR;
    ctx.fillRect(labelXLeft - 1, 0, labelWidth + 1, target.height);
    ctx.textBaseline = 'middle';
    ctx.fillStyle = exports.FOREGROUND_COLOR;
    ctx.font = '10px Roboto Condensed';
    ctx.fillText(label, labelXLeft, yMid);
}
function drawIBar(ctx, xPos, bounds, label) {
    if (xPos < bounds.x)
        return;
    ctx.fillStyle = exports.FOREGROUND_COLOR;
    ctx.fillRect(xPos, 0, 1, bounds.width);
    var yMid = Math.floor(bounds.height / 2 + bounds.y);
    var labelWidth = ctx.measureText(label).width;
    var padding = 3;
    var xPosLabel;
    if (xPos + padding + labelWidth > bounds.width) {
        xPosLabel = xPos - padding;
        ctx.textAlign = 'right';
    }
    else {
        xPosLabel = xPos + padding;
        ctx.textAlign = 'left';
    }
    ctx.fillStyle = exports.BACKGROUND_COLOR;
    ctx.fillRect(xPosLabel - 1, 0, labelWidth + 2, bounds.height);
    ctx.textBaseline = 'middle';
    ctx.fillStyle = exports.FOREGROUND_COLOR;
    ctx.font = '10px Roboto Condensed';
    ctx.fillText(label, xPosLabel, yMid);
}
var TimeSelectionPanel = /** @class */ (function (_super) {
    __extends(TimeSelectionPanel, _super);
    function TimeSelectionPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeSelectionPanel.prototype.view = function () {
        return (0, mithril_1.default)('.time-selection-panel');
    };
    TimeSelectionPanel.prototype.renderCanvas = function (ctx, size) {
        ctx.fillStyle = '#999';
        ctx.fillRect(exports.TRACK_SHELL_WIDTH - 2, 0, 2, size.height);
        var scale = (0, gridline_helper_2.timeScaleForVisibleWindow)(exports.TRACK_SHELL_WIDTH, size.width);
        if (scale.timeSpan.duration > 0 && scale.widthPx > 0) {
            for (var _i = 0, _a = new gridline_helper_1.TickGenerator(scale); _i < _a.length; _i++) {
                var _b = _a[_i], position = _b.position, type = _b.type;
                if (type === gridline_helper_1.TickType.MAJOR) {
                    ctx.fillRect(position, 0, 1, size.height);
                }
            }
        }
        var localArea = exports.globals.frontendLocalState.selectedArea;
        var selection = exports.globals.state.currentSelection;
        if (localArea !== undefined) {
            var start = Math.min(localArea.startSec, localArea.endSec);
            var end = Math.max(localArea.startSec, localArea.endSec);
            this.renderSpan(ctx, size, new time_3.TimeSpan(start, end));
        }
        else if (selection !== null && selection.kind === 'AREA') {
            var selectedArea = exports.globals.state.areas[selection.areaId];
            var start = Math.min(selectedArea.startSec, selectedArea.endSec);
            var end = Math.max(selectedArea.startSec, selectedArea.endSec);
            this.renderSpan(ctx, size, new time_3.TimeSpan(start, end));
        }
        if (exports.globals.state.hoverCursorTimestamp !== -1) {
            this.renderHover(ctx, size, exports.globals.state.hoverCursorTimestamp);
        }
        for (var _c = 0, _d = Object.values(exports.globals.state.notes); _c < _d.length; _c++) {
            var note = _d[_c];
            var noteIsSelected = selection !== null && selection.kind === 'AREA' &&
                selection.noteId === note.id;
            if (note.noteType === 'AREA' && !noteIsSelected) {
                var selectedArea = exports.globals.state.areas[note.areaId];
                this.renderSpan(ctx, size, new time_3.TimeSpan(selectedArea.startSec, selectedArea.endSec));
            }
        }
    };
    TimeSelectionPanel.prototype.renderHover = function (ctx, size, ts) {
        var timeScale = exports.globals.frontendLocalState.timeScale;
        var xPos = exports.TRACK_SHELL_WIDTH + Math.floor(timeScale.timeToPx(ts));
        var offsetTime = (0, time_5.timeToString)(ts - exports.globals.state.traceTime.startSec);
        var timeFromStart = (0, time_5.timeToString)(ts);
        var label = "".concat(offsetTime, " (").concat(timeFromStart, ")");
        drawIBar(ctx, xPos, this.bounds(size), label);
    };
    TimeSelectionPanel.prototype.renderSpan = function (ctx, size, span) {
        var timeScale = exports.globals.frontendLocalState.timeScale;
        var xLeft = timeScale.timeToPx(span.start);
        var xRight = timeScale.timeToPx(span.end);
        var label = (0, time_5.timeToString)(span.duration);
        drawHBar(ctx, {
            x: exports.TRACK_SHELL_WIDTH + xLeft,
            y: 0,
            width: xRight - xLeft,
            height: size.height,
        }, this.bounds(size), label);
    };
    TimeSelectionPanel.prototype.bounds = function (size) {
        return {
            x: exports.TRACK_SHELL_WIDTH,
            y: 0,
            width: size.width - exports.TRACK_SHELL_WIDTH,
            height: size.height,
        };
    };
    return TimeSelectionPanel;
}(panel_1.Panel));
exports.TimeSelectionPanel = TimeSelectionPanel;
var constants_1 = require("../common/constants");
var metatracing_1 = require("../common/metatracing");
var perfetto_version_2 = require("../gen/perfetto_version");
var animation_1 = require("./animation");
Object.defineProperty(exports, "Animation", { enumerable: true, get: function () { return animation_1.Animation; } });
var download_utils_2 = require("./download_utils");
var legacy_trace_viewer_2 = require("./legacy_trace_viewer");
var trace_attrs_2 = require("./trace_attrs");
var trace_converter_2 = require("./trace_converter");
var ALL_PROCESSES_QUERY = 'select name, pid from process order by name;';
var CPU_TIME_FOR_PROCESSES = "\nselect\n  process.name,\n  sum(dur)/1e9 as cpu_sec\nfrom sched\njoin thread using(utid)\njoin process using(upid)\ngroup by upid\norder by cpu_sec desc\nlimit 100;";
var CYCLES_PER_P_STATE_PER_CPU = "\nselect\n  cpu,\n  freq,\n  dur,\n  sum(dur * freq)/1e6 as mcycles\nfrom (\n  select\n    cpu,\n    value as freq,\n    lead(ts) over (partition by cpu order by ts) - ts as dur\n  from counter\n  inner join cpu_counter_track on counter.track_id = cpu_counter_track.id\n  where name = 'cpufreq'\n) group by cpu, freq\norder by mcycles desc limit 32;";
var CPU_TIME_BY_CPU_BY_PROCESS = "\nselect\n  process.name as process,\n  thread.name as thread,\n  cpu,\n  sum(dur) / 1e9 as cpu_sec\nfrom sched\ninner join thread using(utid)\ninner join process using(upid)\ngroup by utid, cpu\norder by cpu_sec desc\nlimit 30;";
var HEAP_GRAPH_BYTES_PER_TYPE = "\nselect\n  o.upid,\n  o.graph_sample_ts,\n  c.name,\n  sum(o.self_size) as total_self_size\nfrom heap_graph_object o join heap_graph_class c on o.type_id = c.id\ngroup by\n o.upid,\n o.graph_sample_ts,\n c.name\norder by total_self_size desc\nlimit 100;";
var SQL_STATS = "\nwith first as (select started as ts from sqlstats limit 1)\nselect\n    round((max(ended - started, 0))/1e6) as runtime_ms,\n    round((started - first.ts)/1e6) as t_start_ms,\n    query\nfrom sqlstats, first\norder by started desc";
var GITILES_URL = 'https://android.googlesource.com/platform/external/perfetto';
var lastTabTitle = '';
function getBugReportUrl() {
    if (exports.globals.isInternalUser) {
        return 'https://goto.google.com/perfetto-ui-bug';
    }
    else {
        return 'https://github.com/google/perfetto/issues/new';
    }
}
var HIRING_BANNER_FLAG = feature_flags_1.featureFlags.register({
    id: 'showHiringBanner',
    name: 'Show hiring banner',
    description: 'Show the "We\'re hiring" banner link in the side bar.',
    defaultValue: false,
});
var WIDGETS_PAGE_IN_NAV_FLAG = feature_flags_1.featureFlags.register({
    id: 'showWidgetsPageInNav',
    name: 'Show widgets page',
    description: 'Show a link to the widgets page in the side bar.',
    defaultValue: false,
});
function shouldShowHiringBanner() {
    return exports.globals.isInternalUser && HIRING_BANNER_FLAG.get();
}
function createCannedQuery(query, title) {
    return function (e) {
        e.preventDefault();
        (0, query_result_tab_1.runQueryInNewTab)(query, title);
    };
}
var EXAMPLE_ANDROID_TRACE_URL = 'https://storage.googleapis.com/perfetto-misc/example_android_trace_15s';
var EXAMPLE_CHROME_TRACE_URL = 'https://storage.googleapis.com/perfetto-misc/chrome_example_wikipedia.perfetto_trace.gz';
var SECTIONS = [
    {
        title: 'Navigation',
        summary: 'Open or record a new trace',
        expanded: true,
        items: [
            { t: 'Open trace file', a: popupFileSelectionDialog, i: 'folder_open' },
            {
                t: 'Open with legacy UI',
                a: popupFileSelectionDialogOldUI,
                i: 'filter_none',
            },
            { t: 'Record new trace', a: navigateRecord, i: 'fiber_smart_record' },
            {
                t: 'Widgets',
                a: navigateWidgets,
                i: 'widgets',
                isVisible: function () { return WIDGETS_PAGE_IN_NAV_FLAG.get(); },
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
            { t: 'Show timeline', a: navigateViewer, i: 'line_style' },
            {
                t: 'Share',
                a: shareTrace,
                i: 'share',
                internalUserOnly: true,
                isPending: function () { return exports.globals.getConversionJobStatus('create_permalink') ===
                    conversion_jobs_1.ConversionJobStatus.InProgress; },
            },
            {
                t: 'Download',
                a: downloadTrace,
                i: 'file_download',
                checkDownloadDisabled: true,
            },
            { t: 'Query (SQL)', a: navigateAnalyze, i: 'control_camera' },
            { t: 'Metrics', a: navigateMetrics, i: 'speed' },
            { t: 'Info and stats', a: navigateInfo, i: 'info' },
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
                isPending: function () { return exports.globals.getConversionJobStatus('open_in_legacy') ===
                    conversion_jobs_1.ConversionJobStatus.InProgress; },
            },
            {
                t: 'Convert to .json',
                a: convertTraceToJson,
                i: 'file_download',
                isPending: function () { return exports.globals.getConversionJobStatus('convert_json') ===
                    conversion_jobs_1.ConversionJobStatus.InProgress; },
                checkDownloadDisabled: true,
            },
            {
                t: 'Convert to .systrace',
                a: convertTraceToSystrace,
                i: 'file_download',
                isVisible: function () { return exports.globals.hasFtrace; },
                isPending: function () { return exports.globals.getConversionJobStatus('convert_systrace') ===
                    conversion_jobs_1.ConversionJobStatus.InProgress; },
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
            { t: 'Keyboard shortcuts', a: openHelp, i: 'help' },
            { t: 'Documentation', a: 'https://perfetto.dev/docs', i: 'find_in_page' },
            { t: 'Flags', a: navigateFlags, i: 'emoji_flags' },
            {
                t: 'Report a bug',
                a: function () { return window.open(getBugReportUrl()); },
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
                a: createCannedQuery(CYCLES_PER_P_STATE_PER_CPU, 'Cycles by p-state by CPU'),
                i: 'search',
            },
            {
                t: 'CPU Time by CPU by process',
                a: createCannedQuery(CPU_TIME_BY_CPU_BY_PROCESS, 'CPU Time by CPU by process'),
                i: 'search',
            },
            {
                t: 'Heap Graph: Bytes per type',
                a: createCannedQuery(HEAP_GRAPH_BYTES_PER_TYPE, 'Heap Graph: Bytes per type'),
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
function openHelp(e) {
    e.preventDefault();
    (0, help_modal_1.toggleHelp)();
}
function getFileElement() {
    return (0, logging_2.assertExists)(document.querySelector('input[type=file]'));
}
function popupFileSelectionDialog(e) {
    e.preventDefault();
    delete getFileElement().dataset['useCatapultLegacyUi'];
    getFileElement().click();
}
function popupFileSelectionDialogOldUI(e) {
    e.preventDefault();
    getFileElement().dataset['useCatapultLegacyUi'] = '1';
    getFileElement().click();
}
function downloadTraceFromUrl(url) {
    return mithril_1.default.request({
        method: 'GET',
        url: url,
        // TODO(hjd): Once mithril is updated we can use responseType here rather
        // than using config and remove the extract below.
        config: function (xhr) {
            xhr.responseType = 'blob';
            xhr.onprogress = function (progress) {
                var percent = (100 * progress.loaded / progress.total).toFixed(1);
                exports.globals.dispatch(actions_1.Actions.updateStatus({
                    msg: "Downloading trace ".concat(percent, "%"),
                    timestamp: Date.now() / 1000,
                }));
            };
        },
        extract: function (xhr) {
            return xhr.response;
        },
    });
}
function getCurrentTrace() {
    return __awaiter(this, void 0, Promise, function () {
        var engine, src;
        return __generator(this, function (_a) {
            engine = (0, logging_2.assertExists)(exports.globals.getCurrentEngine());
            src = engine.source;
            if (src.type === 'ARRAY_BUFFER') {
                return [2 /*return*/, new Blob([src.buffer])];
            }
            else if (src.type === 'FILE') {
                return [2 /*return*/, src.file];
            }
            else if (src.type === 'URL') {
                return [2 /*return*/, downloadTraceFromUrl(src.url)];
            }
            else {
                throw new Error("Loading to catapult from source with type ".concat(src.type));
            }
            return [2 /*return*/];
        });
    });
}
exports.getCurrentTrace = getCurrentTrace;
function openCurrentTraceWithOldUI(e) {
    e.preventDefault();
    (0, logging_1.assertTrue)((0, sidebar_3.isTraceLoaded)());
    exports.globals.logging.logEvent('Trace Actions', 'Open current trace in legacy UI');
    if (!sidebar_3.isTraceLoaded)
        return;
    (0, sidebar_1.getCurrentTrace)()
        .then(function (file) {
        openInOldUIWithSizeCheck(file);
    })
        .catch(function (error) {
        throw new Error("Failed to get current trace ".concat(error));
    });
}
function convertTraceToSystrace(e) {
    e.preventDefault();
    (0, logging_1.assertTrue)((0, sidebar_3.isTraceLoaded)());
    exports.globals.logging.logEvent('Trace Actions', 'Convert to .systrace');
    if (!sidebar_3.isTraceLoaded)
        return;
    (0, sidebar_1.getCurrentTrace)()
        .then(function (file) {
        (0, trace_converter_2.convertTraceToSystraceAndDownload)(file);
    })
        .catch(function (error) {
        throw new Error("Failed to get current trace ".concat(error));
    });
}
function convertTraceToJson(e) {
    e.preventDefault();
    (0, logging_1.assertTrue)((0, sidebar_3.isTraceLoaded)());
    exports.globals.logging.logEvent('Trace Actions', 'Convert to .json');
    if (!sidebar_3.isTraceLoaded)
        return;
    (0, sidebar_1.getCurrentTrace)()
        .then(function (file) {
        (0, trace_converter_2.convertTraceToJsonAndDownload)(file);
    })
        .catch(function (error) {
        throw new Error("Failed to get current trace ".concat(error));
    });
}
function isTraceLoaded() {
    return exports.globals.getCurrentEngine() !== undefined;
}
exports.isTraceLoaded = isTraceLoaded;
function openTraceUrl(url) {
    return function (e) {
        exports.globals.logging.logEvent('Trace Actions', 'Open example trace');
        e.preventDefault();
        exports.globals.dispatch(actions_1.Actions.openTraceFromUrl({ url: url }));
    };
}
function onInputElementFileSelectionChanged(e) {
    if (!(e.target instanceof HTMLInputElement)) {
        throw new Error('Not an input element');
    }
    if (!e.target.files)
        return;
    var file = e.target.files[0];
    // Reset the value so onchange will be fired with the same file.
    e.target.value = '';
    if (e.target.dataset['useCatapultLegacyUi'] === '1') {
        openWithLegacyUi(file);
        return;
    }
    exports.globals.logging.logEvent('Trace Actions', 'Open trace from file');
    exports.globals.dispatch(actions_1.Actions.openTraceFromFile({ file: file }));
}
function openWithLegacyUi(file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Switch back to the old catapult UI.
                    exports.globals.logging.logEvent('Trace Actions', 'Open trace in Legacy UI');
                    return [4 /*yield*/, (0, legacy_trace_viewer_2.isLegacyTrace)(file)];
                case 1:
                    if (_a.sent()) {
                        (0, legacy_trace_viewer_2.openFileWithLegacyTraceViewer)(file);
                        return [2 /*return*/];
                    }
                    openInOldUIWithSizeCheck(file);
                    return [2 /*return*/];
            }
        });
    });
}
function openInOldUIWithSizeCheck(trace) {
    // Perfetto traces smaller than 50mb can be safely opened in the legacy UI.
    if (trace.size < 1024 * 1024 * 50) {
        (0, trace_converter_2.convertToJson)(trace);
        return;
    }
    // Give the user the option to truncate larger perfetto traces.
    var size = Math.round(trace.size / (1024 * 1024));
    (0, modal_3.showModal)({
        title: 'Legacy UI may fail to open this trace',
        content: (0, mithril_1.default)('div', (0, mithril_1.default)('p', "This trace is ".concat(size, "mb, opening it in the legacy UI ") +
            "may fail."), (0, mithril_1.default)('p', 'More options can be found at ', (0, mithril_1.default)('a', {
            href: 'https://goto.google.com/opening-large-traces',
            target: '_blank',
        }, 'go/opening-large-traces'), '.')),
        buttons: [
            {
                text: 'Open full trace (not recommended)',
                action: function () { return (0, trace_converter_2.convertToJson)(trace); },
            },
            {
                text: 'Open beginning of trace',
                action: function () { return (0, trace_converter_2.convertToJson)(trace, /* truncate*/ 'start'); },
            },
            {
                text: 'Open end of trace',
                primary: true,
                action: function () { return (0, trace_converter_2.convertToJson)(trace, /* truncate*/ 'end'); },
            },
        ],
    });
    return;
}
function navigateRecord(e) {
    e.preventDefault();
    router_1.Router.navigate('#!/record');
}
function navigateWidgets(e) {
    e.preventDefault();
    router_1.Router.navigate('#!/widgets');
}
function navigateAnalyze(e) {
    e.preventDefault();
    router_1.Router.navigate('#!/query');
}
function navigateFlags(e) {
    e.preventDefault();
    router_1.Router.navigate('#!/flags');
}
function navigateMetrics(e) {
    e.preventDefault();
    router_1.Router.navigate('#!/metrics');
}
function navigateInfo(e) {
    e.preventDefault();
    router_1.Router.navigate('#!/info');
}
function navigateViewer(e) {
    e.preventDefault();
    router_1.Router.navigate('#!/viewer');
}
function shareTrace(e) {
    e.preventDefault();
    var engine = (0, logging_2.assertExists)(exports.globals.getCurrentEngine());
    var traceUrl = engine.source.url || '';
    // If the trace is not shareable (has been pushed via postMessage()) but has
    // a url, create a pseudo-permalink by echoing back the URL.
    if (!(0, trace_attrs_1.isShareable)()) {
        var msg = [(0, mithril_1.default)('p', 'This trace was opened by an external site and as such cannot ' +
                'be re-shared preserving the UI state.')];
        if (traceUrl) {
            msg.push((0, mithril_1.default)('p', 'By using the URL below you can open this trace again.'));
            msg.push((0, mithril_1.default)('p', 'Clicking will copy the URL into the clipboard.'));
            msg.push(createTraceLink(traceUrl, traceUrl));
        }
        (0, modal_3.showModal)({
            title: 'Cannot create permalink from external trace',
            content: (0, mithril_1.default)('div', msg),
        });
        return;
    }
    if (!(0, trace_attrs_1.isShareable)() || !(0, sidebar_3.isTraceLoaded)())
        return;
    var result = confirm("Upload UI state and generate a permalink. " +
        "The trace will be accessible by anybody with the permalink.");
    if (result) {
        exports.globals.logging.logEvent('Trace Actions', 'Create permalink');
        exports.globals.dispatch(actions_1.Actions.createPermalink({ isRecordingConfig: false }));
    }
}
function downloadTrace(e) {
    e.preventDefault();
    if (!(0, trace_attrs_2.isDownloadable)() || !(0, sidebar_3.isTraceLoaded)())
        return;
    exports.globals.logging.logEvent('Trace Actions', 'Download trace');
    var engine = exports.globals.getCurrentEngine();
    if (!engine)
        return;
    var url = '';
    var fileName = "trace".concat(constants_1.TRACE_SUFFIX);
    var src = engine.source;
    if (src.type === 'URL') {
        url = src.url;
        fileName = url.split('/').slice(-1)[0];
    }
    else if (src.type === 'ARRAY_BUFFER') {
        var blob = new Blob([src.buffer], { type: 'application/octet-stream' });
        var inputFileName = window.prompt('Please enter a name for your file or leave blank');
        if (inputFileName) {
            fileName = "".concat(inputFileName, ".perfetto_trace.gz");
        }
        else if (src.fileName) {
            fileName = src.fileName;
        }
        url = URL.createObjectURL(blob);
    }
    else if (src.type === 'FILE') {
        var file = src.file;
        url = URL.createObjectURL(file);
        fileName = file.name;
    }
    else {
        throw new Error("Download from ".concat(JSON.stringify(src), " is not supported"));
    }
    (0, download_utils_2.downloadUrl)(fileName, url);
}
function getCurrentEngine() {
    var _a;
    var engineId = (_a = exports.globals.getCurrentEngine()) === null || _a === void 0 ? void 0 : _a.id;
    if (engineId === undefined)
        return undefined;
    return exports.globals.engines.get(engineId);
}
function highPrecisionTimersAvailable() {
    var _a;
    // High precision timers are available either when the page is cross-origin
    // isolated or when the trace processor is a standalone binary.
    return window.crossOriginIsolated ||
        ((_a = exports.globals.getCurrentEngine()) === null || _a === void 0 ? void 0 : _a.mode) === 'HTTP_RPC';
}
function recordMetatrace(e) {
    e.preventDefault();
    exports.globals.logging.logEvent('Trace Actions', 'Record metatrace');
    var engine = getCurrentEngine();
    if (!engine)
        return;
    if (!highPrecisionTimersAvailable()) {
        var PROMPT_1 = "High-precision timers are not available to WASM trace processor yet.\n\nModern browsers restrict high-precision timers to cross-origin-isolated pages.\nAs Perfetto UI needs to open traces via postMessage, it can't be cross-origin\nisolated until browsers ship support for\n'Cross-origin-opener-policy: restrict-properties'.\n\nDo you still want to record a metatrace?\nNote that events under timer precision (1ms) will dropped.\nAlternatively, connect to a trace_processor_shell --httpd instance.\n";
        (0, modal_3.showModal)({
            title: "Trace processor doesn't have high-precision timers",
            content: (0, mithril_1.default)('.modal-pre', PROMPT_1),
            buttons: [
                {
                    text: 'YES, record metatrace',
                    primary: true,
                    action: function () {
                        (0, metatracing_1.enableMetatracing)();
                        engine.enableMetatrace();
                    },
                },
                {
                    text: 'NO, cancel',
                },
            ],
        });
    }
    else {
        engine.enableMetatrace();
    }
}
function finaliseMetatrace(e) {
    return __awaiter(this, void 0, void 0, function () {
        var jsEvents, engine, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    exports.globals.logging.logEvent('Trace Actions', 'Finalise metatrace');
                    jsEvents = (0, metatracing_1.disableMetatracingAndGetTrace)();
                    engine = getCurrentEngine();
                    if (!engine)
                        return [2 /*return*/];
                    return [4 /*yield*/, engine.stopAndGetMetatrace()];
                case 1:
                    result = _a.sent();
                    if (result.error.length !== 0) {
                        throw new Error("Failed to read metatrace: ".concat(result.error));
                    }
                    (0, download_utils_1.downloadData)('metatrace', result.metatrace, jsEvents);
                    return [2 /*return*/];
            }
        });
    });
}
var EngineRPCWidget = {
    view: function () {
        var cssClass = '';
        var title = 'Number of pending SQL queries';
        var label;
        var failed = false;
        var mode;
        var engine = exports.globals.state.engine;
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
            if (exports.globals.frontendLocalState.httpRpcState.connected &&
                exports.globals.state.newEngineMode === 'USE_HTTP_RPC_IF_AVAILABLE') {
                mode = 'HTTP_RPC';
            }
            else {
                mode = 'WASM';
            }
        }
        if (mode === 'HTTP_RPC') {
            cssClass += '.green';
            label = 'RPC';
            title += '\n(Query engine: native accelerator over HTTP+RPC)';
        }
        else {
            label = 'WSM';
            title += '\n(Query engine: built-in WASM)';
        }
        return (0, mithril_1.default)(".dbg-info-square".concat(cssClass), { title: title }, (0, mithril_1.default)('div', label), (0, mithril_1.default)('div', "".concat(failed ? 'FAIL' : exports.globals.numQueuedQueries)));
    },
};
var ServiceWorkerWidget = {
    view: function () {
        var _this = this;
        var cssClass = '';
        var title = 'Service Worker: ';
        var label = 'N/A';
        var ctl = exports.globals.serviceWorkerController;
        if ((!('serviceWorker' in navigator))) {
            label = 'N/A';
            title += 'not supported by the browser (requires HTTPS)';
        }
        else if (ctl.bypassed) {
            label = 'OFF';
            cssClass = '.red';
            title += 'Bypassed, using live network. Double-click to re-enable';
        }
        else if (ctl.installing) {
            label = 'UPD';
            cssClass = '.amber';
            title += 'Installing / updating ...';
        }
        else if (!navigator.serviceWorker.controller) {
            label = 'N/A';
            title += 'Not available, using network';
        }
        else {
            label = 'ON';
            cssClass = '.green';
            title += 'Serving from cache. Ready for offline use';
        }
        var toggle = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (exports.globals.serviceWorkerController.bypassed) {
                    exports.globals.serviceWorkerController.setBypass(false);
                    return [2 /*return*/];
                }
                (0, modal_3.showModal)({
                    title: 'Disable service worker?',
                    content: (0, mithril_1.default)('div', (0, mithril_1.default)('p', "If you continue the service worker will be disabled until\n                      manually re-enabled."), (0, mithril_1.default)('p', "All future requests will be served from the network and the\n                    UI won't be available offline."), (0, mithril_1.default)('p', "You should do this only if you are debugging the UI\n                    or if you are experiencing caching-related problems."), (0, mithril_1.default)('p', "Disabling will cause a refresh of the UI, the current state\n                    will be lost.")),
                    buttons: [
                        {
                            text: 'Disable and reload',
                            primary: true,
                            action: function () {
                                exports.globals.serviceWorkerController.setBypass(true).then(function () { return location.reload(); });
                            },
                        },
                        { text: 'Cancel' },
                    ],
                });
                return [2 /*return*/];
            });
        }); };
        return (0, mithril_1.default)(".dbg-info-square".concat(cssClass), { title: title, ondblclick: toggle }, (0, mithril_1.default)('div', 'SW'), (0, mithril_1.default)('div', label));
    },
};
var SidebarFooter = {
    view: function () {
        return (0, mithril_1.default)('.sidebar-footer', (0, mithril_1.default)('button', {
            onclick: function () { return exports.globals.dispatch(actions_1.Actions.togglePerfDebug({})); },
        }, (0, mithril_1.default)('i.material-icons', { title: 'Toggle Perf Debug Mode' }, 'assessment')), (0, mithril_1.default)(EngineRPCWidget), (0, mithril_1.default)(ServiceWorkerWidget), (0, mithril_1.default)('.version', (0, mithril_1.default)('a', {
            href: "".concat(GITILES_URL, "/+/").concat(perfetto_version_2.SCM_REVISION, "/ui"),
            title: "Channel: ".concat((0, channels_1.getCurrentChannel)()),
            target: '_blank',
        }, "".concat(perfetto_version_1.VERSION.substr(0, 11)))));
    },
};
var HiringBanner = /** @class */ (function () {
    function HiringBanner() {
    }
    HiringBanner.prototype.view = function () {
        return (0, mithril_1.default)('.hiring-banner', (0, mithril_1.default)('a', {
            href: 'http://go/perfetto-open-roles',
            target: '_blank',
        }, 'We\'re hiring!'));
    };
    return HiringBanner;
}());
var Sidebar = /** @class */ (function () {
    function Sidebar() {
        this._redrawWhileAnimating = new animation_1.Animation(function () { return exports.globals.rafScheduler.scheduleFullRedraw(); });
    }
    Sidebar.prototype.view = function () {
        var _this = this;
        if (exports.globals.hideSidebar)
            return null;
        var vdomSections = [];
        var _loop_9 = function (section) {
            if (section.hideIfNoTraceLoaded && !(0, sidebar_3.isTraceLoaded)())
                return "continue";
            var vdomItems = [];
            for (var _a = 0, _b = section.items; _a < _b.length; _a++) {
                var item = _b[_a];
                if (item.isVisible !== undefined && !item.isVisible()) {
                    continue;
                }
                var css = '';
                var attrs = {
                    onclick: typeof item.a === 'function' ? item.a : null,
                    href: typeof item.a === 'string' ? item.a : '#',
                    target: typeof item.a === 'string' ? '_blank' : null,
                    disabled: false,
                    id: item.t.toLowerCase().replace(/[^\w]/g, '_'),
                };
                if (item.isPending && item.isPending()) {
                    attrs.onclick = function (e) { return e.preventDefault(); };
                    css = '.pending';
                }
                if (item.internalUserOnly && !exports.globals.isInternalUser) {
                    continue;
                }
                if (item.checkMetatracingEnabled || item.checkMetatracingDisabled) {
                    if (item.checkMetatracingEnabled === true &&
                        !(0, metatracing_1.isMetatracingEnabled)()) {
                        continue;
                    }
                    if (item.checkMetatracingDisabled === true &&
                        (0, metatracing_1.isMetatracingEnabled)()) {
                        continue;
                    }
                    if (item.checkMetatracingDisabled &&
                        !highPrecisionTimersAvailable()) {
                        attrs.disabled = true;
                    }
                }
                if (item.checkDownloadDisabled && !(0, trace_attrs_2.isDownloadable)()) {
                    attrs = {
                        onclick: function (e) {
                            e.preventDefault();
                            alert('Can not download external trace.');
                        },
                        href: '#',
                        target: null,
                        disabled: true,
                        id: '',
                    };
                }
                vdomItems.push((0, mithril_1.default)('li', (0, mithril_1.default)("a".concat(css), attrs, (0, mithril_1.default)('i.material-icons', item.i), item.t)));
            }
            if (section.appendOpenedTraceTitle) {
                var engine = exports.globals.state.engine;
                if (engine !== undefined) {
                    var traceTitle = '';
                    var traceUrl = '';
                    switch (engine.source.type) {
                        case 'FILE':
                            // Split on both \ and / (because C:\Windows\paths\are\like\this).
                            traceTitle = engine.source.file.name.split(/[/\\]/).pop();
                            var fileSizeMB = Math.ceil(engine.source.file.size / 1e6);
                            traceTitle += " (".concat(fileSizeMB, " MB)");
                            break;
                        case 'URL':
                            traceUrl = engine.source.url;
                            traceTitle = traceUrl.split('/').pop();
                            break;
                        case 'ARRAY_BUFFER':
                            traceTitle = engine.source.title;
                            traceUrl = engine.source.url || '';
                            var arrayBufferSizeMB = Math.ceil(engine.source.buffer.byteLength / 1e6);
                            traceTitle += " (".concat(arrayBufferSizeMB, " MB)");
                            break;
                        case 'HTTP_RPC':
                            traceTitle = 'External trace (RPC)';
                            break;
                        default:
                            break;
                    }
                    if (traceTitle !== '') {
                        var tabTitle = "".concat(traceTitle, " - Perfetto UI");
                        if (tabTitle !== lastTabTitle) {
                            document.title = lastTabTitle = tabTitle;
                        }
                        vdomItems.unshift((0, mithril_1.default)('li', createTraceLink(traceTitle, traceUrl)));
                    }
                }
            }
            vdomSections.push((0, mithril_1.default)("section".concat(section.expanded ? '.expanded' : ''), (0, mithril_1.default)('.section-header', {
                onclick: function () {
                    section.expanded = !section.expanded;
                    exports.globals.rafScheduler.scheduleFullRedraw();
                },
            }, (0, mithril_1.default)('h1', { title: section.summary }, section.title), (0, mithril_1.default)('h2', section.summary)), (0, mithril_1.default)('.section-content', (0, mithril_1.default)('ul', vdomItems))));
        };
        for (var _i = 0, SECTIONS_1 = SECTIONS; _i < SECTIONS_1.length; _i++) {
            var section = SECTIONS_1[_i];
            _loop_9(section);
        }
        return (0, mithril_1.default)('nav.sidebar', {
            class: exports.globals.state.sidebarVisible ? 'show-sidebar' : 'hide-sidebar',
            // 150 here matches --sidebar-timing in the css.
            // TODO(hjd): Should link to the CSS variable.
            ontransitionstart: function () { return _this._redrawWhileAnimating.start(150); },
            ontransitionend: function () { return _this._redrawWhileAnimating.stop(); },
        }, shouldShowHiringBanner() ? (0, mithril_1.default)(HiringBanner) : null, (0, mithril_1.default)("header.".concat((0, channels_1.getCurrentChannel)()), (0, mithril_1.default)("img[src=".concat(exports.globals.root, "assets/brand.png].brand")), (0, mithril_1.default)('button.sidebar-button', {
            onclick: function () {
                exports.globals.dispatch(actions_1.Actions.toggleSidebar({}));
            },
        }, (0, mithril_1.default)('i.material-icons', {
            title: exports.globals.state.sidebarVisible ? 'Hide menu' :
                'Show menu',
        }, 'menu'))), (0, mithril_1.default)('input.trace_file[type=file]', { onchange: onInputElementFileSelectionChanged }), (0, mithril_1.default)('.sidebar-scroll', mithril_1.default.apply(void 0, __spreadArray(__spreadArray(['.sidebar-scroll-container'], vdomSections, false), [(0, mithril_1.default)(SidebarFooter)], false))));
    };
    return Sidebar;
}());
exports.Sidebar = Sidebar;
function createTraceLink(title, url) {
    if (url === '') {
        return (0, mithril_1.default)('a.trace-file-name', title);
    }
    var linkProps = {
        href: url,
        title: 'Click to copy the URL',
        target: '_blank',
        onclick: (0, clipboard_2.onClickCopy)(url),
    };
    return (0, mithril_1.default)('a.trace-file-name', linkProps, title);
}
var keyboard_event_handler_2 = require("./keyboard_event_handler");
// When first starting to pan or zoom, move at least this many units.
var INITIAL_PAN_STEP_PX = 50;
var INITIAL_ZOOM_STEP = 0.1;
// The snappiness (spring constant) of pan and zoom animations [0..1].
var SNAP_FACTOR = 0.4;
// How much the velocity of a pan or zoom animation increases per millisecond.
var ACCELERATION_PER_MS = 1 / 50;
// The default duration of a pan or zoom animation. The animation may run longer
// if the user keeps holding the respective button down or shorter if the button
// is released. This value so chosen so that it is longer than the typical key
// repeat timeout to avoid breaks in the animation.
var DEFAULT_ANIMATION_DURATION = 700;
// The minimum number of units to pan or zoom per frame (before the
// ACCELERATION_PER_MS multiplier is applied).
var ZOOM_RATIO_PER_FRAME = 0.008;
var KEYBOARD_PAN_PX_PER_FRAME = 8;
// Scroll wheel animation steps.
var HORIZONTAL_WHEEL_PAN_SPEED = 1;
var WHEEL_ZOOM_SPEED = -0.02;
var EDITING_RANGE_CURSOR = 'ew-resize';
var DRAG_CURSOR = 'default';
var PAN_CURSOR = 'move';
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
var KeyMapping;
(function (KeyMapping) {
    KeyMapping["KEY_PAN_LEFT"] = "KeyA";
    KeyMapping["KEY_PAN_RIGHT"] = "KeyD";
    KeyMapping["KEY_ZOOM_IN"] = "KeyW";
    KeyMapping["KEY_ZOOM_OUT"] = "KeyS";
})(KeyMapping = exports.KeyMapping || (exports.KeyMapping = {}));
var Pan;
(function (Pan) {
    Pan[Pan["None"] = 0] = "None";
    Pan[Pan["Left"] = -1] = "Left";
    Pan[Pan["Right"] = 1] = "Right";
})(Pan || (Pan = {}));
function keyToPan(e) {
    if (e.code === pan_and_zoom_handler_1.KeyMapping.KEY_PAN_LEFT)
        return Pan.Left;
    if (e.code === pan_and_zoom_handler_1.KeyMapping.KEY_PAN_RIGHT)
        return Pan.Right;
    return Pan.None;
}
var Zoom;
(function (Zoom) {
    Zoom[Zoom["None"] = 0] = "None";
    Zoom[Zoom["In"] = 1] = "In";
    Zoom[Zoom["Out"] = -1] = "Out";
})(Zoom || (Zoom = {}));
function keyToZoom(e) {
    if (e.code === pan_and_zoom_handler_1.KeyMapping.KEY_ZOOM_IN)
        return Zoom.In;
    if (e.code === pan_and_zoom_handler_1.KeyMapping.KEY_ZOOM_OUT)
        return Zoom.Out;
    return Zoom.None;
}
/**
 * Enables horizontal pan and zoom with mouse-based drag and WASD navigation.
 */
var PanAndZoomHandler = /** @class */ (function () {
    function PanAndZoomHandler(_a) {
        var _this = this;
        var element = _a.element, contentOffsetX = _a.contentOffsetX, onPanned = _a.onPanned, onZoomed = _a.onZoomed, editSelection = _a.editSelection, onSelection = _a.onSelection, endSelection = _a.endSelection;
        this.mousePositionX = null;
        this.boundOnMouseMove = this.onMouseMove.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnKeyDown = this.onKeyDown.bind(this);
        this.boundOnKeyUp = this.onKeyUp.bind(this);
        this.shiftDown = false;
        this.panning = Pan.None;
        this.panOffsetPx = 0;
        this.targetPanOffsetPx = 0;
        this.zooming = Zoom.None;
        this.zoomRatio = 0;
        this.targetZoomRatio = 0;
        this.panAnimation = new animation_1.Animation(this.onPanAnimationStep.bind(this));
        this.zoomAnimation = new animation_1.Animation(this.onZoomAnimationStep.bind(this));
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
        this.element.addEventListener('wheel', this.boundOnWheel, { passive: true });
        var prevX = -1;
        var dragStartX = -1;
        var dragStartY = -1;
        var edit = false;
        new drag_gesture_handler_1.DragGestureHandler(this.element, function (x, y) {
            if (_this.shiftDown) {
                _this.onPanned(prevX - x);
            }
            else {
                _this.onSelection(dragStartX, dragStartY, prevX, x, y, edit);
            }
            prevX = x;
        }, function (x, y) {
            prevX = x;
            dragStartX = x;
            dragStartY = y;
            edit = _this.editSelection(x);
            // Set the cursor style based on where the cursor is when the drag
            // starts.
            if (edit) {
                _this.element.style.cursor = EDITING_RANGE_CURSOR;
            }
            else if (!_this.shiftDown) {
                _this.element.style.cursor = DRAG_CURSOR;
            }
        }, function () {
            // Reset the cursor now the drag has ended.
            _this.element.style.cursor = _this.shiftDown ? PAN_CURSOR : DRAG_CURSOR;
            dragStartX = -1;
            dragStartY = -1;
            _this.endSelection(edit);
        });
    }
    PanAndZoomHandler.prototype.shutdown = function () {
        document.body.removeEventListener('keydown', this.boundOnKeyDown);
        document.body.removeEventListener('keyup', this.boundOnKeyUp);
        this.element.removeEventListener('mousemove', this.boundOnMouseMove);
        this.element.removeEventListener('wheel', this.boundOnWheel);
    };
    PanAndZoomHandler.prototype.onPanAnimationStep = function (msSinceStartOfAnimation) {
        var step = (this.targetPanOffsetPx - this.panOffsetPx) * SNAP_FACTOR;
        if (this.panning !== Pan.None) {
            var velocity = 1 + msSinceStartOfAnimation * ACCELERATION_PER_MS;
            // Pan at least as fast as the snapping animation to avoid a
            // discontinuity.
            var targetStep = Math.max(KEYBOARD_PAN_PX_PER_FRAME * velocity, step);
            this.targetPanOffsetPx += this.panning * targetStep;
        }
        this.panOffsetPx += step;
        if (Math.abs(step) > 1e-1) {
            this.onPanned(step);
        }
        else {
            this.panAnimation.stop();
        }
    };
    PanAndZoomHandler.prototype.onZoomAnimationStep = function (msSinceStartOfAnimation) {
        if (this.mousePositionX === null)
            return;
        var step = (this.targetZoomRatio - this.zoomRatio) * SNAP_FACTOR;
        if (this.zooming !== Zoom.None) {
            var velocity = 1 + msSinceStartOfAnimation * ACCELERATION_PER_MS;
            // Zoom at least as fast as the snapping animation to avoid a
            // discontinuity.
            var targetStep = Math.max(ZOOM_RATIO_PER_FRAME * velocity, step);
            this.targetZoomRatio += this.zooming * targetStep;
        }
        this.zoomRatio += step;
        if (Math.abs(step) > 1e-6) {
            this.onZoomed(this.mousePositionX, step);
        }
        else {
            this.zoomAnimation.stop();
        }
    };
    PanAndZoomHandler.prototype.onMouseMove = function (e) {
        var pageOffset = exports.globals.state.sidebarVisible && !exports.globals.hideSidebar ?
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
            }
            else {
                this.element.style.cursor = this.shiftDown ? PAN_CURSOR : DRAG_CURSOR;
            }
        }
    };
    PanAndZoomHandler.prototype.onWheel = function (e) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            this.onPanned(e.deltaX * HORIZONTAL_WHEEL_PAN_SPEED);
            exports.globals.rafScheduler.scheduleRedraw();
        }
        else if (e.ctrlKey && this.mousePositionX) {
            var sign = e.deltaY < 0 ? -1 : 1;
            var deltaY = sign * Math.log2(1 + Math.abs(e.deltaY));
            this.onZoomed(this.mousePositionX, deltaY * WHEEL_ZOOM_SPEED);
            exports.globals.rafScheduler.scheduleRedraw();
        }
    };
    PanAndZoomHandler.prototype.onKeyDown = function (e) {
        this.updateShift(e.shiftKey);
        // Handle key events that are not pan or zoom.
        if ((0, keyboard_event_handler_2.handleKey)(e, true))
            return;
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
    };
    PanAndZoomHandler.prototype.onKeyUp = function (e) {
        this.updateShift(e.shiftKey);
        // Handle key events that are not pan or zoom.
        if ((0, keyboard_event_handler_2.handleKey)(e, false))
            return;
        if (keyToPan(e) === this.panning) {
            this.panning = Pan.None;
        }
        if (keyToZoom(e) === this.zooming) {
            this.zooming = Zoom.None;
        }
    };
    // TODO(hjd): Move this shift handling into the viewer page.
    PanAndZoomHandler.prototype.updateShift = function (down) {
        if (down === this.shiftDown)
            return;
        this.shiftDown = down;
        if (this.shiftDown) {
            this.element.style.cursor = PAN_CURSOR;
        }
        else if (this.mousePositionX) {
            this.element.style.cursor = DRAG_CURSOR;
        }
    };
    return PanAndZoomHandler;
}());
exports.PanAndZoomHandler = PanAndZoomHandler;
test('classnames', function () {
    expect((0, classnames_1.classNames)('foo', 'bar')).toEqual('foo bar');
    expect((0, classnames_1.classNames)('foo', '', 'bar')).toEqual('foo bar');
    expect((0, classnames_1.classNames)(false, 'foo', 'bar')).toEqual('foo bar');
    expect((0, classnames_1.classNames)(undefined, 'foo', 'bar')).toEqual('foo bar');
    expect((0, classnames_1.classNames)('foo', 'bar', ['baz', 'qux'])).toEqual('foo bar baz qux');
    expect((0, classnames_1.classNames)('foo bar', 'baz')).toEqual('foo bar baz');
});
test('example usecase with flags', function () {
    var foo = true;
    var bar = false;
    var baz = true;
    expect((0, classnames_1.classNames)(foo && 'foo', bar && 'bar', baz && 'baz'))
        .toEqual('foo baz');
});
test('example usecase with possibly undefined classnames', function () {
    var fooClass;
    var barClass = 'bar';
    expect((0, classnames_1.classNames)(fooClass, barClass))
        .toEqual('bar');
});
function isShareable() {
    return (exports.globals.isInternalUser && (0, trace_attrs_2.isDownloadable)());
}
exports.isShareable = isShareable;
function isDownloadable() {
    var engine = exports.globals.getCurrentEngine();
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
exports.isDownloadable = isDownloadable;
var gridline_helper_4 = require("./gridline_helper");
var pattern1 = '|....:....';
var pattern2 = '|.:.';
var pattern5 = '|....';
var timeScale = new time_scale_1.TimeScale(new time_3.TimeSpan(0, 1), [1, 2]);
test('gridline helper to have sensible step sizes', function () {
    expect((0, gridline_helper_4.getStepSize)(10, 14)).toEqual([1, pattern1]);
    expect((0, gridline_helper_4.getStepSize)(30, 14)).toEqual([5, pattern5]);
    expect((0, gridline_helper_4.getStepSize)(60, 14)).toEqual([5, pattern5]);
    expect((0, gridline_helper_4.getStepSize)(100, 14)).toEqual([10, pattern1]);
    expect((0, gridline_helper_4.getStepSize)(10, 21)).toEqual([0.5, pattern5]);
    expect((0, gridline_helper_4.getStepSize)(30, 21)).toEqual([2, pattern2]);
    expect((0, gridline_helper_4.getStepSize)(60, 21)).toEqual([5, pattern5]);
    expect((0, gridline_helper_4.getStepSize)(100, 21)).toEqual([5, pattern5]);
    expect((0, gridline_helper_4.getStepSize)(10, 3)).toEqual([5, pattern5]);
    expect((0, gridline_helper_4.getStepSize)(30, 3)).toEqual([10, pattern1]);
    expect((0, gridline_helper_4.getStepSize)(60, 3)).toEqual([20, pattern2]);
    expect((0, gridline_helper_4.getStepSize)(100, 3)).toEqual([50, pattern5]);
    expect((0, gridline_helper_4.getStepSize)(800, 4)).toEqual([200, pattern2]);
});
test('gridline helper to scale to very small and very large values', function () {
    expect((0, gridline_helper_4.getStepSize)(.01, 14)).toEqual([.001, pattern1]);
    expect((0, gridline_helper_4.getStepSize)(10000, 14)).toEqual([1000, pattern1]);
});
test('gridline helper to always return a reasonable number of steps', function () {
    for (var i = 1; i <= 1000; i++) {
        var _a = (0, gridline_helper_4.getStepSize)(i, 14), stepSize = _a[0], _ = _a[1];
        expect(Math.round(i / stepSize)).toBeGreaterThanOrEqual(6);
        expect(Math.round(i / stepSize)).toBeLessThanOrEqual(14);
    }
});
describe('TickGenerator with range 0.0-1.0 and room for 2 labels', function () {
    var tickGen = undefined;
    beforeAll(function () {
        var timeSpan = new time_3.TimeSpan(0.0, 1.0);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [0, 200]);
        tickGen = new gridline_helper_1.TickGenerator(timeScale, { minLabelPx: 100 });
    });
    it('should produce major ticks at 0.5s and minor ticks at 0.1s starting at 0', function () {
        var expected = [
            { type: gridline_helper_1.TickType.MAJOR, time: 0.0 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.1 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.2 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.3 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.4 },
            { type: gridline_helper_1.TickType.MAJOR, time: 0.5 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.6 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.7 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.8 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.9 },
        ];
        var actual = Array.from(tickGen);
        expectTicksEqual(actual, expected);
    });
    it('should tell us to use 1 decimal place for labels', function () {
        expect(tickGen.digits).toEqual(1);
    });
});
describe('TickGenerator with range 0.3-1.3 and room for 2 labels', function () {
    var tickGen = undefined;
    beforeAll(function () {
        var timeSpan = new time_3.TimeSpan(0.3, 1.3);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [0, 200]);
        tickGen = new gridline_helper_1.TickGenerator(timeScale, { minLabelPx: 100 });
    });
    it('should produce major ticks at 0.5s and minor ticks at 0.1s starting at 0', function () {
        var expected = [
            { type: gridline_helper_1.TickType.MINOR, time: 0.3 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.4 },
            { type: gridline_helper_1.TickType.MAJOR, time: 0.5 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.6 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.7 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.8 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.9 },
            { type: gridline_helper_1.TickType.MAJOR, time: 1.0 },
            { type: gridline_helper_1.TickType.MINOR, time: 1.1 },
            { type: gridline_helper_1.TickType.MINOR, time: 1.2 },
        ];
        var actual = Array.from(tickGen);
        expectTicksEqual(actual, expected);
    });
    it('should tell us to use 1 decimal place for labels', function () {
        expect(tickGen.digits).toEqual(1);
    });
});
describe('TickGenerator with range 0.0-0.2 and room for 1 label', function () {
    var tickGen = undefined;
    beforeAll(function () {
        var timeSpan = new time_3.TimeSpan(0.0, 0.2);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [0, 100]);
        tickGen = new gridline_helper_1.TickGenerator(timeScale, { minLabelPx: 100 });
    });
    it('should produce major ticks at 0.2s and minor ticks at 0.1s starting at 0', function () {
        var expected = [
            { type: gridline_helper_1.TickType.MAJOR, time: 0.0 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.05 },
            { type: gridline_helper_1.TickType.MEDIUM, time: 0.1 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.15 },
        ];
        var actual = Array.from(tickGen);
        expectTicksEqual(actual, expected);
    });
    it('should tell us to use 1 decimal place for labels', function () {
        expect(tickGen.digits).toEqual(1);
    });
});
describe('TickGenerator with range 0.0-0.1 and room for 1 label', function () {
    var tickGen = undefined;
    beforeAll(function () {
        var timeSpan = new time_3.TimeSpan(0.0, 0.1);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [0, 100]);
        tickGen = new gridline_helper_1.TickGenerator(timeScale, { minLabelPx: 100 });
    });
    it('should produce major ticks at 0.1s & minor ticks at 0.02s starting at 0', function () {
        var expected = [
            { type: gridline_helper_1.TickType.MAJOR, time: 0.0 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.01 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.02 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.03 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.04 },
            { type: gridline_helper_1.TickType.MEDIUM, time: 0.05 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.06 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.07 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.08 },
            { type: gridline_helper_1.TickType.MINOR, time: 0.09 },
        ];
        var actual = Array.from(tickGen);
        expect(tickGen.digits).toEqual(1);
        expectTicksEqual(actual, expected);
    });
    it('should tell us to use 1 decimal place for labels', function () {
        expect(tickGen.digits).toEqual(1);
    });
});
describe('TickGenerator with a very small timespan', function () {
    var tickGen = undefined;
    beforeAll(function () {
        var timeSpan = new time_3.TimeSpan(0.0, 1e-9);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [0, 100]);
        tickGen = new gridline_helper_1.TickGenerator(timeScale, { minLabelPx: 100 });
    });
    it('should generate minor ticks at 2e-10s and one major tick at the start', function () {
        var expected = [
            { type: gridline_helper_1.TickType.MAJOR, time: 0.0 },
            { type: gridline_helper_1.TickType.MINOR, time: 1e-10 },
            { type: gridline_helper_1.TickType.MINOR, time: 2e-10 },
            { type: gridline_helper_1.TickType.MINOR, time: 3e-10 },
            { type: gridline_helper_1.TickType.MINOR, time: 4e-10 },
            { type: gridline_helper_1.TickType.MEDIUM, time: 5e-10 },
            { type: gridline_helper_1.TickType.MINOR, time: 6e-10 },
            { type: gridline_helper_1.TickType.MINOR, time: 7e-10 },
            { type: gridline_helper_1.TickType.MINOR, time: 8e-10 },
            { type: gridline_helper_1.TickType.MINOR, time: 9e-10 },
        ];
        var actual = Array.from(tickGen);
        expectTicksEqual(actual, expected);
    });
    it('should tell us to use 9 decimal places for labels', function () {
        expect(tickGen.digits).toEqual(9);
    });
});
describe('TickGenerator with a very large timespan', function () {
    var tickGen = undefined;
    beforeAll(function () {
        var timeSpan = new time_3.TimeSpan(0.0, 1e9);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [0, 100]);
        tickGen = new gridline_helper_1.TickGenerator(timeScale, { minLabelPx: 100 });
    });
    it('should generate minor ticks at 2e8 and one major tick at the start', function () {
        var expected = [
            { type: gridline_helper_1.TickType.MAJOR, time: 0.0 },
            { type: gridline_helper_1.TickType.MINOR, time: 1e8 },
            { type: gridline_helper_1.TickType.MINOR, time: 2e8 },
            { type: gridline_helper_1.TickType.MINOR, time: 3e8 },
            { type: gridline_helper_1.TickType.MINOR, time: 4e8 },
            { type: gridline_helper_1.TickType.MEDIUM, time: 5e8 },
            { type: gridline_helper_1.TickType.MINOR, time: 6e8 },
            { type: gridline_helper_1.TickType.MINOR, time: 7e8 },
            { type: gridline_helper_1.TickType.MINOR, time: 8e8 },
            { type: gridline_helper_1.TickType.MINOR, time: 9e8 },
        ];
        var actual = Array.from(tickGen);
        expectTicksEqual(actual, expected);
    });
    it('should tell us to use 0 decimal places for labels', function () {
        expect(tickGen.digits).toEqual(0);
    });
});
describe('TickGenerator where the timespan has a dynamic range of 1e12', function () {
    // This is the equivalent of zooming in to the nanosecond level, 1000 seconds
    // into a trace Note: this is about the limit of what this generator can
    // handle.
    var tickGen = undefined;
    beforeAll(function () {
        var timeSpan = new time_3.TimeSpan(1000, 1000.000000001);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [0, 100]);
        tickGen = new gridline_helper_1.TickGenerator(timeScale, { minLabelPx: 100 });
    });
    it('should generate minor ticks at 1e-10s and one major tick at the start', function () {
        var expected = [
            { type: gridline_helper_1.TickType.MAJOR, time: 1000.0000000000 },
            { type: gridline_helper_1.TickType.MINOR, time: 1000.0000000001 },
            { type: gridline_helper_1.TickType.MINOR, time: 1000.0000000002 },
            { type: gridline_helper_1.TickType.MINOR, time: 1000.0000000003 },
            { type: gridline_helper_1.TickType.MINOR, time: 1000.0000000004 },
            { type: gridline_helper_1.TickType.MEDIUM, time: 1000.0000000005 },
            { type: gridline_helper_1.TickType.MINOR, time: 1000.0000000006 },
            { type: gridline_helper_1.TickType.MINOR, time: 1000.0000000007 },
            { type: gridline_helper_1.TickType.MINOR, time: 1000.0000000008 },
            { type: gridline_helper_1.TickType.MINOR, time: 1000.0000000009 },
        ];
        var actual = Array.from(tickGen);
        expectTicksEqual(actual, expected);
    });
    it('should tell us to use 9 decimal places for labels', function () {
        expect(tickGen.digits).toEqual(9);
    });
});
describe('TickGenerator where the timespan has a ridiculously huge dynamic range', function () {
    // We don't expect this to work, just wanna make sure it doesn't crash or
    // get stuck
    it('should not crash or get stuck in an infinite loop', function () {
        var timeSpan = new time_3.TimeSpan(1000, 1000.000000000001);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [0, 100]);
        new gridline_helper_1.TickGenerator(timeScale);
    });
});
describe('TickGenerator where the timespan has a ridiculously huge dynamic range', function () {
    // We don't expect this to work, just wanna make sure it doesn't crash or
    // get stuck
    it('should not crash or get stuck in an infinite loop', function () {
        var timeSpan = new time_3.TimeSpan(1000, 1000.000000000001);
        var timeScale = new time_scale_1.TimeScale(timeSpan, [0, 100]);
        new gridline_helper_1.TickGenerator(timeScale);
    });
});
test('TickGenerator constructed with a 0 width throws an error', function () {
    expect(function () {
        var timeScale = new time_scale_1.TimeScale(new time_3.TimeSpan(0.0, 1.0), [0, 0]);
        new gridline_helper_1.TickGenerator(timeScale);
    }).toThrow(Error);
});
test('TickGenerator constructed with desiredPxPerStep of 0 throws an error', function () {
    expect(function () {
        new gridline_helper_1.TickGenerator(timeScale, { minLabelPx: 0 });
    }).toThrow(Error);
});
test('TickGenerator constructed with a 0 duration throws an error', function () {
    expect(function () {
        var timeScale = new time_scale_1.TimeScale(new time_3.TimeSpan(0.0, 0.0), [0, 1]);
        new gridline_helper_1.TickGenerator(timeScale);
    }).toThrow(Error);
});
function expectTicksEqual(actual, expected) {
    // TODO(stevegolton) We could write a custom matcher for this; this approach
    // produces cryptic error messages.
    expect(actual.length).toEqual(expected.length);
    for (var i = 0; i < actual.length; ++i) {
        var ex = expected[i];
        var ac = actual[i];
        expect(ac.type).toEqual(ex.type);
        expect(ac.time).toBeCloseTo(ex.time, 9);
    }
}

