# lunchpoller

A Simple Lunch Poller

## Use Cases

1. Create Poll: `POST /polls`; Only one Poll active per day; A restaurant can only be chosen once per week (remove it from the available options)
1. Cast Vote: `POST /polls/{poll_id}/vote`; `user_name` and `restaurant_id`; Can only cast a single vote per day (Poll)
1. See result: `GET /polls/{poll_id}`; Shows current status of the Poll

## Restaurant data

The restaurant data will be pre-loaded as follows:

1. China Dragon
1. Joe's Burguer
1. Vegan Castle
1. Bella Pasta
1. Brazillian Steak
1. Outback Flavors

And can be retrieved by `GET /restaurants`