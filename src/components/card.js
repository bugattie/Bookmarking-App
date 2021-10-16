import React from "react"
import { Box, Button, Card, CardActions, CardContent } from "@material-ui/core"

import * as homeStyles from "../styles/home.module.scss"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { bookmarkQuery } from "../pages/index"

const deleteBookmarkMutation = gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id) {
      id
    }
  }
`

const CustomCard = ({ id, url, title }) => {
  const [deleteBookmark] = useMutation(deleteBookmarkMutation)

  const deleteCall = id => {
    deleteBookmark({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: bookmarkQuery }],
    })
  }

  return (
    <Box className={homeStyles.box_style}>
      <Card className={homeStyles.card_style}>
        <CardContent>
          <div className={homeStyles.content}>
            <h2>Bookmark Title:</h2>
            <p>{title}</p>
          </div>
          <div className={homeStyles.content}>
            <h2>Bookmark URL:</h2>
            <p>{url}</p>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained" className={homeStyles.btn_secondary}>
            Visit the Bookmark
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={homeStyles.btn_secondary}
            onClick={() => deleteCall(id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default CustomCard
