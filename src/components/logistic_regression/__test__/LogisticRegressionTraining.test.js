/* eslint-disable */
import {fireEvent, render, screen} from '@testing-library/react';
import LogisticRegressionTraining from "../LogisticRegressionTraining";

describe('Testing Logistic Regression Training Page', () => {
    it('Should render page with default values', () => {
       render(<LogisticRegressionTraining />)

       let x11Input = screen.getByTestId("x11Input")
       let x21Input = screen.getByTestId("x21Input")
       let x12Input = screen.getByTestId("x12Input")
       let x22Input = screen.getByTestId("x22Input")
       let c1Input = screen.getByTestId("c1Input")
       let c2Input = screen.getByTestId("c2Input")
       let alphaInput = screen.getByTestId("alphaInput")
       let ysResult = screen.getByTestId("ysResult")
       let wsResult = screen.getByTestId("wsResult")
       let bResult = screen.getByTestId("bResult")
       let lossResult = screen.getByTestId("lossResult")


        expect(x11Input).toBeTruthy();
        expect(x11Input.querySelectorAll('input')[0].value).toBe('')
        expect(x21Input).toBeTruthy();
        expect(x21Input.querySelectorAll('input')[0].value).toBe('')
        expect(x12Input).toBeTruthy();
        expect(x12Input.querySelectorAll('input')[0].value).toBe('')
        expect(x22Input).toBeTruthy();
        expect(x22Input.querySelectorAll('input')[0].value).toBe('')
        expect(c1Input).toBeTruthy();
        expect(c1Input.querySelectorAll('input')[0].value).toBe('')
        expect(c2Input).toBeTruthy();
        expect(c2Input.querySelectorAll('input')[0].value).toBe('')
        expect(alphaInput).toBeTruthy();
        expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.01')
        // expect(ysResult).toBeTruthy();
        // expect(ysResult.querySelectorAll('input')[0].value).toBe('0.01')
        // expect(wsResult).toBeTruthy();
        // expect(wsResult.querySelectorAll('input')[0].value).toBe('0.01')
        // expect(bResult).toBeTruthy();
        // expect(bResult.querySelectorAll('input')[0].value).toBe('0.01')
        // expect(lossResult).toBeTruthy();
        // expect(lossResult.querySelectorAll('input')[0].value).toBe('0.01')
    })
    it('Should calculate training phase correctly', () => {
        render(<LogisticRegressionTraining />)

        let x11Input = screen.getByTestId("x11Input").querySelectorAll('input')[0]
        let x21Input = screen.getByTestId("x21Input").querySelectorAll('input')[0]
        let x12Input = screen.getByTestId("x12Input").querySelectorAll('input')[0]
        let x22Input = screen.getByTestId("x22Input").querySelectorAll('input')[0]
        let c1Input = screen.getByTestId("c1Input").querySelectorAll('input')[0]
        let c2Input = screen.getByTestId("c2Input").querySelectorAll('input')[0]
        let alphaInput = screen.getByTestId("alphaInput").querySelectorAll('input')[0]
        let ysResult = screen.getByTestId("ysResult")
        let wsResult = screen.getByTestId("wsResult")
        let bResult = screen.getByTestId("bResult")
        let lossResult = screen.getByTestId("lossResult")

        fireEvent.change(x11Input, { target: { value: 1 } })
        fireEvent.change(x21Input, { target: { value: 0 } })
        fireEvent.change(x12Input, { target: { value: 0 } })
        fireEvent.change(x22Input, { target: { value: 1 } })
        fireEvent.change(c1Input, { target: { value: 1 } })
        fireEvent.change(c2Input, { target: { value: 0 } })
        fireEvent.change(alphaInput, { target: { value: 0.005 } })

        expect(x11Input.value).toBe('1')
        expect(x21Input.value).toBe('0')
        expect(x12Input.value).toBe('0')
        expect(x22Input.value).toBe('1')
        expect(c1Input.value).toBe('1')
        expect(c2Input.value).toBe('0')
        expect(alphaInput.value).toBe('0.005')
        expect(ysResult.textContent).toBe('[1, 0 ]')
        expect(wsResult.textContent).toBe('[0.0025, -0.0025]')
        expect(bResult.textContent).toBe('0')
        expect(lossResult.textContent).toBe('0.6931471805599453')
    })
})