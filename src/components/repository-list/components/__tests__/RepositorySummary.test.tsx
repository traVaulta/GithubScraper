import React from 'react';
import {render} from '@testing-library/react';

import {RepositorySummary} from '../repository-summary';

describe(`${RepositorySummary.name}`, () => {
    it('should pass', () => {
        const repositoryDTO = {
            name: 'AwesomeReactRepo',
            url: 'https://github.com/react/master'
        };
        const {getByText} = render(<RepositorySummary repositorySummary={repositoryDTO}/>);
        const element = getByText(/react/i);
        expect(element).toBeInTheDocument();
    });
});
