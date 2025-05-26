-- Create the FightResult enum type
CREATE TYPE fight_result AS ENUM ('KO', 'SUBMISSION', 'DECISION', 'DRAW');

-- Create Fighter table
CREATE TABLE fighter (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    weight_class VARCHAR(50) NOT NULL,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    draws INTEGER DEFAULT 0,
    knockouts INTEGER DEFAULT 0,
    submissions INTEGER DEFAULT 0,
    CONSTRAINT valid_weight_class CHECK (weight_class IN ('Flyweight', 'Bantamweight', 'Featherweight', 'Lightweight', 'Welterweight', 'Middleweight', 'Light Heavyweight', 'Heavyweight')),
    CONSTRAINT wins_non_negative CHECK (wins >= 0),
    CONSTRAINT losses_non_negative CHECK (losses >= 0),
    CONSTRAINT draws_non_negative CHECK (draws >= 0),
    CONSTRAINT knockouts_non_negative CHECK (knockouts >= 0),
    CONSTRAINT submissions_non_negative CHECK (submissions >= 0)
);

-- Create Event table
CREATE TABLE event (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    date DATE NOT NULL
);

-- Create Fight table
CREATE TABLE fight (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fighter1_id UUID NOT NULL,
    fighter2_id UUID NOT NULL,
    event_id UUID NOT NULL,
    result fight_result,
    winner_id UUID,
    FOREIGN KEY (fighter1_id) REFERENCES fighter(id) ON DELETE CASCADE,
    FOREIGN KEY (fighter2_id) REFERENCES fighter(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES fighter(id) ON DELETE SET NULL
);

-- Create Ranking table
CREATE TABLE ranking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fighter_id UUID NOT NULL,
    weight_class VARCHAR(50) NOT NULL,
    points INTEGER NOT NULL,
    rank INTEGER NOT NULL,
    win_percentage FLOAT NOT NULL,
    FOREIGN KEY (fighter_id) REFERENCES fighter(id) ON DELETE CASCADE,
    CONSTRAINT valid_weight_class CHECK (weight_class IN ('Flyweight', 'Bantamweight', 'Featherweight', 'Lightweight', 'Welterweight', 'Middleweight', 'Light Heavyweight', 'Heavyweight')),
    CONSTRAINT points_non_negative CHECK (points >= 0),
    CONSTRAINT rank_positive CHECK (rank >= 1),
    CONSTRAINT win_percentage_range CHECK (win_percentage >= 0 AND win_percentage <= 1)
);