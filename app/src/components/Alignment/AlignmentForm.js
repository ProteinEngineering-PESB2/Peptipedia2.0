import axios from 'axios'

import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../../context/AppContext'
import { ALIGNMENT } from '../../context/AppConstants'
import { blastText, blastFile, msaText, msaFile } from '../../services/alignments'

const AlignmentForm = () => {
  const [alignmentType, setAlignmentType] = useState("blast");
  const [fileOption, setFileOption] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const { dispatch } = useContext(AppContext)

  const onChangeAlignmentType = (e) => {
    setAlignmentType(e.target.value);
  };

  const onChangeFileOption = (e) => {
    setFileOption(e.target.value);
    setTextInput("");
    setFileInput(null);
  };

  const onChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const onChangeFileInput = (e) => {
    setFileInput(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let result = []
    let res
    let post

    setLoading(true)

    if (fileOption === "text") {
        post = {
            data: textInput
        }
    } else if (fileOption === "file") {
        post = new FormData()
        post.append("file", fileInput)
    }

    if (alignmentType === "blast") {
      if (fileOption === "text") {
        res = await blastText(post)
      } else if (fileOption === "file") {
        res = await blastFile(post)
      }

      const { path } = res

      const { data } = await axios.get(path)

      dispatch({
        type: ALIGNMENT,
        payload: {
          alignmentType: "blast",
          data
        }
      })

      setLoading(false)
      navigate("/dashboard")
    } else if (alignmentType === "msa") {
      if (fileOption === "text") {
        res = await msaText(post)
      } else if (fileOption === "file") {
        res = await msaFile(post)
      }

      res.map((data) => {
        result.push({
          id: data.id,
          label: `${data.label.substring(0, 12)}`,
          sequence: data.sequence
        })
      })

      dispatch({
        type: ALIGNMENT,
        payload: {
          alignmentType: "msa",
          data: result
        }
      })

      setLoading(false)
      navigate("/dashboard")
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="radio-file-type" className="form-label">
          Alignment Type
        </label>
        <div className="col-12 col-sm-6 col-md-8 col-lg-5 d-flex justify-content-around bg-light p-2">
          <div className="form-check form-check-inline" id="radio-file-type">
            <input
              type="radio"
              className="form-check-input"
              id="radioBlast"
              value="blast"
              checked={alignmentType === "blast" ? true : false}
              onChange={onChangeAlignmentType}
            />
            <label className="form-check-label" htmlFor="radioText">
              Blast
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="radioMSA"
              value="msa"
              checked={alignmentType === "msa" ? true : false}
              onChange={onChangeAlignmentType}
            />
            <label className="form-check-label" htmlFor="radioFile">
              MSA
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="radio-file-type" className="form-label">
          File Type
        </label>
        <div className="col-12 col-sm-6 col-md-8 col-lg-5 d-flex justify-content-around bg-light p-2">
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="radioText"
              value="text"
              checked={fileOption === "text" ? true : false}
              onChange={onChangeFileOption}
            />
            <label className="form-check-label" htmlFor="radioText">
              Text
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="radioFile"
              value="file"
              checked={fileOption === "file" ? true : false}
              onChange={onChangeFileOption}
            />
            <label className="form-check-label" htmlFor="radioFile">
              File
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        {fileOption === "text" ? (
          <div className="mb-3">
            <label htmlFor="textInput" className="form-label">
              Enter the Amino Acid sequences
            </label>
            <textarea
              className="form-control"
              id="textInput"
              rows={6}
              placeholder="Ingresa secuencias fasta"
              onChange={onChangeTextInput}
            ></textarea>
          </div>
        ) : (
          <div className="col-md-9">
            <div className="mb-3">
              <label htmlFor="fileInput" className="form-label">
                Enter the Amino Acid sequences
              </label>
              <input
                type="file"
                className="form-control"
                id="fileInput"
                onChange={onChangeFileInput}
              />
            </div>
          </div>
        )}
        <div className="row mt-2">
          <div className="col-12">
            {loading ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  (textInput === "") & (fileInput === null) ? true : false
                }
              >
                RUN ALIGNMENT
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AlignmentForm;
