let goku_sprite_info = {
    'animations': {
        'idle': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 0,
            'firstFrame': 0,
            'lastFrame': (800 * 6),
            'loop': false
        },
        'attack1': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 900,
            'firstFrame': 0,
            'lastFrame': (800 * 9),
            'loop': false
        },
        'attack2': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 2250,
            'firstFrame': 0,
            'lastFrame': (800 * 5),
            'loop': false
        },
        'special': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 1350,
            'firstFrame': 0,
            'lastFrame': (800 * 10),
            'loop': false
        },
        'boost': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 1800,
            'firstFrame': 0,
            'lastFrame': (800 * 6),
            'loop': false
        },
        'defeat': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 450,
            'firstFrame': 0,
            'lastFrame': (800 * 11),
            'loop': false
        }
    }
}
let luffy_sprite_info = {
    'animations': {
        'idle': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 0,
            'firstFrame': 0,
            'lastFrame': (2400),
            'loop': true
        },
        'attack1': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 450,
            'firstFrame': 0,
            'lastFrame': (7200),
            'loop': false
        },
        'attack2': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 1800,
            'firstFrame': 0,
            'lastFrame': (11200),
            'loop': false
        },
        'special': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 2250,
            'firstFrame': 0,
            'lastFrame': 13600,
            'loop': false
        },
        'boost': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 1350,
            'firstFrame': 0,
            'lastFrame': (4800),
            'loop': false
        },
        'defeat': {
            'frameWidth': 800,
            'frameHeight': 450,
            'yIndex': 900,
            'firstFrame': 0,
            'lastFrame': (4800),
            'loop': false
        }
    }
}
let sailormoon_sprite_info = {
    'animations': {
        'idle': {
            'frameWidth': 80,
            'frameHeight': 80,
            'yIndex': 0,
            'firstFrame': 0,
            'lastFrame': 0,
            'loop': false
        },
        'attack1': {
            'frameWidth': 80,
            'frameHeight': 80,
            'yIndex': 80,
            'firstFrame': 0,
            'lastFrame': (80 * 2),
            'loop': false
        },
        'attack2': {
            'frameWidth': 80,
            'frameHeight': 80,
            'yIndex': 160,
            'firstFrame': 0,
            'lastFrame': (80 * 2),
            'loop': false
        },
        'special': {
            'frameWidth': 80,
            'frameHeight': 80,
            'yIndex': 240,
            'firstFrame': 0,
            'lastFrame': (80 * 5),
            'loop': false
        },
        'boost': {
            'frameWidth': 80,
            'frameHeight': 80,
            'yIndex': 320,
            'firstFrame': 0,
            'lastFrame': (80 * 2),
            'loop': false
        },
        'defeat': {
            'frameWidth': 80,
            'frameHeight': 80,
            'yIndex': 480,
            'firstFrame': 0,
            'lastFrame': (80 * 2),
            'loop': false
        }
    }
}
let azula_sprite_info = {
    'animations': {
        'idle': {
            'frameWidth': 144,
            'frameHeight': 60,
            'yIndex': 0,
            'firstFrame': 0,
            'lastFrame': 0,
            'loop': false
        },
        'attack1': {
            'frameWidth': 144,
            'frameHeight': 60,
            'yIndex': 60,
            'firstFrame': 0,
            'lastFrame': (60 * 3),
            'loop': false
        },
        'attack2': {
            'frameWidth': 144,
            'frameHeight': 60,
            'yIndex': 120,
            'firstFrame': 0,
            'lastFrame': (60 * 1),
            'loop': false
        },
        'special': {
            'frameWidth': 144,
            'frameHeight': 60,
            'yIndex': 180,
            'firstFrame': 0,
            'lastFrame': (60 * 2),
            'loop': false
        },
        'boost': {
            'frameWidth': 144,
            'frameHeight': 60,
            'yIndex': 240,
            'firstFrame': 0,
            'lastFrame': (60 * 2),
            'loop': false
        },
        'defeat': {
            'frameWidth': 144,
            'frameHeight': 60,
            'yIndex': 300,
            'firstFrame': 0,
            'lastFrame': (60 * 1),
            'loop': false
        }
    }
}
let luffy_stats = {
    'initHealth': 950,
    'health': 950,
    'accuracy': 0.85,
    'attack1': {
        'strength': 110,
        'avail': 1,
        'defaultAvail': 1
    },
    'attack2': {
        'strength': 130,
        'avail': 1,
        'defaultAvail': -1
    },
    'special': {
        'strength': 210,
        'avail': 1,
        'defaultAvail': 0
    },
    'boost': {
        'details': 'Raises health',
        'avail': 1,
        'defaultAvail': -2
    },
    booster: function () {
        this.health += 100;
    }
}
let goku_stats = {
    'initHealth': 850,
    'health': 850,
    'accuracy': 0.7,
    'attack1': {
        'strength': 100,
        'avail': 1, 
        'defaultAvail': 1
    },
    'attack2': {
        'strength': 150,
        'avail': 1,
        'defaultAvail': -1
    },
    'special': {
        'strength': 240,
        'avail': 1,
        'defaultAvail': 0
    },
    'boost': {
        'details': 'Raises accuracy',
        'avail': 1,
        'defaultAvail': -1
    },
    booster: function () {
        if (!this.accuracy > 0.95) {
            this.accuracy *= 1.08;
        }
    }
}
let sailormoon_stats = {
    'initHealth': 1200,
    'health': 1200,
    'accuracy': 0.9,
    'attack1': {
        'strength': 75,
        'avail': 1,
        'defaultAvail': 1
    },
    'attack2': {
        'strength': 90,
        'avail': 1,
        'defaultAvail': -1
    },
    'special': {
        'strength': 170,
        'avail': 1,
        'defaultAvail': 0
    },
    'boost': {
        'details': 'Raises strength',
        'avail': 1,
        'defaultAvail': -1
    },
    booster: function () {
        this.attack1.strength += 20;
        this.attack2.strength += 20;
        this.special.strength += 20;
    }
}
let azula_stats = {
    'initHealth': 750,
    'health': 750,
    'accuracy': 0.9,
    'attack1': {
        'strength': 100,
        'avail': 1,
        'defaultAvail': 1
    },
    'attack2': {
        'strength': 110,
        'avail': 1,
        'defaultAvail': -1
    },
    'special': {
        'strength': 170,
        'avail': 1,
        'defaultAvail': 0
    },
    'boost': {
        'details': 'Raises strength',
        'avail': 1,
        'defaultAvail': -2
    },
    booster: function () {
        this.attack1.strength += 20;
        this.attack2.strength += 20;
        this.special.strength += 20;
    }
}