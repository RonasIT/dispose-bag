# dispose-bag

A simple container for RxJs [Subcriptions](https://rxjs-dev.firebaseapp.com/api/index/class/Subscription).
It provides an easy way to unsubscribe from multiple subscriptions.

## Installation

````sh
    npm i dispose-bag
````

## Usage

### Basic usage

```ts
     const disposeBag = new DisposeBag();
    
     const subscription = new Subscription();
     
     disposeBag.add(subscription);
     
     disposeBag.unsubscribe();
```

Add subscription by call `disposeBag.add(subscription)`.
Call `disposeBag.unsubscribe()` to dispose of the resources held by all subscriptions in the bag. 

```ts
     const disposeBag = new DisposeBag();
    
     const subscription = new Subscription();
     
     disposeBag.add(subscription, 'subscription');
     
     disposeBag.unsubscribe('subscription');
```

Also you can add named subscription by `disposeBag.add(secondSubscription, 'subscription')`
and you can unsubscribe named subscription by `disposeBag.unsubscribe('subscription')`.


### Angular usage

Implement base component like this:

```ts
     export class BaseComponent implements OnDestroy {
       protected disposeBag: DisposeBag;
     
       constructor() {
         this.disposeBag = new DisposeBag();
       }
     
       public ngOnDestroy(): void {
         this.disposeBag.unsubscribe();
       }
     }
```

Extend your components by `BaseComponent`.

```ts
    export class AccountOwnerAircraftsItemsComponent extends BaseComponent implements OnInit {
```

And work with `Observable` like this:

```ts
    public ngOnInit(): void {
        this.disposeBag.add(
          this.aircraftsService
            .aircraftsLoaded
            .subscribe((aircrafts) => {
              this.aircrafts = aircrafts;
              this.loading = false;
            })
        );
    
        this.disposeBag.add(
          this.aircraftsService
            .aircraftsPageChanged
            .subscribe((page) => this.currentPage = page)
        );
    
        this.disposeBag.add(
          this.aircraftsService
            .aircraftsTotalItemsChanged
            .subscribe((totalItems) => this.totalItems = totalItems)
        );
    }
```

So you don't need manually unsubscribe in `ngOnDestroy` like this:

```ts
 public ngOnDestroy(): void {
    if (this.aircraftsLoadedSubscription) {
      this.aircraftsLoadedSubscription.unsubscribe();
    }

    if (this.aircraftsPageChangedSubscription) {
      this.aircraftsPageChangedSubscription.unsubscribe();
    }

    if (this.aircraftsTotalItemsChangedSubscription) {
      this.aircraftsTotalItemsChangedSubscription.unsubscribe();
    }

    if (this.aircraftDeletedSubscription) {
      this.aircraftDeletedSubscription.unsubscribe();
    }

    if (this.paginationPageChangedSubscription) {
      this.paginationPageChangedSubscription.unsubscribe();
    }
  }
```
