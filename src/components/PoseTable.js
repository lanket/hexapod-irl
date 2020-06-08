import React from "react"
import numeral from "numeral"
import ReactMarkdown from "react-markdown"
import { POSITION_NAMES_LIST } from "../hexapod"

const POSITION_ALIAS = {
    rightMiddle: "rm",
    rightFront: "rf",
    leftFront: "lf",
    leftMiddle: "lm",
    leftBack: "lb",
    rightBack: "rb",
}

const formatPose = pose =>
    POSITION_NAMES_LIST.reduce((formattedPose, position) => {
        const alias = POSITION_ALIAS[position]
        const { alpha, beta, gamma } = pose[position]
        formattedPose[alias] = {
            alpha: numeral(alpha).format("+000.00"),
            beta: numeral(beta).format("+000.00"),
            gamma: numeral(gamma).format("+000.00"),
        }
        return formattedPose
    }, {})

const poseMessage = ({ rm, rf, lf, lm, lb, rb }) => `

| POSITION    | ALPHA       | BETA        | GAMMA       |
|-------------|:-----------:|:-----------:|:-----------:|
| rightMiddle | ${rm.alpha} | ${rm.beta}  | ${rm.gamma} |
| rightFront  | ${rf.alpha} | ${rf.beta}  | ${rf.gamma} |
| leftFront   | ${lf.alpha} | ${lf.beta}  | ${lf.gamma} |
| leftMiddle  | ${lm.alpha} | ${lm.beta}  | ${lm.gamma} |
| leftBack    | ${lb.alpha} | ${lb.beta}  | ${lb.gamma} |
| rightBack   | ${rb.alpha} | ${rb.beta}  | ${rb.gamma} |

`

const poseTable = ({ pose }) => {
    const formattedPose = formatPose(pose)
    const { rm, rf, lf, lm, lb, rb } = formattedPose
    console.log(formattedPose)
    const markdownMessage = poseMessage({ rm, rf, lf, lm, lb, rb })
    console.log(markdownMessage)
    return (
        <div className="table-container">
            <div className="cell" style={{}}>
                <ReactMarkdown source={markdownMessage} />
            </div>
        </div>
    )
}

export default poseTable
