import React from "react"
import { useMutation, useQuery } from "@apollo/client"
import { Button, CircularProgress } from "@material-ui/core"
import gql from "graphql-tag"
import Swal from "sweetalert2"

import CustomCard from "../components/card"

import "../styles/global.scss"
import * as homeStyles from "../styles/home.module.scss"

export const bookmarkQuery = gql`
  {
    bookmarks {
      id
      title
      url
    }
  }
`

const addBookmarkMutation = gql`
  mutation addBookmark($url: String!, $title: String!) {
    addBookmark(url: $url, title: $title) {
      title
      url
    }
  }
`

const Home = () => {
  const { loading, error, data } = useQuery(bookmarkQuery)
  const [addBookmark] = useMutation(addBookmarkMutation)

  const openForm = async () => {
    await Swal.fire({
      title: "Add Bookmark",
      html:
        '<input validationMessage="Adresse e-mail invalide" placeholder="Bookmark Title" id="swal-input1" class="swal2-input">' +
        '<input placeholder="URL" id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      confirmButtonText: "Add Bookmark",
      showCancelButton: true,
      preConfirm: () => {
        addBookmark({
          variables: {
            title: document.getElementById("swal-input1").value,
            url: document.getElementById("swal-input2").value,
          },
          refetchQueries: [{ query: bookmarkQuery }],
        })
      },
    })
  }

  if (loading) {
    return (
      <div className={homeStyles.progress}>
        <CircularProgress color="secondary" />
      </div>
    )
  }

  if (error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    })
  }

  return (
    <React.Fragment>
      <div className={homeStyles.header_section}>
        <div className={homeStyles.container}>
          <div className={homeStyles.title}>
            <h1>Bookmark App</h1>
            <p>This App let you save your Bookmark for free</p>
          </div>
          <Button
            variant="contained"
            className={homeStyles.btn}
            onClick={openForm}
          >
            Add Bookmark
          </Button>
        </div>
      </div>

      <div className={homeStyles.main_section}>
        <div className={homeStyles.main_container}>
          <h2>My Bookmarks</h2>
          {data.bookmarks.map(bookmark => {
            return (
              <CustomCard
                id={bookmark.id}
                title={bookmark.title}
                url={bookmark.url}
                key={bookmark.title}
              />
            )
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
