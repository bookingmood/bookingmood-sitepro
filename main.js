let bmWidgetWrapper;
let bmWidgetFields;
let bmWidgetData;

PluginWrapper.registerPlugin("bookingmood", {
  name: "Bookingmood widget",
  element: {
    initialFullWidth: true,
    supportsFullWidth: true,
    resizable: false,
  },
  async loadWidgets() {
    bmWidgetFields.api_key_button.setText("Loading...");
    bmWidgetFields.api_key_button.setEnabled(false);
    const organizationRes = await fetch(
      `https://www.bookingmood.com/api/organizations`,
      { headers: { Authorization: bmWidgetData.content.api_key } }
    );
    if (!organizationRes.ok) {
      bmWidgetFields.api_key.setError("Invalid API key");
      bmWidgetFields.widget_id_field.setVisible(false);
      bmWidgetFields.widget_id.setOptions([]);
      bmWidgetFields.api_key_button.setText(
        bmWidgetData.content.api_key ? "Update" : "Confirm"
      );
      bmWidgetFields.api_key_button.setEnabled(true);
      return;
    }

    const organization = await organizationRes.json();

    const widgetsRes = await fetch(
      `https://www.bookingmood.com/api/organizations/${organization.id}/widgets`,
      { headers: { Authorization: bmWidgetData.content.api_key } }
    );
    if (!widgetsRes.ok) {
      bmWidgetFields.api_key.setError("Invalid API key");
      bmWidgetFields.widget_id_field.setVisible(false);
      bmWidgetFields.widget_id.setOptions([]);
      bmWidgetFields.api_key_button.setText(
        bmWidgetData.content.api_key ? "Update" : "Confirm"
      );
      bmWidgetFields.api_key_button.setEnabled(true);
      return;
    }

    const { data: widgets } = await widgetsRes.json();

    bmWidgetFields.api_key.setError("");
    bmWidgetFields.widget_id.setOptions(
      widgets.map((widget) => ({
        name: widget.title || `${widget.type} ${widget.id}`,
        type:
          widget.type === "inquiry"
            ? "search"
            : widget.type === "overview"
            ? "timeline"
            : widget.type,
        id: widget.id,
      }))
    );
    bmWidgetFields.widget_id.selectItem(
      bmWidgetFields.widget_id.getItemById(bmWidgetData.content.widget_id)
    );
    bmWidgetFields.widget_id_field.setVisible(true);
    bmWidgetFields.api_key_button.setText(
      bmWidgetData.content.api_key ? "Update" : "Confirm"
    );
    bmWidgetFields.api_key_button.setEnabled(true);
  },
  async loadCurrencyOptions() {
    const res = await fetch(
      `https://www.bookingmood.com/api/websitebuilder/widget-currencies`
    );
    if (!res.ok) {
      bmWidgetFields.currency.setEnabled(false);
      bmWidgetFields.currency.setError("Failed to load currencies");
      return;
    }
    const { options } = await res.json();
    bmWidgetFields.currency.setEnabled(true);
    bmWidgetFields.currency.setError("");
    bmWidgetFields.currency.setOptions([
      { name: "Default for organization", id: "default" },
      ...options.map((option) => ({ name: option.label, id: option.value })),
    ]);
    bmWidgetFields.currency.selectItem(
      bmWidgetFields.currency.getItemById(
        bmWidgetData.content.currency || "default"
      )
    );
  },
  async loadFontOptions() {
    const res = await fetch(
      `https://www.bookingmood.com/api/websitebuilder/widget-fonts`
    );
    if (!res.ok) {
      bmWidgetFields.font.setEnabled(false);
      bmWidgetFields.font.setError("Failed to load fonts");
      return;
    }
    const { options } = await res.json();
    bmWidgetFields.font.setEnabled(true);
    bmWidgetFields.font.setError("");
    bmWidgetFields.font.setOptions([
      { name: "Default", id: "default" },
      ...options.map((option) => ({ name: option.label, id: option.value })),
    ]);
    bmWidgetFields.font.selectItem(
      bmWidgetFields.font.getItemById(bmWidgetData.content.font || "default")
    );
  },
  async loadLocaleOptions() {
    const res = await fetch(
      `https://www.bookingmood.com/api/websitebuilder/widget-locales`
    );
    if (!res.ok) {
      bmWidgetFields.locale.setEnabled(false);
      bmWidgetFields.locale.setError("Failed to load locales");
      return;
    }
    const { options } = await res.json();
    bmWidgetFields.locale.setEnabled(true);
    bmWidgetFields.locale.setError("");
    bmWidgetFields.locale.setOptions(
      options.map((option) => ({ name: option.label, id: option.value }))
    );
    bmWidgetFields.locale.selectItem(
      bmWidgetFields.locale.getItemById(bmWidgetData.content.locale || "en-US")
    );
  },
  updateFieldVisibility() {
    bmWidgetFields.api_key.setEnabled(true);
    bmWidgetFields.api_key_button.setText(
      bmWidgetData.content.api_key ? "Update" : "Confirm"
    );
    bmWidgetFields.api_key_button.setEnabled(true);

    bmWidgetFields.widget_id_field.setVisible(
      bmWidgetFields.widget_id.optionsSource.length > 0
    );

    const widgetType = bmWidgetData.content.widget_type;

    bmWidgetFields.size.setOptions(
      ["calendar", "inventory", "search"].includes(widgetType)
        ? [
            { name: "Regular", id: "regular" },
            { name: "Compact", id: "compact" },
          ]
        : widgetType === "timeline"
        ? [
            { name: "Responsive", id: "responsive" },
            { name: "Compact", id: "compact" },
            { name: "Wide", id: "wide" },
          ]
        : []
    );
    if (bmWidgetFields.size.optionsSource.length > 0) {
      bmWidgetFields.size_field.setVisible(true);
      bmWidgetFields.size.setEnabled(true);
      bmWidgetFields.size.selectItem(
        bmWidgetFields.size.getItemById(
          bmWidgetData.content.size || bmWidgetFields.size.optionsSource[0].id
        )
      );
    } else {
      bmWidgetFields.size_field.setVisible(false);
      bmWidgetFields.size.setEnabled(false);
      bmWidgetFields.size.selectItem(null);
    }

    bmWidgetFields.theme.setOptions(
      ["calendar", "timeline", "inventory"].includes(widgetType)
        ? [
            { name: "Modern", id: "modern" },
            { name: "Classic", id: "classic" },
          ]
        : []
    );
    if (bmWidgetFields.theme.optionsSource.length > 0) {
      bmWidgetFields.theme_field.setVisible(true);
      bmWidgetFields.theme.setEnabled(true);
      bmWidgetFields.theme.selectItem(
        bmWidgetFields.theme.getItemById(
          bmWidgetData.content.theme || bmWidgetFields.theme.optionsSource[0].id
        )
      );
    } else {
      bmWidgetFields.theme_field.setVisible(false);
      bmWidgetFields.theme.setEnabled(false);
      bmWidgetFields.theme.selectItem(null);
    }

    const theme = bmWidgetData.content.theme;
    bmWidgetFields.display_product_covers.setVisible(widgetType === "timeline");
    bmWidgetFields.display_product_name.setVisible(widgetType === "calendar");
    bmWidgetFields.display_product_images.setVisible(widgetType === "calendar");
    bmWidgetFields.display_tag_filter.setVisible(widgetType === "search");
    bmWidgetFields.display_weekdays.setVisible(widgetType === "timeline");
    bmWidgetFields.display_week_numbers.setVisible(
      ["calendar", "inventory"].includes(widgetType)
    );
    bmWidgetFields.display_legend.setVisible(
      ["calendar", "timeline", "inventory"].includes(widgetType)
    );
    bmWidgetFields.stay_expanded.setVisible(
      ["calendar", "timeline", "inventory"].includes(widgetType)
    );
    bmWidgetFields.accent_color_field.setVisible(widgetType === "search");
    bmWidgetFields.available_color_field.setVisible(
      (["calendar", "timeline"].includes(widgetType) && theme === "classic") ||
        widgetType === "inventory"
    );
    bmWidgetFields.tentative_color_field.setVisible(
      ["calendar", "timeline"].includes(widgetType) && theme === "classic"
    );
    bmWidgetFields.unavailable_color_field.setVisible(
      ["calendar", "timeline", "inventory"].includes(widgetType)
    );
  },
  updateUrlParams(data) {
    const content = data.content;
    const urlParams = new URLSearchParams();
    urlParams.set("week_starts_on", content.week_starts_on);
    urlParams.set("first_week_contains_date", content.first_week_contains_date);
    if (content.currency) urlParams.set("currency", content.currency);
    urlParams.set("size", content.size);
    urlParams.set("display_product_covers", content.display_product_covers);
    urlParams.set("display_product_name", content.display_product_name);
    urlParams.set("display_product_images", content.display_product_images);
    urlParams.set("display_tag_filter", content.display_tag_filter);
    urlParams.set("display_weekdays", content.display_weekdays);
    urlParams.set("display_week_numbers", content.display_week_numbers);
    urlParams.set("display_legend", content.display_legend);
    urlParams.set("stay_expanded", content.stay_expanded);
    urlParams.set(
      "show_bookingmood_branding",
      content.show_bookingmood_branding
    );
    urlParams.set("theme", content.theme);
    urlParams.set("background_color", content.background_color);
    urlParams.set("text_color", content.text_color);
    urlParams.set("available_color", content.available_color);
    urlParams.set("tentative_color", content.tentative_color);
    urlParams.set("unavailable_color", content.unavailable_color);
    urlParams.set("accent_color", content.accent_color);
    if (content.font) urlParams.set("font", content.font);
    data.content.url_params = urlParams.toString();
  },
  propertyDialog: {
    noScroll: true,
    tabs: [
      {
        name: "General",
        priority: 0,
        children: [
          {
            type: "HorizontalLayout",
            columnWeights: [8, 4],
            children: [
              {
                type: "VerticalLayout",
                children: [
                  {
                    type: "Label",
                    text: "Bookingmood API key",
                    helpText:
                      "Use an existing API key, or create a new one in the bookingmood admin panel (settings -> api access)",
                  },
                  { type: "TextField", enabled: false, id: "api_key" },
                ],
              },
              {
                type: "Button",
                id: "api_key_button",
                click: async () => {
                  bmWidgetData.content.api_key =
                    bmWidgetFields.api_key.getText() || null;
                  bmWidgetWrapper.loadWidgets();
                },
                enabled: false,
                text: "Loading",
              },
            ],
          },
          {
            type: "VerticalLayout",
            id: "widget_id_field",
            visible: false,
            children: [
              { type: "Label", text: "Bookingmood widget" },
              {
                type: "DropdownBox",
                id: "widget_id",
                options: [],
                change: () => {
                  if (bmWidgetFields.widget_id.getSelectedItem()) {
                    const selectedWidget = bmWidgetFields.widget_id
                      .getSelectedItem()
                      .getOriginal();
                    bmWidgetData.content.widget_id = selectedWidget.id;
                    bmWidgetData.content.widget_type = selectedWidget.type;
                  } else {
                    bmWidgetData.content.widget_id = null;
                    bmWidgetData.content.widget_type = null;
                  }
                  bmWidgetWrapper.updateFieldVisibility();
                },
              },
            ],
          },
        ],
      },
      {
        name: "Localization",
        priority: 1,
        children: [
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Language" },
              {
                type: "DropdownBox",
                id: "locale",
                enabled: false,
                options: [],
              },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Week starts on" },
              {
                type: "DropdownBox",
                id: "week_starts_on",
                options: [
                  { name: "Default for language", id: "default" },
                  { name: "Sunday", id: "0" },
                  { name: "Monday", id: "1" },
                ],
              },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "First week contains date" },
              {
                type: "DropdownBox",
                id: "first_week_contains_date",
                options: [
                  { name: "Default for language", id: "default" },
                  { name: "January 1st", id: "1" },
                  { name: "January 2nd", id: "2" },
                  { name: "January 3rd", id: "3" },
                  { name: "January 4th", id: "4" },
                  { name: "January 5th", id: "5" },
                  { name: "January 6th", id: "6" },
                  { name: "January 7th", id: "7" },
                ],
              },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Currency" },
              {
                type: "DropdownBox",
                id: "currency",
                enabled: false,
                options: [],
              },
            ],
          },
        ],
      },
      {
        name: "Layout",
        priority: 1,
        children: [
          {
            type: "VerticalLayout",
            id: "size_field",
            visible: false,
            children: [
              { type: "Label", text: "Size" },
              {
                type: "DropdownBox",
                id: "size",
                enabled: false,
                options: [],
                change: () => {
                  if (bmWidgetFields.size.getSelectedItem()) {
                    bmWidgetData.content.size = bmWidgetFields.size
                      .getSelectedItem()
                      .getOriginal().id;
                    bmWidgetWrapper.updateFieldVisibility();
                  }
                },
              },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              {
                type: "CheckBox",
                id: "display_product_covers",
                visible: false,
                label: "Display rental images",
              },
              {
                type: "CheckBox",
                id: "display_product_name",
                visible: false,
                label: "Display rental name",
              },
              {
                type: "CheckBox",
                id: "display_product_images",
                visible: false,
                label: "Display rental images",
              },
              {
                type: "CheckBox",
                id: "display_tag_filter",
                visible: false,
                label: "Display tag filter",
              },
              {
                type: "CheckBox",
                id: "display_weekdays",
                visible: false,
                label: "Display weekdays",
              },
              {
                type: "CheckBox",
                id: "display_week_numbers",
                visible: false,
                label: "Display week numbers",
              },
              {
                type: "CheckBox",
                id: "display_legend",
                visible: false,
                label: "Display legend",
              },
              {
                type: "CheckBox",
                id: "stay_expanded",
                visible: false,
                label: "Always show booking form",
              },
              {
                type: "CheckBox",
                id: "show_bookingmood_branding",
                label: "Show branding",
              },
            ],
          },
        ],
      },
      {
        name: "Theme",
        priority: 1,
        children: [
          {
            type: "VerticalLayout",
            id: "theme_field",
            visible: false,
            children: [
              { type: "Label", text: "Theme" },
              {
                type: "DropdownBox",
                id: "theme",
                enabled: false,
                options: [],
                change: () => {
                  if (bmWidgetFields.theme.getSelectedItem()) {
                    bmWidgetData.content.theme = bmWidgetFields.theme
                      .getSelectedItem()
                      .getOriginal().id;
                    bmWidgetWrapper.updateFieldVisibility();
                  }
                },
              },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Background color" },
              { type: "ColorSelector", id: "background_color" },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Text color" },
              { type: "ColorSelector", id: "text_color" },
            ],
          },
          {
            type: "VerticalLayout",
            id: "accent_color_field",
            visible: false,
            children: [
              { type: "Label", text: "Accent color" },
              { type: "ColorSelector", id: "accent_color" },
            ],
          },
          {
            type: "VerticalLayout",
            id: "available_color_field",
            visible: false,
            children: [
              { type: "Label", text: "Available color" },
              { type: "ColorSelector", id: "available_color" },
            ],
          },
          {
            type: "VerticalLayout",
            id: "tentative_color_field",
            visible: false,
            children: [
              { type: "Label", text: "Pending color" },
              { type: "ColorSelector", id: "tentative_color" },
            ],
            visible: false,
          },
          {
            type: "VerticalLayout",
            id: "unavailable_color_field",
            visible: false,
            children: [
              { type: "Label", text: "Unavailable color" },
              { type: "ColorSelector", id: "unavailable_color" },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Font" },
              { type: "DropdownBox", id: "font", enabled: false, options: [] },
            ],
          },
        ],
      },
    ],
  },
  openAction: function (fields, data, elem) {
    bmWidgetWrapper = this;
    bmWidgetFields = fields;
    bmWidgetData = data;

    // General
    fields.api_key.setText(data.content.api_key);
    fields.widget_id.selectItem(
      fields.locale.getItemById(data.content.widget_id || "default")
    );

    // Localization
    fields.week_starts_on.selectItem(
      fields.week_starts_on.getItemById(
        data.content.week_starts_on === null ||
          isNaN(data.content.week_starts_on)
          ? "default"
          : `${data.content.week_starts_on}`
      )
    );

    fields.first_week_contains_date.selectItem(
      fields.first_week_contains_date.getItemById(
        data.content.first_week_contains_date
          ? `${data.content.first_week_contains_date}`
          : "default"
      )
    );

    // Layout
    fields.display_product_covers.setValue(data.content.display_product_covers);
    fields.display_product_images.setValue(data.content.display_product_images);
    fields.display_product_name.setValue(data.content.display_product_name);
    fields.display_tag_filter.setValue(data.content.display_tag_filter);
    fields.display_weekdays.setValue(data.content.display_weekdays);
    fields.display_week_numbers.setValue(data.content.display_week_numbers);
    fields.display_legend.setValue(data.content.display_legend);
    fields.stay_expanded.setValue(data.content.stay_expanded);
    fields.show_bookingmood_branding.setValue(
      data.content.show_bookingmood_branding
    );

    // Theme
    fields.background_color.setValue(`#${data.content.background_color}`);
    fields.text_color.setValue(`#${data.content.text_color}`);
    fields.accent_color.setValue(`#${data.content.accent_color}`);
    fields.available_color.setValue(`#${data.content.available_color}`);
    fields.tentative_color.setValue(`#${data.content.tentative_color}`);
    fields.unavailable_color.setValue(`#${data.content.unavailable_color}`);

    // Load upstream options
    this.updateFieldVisibility();
    if (data.content.api_key) this.loadWidgets();
    this.loadCurrencyOptions();
    this.loadFontOptions();
    this.loadLocaleOptions();
  },
  applyAction: function (fields, data, elem) {
    // General
    data.content.api_key = fields.api_key.getText() || null;
    if (fields.widget_id.getSelectedItem()) {
      const selectedWidget = fields.widget_id.getSelectedItem().getOriginal();
      data.content.widget_id = selectedWidget.id;
      data.content.widget_type = selectedWidget.type;
    }

    // Localization
    if (fields.locale.getSelectedItem())
      data.content.locale = fields.locale.getSelectedItem().getOriginal().id;

    if (fields.week_starts_on.getSelectedItem()) {
      data.content.week_starts_on = fields.week_starts_on
        .getSelectedItem()
        .getOriginal().id;
      data.content.week_starts_on =
        data.content.week_starts_on === "default"
          ? null
          : parseInt(data.content.week_starts_on, 10);
    }

    if (fields.first_week_contains_date.getSelectedItem()) {
      data.content.first_week_contains_date = fields.first_week_contains_date
        .getSelectedItem()
        .getOriginal().id;
      data.content.first_week_contains_date =
        data.content.first_week_contains_date === "default"
          ? null
          : parseInt(data.content.first_week_contains_date, 10);
    }

    if (fields.currency.getSelectedItem()) {
      data.content.currency = fields.currency
        .getSelectedItem()
        .getOriginal().id;
      if (data.content.currency === "default") data.content.currency = null;
    }

    // Layout
    if (fields.size.getSelectedItem())
      data.content.size = fields.size.getSelectedItem().getOriginal().id;

    data.content.display_product_covers =
      fields.display_product_covers.getValue();
    data.content.display_product_images =
      fields.display_product_images.getValue();
    data.content.display_product_name = fields.display_product_name.getValue();
    data.content.display_tag_filter = fields.display_tag_filter.getValue();
    data.content.display_weekdays = fields.display_weekdays.getValue();
    data.content.display_week_numbers = fields.display_week_numbers.getValue();
    data.content.display_legend = fields.display_legend.getValue();
    data.content.stay_expanded = fields.stay_expanded.getValue();
    data.content.show_bookingmood_branding =
      fields.show_bookingmood_branding.getValue();

    // Theme
    if (fields.theme.getSelectedItem())
      data.content.theme = fields.theme.getSelectedItem().getOriginal().id;
    data.content.background_color = fields.background_color
      .getValue()
      .replace("#", "");
    data.content.text_color = fields.text_color.getValue().replace("#", "");
    data.content.accent_color = fields.accent_color.getValue().replace("#", "");
    data.content.available_color = fields.available_color
      .getValue()
      .replace("#", "");
    data.content.tentative_color = fields.tentative_color
      .getValue()
      .replace("#", "");
    data.content.unavailable_color = fields.unavailable_color
      .getValue()
      .replace("#", "");
    if (fields.font.getSelectedItem()) {
      data.content.font = fields.font.getSelectedItem().getOriginal().id;
      if (data.content.font === "default") data.content.font = null;
    }

    this.updateElement();
  },
  loadAction: function (data) {
    this.updateUrlParams(data);
  },
  loadedAction: function (_, container) {
    console.log(bmWidgetWrapper, container[0]);
    const frame = container[0].querySelector("iframe");

    const onMessage = (event) => {
      if (!event.source) return;
      try {
        const data = JSON.parse(event.data);
        if (data.context !== "iframe.resize" || data.src !== frame.src) return;
        frame.height = data.height + 1;
        this.setSize(frame.width, frame.height);
      } catch {}
    };

    window.addEventListener("message", onMessage);
  },
});
