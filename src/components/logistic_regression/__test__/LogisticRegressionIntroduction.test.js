/* eslint-disable */
import {fireEvent, render, screen} from '@testing-library/react';
import LogisticRegressionIntroduction from '../LogisticRegressionIntroduction'

describe('Testing Logistic Regression Introduction Page', () => {
    it("Should render proper user inputs with default values",  () => {
        render(<LogisticRegressionIntroduction />);

        let w1Input = screen.getByTestId("w1Input")
        let x1Input = screen.getByTestId("x1Input")
        let bInput = screen.getByTestId("bInput")
        let result = screen.getByTestId("result")

        expect(w1Input).toBeTruthy();
        expect(w1Input.querySelectorAll('input')[0].value).toBe('')
        expect(x1Input).toBeTruthy();
        expect(x1Input.querySelectorAll('input')[0].value).toBe('')
        expect(bInput).toBeTruthy();
        expect(bInput.querySelectorAll('input')[0].value).toBe('')
        expect(result).toBeTruthy();
        expect(result.textContent).toBe('0.5');
    })
    it("Should calculate proper sigmoid function",  () => {
        render(<LogisticRegressionIntroduction />);

        let w1Input = screen.getByTestId("w1Input").querySelectorAll('input')[0]
        let x1Input = screen.getByTestId("x1Input").querySelectorAll('input')[0]
        let bInput = screen.getByTestId("bInput").querySelectorAll('input')[0]
        let result = screen.getByTestId("result")

        fireEvent.change(w1Input, { target: { value:  111} })
        fireEvent.change(x1Input, { target: { value:  -0.009} })
        fireEvent.change(bInput, { target: { value:  1} })
        expect(Number(result.textContent).toFixed(3)).toBe('0.500')
    })
})