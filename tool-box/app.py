from lib.config.openai_settings import OpenAiSettings, ModelType
from modules.openai_settings_ui import OpenAiSettingsUi


if __name__ == "__main__":
    settings = OpenAiSettings()
    settings.model = ModelType._value2member_map_.get("gpt-4-turbo")

    ui = OpenAiSettingsUi()
    ui.render()
