/* eslint-disable */
import {  render, screen } from '@testing-library/react';
import GradientDescentGenericPage1D from "../GradientDescentGenericPage1D";

const visualizationPage = () => {
    return(
        <GradientDescentGenericPage1D
            alphaType='input'
            buttonsType='playGround'
            generateQuestionTable={false}
        />
    )
}
const stepByStepPage = () => {
    return (
        <GradientDescentGenericPage1D
            alphaType='input'
            buttonsType='stepByStep'
            generateQuestionTable={true}
        />
    )
}
const hyperParameterPage = () => {
    return (
        <GradientDescentGenericPage1D
            alphaType='slider'
            buttonsType='hyperParameter'
            generateQuestionTable={false}
        />
    )
}

describe("Testing Gradient Descent 1D Pages", () => {

    describe("Visualization page", () => {
        describe("When page renders", () => {
            it("Should render proper user inputs with default values",  () => {
                render(visualizationPage());

                let funInput = screen.getByTestId("funInput")
                let alphaInput = screen.getByTestId("alphaInput")
                let xInput = screen.getByTestId("xInput")
                let stepPerSecondInput = screen.getByTestId("stepPerSecondInput")
                let dfResult = screen.getByTestId("dfResult")

                expect(funInput).toBeTruthy();
                expect(funInput.querySelectorAll('input')[0].value).toBe('x^2')
                expect(alphaInput).toBeTruthy();
                expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.1')
                expect(xInput).toBeTruthy();
                expect(xInput.querySelectorAll('input')[0].value).toBe('-1')
                expect(stepPerSecondInput).toBeTruthy();
                expect(stepPerSecondInput.querySelectorAll('input')[0].value).toBe('1')
                expect(dfResult).toBeTruthy();
                expect(dfResult.querySelectorAll('input')[0].value).toBe('2 * x')
            })
            it("Should render proper user buttons", () => {
                render(visualizationPage())

                expect(screen.getByTestId("playButton")).toBeTruthy();
                expect(screen.getByTestId("stopButton")).toBeTruthy();
                expect(screen.getByTestId("pauseButton")).toBeTruthy();
            })
        })
        describe("When handling events", () => {
            describe("When user enters input", () => {

            })
            describe("When user click buttons", () => {

            })
        })
    })

    describe("Step By Step Page", () => {
        describe("When page renders", () => {
            it("Should render proper user inputs with default values",  () => {
                render(stepByStepPage());

                let funInput = screen.getByTestId("funInput")
                let alphaInput = screen.getByTestId("alphaInput")
                let xInput = screen.getByTestId("xInput")
                let dfResult = screen.getByTestId("dfResult")

                expect(funInput).toBeTruthy();
                expect(funInput.querySelectorAll('input')[0].value).toBe('x^2')
                expect(alphaInput).toBeTruthy();
                expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.1')
                expect(xInput).toBeTruthy();
                expect(xInput.querySelectorAll('input')[0].value).toBe('-1')
                expect(dfResult).toBeTruthy();
                expect(dfResult.querySelectorAll('input')[0].value).toBe('2 * x')
            })
            it("Should render proper user buttons", () => {
                render(stepByStepPage())

                expect(screen.getByTestId("prevButton")).toBeTruthy();
                expect(screen.getByTestId("stopButton")).toBeTruthy();
                expect(screen.getByTestId("nextButton")).toBeTruthy();
            })
        })
    })

    describe("Hyper-Parameter Page", () => {
        describe("When page renders", () => {
            it("Should render proper user inputs with default values",  () => {
                render(hyperParameterPage());

                let funInput = screen.getByTestId("funInput")
                let alphaInput = screen.getByTestId("alphaInput")
                let xInput = screen.getByTestId("xInput")
                let stepPerSecondInput = screen.getByTestId("stepPerSecondInput")
                let dfResult = screen.getByTestId("dfResult")

                expect(funInput).toBeTruthy();
                expect(funInput.querySelectorAll('input')[0].value).toBe('x^2')
                expect(alphaInput).toBeTruthy();
                expect(alphaInput.querySelectorAll('input')[0].value).toBe('0.1')
                expect(xInput).toBeTruthy();
                expect(xInput.querySelectorAll('input')[0].value).toBe('-1')
                expect(stepPerSecondInput).toBeTruthy();
                expect(stepPerSecondInput.querySelectorAll('input')[0].value).toBe('1')
                expect(dfResult).toBeTruthy();
                expect(dfResult.querySelectorAll('input')[0].value).toBe('2 * x')
            })
            it("Should render proper user buttons", () => {
                render(hyperParameterPage())

                expect(screen.getByTestId("playButton")).toBeTruthy();
                expect(screen.getByTestId("stopButton")).toBeTruthy();
                expect(screen.getByTestId("pauseButton")).toBeTruthy();
            })
        })
    })
})