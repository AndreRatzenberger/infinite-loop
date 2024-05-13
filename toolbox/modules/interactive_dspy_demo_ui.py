import streamlit as st

from toolbox.mytools.interactive_dspy_demo import InteractiveDSPyDemo


class InteractiveDSPyDemoUi:
    def __init__(self, llm: str, mode=1):
        self.dspy_demo = InteractiveDSPyDemo(llm)
        self.mode = mode

    def renderMode1(self):
        st.write("Signature in '->' format: ")
        signature = st.text_input(
            "Signature",
            value="subject -> title, subtitle, blog_outline",
            placeholder="Enter your signature",
        )
        values = st.text_input(
            "Inputs - Comma seperated according to your signature:",
            value="Cats",
            placeholder="Enter your inputs",
        )
        st.code(self.dspy_demo.generateCode(signature, values))
        if st.button("Generate"):
            result = self.dspy_demo.executeSignature1Code(signature, values)
            st.write(result[0])
            st.write(result[1])

    def render(self):
        if self.mode == 1:
            self.renderMode1()
