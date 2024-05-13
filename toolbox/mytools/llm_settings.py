import toolbox.mytools.user_settings


class LlmSettings(toolbox.mytools.user_settings.UserSettings):
    def __init__(
        self,
        env_file=".env",
        name="OPENAI",
        url="https://api.openai.com/v1/",
        models=None,
        embedding_models=None,
        api_key="sk-",
    ):
        if models is None:
            models = {
                "GPT_3_5_TURBO": "gpt-3.5-turbo",
                "GPT_4_TURBO": "gpt-4-turbo",
                "GPT_4_OMNI": "gpt-4o",
            }
        if embedding_models is None:
            embedding_models = {
                "EMBEDDING_ADA_002": "text-embedding-ada-002",
                "LARGE_3": "text-embedding-3-large",
                "SMALL_3": "text-embedding-3-small",
            }

        default_settings = {
            "API_KEY": api_key,
            "BASE_URL": url,
            "MODEL": list(models.values())[0],
            "EMBEDDING_MODEL": list(embedding_models.values())[0],
        }
        super().__init__(env_file, default_settings, name)
        self.models = models
        self.embedding_models = embedding_models
        self._load_my_settings()

    def _load_my_settings(self):
        """Load settings with the possibility of default values if not present in .env."""
        self.api_key = self.get_setting("API_KEY")
        self.base_url = self.get_setting("BASE_URL")
        self.model = self.models.get(
            self.get_setting("MODEL"), list(self.models.values())[0]
        )
        self.embedding_model = self.embedding_models.get(
            self.get_setting("EMBEDDING_MODEL"),
            list(self.embedding_models.values())[0],
        )
