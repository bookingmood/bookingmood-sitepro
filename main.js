const first_week_contains_date_options = [
  { key: "default", label: "Default", value: null },
  { key: 1, label: "January 1st", value: 1 },
  { key: 2, label: "January 2nd", value: 2 },
  { key: 3, label: "January 3rd", value: 3 },
  { key: 4, label: "January 4th", value: 4 },
  { key: 5, label: "January 5th", value: 5 },
  { key: 6, label: "January 6th", value: 6 },
  { key: 7, label: "January 7th", value: 7 },
];

PluginWrapper.registerPlugin("bookingmood_calendar", {
  name: "Bookingmood calendar",
  element: {
    minSize: { width: 64, height: 64 },
    defaultSize: { width: 800, height: 256 },
    initialFullWidth: true,
    resizable: true,
  },
  propertyDialog: {
    noScroll: true,
    tabs: [
      {
        name: "General",
        children: [
          {
            type: "VerticalLayout",
            children: [
              {
                type: "Label",
                text: "Bookingmood widget ID",
                helpText: "To find widget ID, go to TODO",
              },
              {
                type: "TextField",
                id: "widget_id",
                placeholder: "000000000000-0000-0000-00000000",
              },
            ],
          },
        ],
      },
      {
        name: "Localization",
        children: [
          { type: "Label", text: "Calendar name" },
          {
            type: "TextField",
            id: "calendar_name",
            placeholder: "Calendar name",
          },
          { type: "Label", text: "Calendar name" },
          {
            type: "TextField",
            id: "calendar_name",
            placeholder: "Calendar name",
          },
          { type: "Label", text: "Calendar name" },
          {
            type: "TextField",
            id: "calendar_name",
            placeholder: "Calendar name",
          },
        ],
      },
      {
        name: "Layout",
        children: [
          { type: "Label", text: "Calendar name" },
          {
            type: "TextField",
            id: "calendar_name",
            placeholder: "Calendar name",
          },
        ],
      },
      ,
      {
        name: "Theme",
        children: [
          { type: "Label", text: "Calendar name" },
          {
            type: "TextField",
            id: "calendar_name",
            placeholder: "Calendar name",
          },
        ],
      },
    ],
  },
  openAction: function (fields, data, elem) {
    // General
    fields.widget_id.setText(data.content.widget_id);

    // Localization
    const locale = fields.locale.getItemById(data.content.locale);
    if (locale) fields.locale.selectItem(locale);
    fields.week_starts_on_default.setValue(
      data.content.week_starts_on === null
    );
    fields.week_starts_on_sunday.setValue(data.content.week_starts_on === 0);
    fields.week_starts_on_monday.setValue(data.content.week_starts_on === 1);

    const firstWeekContainsDate = fields.first_week_contains_date.getItemById(
      data.content.first_week_contains_date
    );
    if (firstWeekContainsDate)
      fields.first_week_contains_date.selectItem(firstWeekContainsDate);
    const currency = fields.currency.getItemById(data.content.currency);
    if (currency) fields.currency.selectItem(currency);

    // Layout
    fields.size_regular.setValue(data.content.size === "regular");
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
    fields.theme_classic.setValue(data.content.theme === "classic");
    fields.theme_modern.setValue(data.content.theme === "modern");
    fields.background_color.setValue(`#${data.content.background_color}`);
    fields.text_color.setValue(`#${data.content.text_color}`);
    fields.accent_color.setValue(`#${data.content.unavailable_color}`);
    fields.available_color.setValue(`#${data.content.available_color}`);
    fields.tentative_color.setValue(`#${data.content.tentative_color}`);
    fields.unavailable_color.setValue(`#${data.content.unavailable_color}`);
    const font = fields.font.getItemById(data.content.font);
    if (font) fields.font.selectItem(font);
  },
  applyAction: function (fields, data, elem) {
    // General
    data.content.widget_id = fields.widget_id.getText();

    // Localization
    data.content.locale = fields.locale.getSelectedItem().getOriginal().id;
    data.content.week_starts_on = fields.week_starts_on
      .getSelectedItem()
      .getOriginal().id;

    data.content.first_week_contains_date = fields.first_week_contains_date
      .getSelectedItem()
      .getOriginal().id;
    data.content.currency = fields.currency.getSelectedItem().getOriginal().id;

    // Layout
    data.content.size = fields.size_regular.getValue() ? "regular" : "compact";

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
    data.content.font = fields.font.getSelectedItem().getOriginal().id;
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
