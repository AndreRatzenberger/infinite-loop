import os
from dotenv import load_dotenv, dotenv_values


class UserSettings:
    def __init__(self, env_file=".env", default_settings=None, name=None):
        if default_settings is None:
            default_settings = {}
        self.name = name
        self._name = f"{name}_" if name else ""
        self.env_file = env_file
        # load all as env variables
        load_dotenv(env_file)
        # load all as dictionary
        self._cache = dotenv_values(env_file)
        # add default settings
        self.default_settings = default_settings
        # updates default dictionaty with prefix
        self._update_defaults()
        # add default settings to settings
        self._update_cache()

    def _update_defaults(self):
        if not self.default_settings:
            self.default_settings = dict(
                {k: v for k, v in self._cache.items() if self._name in k}
            )
        else:
            self.default_settings = dict(
                {
                    self._name + k: v
                    for k, v in self.default_settings.items()
                    if self._name not in k
                }
            )

    def _update_cache(self):
        """Ensure all default settings are present."""
        if not os.path.exists(self.env_file):
            with open(self.env_file, "a") as f:
                for key, value in self.default_settings.items():
                    f.write(f"{key}={value}\n")
        self._cache.update(
            {k: v for k, v in self.default_settings.items() if k not in self._cache}
        )

    def get_setting(self, key):
        """Get a setting value by key from the cached settings."""
        if self._name in key:
            return self._cache.get(key, self.default_settings.get(key))
        else:
            return self._cache.get(
                self._name + key, self.default_settings.get(self._name + key)
            )

    def set_setting(self, key, value):
        """Set a setting value by key and update the cache and the .env file."""
        if self._name in key:
            self._cache[key] = value
        else:
            self._cache[self._name + key] = value
        self._save_settings()

    def _save_settings(self):
        """Explicitly save all cached settings to the .env file."""
        with open(self.env_file, "w") as f:
            for key, value in self._cache.items():
                f.write(f"{key}={value}\n")
