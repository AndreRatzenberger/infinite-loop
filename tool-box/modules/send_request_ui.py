from openai import OpenAI
import streamlit as st


class SendRequestUi:
    def __init__(self, settings):
        self.settings = settings

    def render(self):
        """Render the UI components for API interaction."""
        st.write(f"### Send a request to {self.settings.name}")
        user_input = st.text_input("Enter your query here:")
        if st.button("Send Request"):
            self.send_request(user_input)

    def send_request(self, user_input):
        """Send a request to the API using the configured settings."""
        api_key = self.settings.get_setting(f"{self.settings.name}_API_KEY")
        base_url = self.settings.get_setting(f"{self.settings.name}_BASE_URL")
        model = self.settings.get_setting(f"{self.settings.name}_MODEL")

        client = OpenAI(api_key=api_key)

        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input},
            ],
        )
        if result := response.choices[0].message.content:
            st.success(f"Response: {result}")
        else:
            st.error("Failed to send request :(")
