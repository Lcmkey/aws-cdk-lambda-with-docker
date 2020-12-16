 
import faker from "faker";

type lambdaHandlerFuncType = (event: any, context: any) => Promise<any>;

export const handler: lambdaHandlerFuncType = async (event: any, context: any) => {
    const result = faker.helpers.createCard();
    
    return result;
}