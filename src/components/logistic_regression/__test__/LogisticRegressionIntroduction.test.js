/* eslint-disable */
import {  render, screen } from '@testing-library/react';
import LogisticRegressionIntroduction from '../LogisticRegressionIntroduction'

describe('Testing Logistic Regression Introduction', () => {
    it("Should render proper user inputs with default values",  () => {
        render(<LogisticRegressionIntroduction />);

        let w1Input = screen.getByTestId("w1Input")
        let x1Input = screen.getByTestId("x1Input")
        let bInput = screen.getByTestId("bInput")

        expect(w1Input).toBeTruthy();
        expect(w1Input.querySelectorAll('input')[0].value).toBe('')
        expect(x1Input).toBeTruthy();
        expect(x1Input.querySelectorAll('input')[0].value).toBe('')
        expect(bInput).toBeTruthy();
        expect(bInput.querySelectorAll('input')[0].value).toBe('')
    })
})