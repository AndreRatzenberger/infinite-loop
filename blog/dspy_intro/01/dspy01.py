import dspy
import os

llm = dspy.OpenAI(
    model="gpt-3.5-turbo", api_key=os.getenv("OPENAI_API_KEY"), max_tokens=4000
)

dspy.settings.configure(lm=llm)

print("----------------------")
predictor = dspy.Predict("question -> answer")
print(predictor(question="What is a transformer model?"))
print("----------------------")

print("----------------------")
predictor = dspy.Predict("idea -> projectplan")
print(predictor(idea="A webshop with flask"))
print("----------------------")

print("----------------------")
predictor = dspy.Predict("subject -> title, subtitle, blog_outline")
print(predictor(subject="Cats"))
print("----------------------")


class BasicBlogGenerator(dspy.Signature):
    subject = dspy.InputField()
    title = dspy.OutputField()
    subtitles = dspy.OutputField()
    blog_outline = dspy.OutputField()


generate_blog = dspy.Predict(BasicBlogGenerator)

subject = "Cats (use dry-humor and sarcasm)"
pred = generate_blog(subject=subject)

print(f"Subject:\n{subject}")
print(f"Title:\n{pred.title}")
print(f"Subtitles:\n{pred.subtitles}")
print(f"Outline:\n{pred.blog_outline}")
