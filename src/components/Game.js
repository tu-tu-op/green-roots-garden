import Phaser from 'phaser';

const CELL_SIZE = 100;
const GRID_COLUMNS = 6;
const GRID_ROWS = 5;
const PLANT_COST = 100;

const LEVELS = [
  {
    name: "Sunny Meadow",
    zombieSpeed: [0.4, 0.6],
    tankChance: 0.18,
    tankHP: 220,
    tankSpeed: [0.18, 0.26],
    sunDropRate: 140,
    zombiesPerLevel: 8,
  },
  {
    name: "Cloudy Garden",
    zombieSpeed: [0.6, 0.75],
    tankChance: 0.25,
    tankHP: 250,
    tankSpeed: [0.22, 0.28],
    sunDropRate: 110,
    zombiesPerLevel: 11,
  },
  {
    name: "Twilight Lawn",
    zombieSpeed: [0.85, 1.11],
    tankChance: 0.36,
    tankHP: 320,
    tankSpeed: [0.32, 0.42],
    sunDropRate: 80,
    zombiesPerLevel: 17,
  },
  {
    name: "Nightmare Mode",
    zombieSpeed: [1.3, 1.7],
    tankChance: 0.42,
    tankHP: 480,
    tankSpeed: [0.49, 0.72],
    sunDropRate: 64,
    zombiesPerLevel: 24,
  }
];

// Level unlock tracking
function getUnlockedLevels() {
  const k = localStorage.getItem('pvz_unlocked_levels');
  return k ? Number(k) : 1;
}
function setUnlockedLevels(idx) {
  localStorage.setItem('pvz_unlocked_levels', String(idx));
}

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.currentLevel = 0;
  }

  preload() {}

  create() {
    // Core game state
    this.frame = 0;
    this.sunPoints = 100;
    this.points = 0;
    this.gameOver = false;
    this.inLevel = false;
    this.levelCleared = false;
    this.zombiesSpawned = 0;
    this.zombiesToSpawn = 0;
    this.plants = [];
    this.zombies = [];
    this.projectiles = [];
    this.suns = [];
    this.unlockedLevels = getUnlockedLevels();

    // UI elements
    this.pointsText = this.add.text(144, 16, `Points: 0`, {
      fontSize: '28px', color: '#fff', backgroundColor: '#222a', padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setDepth(2);
    this.sunText = this.add.text(16, 16, '☀️ 100', {
      fontSize: '28px', color: '#fff', backgroundColor: '#222a', padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setDepth(2);
    this.restartBtn = this.add.text(600 - 8, 8, '⟳ Restart', {
      fontSize: '22px', color: '#fff', backgroundColor: '#137013', padding: { left: 12, right: 12, top: 8, bottom: 8 }
    }).setOrigin(1, 0).setInteractive().setDepth(10);
    this.restartBtn.on('pointerdown', () => { this.scene.restart(); });
    this.levelText = this.add.text(300, 55, '', {
      fontSize: '31px', color: '#fff', fontStyle: 'bold', backgroundColor: '#0006', padding: 5
    }).setOrigin(0.5, 0).setVisible(false).setDepth(11);

    // **COMPACT Game Over/Win message**
    this.statusText = this.add.text(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      '',
      {
        fontSize: '30px',
        color: '#fff',
        fontStyle: 'bold',
        backgroundColor: '#000c',
        padding: { left: 12, right: 12, top: 10, bottom: 10 },
        align: 'center',
        wordWrap: { width: 350, useAdvancedWrap: true }
      }
    ).setOrigin(0.5, 0.5).setDepth(20).setVisible(false);

    this.drawGrid();
    this.showLevelSelect();

    this.input.on('pointerdown', pointer => {
      if (!this.inLevel) return;
      this.handlePointerDown(pointer);
    });
  }

  showLevelSelect() {
    this.clearAllDynamics();
    this.inLevel = false;
    this.levelCleared = false;
    this.pointsText.setVisible(false);
    this.sunText.setVisible(false);
    this.levelText.setVisible(false);
    this.statusText.setVisible(false);

    this.menuBg = this.add.rectangle(300, 250, 540, 380, 0x345530, 0.98)
      .setStrokeStyle(4, 0xffffff)
      .setDepth(20);
    this.menuTitle = this.add.text(300, 80, 'Level Select', { fontSize: '44px', color: '#d8ffc6', fontStyle: 'bold', align: 'center', backgroundColor: '#303E27', padding: 10 })
      .setOrigin(0.5).setDepth(21);

    this.levelButtons = [];
    for (let i = 0; i < LEVELS.length; i++) {
      const lvl = LEVELS[i];
      const unlocked = i < this.unlockedLevels;
      const btn = this.add.text(180, 155 + i*62,
        `${lvl.name} ${unlocked ? "" : "🔒"}`,
        { fontSize: '30px', color: unlocked ? '#fff' : '#555', backgroundColor: unlocked ? '#4a9d4a' : '#444', fontStyle: unlocked ? 'bold' : '', padding: { left: 14, right: 14, top: 10, bottom: 10 } }
      ).setInteractive({ useHandCursor: unlocked }).setOrigin(0).setDepth(21);
      btn.unlocked = unlocked;
      btn.lid = i;
      if (unlocked) {
        btn.on('pointerdown', () => { this.startLevel(i); });
      }
      this.levelButtons.push(btn);
    }
  }

  startLevel(lid) {
    this.clearAllDynamics();
    this.inLevel = true;
    this.currentLevel = lid;
    this.sunPoints = 100;
    this.pointsText.setText(`Points: ${this.points}`).setVisible(true);
    this.sunText.setText(`☀️ ${this.sunPoints}`).setVisible(true);
    this.levelText.setText(`${LEVELS[lid].name} (Level ${lid+1})`).setVisible(true);
    this.statusText.setVisible(false);

    this.plants = [];
    this.zombies = [];
    this.projectiles = [];
    this.suns = [];
    this.gameOver = false;
    this.levelCleared = false;
    this.frame = 0;
    this.zombiesSpawned = 0;
    this.zombiesToSpawn = LEVELS[lid].zombiesPerLevel;
  }

  update() {
    if (!this.inLevel || this.gameOver || this.levelCleared) return;
    this.frame++;
    const lv = LEVELS[this.currentLevel];

    // --- PLANTS
    for (const plant of this.plants) {
      if (!plant.graphic) this.initPlantGraphics(plant);
      plant.shootTimer++;
      if (plant.shootTimer % 100 === 0) {
        if (this.zombies.some(z => z.row === plant.row)) {
          this.projectiles.push(this.createProjectile(plant.row, plant.col, plant.type));
        }
      }
    }

    // --- ZOMBIES
    for (let i = this.zombies.length - 1; i >= 0; i--) {
      const zombie = this.zombies[i];
      if (!zombie.graphic) this.initZombieGraphics(zombie);
      // Eating plant if in same cell
      const plant = this.plants.find(
        p => p.row === zombie.row && Math.abs(zombie.x - p.col * CELL_SIZE) < 10
      );
      if (plant) {
        zombie.eatCooldown += 1;
        if (zombie.eatCooldown >= 60) {
          zombie.attacksLeft -= 1;
          zombie.eatCooldown = 0;
          if (zombie.attacksLeft <= 0) {
            if (plant.graphic) plant.graphic.destroy();
            if (plant.emoji) plant.emoji.destroy();
            this.plants = this.plants.filter(p => p !== plant);
            zombie.attacksLeft = zombie.type === 'tank' ? 2 : 1;
          }
        }
      } else {
        zombie.x -= zombie.speed;
        zombie.eatCooldown = 0;
        zombie.attacksLeft = zombie.type === 'tank' ? 2 : 1;
      }
      zombie.graphic.setX(zombie.x + 10 + (CELL_SIZE-20)/2);
      zombie.emoji.setX(zombie.x + 28);
      if (zombie.x < 0) { this.handleGameOver(); return; }
    }

    // --- SPAWN ZOMBIES
    if (this.frame % 300 === 0 && this.zombiesSpawned < this.zombiesToSpawn) {
      const row = Phaser.Math.Between(0, GRID_ROWS - 1);
      let isTank = Math.random() < lv.tankChance;
      this.zombies.push(this.createZombie(row, isTank ? 'tank' : 'basic', lv));
      this.zombiesSpawned++;
    }

    // --- PROJECTILES
    for (let i = this.projectiles.length-1; i >= 0; i--) {
      const proj = this.projectiles[i];
      if (!proj.graphic)
        proj.graphic = this.add.circle(proj.x, proj.y, proj.width/2, 0xffff00).setDepth(2);
      proj.x += proj.speed;
      proj.graphic.setX(proj.x);

      const hitIndex = this.zombies.findIndex(z =>
        z.row === proj.row &&
        proj.x < z.x + z.width &&
        proj.x + proj.width > z.x
      );
      if (hitIndex !== -1) {
        const zombie = this.zombies[hitIndex];
        zombie.health -= proj.damage;
        proj.graphic.destroy();
        this.projectiles.splice(i, 1);
        // Points: +1 normal, +2 tank
        if (zombie.health <= 0) {
          zombie.graphic.destroy();
          zombie.emoji.destroy();
          this.zombies.splice(hitIndex, 1);
          let gain = zombie.type === 'tank' ? 2 : 1;
          this.points += gain;
          this.pointsText.setText(`Points: ${this.points}`);
          this.sunPoints += 25;
          if (this.zombies.length === 0 && this.zombiesSpawned >= this.zombiesToSpawn) {
            this.handleLevelWin();
          }
        }
      } else if (proj.x > GRID_COLUMNS * CELL_SIZE) {
        proj.graphic.destroy();
        this.projectiles.splice(i, 1);
      }
    }

    // --- SUN DROPS
    if (this.frame % lv.sunDropRate === 0) {
      const dropCol = Phaser.Math.Between(0, GRID_COLUMNS-1);
      const sun = {
        x: dropCol*CELL_SIZE + CELL_SIZE/2,
        y: -25,
        active: true,
      };
      sun.graphic = this.add.sprite(sun.x, sun.y, '').setScale(1.3).setDepth(10);
      sun.emoji = this.add.text(sun.x-22, sun.y-22, '☀️', { fontSize: '48px' }).setDepth(11);
      this.suns.push(sun);
    }
    for (let i = this.suns.length-1; i >= 0; i--) {
      const sun = this.suns[i];
      if (!sun.active) continue;
      sun.y += 1.8;
      sun.graphic.setY(sun.y);
      sun.emoji.setY(sun.y-22);
      if (sun.y > GRID_ROWS * CELL_SIZE + 30) {
        sun.graphic.destroy(); sun.emoji.destroy();
        this.suns.splice(i, 1);
      }
    }
    this.sunText.setText(`☀️ ${this.sunPoints}`);
  }

  // --- FACTORIES
  createPlant(row, col, type='basic') {
    return { row, col, health: 100, shootTimer: 0, type };
  }
  createZombie(row, type, lv=LEVELS[0]) {
    if (type === 'tank') {
      return {
        row,
        col: GRID_COLUMNS-1,
        x: GRID_COLUMNS * CELL_SIZE,
        width: CELL_SIZE-20,
        height: CELL_SIZE-20,
        speed: Phaser.Math.FloatBetween(...lv.tankSpeed),
        health: lv.tankHP,
        eatCooldown: 0,
        type,
        attacksLeft: 2,
      };
    }
    return {
      row,
      col: GRID_COLUMNS-1,
      x: GRID_COLUMNS * CELL_SIZE,
      width: CELL_SIZE-20,
      height: CELL_SIZE-20,
      speed: Phaser.Math.FloatBetween(...lv.zombieSpeed),
      health: 100,
      eatCooldown: 0,
      type,
      attacksLeft: 1,
    };
  }
  createProjectile(row, col, type='basic') {
    return {
      row,
      col,
      x: col*CELL_SIZE + CELL_SIZE/2,
      y: row*CELL_SIZE + CELL_SIZE/2,
      width: 16,
      height: 16,
      speed: 5,
      damage: 20,
      type
    };
  }
  initPlantGraphics(plant) {
    const px = plant.col * CELL_SIZE;
    const py = plant.row * CELL_SIZE;
    plant.graphic = this.add.rectangle(px + 10 + (CELL_SIZE-20)/2, py + 10 +(CELL_SIZE-20)/2, CELL_SIZE-20, CELL_SIZE-20, 0x1c6e1c).setDepth(1);
    plant.emoji = this.add.text(px + 28, py + 28, '🌱', { fontSize: '38px' }).setDepth(2);
  }
  initZombieGraphics(zombie) {
    const px = zombie.x;
    const py = zombie.row * CELL_SIZE;
    let color = zombie.type === 'tank' ? 0x336699 : 0x8b5a2b;
    let emoji = zombie.type === 'tank' ? '🦹' : '🧟';
    zombie.graphic = this.add.rectangle(px + 10 + (CELL_SIZE-20)/2, py + 10 + (CELL_SIZE-20)/2, CELL_SIZE-20, CELL_SIZE-20, color).setDepth(1);
    zombie.emoji = this.add.text(px + 28, py + 28, emoji, { fontSize: '38px' }).setDepth(2);
  }

  // --- UI, GRID, MENUS ---
  drawGrid() {
    for (let x = 0; x <= GRID_COLUMNS; x++)
      this.add.line(x*CELL_SIZE, 0, 0, 0, 0, GRID_ROWS*CELL_SIZE, 0xffffff, 0.19).setOrigin(0,0);
    for (let y = 0; y <= GRID_ROWS; y++)
      this.add.line(0, y*CELL_SIZE, 0, 0, GRID_COLUMNS*CELL_SIZE, 0, 0xffffff, 0.19).setOrigin(0,0);
    this.cameras.main.setBackgroundColor('#4a9d4a');
  }
  handlePointerDown(pointer) {
    // Try sun pickup
    for (let i=this.suns.length-1; i>=0; i--) {
      const sun = this.suns[i];
      if (!sun.active) continue;
      const dx = pointer.x - sun.x, dy = pointer.y - sun.y;
      if (dx*dx + dy*dy < 35*35) {
        this.sunPoints += 25;
        sun.active = false;
        sun.graphic.destroy(); sun.emoji.destroy();
        this.suns.splice(i, 1);
        this.sunText.setText(`☀️ ${this.sunPoints}`);
        return;
      }
    }
    // Planting
    const col = Math.floor(pointer.x / CELL_SIZE);
    const row = Math.floor(pointer.y / CELL_SIZE);
    if (
      col >= 0 && col < GRID_COLUMNS &&
      row >= 0 && row < GRID_ROWS &&
      !this.plants.some(p => p.row===row && p.col===col) &&
      this.sunPoints >= PLANT_COST
    ) {
      this.plants.push(this.createPlant(row, col, "basic"));
      this.sunPoints -= PLANT_COST;
      this.sunText.setText(`☀️ ${this.sunPoints}`);
    }
  }
  handleGameOver() {
    this.gameOver = true;
    this.pointsText.setVisible(true);
    this.levelText.setVisible(true);
    this.statusText.setText('GAME OVER\nClick to return to menu').setVisible(true);
    this.statusText.setInteractive();
    this.statusText.once('pointerdown', ()=>{
      this.showLevelSelect();
    });
    this.clearAllDynamics();
  }
  handleLevelWin() {
    this.levelCleared = true;
    this.points += 4;
    this.pointsText.setText(`Points: ${this.points}`);
    if (this.currentLevel+1 > this.unlockedLevels && this.currentLevel+1 < LEVELS.length+1) {
      this.unlockedLevels = this.currentLevel+1;
      setUnlockedLevels(this.unlockedLevels);
    }
    this.statusText.setText('LEVEL CLEARED!\n+4 pts\nClick to return to menu').setVisible(true);
    this.statusText.setInteractive();
    this.statusText.once('pointerdown', ()=>{
      this.showLevelSelect();
    });
    this.clearAllDynamics();
  }
  clearAllDynamics() {
    // Destroy all in-game objects
    const arrs = [this.plants, this.zombies, this.suns, this.projectiles];
    for (const arr of arrs) {
      for (const o of arr) {
        if (o.graphic) o.graphic.destroy();
        if (o.emoji) o.emoji.destroy();
      }
    }
    this.plants = []; this.zombies = []; this.suns = []; this.projectiles = [];

    // Destroy all menu overlays/items
    if (this.menuBg) { this.menuBg.destroy(); this.menuBg = null; }
    if (this.menuTitle) { this.menuTitle.destroy(); this.menuTitle = null; }
    if (this.levelButtons) {
      for (let b of this.levelButtons) b.destroy();
      this.levelButtons = [];
    }
    if (this.statusText) this.statusText.setInteractive(false);
  }
}
