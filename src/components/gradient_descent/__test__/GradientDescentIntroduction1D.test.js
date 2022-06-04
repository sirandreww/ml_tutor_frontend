import { render, screen} from '@testing-library/react';
import GradientDescentIntroduction1D from '../GradientDescentIntroduction1D';

describe('Gradient Descent 1D Introduction Rendering', () => {

    it("Should have header with 'Gradient descent 1D' as value", () => {
        render(<GradientDescentIntroduction1D/>);
        let header = screen.getByTestId("header");
        expect(header).toBeTruthy();
    })

    it("Should render 'how to' section", () => {
        render(<GradientDescentIntroduction1D/>);
        let header = screen.getByTestId("howto");
        expect(header).toBeTruthy();
    })

    it("Should render 'definition' section", () => {
        render(<GradientDescentIntroduction1D/>);
        let header = screen.getByTestId("definitions");
        expect(header).toBeTruthy();
    })

    it("Should render 'step' calculations section", () => {
        render(<GradientDescentIntroduction1D/>);
        let header = screen.getByTestId("steps");
        expect(header).toBeTruthy();
    })
})