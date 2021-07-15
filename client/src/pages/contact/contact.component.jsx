import React from "react";
import "./contact.styles.scss";

const Contact = () => (
  <div>
    <table className="contact">
      <tbody>
        <tr>
          <td className="item">
            you can contact me at <strong>abhinavy14@gmail.com</strong>
          </td>
          <td className="item">
            you can see my projects at{" "}
            <strong>
              <a href="https://github.com/code-here">Github</a>
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Contact;
