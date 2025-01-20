export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">        
            <h4>Assignment Name</h4>
        </label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" rows={15} cols={52} >
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points </label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label  htmlFor="wd-group">Assignment Group </label>
            </td>
            <td>
                <select id="wd-group">
                <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="EXAM">EXAM</option>
                </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as </label>
            </td>
            <td>
                <select id="wd-display-grade-as">
                <option selected value="PERCENTAGE">Percentage</option>
                <option value="POINTS">POINTS</option>
                </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type </label>
            </td>
            <td>
                <select id="wd-submission-type">
                <option selected value="ONLINE">Online</option>
                <option value="INPERSON">In-Person</option>
                </select><br/><br/>
                <label>Online Entry Options</label><br/>
                <input type="checkbox" name="entry-options" id="wd-text-entry"/>
                <label htmlFor="wd-text-entry">Text Entry</label><br/>
                <input type="checkbox" name="entry-options" id="wd-website-url"/>
                <label htmlFor="wd-website-url">Website URL</label><br/>
                <input type="checkbox" name="entry-options" id="wd-media-recordings"/>
                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                <input type="checkbox" name="entry-options" id="wd-student-annotation"/>
                <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                <input type="checkbox" name="entry-options" id="wd-file-upload"/>
                <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label>Assign </label>
            </td>
            <td>
                <label htmlFor="wd-assign-to">Assign to </label><br />
                <input id="wd-assign-to" value="Everyone" /><br /><br />
                <label htmlFor="wd-due-date"> Due </label><br/>
                <input type="date" value="2024-05-13" id="wd-due-date"/><br/><br/>
                <table>
                    <tr>
                        <td>
                        <label htmlFor="wd-available-from"> Available from </label><br/>
                        <input type="date" value="2024-05-06" id="wd-available-from"/><br/><br/>
                        </td>
                        <td>
                        <label htmlFor="wd-available-until"> Until </label><br/>
                        <input type="date" value="2024-05-20" id="wd-available-until"/><br/><br/>
                        </td>
                    </tr>
                </table>
            </td>
          </tr>

        </table>
        <hr />
        <div style={{ textAlign: 'right' }}>
            <button className="btn btn-cancel">Cancel</button>
            <button className="btn btn-save">Save</button>
        </div><br/><br/>
      </div>
  );}
  