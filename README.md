# dispose-bag

A simple container for RxJs [Subcriptions](https://rxjs-dev.firebaseapp.com/api/index/class/Subscription).
It provides an easy way to unsubscribe from multiple subscriptions.

## Installation

````sh
    npm i dispose-bag
````

## Usage

```ts
     const disposeBag = new DisposeBag();
    
     const firstSubscription = new Subscription();
     const secondSubscription = new Subscription();
     
     disposeBag.add(firstSubscription);
     disposeBag.add(secondSubscription, 'subscription');
     
     disposeBag.unsubscribe();
```

Add subscription by call `disposeBag.add(subscription)`. Also you can add
named subscription by `disposeBag.add(secondSubscription, 'subscription')`.

Call `disposeBag.unsubscribe()` to dispose of the resources held by all subscriptions in the bag.