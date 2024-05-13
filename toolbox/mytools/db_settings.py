import toolbox.mytools.user_settings


class DBSettings(toolbox.mytools.user_settings.UserSettings):
    def __init__(
        self,
        env_file=".env",
        name="MONGO_DB",
        conn_string="mongodb://localhost:27017",
        database_name="my_collection",
    ):
        default_settings = {
            "CONNECTION_STRING": conn_string,
            "DATABASE_NAME": database_name,
        }
        super().__init__(env_file, default_settings, name)
        self.conn_string = conn_string
        self.database_name = database_name
        self._load_mongo_db_settings()

    def _load_mongo_db_settings(self):
        """Load settings with the possibility of default values if not present in .env."""
        self.conn_string = self.get_setting("CONNECTION_STRING")
        self.database_name = self.get_setting("DATABASE_NAME")
