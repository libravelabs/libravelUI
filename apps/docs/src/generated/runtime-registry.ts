import dynamic from "next/dynamic";

export const runtimeRegistry = {
"components/app/search/search": {
    Component: dynamic(() => import("@/components/app/search/search")),
    module: () => import("@/components/app/search/search")
  },
"components/examples/blocks/bento/basic-2": {
    Component: dynamic(() => import("@/components/examples/blocks/bento/basic-2")),
    module: () => import("@/components/examples/blocks/bento/basic-2"),
    name: "Bento",
    url: "/docs/components/blocks/bento",
    section: "blocks"
  },
"components/examples/blocks/bento/basic": {
    Component: dynamic(() => import("@/components/examples/blocks/bento/basic")),
    module: () => import("@/components/examples/blocks/bento/basic"),
    name: "Bento",
    url: "/docs/components/blocks/bento",
    section: "blocks"
  },
"components/examples/core/accordion/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/accordion/basic.demo")),
    module: () => import("@/components/examples/core/accordion/basic.demo"),
    name: "Accordion",
    url: "/docs/components/core/accordion",
    section: "core"
  },
"components/examples/core/alert/basic": {
    Component: dynamic(() => import("@/components/examples/core/alert/basic")),
    module: () => import("@/components/examples/core/alert/basic"),
    name: "Alert",
    url: "/docs/components/core/alert",
    section: "core"
  },
"components/examples/core/alert/can-closed": {
    Component: dynamic(() => import("@/components/examples/core/alert/can-closed")),
    module: () => import("@/components/examples/core/alert/can-closed"),
    name: "Alert",
    url: "/docs/components/core/alert",
    section: "core"
  },
"components/examples/core/alert/controlled": {
    Component: dynamic(() => import("@/components/examples/core/alert/controlled")),
    module: () => import("@/components/examples/core/alert/controlled"),
    name: "Alert",
    url: "/docs/components/core/alert",
    section: "core"
  },
"components/examples/core/alert/custom-build": {
    Component: dynamic(() => import("@/components/examples/core/alert/custom-build")),
    module: () => import("@/components/examples/core/alert/custom-build"),
    name: "Alert",
    url: "/docs/components/core/alert",
    section: "core"
  },
"components/examples/core/alert/tones": {
    Component: dynamic(() => import("@/components/examples/core/alert/tones")),
    module: () => import("@/components/examples/core/alert/tones"),
    name: "Alert",
    url: "/docs/components/core/alert",
    section: "core"
  },
"components/examples/core/avatar/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/avatar/basic.demo")),
    module: () => import("@/components/examples/core/avatar/basic.demo"),
    name: "Avatar",
    url: "/docs/components/core/avatar",
    section: "core"
  },
"components/examples/core/avatar/group": {
    Component: dynamic(() => import("@/components/examples/core/avatar/group")),
    module: () => import("@/components/examples/core/avatar/group"),
    name: "Avatar",
    url: "/docs/components/core/avatar",
    section: "core"
  },
"components/examples/core/avatar/initials.demo": {
    Component: dynamic(() => import("@/components/examples/core/avatar/initials.demo")),
    module: () => import("@/components/examples/core/avatar/initials.demo"),
    name: "Avatar",
    url: "/docs/components/core/avatar",
    section: "core"
  },
"components/examples/core/badge/as-child": {
    Component: dynamic(() => import("@/components/examples/core/badge/as-child")),
    module: () => import("@/components/examples/core/badge/as-child"),
    name: "Badge",
    url: "/docs/components/core/badge",
    section: "core"
  },
"components/examples/core/badge/basic": {
    Component: dynamic(() => import("@/components/examples/core/badge/basic")),
    module: () => import("@/components/examples/core/badge/basic"),
    name: "Badge",
    url: "/docs/components/core/badge",
    section: "core"
  },
"components/examples/core/breadcrumbs/basic": {
    Component: dynamic(() => import("@/components/examples/core/breadcrumbs/basic")),
    module: () => import("@/components/examples/core/breadcrumbs/basic"),
    name: "Breadcrumbs",
    url: "/docs/components/core/breadcrumbs",
    section: "core"
  },
"components/examples/core/breadcrumbs/custom-separator": {
    Component: dynamic(() => import("@/components/examples/core/breadcrumbs/custom-separator")),
    module: () => import("@/components/examples/core/breadcrumbs/custom-separator"),
    name: "Breadcrumbs",
    url: "/docs/components/core/breadcrumbs",
    section: "core"
  },
"components/examples/core/breadcrumbs/with-icon": {
    Component: dynamic(() => import("@/components/examples/core/breadcrumbs/with-icon")),
    module: () => import("@/components/examples/core/breadcrumbs/with-icon"),
    name: "Breadcrumbs",
    url: "/docs/components/core/breadcrumbs",
    section: "core"
  },
"components/examples/core/button/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/button/basic.demo")),
    module: () => import("@/components/examples/core/button/basic.demo"),
    name: "Button",
    url: "/docs/components/core/button",
    section: "core"
  },
"components/examples/core/calendar/basic": {
    Component: dynamic(() => import("@/components/examples/core/calendar/basic")),
    module: () => import("@/components/examples/core/calendar/basic"),
    name: "Calendar",
    url: "/docs/components/core/calendar",
    section: "core"
  },
"components/examples/core/calendar/custom-week-format": {
    Component: dynamic(() => import("@/components/examples/core/calendar/custom-week-format")),
    module: () => import("@/components/examples/core/calendar/custom-week-format"),
    name: "Calendar",
    url: "/docs/components/core/calendar",
    section: "core"
  },
"components/examples/core/calendar/disable-dates": {
    Component: dynamic(() => import("@/components/examples/core/calendar/disable-dates")),
    module: () => import("@/components/examples/core/calendar/disable-dates"),
    name: "Calendar",
    url: "/docs/components/core/calendar",
    section: "core"
  },
"components/examples/core/calendar/select-mode": {
    Component: dynamic(() => import("@/components/examples/core/calendar/select-mode")),
    module: () => import("@/components/examples/core/calendar/select-mode"),
    name: "Calendar",
    url: "/docs/components/core/calendar",
    section: "core"
  },
"components/examples/core/calendar/with-error": {
    Component: dynamic(() => import("@/components/examples/core/calendar/with-error")),
    module: () => import("@/components/examples/core/calendar/with-error"),
    name: "Calendar",
    url: "/docs/components/core/calendar",
    section: "core"
  },
"components/examples/core/card/actionable": {
    Component: dynamic(() => import("@/components/examples/core/card/actionable")),
    module: () => import("@/components/examples/core/card/actionable"),
    name: "Card",
    url: "/docs/components/core/card",
    section: "core"
  },
"components/examples/core/card/basic": {
    Component: dynamic(() => import("@/components/examples/core/card/basic")),
    module: () => import("@/components/examples/core/card/basic"),
    name: "Card",
    url: "/docs/components/core/card",
    section: "core"
  },
"components/examples/core/card/interactive": {
    Component: dynamic(() => import("@/components/examples/core/card/interactive")),
    module: () => import("@/components/examples/core/card/interactive"),
    name: "Card",
    url: "/docs/components/core/card",
    section: "core"
  },
"components/examples/core/checkbox/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/checkbox/basic.demo")),
    module: () => import("@/components/examples/core/checkbox/basic.demo"),
    name: "Checkbox",
    url: "/docs/components/core/checkbox",
    section: "core"
  },
"components/examples/core/checkbox/controlled": {
    Component: dynamic(() => import("@/components/examples/core/checkbox/controlled")),
    module: () => import("@/components/examples/core/checkbox/controlled"),
    name: "Checkbox",
    url: "/docs/components/core/checkbox",
    section: "core"
  },
"components/examples/core/checkbox/custom-child": {
    Component: dynamic(() => import("@/components/examples/core/checkbox/custom-child")),
    module: () => import("@/components/examples/core/checkbox/custom-child"),
    name: "Checkbox",
    url: "/docs/components/core/checkbox",
    section: "core"
  },
"components/examples/core/checkbox-group/basic": {
    Component: dynamic(() => import("@/components/examples/core/checkbox-group/basic")),
    module: () => import("@/components/examples/core/checkbox-group/basic"),
    name: "Checkbox Group",
    url: "/docs/components/core/checkbox-group",
    section: "core"
  },
"components/examples/core/checkbox-group/controlled": {
    Component: dynamic(() => import("@/components/examples/core/checkbox-group/controlled")),
    module: () => import("@/components/examples/core/checkbox-group/controlled"),
    name: "Checkbox Group",
    url: "/docs/components/core/checkbox-group",
    section: "core"
  },
"components/examples/core/checkbox-group/disabled": {
    Component: dynamic(() => import("@/components/examples/core/checkbox-group/disabled")),
    module: () => import("@/components/examples/core/checkbox-group/disabled"),
    name: "Checkbox Group",
    url: "/docs/components/core/checkbox-group",
    section: "core"
  },
"components/examples/core/checkbox-group/indeterminate": {
    Component: dynamic(() => import("@/components/examples/core/checkbox-group/indeterminate")),
    module: () => import("@/components/examples/core/checkbox-group/indeterminate"),
    name: "Checkbox Group",
    url: "/docs/components/core/checkbox-group",
    section: "core"
  },
"components/examples/core/checkbox-group/validate": {
    Component: dynamic(() => import("@/components/examples/core/checkbox-group/validate")),
    module: () => import("@/components/examples/core/checkbox-group/validate"),
    name: "Checkbox Group",
    url: "/docs/components/core/checkbox-group",
    section: "core"
  },
"components/examples/core/color-area/basic": {
    Component: dynamic(() => import("@/components/examples/core/color-area/basic")),
    module: () => import("@/components/examples/core/color-area/basic"),
    name: "Color Area",
    url: "/docs/components/core/color-area",
    section: "core"
  },
"components/examples/core/color-field/basic": {
    Component: dynamic(() => import("@/components/examples/core/color-field/basic")),
    module: () => import("@/components/examples/core/color-field/basic"),
    name: "Color Field",
    url: "/docs/components/core/color-field",
    section: "core"
  },
"components/examples/core/color-field/controlled": {
    Component: dynamic(() => import("@/components/examples/core/color-field/controlled")),
    module: () => import("@/components/examples/core/color-field/controlled"),
    name: "Color Field",
    url: "/docs/components/core/color-field",
    section: "core"
  },
"components/examples/core/color-field/with-picker": {
    Component: dynamic(() => import("@/components/examples/core/color-field/with-picker")),
    module: () => import("@/components/examples/core/color-field/with-picker"),
    name: "Color Field",
    url: "/docs/components/core/color-field",
    section: "core"
  },
"components/examples/core/color-picker/basic": {
    Component: dynamic(() => import("@/components/examples/core/color-picker/basic")),
    module: () => import("@/components/examples/core/color-picker/basic"),
    name: "Color Picker",
    url: "/docs/components/core/color-picker",
    section: "core"
  },
"components/examples/core/color-picker/custom-build": {
    Component: dynamic(() => import("@/components/examples/core/color-picker/custom-build")),
    module: () => import("@/components/examples/core/color-picker/custom-build"),
    name: "Color Picker",
    url: "/docs/components/core/color-picker",
    section: "core"
  },
"components/examples/core/color-slider/basic": {
    Component: dynamic(() => import("@/components/examples/core/color-slider/basic")),
    module: () => import("@/components/examples/core/color-slider/basic"),
    name: "Color Slider",
    url: "/docs/components/core/color-slider",
    section: "core"
  },
"components/examples/core/color-swatch/basic": {
    Component: dynamic(() => import("@/components/examples/core/color-swatch/basic")),
    module: () => import("@/components/examples/core/color-swatch/basic"),
    name: "Color Swatch",
    url: "/docs/components/core/color-swatch",
    section: "core"
  },
"components/examples/core/color-swatch-picker/basic": {
    Component: dynamic(() => import("@/components/examples/core/color-swatch-picker/basic")),
    module: () => import("@/components/examples/core/color-swatch-picker/basic"),
    name: "Color Swatch Picker",
    url: "/docs/components/core/color-swatch-picker",
    section: "core"
  },
"components/examples/core/color-wheel/basic": {
    Component: dynamic(() => import("@/components/examples/core/color-wheel/basic")),
    module: () => import("@/components/examples/core/color-wheel/basic"),
    name: "Color Wheel",
    url: "/docs/components/core/color-wheel",
    section: "core"
  },
"components/examples/core/combobox/basic": {
    Component: dynamic(() => import("@/components/examples/core/combobox/basic")),
    module: () => import("@/components/examples/core/combobox/basic"),
    name: "Combobox",
    url: "/docs/components/core/combobox",
    section: "core"
  },
"components/examples/core/combobox/grouped": {
    Component: dynamic(() => import("@/components/examples/core/combobox/grouped")),
    module: () => import("@/components/examples/core/combobox/grouped"),
    name: "Combobox",
    url: "/docs/components/core/combobox",
    section: "core"
  },
"components/examples/core/command/basic": {
    Component: dynamic(() => import("@/components/examples/core/command/basic")),
    module: () => import("@/components/examples/core/command/basic"),
    name: "Command",
    url: "/docs/components/core/command",
    section: "core"
  },
"components/examples/core/command/with-modal": {
    Component: dynamic(() => import("@/components/examples/core/command/with-modal")),
    module: () => import("@/components/examples/core/command/with-modal"),
    name: "Command",
    url: "/docs/components/core/command",
    section: "core"
  },
"components/examples/core/context-menu/basic": {
    Component: dynamic(() => import("@/components/examples/core/context-menu/basic")),
    module: () => import("@/components/examples/core/context-menu/basic"),
    name: "Context Menu",
    url: "/docs/components/core/context-menu",
    section: "core"
  },
"components/examples/core/context-menu/with-card": {
    Component: dynamic(() => import("@/components/examples/core/context-menu/with-card")),
    module: () => import("@/components/examples/core/context-menu/with-card"),
    name: "Context Menu",
    url: "/docs/components/core/context-menu",
    section: "core"
  },
"components/examples/core/date-field/basic": {
    Component: dynamic(() => import("@/components/examples/core/date-field/basic")),
    module: () => import("@/components/examples/core/date-field/basic"),
    name: "Date Field",
    url: "/docs/components/core/date-field",
    section: "core"
  },
"components/examples/core/date-field/date-time": {
    Component: dynamic(() => import("@/components/examples/core/date-field/date-time")),
    module: () => import("@/components/examples/core/date-field/date-time"),
    name: "Date Field",
    url: "/docs/components/core/date-field",
    section: "core"
  },
"components/examples/core/date-field/readonly-disabled": {
    Component: dynamic(() => import("@/components/examples/core/date-field/readonly-disabled")),
    module: () => import("@/components/examples/core/date-field/readonly-disabled"),
    name: "Date Field",
    url: "/docs/components/core/date-field",
    section: "core"
  },
"components/examples/core/date-field/start-end-content": {
    Component: dynamic(() => import("@/components/examples/core/date-field/start-end-content")),
    module: () => import("@/components/examples/core/date-field/start-end-content"),
    name: "Date Field",
    url: "/docs/components/core/date-field",
    section: "core"
  },
"components/examples/core/date-field/validated": {
    Component: dynamic(() => import("@/components/examples/core/date-field/validated")),
    module: () => import("@/components/examples/core/date-field/validated"),
    name: "Date Field",
    url: "/docs/components/core/date-field",
    section: "core"
  },
"components/examples/core/date-picker/basic": {
    Component: dynamic(() => import("@/components/examples/core/date-picker/basic")),
    module: () => import("@/components/examples/core/date-picker/basic"),
    name: "Date Picker",
    url: "/docs/components/core/date-picker",
    section: "core"
  },
"components/examples/core/date-picker/date-time": {
    Component: dynamic(() => import("@/components/examples/core/date-picker/date-time")),
    module: () => import("@/components/examples/core/date-picker/date-time"),
    name: "Date Picker",
    url: "/docs/components/core/date-picker",
    section: "core"
  },
"components/examples/core/date-range-picker/basic": {
    Component: dynamic(() => import("@/components/examples/core/date-range-picker/basic")),
    module: () => import("@/components/examples/core/date-range-picker/basic"),
    name: "Date Range Picker",
    url: "/docs/components/core/date-range-picker",
    section: "core"
  },
"components/examples/core/date-range-picker/readonly-disabled": {
    Component: dynamic(() => import("@/components/examples/core/date-range-picker/readonly-disabled")),
    module: () => import("@/components/examples/core/date-range-picker/readonly-disabled"),
    name: "Date Range Picker",
    url: "/docs/components/core/date-range-picker",
    section: "core"
  },
"components/examples/core/date-range-picker/validated": {
    Component: dynamic(() => import("@/components/examples/core/date-range-picker/validated")),
    module: () => import("@/components/examples/core/date-range-picker/validated"),
    name: "Date Range Picker",
    url: "/docs/components/core/date-range-picker",
    section: "core"
  },
"components/examples/core/date-range-picker/visible-duration": {
    Component: dynamic(() => import("@/components/examples/core/date-range-picker/visible-duration")),
    module: () => import("@/components/examples/core/date-range-picker/visible-duration"),
    name: "Date Range Picker",
    url: "/docs/components/core/date-range-picker",
    section: "core"
  },
"components/examples/core/description-list/basic": {
    Component: dynamic(() => import("@/components/examples/core/description-list/basic")),
    module: () => import("@/components/examples/core/description-list/basic"),
    name: "Description List",
    url: "/docs/components/core/description-list",
    section: "core"
  },
"components/examples/core/description-list/with-card": {
    Component: dynamic(() => import("@/components/examples/core/description-list/with-card")),
    module: () => import("@/components/examples/core/description-list/with-card"),
    name: "Description List",
    url: "/docs/components/core/description-list",
    section: "core"
  },
"components/examples/core/dialog/basic": {
    Component: dynamic(() => import("@/components/examples/core/dialog/basic")),
    module: () => import("@/components/examples/core/dialog/basic"),
    name: "Dialog",
    url: "/docs/components/core/dialog",
    section: "core"
  },
"components/examples/core/dialog/sizes": {
    Component: dynamic(() => import("@/components/examples/core/dialog/sizes")),
    module: () => import("@/components/examples/core/dialog/sizes"),
    name: "Dialog",
    url: "/docs/components/core/dialog",
    section: "core"
  },
"components/examples/core/disclosure/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/disclosure/basic.demo")),
    module: () => import("@/components/examples/core/disclosure/basic.demo"),
    name: "Disclosure",
    url: "/docs/components/core/disclosure",
    section: "core"
  },
"components/examples/core/disclosure/card": {
    Component: dynamic(() => import("@/components/examples/core/disclosure/card")),
    module: () => import("@/components/examples/core/disclosure/card"),
    name: "Disclosure",
    url: "/docs/components/core/disclosure",
    section: "core"
  },
"components/examples/core/dock/basic": {
    Component: dynamic(() => import("@/components/examples/core/dock/basic")),
    module: () => import("@/components/examples/core/dock/basic"),
    name: "Dock",
    url: "/docs/components/core/dock",
    section: "core"
  },
"components/examples/core/dock/float": {
    Component: dynamic(() => import("@/components/examples/core/dock/float")),
    module: () => import("@/components/examples/core/dock/float"),
    name: "Dock",
    url: "/docs/components/core/dock",
    section: "core"
  },
"components/examples/core/dock/positions": {
    Component: dynamic(() => import("@/components/examples/core/dock/positions")),
    module: () => import("@/components/examples/core/dock/positions"),
    name: "Dock",
    url: "/docs/components/core/dock",
    section: "core"
  },
"components/examples/core/dock/sticky": {
    Component: dynamic(() => import("@/components/examples/core/dock/sticky")),
    module: () => import("@/components/examples/core/dock/sticky"),
    name: "Dock",
    url: "/docs/components/core/dock",
    section: "core"
  },
"components/examples/core/drag-and-drop/accepted-types": {
    Component: dynamic(() => import("@/components/examples/core/drag-and-drop/accepted-types")),
    module: () => import("@/components/examples/core/drag-and-drop/accepted-types"),
    name: "Drag And Drop",
    url: "/docs/components/core/drag-and-drop",
    section: "core"
  },
"components/examples/core/drag-and-drop/basic": {
    Component: dynamic(() => import("@/components/examples/core/drag-and-drop/basic")),
    module: () => import("@/components/examples/core/drag-and-drop/basic"),
    name: "Drag And Drop",
    url: "/docs/components/core/drag-and-drop",
    section: "core"
  },
"components/examples/core/drag-and-drop/controlled": {
    Component: dynamic(() => import("@/components/examples/core/drag-and-drop/controlled")),
    module: () => import("@/components/examples/core/drag-and-drop/controlled"),
    name: "Drag And Drop",
    url: "/docs/components/core/drag-and-drop",
    section: "core"
  },
"components/examples/core/drag-and-drop/custom-build": {
    Component: dynamic(() => import("@/components/examples/core/drag-and-drop/custom-build")),
    module: () => import("@/components/examples/core/drag-and-drop/custom-build"),
    name: "Drag And Drop",
    url: "/docs/components/core/drag-and-drop",
    section: "core"
  },
"components/examples/core/drop-zone/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/drop-zone/basic.demo")),
    module: () => import("@/components/examples/core/drop-zone/basic.demo"),
    name: "Drop Zone",
    url: "/docs/components/core/drop-zone",
    section: "core"
  },
"components/examples/core/dropdown-menu/basic": {
    Component: dynamic(() => import("@/components/examples/core/dropdown-menu/basic")),
    module: () => import("@/components/examples/core/dropdown-menu/basic"),
    name: "Dropdown Menu",
    url: "/docs/components/core/dropdown-menu",
    section: "core"
  },
"components/examples/core/dropdown-menu/custom-trigger": {
    Component: dynamic(() => import("@/components/examples/core/dropdown-menu/custom-trigger")),
    module: () => import("@/components/examples/core/dropdown-menu/custom-trigger"),
    name: "Dropdown Menu",
    url: "/docs/components/core/dropdown-menu",
    section: "core"
  },
"components/examples/core/dropdown-menu/multiple-selection": {
    Component: dynamic(() => import("@/components/examples/core/dropdown-menu/multiple-selection")),
    module: () => import("@/components/examples/core/dropdown-menu/multiple-selection"),
    name: "Dropdown Menu",
    url: "/docs/components/core/dropdown-menu",
    section: "core"
  },
"components/examples/core/dropdown-menu/single-selection": {
    Component: dynamic(() => import("@/components/examples/core/dropdown-menu/single-selection")),
    module: () => import("@/components/examples/core/dropdown-menu/single-selection"),
    name: "Dropdown Menu",
    url: "/docs/components/core/dropdown-menu",
    section: "core"
  },
"components/examples/core/file-trigger/accept-directory": {
    Component: dynamic(() => import("@/components/examples/core/file-trigger/accept-directory")),
    module: () => import("@/components/examples/core/file-trigger/accept-directory"),
    name: "File Trigger",
    url: "/docs/components/core/file-trigger",
    section: "core"
  },
"components/examples/core/file-trigger/accepted-type": {
    Component: dynamic(() => import("@/components/examples/core/file-trigger/accepted-type")),
    module: () => import("@/components/examples/core/file-trigger/accepted-type"),
    name: "File Trigger",
    url: "/docs/components/core/file-trigger",
    section: "core"
  },
"components/examples/core/file-trigger/basic": {
    Component: dynamic(() => import("@/components/examples/core/file-trigger/basic")),
    module: () => import("@/components/examples/core/file-trigger/basic"),
    name: "File Trigger",
    url: "/docs/components/core/file-trigger",
    section: "core"
  },
"components/examples/core/file-trigger/loading": {
    Component: dynamic(() => import("@/components/examples/core/file-trigger/loading")),
    module: () => import("@/components/examples/core/file-trigger/loading"),
    name: "File Trigger",
    url: "/docs/components/core/file-trigger",
    section: "core"
  },
"components/examples/core/file-trigger/media-capture": {
    Component: dynamic(() => import("@/components/examples/core/file-trigger/media-capture")),
    module: () => import("@/components/examples/core/file-trigger/media-capture"),
    name: "File Trigger",
    url: "/docs/components/core/file-trigger",
    section: "core"
  },
"components/examples/core/file-trigger/multiple": {
    Component: dynamic(() => import("@/components/examples/core/file-trigger/multiple")),
    module: () => import("@/components/examples/core/file-trigger/multiple"),
    name: "File Trigger",
    url: "/docs/components/core/file-trigger",
    section: "core"
  },
"components/examples/core/form/basic": {
    Component: dynamic(() => import("@/components/examples/core/form/basic")),
    module: () => import("@/components/examples/core/form/basic"),
    name: "Form",
    url: "/docs/components/core/form",
    section: "core"
  },
"components/examples/core/form/grid": {
    Component: dynamic(() => import("@/components/examples/core/form/grid")),
    module: () => import("@/components/examples/core/form/grid"),
    name: "Form",
    url: "/docs/components/core/form",
    section: "core"
  },
"components/examples/core/grid-list/basic": {
    Component: dynamic(() => import("@/components/examples/core/grid-list/basic")),
    module: () => import("@/components/examples/core/grid-list/basic"),
    name: "Grid List",
    url: "/docs/components/core/grid-list",
    section: "core"
  },
"components/examples/core/grid-list/disabled": {
    Component: dynamic(() => import("@/components/examples/core/grid-list/disabled")),
    module: () => import("@/components/examples/core/grid-list/disabled"),
    name: "Grid List",
    url: "/docs/components/core/grid-list",
    section: "core"
  },
"components/examples/core/grid-list/drag-and-drop": {
    Component: dynamic(() => import("@/components/examples/core/grid-list/drag-and-drop")),
    module: () => import("@/components/examples/core/grid-list/drag-and-drop"),
    name: "Grid List",
    url: "/docs/components/core/grid-list",
    section: "core"
  },
"components/examples/core/grid-list/empty": {
    Component: dynamic(() => import("@/components/examples/core/grid-list/empty")),
    module: () => import("@/components/examples/core/grid-list/empty"),
    name: "Grid List",
    url: "/docs/components/core/grid-list",
    section: "core"
  },
"components/examples/core/grid-list/infinite-scroll": {
    Component: dynamic(() => import("@/components/examples/core/grid-list/infinite-scroll")),
    module: () => import("@/components/examples/core/grid-list/infinite-scroll"),
    name: "Grid List",
    url: "/docs/components/core/grid-list",
    section: "core"
  },
"components/examples/core/grid-list/multiple": {
    Component: dynamic(() => import("@/components/examples/core/grid-list/multiple")),
    module: () => import("@/components/examples/core/grid-list/multiple"),
    name: "Grid List",
    url: "/docs/components/core/grid-list",
    section: "core"
  },
"components/examples/core/heading/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/heading/basic.demo")),
    module: () => import("@/components/examples/core/heading/basic.demo"),
    name: "Heading",
    url: "/docs/components/core/heading",
    section: "core"
  },
"components/examples/core/heading/sizes": {
    Component: dynamic(() => import("@/components/examples/core/heading/sizes")),
    module: () => import("@/components/examples/core/heading/sizes"),
    name: "Heading",
    url: "/docs/components/core/heading",
    section: "core"
  },
"components/examples/core/input/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/input/basic.demo")),
    module: () => import("@/components/examples/core/input/basic.demo"),
    name: "Input",
    url: "/docs/components/core/input",
    section: "core"
  },
"components/examples/core/input/controlled": {
    Component: dynamic(() => import("@/components/examples/core/input/controlled")),
    module: () => import("@/components/examples/core/input/controlled"),
    name: "Input",
    url: "/docs/components/core/input",
    section: "core"
  },
"components/examples/core/input/error": {
    Component: dynamic(() => import("@/components/examples/core/input/error")),
    module: () => import("@/components/examples/core/input/error"),
    name: "Input",
    url: "/docs/components/core/input",
    section: "core"
  },
"components/examples/core/input/label-and-description": {
    Component: dynamic(() => import("@/components/examples/core/input/label-and-description")),
    module: () => import("@/components/examples/core/input/label-and-description"),
    name: "Input",
    url: "/docs/components/core/input",
    section: "core"
  },
"components/examples/core/input/loading": {
    Component: dynamic(() => import("@/components/examples/core/input/loading")),
    module: () => import("@/components/examples/core/input/loading"),
    name: "Input",
    url: "/docs/components/core/input",
    section: "core"
  },
"components/examples/core/input/password": {
    Component: dynamic(() => import("@/components/examples/core/input/password")),
    module: () => import("@/components/examples/core/input/password"),
    name: "Input",
    url: "/docs/components/core/input",
    section: "core"
  },
"components/examples/core/input/start-end-content": {
    Component: dynamic(() => import("@/components/examples/core/input/start-end-content")),
    module: () => import("@/components/examples/core/input/start-end-content"),
    name: "Input",
    url: "/docs/components/core/input",
    section: "core"
  },
"components/examples/core/input-otp/basic": {
    Component: dynamic(() => import("@/components/examples/core/input-otp/basic")),
    module: () => import("@/components/examples/core/input-otp/basic"),
    name: "Input Otp",
    url: "/docs/components/core/input-otp",
    section: "core"
  },
"components/examples/core/input-otp/separated": {
    Component: dynamic(() => import("@/components/examples/core/input-otp/separated")),
    module: () => import("@/components/examples/core/input-otp/separated"),
    name: "Input Otp",
    url: "/docs/components/core/input-otp",
    section: "core"
  },
"components/examples/core/link/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/link/basic.demo")),
    module: () => import("@/components/examples/core/link/basic.demo"),
    name: "Link",
    url: "/docs/components/core/link",
    section: "core"
  },
"components/examples/core/list-box/basic": {
    Component: dynamic(() => import("@/components/examples/core/list-box/basic")),
    module: () => import("@/components/examples/core/list-box/basic"),
    name: "List Box",
    url: "/docs/components/core/list-box",
    section: "core"
  },
"components/examples/core/list-box/drag-and-drop": {
    Component: dynamic(() => import("@/components/examples/core/list-box/drag-and-drop")),
    module: () => import("@/components/examples/core/list-box/drag-and-drop"),
    name: "List Box",
    url: "/docs/components/core/list-box",
    section: "core"
  },
"components/examples/core/list-box/multiple": {
    Component: dynamic(() => import("@/components/examples/core/list-box/multiple")),
    module: () => import("@/components/examples/core/list-box/multiple"),
    name: "List Box",
    url: "/docs/components/core/list-box",
    section: "core"
  },
"components/examples/core/loader/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/loader/basic.demo")),
    module: () => import("@/components/examples/core/loader/basic.demo"),
    name: "Loader",
    url: "/docs/components/core/loader",
    section: "core"
  },
"components/examples/core/loader/colors": {
    Component: dynamic(() => import("@/components/examples/core/loader/colors")),
    module: () => import("@/components/examples/core/loader/colors"),
    name: "Loader",
    url: "/docs/components/core/loader",
    section: "core"
  },
"components/examples/core/loader/sizes": {
    Component: dynamic(() => import("@/components/examples/core/loader/sizes")),
    module: () => import("@/components/examples/core/loader/sizes"),
    name: "Loader",
    url: "/docs/components/core/loader",
    section: "core"
  },
"components/examples/core/loader/types": {
    Component: dynamic(() => import("@/components/examples/core/loader/types")),
    module: () => import("@/components/examples/core/loader/types"),
    name: "Loader",
    url: "/docs/components/core/loader",
    section: "core"
  },
"components/examples/core/marquee/basic": {
    Component: dynamic(() => import("@/components/examples/core/marquee/basic")),
    module: () => import("@/components/examples/core/marquee/basic"),
    name: "Marquee",
    url: "/docs/components/core/marquee",
    section: "core"
  },
"components/examples/core/marquee/news": {
    Component: dynamic(() => import("@/components/examples/core/marquee/news")),
    module: () => import("@/components/examples/core/marquee/news"),
    name: "Marquee",
    url: "/docs/components/core/marquee",
    section: "core"
  },
"components/examples/core/modal/basic": {
    Component: dynamic(() => import("@/components/examples/core/modal/basic")),
    module: () => import("@/components/examples/core/modal/basic"),
    name: "Modal",
    url: "/docs/components/core/modal",
    section: "core"
  },
"components/examples/core/modal/sizes": {
    Component: dynamic(() => import("@/components/examples/core/modal/sizes")),
    module: () => import("@/components/examples/core/modal/sizes"),
    name: "Modal",
    url: "/docs/components/core/modal",
    section: "core"
  },
"components/examples/core/multiple-select/basic": {
    Component: dynamic(() => import("@/components/examples/core/multiple-select/basic")),
    module: () => import("@/components/examples/core/multiple-select/basic"),
    name: "Multiple Select",
    url: "/docs/components/core/multiple-select",
    section: "core"
  },
"components/examples/core/number-field/basic": {
    Component: dynamic(() => import("@/components/examples/core/number-field/basic")),
    module: () => import("@/components/examples/core/number-field/basic"),
    name: "Number Field",
    url: "/docs/components/core/number-field",
    section: "core"
  },
"components/examples/core/number-field/disabled": {
    Component: dynamic(() => import("@/components/examples/core/number-field/disabled")),
    module: () => import("@/components/examples/core/number-field/disabled"),
    name: "Number Field",
    url: "/docs/components/core/number-field",
    section: "core"
  },
"components/examples/core/number-field/format-options": {
    Component: dynamic(() => import("@/components/examples/core/number-field/format-options")),
    module: () => import("@/components/examples/core/number-field/format-options"),
    name: "Number Field",
    url: "/docs/components/core/number-field",
    section: "core"
  },
"components/examples/core/number-field/indicator": {
    Component: dynamic(() => import("@/components/examples/core/number-field/indicator")),
    module: () => import("@/components/examples/core/number-field/indicator"),
    name: "Number Field",
    url: "/docs/components/core/number-field",
    section: "core"
  },
"components/examples/core/number-field/with-form": {
    Component: dynamic(() => import("@/components/examples/core/number-field/with-form")),
    module: () => import("@/components/examples/core/number-field/with-form"),
    name: "Number Field",
    url: "/docs/components/core/number-field",
    section: "core"
  },
"components/examples/core/pagination/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/pagination/basic.demo")),
    module: () => import("@/components/examples/core/pagination/basic.demo"),
    name: "Pagination",
    url: "/docs/components/core/pagination",
    section: "core"
  },
"components/examples/core/pagination/elipsis": {
    Component: dynamic(() => import("@/components/examples/core/pagination/elipsis")),
    module: () => import("@/components/examples/core/pagination/elipsis"),
    name: "Pagination",
    url: "/docs/components/core/pagination",
    section: "core"
  },
"components/examples/core/pagination/tones.demo": {
    Component: dynamic(() => import("@/components/examples/core/pagination/tones.demo")),
    module: () => import("@/components/examples/core/pagination/tones.demo"),
    name: "Pagination",
    url: "/docs/components/core/pagination",
    section: "core"
  },
"components/examples/core/pagination/tones": {
    Component: dynamic(() => import("@/components/examples/core/pagination/tones")),
    module: () => import("@/components/examples/core/pagination/tones"),
    name: "Pagination",
    url: "/docs/components/core/pagination",
    section: "core"
  },
"components/examples/core/percentage/basic": {
    Component: dynamic(() => import("@/components/examples/core/percentage/basic")),
    module: () => import("@/components/examples/core/percentage/basic"),
    name: "Percentage",
    url: "/docs/components/core/percentage",
    section: "core"
  },
"components/examples/core/percentage/format-options": {
    Component: dynamic(() => import("@/components/examples/core/percentage/format-options")),
    module: () => import("@/components/examples/core/percentage/format-options"),
    name: "Percentage",
    url: "/docs/components/core/percentage",
    section: "core"
  },
"components/examples/core/percentage/value-label": {
    Component: dynamic(() => import("@/components/examples/core/percentage/value-label")),
    module: () => import("@/components/examples/core/percentage/value-label"),
    name: "Percentage",
    url: "/docs/components/core/percentage",
    section: "core"
  },
"components/examples/core/popover/basic": {
    Component: dynamic(() => import("@/components/examples/core/popover/basic")),
    module: () => import("@/components/examples/core/popover/basic"),
    name: "Popover",
    url: "/docs/components/core/popover",
    section: "core"
  },
"components/examples/core/popover/position": {
    Component: dynamic(() => import("@/components/examples/core/popover/position")),
    module: () => import("@/components/examples/core/popover/position"),
    name: "Popover",
    url: "/docs/components/core/popover",
    section: "core"
  },
"components/examples/core/popover/with-form": {
    Component: dynamic(() => import("@/components/examples/core/popover/with-form")),
    module: () => import("@/components/examples/core/popover/with-form"),
    name: "Popover",
    url: "/docs/components/core/popover",
    section: "core"
  },
"components/examples/core/progress/basic": {
    Component: dynamic(() => import("@/components/examples/core/progress/basic")),
    module: () => import("@/components/examples/core/progress/basic"),
    name: "Progress",
    url: "/docs/components/core/progress",
    section: "core"
  },
"components/examples/core/progress/custom-label-value": {
    Component: dynamic(() => import("@/components/examples/core/progress/custom-label-value")),
    module: () => import("@/components/examples/core/progress/custom-label-value"),
    name: "Progress",
    url: "/docs/components/core/progress",
    section: "core"
  },
"components/examples/core/progress/decimal": {
    Component: dynamic(() => import("@/components/examples/core/progress/decimal")),
    module: () => import("@/components/examples/core/progress/decimal"),
    name: "Progress",
    url: "/docs/components/core/progress",
    section: "core"
  },
"components/examples/core/radio-group/basic": {
    Component: dynamic(() => import("@/components/examples/core/radio-group/basic")),
    module: () => import("@/components/examples/core/radio-group/basic"),
    name: "Radio Group",
    url: "/docs/components/core/radio-group",
    section: "core"
  },
"components/examples/core/radio-group/controlled": {
    Component: dynamic(() => import("@/components/examples/core/radio-group/controlled")),
    module: () => import("@/components/examples/core/radio-group/controlled"),
    name: "Radio Group",
    url: "/docs/components/core/radio-group",
    section: "core"
  },
"components/examples/core/radio-group/validated": {
    Component: dynamic(() => import("@/components/examples/core/radio-group/validated")),
    module: () => import("@/components/examples/core/radio-group/validated"),
    name: "Radio Group",
    url: "/docs/components/core/radio-group",
    section: "core"
  },
"components/examples/core/range-calendar/basic": {
    Component: dynamic(() => import("@/components/examples/core/range-calendar/basic")),
    module: () => import("@/components/examples/core/range-calendar/basic"),
    name: "Range Calendar",
    url: "/docs/components/core/range-calendar",
    section: "core"
  },
"components/examples/core/range-calendar/prefilled": {
    Component: dynamic(() => import("@/components/examples/core/range-calendar/prefilled")),
    module: () => import("@/components/examples/core/range-calendar/prefilled"),
    name: "Range Calendar",
    url: "/docs/components/core/range-calendar",
    section: "core"
  },
"components/examples/core/range-calendar/visible-duration": {
    Component: dynamic(() => import("@/components/examples/core/range-calendar/visible-duration")),
    module: () => import("@/components/examples/core/range-calendar/visible-duration"),
    name: "Range Calendar",
    url: "/docs/components/core/range-calendar",
    section: "core"
  },
"components/examples/core/search-bar/basic": {
    Component: dynamic(() => import("@/components/examples/core/search-bar/basic")),
    module: () => import("@/components/examples/core/search-bar/basic"),
    name: "Search Bar",
    url: "/docs/components/core/search-bar",
    section: "core"
  },
"components/examples/core/search-bar/items": {
    Component: dynamic(() => import("@/components/examples/core/search-bar/items")),
    module: () => import("@/components/examples/core/search-bar/items"),
    name: "Search Bar",
    url: "/docs/components/core/search-bar",
    section: "core"
  },
"components/examples/core/search-bar/with-form": {
    Component: dynamic(() => import("@/components/examples/core/search-bar/with-form")),
    module: () => import("@/components/examples/core/search-bar/with-form"),
    name: "Search Bar",
    url: "/docs/components/core/search-bar",
    section: "core"
  },
"components/examples/core/select/basic": {
    Component: dynamic(() => import("@/components/examples/core/select/basic")),
    module: () => import("@/components/examples/core/select/basic"),
    name: "Select",
    url: "/docs/components/core/select",
    section: "core"
  },
"components/examples/core/select/grouped": {
    Component: dynamic(() => import("@/components/examples/core/select/grouped")),
    module: () => import("@/components/examples/core/select/grouped"),
    name: "Select",
    url: "/docs/components/core/select",
    section: "core"
  },
"components/examples/core/select/searchable": {
    Component: dynamic(() => import("@/components/examples/core/select/searchable")),
    module: () => import("@/components/examples/core/select/searchable"),
    name: "Select",
    url: "/docs/components/core/select",
    section: "core"
  },
"components/examples/core/selection-box/basic": {
    Component: dynamic(() => import("@/components/examples/core/selection-box/basic")),
    module: () => import("@/components/examples/core/selection-box/basic"),
    name: "Selection Box",
    url: "/docs/components/core/selection-box",
    section: "core"
  },
"components/examples/core/selection-box/custom-child": {
    Component: dynamic(() => import("@/components/examples/core/selection-box/custom-child")),
    module: () => import("@/components/examples/core/selection-box/custom-child"),
    name: "Selection Box",
    url: "/docs/components/core/selection-box",
    section: "core"
  },
"components/examples/core/selection-box/single": {
    Component: dynamic(() => import("@/components/examples/core/selection-box/single")),
    module: () => import("@/components/examples/core/selection-box/single"),
    name: "Selection Box",
    url: "/docs/components/core/selection-box",
    section: "core"
  },
"components/examples/core/separator/basic": {
    Component: dynamic(() => import("@/components/examples/core/separator/basic")),
    module: () => import("@/components/examples/core/separator/basic"),
    name: "Separator",
    url: "/docs/components/core/separator",
    section: "core"
  },
"components/examples/core/separator/with-text": {
    Component: dynamic(() => import("@/components/examples/core/separator/with-text")),
    module: () => import("@/components/examples/core/separator/with-text"),
    name: "Separator",
    url: "/docs/components/core/separator",
    section: "core"
  },
"components/examples/core/shortcut/basic": {
    Component: dynamic(() => import("@/components/examples/core/shortcut/basic")),
    module: () => import("@/components/examples/core/shortcut/basic"),
    name: "Shortcut",
    url: "/docs/components/core/shortcut",
    section: "core"
  },
"components/examples/core/show-more/basic": {
    Component: dynamic(() => import("@/components/examples/core/show-more/basic")),
    module: () => import("@/components/examples/core/show-more/basic"),
    name: "Show More",
    url: "/docs/components/core/show-more",
    section: "core"
  },
"components/examples/core/show-more/custom-style-label": {
    Component: dynamic(() => import("@/components/examples/core/show-more/custom-style-label")),
    module: () => import("@/components/examples/core/show-more/custom-style-label"),
    name: "Show More",
    url: "/docs/components/core/show-more",
    section: "core"
  },
"components/examples/core/show-more/serif-font": {
    Component: dynamic(() => import("@/components/examples/core/show-more/serif-font")),
    module: () => import("@/components/examples/core/show-more/serif-font"),
    name: "Show More",
    url: "/docs/components/core/show-more",
    section: "core"
  },
"components/examples/core/skeleton/basic": {
    Component: dynamic(() => import("@/components/examples/core/skeleton/basic")),
    module: () => import("@/components/examples/core/skeleton/basic"),
    name: "Skeleton",
    url: "/docs/components/core/skeleton",
    section: "core"
  },
"components/examples/core/skeleton/lines": {
    Component: dynamic(() => import("@/components/examples/core/skeleton/lines")),
    module: () => import("@/components/examples/core/skeleton/lines"),
    name: "Skeleton",
    url: "/docs/components/core/skeleton",
    section: "core"
  },
"components/examples/core/slider/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/slider/basic.demo")),
    module: () => import("@/components/examples/core/slider/basic.demo"),
    name: "Slider",
    url: "/docs/components/core/slider",
    section: "core"
  },
"components/examples/core/slider/range": {
    Component: dynamic(() => import("@/components/examples/core/slider/range")),
    module: () => import("@/components/examples/core/slider/range"),
    name: "Slider",
    url: "/docs/components/core/slider",
    section: "core"
  },
"components/examples/core/stepper/animated": {
    Component: dynamic(() => import("@/components/examples/core/stepper/animated")),
    module: () => import("@/components/examples/core/stepper/animated"),
    name: "Stepper",
    url: "/docs/components/core/stepper",
    section: "core"
  },
"components/examples/core/stepper/basic": {
    Component: dynamic(() => import("@/components/examples/core/stepper/basic")),
    module: () => import("@/components/examples/core/stepper/basic"),
    name: "Stepper",
    url: "/docs/components/core/stepper",
    section: "core"
  },
"components/examples/core/stepper/vertical": {
    Component: dynamic(() => import("@/components/examples/core/stepper/vertical")),
    module: () => import("@/components/examples/core/stepper/vertical"),
    name: "Stepper",
    url: "/docs/components/core/stepper",
    section: "core"
  },
"components/examples/core/switch/basic": {
    Component: dynamic(() => import("@/components/examples/core/switch/basic")),
    module: () => import("@/components/examples/core/switch/basic"),
    name: "Switch",
    url: "/docs/components/core/switch",
    section: "core"
  },
"components/examples/core/switch/with-card": {
    Component: dynamic(() => import("@/components/examples/core/switch/with-card")),
    module: () => import("@/components/examples/core/switch/with-card"),
    name: "Switch",
    url: "/docs/components/core/switch",
    section: "core"
  },
"components/examples/core/table/basic": {
    Component: dynamic(() => import("@/components/examples/core/table/basic")),
    module: () => import("@/components/examples/core/table/basic"),
    name: "Table",
    url: "/docs/components/core/table",
    section: "core"
  },
"components/examples/core/table/bulk-action": {
    Component: dynamic(() => import("@/components/examples/core/table/bulk-action")),
    module: () => import("@/components/examples/core/table/bulk-action"),
    name: "Table",
    url: "/docs/components/core/table",
    section: "core"
  },
"components/examples/core/table/dnd": {
    Component: dynamic(() => import("@/components/examples/core/table/dnd")),
    module: () => import("@/components/examples/core/table/dnd"),
    name: "Table",
    url: "/docs/components/core/table",
    section: "core"
  },
"components/examples/core/table/searched": {
    Component: dynamic(() => import("@/components/examples/core/table/searched")),
    module: () => import("@/components/examples/core/table/searched"),
    name: "Table",
    url: "/docs/components/core/table",
    section: "core"
  },
"components/examples/core/table/sorting": {
    Component: dynamic(() => import("@/components/examples/core/table/sorting")),
    module: () => import("@/components/examples/core/table/sorting"),
    name: "Table",
    url: "/docs/components/core/table",
    section: "core"
  },
"components/examples/core/tabs/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/tabs/basic.demo")),
    module: () => import("@/components/examples/core/tabs/basic.demo"),
    name: "Tabs",
    url: "/docs/components/core/tabs",
    section: "core"
  },
"components/examples/core/tag-group/basic": {
    Component: dynamic(() => import("@/components/examples/core/tag-group/basic")),
    module: () => import("@/components/examples/core/tag-group/basic"),
    name: "Tag Group",
    url: "/docs/components/core/tag-group",
    section: "core"
  },
"components/examples/core/tag-group/can-closed": {
    Component: dynamic(() => import("@/components/examples/core/tag-group/can-closed")),
    module: () => import("@/components/examples/core/tag-group/can-closed"),
    name: "Tag Group",
    url: "/docs/components/core/tag-group",
    section: "core"
  },
"components/examples/core/tag-group/controlled": {
    Component: dynamic(() => import("@/components/examples/core/tag-group/controlled")),
    module: () => import("@/components/examples/core/tag-group/controlled"),
    name: "Tag Group",
    url: "/docs/components/core/tag-group",
    section: "core"
  },
"components/examples/core/text-area/basic": {
    Component: dynamic(() => import("@/components/examples/core/text-area/basic")),
    module: () => import("@/components/examples/core/text-area/basic"),
    name: "Text Area",
    url: "/docs/components/core/text-area",
    section: "core"
  },
"components/examples/core/text-area/with-form": {
    Component: dynamic(() => import("@/components/examples/core/text-area/with-form")),
    module: () => import("@/components/examples/core/text-area/with-form"),
    name: "Text Area",
    url: "/docs/components/core/text-area",
    section: "core"
  },
"components/examples/core/text-field/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/text-field/basic.demo")),
    module: () => import("@/components/examples/core/text-field/basic.demo"),
    name: "Text Field",
    url: "/docs/components/core/text-field",
    section: "core"
  },
"components/examples/core/text-field/start-end-content": {
    Component: dynamic(() => import("@/components/examples/core/text-field/start-end-content")),
    module: () => import("@/components/examples/core/text-field/start-end-content"),
    name: "Text Field",
    url: "/docs/components/core/text-field",
    section: "core"
  },
"components/examples/core/text-field/with-form": {
    Component: dynamic(() => import("@/components/examples/core/text-field/with-form")),
    module: () => import("@/components/examples/core/text-field/with-form"),
    name: "Text Field",
    url: "/docs/components/core/text-field",
    section: "core"
  },
"components/examples/core/time-field/basic": {
    Component: dynamic(() => import("@/components/examples/core/time-field/basic")),
    module: () => import("@/components/examples/core/time-field/basic"),
    name: "Time Field",
    url: "/docs/components/core/time-field",
    section: "core"
  },
"components/examples/core/time-field/hour-cycle": {
    Component: dynamic(() => import("@/components/examples/core/time-field/hour-cycle")),
    module: () => import("@/components/examples/core/time-field/hour-cycle"),
    name: "Time Field",
    url: "/docs/components/core/time-field",
    section: "core"
  },
"components/examples/core/toast/actions": {
    Component: dynamic(() => import("@/components/examples/core/toast/actions")),
    module: () => import("@/components/examples/core/toast/actions"),
    name: "Toast",
    url: "/docs/components/core/toast",
    section: "core"
  },
"components/examples/core/toast/basic": {
    Component: dynamic(() => import("@/components/examples/core/toast/basic")),
    module: () => import("@/components/examples/core/toast/basic"),
    name: "Toast",
    url: "/docs/components/core/toast",
    section: "core"
  },
"components/examples/core/toast/positions": {
    Component: dynamic(() => import("@/components/examples/core/toast/positions")),
    module: () => import("@/components/examples/core/toast/positions"),
    name: "Toast",
    url: "/docs/components/core/toast",
    section: "core"
  },
"components/examples/core/toast/types": {
    Component: dynamic(() => import("@/components/examples/core/toast/types")),
    module: () => import("@/components/examples/core/toast/types"),
    name: "Toast",
    url: "/docs/components/core/toast",
    section: "core"
  },
"components/examples/core/toggle/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/toggle/basic.demo")),
    module: () => import("@/components/examples/core/toggle/basic.demo"),
    name: "Toggle",
    url: "/docs/components/core/toggle",
    section: "core"
  },
"components/examples/core/toggle-group/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/toggle-group/basic.demo")),
    module: () => import("@/components/examples/core/toggle-group/basic.demo"),
    name: "Toggle Group",
    url: "/docs/components/core/toggle-group",
    section: "core"
  },
"components/examples/core/toggle-group/controlled": {
    Component: dynamic(() => import("@/components/examples/core/toggle-group/controlled")),
    module: () => import("@/components/examples/core/toggle-group/controlled"),
    name: "Toggle Group",
    url: "/docs/components/core/toggle-group",
    section: "core"
  },
"components/examples/core/tooltip/basic.demo": {
    Component: dynamic(() => import("@/components/examples/core/tooltip/basic.demo")),
    module: () => import("@/components/examples/core/tooltip/basic.demo"),
    name: "Tooltip",
    url: "/docs/components/core/tooltip",
    section: "core"
  },
"components/examples/core/tooltip/without-arrow": {
    Component: dynamic(() => import("@/components/examples/core/tooltip/without-arrow")),
    module: () => import("@/components/examples/core/tooltip/without-arrow"),
    name: "Tooltip",
    url: "/docs/components/core/tooltip",
    section: "core"
  },
"components/examples/core/tree/basic": {
    Component: dynamic(() => import("@/components/examples/core/tree/basic")),
    module: () => import("@/components/examples/core/tree/basic"),
    name: "Tree",
    url: "/docs/components/core/tree",
    section: "core"
  },
"components/examples/core/tree/folder": {
    Component: dynamic(() => import("@/components/examples/core/tree/folder")),
    module: () => import("@/components/examples/core/tree/folder"),
    name: "Tree",
    url: "/docs/components/core/tree",
    section: "core"
  },
"components/examples/core/tree/multiple": {
    Component: dynamic(() => import("@/components/examples/core/tree/multiple")),
    module: () => import("@/components/examples/core/tree/multiple"),
    name: "Tree",
    url: "/docs/components/core/tree",
    section: "core"
  },
"components/examples/motion/animated-circle-indicator/activity": {
    Component: dynamic(() => import("@/components/examples/motion/animated-circle-indicator/activity")),
    module: () => import("@/components/examples/motion/animated-circle-indicator/activity"),
    name: "Animated Circle Indicator",
    url: "/docs/components/motion/animated-circle-indicator",
    section: "motion"
  },
"components/examples/motion/animated-circle-indicator/basic": {
    Component: dynamic(() => import("@/components/examples/motion/animated-circle-indicator/basic")),
    module: () => import("@/components/examples/motion/animated-circle-indicator/basic"),
    name: "Animated Circle Indicator",
    url: "/docs/components/motion/animated-circle-indicator",
    section: "motion"
  },
"components/examples/motion/animated-circle-indicator/notification": {
    Component: dynamic(() => import("@/components/examples/motion/animated-circle-indicator/notification")),
    module: () => import("@/components/examples/motion/animated-circle-indicator/notification"),
    name: "Animated Circle Indicator",
    url: "/docs/components/motion/animated-circle-indicator",
    section: "motion"
  },
"components/examples/motion/animated-circle-indicator/status": {
    Component: dynamic(() => import("@/components/examples/motion/animated-circle-indicator/status")),
    module: () => import("@/components/examples/motion/animated-circle-indicator/status"),
    name: "Animated Circle Indicator",
    url: "/docs/components/motion/animated-circle-indicator",
    section: "motion"
  },
"components/examples/motion/animated-dock/basic": {
    Component: dynamic(() => import("@/components/examples/motion/animated-dock/basic")),
    module: () => import("@/components/examples/motion/animated-dock/basic"),
    name: "Animated Dock",
    url: "/docs/components/motion/animated-dock",
    section: "motion"
  },
"components/examples/motion/animated-switch/basic": {
    Component: dynamic(() => import("@/components/examples/motion/animated-switch/basic")),
    module: () => import("@/components/examples/motion/animated-switch/basic"),
    name: "Animated Switch",
    url: "/docs/components/motion/animated-switch",
    section: "motion"
  },
"components/examples/motion/animated-switch/controlled": {
    Component: dynamic(() => import("@/components/examples/motion/animated-switch/controlled")),
    module: () => import("@/components/examples/motion/animated-switch/controlled"),
    name: "Animated Switch",
    url: "/docs/components/motion/animated-switch",
    section: "motion"
  },
"components/examples/motion/animated-switch/custom-icon": {
    Component: dynamic(() => import("@/components/examples/motion/animated-switch/custom-icon")),
    module: () => import("@/components/examples/motion/animated-switch/custom-icon"),
    name: "Animated Switch",
    url: "/docs/components/motion/animated-switch",
    section: "motion"
  },
"components/examples/motion/animated-text/basic": {
    Component: dynamic(() => import("@/components/examples/motion/animated-text/basic")),
    module: () => import("@/components/examples/motion/animated-text/basic"),
    name: "Animated Text",
    url: "/docs/components/motion/animated-text",
    section: "motion"
  },
"components/examples/motion/animated-text/per-line": {
    Component: dynamic(() => import("@/components/examples/motion/animated-text/per-line")),
    module: () => import("@/components/examples/motion/animated-text/per-line"),
    name: "Animated Text",
    url: "/docs/components/motion/animated-text",
    section: "motion"
  },
"components/examples/motion/animated-text/per-word": {
    Component: dynamic(() => import("@/components/examples/motion/animated-text/per-word")),
    module: () => import("@/components/examples/motion/animated-text/per-word"),
    name: "Animated Text",
    url: "/docs/components/motion/animated-text",
    section: "motion"
  },
"components/examples/motion/animated-text/preset": {
    Component: dynamic(() => import("@/components/examples/motion/animated-text/preset")),
    module: () => import("@/components/examples/motion/animated-text/preset"),
    name: "Animated Text",
    url: "/docs/components/motion/animated-text",
    section: "motion"
  },
"components/examples/motion/animated-tooltip/arrow": {
    Component: dynamic(() => import("@/components/examples/motion/animated-tooltip/arrow")),
    module: () => import("@/components/examples/motion/animated-tooltip/arrow"),
    name: "Animated Tooltip",
    url: "/docs/components/motion/animated-tooltip",
    section: "motion"
  },
"components/examples/motion/animated-tooltip/basic": {
    Component: dynamic(() => import("@/components/examples/motion/animated-tooltip/basic")),
    module: () => import("@/components/examples/motion/animated-tooltip/basic"),
    name: "Animated Tooltip",
    url: "/docs/components/motion/animated-tooltip",
    section: "motion"
  },
"components/examples/motion/animated-tooltip/controlled": {
    Component: dynamic(() => import("@/components/examples/motion/animated-tooltip/controlled")),
    module: () => import("@/components/examples/motion/animated-tooltip/controlled"),
    name: "Animated Tooltip",
    url: "/docs/components/motion/animated-tooltip",
    section: "motion"
  },
"components/examples/motion/animated-tooltip/delay": {
    Component: dynamic(() => import("@/components/examples/motion/animated-tooltip/delay")),
    module: () => import("@/components/examples/motion/animated-tooltip/delay"),
    name: "Animated Tooltip",
    url: "/docs/components/motion/animated-tooltip",
    section: "motion"
  },
"components/examples/motion/animated-tooltip/positions": {
    Component: dynamic(() => import("@/components/examples/motion/animated-tooltip/positions")),
    module: () => import("@/components/examples/motion/animated-tooltip/positions"),
    name: "Animated Tooltip",
    url: "/docs/components/motion/animated-tooltip",
    section: "motion"
  },
"components/examples/motion/cipher-text/basic": {
    Component: dynamic(() => import("@/components/examples/motion/cipher-text/basic")),
    module: () => import("@/components/examples/motion/cipher-text/basic"),
    name: "Cipher Text",
    url: "/docs/components/motion/cipher-text",
    section: "motion"
  },
"components/examples/motion/cipher-text/custom-config": {
    Component: dynamic(() => import("@/components/examples/motion/cipher-text/custom-config")),
    module: () => import("@/components/examples/motion/cipher-text/custom-config"),
    name: "Cipher Text",
    url: "/docs/components/motion/cipher-text",
    section: "motion"
  },
"components/examples/motion/cipher-text/trigger": {
    Component: dynamic(() => import("@/components/examples/motion/cipher-text/trigger")),
    module: () => import("@/components/examples/motion/cipher-text/trigger"),
    name: "Cipher Text",
    url: "/docs/components/motion/cipher-text",
    section: "motion"
  },
"components/examples/motion/comparator/basic": {
    Component: dynamic(() => import("@/components/examples/motion/comparator/basic")),
    module: () => import("@/components/examples/motion/comparator/basic"),
    name: "Comparator",
    url: "/docs/components/motion/comparator",
    section: "motion"
  },
"components/examples/motion/comparator/custom-slider": {
    Component: dynamic(() => import("@/components/examples/motion/comparator/custom-slider")),
    module: () => import("@/components/examples/motion/comparator/custom-slider"),
    name: "Comparator",
    url: "/docs/components/motion/comparator",
    section: "motion"
  },
"components/examples/motion/comparator/enable-hover": {
    Component: dynamic(() => import("@/components/examples/motion/comparator/enable-hover")),
    module: () => import("@/components/examples/motion/comparator/enable-hover"),
    name: "Comparator",
    url: "/docs/components/motion/comparator",
    section: "motion"
  },
"components/examples/motion/comparator/not-image": {
    Component: dynamic(() => import("@/components/examples/motion/comparator/not-image")),
    module: () => import("@/components/examples/motion/comparator/not-image"),
    name: "Comparator",
    url: "/docs/components/motion/comparator",
    section: "motion"
  },
"components/examples/motion/comparator/spring-options": {
    Component: dynamic(() => import("@/components/examples/motion/comparator/spring-options")),
    module: () => import("@/components/examples/motion/comparator/spring-options"),
    name: "Comparator",
    url: "/docs/components/motion/comparator",
    section: "motion"
  },
"components/examples/motion/highlighted-text/basic-2": {
    Component: dynamic(() => import("@/components/examples/motion/highlighted-text/basic-2")),
    module: () => import("@/components/examples/motion/highlighted-text/basic-2"),
    name: "Highlighted Text",
    url: "/docs/components/motion/highlighted-text",
    section: "motion"
  },
"components/examples/motion/highlighted-text/basic": {
    Component: dynamic(() => import("@/components/examples/motion/highlighted-text/basic")),
    module: () => import("@/components/examples/motion/highlighted-text/basic"),
    name: "Highlighted Text",
    url: "/docs/components/motion/highlighted-text",
    section: "motion"
  },
"components/examples/motion/hover-glow/basic": {
    Component: dynamic(() => import("@/components/examples/motion/hover-glow/basic")),
    module: () => import("@/components/examples/motion/hover-glow/basic"),
    name: "Hover Glow",
    url: "/docs/components/motion/hover-glow",
    section: "motion"
  },
"components/examples/motion/hover-glow/cards": {
    Component: dynamic(() => import("@/components/examples/motion/hover-glow/cards")),
    module: () => import("@/components/examples/motion/hover-glow/cards"),
    name: "Hover Glow",
    url: "/docs/components/motion/hover-glow",
    section: "motion"
  },
"components/examples/motion/hover-glow/grid": {
    Component: dynamic(() => import("@/components/examples/motion/hover-glow/grid")),
    module: () => import("@/components/examples/motion/hover-glow/grid"),
    name: "Hover Glow",
    url: "/docs/components/motion/hover-glow",
    section: "motion"
  },
"components/examples/motion/morphing-card/basic-2": {
    Component: dynamic(() => import("@/components/examples/motion/morphing-card/basic-2")),
    module: () => import("@/components/examples/motion/morphing-card/basic-2"),
    name: "Morphing Card",
    url: "/docs/components/motion/morphing-card",
    section: "motion"
  },
"components/examples/motion/morphing-card/basic": {
    Component: dynamic(() => import("@/components/examples/motion/morphing-card/basic")),
    module: () => import("@/components/examples/motion/morphing-card/basic"),
    name: "Morphing Card",
    url: "/docs/components/motion/morphing-card",
    section: "motion"
  },
"components/examples/motion/morphing-text/basic": {
    Component: dynamic(() => import("@/components/examples/motion/morphing-text/basic")),
    module: () => import("@/components/examples/motion/morphing-text/basic"),
    name: "Morphing Text",
    url: "/docs/components/motion/morphing-text",
    section: "motion"
  },
"components/examples/motion/morphing-text/with-badge": {
    Component: dynamic(() => import("@/components/examples/motion/morphing-text/with-badge")),
    module: () => import("@/components/examples/motion/morphing-text/with-badge"),
    name: "Morphing Text",
    url: "/docs/components/motion/morphing-text",
    section: "motion"
  },
"components/examples/motion/particles/basic": {
    Component: dynamic(() => import("@/components/examples/motion/particles/basic")),
    module: () => import("@/components/examples/motion/particles/basic"),
    name: "Particles",
    url: "/docs/components/motion/particles",
    section: "motion"
  },
"components/examples/motion/rolling-text/basic": {
    Component: dynamic(() => import("@/components/examples/motion/rolling-text/basic")),
    module: () => import("@/components/examples/motion/rolling-text/basic"),
    name: "Rolling Text",
    url: "/docs/components/motion/rolling-text",
    section: "motion"
  },
"components/examples/motion/rolling-text/on-index-change": {
    Component: dynamic(() => import("@/components/examples/motion/rolling-text/on-index-change")),
    module: () => import("@/components/examples/motion/rolling-text/on-index-change"),
    name: "Rolling Text",
    url: "/docs/components/motion/rolling-text",
    section: "motion"
  },
"components/examples/motion/shining-text/basic": {
    Component: dynamic(() => import("@/components/examples/motion/shining-text/basic")),
    module: () => import("@/components/examples/motion/shining-text/basic"),
    name: "Shining Text",
    url: "/docs/components/motion/shining-text",
    section: "motion"
  },
"components/examples/motion/tilting-card/basic": {
    Component: dynamic(() => import("@/components/examples/motion/tilting-card/basic")),
    module: () => import("@/components/examples/motion/tilting-card/basic"),
    name: "Tilting Card",
    url: "/docs/components/motion/tilting-card",
    section: "motion"
  },
"components/examples/motion/tilting-card/disclosure": {
    Component: dynamic(() => import("@/components/examples/motion/tilting-card/disclosure")),
    module: () => import("@/components/examples/motion/tilting-card/disclosure"),
    name: "Tilting Card",
    url: "/docs/components/motion/tilting-card",
    section: "motion"
  },
"components/examples/motion/typewriting-text/basic": {
    Component: dynamic(() => import("@/components/examples/motion/typewriting-text/basic")),
    module: () => import("@/components/examples/motion/typewriting-text/basic"),
    name: "Typewriting Text",
    url: "/docs/components/motion/typewriting-text",
    section: "motion"
  },
"components/examples/motion/typewriting-text/looped": {
    Component: dynamic(() => import("@/components/examples/motion/typewriting-text/looped")),
    module: () => import("@/components/examples/motion/typewriting-text/looped"),
    name: "Typewriting Text",
    url: "/docs/components/motion/typewriting-text",
    section: "motion"
  },
"components/examples/motion/typewriting-text/speed": {
    Component: dynamic(() => import("@/components/examples/motion/typewriting-text/speed")),
    module: () => import("@/components/examples/motion/typewriting-text/speed"),
    name: "Typewriting Text",
    url: "/docs/components/motion/typewriting-text",
    section: "motion"
  },
"components/theme/appearance-button": {
    Component: dynamic(() => import("@/components/theme/appearance-button")),
    module: () => import("@/components/theme/appearance-button")
  },
"components/theme/appearance-dropdown": {
    Component: dynamic(() => import("@/components/theme/appearance-dropdown")),
    module: () => import("@/components/theme/appearance-dropdown")
  },
"components/theme/appearance-image": {
    Component: dynamic(() => import("@/components/theme/appearance-image")),
    module: () => import("@/components/theme/appearance-image")
  },
"components/theme/appearance-tabs": {
    Component: dynamic(() => import("@/components/theme/appearance-tabs")),
    module: () => import("@/components/theme/appearance-tabs")
  }
} as const;

export const registryIndex = {
  core: [
      { name: "Accordion", path: "components/examples/core/accordion/basic.demo", url: "/docs/components/core/accordion" },
      { name: "Alert", path: "components/examples/core/alert/basic", url: "/docs/components/core/alert" },
      { name: "Avatar", path: "components/examples/core/avatar/basic.demo", url: "/docs/components/core/avatar" },
      { name: "Badge", path: "components/examples/core/badge/basic", url: "/docs/components/core/badge" },
      { name: "Breadcrumbs", path: "components/examples/core/breadcrumbs/basic", url: "/docs/components/core/breadcrumbs" },
      { name: "Button", path: "components/examples/core/button/basic.demo", url: "/docs/components/core/button" },
      { name: "Calendar", path: "components/examples/core/calendar/basic", url: "/docs/components/core/calendar" },
      { name: "Card", path: "components/examples/core/card/basic", url: "/docs/components/core/card" },
      { name: "Checkbox", path: "components/examples/core/checkbox/basic.demo", url: "/docs/components/core/checkbox" },
      { name: "Checkbox Group", path: "components/examples/core/checkbox-group/basic", url: "/docs/components/core/checkbox-group" },
      { name: "Color Area", path: "components/examples/core/color-area/basic", url: "/docs/components/core/color-area" },
      { name: "Color Field", path: "components/examples/core/color-field/basic", url: "/docs/components/core/color-field" },
      { name: "Color Picker", path: "components/examples/core/color-picker/basic", url: "/docs/components/core/color-picker" },
      { name: "Color Slider", path: "components/examples/core/color-slider/basic", url: "/docs/components/core/color-slider" },
      { name: "Color Swatch", path: "components/examples/core/color-swatch/basic", url: "/docs/components/core/color-swatch" },
      { name: "Color Swatch Picker", path: "components/examples/core/color-swatch-picker/basic", url: "/docs/components/core/color-swatch-picker" },
      { name: "Color Wheel", path: "components/examples/core/color-wheel/basic", url: "/docs/components/core/color-wheel" },
      { name: "Combobox", path: "components/examples/core/combobox/basic", url: "/docs/components/core/combobox" },
      { name: "Command", path: "components/examples/core/command/basic", url: "/docs/components/core/command" },
      { name: "Context Menu", path: "components/examples/core/context-menu/basic", url: "/docs/components/core/context-menu" },
      { name: "Date Field", path: "components/examples/core/date-field/basic", url: "/docs/components/core/date-field" },
      { name: "Date Picker", path: "components/examples/core/date-picker/basic", url: "/docs/components/core/date-picker" },
      { name: "Date Range Picker", path: "components/examples/core/date-range-picker/basic", url: "/docs/components/core/date-range-picker" },
      { name: "Description List", path: "components/examples/core/description-list/basic", url: "/docs/components/core/description-list" },
      { name: "Dialog", path: "components/examples/core/dialog/basic", url: "/docs/components/core/dialog" },
      { name: "Disclosure", path: "components/examples/core/disclosure/basic.demo", url: "/docs/components/core/disclosure" },
      { name: "Dock", path: "components/examples/core/dock/basic", url: "/docs/components/core/dock" },
      { name: "Drag And Drop", path: "components/examples/core/drag-and-drop/basic", url: "/docs/components/core/drag-and-drop" },
      { name: "Drop Zone", path: "components/examples/core/drop-zone/basic.demo", url: "/docs/components/core/drop-zone" },
      { name: "Dropdown Menu", path: "components/examples/core/dropdown-menu/basic", url: "/docs/components/core/dropdown-menu" },
      { name: "File Trigger", path: "components/examples/core/file-trigger/basic", url: "/docs/components/core/file-trigger" },
      { name: "Form", path: "components/examples/core/form/basic", url: "/docs/components/core/form" },
      { name: "Grid List", path: "components/examples/core/grid-list/basic", url: "/docs/components/core/grid-list" },
      { name: "Heading", path: "components/examples/core/heading/basic.demo", url: "/docs/components/core/heading" },
      { name: "Input", path: "components/examples/core/input/basic.demo", url: "/docs/components/core/input" },
      { name: "Input Otp", path: "components/examples/core/input-otp/basic", url: "/docs/components/core/input-otp" },
      { name: "Link", path: "components/examples/core/link/basic.demo", url: "/docs/components/core/link" },
      { name: "List Box", path: "components/examples/core/list-box/basic", url: "/docs/components/core/list-box" },
      { name: "Loader", path: "components/examples/core/loader/basic.demo", url: "/docs/components/core/loader" },
      { name: "Marquee", path: "components/examples/core/marquee/basic", url: "/docs/components/core/marquee" },
      { name: "Modal", path: "components/examples/core/modal/basic", url: "/docs/components/core/modal" },
      { name: "Multiple Select", path: "components/examples/core/multiple-select/basic", url: "/docs/components/core/multiple-select" },
      { name: "Number Field", path: "components/examples/core/number-field/basic", url: "/docs/components/core/number-field" },
      { name: "Pagination", path: "components/examples/core/pagination/basic.demo", url: "/docs/components/core/pagination" },
      { name: "Percentage", path: "components/examples/core/percentage/basic", url: "/docs/components/core/percentage" },
      { name: "Popover", path: "components/examples/core/popover/basic", url: "/docs/components/core/popover" },
      { name: "Progress", path: "components/examples/core/progress/basic", url: "/docs/components/core/progress" },
      { name: "Radio Group", path: "components/examples/core/radio-group/basic", url: "/docs/components/core/radio-group" },
      { name: "Range Calendar", path: "components/examples/core/range-calendar/basic", url: "/docs/components/core/range-calendar" },
      { name: "Search Bar", path: "components/examples/core/search-bar/basic", url: "/docs/components/core/search-bar" },
      { name: "Select", path: "components/examples/core/select/basic", url: "/docs/components/core/select" },
      { name: "Selection Box", path: "components/examples/core/selection-box/basic", url: "/docs/components/core/selection-box" },
      { name: "Separator", path: "components/examples/core/separator/basic", url: "/docs/components/core/separator" },
      { name: "Shortcut", path: "components/examples/core/shortcut/basic", url: "/docs/components/core/shortcut" },
      { name: "Show More", path: "components/examples/core/show-more/basic", url: "/docs/components/core/show-more" },
      { name: "Skeleton", path: "components/examples/core/skeleton/basic", url: "/docs/components/core/skeleton" },
      { name: "Slider", path: "components/examples/core/slider/basic.demo", url: "/docs/components/core/slider" },
      { name: "Stepper", path: "components/examples/core/stepper/basic", url: "/docs/components/core/stepper" },
      { name: "Switch", path: "components/examples/core/switch/basic", url: "/docs/components/core/switch" },
      { name: "Table", path: "components/examples/core/table/basic", url: "/docs/components/core/table" },
      { name: "Tabs", path: "components/examples/core/tabs/basic.demo", url: "/docs/components/core/tabs" },
      { name: "Tag Group", path: "components/examples/core/tag-group/basic", url: "/docs/components/core/tag-group" },
      { name: "Text Area", path: "components/examples/core/text-area/basic", url: "/docs/components/core/text-area" },
      { name: "Text Field", path: "components/examples/core/text-field/basic.demo", url: "/docs/components/core/text-field" },
      { name: "Time Field", path: "components/examples/core/time-field/basic", url: "/docs/components/core/time-field" },
      { name: "Toast", path: "components/examples/core/toast/basic", url: "/docs/components/core/toast" },
      { name: "Toggle", path: "components/examples/core/toggle/basic.demo", url: "/docs/components/core/toggle" },
      { name: "Toggle Group", path: "components/examples/core/toggle-group/basic.demo", url: "/docs/components/core/toggle-group" },
      { name: "Tooltip", path: "components/examples/core/tooltip/basic.demo", url: "/docs/components/core/tooltip" },
      { name: "Tree", path: "components/examples/core/tree/basic", url: "/docs/components/core/tree" }
  ],
  motion: [
      { name: "Animated Circle Indicator", path: "components/examples/motion/animated-circle-indicator/basic", url: "/docs/components/motion/animated-circle-indicator" },
      { name: "Animated Dock", path: "components/examples/motion/animated-dock/basic", url: "/docs/components/motion/animated-dock" },
      { name: "Animated Switch", path: "components/examples/motion/animated-switch/basic", url: "/docs/components/motion/animated-switch" },
      { name: "Animated Text", path: "components/examples/motion/animated-text/basic", url: "/docs/components/motion/animated-text" },
      { name: "Animated Tooltip", path: "components/examples/motion/animated-tooltip/basic", url: "/docs/components/motion/animated-tooltip" },
      { name: "Cipher Text", path: "components/examples/motion/cipher-text/basic", url: "/docs/components/motion/cipher-text" },
      { name: "Comparator", path: "components/examples/motion/comparator/basic", url: "/docs/components/motion/comparator" },
      { name: "Highlighted Text", path: "components/examples/motion/highlighted-text/basic-2", url: "/docs/components/motion/highlighted-text" },
      { name: "Hover Glow", path: "components/examples/motion/hover-glow/basic", url: "/docs/components/motion/hover-glow" },
      { name: "Morphing Card", path: "components/examples/motion/morphing-card/basic-2", url: "/docs/components/motion/morphing-card" },
      { name: "Morphing Text", path: "components/examples/motion/morphing-text/basic", url: "/docs/components/motion/morphing-text" },
      { name: "Particles", path: "components/examples/motion/particles/basic", url: "/docs/components/motion/particles" },
      { name: "Rolling Text", path: "components/examples/motion/rolling-text/basic", url: "/docs/components/motion/rolling-text" },
      { name: "Shining Text", path: "components/examples/motion/shining-text/basic", url: "/docs/components/motion/shining-text" },
      { name: "Tilting Card", path: "components/examples/motion/tilting-card/basic", url: "/docs/components/motion/tilting-card" },
      { name: "Typewriting Text", path: "components/examples/motion/typewriting-text/basic", url: "/docs/components/motion/typewriting-text" }
  ],
  blocks: [
      { name: "Bento", path: "components/examples/blocks/bento/basic-2", url: "/docs/components/blocks/bento" }
  ]
} as const;

export type RuntimeRegistryKey = keyof typeof runtimeRegistry;
