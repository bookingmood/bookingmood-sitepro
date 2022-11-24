const defaultWidgetOptions = [{ name: "Select a widget", id: "default" }];
const defaultCurrencyOptions = [{ name: "Default", id: "default" }];
const defaultFontOptions = [{ name: "Default", id: "default" }];
const defaultLocaleOptions = [];

let bmWidgetWrapper;

PluginWrapper.registerPlugin("bookingmood_calendar", {
  name: "Bookingmood calendar",
  element: {
    minSize: { width: 64, height: 64 },
    defaultSize: { width: 800, height: 256 },
    initialFullWidth: true,
    resizable: true,
  },
  pluginScoped: {
    apiKey: null,
    initialWidgetId: null,
    widgetOptions: [{ name: "Select a widget", id: "default" }],
    currencyOptions: [{ name: "Default", id: "default" }],
    fontOptions: [{ name: "Default", id: "default" }],
    localeOptions: [{ name: "Default", id: "default" }],
  },
  async loadWidgets(fields, value) {
    const organization = await fetch(
      `https://www.bookingmood.com/api/organizations`,
      { headers: { Authorization: this.pluginScoped.apiKey } }
    ).then((res) => res.json());
    const res = await fetch(
      `https://www.bookingmood.com/api/organizations/${organization.id}/widgets`,
      { headers: { Authorization: this.pluginScoped.apiKey } }
    ).then((res) => res.json());
    this.pluginScoped.widgetOptions = res.data.map((widget) => ({
      name: widget.title || `${widget.type} ${widget.id}`,
      type: widget.type,
      id: widget.id,
    }));
    fields.widget_id.setOptions(this.pluginScoped.widgetOptions);
    fields.widget_id.selectItem(
      fields.widget_id.getItemById(value || "default")
    );
    if (fields.widget_id.getSelectedItem()) {
      const type = fields.widget_id.getSelectedItem().getOriginal().type;
      console.log(type, fields);
    }
  },
  async loadCurrencyOptions(fields, value) {
    const { options } = await fetch(
      `https://www.bookingmood.com/api/websitebuilder/widget-currencies`
    ).then((res) => res.json());
    this.pluginScoped.currencyOptions = [
      { name: "Default for organization", id: "default" },
      ...options.map((option) => ({ name: option.label, id: option.value })),
    ];
    fields.currency.setOptions(this.pluginScoped.currencyOptions);
    fields.currency.selectItem(fields.currency.getItemById(value || "default"));
  },
  async loadFontOptions(fields, value) {
    const { options } = await fetch(
      `https://www.bookingmood.com/api/websitebuilder/widget-fonts`
    ).then((res) => res.json());
    this.pluginScoped.fontOptions = [
      { name: "Default", id: "default" },
      ...options.map((option) => ({ name: option.label, id: option.value })),
    ];
    fields.font.setOptions(this.pluginScoped.fontOptions);
    fields.font.selectItem(fields.font.getItemById(value || "default"));
  },
  async loadLocaleOptions(fields, value) {
    const { options } = await fetch(
      `https://www.bookingmood.com/api/websitebuilder/widget-locales`
    ).then((res) => res.json());
    this.pluginScoped.localeOptions = options.map((option) => ({
      name: option.label,
      id: option.value,
    }));
    fields.locale.setOptions(this.pluginScoped.localeOptions);
    fields.locale.selectItem(fields.locale.getItemById(value || "en-US"));
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
                  { type: "TextField", id: "api_key" },
                ],
              },
              {
                type: "Button",
                click: async (event, fields) => {
                  const apiKey = fields.api_key.getText();
                  if (!apiKey) return;
                  bmWidgetWrapper.pluginScoped.apiKey = apiKey;
                  bmWidgetWrapper.loadWidgets(
                    fields,
                    bmWidgetWrapper.pluginScoped.initialWidgetId
                  );
                },
                text: "Load widgets",
              },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Bookingmood widget" },
              {
                type: "DropdownBox",
                id: "widget_id",
                options: defaultWidgetOptions,
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
                options: defaultLocaleOptions,
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
                options: defaultCurrencyOptions,
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
            children: [
              { type: "Label", text: "Size" },
              {
                type: "RadioBox",
                id: "size_regular",
                label: "Regular",
                group: "size",
              },
              {
                type: "RadioBox",
                id: "size_compact",
                label: "Compact",
                group: "size",
              },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              {
                type: "CheckBox",
                id: "display_product_name",
                label: "Display rental name",
              },
              {
                type: "CheckBox",
                id: "display_product_images",
                label: "Display rental images",
              },
              {
                type: "CheckBox",
                id: "display_week_numbers",
                label: "Display week numbers",
              },
              {
                type: "CheckBox",
                id: "display_legend",
                label: "Display legend",
              },
              {
                type: "CheckBox",
                id: "stay_expanded",
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
            children: [
              { type: "Label", text: "Theme" },
              {
                type: "RadioBox",
                id: "theme_modern",
                label: "Modern",
                group: "theme",
              },
              {
                type: "RadioBox",
                id: "theme_classic",
                label: "Classic",
                group: "theme",
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
            children: [
              { type: "Label", text: "Accent color" },
              { type: "ColorSelector", id: "accent_color" },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Available color" },
              { type: "ColorSelector", id: "available_color" },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Pending color" },
              { type: "ColorSelector", id: "tentative_color" },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Unavailable color" },
              { type: "ColorSelector", id: "unavailable_color" },
            ],
          },
          {
            type: "VerticalLayout",
            children: [
              { type: "Label", text: "Font" },
              {
                type: "DropdownBox",
                id: "font",
                options: defaultFontOptions,
              },
            ],
          },
        ],
      },
    ],
  },
  openAction: function (fields, data, elem) {
    bmWidgetWrapper = this;
    // General
    this.pluginScoped.apiKey = data.content.api_key || null;
    this.pluginScoped.initialWidgetId = data.content.widget_id || null;
    fields.api_key.setText(data.content.api_key);
    fields.widget_id.selectItem(
      fields.locale.getItemById(data.content.widget_id || "default")
    );

    // Localization
    fields.locale.selectItem(
      fields.locale.getItemById(data.content.locale || "default")
    );
    fields.week_starts_on.selectItem(
      fields.week_starts_on.getItemById(
        isNaN(data.content.week_starts_on)
          ? "default"
          : parseInt(data.content.week_starts_on, 10)
      )
    );

    fields.first_week_contains_date.selectItem(
      fields.first_week_contains_date.getItemById(
        data.content.first_week_contains_date
          ? `${data.content.first_week_contains_date}`
          : "default"
      )
    );
    fields.currency.selectItem(
      fields.currency.getItemById(data.content.currency || "default")
    );

    // Layout
    fields.size_regular.setValue(data.content.size !== "compact");
    fields.size_compact.setValue(data.content.size === "compact");
    fields.display_product_name.setValue(data.content.display_product_name);
    fields.display_product_images.setValue(data.content.display_product_images);
    fields.display_week_numbers.setValue(data.content.display_week_numbers);
    fields.display_legend.setValue(data.content.display_legend);
    fields.stay_expanded.setValue(data.content.stay_expanded);
    fields.show_bookingmood_branding.setValue(
      data.content.show_bookingmood_branding
    );

    // Theme
    fields.theme_modern.setValue(data.content.theme !== "classic");
    fields.theme_classic.setValue(data.content.theme === "classic");
    fields.background_color.setValue(`#${data.content.background_color}`);
    fields.text_color.setValue(`#${data.content.text_color}`);
    fields.accent_color.setValue(`#${data.content.unavailable_color}`);
    fields.available_color.setValue(`#${data.content.available_color}`);
    fields.tentative_color.setValue(`#${data.content.tentative_color}`);
    fields.unavailable_color.setValue(`#${data.content.unavailable_color}`);
    fields.font.selectItem(
      fields.font.getItemById(data.content.font || "default")
    );

    // Load upstream options
    if (this.pluginScoped.apiKey)
      this.loadWidgets(fields, data.content.widget_id);
    if (this.pluginScoped.currencyOptions.length === 1)
      this.loadCurrencyOptions(fields, data.content.currency);
    if (this.pluginScoped.fontOptions.length === 1)
      this.loadFontOptions(fields, data.content.font);
    if (this.pluginScoped.localeOptions.length === 1)
      this.loadLocaleOptions(fields, data.content.locale);
  },
  applyAction: function (fields, data, elem) {
    // General
    data.content.api_key = fields.api_key.getText() || null;
    if (fields.widget_id.getSelectedItem()) {
      data.content.widget_id = fields.widget_id
        .getSelectedItem()
        .getOriginal().id;
      if (data.content.widget_id === "default") data.content.widget_id = null;
    }

    // Localization
    if (fields.locale.getSelectedItem()) {
      data.content.locale = fields.locale.getSelectedItem().getOriginal().id;
      if (data.content.locale === "default") data.content.locale = null;
    }
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
    data.content.size = fields.size_compact.getValue() ? "compact" : "regular";

    data.content.display_product_name = fields.display_product_name.getValue();
    data.content.display_product_images =
      fields.display_product_images.getValue();
    data.content.display_week_numbers = fields.display_week_numbers.getValue();
    data.content.display_legend = fields.display_legend.getValue();
    data.content.stay_expanded = fields.stay_expanded.getValue();
    data.content.show_bookingmood_branding =
      fields.show_bookingmood_branding.getValue();

    // Theme
    data.content.theme = fields.theme_classic.getValue() ? "classic" : "modern";
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
  },
  loadAction: function (data) {
    const content = data.content;
    const urlParams = new URLSearchParams();
    urlParams.set("week_starts_on", content.week_starts_on);
    urlParams.set("first_week_contains_date", content.first_week_contains_date);
    if (content.currency) urlParams.set("currency", content.currency);
    urlParams.set("size", content.size);
    urlParams.set("display_product_name", content.display_product_name);
    urlParams.set("display_product_images", content.display_product_images);
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
    urlParams.set(
      "unavailable_color",
      content.theme === "modern"
        ? content.accent_color
        : content.unavailable_color
    );
    if (content.font) urlParams.set("font", content.font);
    data.content.params = urlParams.toString();
  },
});
