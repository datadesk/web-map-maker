{
    "version": 8,
    "name": "Quiet LA",
    "metadata": {
        "mapbox:groups": {
            "1444849364238.8171": {
                "name": "Buildings",
                "collapsed": true
            },
            "1444849354174.1904": {
                "name": "Tunnels",
                "collapsed": true
            },
            "1444849320558.5054": {
                "name": "Water labels",
                "collapsed": false
            },
            "1444849371739.5945": {
                "name": "Aeroways",
                "collapsed": true
            },
            "1444849258897.3083": {
                "name": "Marine labels",
                "collapsed": true
            },
            "1444849388993.3071": {
                "name": "Landuse",
                "collapsed": true
            },
            "1444849242106.713": {
                "name": "Country labels",
                "collapsed": false
            },
            "1444849382550.77": {
                "name": "Water",
                "collapsed": true
            },
            "1444849345966.4436": {
                "name": "Roads",
                "collapsed": true
            },
            "1444849307123.581": {
                "name": "Admin labels",
                "collapsed": false
            },
            "1444849272561.29": {
                "name": "Place labels",
                "collapsed": false
            },
            "1444849290021.1838": {
                "name": "Road labels",
                "collapsed": false
            },
            "1444849334699.1902": {
                "name": "Bridges",
                "collapsed": true
            },
            "1444849297111.495": {
                "name": "POI labels",
                "collapsed": true
            }
        }
    },
    "sources": {
        "mapbox": {
            "url": "mapbox://mapbox.mapbox-streets-v6",
            "type": "vector"
        },
        "mapbox://latimesmapping.2d8suk1o": {
            "url": "mapbox://latimesmapping.2d8suk1o",
            "type": "vector"
        }
    },
    "sprite": "mapbox://sprites/latimesmapping/cih6hi2uq00bua0m3scl3fszx",
    "glyphs": "mapbox://fonts/latimesmapping/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "#efebe7"
            },
            "interactive": true
        },
        {
            "id": "landuse_park",
            "type": "fill",
            "source": "mapbox",
            "source-layer": "landuse",
            "filter": [
                "==",
                "class",
                "park"
            ],
            "paint": {
                "fill-color": "#e1e3da"
            },
            "metadata": {
                "mapbox:group": "1444849388993.3071"
            },
            "interactive": true
        },
        {
            "id": "landuse_cemetery",
            "type": "fill",
            "source": "mapbox",
            "source-layer": "landuse",
            "filter": [
                "==",
                "class",
                "cemetery"
            ],
            "paint": {
                "fill-color": "#e4e5dc"
            },
            "metadata": {
                "mapbox:group": "1444849388993.3071"
            },
            "interactive": true
        },
        {
            "id": "landuse_hospital",
            "type": "fill",
            "source": "mapbox",
            "source-layer": "landuse",
            "filter": [
                "==",
                "class",
                "hospital"
            ],
            "paint": {
                "fill-color": "rgba(232,227,232,1)"
            },
            "metadata": {
                "mapbox:group": "1444849388993.3071"
            },
            "interactive": true
        },
        {
            "id": "landuse_school",
            "type": "fill",
            "source": "mapbox",
            "source-layer": "landuse",
            "filter": [
                "==",
                "class",
                "school"
            ],
            "paint": {
                "fill-color": "#e8e3e8",
                "fill-outline-color": "rgba(241,240,250,1)",
                "fill-opacity": 0.55
            },
            "metadata": {
                "mapbox:group": "1444849388993.3071"
            },
            "interactive": true
        },
        {
            "id": "landuse_wood",
            "type": "fill",
            "source": "mapbox",
            "source-layer": "landuse",
            "filter": [
                "==",
                "class",
                "wood"
            ],
            "paint": {
                "fill-color": "#dee0d5",
                "fill-opacity": 0.1
            },
            "metadata": {
                "mapbox:group": "1444849388993.3071"
            },
            "interactive": true
        },
        {
            "interactive": true,
            "layout": {
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:group": "1444849382550.77"
            },
            "filter": [
                "all",
                [
                    "!=",
                    "class",
                    "river"
                ],
                [
                    "!=",
                    "class",
                    "stream"
                ],
                [
                    "!=",
                    "class",
                    "canal"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "waterway",
            "paint": {
                "line-color": "#C3D5DD",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            },
            "source-layer": "waterway"
        },
        {
            "interactive": true,
            "layout": {
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:group": "1444849382550.77"
            },
            "filter": [
                "==",
                "class",
                "river"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "waterway_river",
            "paint": {
                "line-color": "#C3D5DD",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            11,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            },
            "source-layer": "waterway"
        },
        {
            "interactive": true,
            "layout": {
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:group": "1444849382550.77"
            },
            "filter": [
                "in",
                "class",
                "stream",
                "canal"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "waterway_stream_canal",
            "paint": {
                "line-color": "#C3D5DD",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            },
            "source-layer": "waterway"
        },
        {
            "id": "water",
            "type": "fill",
            "source": "mapbox",
            "source-layer": "water",
            "paint": {
                "fill-color": "#C3D5DD"
            },
            "metadata": {
                "mapbox:group": "1444849382550.77"
            },
            "interactive": true
        },
        {
            "id": "water_offset",
            "paint": {
                "fill-color": "white",
                "fill-opacity": 0.1,
                "fill-translate": [
                    0,
                    2.5
                ]
            },
            "metadata": {
                "mapbox:group": "1444849382550.77"
            },
            "interactive": true,
            "ref": "water"
        },
        {
            "id": "water_pattern",
            "paint": {
                "fill-translate": [
                    0,
                    2.5
                ],
                "fill-pattern": "wave",
                "fill-opacity": 0
            },
            "metadata": {
                "mapbox:group": "1444849382550.77"
            },
            "interactive": true,
            "ref": "water"
        },
        {
            "interactive": true,
            "minzoom": 11,
            "metadata": {
                "mapbox:group": "1444849371739.5945"
            },
            "filter": [
                "==",
                "$type",
                "Polygon"
            ],
            "type": "fill",
            "source": "mapbox",
            "id": "aeroway_fill",
            "paint": {
                "fill-color": "#ddd",
                "fill-opacity": 0.7
            },
            "source-layer": "aeroway"
        },
        {
            "interactive": true,
            "minzoom": 11,
            "metadata": {
                "mapbox:group": "1444849371739.5945"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "type",
                    "runway"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "aeroway_runway",
            "paint": {
                "line-color": "#ddd",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            11,
                            3
                        ],
                        [
                            20,
                            16
                        ]
                    ]
                }
            },
            "source-layer": "aeroway"
        },
        {
            "interactive": true,
            "minzoom": 11,
            "metadata": {
                "mapbox:group": "1444849371739.5945"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "type",
                    "taxiway"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "aeroway_taxiway",
            "paint": {
                "line-color": "#ddd",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            11,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            },
            "source-layer": "aeroway"
        },
        {
            "id": "building",
            "type": "fill",
            "source": "mapbox",
            "source-layer": "building",
            "paint": {
                "fill-color": "rgba(222,222,222,0.76)",
                "fill-outline-color": "rgba(0,0,0,0)"
            },
            "metadata": {
                "mapbox:group": "1444849364238.8171"
            },
            "interactive": true
        },
        {
            "id": "building_top",
            "paint": {
                "fill-color": "rgba(230,230,230,1)",
                "fill-opacity": {
                    "base": 1,
                    "stops": [
                        [
                            15,
                            0
                        ],
                        [
                            16,
                            1
                        ]
                    ]
                },
                "fill-translate": {
                    "stops": [
                        [
                            15,
                            [
                                0,
                                0
                            ]
                        ],
                        [
                            16,
                            [
                                -2,
                                -2
                            ]
                        ]
                    ],
                    "base": 1
                },
                "fill-outline-color": "rgba(222,217,213,0)",
                "fill-translate-anchor": "viewport"
            },
            "metadata": {
                "mapbox:group": "1444849364238.8171"
            },
            "interactive": true,
            "ref": "building"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "filter": [
                "==",
                "class",
                "motorway_link"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "tunnel_motorway_link_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-dasharray": [
                    0.5,
                    0.25
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            20,
                            13
                        ]
                    ]
                }
            },
            "source-layer": "tunnel"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "filter": [
                "==",
                "class",
                "service"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "tunnel_service_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-dasharray": [
                    0.5,
                    0.25
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1
                        ],
                        [
                            16,
                            4
                        ],
                        [
                            20,
                            11
                        ]
                    ]
                }
            },
            "source-layer": "tunnel"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "filter": [
                "in",
                "class",
                "street",
                "street_limited"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "tunnel_street_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-dasharray": [
                    0.5,
                    0.25
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            0.5
                        ],
                        [
                            13,
                            1
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                },
                "line-opacity": {
                    "stops": [
                        [
                            12,
                            0
                        ],
                        [
                            12.5,
                            1
                        ]
                    ]
                }
            },
            "source-layer": "tunnel"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "filter": [
                "==",
                "class",
                "main"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "tunnel_main_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-dasharray": [
                    0.5,
                    0.25
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.1
                        ],
                        [
                            6,
                            0.2
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            },
            "source-layer": "tunnel"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "filter": [
                "==",
                "class",
                "motorway"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "tunnel_motorway_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-dasharray": [
                    0.5,
                    0.25
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.6
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            },
            "source-layer": "tunnel"
        },
        {
            "id": "tunnel_path",
            "type": "line",
            "source": "mapbox",
            "source-layer": "tunnel",
            "filter": [
                "==",
                "class",
                "path"
            ],
            "paint": {
                "line-color": "#cba",
                "line-dasharray": [
                    1.5,
                    0.75
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1.2
                        ],
                        [
                            20,
                            4
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "interactive": true
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "id": "tunnel_motorway_link",
            "paint": {
                "line-color": "#d6d6d0",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12.5,
                            0
                        ],
                        [
                            13,
                            1.5
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                }
            },
            "ref": "tunnel_motorway_link_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "id": "tunnel_service",
            "paint": {
                "line-color": "#d6d6d0",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15.5,
                            0
                        ],
                        [
                            16,
                            2
                        ],
                        [
                            20,
                            7.5
                        ]
                    ]
                }
            },
            "ref": "tunnel_service_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "id": "tunnel_street",
            "paint": {
                "line-color": "#d6d6d0",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            13.5,
                            0
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            },
            "ref": "tunnel_street_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "id": "tunnel_main",
            "paint": {
                "line-color": "#d6d6d0",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            14
                        ]
                    ]
                }
            },
            "ref": "tunnel_main_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "id": "tunnel_motorway",
            "paint": {
                "line-color": "#d6d6d0",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            },
            "ref": "tunnel_motorway_casing"
        },
        {
            "id": "tunnel_major_rail",
            "type": "line",
            "source": "mapbox",
            "source-layer": "tunnel",
            "filter": [
                "==",
                "class",
                "major_rail"
            ],
            "paint": {
                "line-color": "#bbb",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "interactive": true
        },
        {
            "id": "tunnel_major_rail_hatching",
            "paint": {
                "line-color": "#bbb",
                "line-dasharray": [
                    0.2,
                    8
                ],
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14.5,
                            0
                        ],
                        [
                            15,
                            3
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "interactive": true,
            "ref": "tunnel_major_rail"
        },
        {
            "interactive": true,
            "minzoom": 12,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "filter": [
                "==",
                "class",
                "motorway_link"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road_motorway_link_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            20,
                            13
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "road"
        },
        {
            "interactive": true,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "filter": [
                "==",
                "class",
                "service"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road_service_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1
                        ],
                        [
                            16,
                            4
                        ],
                        [
                            20,
                            11
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "road"
        },
        {
            "interactive": true,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "class",
                    "street",
                    "street_limited"
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road_street_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            0.5
                        ],
                        [
                            13,
                            1
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "road"
        },
        {
            "interactive": true,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "filter": [
                "==",
                "class",
                "main"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road_main_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.1
                        ],
                        [
                            6,
                            0.2
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "road"
        },
        {
            "interactive": true,
            "minzoom": 5,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "filter": [
                "==",
                "class",
                "motorway"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road_motorway_casing",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.6
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "road"
        },
        {
            "id": "road_path",
            "type": "line",
            "source": "mapbox",
            "source-layer": "road",
            "filter": [
                "==",
                "class",
                "path"
            ],
            "paint": {
                "line-color": "#c8c8c1",
                "line-dasharray": [
                    1,
                    1
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            13,
                            0.1
                        ],
                        [
                            14,
                            0.6
                        ],
                        [
                            15,
                            1
                        ],
                        [
                            16,
                            2
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "interactive": true
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "id": "road_motorway_link",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            8,
                            0.3
                        ],
                        [
                            9,
                            0.4
                        ],
                        [
                            12,
                            1
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            15,
                            3
                        ]
                    ]
                }
            },
            "ref": "road_motorway_link_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "id": "road_service",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            13,
                            0.1
                        ],
                        [
                            14,
                            0.2
                        ],
                        [
                            15,
                            0.6
                        ],
                        [
                            16,
                            0.8
                        ]
                    ]
                }
            },
            "ref": "road_service_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "id": "road_street",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            13,
                            0.15
                        ],
                        [
                            14,
                            0.3
                        ],
                        [
                            15,
                            0.9
                        ],
                        [
                            16,
                            1.2
                        ],
                        [
                            18,
                            2
                        ]
                    ]
                }
            },
            "ref": "road_street_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "id": "road_main",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            8,
                            0.3
                        ],
                        [
                            9,
                            0.4
                        ],
                        [
                            12,
                            0.5
                        ],
                        [
                            13,
                            1
                        ],
                        [
                            14,
                            1.3
                        ],
                        [
                            15,
                            5
                        ],
                        [
                            16,
                            8
                        ]
                    ]
                }
            },
            "ref": "road_main_casing"
        },
        {
            "interactive": true,
            "minzoom": 5,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    ">",
                    "osm_id",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road_motorway",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            8,
                            0.7
                        ],
                        [
                            10,
                            0.8
                        ],
                        [
                            11,
                            1.5
                        ],
                        [
                            12,
                            2
                        ],
                        [
                            13,
                            3.3
                        ],
                        [
                            14,
                            6
                        ],
                        [
                            15,
                            8
                        ],
                        [
                            16,
                            12
                        ]
                    ]
                }
            },
            "source-layer": "road"
        },
        {
            "interactive": true,
            "minzoom": 5,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "==",
                    "osm_id",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "road_interstate",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            3,
                            0
                        ],
                        [
                            6,
                            1
                        ],
                        [
                            10,
                            1.3
                        ],
                        [
                            11,
                            1.7
                        ],
                        [
                            12,
                            2
                        ],
                        [
                            13,
                            3.3
                        ],
                        [
                            14,
                            6
                        ],
                        [
                            15,
                            8
                        ],
                        [
                            16,
                            12
                        ]
                    ]
                }
            },
            "source-layer": "road"
        },
        {
            "id": "road_major_rail",
            "type": "line",
            "source": "mapbox",
            "source-layer": "road",
            "filter": [
                "==",
                "class",
                "major_rail"
            ],
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "interactive": true
        },
        {
            "id": "road_major_rail_hatching",
            "paint": {
                "line-color": "#c8c8c1",
                "line-dasharray": [
                    0.2,
                    8
                ],
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14.5,
                            0
                        ],
                        [
                            15,
                            3
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849345966.4436"
            },
            "interactive": true,
            "ref": "road_major_rail"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "filter": [
                "==",
                "class",
                "motorway_link"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge_motorway_link_casing",
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            20,
                            13
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "bridge"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "filter": [
                "==",
                "class",
                "motorway"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge_motorway_casing",
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.6
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "bridge"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "filter": [
                "==",
                "class",
                "service"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge_service_casing",
            "paint": {
                "line-color": "#cfcdca",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1
                        ],
                        [
                            16,
                            4
                        ],
                        [
                            20,
                            11
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "bridge"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "filter": [
                "in",
                "class",
                "street",
                "street_limited"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge_street_casing",
            "paint": {
                "line-color": "#cfcdca",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            12,
                            0.5
                        ],
                        [
                            13,
                            1
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "bridge"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "filter": [
                "==",
                "class",
                "main"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge_main_casing",
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.1
                        ],
                        [
                            6,
                            0.2
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                },
                "line-opacity": 0
            },
            "source-layer": "bridge"
        },
        {
            "interactive": true,
            "layout": {
                "line-cap": "butt"
            },
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "filter": [
                "==",
                "class",
                "path"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge_path",
            "paint": {
                "line-color": "#c8c8c1",
                "line-dasharray": [
                    1.5,
                    0.75
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1.2
                        ],
                        [
                            20,
                            4
                        ]
                    ]
                }
            },
            "source-layer": "bridge"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "filter": [
                "==",
                "class",
                "motorway_link"
            ],
            "type": "line",
            "source": "mapbox",
            "id": "bridge_motorway_link",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            8,
                            0.3
                        ],
                        [
                            9,
                            0.4
                        ],
                        [
                            12,
                            1
                        ],
                        [
                            14,
                            2
                        ],
                        [
                            15,
                            3
                        ]
                    ]
                }
            },
            "source-layer": "bridge"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "id": "bridge_service",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15.5,
                            0
                        ],
                        [
                            16,
                            2
                        ],
                        [
                            20,
                            7.5
                        ]
                    ]
                }
            },
            "ref": "bridge_service_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "id": "bridge_street",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            13.5,
                            0
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            },
            "ref": "bridge_street_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "id": "bridge_main",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            14
                        ]
                    ]
                }
            },
            "ref": "bridge_main_casing"
        },
        {
            "interactive": true,
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "id": "bridge_motorway",
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            8,
                            0.7
                        ],
                        [
                            10,
                            0.8
                        ],
                        [
                            11,
                            1.5
                        ],
                        [
                            12,
                            2
                        ],
                        [
                            13,
                            3.3
                        ],
                        [
                            14,
                            6
                        ],
                        [
                            15,
                            8
                        ],
                        [
                            16,
                            12
                        ]
                    ]
                }
            },
            "ref": "bridge_motorway_casing"
        },
        {
            "id": "bridge_major_rail",
            "type": "line",
            "source": "mapbox",
            "source-layer": "bridge",
            "filter": [
                "==",
                "class",
                "major_rail"
            ],
            "paint": {
                "line-color": "#c8c8c1",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "interactive": true
        },
        {
            "id": "bridge_major_rail_hatching",
            "paint": {
                "line-color": "#c8c8c1",
                "line-dasharray": [
                    0.2,
                    8
                ],
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14.5,
                            0
                        ],
                        [
                            15,
                            3
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849334699.1902"
            },
            "interactive": true,
            "ref": "bridge_major_rail"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849307123.581"
            },
            "filter": [
                "all",
                [
                    ">=",
                    "admin_level",
                    3
                ],
                [
                    "==",
                    "maritime",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin_level_3",
            "paint": {
                "line-color": "#ababab",
                "line-dasharray": [
                    3,
                    1,
                    1,
                    1
                ],
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            0.4
                        ],
                        [
                            5,
                            1
                        ],
                        [
                            12,
                            3
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:group": "1444849307123.581"
            },
            "filter": [
                "all",
                [
                    "==",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "disputed",
                    0
                ],
                [
                    "==",
                    "maritime",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin_level_2",
            "paint": {
                "line-color": "#ababab",
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            1.4
                        ],
                        [
                            5,
                            2
                        ],
                        [
                            12,
                            8
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {
            "interactive": true,
            "layout": {
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:group": "1444849307123.581"
            },
            "filter": [
                "all",
                [
                    "==",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "disputed",
                    1
                ],
                [
                    "==",
                    "maritime",
                    0
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin_level_2_disputed",
            "paint": {
                "line-color": "#9e9cab",
                "line-dasharray": [
                    2,
                    2
                ],
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            1.4
                        ],
                        [
                            5,
                            2
                        ],
                        [
                            12,
                            8
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {
            "interactive": true,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:group": "1444849307123.581"
            },
            "filter": [
                "all",
                [
                    ">=",
                    "admin_level",
                    3
                ],
                [
                    "==",
                    "maritime",
                    1
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin_level_3_maritime",
            "paint": {
                "line-color": "#a0c8f0",
                "line-opacity": 0,
                "line-dasharray": [
                    3,
                    1,
                    1,
                    1
                ],
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            0.4
                        ],
                        [
                            5,
                            1
                        ],
                        [
                            12,
                            3
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {
            "interactive": true,
            "layout": {
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:group": "1444849307123.581"
            },
            "filter": [
                "all",
                [
                    "==",
                    "admin_level",
                    2
                ],
                [
                    "==",
                    "maritime",
                    1
                ]
            ],
            "type": "line",
            "source": "mapbox",
            "id": "admin_level_2_maritime",
            "paint": {
                "line-color": "#a0c8f0",
                "line-opacity": 0,
                "line-width": {
                    "base": 1,
                    "stops": [
                        [
                            4,
                            1.4
                        ],
                        [
                            5,
                            2
                        ],
                        [
                            12,
                            8
                        ]
                    ]
                }
            },
            "source-layer": "admin"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-max-width": 5,
                "text-size": 12
            },
            "metadata": {
                "mapbox:group": "1444849320558.5054"
            },
            "filter": [
                "==",
                "$type",
                "Point"
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "water_label",
            "paint": {
                "text-color": "#757575",
                "text-halo-width": 0,
                "text-halo-color": "rgba(255,255,255,0.7)"
            },
            "source-layer": "water_label"
        },
        {
            "interactive": true,
            "minzoom": 18,
            "layout": {
                "icon-image": "{maki}-12",
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": "{name_en}",
                "text-max-width": 9,
                "text-padding": 2,
                "text-offset": [
                    0,
                    0.6
                ],
                "text-anchor": "top",
                "text-size": 10
            },
            "metadata": {
                "mapbox:group": "1444849297111.495"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "scalerank",
                    4
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "poi_label_4",
            "paint": {
                "text-color": "#666",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1,
                "text-halo-blur": 0.5,
                "icon-opacity": 0
            },
            "source-layer": "poi_label"
        },
        {
            "interactive": true,
            "minzoom": 17,
            "layout": {
                "icon-image": "{maki}-12",
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": "{name_en}",
                "text-max-width": 9,
                "text-padding": 2,
                "text-offset": [
                    0,
                    0.6
                ],
                "text-anchor": "top",
                "text-size": 11
            },
            "metadata": {
                "mapbox:group": "1444849297111.495"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "scalerank",
                    3
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "poi_label_3",
            "paint": {
                "text-color": "#666",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1,
                "text-halo-blur": 0.5,
                "icon-opacity": 0
            },
            "source-layer": "poi_label"
        },
        {
            "interactive": true,
            "minzoom": 16,
            "layout": {
                "icon-image": "{maki}-12",
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": "{name_en}",
                "text-max-width": 9,
                "text-padding": 2,
                "text-offset": [
                    0,
                    0.6
                ],
                "text-anchor": "top",
                "text-size": 12
            },
            "metadata": {
                "mapbox:group": "1444849297111.495"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "scalerank",
                    2
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "poi_label_2",
            "paint": {
                "text-color": "#666",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1,
                "text-halo-blur": 0.5,
                "icon-opacity": 0
            },
            "source-layer": "poi_label"
        },
        {
            "interactive": true,
            "minzoom": 14,
            "layout": {
                "icon-image": "{maki}-12",
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": "{name_en}",
                "text-max-width": 9,
                "text-padding": 2,
                "text-offset": [
                    0,
                    0.6
                ],
                "text-anchor": "top",
                "text-size": 12
            },
            "metadata": {
                "mapbox:group": "1444849297111.495"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "scalerank",
                    1
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "poi_label_1",
            "paint": {
                "text-color": "#666",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1,
                "text-halo-blur": 0.5,
                "text-opacity": 1,
                "icon-opacity": 0
            },
            "source-layer": "poi_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "symbol-placement": "line",
                "text-size": {
                    "stops": [
                        [
                            13,
                            10
                        ],
                        [
                            19,
                            12
                        ]
                    ]
                },
                "text-offset": [
                    0,
                    -0.7
                ],
                "symbol-spacing": 300,
                "text-letter-spacing": 0.1,
                "symbol-avoid-edges": false
            },
            "metadata": {
                "mapbox:group": "1444849290021.1838"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "in",
                    "class",
                    "street",
                    "street_limited",
                    "path",
                    "golf",
                    "service",
                    "driveway"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road_label_minor",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1,
                "text-halo-blur": 0.5
            },
            "source-layer": "road_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "symbol-placement": "line",
                "text-size": {
                    "stops": [
                        [
                            13,
                            10
                        ],
                        [
                            19,
                            13
                        ]
                    ]
                },
                "text-offset": [
                    0,
                    -0.7
                ],
                "symbol-spacing": 500,
                "text-letter-spacing": 0.1,
                "symbol-avoid-edges": false
            },
            "metadata": {
                "mapbox:group": "1444849290021.1838"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "street"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road_label main",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1,
                "text-halo-blur": 0.5
            },
            "source-layer": "road_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "symbol-placement": "line",
                "text-size": {
                    "stops": [
                        [
                            13,
                            12
                        ],
                        [
                            19,
                            15
                        ]
                    ]
                },
                "text-offset": [
                    0,
                    -0.7
                ],
                "symbol-spacing": 400,
                "text-letter-spacing": 0.1,
                "symbol-avoid-edges": false
            },
            "metadata": {
                "mapbox:group": "1444849290021.1838"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "class",
                    "main"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road_label major",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1,
                "text-halo-blur": 0.5
            },
            "source-layer": "road_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-size": 11,
                "icon-image": "state-other-{reflen}",
                "icon-rotation-alignment": "viewport",
                "symbol-spacing": 500,
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "symbol-placement": "line",
                "text-rotation-alignment": "viewport",
                "icon-size": 1.1,
                "text-field": "{ref}"
            },
            "metadata": {
                "mapbox:group": "1444849290021.1838"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "in",
                    "reflen",
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                [
                    "!in",
                    "shield",
                    "us-state",
                    "us-interstate",
                    "us-interstate-duplex",
                    "us-interstate-business",
                    "us-highway-alternate",
                    "us-highway-duplex",
                    "us-highway-business",
                    "us-interstate-truck",
                    "us-highway"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road_label_other_shields",
            "paint": {
                "text-color": "#757575"
            },
            "source-layer": "road_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-size": 11,
                "icon-image": "state-other-{reflen}",
                "icon-rotation-alignment": "viewport",
                "symbol-spacing": 500,
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "symbol-placement": "line",
                "text-rotation-alignment": "viewport",
                "icon-size": 1.1,
                "text-field": "{ref}"
            },
            "metadata": {
                "mapbox:group": "1444849290021.1838"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "in",
                    "reflen",
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                [
                    "==",
                    "shield",
                    "us-state"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road_label_state_highway_shields",
            "paint": {
                "text-color": "#757575"
            },
            "source-layer": "road_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-size": 11,
                "icon-image": "us-{reflen}",
                "icon-rotation-alignment": "viewport",
                "symbol-spacing": 500,
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "symbol-placement": "line",
                "text-rotation-alignment": "viewport",
                "icon-size": 1.1,
                "text-field": "{ref}"
            },
            "metadata": {
                "mapbox:group": "1444849290021.1838"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "in",
                    "reflen",
                    1,
                    2,
                    3
                ],
                [
                    "==",
                    "shield",
                    "us-highway"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road_label_us_highway_shields",
            "paint": {
                "text-color": "#757575"
            },
            "source-layer": "road_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-size": 11,
                "text-allow-overlap": false,
                "icon-image": "interstate-{reflen}",
                "icon-rotation-alignment": "viewport",
                "symbol-spacing": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            500
                        ],
                        [
                            10,
                            500
                        ],
                        [
                            22,
                            500
                        ]
                    ]
                },
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "icon-rotate": 0,
                "icon-allow-overlap": false,
                "symbol-placement": {
                    "base": 1,
                    "stops": [
                        [
                            0,
                            "point"
                        ],
                        [
                            10,
                            "point"
                        ],
                        [
                            11,
                            "line"
                        ],
                        [
                            22,
                            "line"
                        ]
                    ]
                },
                "text-rotation-alignment": "viewport",
                "icon-size": 1.1,
                "text-field": "{ref}",
                "icon-ignore-placement": false
            },
            "metadata": {
                "mapbox:group": "1444849290021.1838"
            },
            "filter": [
                "all",
                [
                    "==",
                    "class",
                    "motorway"
                ],
                [
                    "in",
                    "reflen",
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                [
                    "in",
                    "shield",
                    "us-interstate",
                    "us-interstate-duplex",
                    "us-interstate-business",
                    "us-interstate-truck"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "road_label_interstate_shields",
            "paint": {
                "text-color": "#757575",
                "icon-opacity": 0.8,
                "text-opacity": 1
            },
            "source-layer": "road_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-transform": "uppercase",
                "text-letter-spacing": 0.1,
                "text-field": "{name_en}",
                "text-max-width": 8,
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [
                            14,
                            9
                        ],
                        [
                            15,
                            14
                        ]
                    ]
                },
                "text-line-height": 1
            },
            "metadata": {
                "mapbox:group": "1444849272561.29"
            },
            "filter": [
                "all",
                [
                    "in",
                    "type",
                    "hamlet",
                    "suburb",
                    "neighbourhood"
                ],
                [
                    "!in",
                    "name",
                    "The Village Green",
                    "Ladera Heights",
                    "Windsor Hills",
                    "Hyde Park",
                    "Van Ness",
                    "View Park–Windsor Hills",
                    "View Park",
                    "Culver City",
                    "Palms",
                    "Del Rey",
                    "Culver Garden",
                    "Mar Vista",
                    "Marina del Rey",
                    "Venice",
                    "Playa Vista",
                    "Ocean Park",
                    "Hidden Hills",
                    "Moorpark Home Acres",
                    "West Hills",
                    "Agoura",
                    "Westwood",
                    "Brentwood",
                    "West Los Angeles",
                    "Century City",
                    "Westchester",
                    "Playa del Rey",
                    "Leimert Park",
                    "Hancock Park",
                    "Universal City",
                    "Hollywood Hills",
                    "Hollywood",
                    "Bicycle District",
                    "Carthay Circle",
                    "Koreatown",
                    "Jefferson Park",
                    "Echo Park",
                    "Silver Lake Heights",
                    "Atwater",
                    "Silver Lake",
                    "Highland Park",
                    "El Sereno",
                    "Lincoln Heights",
                    "La Crescenta",
                    "Lake View Terrace",
                    "Pacoima",
                    "Mission Hills",
                    "Sylmar",
                    "Granada Hills",
                    "Northridge",
                    "Chatsworth",
                    "Sunland",
                    "North Hollywood",
                    "Valley Village",
                    "Studio City",
                    "Montrose",
                    "Mayflower Village",
                    "Citrus",
                    "Charter Oak",
                    "Charter Oak Mobile Estates",
                    "Charter Oak Mobile Estates",
                    "Hacienda Heights",
                    "South San Jose Hills",
                    "Guasti",
                    "Rossmoor",
                    "Wilmington",
                    "Rancho Dominguez",
                    "Harbor City",
                    "Alondra Park",
                    "Lennox",
                    "Watts",
                    "Willowbrook",
                    "West Athens",
                    "Florence-Graham",
                    "West Compton",
                    "Florence",
                    "Wellington Heights",
                    "Woodland Hills",
                    "Tarzana",
                    "Pacific Palisades",
                    "Sherman Oaks",
                    "Encino",
                    "Van Nuys",
                    "Westmont",
                    "East Los Angeles",
                    "East La Mirada",
                    "Reseda",
                    "Canoga Park",
                    "Avocado Heights",
                    "West Whittier",
                    "South Whittier",
                    "West Puente Valley",
                    "West Anaheim",
                    "San Pedro",
                    "Winnetka",
                    "Boyle Heights",
                    "Brooklyn Heights",
                    "Eagle Rock",
                    "Cypress Park",
                    "Sawtelle",
                    "New Chinatown",
                    "Mount Washington",
                    "North Tustin",
                    "Emerald Bay"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_other",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1.2
            },
            "source-layer": "place_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-max-width": 8,
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [
                            14,
                            9
                        ],
                        [
                            15,
                            16
                        ]
                    ]
                },
                "symbol-avoid-edges": true,
                "text-ignore-placement": false,
                "text-allow-overlap": false,
                "text-line-height": 1
            },
            "metadata": {
                "mapbox:group": "1444849272561.29"
            },
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "village"
                ],
                [
                    "!in",
                    "name",
                    "The Village Green",
                    "Firestone Park",
                    "Topanga",
                    "Hidden Hills",
                    "Irwindale",
                    "Coto De Caza",
                    "Westlake Village"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_village",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1.2
            },
            "source-layer": "place_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-line-height": 1,
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [
                            10,
                            9
                        ],
                        [
                            15,
                            18
                        ]
                    ]
                },
                "text-allow-overlap": false,
                "symbol-avoid-edges": false,
                "text-ignore-placement": false,
                "text-transform": "uppercase",
                "text-font": [
                    "Open Sans Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name}",
                "text-max-width": 9
            },
            "metadata": {
                "mapbox:group": "1444849272561.29"
            },
            "filter": [
                "==",
                "$type",
                "Point"
            ],
            "type": "symbol",
            "source": "mapbox://latimesmapping.2d8suk1o",
            "id": "la_neighborhood_labels",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1.2
            },
            "source-layer": "l"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-max-width": 8,
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [
                            10,
                            12
                        ],
                        [
                            15,
                            24
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849272561.29"
            },
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "town"
                ],
                [
                    "!in",
                    "name",
                    "Agoura Hills",
                    "Calabasas"
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_town",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1.2
            },
            "source-layer": "place_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": "{name_en}",
                "text-max-width": 8,
                "text-size": {
                    "base": 1.2,
                    "stops": [
                        [
                            7,
                            14
                        ],
                        [
                            11,
                            18
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849272561.29"
            },
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "city"
                ],
                [
                    "!in",
                    "name",
                    "Malibu",
                    ""
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "place_label_city",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "#efebe7",
                "text-halo-width": 1.2
            },
            "source-layer": "place_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-letter-spacing": 0.2,
                "symbol-placement": "line",
                "text-size": {
                    "stops": [
                        [
                            3,
                            11
                        ],
                        [
                            4,
                            12
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849258897.3083"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    ">=",
                    "labelrank",
                    4
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_line_4",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 0,
                "text-halo-blur": 0.75,
                "text-opacity": 0.5
            },
            "source-layer": "marine_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-max-width": 6,
                "text-letter-spacing": 0.2,
                "symbol-placement": "point",
                "text-size": {
                    "stops": [
                        [
                            3,
                            11
                        ],
                        [
                            4,
                            12
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849258897.3083"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    ">=",
                    "labelrank",
                    4
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_4",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 0,
                "text-halo-blur": 0.75,
                "text-opacity": 0.5
            },
            "source-layer": "marine_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-letter-spacing": 0.2,
                "symbol-placement": "line",
                "text-size": {
                    "stops": [
                        [
                            3,
                            11
                        ],
                        [
                            4,
                            14
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849258897.3083"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "labelrank",
                    3
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_line_3",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 0,
                "text-halo-blur": 0.75,
                "text-opacity": 0.5
            },
            "source-layer": "marine_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-max-width": 5,
                "text-letter-spacing": 0.2,
                "symbol-placement": "point",
                "text-size": {
                    "stops": [
                        [
                            3,
                            11
                        ],
                        [
                            4,
                            14
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849258897.3083"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "labelrank",
                    3
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_3",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 0,
                "text-halo-blur": 0.75,
                "text-opacity": 0.5
            },
            "source-layer": "marine_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-letter-spacing": 0.2,
                "symbol-placement": "line",
                "text-size": {
                    "stops": [
                        [
                            3,
                            14
                        ],
                        [
                            4,
                            16
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849258897.3083"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "labelrank",
                    2
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_line_2",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 0,
                "text-halo-blur": 0.75,
                "text-opacity": 0.5
            },
            "source-layer": "marine_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-max-width": 5,
                "text-letter-spacing": 0.2,
                "symbol-placement": "point",
                "text-size": {
                    "stops": [
                        [
                            3,
                            14
                        ],
                        [
                            4,
                            16
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849258897.3083"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "labelrank",
                    2
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_point_2",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 0,
                "text-halo-blur": 0.75,
                "text-opacity": 0.5
            },
            "source-layer": "marine_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-letter-spacing": 0.2,
                "symbol-placement": "line",
                "text-size": {
                    "stops": [
                        [
                            3,
                            18
                        ],
                        [
                            4,
                            22
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849258897.3083"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "==",
                    "labelrank",
                    1
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_line_1",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 0,
                "text-halo-blur": 0.75,
                "text-opacity": 0.5
            },
            "source-layer": "marine_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": "{name_en}",
                "text-max-width": 5,
                "text-letter-spacing": 0.2,
                "text-line-height": 1.6,
                "symbol-placement": "point",
                "text-offset": [
                    0,
                    2.4
                ],
                "text-size": {
                    "stops": [
                        [
                            3,
                            18
                        ],
                        [
                            4,
                            22
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849258897.3083"
            },
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "Point"
                ],
                [
                    "==",
                    "labelrank",
                    1
                ]
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "marine_label_point_1",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.7)",
                "text-halo-width": 0,
                "text-halo-blur": 0.75,
                "text-opacity": 0.5
            },
            "source-layer": "marine_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": "{name_en}",
                "text-max-width": 6.25,
                "text-transform": "uppercase",
                "text-size": {
                    "stops": [
                        [
                            5,
                            13
                        ],
                        [
                            6,
                            15
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849242106.713"
            },
            "filter": [
                ">=",
                "scalerank",
                4
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country_label_4",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 2,
                "text-halo-blur": 1
            },
            "source-layer": "country_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": "{name_en}",
                "text-max-width": 6.25,
                "text-transform": "uppercase",
                "text-size": {
                    "stops": [
                        [
                            4,
                            13
                        ],
                        [
                            7,
                            17
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849242106.713"
            },
            "filter": [
                "==",
                "scalerank",
                3
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country_label_3",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 2,
                "text-halo-blur": 1
            },
            "source-layer": "country_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": "{name_en}",
                "text-max-width": 6.25,
                "text-transform": "uppercase",
                "text-size": {
                    "stops": [
                        [
                            3,
                            13
                        ],
                        [
                            5,
                            17
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849242106.713"
            },
            "filter": [
                "==",
                "scalerank",
                2
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country_label_2",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 2,
                "text-halo-blur": 1
            },
            "source-layer": "country_label"
        },
        {
            "interactive": true,
            "layout": {
                "text-font": [
                    "Open Sans Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": "{name_en}",
                "text-max-width": 6.25,
                "text-transform": "uppercase",
                "text-size": {
                    "stops": [
                        [
                            2,
                            13
                        ],
                        [
                            4,
                            17
                        ]
                    ]
                }
            },
            "metadata": {
                "mapbox:group": "1444849242106.713"
            },
            "filter": [
                "==",
                "scalerank",
                1
            ],
            "type": "symbol",
            "source": "mapbox",
            "id": "country_label_1",
            "paint": {
                "text-color": "#757575",
                "text-halo-color": "rgba(255,255,255,0.8)",
                "text-halo-width": 2,
                "text-halo-blur": 1
            },
            "source-layer": "country_label"
        }
    ],
    "created": "2015-11-19T17:00:47.571Z",
    "id": "cih6hi2uq00bua0m3scl3fszx",
    "modified": "2015-11-25T17:04:24.740Z",
    "owner": "latimesmapping",
    "draft": false
}