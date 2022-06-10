/* eslint-disable */
import {fireEvent, render, screen} from '@testing-library/react';
import LogisticRegressionHyperParameter from '../LogisticRegressionHyperParameter'

describe('Testing Logistic Regression Hype-rParameter Page', () => {
    it("Should render proper user inputs with default values",  () => {
        render(<LogisticRegressionHyperParameter />);

        let noiInput = screen.getByTestId("noiInput")
        let alphaInput = screen.getByTestId("alphaInput")
        let trainPercentageInput = screen.getByTestId("trainPercentageInput")

        expect(noiInput).toBeTruthy();
        expect(noiInput.querySelectorAll('input')[0].value).toBe('10')
        expect(alphaInput).toBeTruthy();
        expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.05')
        expect(trainPercentageInput).toBeTruthy();
        expect(trainPercentageInput.querySelectorAll('input')[0].value).toBe('0.3')
    })
    it('Should change when the user enters new input', () => {
        render(<LogisticRegressionHyperParameter />);

        let noiInput = screen.getByTestId("noiInput").querySelectorAll('input')[0]
        let alphaInput = screen.getByTestId("alphaInput").querySelectorAll('input')[0]
        let trainPercentageInput = screen.getByTestId("trainPercentageInput").querySelectorAll('input')[0]

        fireEvent.change(noiInput, { target: { value:  20} })
        fireEvent.change(alphaInput, { target: { value:  0.001} })
        fireEvent.change(trainPercentageInput, { target: { value:  0.1} })

        expect(noiInput.value).toBe('20')
        expect(alphaInput.value).toBe('0.001')
        expect(trainPercentageInput.value).toBe('0.1')
    })
})