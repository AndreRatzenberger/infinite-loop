import mytools.user_settings


class LlmSettings(mytools.user_settings.UserSettings):
    def __init__(
        self,
        env_file=".env",
        name="OPENAI",
        url="https://api.openai.com/v1",
        models=None,
        embedding_models=None,
    ):
        if models is None:
            models = {"GPT_3_5_TURBO": "gpt-3.5-turbo", "GPT_4_TURBO": "gpt-4-turbo"}
        if embedding_models is None:
            embedding_models = {
                "EMBEDDING_ADA_002": "text-embedding-ada-002",
                "LARGE_3": "text-embedding-3-large",
                "SMALL_3": "text-embedding-3-small",
            }

        default_settings = {
            f"{name}_API_KEY": "sk-",  # Default API key placeholder
            f"{name}_BASE_URL": url,
            f"{name}_MODEL": list(models.values())[0],
            f"{name}_EMBEDDING_MODEL": list(embedding_models.values())[0],
        }
        super().__init__(env_file, default_settings)
        self.name = name
        self.models = models
        self.embedding_models = embedding_models
        self._load_llm_settings()

    def _load_llm_settings(self):
        """Load settings with the possibility of default values if not present in .env."""
        self.api_key = self.get_setting(f"{self.name}_API_KEY")
        self.base_url = self.get_setting(f"{self.name}_BASE_URL")
        self.model = self.models.get(
            self.get_setting(f"{self.name}_MODEL"), list(self.models.values())[0]
        )
        self.embedding_model = self.embedding_models.get(
            self.get_setting(f"{self.name}_EMBEDDING_MODEL"),
            list(self.embedding_models.values())[0],
        )
