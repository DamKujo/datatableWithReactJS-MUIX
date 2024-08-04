import React, { useEffect, useState } from "react";
import { DataGrid} from '@mui/x-data-grid';
import ModalWindow from "./ModalWindow";

export default function Table(){
    const [titles, setTitles] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'X-API-KEY': 'KW6GGWZ-8YYMSTG-MYGJYDQ-X6K1MM9'}
    };
    
    useEffect(() => {
        fetch('https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&rating.kp=7.2-10&ratingMpaa=&genres.name=%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5', options)
        .then(response => response.json())
        .then(response => setTitles(response.docs))
        .catch(err => console.error(err));
    }, [])

    const rows = titles.map((title) => ({
        id: title.id,
        col1: title.name,
        col2: title.year,
        imageUrl: title.poster.url,
        col4: title.description,
    }));

    
    const columns = [
        { 
            field: 'col1', 
            headerName: 'Название', 
            width: 250,
            renderCell: (params) => (
                <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                    {params.value}
                </div>
            )
        },
        { 
            field: 'col2', 
            headerName: 'Год выпуска', 
            width: 150,
            renderCell: (params) => (
                <div style={{ fontStyle: 'italic', color: '#2196F3' }}>
                    {params.value}
                </div>
            ), 
        },
        {
            field: 'imageUrl',
            headerName: "Image",
            width: 150,
            renderCell: (params) => (
                <img src={params.value} alt="Image" style={{ width: '150px', cursor: 'pointer' }} onClick={() => handleOpen(params.value)}></img>
            ),
        },
        { 
            field: 'col4', 
            headerName: 'Описание', 
            width: '100%',
            renderCell: (params) => (
                <div style={{ color: '#FF5722', textAlign: 'justify' }}>
                    {params.value}
                </div>
            ), 
        },
    ];
    
    const handleOpen = (imageUrl) => {
        setModalImage(imageUrl);
        setModalIsOpen(true)
    }

    const handleClose = () => {
        setModalImage(null);
        setModalIsOpen(false);
    }

    return(
        <div style={{ height: 500, width: '100%'}}>
            <DataGrid 
            getRowHeight={() => 'auto'} style={{ marginLeft: '30px', marginRight: '150px', marginTop: '130px'}} 
            rows={rows} 
            columns={columns}
            sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'primary.light',
                height: '100%',
                backgroundColor: 'white',
                color:'black',
                '& .MuiTablePagination-root': {
                    backgroundColor: 'lightblue', 
                },
                '& .MuiTablePagination-selectLabel': {
                    color: 'white', 
                },
                '& .MuiTablePagination-displayedRows': {
                    color: 'red', 
                } 
              }}
            />
            <ModalWindow isOpen={modalIsOpen} onClose={handleClose}>
                <img width={350} height={470} src={modalImage}/>
            </ModalWindow>
        </div>
    );
};