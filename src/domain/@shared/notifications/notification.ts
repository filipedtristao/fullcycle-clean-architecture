export interface NotificationErrorProps {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];
    
    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }
    
    getErrors(context?: string) {
        return this.errors
            .filter((error) => !context || error.context === context);
    }

    hasErrors(context?: string) {
        return this.errors
            .filter((error) => !context || error.context === context)
            .length > 0;
    }

    messages(context?: string) {
        return this.errors
            .filter((error) => !context || error.context === context)
            .map((error) => `${error.context}: ${error.message}`)
            .join(',');
    }
}