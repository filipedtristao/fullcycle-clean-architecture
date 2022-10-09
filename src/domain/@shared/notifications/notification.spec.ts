import Notification from "./notification";

describe(Notification, () => {
    it('should create errors', () => {
        const notification = new Notification();
        const error1 = {
            message: 'error message',
            context: 'customer'
        }
        const error2 = {
            message: 'error message 2',
            context: 'customer'
        }

        notification.addError(error1);

        expect(notification.messages('customer')).toEqual('customer: error message');

        notification.addError(error2);

        expect(notification.messages('customer')).toEqual('customer: error message,customer: error message 2');

        const error3 = {
            message: 'error message 3',
            context: 'order'
        }

        notification.addError(error3);

        expect(notification.messages('customer')).toEqual('customer: error message,customer: error message 2');
        expect(notification.messages('order')).toEqual('order: error message 3');
        expect(notification.messages()).toEqual('customer: error message,customer: error message 2,order: error message 3');
    });

    it('should check if has errors', () => {
        const notification = new Notification();
        const error1 = {
            message: 'error message',
            context: 'customer'
        }

        expect(notification.hasErrors()).toBeFalsy();

        notification.addError(error1);

        expect(notification.hasErrors()).toBeTruthy();
    });

    it('should get errors', () => {
        const notification = new Notification();
        const error1 = {
            message: 'error message',
            context: 'customer'
        }
        const error2 = {
            message: 'error message 2',
            context: 'customer'
        }

        notification.addError(error1);
        notification.addError(error2);

        expect(notification.getErrors('customer')).toEqual([error1, error2]);
    });
});