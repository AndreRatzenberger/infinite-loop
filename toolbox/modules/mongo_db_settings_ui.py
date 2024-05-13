import streamlit as st


class MongoDBSettingsUI:
    def __init__(self, settings):
        self.settings = settings

    def render(self):
        with st.expander(f"{self.settings.name} Settings"):
            self._render_text_input(
                "Connection String:",
                f"{self.settings.name}_CONNECTION_STRING",
                is_password=False,
            )

            self._render_text_input(
                "Database Name", f"{self.settings.name}_DATABASE_NAME"
            )

            # Save button
            if st.button("Save Settings", key=f"{self.settings.name}_SAVE_BTN"):
                self.settings._save_settings()
                st.success("Settings saved successfully!")

    def _render_text_input(self, label, setting_key, is_password=False):
        current_value = self.settings.get_setting(setting_key) or ""
        text_type = "password" if is_password else "default"
        new_value = st.text_input(
            label, value=current_value, key=setting_key, type=text_type
        )
        if new_value != current_value:
            self.settings.set_setting(setting_key, new_value)
