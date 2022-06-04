import { render, screen } from '@testing-library/react';
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

describe("Testing Gradient Descent Pages", () => {

    describe("Visualization page", () => {
        describe("When page renders", () => {
            it("Should render proper user inputs",  () => {
                render(visualizationPage());

                expect(screen.getByTestId("funInput")).toBeTruthy();
                expect(screen.getByTestId("alphaInput")).toBeTruthy();
                expect(screen.getByTestId("xInput")).toBeTruthy();
                expect(screen.getByTestId("stepPerSecondInput")).toBeTruthy();
                expect(screen.getByTestId("dfResult")).toBeTruthy();
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
                it("Should update function", () => {})
                it("Should update alpha", () => {})
                it("Should update x0", () => {})
                it("Should update steps per second", () => {})
                it("Should calculate df correctly", () => {})
            })
            describe("When user click buttons", () => {

            })
        })
    })

    describe("Step By Step Page", () => {
        describe("When page renders", () => {
            it("Should render proper user inputs",  () => {
                render(stepByStepPage());

                expect(screen.getByTestId("funInput")).toBeTruthy();
                expect(screen.getByTestId("alphaInput")).toBeTruthy();
                expect(screen.getByTestId("xInput")).toBeTruthy();
                expect(screen.getByTestId("dfResult")).toBeTruthy();
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
            it("Should render proper user inputs",  () => {
                render(hyperParameterPage());

                expect(screen.getByTestId("funInput")).toBeTruthy();
                expect(screen.getByTestId("alphaInput")).toBeTruthy();
                expect(screen.getByTestId("xInput")).toBeTruthy();
                expect(screen.getByTestId("stepPerSecondInput")).toBeTruthy();
                expect(screen.getByTestId("dfResult")).toBeTruthy();
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