import streamlit as st


class SettingsUI:
    def __init__(self, settings):
        self.settings = settings

    def render(self):
        with st.expander(f"{self.settings.name} Settings"):
            # Render API Key input
            self._render_text_input(
                "API Key", f"{self.settings.name}_API_KEY", is_password=True
            )

            # Render URL input
            self._render_text_input("Base URL", f"{self.settings.name}_BASE_URL")

            # Render dropdown for model selection
            self._render_dropdown(
                "Model", self.settings.models, f"{self.settings.name}_MODEL"
            )

            # Render dropdown for embedding model selection
            if self.settings.embedding_models:
                self._render_dropdown(
                    "Embedding Model",
                    self.settings.embedding_models,
                    f"{self.settings.name}_EMBEDDING_MODEL",
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

    def _render_dropdown(self, label, options_dict, setting_key):
        current_value = self.settings.get_setting(setting_key)
        options = list(options_dict.values())
        option_keys = list(options_dict.keys())
        index = options.index(current_value) if current_value in options else 0
        new_value = st.selectbox(label, options=options, index=index, key=setting_key)
        if new_value != current_value:
            selected_key = option_keys[options.index(new_value)]
            self.settings.set_setting(setting_key, options_dict[selected_key])
