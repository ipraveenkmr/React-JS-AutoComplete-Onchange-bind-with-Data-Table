import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const baseURL = "https://jsonplaceholder.typicode.com/posts/";
  const [rows, setRows] = useState("");

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setRows(response.data);
      console.log(response.data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {rows ? (
        <Card sx={{ minWidth: 900, m: 8 }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Body</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="start">{row.title}</TableCell>
                          <TableCell align="start">{row.body}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Card>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
