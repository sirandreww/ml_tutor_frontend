/* eslint-disable */
import {getByTestId, render} from '@testing-library/react';
import GradientDescentIntroduction1D from '../../components/gradient_descent/GradientDescentIntroduction1D';

// description(<String>, <Function>) method is a way to group bunch of test which fit under the same suite case
describe('Gradient Descent 1D Introduction Rendering', () => {

    it("Should have header with 'Gradient descent 1D' as value", () => {
        let { getByTestId } = render(<GradientDescentIntroduction1D/>);
        let header = getByTestId("header");
        expect(header).toBeTruthy();

    })

    it("Should render 'how to' section", () => {
        let { getByTestId } = render(<GradientDescentIntroduction1D/>);
        let header = getByTestId("howto");
        expect(header).toBeTruthy();

    })

    it("Should render 'definition' section", () => {
        let { getByTestId } = render(<GradientDescentIntroduction1D/>);
        let header = getByTestId("definitions");
        expect(header).toBeTruthy();

    })

    it("Should render 'step' calculations section", () => {
        let { getByTestId } = render(<GradientDescentIntroduction1D/>);
        let header = getByTestId("steps");
        expect(header).toBeTruthy();

    })
})