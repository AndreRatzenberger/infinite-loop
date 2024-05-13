import toolbox.mytools.user_settings


class MongoDBSettings(toolbox.mytools.user_settings.UserSettings):
    def __init__(
        self,
        env_file=".env",
        name="MONGO_DB",
        conn_string="mongodb://localhost:27017",
        database_name="my_collection",
    ):
        default_settings = {
            f"{name}_CONNECTION_STRING": "mongodb://localhost:27017",
            f"{name}_DATABASE_NAME": "my_collection",
        }
        super().__init__(env_file, default_settings)
        self.name = name
        self.conn_string = conn_string
        self.database_name = database_name
        self._load_mongo_db_settings()

    def _load_mongo_db_settings(self):
        """Load settings with the possibility of default values if not present in .env."""
        self.conn_string = self.get_setting(f"{self.name}_CONNECTION_STRING")
        self.database_name = self.get_setting(f"{self.name}_DATABASE_NAME")
