import { Box, Button, Card, CardActions, CardContent } from "@material-ui/core"
import React from "react"
import Swal from "sweetalert2"

import "../styles/global.scss"
import * as homeStyles from "../styles/home.module.scss"

export default function Home() {
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
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ]
      },
    })
  }

  return (
    <>
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
          <Box className={homeStyles.box_style}>
            <Card className={homeStyles.card_style}>
              <CardContent>
                <div className={homeStyles.content}>
                  <h2>Bookmark Title:</h2>
                  <p>Google</p>
                </div>
                <div className={homeStyles.content}>
                  <h2>Bookmark URL:</h2>
                  <p>www.google.com</p>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  className={homeStyles.btn_secondary}
                  onClick={openForm}
                >
                  Visit the Bookmark
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={homeStyles.btn_secondary}
                  onClick={openForm}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Box>
        </div>
      </div>
    </>
  )
}
