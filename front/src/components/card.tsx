const Card = ({ imageUrl, descricao, count, styles }) => (
    <div className={styles.cardContainer}>
        <img src={imageUrl} alt={descricao} />
        <div className={styles.cardCount}>{count ? count : '0'}</div>
        <p className={styles.cardText}>{descricao}</p>
    </div>
)

export default Card