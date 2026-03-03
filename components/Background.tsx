export default function Background(){
    return(
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/75" />
      </div>
    )
}