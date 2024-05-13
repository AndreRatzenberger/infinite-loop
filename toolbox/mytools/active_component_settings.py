import toolbox.mytools.user_settings


class ActiveComponentSettings(toolbox.mytools.user_settings.UserSettings):
    def __init__(
        self,
        env_file=".env",
        llm="OPEN_AI",
        doc_store="MONGO_DB",
        name="ACTIVE",
    ):
        default_settings = {
            "LLM": llm,
            "DOC_STORE": doc_store,
        }
        super().__init__(env_file, default_settings, name)
        self._llm = llm
        self._doc_store = doc_store
        self._load_my_settings()

    def _load_my_settings(self):
        """Load settings with the possibility of default values if not present in .env."""
        self._llm = self.get_setting("LLM")
        self._doc_store = self.get_setting("DOC_STORE")

    @property
    def llm(self):
        return self._llm

    @llm.setter
    def llm(self, value):
        self._llm = value
        self.set_setting("LLM", value)

    @property
    def doc_store(self):
        return self._doc_store

    @doc_store.setter
    def doc_store(self, value):
        self._doc_store = value
        self.set_setting("DOC_STORE", value)
