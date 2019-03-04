import { DisposeBag } from '../src';
import { expect } from 'chai';
import { Subscription } from 'rxjs';

describe('DisposeBag', () => {
    it('should unsubscribe subscription', () => {
        const disposeBag = new DisposeBag();

        const subscription = new Subscription();

        disposeBag.add(subscription);
        disposeBag.unsubscribe();
        expect(subscription.closed).to.equal(true);
    });

    it('should unsubscribe named subscription', () => {
        const disposeBag = new DisposeBag();

        const subscription = new Subscription();

        disposeBag.add(subscription, 'subscription');
        disposeBag.unsubscribe('subscription');
        expect(subscription.closed).to.equal(true);
    });

    it('should unsubscribe multiple subscriptions', () => {
        const disposeBag = new DisposeBag();

        const firstSubscription = new Subscription();
        const secondSubscription = new Subscription();

        disposeBag.add(firstSubscription);
        disposeBag.add(secondSubscription, 'subscription');

        disposeBag.unsubscribe();

        expect(firstSubscription.closed).to.equal(true);
        expect(secondSubscription.closed).to.equal(true);
    });
});
