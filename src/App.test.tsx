import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';

test('renders learn react link', async () => {
    const { getByText } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const user = userEvent.setup();

    // verify page content for expected route after navigating
    await user.click(screen.getByText(/^Counter$/i));
    expect(getByText(/learn/i)).toBeInTheDocument();
});
