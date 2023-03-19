import {Provider} from 'react-redux';
import {store} from '../redux/store';

export const ReduxStoreProviderDecorator = (story: any) => {
    return (
        <Provider store={store}>
            {story()}
        </Provider>
    )
}
