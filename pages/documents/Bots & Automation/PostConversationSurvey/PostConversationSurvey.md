---
pagename: Post-Conversation Survey bot
categoryName: Getting started
subCategoryName: Post-conversation surveys
indicator: messaging
subtitle: Getting feedback from your consumers on their experiences with your brand
level3: Getting started
permalink: ai-bots-automation-post-conversation-surveys-post-conversation-survey-bot.html
isTutorial: true
isNew: false
date: 2020-08-12 14:03:55 +0000
redirect_from:

---

## What's a post-conversation survey bot?
 
A post-conversation survey bot is a bot that is triggered at the end of a conversation with an agent or custom bot. It allows you to obtain feedback from the consumer on the consumer's experience with your brand.

<img style="width:400px" src="img/surveyBot_example.png">

Overall, survey bots are a great way to measure agent/bot and skill performance and to identify opportunities to improve on your quality targets.

Survey bots have special, predefined interactions for capturing standard survey metrics:

* Net Promoter Score (NPS)
* Customer Satisfaction (CSAT)
* First Contact Resolution (FCR)

These survey metrics are captured in Conversational Cloud and exposed via the [Analytics Builder](data-reporting-analytics-builder-analytics-builder-overview.html) application. You'll find this information in the predefined [Survey Dashboard for Messaging](data-reporting-messaging-messaging-dashboards-survey-dashboard-for-messaging.html), which you can use out-of-the-box or manipulate to create customized reports.

You can also use the bot's standard interactions to ask questions that reflect your brand's key performance indicators and other free-text questions.
  
{: .important}
To use survey bots created in Conversation Builder, you must be on the LivePerson platform, i.e., you log into Conversation Builder via single sign-on through Conversational Cloud. This feature isn't supported on the AWS platform where you log into Conversation Builder directly.<br><br>
Survey bots are supported only in Messaging, not in Live Chat.

## NPS metrics
 
Use the predefined Net Promoter Score (NPS) interaction for capturing the consumer's response to a standard NPS question: *Based on your experience today, how likely are you to recommend us to a friend or colleague?* This is a great way to measure the consumer's overall satisfaction with and loyalty to your brand.

<img style="width:600px" src="img/surveyBot_nps.png">

## CSAT metrics

Use the predefined Customer Satisfaction (CSAT) interaction for capturing the consumer's reponse to a standard CSAT question: *How would you rate your satisfaction with the service you received?* Like the NPS interaction, this is great way to measure the consumer's overall satisfaction.
 
<img style="width:600px" src="img/surveyBot_csat.png">

## FCR interaction

Use the predefined First Contact Resolution (FCR) interaction for capturing the consumer's opinion on whether their inquiry was resolved: *Were you able to resolve your inquiry today?* Feedback on this can help you to measure agent/bot and skill performance and to identify opportunities to improve on your quality targets.

<img style="width:600px" src="img/surveyBot_fcr.png">
 
## Building a survey bot

You use Conversation Builder to create survey bots, which allows you to use the same, familiar tool that use to create custom bots. This makes the process quicker and more efficient.

See [here](https://developers.liveperson.com/conversation-builder-bots-post-conversation-survey-bots.html) in the Developer Center for information on how to build a survey bot using Conversation Builder.

## Tips on writing effective survey questions

When defining survey questions, keep these basic guidelines in mind:

* Keep the questions simple, clear and specific. 
* Avoid using jargon and double negatives.
* Make sure a question asks about only one thing.
* Don’t ask the same question more than once.
* Make most questions optional using the survey interaction's “skip” feature.
* Avoid leading questions that suggest an answer or convey an opinion, e.g., “How great was your experience today?”
* Make sure the answer choices are balanced and objective, i.e., don’t include just answer choices that reflect a positive opinion, also include those that don’t. 
* Minimize the use of open-ended questions that require free text responses, as these require more effort from the consumer.

## Migrating from Bot Studio to Conversation Builder

If you're already using [survey bots created in Bot Studio](ai-bots-automation-post-conversation-surveys-legacy-post-conversation-survey-bot.html), but you want to migrate to using Conversation Builder, see [here](ai-bots-automation-post-conversation-surveys-migrating-from-bot-studio-to-conversation-builder.html) for information on how to make the switch.