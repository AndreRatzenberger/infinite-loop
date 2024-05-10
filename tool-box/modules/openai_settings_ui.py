import streamlit as st
from lib.config.openai_settings import (
    EmbeddingModelType,
    ModelType,
    OpenAiSettings,
)


class OpenAiSettingsUi:
    def __init__(self):
        self.settings = OpenAiSettings()

    def render(self):
        st.title("OpenAI Settings")

        with st.expander("OpenAi Settings"):
            api_key = self.settings.get_setting("OPENAI_API_KEY") or ""
            embedding_model = self.settings.get_setting("OPENAI_EMBEDDING_MODEL") or ""
            model = self.settings.get_setting("OPENAI_MODEL") or ""

            new_api_key = st.text_input("API Key", value=api_key)
            new_embedding_model = st.selectbox(
                "Embedding Model",
                [
                    EmbeddingModelType.EMBEDDING_ADA_002.value,
                    EmbeddingModelType.LARGE_3.value,
                    EmbeddingModelType.SMALL_3.value,
                ],
                index=(
                    0
                    if embedding_model == EmbeddingModelType.EMBEDDING_ADA_002.value
                    else 1
                ),
            )

            new_model = st.selectbox(
                "Model",
                [ModelType.GPT_4_TURBO.value, ModelType.GPT_3_5_TURBO.value],
                index=0 if model == ModelType.GPT_4_TURBO.value else 1,
            )

            if st.button("Save Settings"):
                self.settings.set_setting("OPENAI_API_KEY", new_api_key)
                self.settings.set_setting(
                    "OPENAI_EMBEDDING_MODEL",
                    EmbeddingModelType._value2member_map_.get(new_embedding_model),
                )
                self.settings.set_setting(
                    "OPENAI_MODEL",
                    ModelType._value2member_map_.get(new_model),
                )
                st.success("Settings saved successfully!")


# Example usage
if __name__ == "__main__":
    ui = OpenAiSettingsUi()
    ui.render()
