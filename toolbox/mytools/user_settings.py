import os
from dotenv import load_dotenv, dotenv_values


class UserSettings:
    def __init__(self, env_file=".env", default_settings=None, name=None):
        if default_settings is None:
            default_settings = {}
        self.env_file = env_file
        load_dotenv(env_file)
        self._settings = dotenv_values(env_file)
        self.default_settings = default_settings
        self.name = name
        self._name = f"{name}_" if name else ""
        self._load_settings()

    def _load_settings(self):
        """Ensure all default settings are present."""
        if not os.path.exists(self.env_file):
            with open(self.env_file, "a") as f:
                for key, value in self.default_settings.items():
                    f.write(f"{self._name}{key}={value}\n")
        self._settings.update(
            {
                self._name + k: v
                for k, v in self.default_settings.items()
                if self._name + k not in self._settings
            }
        )

    def get_setting(self, key):
        """Get a setting value by key from the cached settings."""
        return self._settings.get(
            self._name + key, self.default_settings.get(self._name + key)
        )

    def set_setting(self, key, value):
        """Set a setting value by key and update the cache and the .env file."""
        self._settings[self._name + key] = value
        self._save_settings()

    def _save_settings(self):
        """Explicitly save all cached settings to the .env file."""
        with open(self.env_file, "w") as f:
            for key, value in self._settings.items():
                f.write(f"{key}={value}\n")
